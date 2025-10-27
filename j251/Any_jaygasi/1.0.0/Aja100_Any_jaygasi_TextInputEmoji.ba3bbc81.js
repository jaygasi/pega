(self.webpackChunkj251=self.webpackChunkj251||[]).push([[84651018],{2020:(e,t,i)=>{var o={};function n(e){return Promise.resolve().then(()=>{if(!i.o(o,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return i(o[e])})}n.keys=()=>Object.keys(o),n.id=2020,e.exports=n},2837:(e,t,i)=>{"use strict";i.d(t,{A:()=>ce});var o={};i.r(o),i.d(o,{Component:()=>I,name:()=>_,set:()=>L,viewBox:()=>C});var n={};i.r(n),i.d(n,{Component:()=>D,name:()=>H,set:()=>S,viewBox:()=>E});var a=i(4848),r=i(1594),s=i(8267),d=i(1357),l=i(9549),c=i(7501),u=i(9300),m=i(3351),h=i(8579),p=i(9586),f=i(2884),b=i(4853),g=i(3113),$=i(7321),y=i(7491),x=i(9187),A=i(7666),w=i(9576),v=i(4869),k=i(6878),j=i(6765);const L="budicon",_="warn-solid",I=()=>(0,a.jsx)("path",{d:"M23.5 22.5h-22l11-20 11 20Zm-9.741-6.935V9.39a1.655 1.655 0 0 0-1.166-.447c-.42 0-.792.134-1.212.447v6.175a3.23 3.23 0 0 0 1.212.223c.466 0 .839-.09 1.166-.223Zm-1.212 4.787c.466 0 .886-.179 1.212-.492.326-.313.466-.671.466-1.074 0-.447-.14-.85-.466-1.163-.326-.313-.746-.447-1.212-.447-.42 0-.792.134-1.119.447a1.594 1.594 0 0 0-.512 1.163c0 .403.186.76.512 1.074.327.313.7.492 1.119.492Z"}),C="0 0 25 25",S="budicon",H="diamond-minus",D=()=>(0,a.jsx)("path",{fill:"currentColor",fillRule:"evenodd",d:"M23.219 13.178a.96.96 0 0 0 0-1.356L13.179 1.78a.96.96 0 0 0-1.357 0L1.78 11.821a.96.96 0 0 0 0 1.357l10.04 10.041a.96.96 0 0 0 1.357 0l10.041-10.04ZM18 11.5H7v2h11v-2Z"}),E="0 0 25 25";var O=i(8072),T=i(4527);const z=s.Ay.div(({theme:{base:{"border-radius":e,"font-size":t,"font-scale":i,animation:{speed:o,timing:n},palette:a},components:{"form-field":r,"form-control":{"foreground-color":l,"background-color":c,"border-color":u,"border-radius":m,"border-width":h,":hover":{"border-color":p},":focus":{"border-color":f,"box-shadow":b},":disabled":{"border-color":g,"background-color":y},":read-only":{"border-color":x,"background-color":A}}}},status:w,hasSuggestion:v})=>{const k=(0,$.Vr)(t,i),j=w&&r[w]?r[w]["status-color"]:u,L=v&&w?(0,d.jh)(.1,r[w]["status-color"],a["primary-background"]):c;return s.AH`
      color: ${l};
      background-color: ${L};
      border-radius: calc(${e} * ${m});
      border-color: ${j};
      border-width: ${h};
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
        background-color: ${y};
        border-color: ${g};
        cursor: not-allowed;
      }

      &:focus:not([disabled]) {
        border-color: ${f};
        box-shadow: ${b};
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
        ${!w&&s.AH`
          border-color: ${p};
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
        background-color: ${A};
        border-color: ${x};
      }

      @media (pointer: coarse) {
        /* stylelint-disable-next-line unit-allowed-list */
        font-size: max(${k.s}, 16px);
      }
    `});z.defaultProps=l.qn,(0,r.forwardRef)(function(e,t){return(0,a.jsx)(z,{ref:t,...e})});var q=i(7940),P=i(5206),N=i(9463);const R=s.Ay.span`
  display: none;
`,F=(0,r.forwardRef)(function(e,t){const{portalTarget:i}=(0,N.A)();return i?(0,P.createPortal)((0,a.jsx)(R,{...e,ref:t}),i):null});var V=i(8044);const G=["label","info","additional-info","suggestion-accept","suggestion-reject"],Y=(0,V.A)("form-field",G),B=(0,V.A)("radio-check",["control",...G]),K=s.Ay.div(e=>{const{theme:{base:{spacing:t},components:{"form-field":i,"radio-check":{size:o,"touch-size":n,"background-color":a,"border-color":r,"border-width":d}}},status:l}=e;let c=r;return"error"!==l&&"warning"!==l||(c=i[l]["status-color"]),s.AH`
      display: flex;
      flex-shrink: 0;
      position: relative;
      width: ${o};
      height: ${o};
      margin-inline-end: calc(0.5 * ${t});
      border: ${d} solid ${c};
      background-color: ${a};

      @media (pointer: coarse) {
        width: ${n};
        height: ${n};
      }

      &::after {
        content: '';
        display: none;
      }
    `});K.defaultProps=l.qn;const M=s.Ay.input(e=>{const{disabled:t,theme:{base:{"border-radius":i},components:{"form-control":{":focus":{"box-shadow":o,"border-color":n},":read-only":{"background-color":a}},"radio-check":{size:r,":checked":{"background-color":l,"border-color":c}},checkbox:{"border-radius":u},"radio-button":{"border-radius":m}}}}=e,h=e.readOnly?a:l,p=(0,x.A)(()=>(0,$.W0)(h)),f=`+ ${g.G} ${K}`,{ltr:b}=(0,q.A)();return s.AH`
    ${d.Ic}
    margin: 0;

    /* Sets rect size for JAWS focus outline */
    width: ${r};
    height: ${r};

    ${!t&&s.AH`
      &:focus ${f} {
        box-shadow: ${o};
        border-color: ${n};
      }
    `}
    &:checked
      ${f},
      &:checked:disabled
      ${f},
      &[type='checkbox']:indeterminate
      ${f},
      &[type='checkbox']:indeterminate:disabled
      ${f} {
      border-color: ${e.readOnly?"inherit":c};
      background-color: ${h};

      &::after {
        display: block;
      }
    }

    &[type='radio'] ${f}, &[type='radio'] ${f}::after {
      border-radius: ${m};
    }

    &[type='radio'] ${f}::after {
      content: '';
      position: absolute;
      inset: 0;
      margin: auto;
      width: calc(${r} * 0.3);
      height: calc(${r} * 0.3);
      border-radius: ${m};
      border: calc(${r} * 0.2) solid ${p};
    }

    &[type='checkbox'] ${f} {
      border-radius: min(calc(${i} * ${u}), 0.25rem);
    }

    &[type='checkbox']:not(:indeterminate) ${f} {
      &::after {
        width: 40%;
        height: 75%;
        ${b?s.AH`
              transform: rotate(45deg) translate(50%, -30%);
            `:s.AH`
              transform: rotate(45deg) translate(-50%, 30%);
            `}
        border-right: 0.15em solid ${p};
        border-bottom: 0.15em solid ${p};
      }
    }

    &[type='checkbox']:indeterminate ${f} {
      display: flex;

      &::after {
        width: 90%;
        height: 0.15em;
        margin: auto;
        background-color: ${p};
      }
    }
  `});M.defaultProps=l.qn;const U=s.Ay.div(e=>{const{disabled:t,readOnly:i,theme:{base:o,components:{"radio-check":{label:{color:n,"font-weight":a}},"form-control":{":hover":{"border-color":r}}}}}=e,d=(0,$.Vr)(o["font-size"],o["font-scale"]);return s.AH`
      > ${g.G} {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-weight: ${a};
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

      ${!(t||i)&&s.AH`
        &:not(:focus-within) > ${g.G}:hover ${K} {
          border-color: ${r};
        }
      `}
    `});U.defaultProps=l.qn;const Z=s.Ay.label(({disabled:e,readOnly:t,status:i,theme:{base:{palette:o,shadow:n,spacing:a},components:{card:r,"form-field":d,"radio-check":{label:l},"form-control":{":hover":{"border-color":c}}}}})=>{const u="error"===i?d.error["status-color"]:o["border-line"];return s.AH`
      min-width: min-content;
      cursor: pointer;
      background-color: ${r.background};
      border-radius: ${r["border-radius"]};
      border: 0.0625rem solid ${u};
      padding: ${a};

      ${e&&s.AH`
        cursor: not-allowed;
      `}
      ${!(e||t)&&s.AH`
        :hover:not(:focus-within) {
          border-color: ${c};

          ${g.G} ${K} {
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
        padding-inline-start: calc(${a} / 4);
      }
    `});Z.defaultProps=l.qn;const J=(0,r.forwardRef)(function(e,t){const i=(0,m.A)(),o=(0,p.A)(),{testId:n,type:s,id:d=i,label:l,required:c=!1,disabled:u=!1,readOnly:f=!1,indeterminate:g=!1,checked:$,defaultChecked:y,variant:x="simple",onClick:A,onKeyDown:v,onChange:k,status:j,info:L,additionalInfo:_,ariaDescribedby:I,className:C,...S}=e,H=(0,h.A)(n,B),D="radio"===s,E="card"===x,O=(0,b.A)(t),T=(0,m.A)();return(0,r.useEffect)(()=>{!D&&O.current&&(O.current.indeterminate=!!g)},[O,g,D]),(0,a.jsx)(ae,{testId:H,as:E?Z:U,label:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(K,{status:j,isRadio:D,as:z,required:c,disabled:u,readOnly:f,onMouseDown:e=>e.preventDefault()}),l,f&&(0,a.jsx)(F,{id:T,children:o("read_only")})]}),labelAs:E?"div":void 0,id:d,required:c,disabled:u,readOnly:f,status:j,info:L,isRadioCheck:!0,inline:!0,labelAfter:!0,additionalInfo:_,children:(0,a.jsx)(M,{"data-testid":H.control,...S,className:(0,w.A)("radio-check",C,{variant:x,type:s}),id:d,type:s,required:c,checked:$,defaultChecked:y,"aria-describedby":f?`${I} ${T}`:I,disabled:u,readOnly:f,onChange:k,onClick:e=>{f&&e.preventDefault(),A?.(e)},onKeyDown:e=>{"checkbox"===s&&f&&" "===e.key&&e.preventDefault(),"radio"===s&&f&&e.key.includes("Arrow")&&e.preventDefault(),v?.(e)},ref:O})})});(0,v.A)(J,B),(0,j.pU)(o,n,O);const W=(0,s.Ay)(j.Ay)(({theme:e,status:t})=>s.AH`
    height: 1em;
    width: 1em;
    color: ${(0,x.A)(()=>(0,$.ho)(e.components["form-field"][t]["status-color"],e.base.palette["primary-background"]),()=>e.components["form-field"][t]["status-color"])};
    vertical-align: baseline;
  `);W.defaultProps=l.qn;const Q=(0,s.Ay)(k.Ay)(({theme:e})=>s.AH`
    margin-block-start: calc(${e.base.spacing} / 2);
    align-self: start;
  `);Q.defaultProps=l.qn;const X=s.Ay.div(({status:e,theme:{base:{"font-size":t,"font-scale":i,spacing:o,palette:n},components:{"form-field":a}}})=>{const{xxs:r}=(0,$.Vr)(t,i);return s.AH`
      max-width: max-content;
      font-size: ${r};
      word-break: break-word;

      &:not(:empty) {
        margin-block-start: calc(0.25 * ${o});
      }

      ${e&&a[e]&&s.AH`
        color: ${(0,x.A)(()=>(0,$.ho)(a[e]["status-color"],n["primary-background"]),()=>a[e]["status-color"])};
      `}
    `});X.defaultProps=l.qn;const ee=s.Ay.div``,te=s.Ay.div(e=>{const{labelAsLegend:t,isRadioCheck:i,showAdditionalInfo:o,disabled:n,required:a,theme:{base:{palette:{urgent:r},"disabled-opacity":d,spacing:l,"hit-area":{"compact-min":c}}}}=e;return s.AH`
    ${n&&s.AH`
      opacity: ${d};
      -webkit-user-select: none;
      user-select: none;
    `}
    position: relative;
    border: 0;

    &:has(${M}:only-of-type) {
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
      ${a&&s.AH`
        &::after {
          content: ${'"\\00a0*" / ""'};
          color: ${r};
        }
      `}

      ${n&&s.AH`
        cursor: not-allowed;
      `}
    }

    ${t&&s.AH`
      > legend {
        display: inline-flex;
        align-items: flex-end;
      }
    `}

    ${t&&o&&s.AH`
      display: block;

      > legend {
        float: inline-start;
      }

      > ${T.f} {
        ${!i&&s.AH`
          float: inline-end;
        `}
        + * {
          clear: both;
        }
      }
    `}
  `});te.defaultProps=l.qn;const ie=(0,s.Ay)(k.Ay)(({theme:{base:{"font-size":e,"font-scale":t,"border-radius":i,spacing:o,palette:n},components:{"form-control":{"border-radius":a,"border-width":r},"form-field":l}}})=>{const{xxs:c}=(0,$.Vr)(e,t),u=(0,x.A)(()=>(0,$.ho)(l.pending["status-color"],n["primary-background"]),()=>l.pending["status-color"]),m=(0,$.ZV)(u),h=(0,x.A)(()=>(0,$.W0)(u)),p=h?(0,d.B3)(h,.4):h;return s.AH`
    background-color: ${u};
    color: ${h};
    font-size: ${c};
    min-width: calc(3 * ${o});
    min-height: calc(3 * ${o});
    padding: 0 ${o};
    border-radius: 0;
    border: none;

    &:first-child {
      border-inline-end: ${r} solid ${p};
      border-end-start-radius: calc(${i} * ${a});
      margin-inline-start: calc(2 * ${o});
    }

    &:last-child {
      border-end-end-radius: calc(${i} * ${a});
      margin-inline-start: 0;
    }

    &:hover {
      color: ${m.foreground};
      background-color: ${m.background};
    }

    @media (pointer: coarse) {
      min-height: 2rem;
    }
  `});ie.defaultProps=l.qn;const oe={error:"warn-solid",warning:"diamond-minus",success:"check"},ne=(0,r.forwardRef)(function(e,t){const i=(0,m.A)(),{testId:o,children:n,id:s=i,as:d="div",label:l,labelAs:$="label",labelFor:x=s,labelId:v,labelHidden:k=!1,labelAfter:j=!1,info:L,status:_,isRadioCheck:I,charLimitDisplay:C,required:S=!1,disabled:H=!1,readOnly:D=!1,inline:E=!1,onClear:O,actions:z,container:q,additionalInfo:P,onResolveSuggestion:N,"aria-describedby":R,className:F,...V}=e,G=(0,h.A)(o,Y),B=(0,p.A)(),{announceAssertive:K}=(0,f.A)(),M="legend"===$,U="pending"===_&&!!N,Z=(0,b.A)(t),J=(0,r.useRef)(null),[ne,ae]=(0,r.useState)(null),re=!!P&&!H&&!k,se=(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(g.A,{"data-testid":G.label,id:v,as:$,htmlFor:"label"===$?x:void 0,labelHidden:k,onClick:e=>{D&&e.preventDefault()},inline:E,ref:J,children:l}),re&&ne&&(0,a.jsx)(T.A,{"data-testid":G.additionalInfo,heading:P.heading,contextualLabel:ne,children:P.content})]}),de=I||M||k?se:(0,a.jsx)(c.A,{as:ee,container:{justify:"between",alignItems:"end"},item:{alignSelf:"stretch"},children:se});let le;if((0,r.useEffect)(()=>{ae(J.current?.textContent??null)},[l]),(0,r.useEffect)(()=>{if("error"===_||"warning"===_){let e=`${B(_)} ${L}`;J.current?.textContent&&(e=`${J.current?.textContent} ${e}`),K({message:e,type:_})}},[_,L]),M||r.Children.count(n)>1)le=n;else{const e=r.Children.only(n).props["aria-describedby"];le=(0,r.cloneElement)(n,{"aria-describedby":[e,L?`${s}-info`:void 0].join(" ").trim()||void 0})}z&&(le=(0,a.jsxs)(c.A,{container:{alignItems:"center",gap:.5},children:[le,(0,a.jsx)(u.A,{items:z,menuAt:3})]}));let ce=(0,a.jsxs)(c.A,{id:`${s}-info`,"data-testid":G.info,status:_,as:X,container:{alignItems:"center",gap:.5},children:[_&&"pending"!==_&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(c.A,{item:{alignSelf:"start"},as:W,status:_,name:oe[_]}),(0,a.jsx)(y.A,{children:`${B(_)} `})]}),L]});if(C&&(ce=(0,a.jsxs)(c.A,{container:{justify:ce?"between":"end",gap:1},children:[ce,(0,a.jsx)(c.A,{item:{shrink:0},children:C})]})),U){const e=(0,A.A)(Z);ce=(0,a.jsxs)(c.A,{container:{alignItems:"start",justify:"between"},children:[(0,a.jsxs)(X,{"data-testid":G.info,status:_,id:`${s}-info`,children:[B("suggestion_info"),(0,a.jsx)(y.A,{"aria-live":"polite",children:B("suggestion_assist")})]}),(0,a.jsxs)(c.A,{container:{wrap:"nowrap"},children:[(0,a.jsx)(ie,{"data-testid":G.suggestionReject,onClick:()=>{N(!1),e[0]?.focus()},"aria-label":`${B("no")}, ${B("reject_suggestion_button_a11y")}${ne?` - ${ne}`:""}`,children:B("no")}),(0,a.jsx)(ie,{"data-testid":G.suggestionAccept,onClick:()=>{N(!0),e[0]?.focus()},"aria-label":`${B("yes")}, ${B("accept_suggestion_button_a11y")}${ne?` - ${ne}`:""}`,children:B("yes")})]})]})}const ue=[];return R&&ue.push(R),M&&L&&ue.push(`${s}-info`),(0,a.jsxs)(c.A,{"data-testid":G.root,...V,container:{direction:E?"row":"column",alignItems:E?"center":void 0,wrap:I?"wrap":void 0,...q},as:te,labelAsLegend:M,isRadioCheck:I,showAdditionalInfo:re,id:`${s}-field`,forwardedAs:d,required:S,disabled:H,readOnly:D,onKeyDown:U?e=>{"Enter"===e.key&&(e.target.closest("button")||(e.preventDefault(),N?.(!0)))}:void 0,"aria-describedby":ue.length?ue.join(" "):void 0,ref:Z,className:(0,w.A)("form-field",F,{status:_}),children:[(M||!j)&&de,le,!M&&j&&de,!D&&ce,I&&O&&(0,a.jsx)(Q,{variant:"link",onClick:()=>{O()},children:B("clear_selection")})]})}),ae=(0,v.A)(ne,Y);var re=i(3974);s.Ay.div`
  gap: 1rem;

  /* Let flex items be aligned to the baseline of their first child */
  align-items: baseline;

  ${z} {
    position: relative;
  }

  > :first-child {
    > ${z}:after {
      content: '-';
      position: absolute;
      width: 1rem;
      inset-inline-end: -1rem;
      text-align: center;
    }
  }

  > ${z}:first-child:after {
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

  > ${te} {
    /* Override 'display: flex' to not interfere with labels' baseline alignment */
    display: block;

    ${g.G} {
      /* Enable baseline alignment against this element */
      display: inline-block;
    }
  }
`.defaultProps=l.qn;const se=s.Ay.input(({theme:{base:e,components:t}})=>s.AH`
    width: 100%;
    height: ${t.input.height};
    min-height: ${e["hit-area"]["mouse-min"]};
    padding-block: 0;
    padding-inline: ${t.input.padding};
    appearance: none;
    -webkit-appearance: none;
    text-align: inherit;

    @media (pointer: coarse) {
      min-height: ${e["hit-area"]["finger-min"]};
    }
  `);se.defaultProps=l.qn;const de=se,le=(0,V.A)("input",["control",...G]),ce=(0,v.A)((0,r.forwardRef)(function(e,t){const i=(0,m.A)(),{testId:o,id:n=i,value:r,defaultValue:s,required:d=!1,disabled:l=!1,readOnly:c=!1,label:u,additionalInfo:p,labelHidden:f,info:b,status:g,actions:$,onResolveSuggestion:y,className:x,...A}=e,v=(0,h.A)(o,le),k={};(0,re.A)(e,"value")?k.value=r??"":(0,re.A)(e,"defaultValue")&&(k.defaultValue=s??"");const j=(0,a.jsx)(z,{"data-testid":v.control,ref:t,id:n,required:d,disabled:l,readOnly:c,status:g,hasSuggestion:!!y&&"pending"===g,...k,autoComplete:"_off",...A,as:de,className:(0,w.A)("input",x)});return u?(0,a.jsx)(ae,{testId:v,additionalInfo:p,label:u,labelHidden:f,id:n,info:b,readOnly:c,status:g,required:d,disabled:l,actions:$,onResolveSuggestion:y,children:j}):j}),le)},6039:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>u});var o=i(1594),n=i(5882),a=i(7521),r=i(2837),s=i(1093),d=(i(6479),i(8267));const l=d.Ay.div(()=>d.AH`
    margin: 0px 0;
    
    /* Apply TextInputSearch pattern directly to the edit mode wrapper */
    &[data-display-mode="EDIT"] {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      position: relative;
      width: 100%;
      
      /* Target the Input component wrapper (first child) - same as TextInputSearch */
      & > div:first-child {
        flex-grow: 1;
        min-width: 0;
      }
      
      /* Target the emoji span (like TextInputSearch targets button) */
      .status-emoji {
        align-self: center;
        transform: translateY(8px);
        flex-shrink: 0;
        font-size: 24px;
        width: 28px;
        height: 28px;
        margin: 0;
      }
    }
    
    /* Style for the emoji and input container - keep for non-edit modes */
    .emoji-input-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      position: relative;
      width: 100%;
    }
    
    /* Input field styling */
    .input-with-emoji {
      flex-grow: 1;
      min-width: 0;
    }
    
    /* Emoji styling - default size for display modes, will be overridden for edit mode */
    .status-emoji {
      font-size: 14px; /* Default smaller size for display modes */
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      width: 16px; /* Default smaller size for display modes */
      height: 16px; /* Default smaller size for display modes */
      flex-shrink: 0;
      /* No transform by default - only for edit mode */
    }
    
    /* Display mode styling - for read-only display */
    .display-with-emoji {
      display: inline-flex;
      align-items: baseline;
      gap: 6px;
      vertical-align: baseline;
    }
    
    .display-with-emoji .status-emoji {
      font-size: 14px; /* Smaller size for display modes to match text better */
      line-height: 1;
      vertical-align: baseline;
      margin-top: 0;
      margin-bottom: 1px;
      align-self: baseline;
      width: 16px;
      height: 16px;
      transform: none; /* Remove the translateY transform for display modes */
    }
    
    /* Specific fixes for different display modes */
    &[data-display-mode="EDIT"] {
      .emoji-input-container {
        align-items: center; /* Use flexbox center alignment */
      }
      
      .status-emoji {
        /* Keep the larger size for edit mode */
        font-size: 24px;
        width: 28px;
        height: 28px;
        margin: 0;
      }
    }
    
    /* Override emoji size for display modes */
    &[data-display-mode="LABELS_LEFT"] .status-emoji,
    &[data-display-mode="DISPLAY_ONLY"] .status-emoji {
      font-size: 14px !important;
      width: 16px !important;
      height: 16px !important;
      transform: none !important;
    }
    
    &[data-display-mode="LABELS_LEFT"] .display-with-emoji,
    &[data-display-mode="DISPLAY_ONLY"] .display-with-emoji {
      align-items: baseline;
    }
    
    &[data-display-mode="STACKED_LARGE_VAL"] .display-with-emoji {
      align-items: baseline;
    }
    
    &[data-display-mode="STACKED_LARGE_VAL"] .status-emoji {
      font-size: 28px; /* Increased from 20px to match larger header text */
      margin-bottom: 2px;
      width: 32px;
      height: 32px;
    }
    
    /* Ensure consistent alignment across all scenarios */
    .emoji-input-container {
      /* Force minimum height to match input field */
      min-height: 40px;
    }
    
    /* Handle FieldValueList alignment */
    div[data-testid] .display-with-emoji {
    }
    
    /* Ensure emoji is vertically centered relative to the input's visual area */
    /* This addresses the specific alignment issue seen in screenshots */
    &[data-display-mode="EDIT"] .emoji-input-container {
      align-items: center;
      min-height: 48px; /* Account for label + input height */
    }
    
    /* Fine-tune emoji position - Match TextInputSearch button pattern */
    &[data-display-mode="EDIT"] .status-emoji {
      align-self: center;
      transform: translateY(10px); /* Same transform as TextInputSearch button */
      flex-shrink: 0; /* Same as TextInputSearch button */
      font-size: 24px;
      width: 28px;
      height: 28px;
      margin: 0;
    }
  `);var c=i(4848);const u=(0,s.A)(function(e){const{getPConnect:t,value:i,placeholder:s,disabled:d=!1,displayMode:u,readOnly:m=!1,required:h=!1,label:p,hideLabel:f=!1,testId:b,variant:g="inline",emojiConfig:$,helperText:y,validatemessage:x,additionalProps:A}=e,w=t(),v=w.getActionsApi(),k=w.getStateProps().value,[j,L]=(0,o.useState)(i||""),[_,I]=(0,o.useState)(!1);(0,o.useEffect)(()=>{L(i||"")},[i]);const C=((e,t)=>{if(!t||!e)return null;try{const i=JSON.parse(t),o=i.status_emojis?.find(t=>t.status.toLowerCase()===e.toLowerCase());return o?o.emoji:null}catch(e){return console.warn("Invalid emoji configuration JSON:",e),null}})(i,$),S=e=>(0,c.jsxs)("div",{className:"display-with-emoji",children:[(0,c.jsx)("span",{children:e}),C&&(0,c.jsx)("span",{className:"status-emoji",children:C})]});if("LABELS_LEFT"===u||"DISPLAY_ONLY"===u){let e=i||(0,c.jsx)("span",{"aria-hidden":"true",children:"––"});return e=S(e),"DISPLAY_ONLY"===u?(0,c.jsx)(l,{"data-display-mode":"DISPLAY_ONLY",children:e}):(0,c.jsx)(l,{"data-display-mode":"LABELS_LEFT",children:(0,c.jsx)(n.Ay,{variant:f?"stacked":g,"data-testid":b,fields:[{id:"1",name:f?"":p,value:e}]})})}if("STACKED_LARGE_VAL"===u){const e=void 0!==i&&""!==i?S((0,c.jsx)(a.A,{variant:"h1",as:"span",children:i})):"";return(0,c.jsx)(l,{"data-display-mode":"STACKED_LARGE_VAL",children:(0,c.jsx)(n.Ay,{variant:"stacked","data-testid":b,fields:[{id:"2",name:f?"":p,value:e}]})})}return(0,c.jsxs)(l,{"data-display-mode":"EDIT",children:[(0,c.jsx)(r.A,{type:"text",value:j,label:p,labelHidden:f,placeholder:s,disabled:d,readOnly:m,required:h,onChange:e=>{const{value:t}=e.target;L(t),I(!0),v.updateFieldValue(k,t)},onBlur:()=>{_&&v.triggerFieldChange(k,j)},onKeyDown:e=>{"Enter"===e.key&&(e.preventDefault(),v.triggerFieldChange(k,j))},testId:b,className:"input-with-emoji",validatemessage:x,helperText:y,...A}),C&&(0,c.jsx)("span",{className:"status-emoji",children:C})]})})},6479:(e,t,i)=>{window?.__webpack_nonce__&&(i.nc=window.__webpack_nonce__)},6935:e=>{function t(e){return Promise.resolve().then(()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t})}t.keys=()=>[],t.resolve=t,t.id=6935,e.exports=t}}]);
//# sourceMappingURL=Aja100_Any_jaygasi_TextInputEmoji.ba3bbc81.js.map