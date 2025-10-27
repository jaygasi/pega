// create-nonce.js
const nonce = document?.currentScript?.nonce || undefined;

if (nonce) {
  // Apply nonce to any dynamically created style elements
  const originalCreateElement = document.createElement;
  document.createElement = function(tagName, ...args) {
    const element = originalCreateElement.call(this, tagName, ...args);
    if (tagName.toLowerCase() === 'style') {
      element.setAttribute('nonce', nonce);
    }
    return element;
  };
}