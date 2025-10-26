// Test basic base64 decoding
console.log('=== Testing basic base64 decoding ===');
const pdfHeader = 'JVBERi0xLjcK';
console.log('PDF header base64:', pdfHeader);
try {
    const decoded = atob(pdfHeader);
    console.log('Decoded PDF header:', decoded);
    console.log('Char codes:', [...decoded].map(c => c.charCodeAt(0)));
} catch (e) {
    console.error('Failed to decode PDF header:', e);
}
function containsBase64Data(url) {
    try {
        // Extract everything after the domain
        const domainEndIndex = url.indexOf('/', url.indexOf('://') + 3);
        if (domainEndIndex === -1) return false;

        const pathPart = url.substring(domainEndIndex + 1); // Skip the first /
        console.log('Path part:', pathPart.substring(0, 100) + '...');
        console.log('Path part length:', pathPart.length);

        // Check if it contains PDF header (JVBER = %PDF in base64)
        const hasPdfHeader = pathPart.includes('JVBER');
        console.log('Contains PDF header:', hasPdfHeader);

        // Also check if the majority of the content looks like base64
        const base64LikeChars = (pathPart.match(/[A-Za-z0-9+/=%]/g) || []).length;
        const totalChars = pathPart.length;
        const base64Ratio = base64LikeChars / totalChars;
        console.log('Base64-like ratio:', base64Ratio);

        return hasPdfHeader && base64Ratio > 0.8 && totalChars > 100;
    } catch {
        return false;
    }
}

function extractBase64FromUrl(url) {
    try {
        // Extract everything after the domain
        const domainEndIndex = url.indexOf('/', url.indexOf('://') + 3);
        if (domainEndIndex === -1) {
            throw new Error('No path found in URL');
        }

        const pathPart = url.substring(domainEndIndex + 1); // Skip the first /

        // Find the last slash before JVBER
        const lastSlashBeforeJvber = pathPart.lastIndexOf('/', pathPart.indexOf('JVBER'));
        if (lastSlashBeforeJvber === -1) {
            throw new Error('No slash found before JVBER');
        }

        const base64String = pathPart.substring(lastSlashBeforeJvber + 1);
        console.log('Extracted base64 starts with:', base64String.substring(0, 50));
        console.log('Extracted base64 length:', base64String.length);

        // Try to decode URL encoding in the base64 string
        let decodedBase64;
        try {
            decodedBase64 = decodeURIComponent(base64String);
            console.log('URL decoded base64 ends with:', decodedBase64.substring(decodedBase64.length - 20));
            console.log('Length mod 4:', decodedBase64.length % 4);
        } catch (e) {
            console.log('URL decoding failed, using original');
            decodedBase64 = base64String;
        }

        // Validate it's base64-like (allow spaces and some other chars)
        const invalidChars = decodedBase64.match(/[^A-Za-z0-9+/=\s]/g);
        if (invalidChars) {
            console.log('Invalid chars in base64:', invalidChars);
            console.log('Invalid char codes:', invalidChars.map(c => c.charCodeAt(0)));
            throw new Error('Invalid base64 characters');
        }

        return decodedBase64;
    } catch (error) {
        console.error('Failed to extract base64 from URL:', error);
        return null;
    }
}

// Test base64 to blob conversion
function testBase64ToBlob(base64) {
    try {
        console.log('Testing base64 conversion...');
        console.log('Base64 length:', base64.length);

        // Remove any whitespace
        let cleanBase64 = base64.replace(/\s/g, '');

        // Pad base64 string to make length multiple of 4
        const padding = (4 - (cleanBase64.length % 4)) % 4;
        if (padding > 0) {
            cleanBase64 += '='.repeat(padding);
            console.log('Padded base64 string with', padding, 'equals');
        }

        console.log('Final base64 length:', cleanBase64.length, 'mod 4:', cleanBase64.length % 4);

        const binaryString = atob(cleanBase64);
        console.log('Binary string length:', binaryString.length);

        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i += 1) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([bytes], { type: 'application/pdf' });
        console.log('Blob created successfully, size:', blob.size);

        const blobUrl = URL.createObjectURL(blob);
        console.log('Blob URL created:', blobUrl);

        // Check if it starts with blob:
        if (blobUrl.startsWith('blob:')) {
            console.log('✓ Blob URL creation successful');
            return true;
        } else {
            console.log('✗ Blob URL creation failed');
            return false;
        }
    } catch (error) {
        console.error('Error in base64 conversion:', error);
        return false;
    }
}

const testUrl = 'https://czzpbkjt.pegace.net/prweb/PRAuth/app/reg-rep/reg-reporting-exceptions/JVBERi0xLjcKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSL0ZpbHRlci9GbGF0ZURl%20Y29kZT4+CnN0cmVhbQp4nKVaW4v0NhJ9n1/RsG+B9CeVJNuCocFu2+wum4fAQB6WfcidhGVDwgfZ%20/fd7qkqW5cvM9NgM09O+Sjp1qupUaczVX';

console.log('=== Testing new URL processing logic ===');
console.log('Test URL contains base64 data:', containsBase64Data(testUrl));

if (containsBase64Data(testUrl)) {
    const extracted = extractBase64FromUrl(testUrl);
    if (extracted) {
        console.log('Successfully extracted base64, testing conversion...');
        testBase64ToBlob(extracted);
    }
}