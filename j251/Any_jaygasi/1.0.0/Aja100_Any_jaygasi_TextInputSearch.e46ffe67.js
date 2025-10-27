(self.webpackChunkj251=self.webpackChunkj251||[]).push([[48621572],{2020:(e,r,t)=>{var o={};function n(e){return Promise.resolve().then(()=>{if(!t.o(o,e)){var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}return t(o[e])})}n.keys=()=>Object.keys(o),n.id=2020,e.exports=n},2837:(e,r,t)=>{"use strict";t.d(r,{A:()=>ce});var o={};t.r(o),t.d(o,{Component:()=>I,name:()=>H,set:()=>C,viewBox:()=>P});var n={};t.r(n),t.d(n,{Component:()=>O,name:()=>_,set:()=>S,viewBox:()=>q});var i=t(4848),a=t(1594),s=t(8267),d=t(1357),l=t(9549),c=t(7501),u=t(9300),h=t(3351),b=t(8579),f=t(9586),p=t(2884),m=t(4853),g=t(3113),$=t(7321),A=t(7491),w=t(9187),y=t(7666),x=t(9576),v=t(4869),k=t(6878),j=t(6765);const C="budicon",H="warn-solid",I=()=>(0,i.jsx)("path",{d:"M23.5 22.5h-22l11-20 11 20Zm-9.741-6.935V9.39a1.655 1.655 0 0 0-1.166-.447c-.42 0-.792.134-1.212.447v6.175a3.23 3.23 0 0 0 1.212.223c.466 0 .839-.09 1.166-.223Zm-1.212 4.787c.466 0 .886-.179 1.212-.492.326-.313.466-.671.466-1.074 0-.447-.14-.85-.466-1.163-.326-.313-.746-.447-1.212-.447-.42 0-.792.134-1.119.447a1.594 1.594 0 0 0-.512 1.163c0 .403.186.76.512 1.074.327.313.7.492 1.119.492Z"}),P="0 0 25 25",S="budicon",_="diamond-minus",O=()=>(0,i.jsx)("path",{fill:"currentColor",fillRule:"evenodd",d:"M23.219 13.178a.96.96 0 0 0 0-1.356L13.179 1.78a.96.96 0 0 0-1.357 0L1.78 11.821a.96.96 0 0 0 0 1.357l10.04 10.041a.96.96 0 0 0 1.357 0l10.041-10.04ZM18 11.5H7v2h11v-2Z"}),q="0 0 25 25";var D=t(8072),E=t(4527);const R=s.Ay.div(({theme:{base:{"border-radius":e,"font-size":r,"font-scale":t,animation:{speed:o,timing:n},palette:i},components:{"form-field":a,"form-control":{"foreground-color":l,"background-color":c,"border-color":u,"border-radius":h,"border-width":b,":hover":{"border-color":f},":focus":{"border-color":p,"box-shadow":m},":disabled":{"border-color":g,"background-color":A},":read-only":{"border-color":w,"background-color":y}}}},status:x,hasSuggestion:v})=>{const k=(0,$.Vr)(r,t),j=x&&a[x]?a[x]["status-color"]:u,C=v&&x?(0,d.jh)(.1,a[x]["status-color"],i["primary-background"]):c;return s.AH`
      color: ${l};
      background-color: ${C};
      border-radius: calc(${e} * ${h});
      border-color: ${j};
      border-width: ${b};
      border-style: solid;
      transition-property: color, background-color, border-color;
      transition-duration: ${o};
      transition-timing-function: ${n.ease};
      &,
      & > select {
        outline: none;
      }

      &:disabled,
      &[disabled] {
        background-color: ${A};
        border-color: ${g};
        cursor: not-allowed;
      }

      &:focus:not([disabled]) {
        border-color: ${p};
        box-shadow: ${m};
        ${v&&s.AH`
          background-color: ${c};
        `}
      }

      &:focus-within:not([disabled]) {
        ${v&&s.AH`
          background-color: ${c};
        `}
      }

      &:hover:not([readonly]):not([disabled]):not(:focus, :focus-within) {
        ${!x&&s.AH`
          border-color: ${f};
        `}
        ${v&&s.AH`
          background-color: ${c};
          box-shadow: 0 0 0 0.125rem ${(0,d.B3)(j,.2)};
        `}
      }

      ${v&&s.AH`
        border-end-end-radius: 0;
      `}

      &[readonly] {
        background-color: ${y};
        border-color: ${w};
      }

      @media (pointer: coarse) {
        /* stylelint-disable-next-line unit-allowed-list */
        font-size: max(${k.s}, 16px);
      }
    `});R.defaultProps=l.qn,(0,a.forwardRef)(function(e,r){return(0,i.jsx)(R,{ref:r,...e})});var T=t(7940),L=t(5206),V=t(9463);const F=s.Ay.span`
  display: none;
`,z=(0,a.forwardRef)(function(e,r){const{portalTarget:t}=(0,V.A)();return t?(0,L.createPortal)((0,i.jsx)(F,{...e,ref:r}),t):null});var N=t(8044);const G=["label","info","additional-info","suggestion-accept","suggestion-reject"],M=(0,N.A)("form-field",G),Z=(0,N.A)("radio-check",["control",...G]),B=s.Ay.div(e=>{const{theme:{base:{spacing:r},components:{"form-field":t,"radio-check":{size:o,"touch-size":n,"background-color":i,"border-color":a,"border-width":d}}},status:l}=e;let c=a;return"error"!==l&&"warning"!==l||(c=t[l]["status-color"]),s.AH`
      display: flex;
      flex-shrink: 0;
      position: relative;
      width: ${o};
      height: ${o};
      margin-inline-end: calc(0.5 * ${r});
      border: ${d} solid ${c};
      background-color: ${i};

      @media (pointer: coarse) {
        width: ${n};
        height: ${n};
      }

      &::after {
        content: '';
        display: none;
      }
    `});B.defaultProps=l.qn;const U=s.Ay.input(e=>{const{disabled:r,theme:{base:{"border-radius":t},components:{"form-control":{":focus":{"box-shadow":o,"border-color":n},":read-only":{"background-color":i}},"radio-check":{size:a,":checked":{"background-color":l,"border-color":c}},checkbox:{"border-radius":u},"radio-button":{"border-radius":h}}}}=e,b=e.readOnly?i:l,f=(0,w.A)(()=>(0,$.W0)(b)),p=`+ ${g.G} ${B}`,{ltr:m}=(0,T.A)();return s.AH`
    ${d.Ic}
    margin: 0;

    /* Sets rect size for JAWS focus outline */
    width: ${a};
    height: ${a};

    ${!r&&s.AH`
      &:focus ${p} {
        box-shadow: ${o};
        border-color: ${n};
      }
    `}
    &:checked
      ${p},
      &:checked:disabled
      ${p},
      &[type='checkbox']:indeterminate
      ${p},
      &[type='checkbox']:indeterminate:disabled
      ${p} {
      border-color: ${e.readOnly?"inherit":c};
      background-color: ${b};

      &::after {
        display: block;
      }
    }

    &[type='radio'] ${p}, &[type='radio'] ${p}::after {
      border-radius: ${h};
    }

    &[type='radio'] ${p}::after {
      content: '';
      position: absolute;
      inset: 0;
      margin: auto;
      width: calc(${a} * 0.3);
      height: calc(${a} * 0.3);
      border-radius: ${h};
      border: calc(${a} * 0.2) solid ${f};
    }

    &[type='checkbox'] ${p} {
      border-radius: min(calc(${t} * ${u}), 0.25rem);
    }

    &[type='checkbox']:not(:indeterminate) ${p} {
      &::after {
        width: 40%;
        height: 75%;
        ${m?s.AH`
              transform: rotate(45deg) translate(50%, -30%);
            `:s.AH`
              transform: rotate(45deg) translate(-50%, 30%);
            `}
        border-right: 0.15em solid ${f};
        border-bottom: 0.15em solid ${f};
      }
    }

    &[type='checkbox']:indeterminate ${p} {
      display: flex;

      &::after {
        width: 90%;
        height: 0.15em;
        margin: auto;
        background-color: ${f};
      }
    }
  `});U.defaultProps=l.qn;const K=s.Ay.div(e=>{const{disabled:r,readOnly:t,theme:{base:o,components:{"radio-check":{label:{color:n,"font-weight":i}},"form-control":{":hover":{"border-color":a}}}}}=e,d=(0,$.Vr)(o["font-size"],o["font-scale"]);return s.AH`
      > ${g.G} {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-weight: ${i};
        word-break: break-word;
        font-size: ${d.s};
        color: ${n};
        margin: 0;
        min-height: ${o["hit-area"]["mouse-min"]};

        @media (pointer: coarse) {
          min-height: ${o["hit-area"]["finger-min"]};
        }
      }

      > ${X} {
        margin: 0;
        padding-inline-start: calc(${o.spacing} / 4);
      }

      ${!(r||t)&&s.AH`
        &:not(:focus-within) > ${g.G}:hover ${B} {
          border-color: ${a};
        }
      `}
    `});K.defaultProps=l.qn;const W=s.Ay.label(({disabled:e,readOnly:r,status:t,theme:{base:{palette:o,shadow:n,spacing:i},components:{card:a,"form-field":d,"radio-check":{label:l},"form-control":{":hover":{"border-color":c}}}}})=>{const u="error"===t?d.error["status-color"]:o["border-line"];return s.AH`
      min-width: min-content;
      cursor: pointer;
      background-color: ${a.background};
      border-radius: ${a["border-radius"]};
      border: 0.0625rem solid ${u};
      padding: ${i};

      ${e&&s.AH`
        cursor: not-allowed;
      `}
      ${!(e||r)&&s.AH`
        :hover:not(:focus-within) {
          border-color: ${c};

          ${g.G} ${B} {
            border-color: ${c};
          }
        }

        :focus-within {
          box-shadow: ${n.focus};
          border-color: transparent;
        }
      `}
        > ${g.G} {
        display: flex;
        align-items: center;
        color: ${l.color};
        font-weight: ${l["font-weight"]};
        margin: 0;
      }

      > ${X} {
        margin: 0;
        padding-inline-start: calc(${i} / 4);
      }
    `});W.defaultProps=l.qn;const Y=(0,a.forwardRef)(function(e,r){const t=(0,h.A)(),o=(0,f.A)(),{testId:n,type:s,id:d=t,label:l,required:c=!1,disabled:u=!1,readOnly:p=!1,indeterminate:g=!1,checked:$,defaultChecked:A,variant:w="simple",onClick:y,onKeyDown:v,onChange:k,status:j,info:C,additionalInfo:H,ariaDescribedby:I,className:P,...S}=e,_=(0,b.A)(n,Z),O="radio"===s,q="card"===w,D=(0,m.A)(r),E=(0,h.A)();return(0,a.useEffect)(()=>{!O&&D.current&&(D.current.indeterminate=!!g)},[D,g,O]),(0,i.jsx)(ie,{testId:_,as:q?W:K,label:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(B,{status:j,isRadio:O,as:R,required:c,disabled:u,readOnly:p,onMouseDown:e=>e.preventDefault()}),l,p&&(0,i.jsx)(z,{id:E,children:o("read_only")})]}),labelAs:q?"div":void 0,id:d,required:c,disabled:u,readOnly:p,status:j,info:C,isRadioCheck:!0,inline:!0,labelAfter:!0,additionalInfo:H,children:(0,i.jsx)(U,{"data-testid":_.control,...S,className:(0,x.A)("radio-check",P,{variant:w,type:s}),id:d,type:s,required:c,checked:$,defaultChecked:A,"aria-describedby":p?`${I} ${E}`:I,disabled:u,readOnly:p,onChange:k,onClick:e=>{p&&e.preventDefault(),y?.(e)},onKeyDown:e=>{"checkbox"===s&&p&&" "===e.key&&e.preventDefault(),"radio"===s&&p&&e.key.includes("Arrow")&&e.preventDefault(),v?.(e)},ref:D})})});(0,v.A)(Y,Z),(0,j.pU)(o,n,D);const J=(0,s.Ay)(j.Ay)(({theme:e,status:r})=>s.AH`
    height: 1em;
    width: 1em;
    color: ${(0,w.A)(()=>(0,$.ho)(e.components["form-field"][r]["status-color"],e.base.palette["primary-background"]),()=>e.components["form-field"][r]["status-color"])};
    vertical-align: baseline;
  `);J.defaultProps=l.qn;const Q=(0,s.Ay)(k.Ay)(({theme:e})=>s.AH`
    margin-block-start: calc(${e.base.spacing} / 2);
    align-self: start;
  `);Q.defaultProps=l.qn;const X=s.Ay.div(({status:e,theme:{base:{"font-size":r,"font-scale":t,spacing:o,palette:n},components:{"form-field":i}}})=>{const{xxs:a}=(0,$.Vr)(r,t);return s.AH`
      max-width: max-content;
      font-size: ${a};
      word-break: break-word;

      &:not(:empty) {
        margin-block-start: calc(0.25 * ${o});
      }

      ${e&&i[e]&&s.AH`
        color: ${(0,w.A)(()=>(0,$.ho)(i[e]["status-color"],n["primary-background"]),()=>i[e]["status-color"])};
      `}
    `});X.defaultProps=l.qn;const ee=s.Ay.div``,re=s.Ay.div(e=>{const{labelAsLegend:r,isRadioCheck:t,showAdditionalInfo:o,disabled:n,required:i,theme:{base:{palette:{urgent:a},"disabled-opacity":d,spacing:l,"hit-area":{"compact-min":c}}}}=e;return s.AH`
    ${n&&s.AH`
      opacity: ${d};
      -webkit-user-select: none;
      user-select: none;
    `}
    position: relative;
    border: 0;

    &:has(${U}:only-of-type) {
      ${X} {
        min-width: 100%;
      }
    }

    > ${g.G}, > ${ee} {
      &:not(:empty) {
        margin-bottom: calc(0.25 * ${l});
        min-height: ${c};
      }
    }

    > ${g.G}, > ${ee} > ${g.G} {
      ${i&&s.AH`
        &::after {
          content: ${'"\\00a0*" / ""'};
          color: ${a};
        }
      `}

      ${n&&s.AH`
        cursor: not-allowed;
      `}
    }

    ${r&&s.AH`
      > legend {
        display: inline-flex;
        align-items: flex-end;
      }
    `}

    ${r&&o&&s.AH`
      display: block;

      > legend {
        float: inline-start;
      }

      > ${E.f} {
        ${!t&&s.AH`
          float: inline-end;
        `}
        + * {
          clear: both;
        }
      }
    `}
  `});re.defaultProps=l.qn;const te=(0,s.Ay)(k.Ay)(({theme:{base:{"font-size":e,"font-scale":r,"border-radius":t,spacing:o,palette:n},components:{"form-control":{"border-radius":i,"border-width":a},"form-field":l}}})=>{const{xxs:c}=(0,$.Vr)(e,r),u=(0,w.A)(()=>(0,$.ho)(l.pending["status-color"],n["primary-background"]),()=>l.pending["status-color"]),h=(0,$.ZV)(u),b=(0,w.A)(()=>(0,$.W0)(u)),f=b?(0,d.B3)(b,.4):b;return s.AH`
    background-color: ${u};
    color: ${b};
    font-size: ${c};
    min-width: calc(3 * ${o});
    min-height: calc(3 * ${o});
    padding: 0 ${o};
    border-radius: 0;
    border: none;

    &:first-child {
      border-inline-end: ${a} solid ${f};
      border-end-start-radius: calc(${t} * ${i});
      margin-inline-start: calc(2 * ${o});
    }

    &:last-child {
      border-end-end-radius: calc(${t} * ${i});
      margin-inline-start: 0;
    }

    &:hover {
      color: ${h.foreground};
      background-color: ${h.background};
    }

    @media (pointer: coarse) {
      min-height: 2rem;
    }
  `});te.defaultProps=l.qn;const oe={error:"warn-solid",warning:"diamond-minus",success:"check"},ne=(0,a.forwardRef)(function(e,r){const t=(0,h.A)(),{testId:o,children:n,id:s=t,as:d="div",label:l,labelAs:$="label",labelFor:w=s,labelId:v,labelHidden:k=!1,labelAfter:j=!1,info:C,status:H,isRadioCheck:I,charLimitDisplay:P,required:S=!1,disabled:_=!1,readOnly:O=!1,inline:q=!1,onClear:D,actions:R,container:T,additionalInfo:L,onResolveSuggestion:V,"aria-describedby":F,className:z,...N}=e,G=(0,b.A)(o,M),Z=(0,f.A)(),{announceAssertive:B}=(0,p.A)(),U="legend"===$,K="pending"===H&&!!V,W=(0,m.A)(r),Y=(0,a.useRef)(null),[ne,ie]=(0,a.useState)(null),ae=!!L&&!_&&!k,se=(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(g.A,{"data-testid":G.label,id:v,as:$,htmlFor:"label"===$?w:void 0,labelHidden:k,onClick:e=>{O&&e.preventDefault()},inline:q,ref:Y,children:l}),ae&&ne&&(0,i.jsx)(E.A,{"data-testid":G.additionalInfo,heading:L.heading,contextualLabel:ne,children:L.content})]}),de=I||U||k?se:(0,i.jsx)(c.A,{as:ee,container:{justify:"between",alignItems:"end"},item:{alignSelf:"stretch"},children:se});let le;if((0,a.useEffect)(()=>{ie(Y.current?.textContent??null)},[l]),(0,a.useEffect)(()=>{if("error"===H||"warning"===H){let e=`${Z(H)} ${C}`;Y.current?.textContent&&(e=`${Y.current?.textContent} ${e}`),B({message:e,type:H})}},[H,C]),U||a.Children.count(n)>1)le=n;else{const e=a.Children.only(n).props["aria-describedby"];le=(0,a.cloneElement)(n,{"aria-describedby":[e,C?`${s}-info`:void 0].join(" ").trim()||void 0})}R&&(le=(0,i.jsxs)(c.A,{container:{alignItems:"center",gap:.5},children:[le,(0,i.jsx)(u.A,{items:R,menuAt:3})]}));let ce=(0,i.jsxs)(c.A,{id:`${s}-info`,"data-testid":G.info,status:H,as:X,container:{alignItems:"center",gap:.5},children:[H&&"pending"!==H&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(c.A,{item:{alignSelf:"start"},as:J,status:H,name:oe[H]}),(0,i.jsx)(A.A,{children:`${Z(H)} `})]}),C]});if(P&&(ce=(0,i.jsxs)(c.A,{container:{justify:ce?"between":"end",gap:1},children:[ce,(0,i.jsx)(c.A,{item:{shrink:0},children:P})]})),K){const e=(0,y.A)(W);ce=(0,i.jsxs)(c.A,{container:{alignItems:"start",justify:"between"},children:[(0,i.jsxs)(X,{"data-testid":G.info,status:H,id:`${s}-info`,children:[Z("suggestion_info"),(0,i.jsx)(A.A,{"aria-live":"polite",children:Z("suggestion_assist")})]}),(0,i.jsxs)(c.A,{container:{wrap:"nowrap"},children:[(0,i.jsx)(te,{"data-testid":G.suggestionReject,onClick:()=>{V(!1),e[0]?.focus()},"aria-label":`${Z("no")}, ${Z("reject_suggestion_button_a11y")}${ne?` - ${ne}`:""}`,children:Z("no")}),(0,i.jsx)(te,{"data-testid":G.suggestionAccept,onClick:()=>{V(!0),e[0]?.focus()},"aria-label":`${Z("yes")}, ${Z("accept_suggestion_button_a11y")}${ne?` - ${ne}`:""}`,children:Z("yes")})]})]})}const ue=[];return F&&ue.push(F),U&&C&&ue.push(`${s}-info`),(0,i.jsxs)(c.A,{"data-testid":G.root,...N,container:{direction:q?"row":"column",alignItems:q?"center":void 0,wrap:I?"wrap":void 0,...T},as:re,labelAsLegend:U,isRadioCheck:I,showAdditionalInfo:ae,id:`${s}-field`,forwardedAs:d,required:S,disabled:_,readOnly:O,onKeyDown:K?e=>{"Enter"===e.key&&(e.target.closest("button")||(e.preventDefault(),V?.(!0)))}:void 0,"aria-describedby":ue.length?ue.join(" "):void 0,ref:W,className:(0,x.A)("form-field",z,{status:H}),children:[(U||!j)&&de,le,!U&&j&&de,!O&&ce,I&&D&&(0,i.jsx)(Q,{variant:"link",onClick:()=>{D()},children:Z("clear_selection")})]})}),ie=(0,v.A)(ne,M);var ae=t(3974);s.Ay.div`
  gap: 1rem;

  /* Let flex items be aligned to the baseline of their first child */
  align-items: baseline;

  ${R} {
    position: relative;
  }

  > :first-child {
    > ${R}:after {
      content: '-';
      position: absolute;
      width: 1rem;
      inset-inline-end: -1rem;
      text-align: center;
    }
  }

  > ${R}:first-child:after {
    content: '-';
    position: absolute;
    width: 1rem;
    inset-inline-end: -1rem;
    text-align: center;
  }

  > * {
    flex-grow: 1;
    flex-basis: 50%;
  }

  > ${re} {
    /* Override 'display: flex' to not interfere with labels' baseline alignment */
    display: block;

    ${g.G} {
      /* Enable baseline alignment against this element */
      display: inline-block;
    }
  }
`.defaultProps=l.qn;const se=s.Ay.input(({theme:{base:e,components:r}})=>s.AH`
    width: 100%;
    height: ${r.input.height};
    min-height: ${e["hit-area"]["mouse-min"]};
    padding-block: 0;
    padding-inline: ${r.input.padding};
    appearance: none;
    -webkit-appearance: none;
    text-align: inherit;

    @media (pointer: coarse) {
      min-height: ${e["hit-area"]["finger-min"]};
    }
  `);se.defaultProps=l.qn;const de=se,le=(0,N.A)("input",["control",...G]),ce=(0,v.A)((0,a.forwardRef)(function(e,r){const t=(0,h.A)(),{testId:o,id:n=t,value:a,defaultValue:s,required:d=!1,disabled:l=!1,readOnly:c=!1,label:u,additionalInfo:f,labelHidden:p,info:m,status:g,actions:$,onResolveSuggestion:A,className:w,...y}=e,v=(0,b.A)(o,le),k={};(0,ae.A)(e,"value")?k.value=a??"":(0,ae.A)(e,"defaultValue")&&(k.defaultValue=s??"");const j=(0,i.jsx)(R,{"data-testid":v.control,ref:r,id:n,required:d,disabled:l,readOnly:c,status:g,hasSuggestion:!!A&&"pending"===g,...k,autoComplete:"_off",...y,as:de,className:(0,x.A)("input",w)});return u?(0,i.jsx)(ie,{testId:v,additionalInfo:f,label:u,labelHidden:p,id:n,info:m,readOnly:c,status:g,required:d,disabled:l,actions:$,onResolveSuggestion:A,children:j}):j}),le)},6467:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>$});var o={};t.r(o),t.d(o,{Component:()=>m,name:()=>p,set:()=>f,viewBox:()=>g});var n=t(1594),i=t(6765),a=t(5882),s=t(7521),d=t(2837),l=t(6878),c=t(1093),u=(t(6859),t(8267));const h=u.Ay.div(()=>u.AH`
    display: flex;
    align-items: flex-end; /* Align to bottom to match input field level */
    gap: 0.5rem; /* Adds a small space between the input and the button */
    position: relative;
    width: 100%; /* Take full width like before */

    & > div:first-child { /* Targets the Cosmos Input component's wrapper */
      flex-grow: 1; /* Allows the input field to take up available space */
      min-width: 0; /* Allow the input to shrink if needed */
    }

    /* Button positioning for proper vertical alignment */
    button {
      align-self: flex-end; /* Align button to bottom to match input field */
      margin-bottom: -0.15rem; /* Adjust to lower the button slightly more */
      flex-shrink: 0;

      /* Consistent button size */
      min-width: 40px;
      min-height: 40px;

      /* Improve visual appearance */
      transition: all 0.2s ease;

      /* Increase icon size */
      svg {
        width: 20px;
        height: 20px;
      }

      &:hover:not(:disabled) {
        transform: scale(1.05);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  `);var b=t(4848);const f="budicon",p="search",m=()=>(0,b.jsx)("path",{d:"m18.513 17.115 4.754 4.755.047.14c.14.232.186.42.186.512 0 .653-.326.979-.979.979-.186 0-.42-.094-.652-.28l-4.708-4.708c-1.77 1.445-3.776 2.144-6.06 2.144-2.656 0-4.894-.932-6.758-2.797-1.91-1.91-2.843-4.148-2.843-6.758 0-2.61.932-4.848 2.843-6.759C6.253 2.433 8.491 1.5 11.102 1.5c2.61 0 4.847.932 6.758 2.843 1.865 1.864 2.797 4.102 2.797 6.759 0 2.237-.7 4.242-2.144 6.013Zm-7.365 1.631c2.098 0 3.869-.746 5.36-2.237 1.492-1.492 2.238-3.263 2.238-5.36 0-2.099-.746-3.916-2.237-5.408-1.492-1.492-3.263-2.237-5.36-2.237-2.099 0-3.916.745-5.408 2.237-1.492 1.492-2.237 3.31-2.237 5.407 0 2.098.745 3.869 2.237 5.36 1.492 1.492 3.31 2.238 5.407 2.238Z"}),g="0 0 25 25";(0,i.pU)(o);const $=(0,c.A)(function(e){const{getPConnect:r,placeholder:t,validatemessage:o,label:c,hideLabel:u=!1,helperText:f,testId:p,additionalProps:m={},value:g,searchPropRef:$,displayMode:A}=e,w=r().getActionsApi(),[y,x,v]=[e.readOnly,e.required,e.disabled].map(e=>!0===e||"string"==typeof e&&"true"===e),[k,j]=(0,n.useState)(g);if((0,n.useEffect)(()=>j(g),[g]),"DISPLAY_ONLY"===A){const e=g||(0,b.jsx)("span",{"aria-hidden":"true",children:"––"});return(0,b.jsx)(h,{children:e})}if("LABELS_LEFT"===A){const e=g||(0,b.jsx)("span",{"aria-hidden":"true",children:"––"});return(0,b.jsx)(h,{children:(0,b.jsx)(a.Ay,{variant:u?"stacked":"inline","data-testid":p,fields:[{id:"1",name:u?"":c,value:e}]})})}if("STACKED_LARGE_VAL"===A){const e=void 0!==g&&""!==g?(0,b.jsx)(s.A,{variant:"h1",as:"span",children:g}):"";return(0,b.jsx)(h,{children:(0,b.jsx)(a.Ay,{variant:"stacked","data-testid":p,fields:[{id:"2",name:u?"":c,value:e}]})})}return(0,b.jsxs)(h,{children:[(0,b.jsx)(d.A,{...m,type:"text",label:c,labelHidden:u,value:k,placeholder:t,helperText:f,info:o,onChange:e=>{j(e.target.value)},readOnly:y,disabled:v,required:x,"data-testid":p}),(0,b.jsx)(l.Ay,{variant:"simple",label:"Search",iconOnly:!0,onClick:()=>{if(console.log("TextInputSearch: Search button clicked!",{inputValue:k,searchPropRef:$,disabled:v,readOnly:y}),!k?.trim())return console.warn("TextInputSearch: No search text provided"),void alert("Please enter search text first");if($)try{w.triggerFieldChange($,k),console.log("TextInputSearch: Triggered server search for:",k)}catch(e){console.error("TextInputSearch: Failed to trigger server search:",e)}(e=>{try{window.dispatchEvent(new CustomEvent("pdfViewerSearch",{detail:{searchText:e,property:$}})),window.dispatchEvent(new CustomEvent("simplePdfViewerSearch",{detail:{searchText:e,property:$}})),window.PDFSearchManager&&window.PDFSearchManager.triggerSearch(e),window.simplePdfViewer?.search&&window.simplePdfViewer.search(e)&&console.log("TextInputSearch: PDF viewer handled search directly"),window.pdfViewer?.search&&window.pdfViewer.search(e),console.log("TextInputSearch: Dispatched PDF search events for:",e)}catch(e){console.error("TextInputSearch: Error in PDF search communication:",e)}})(k)},disabled:v||y||!k?.trim(),"data-testid":`${p}-search`,title:`Search for: ${k||"Enter text first"}`,children:(0,b.jsx)(i.Ay,{name:"search"})})]})})},6859:(e,r,t)=>{window?.__webpack_nonce__&&(t.nc=window.__webpack_nonce__)},6935:e=>{function r(e){return Promise.resolve().then(()=>{var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r})}r.keys=()=>[],r.resolve=r,r.id=6935,e.exports=r}}]);
//# sourceMappingURL=Aja100_Any_jaygasi_TextInputSearch.e46ffe67.js.map