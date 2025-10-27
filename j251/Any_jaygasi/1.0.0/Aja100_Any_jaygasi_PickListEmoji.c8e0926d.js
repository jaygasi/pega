(self.webpackChunkj251=self.webpackChunkj251||[]).push([[64398572],{1957:(e,t,a)=>{window?.__webpack_nonce__&&(a.nc=window.__webpack_nonce__)},2020:(e,t,a)=>{var l={};function i(e){return Promise.resolve().then(()=>{if(!a.o(l,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a(l[e])})}i.keys=()=>Object.keys(l),i.id=2020,e.exports=i},6935:e=>{function t(e){return Promise.resolve().then(()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t})}t.keys=()=>[],t.resolve=t,t.id=6935,e.exports=t},8174:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>b,formatExists:()=>j,setDefaultValue:()=>A,textFormatter:()=>y});var l=a(1594),i=a(138),s=a(1847),n=a(7708),o=a(8147),r=a(7251),c=a(1093);a(1957);var d=a(8267);const u=d.Ay.div(()=>d.AH`
    margin: 0px 0;
    
    .option-emoji {
      font-size: 18px;
      margin-left: 4px;
      vertical-align: middle;
    }
    
    .display-emoji {
      font-size: 20px;
      margin-left: 6px;
      vertical-align: middle;
    }

    /* Container for picklist with external emoji */
    .picklist-with-emoji {
      display: flex;
      align-items: flex-end; /* Align to bottom to match select field level */
      gap: 0.5rem; /* Consistent spacing with other components */
      position: relative;
      width: 100%;
      
      /* Target the Select component wrapper (first child) */
      & > div:first-child {
        flex-grow: 1; /* Allows the select field to take up available space */
        min-width: 0; /* Allow the select to shrink if needed */
      }
      
      /* External emoji styling - positioned outside the select */
      .external-emoji {
        align-self: flex-end; /* Align emoji to bottom to match select field */
        margin-bottom: 0.15rem; /* Adjust to lower the emoji slightly more */
        flex-shrink: 0;
        font-size: 30px;
        width: 30px;
        height: 30px;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  `),p=d.Ay.div(()=>d.AH`
  display: flex;
  flex-direction: column;
`),g=d.Ay.div(()=>d.AH`
  font-weight: 600;
  margin-bottom: 4px;
`),h=d.Ay.div(()=>d.AH`
  font-size: 14px;
`),m=d.Ay.div(()=>d.AH`
  font-size: 24px;
  font-weight: 600;
`),f=d.Ay.div(()=>d.AH`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`);var x=a(4848);const v=(e,t)=>{if(!t||!e)return null;try{let a;if(a="object"==typeof t?t:JSON.parse(t),Array.isArray(a)){const t=a.find(t=>t.value.toLowerCase()===e.toLowerCase());return t?t.emoji:null}if(a.value_emojis&&Array.isArray(a.value_emojis)){const t=a.value_emojis.find(t=>t.value.toLowerCase()===e.toLowerCase());return t?t.emoji:null}return console.warn("Invalid emoji configuration format:",a),null}catch(e){return console.warn("Invalid emoji configuration JSON:",e),null}},j=e=>{let t=!1;return["TextInput","WorkStatus","RichText","Email","Phone","URL","Operator"].includes(e)&&(t=!0),t},y=(e,t)=>{let a=null;switch(e){case"TextInput":a=t;break;case"Email":a=(0,x.jsx)(s.A,{value:t,displayText:t,variant:"link"});break;case"Phone":a=(0,x.jsx)(n.A,{value:t,variant:"link"});break;case"URL":a=(0,x.jsx)(o.A,{target:"_blank",value:t,displayText:t,variant:"link"})}return a},A=(e,t,a)=>{const l=e?.[0]||{},i=l.key?l.props.value:"";t.setValue(a,i,i)},b=(0,c.A)(function(e){const{getPConnect:t,value:a,label:s,hideLabel:n=!1,placeholder:o,datasource:c={},listType:d,validatemessage:j,testId:y,helperText:b,additionalProps:w={},displayMode:k,onRecordChange:L,fieldMetadata:C={},hasSuggestions:_=!1,emojiConfig:S}=e;console.log("PickListEmoji emojiConfig:",S);const E=t(),N=E.getActionsApi(),T=E.getStateProps().value,O=E.getCaseInfo().getClassName(),D=T?.slice(T.lastIndexOf(".")+1);let{readOnly:P=!1,required:F=!1,disabled:I=!1}=e;[P,F,I]=[P,F,I].map(e=>!0===e||"string"==typeof e&&"true"===e);const[R,V]=(0,l.useState)(_?"pending":void 0),z=(()=>{const e=(0,l.useRef)(!0);return(0,l.useEffect)(()=>{e.current=!1},[]),e.current})(),H=Array.isArray(C)?C.find(e=>e?.classID===O):C;let M=H?.datasource?.propertyForDisplayText;M=M?.slice(M.lastIndexOf(".")+1);const U="DataPage"===H?.datasource?.tableType?"datapage":"associated",K="datapage"===U?"@baseclass":O,B="datapage"===U?H?.datasource?.name:D,q="datapage"===U?M:"",G=E.getConfigProps(),J="datapage"===d;let Y=J?G.listOutput:c;J&&"object"==typeof c&&!Array.isArray(Y)&&(Y=c.source?c.source:[]),(0,l.useEffect)(()=>{j&&V("error"),_?V("pending"):"success"!==R&&V(j?"error":void 0)},[j,_,R]);const{items:W,selectedLabel:Q}=(e=>{const{listSourceItems:t,isDatapage:a,pConnect:l,localePath:s,localeClass:n,localeContext:o,localeName:r,value:c,placeholder:d}=e,u=[];let p="";((e,t,a,l)=>{e?a.push((0,x.jsx)(i.A,{value:"",children:l.getLocalizedValue(e)},e)):t||a.push((0,x.jsx)(i.A,{value:""},""))})(d,t,u,l);for(const e of t||[]){const t=a?l.getLocalizedValue(e.text,s,l.getLocaleRuleNameFromKeys(n,o,r)):l.getLocalizedValue(e.value,s,l.getLocaleRuleNameFromKeys(n,o,r));null!=c&&void 0!==e.key&&null!==e.key&&c.toString()===e.key.toString()&&(p=t),u.push((0,x.jsx)(i.A,{value:e.key,children:(0,x.jsx)("span",{children:t})},e.key))}return{items:u,selectedLabel:p}})({listSourceItems:Y,isDatapage:J,pConnect:E,localePath:q,localeClass:K,localeContext:U,localeName:B,value:a,placeholder:o}),X="LABELS_LEFT"===k||"STACKED_LARGE_VAL"===k||"DISPLAY_ONLY"===k;let Z="",$="";if(!o&&Y?.length>0&&(Z=Y[0].key,$=Y[0].text||Y[0].value),(0,l.useEffect)(()=>{X||(o||a)&&(z||!a||Q)||A(W,E,T)},[Z,$,o,Q,a,T,X,z,E]),X)return(e=>{const{selectedLabel:t,value:a,emojiConfig:l,placeholder:i,displayMode:s,label:n,helperText:o}=e,r=t||(a?a.toString():i),c=v(r,l);return"LABELS_LEFT"===s?(0,x.jsxs)(p,{children:[(0,x.jsx)(g,{children:n}),(0,x.jsxs)(h,{children:[(0,x.jsx)("span",{children:r})," ",c&&(0,x.jsx)("span",{className:"display-emoji",children:c})]})]}):"STACKED_LARGE_VAL"===s?(0,x.jsxs)(p,{children:[(0,x.jsx)(g,{children:n}),(0,x.jsxs)(m,{children:[(0,x.jsx)("span",{children:r})," ",c&&(0,x.jsx)("span",{className:"display-emoji",children:c})]}),o&&(0,x.jsx)(f,{children:o})]}):(0,x.jsx)(p,{children:(0,x.jsxs)(h,{children:[(0,x.jsx)("span",{children:r})," ",c&&(0,x.jsx)("span",{className:"display-emoji",children:c})]})})})({selectedLabel:Q,value:a,emojiConfig:S,placeholder:o,displayMode:k,label:s,helperText:b});const ee=v(Q||(a?a.toString():""),S);return(0,x.jsx)(u,{children:(0,x.jsxs)("div",{className:"picklist-with-emoji",children:[(0,l.createElement)(r.A,{...w,label:s,labelHidden:n,info:j||b,status:R,"data-testid":y,key:t().getRawMetadata().config.value,value:a,disabled:I,required:F,readOnly:P,onChange:e=>{((e,t,a,l)=>{switch(t){case"change":e.updateFieldValue(a,l);break;case"blur":e.triggerFieldChange(a,l);break;case"changeNblur":e.updateFieldValue(a,l),e.triggerFieldChange(a,l)}})(N,"changeNblur",T,e.target.value),_&&(E.ignoreSuggestion(""),V(void 0)),L&&L(e)},onBlur:e=>{E.getValidationApi().validate(e.target.value)},onResolveSuggestion:e=>{((e,t,a)=>{e?(t.acceptSuggestion(),a("success")):(t.ignoreSuggestion(),a(void 0))})(e,E,V)}},W),ee&&(0,x.jsx)("span",{className:"external-emoji",children:ee})]})})})}}]);
//# sourceMappingURL=Aja100_Any_jaygasi_PickListEmoji.c8e0926d.js.map