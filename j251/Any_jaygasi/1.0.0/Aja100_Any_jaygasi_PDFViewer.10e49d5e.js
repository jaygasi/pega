(self.webpackChunkj251=self.webpackChunkj251||[]).push([[69763035],{1815:()=>{},2787:()=>{},3237:()=>{},3689:(e,t,r)=>{"use strict";r.r(t),r.d(t,{PDFViewer:()=>b,default:()=>x});var o=r(1594),i=r(6096),n=r(5541),s=r(6092),a=r(5099),l=r(566),c=(r(2729),r(1684),r(1093)),d=r(8267);const p=d.Ay.div(()=>d.AH`
  height: 100%;
  width: 100%;
  border: 1px solid #d1d5db; /* Softer border color */
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb; /* Light background for the whole component */
  overflow: hidden; /* Prevents content from overflowing rounded corners */

  /* --- Toolbar Styles --- */
  .rpv-core__toolbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    padding: 8px 12px;
    box-sizing: border-box;
    flex-shrink: 0; /* Prevent toolbar from shrinking */
  }

  .rpv-core__toolbar-left,
  .rpv-core__toolbar-middle,
  .rpv-core__toolbar-right {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px; /* Space between items */
  }
  
  .rpv-core__toolbar-middle {
    flex-grow: 1;
    justify-content: center;
  }

  /* --- Modern Button Styles --- */
  .rpv-core__button {
    background-color: #ffffff;
    border: 1px solid #d1d5db;
    padding: 6px 10px;
    cursor: pointer;
    font-size: 18px;
    color: #374151;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    
    &:hover {
      background-color: #f9fafb;
      border-color: #9ca3af;
    }

    &:focus, &:focus-visible {
      outline: 2px solid transparent;
      outline-offset: 2px;
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.6);
      border-color: #6366f1;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .rpv-core__current-page-input {
    padding: 0 8px;
    font-size: 14px;
    color: #374151;
    display: flex;
    align-items: center;
    gap: 8px; /* Space between page number items */
  }

  .rpv-core__search-input {
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 6px 10px;
    font-size: 14px;
    min-height: 35px;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    
    &:focus, &:focus-visible {
      border-color: #6366f1;
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.6);
      outline: none;
    }
  }

  /* Search container */
  .pega-pdf-search-container {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`),h=d.Ay.div(()=>d.AH`
  height: 100%;
  width: 100%;
  overflow: auto;
  position: relative;
  flex-grow: 1; /* Allow this to fill remaining space */

  /* Isolate the viewer from the host app's box-sizing model */
  .rpv-core__viewer, .rpv-core__page-layer, .rpv-core__text-layer {
    box-sizing: content-box !important;
  }
  
  /* Make the text layer a correctly sized overlay */
  .rpv-core__text-layer {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    transform-origin: 0 0 !important;
    color: transparent !important; /* Hide text to prevent ghosting */
  }

  /* Reset the individual text spans */
  .rpv-core__text-layer-text {
    position: absolute !important;
    white-space: pre !important;
    line-height: 1 !important;
    transform-origin: 0 0 !important;
    text-rendering: geometricPrecision !important;
  }
`);var g=r(4848);const f=({value:e,height:t})=>{return(0,g.jsxs)("div",{style:{background:"#f0f0f0",border:"1px solid #ccc",padding:"8px",marginBottom:"8px",fontSize:"12px",fontFamily:"monospace"},children:[(0,g.jsx)("strong",{children:"PDFViewer Diagnostics:"}),(0,g.jsx)("br",{}),"Value: ",(r=e,r?r.length>100?`${r.substring(0,100)}...`:r:"No value"),(0,g.jsx)("br",{}),"Height: ",t,(0,g.jsx)("br",{}),"Value Length: ",e?.length||0,(0,g.jsx)("br",{}),"Is Base64: ",e?.startsWith("data:")||/^([A-Za-z0-9+/=])+$/.test(e)?"Yes":"No",(0,g.jsx)("br",{}),"Is URL: ",e?.startsWith("http")?"Yes":"No",(0,g.jsx)("br",{}),"Is Blob: ",e?.startsWith("blob:")?"Yes":"No"]});var r};function u(e){try{let t=e.startsWith("data:application/pdf;base64,")?e.substring(28):e;t=t.replaceAll(/\s/g,"");const r=(4-t.length%4)%4;r>0&&(t+="=".repeat(r),console.log("PDFViewer: Padded base64 string with",r,"equals"));const o=atob(t),i=new Uint8Array(o.length);for(let e=0;e<o.length;e+=1)i[e]=o.codePointAt(e)||0;const n=new Blob([i],{type:"application/pdf"});return console.log("PDFViewer: Converted base64 to blob, size:",n.size),URL.createObjectURL(n)}catch(e){return console.error("PDFViewer: Failed to convert base64 to blob:",e),""}}void 0!==globalThis.window&&globalThis.window.addEventListener("error",e=>{e.message?.includes("pdf")&&console.error("PDF.js error caught:",e.error,e.message)});const b=({value:e="",height:t="600px",showToolbar:r=!0,showDiagnostics:c=!1})=>{const[d,b]=o.useState(""),[x,w]=o.useState(!1),[m,v]=o.useState(""),[y,P]=o.useState(0),[D,F]=o.useState(!1),j=o.useRef(null),V=o.useMemo(()=>"string"==typeof e?e:"",[e]),L=(0,l.toolbarPlugin)(),{Toolbar:S}=L,_=(0,n.pageNavigationPlugin)(),z=(0,s.zoomPlugin)(),k=(0,a.searchPlugin)(),R=o.useMemo(()=>[L,_,z,k],[L,_,z,k]);return o.useEffect(()=>{const e=e=>{const{searchText:t}=e.detail;if(t&&"string"==typeof t){console.log("PDFViewer: Received external search request:",t);try{k&&d&&!x&&D?k.highlight(t).then(e=>{console.log("PDFViewer: Programmatic search triggered for:",t,"Found matches:",e.length,"PDF loaded:",!!d,"Loading:",x,"Document ready:",D)}).catch(e=>{console.error("PDFViewer: Search failed:",e)}):console.warn("PDFViewer: Cannot search - search plugin not available or PDF not ready yet. Plugin:",!!k,"URL:",d,"Loading:",x,"Document ready:",D)}catch(e){console.error("PDFViewer: Could not trigger programmatic search:",e)}}};return globalThis.addEventListener("pdfViewerSearch",e),globalThis.addEventListener("simplePdfViewerSearch",e),globalThis.pdfViewer={search:e=>(console.log("PDFViewer: Direct API search called:",e),k&&d&&!x&&D?(k.highlight(e).then(t=>(console.log("PDFViewer: Direct API search executed for:",e,"Found matches:",t.length,"PDF loaded:",!!d,"Loading:",x,"Document ready:",D),t.length>0)).catch(e=>(console.error("PDFViewer: Direct API search failed:",e),!1)),!0):(console.warn("PDFViewer: Direct API cannot search - search plugin not available or PDF not ready yet. Plugin:",!!k,"URL:",d,"Loading:",x,"Document ready:",D),!1))},()=>{globalThis.removeEventListener("pdfViewerSearch",e),globalThis.removeEventListener("simplePdfViewerSearch",e),delete globalThis.pdfViewer}},[k,d,x,D]),o.useEffect(()=>{if(console.log("PDFViewer: Processing value:",V),console.log("PDFViewer: Container dimensions:",{height:t,width:"100%"}),console.log("PDFViewer: Toolbar enabled:",r),v(""),F(!1),!V)return b(""),void w(!1);w(!0),(async()=>{try{const e=await async function(e){if(!e)return"";if(e.startsWith("blob:"))return e;if((e.startsWith("http://")||e.startsWith("https://"))&&function(e){try{const t=e.indexOf("/",e.indexOf("://")+3);if(-1===t)return!1;const r=e.substring(t+1),o=r.includes("JVBER"),i=(r.match(/[A-Za-z0-9+/=%]/g)||[]).length,n=r.length;return o&&i/n>.8&&n>100}catch{return!1}}(e))return function(e){try{const t=e.indexOf("/",e.indexOf("://")+3);if(-1===t)throw new Error("No path found in URL");const r=e.substring(t+1),o=r.lastIndexOf("/",r.indexOf("JVBER"));if(-1===o)throw new Error("No slash found before JVBER");const i=r.substring(o+1);let n;try{n=decodeURIComponent(i)}catch{n=i}if(n.match(/[^A-Za-z0-9+/=\s]/g))throw new Error("Invalid base64 characters");return console.log("PDFViewer: Extracted base64 from URL path, converting to blob..."),u(n)||null}catch(e){return console.warn("PDFViewer: Failed to extract base64 from URL:",e),null}}(e)||(console.warn("PDFViewer: Detected base64 data in URL but failed to extract, skipping fetch to avoid 414 error"),"");return e.startsWith("http://")||e.startsWith("https://")?await async function(e){console.log("PDFViewer: Fetching PDF from URL:",e);try{const t=await fetch(e,{mode:"cors",headers:{Accept:"application/pdf"}});if(!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`);const r=await t.blob();return console.log("PDFViewer: Successfully fetched PDF blob, size:",r.size),URL.createObjectURL(r)}catch(t){return console.warn("PDFViewer: Failed to fetch PDF:",t),e}}(e):function(e){return!!e.startsWith("data:application/pdf;base64,")||/^[A-Za-z0-9+/=\s]+$/.test(e)}(e)?u(e):e}(V);console.log("PDFViewer: Processed URL:",e),b(e),w(!1)}catch(e){console.error("Error processing PDF URL:",e),v("Failed to load PDF"),w(!1)}})()},[V]),(0,g.jsxs)(p,{style:{height:t||"600px"},children:[r&&d&&(0,g.jsx)(S,{}),(0,g.jsxs)(h,{className:"pega-pdfviewer-wrapper",ref:j,"data-testid":"pdf-viewer-wrapper",children:[c&&(0,g.jsx)(f,{value:e,height:t}),m?(0,g.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",color:"#666",fontSize:"16px"},children:m}):d?(0,g.jsx)("div",{style:{flex:1,overflow:"auto",height:"100%"},children:(0,g.jsx)(i.Worker,{workerUrl:"https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js",children:(0,g.jsx)(i.Viewer,{fileUrl:d,plugins:R,defaultScale:i.SpecialZoomLevel.PageWidth,characterMap:{isCompressed:!0,url:"https://unpkg.com/pdfjs-dist@3.11.174/cmaps/"},onDocumentLoad:e=>{const t=e?.doc?.numPages??0;console.log("PDFViewer: Document loaded with",t,"pages."),P(t),F(!0)}})})}):x?(0,g.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",color:"#666",fontSize:"16px"},children:"Loading PDF..."}):(0,g.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",color:"#666",fontSize:"16px"},children:"No PDF provided"})]}),c&&(0,g.jsxs)("div",{style:{position:"absolute",right:12,bottom:12,background:"rgba(255,255,255,0.9)",border:"1px solid #ddd",padding:"8px",fontSize:12,zIndex:1e3},children:[(0,g.jsx)("div",{style:{fontWeight:600},children:"PDFViewer debug"}),(0,g.jsxs)("div",{children:["isLoading: ",String(x)]}),(0,g.jsxs)("div",{children:["numPages: ",y]}),(0,g.jsxs)("div",{style:{maxWidth:480,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:["url: ",d||"(empty)"]}),m&&(0,g.jsxs)("div",{style:{color:"red"},children:["error: ",m]})]})]})},x=(0,c.A)(b)},6671:()=>{},7492:()=>{},7640:()=>{}}]);
//# sourceMappingURL=Aja100_Any_jaygasi_PDFViewer.10e49d5e.js.map