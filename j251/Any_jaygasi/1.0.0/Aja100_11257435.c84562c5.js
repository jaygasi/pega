"use strict";(self.webpackChunkj251=self.webpackChunkj251||[]).push([[11257435],{8:(e,n,r)=>{r.d(n,{R:()=>a,Y:()=>o});var t=r(8044);const o=["label","info","additional-info","suggestion-accept","suggestion-reject"],a=(0,t.A)("form-field",o)},138:(e,n,r)=>{r.d(n,{A:()=>a});var t=r(4848);const o=e=>{const{children:n,...r}=e;return(0,t.jsx)("option",{...r,children:n})};o.defaultProps={};const a=o},1301:(e,n,r)=>{r.d(n,{b:()=>l});var t=r(4848),o=r(1594),a=r(8267),i=r(1357),s=r(9549),d=r(7321);const l=a.Ay.div(({theme:{base:{"border-radius":e,"font-size":n,"font-scale":r,animation:{speed:t,timing:o},palette:s},components:{"form-field":l,"form-control":{"foreground-color":c,"background-color":u,"border-color":h,"border-radius":p,"border-width":f,":hover":{"border-color":b},":focus":{"border-color":g,"box-shadow":m},":disabled":{"border-color":$,"background-color":x},":read-only":{"border-color":A,"background-color":v}}}},status:w,hasSuggestion:y})=>{const k=(0,d.Vr)(n,r),j=w&&l[w]?l[w]["status-color"]:h,C=y&&w?(0,i.jh)(.1,l[w]["status-color"],s["primary-background"]):u;return a.AH`
      color: ${c};
      background-color: ${C};
      border-radius: calc(${e} * ${p});
      border-color: ${j};
      border-width: ${f};
      border-style: solid;
      transition-property: color, background-color, border-color;
      transition-duration: ${t};
      transition-timing-function: ${o.ease};
      &,
      & > select {
        outline: none;
      }

      &:disabled,
      &[disabled] {
        background-color: ${x};
        border-color: ${$};
        cursor: not-allowed;
      }

      &:focus:not([disabled]) {
        border-color: ${g};
        box-shadow: ${m};
        ${y&&a.AH`
          background-color: ${u};
        `}
      }

      &:focus-within:not([disabled]) {
        ${y&&a.AH`
          background-color: ${u};
        `}
      }

      &:hover:not([readonly]):not([disabled]):not(:focus, :focus-within) {
        ${!w&&a.AH`
          border-color: ${b};
        `}
        ${y&&a.AH`
          background-color: ${u};
          box-shadow: 0 0 0 0.125rem ${(0,i.B3)(j,.2)};
        `}
      }

      ${y&&a.AH`
        border-end-end-radius: 0;
      `}

      &[readonly] {
        background-color: ${v};
        border-color: ${A};
      }

      @media (pointer: coarse) {
        /* stylelint-disable-next-line unit-allowed-list */
        font-size: max(${k.s}, 16px);
      }
    `});l.defaultProps=s.qn,(0,o.forwardRef)(function(e,n){return(0,t.jsx)(l,{ref:n,...e})})},1847:(e,n,r)=>{r.d(n,{A:()=>s});var t=r(4848),o=r(1594),a=r(6878),i=r(9061);const s=(0,o.forwardRef)(function({value:e,displayText:n,variant:r="link",...o},s){const d=e?n||e:(0,t.jsx)(i.A,{});return"text"!==r&&e?(0,t.jsx)(a.ah,{...o,variant:"link",ref:s,href:`mailto:${e}`,children:d}):(0,t.jsx)("span",{ref:s,...o,children:d})})},2841:(e,n,r)=>{r.d(n,{Ah:()=>ee,GW:()=>X,Ay:()=>oe});var t={};r.r(t),r.d(t,{Component:()=>R,name:()=>H,set:()=>C,viewBox:()=>_});var o={};r.r(o),r.d(o,{Component:()=>E,name:()=>P,set:()=>I,viewBox:()=>S});var a=r(4848),i=r(1594),s=r(8267),d=r(1357),l=r(9549),c=r(7501),u=r(9573),h=r(3351),p=r(8579),f=r(9586),b=r(2884),g=r(4853),m=r(3113),$=r(7321),x=r(7491),A=r(9187),v=r(7666),w=r(9576),y=r(4869),k=r(6878),j=r(6765);const C="budicon",H="warn-solid",R=()=>(0,a.jsx)("path",{d:"M23.5 22.5h-22l11-20 11 20Zm-9.741-6.935V9.39a1.655 1.655 0 0 0-1.166-.447c-.42 0-.792.134-1.212.447v6.175a3.23 3.23 0 0 0 1.212.223c.466 0 .839-.09 1.166-.223Zm-1.212 4.787c.466 0 .886-.179 1.212-.492.326-.313.466-.671.466-1.074 0-.447-.14-.85-.466-1.163-.326-.313-.746-.447-1.212-.447-.42 0-.792.134-1.119.447a1.594 1.594 0 0 0-.512 1.163c0 .403.186.76.512 1.074.327.313.7.492 1.119.492Z"}),_="0 0 25 25",I="budicon",P="diamond-minus",E=()=>(0,a.jsx)("path",{fill:"currentColor",fillRule:"evenodd",d:"M23.219 13.178a.96.96 0 0 0 0-1.356L13.179 1.78a.96.96 0 0 0-1.357 0L1.78 11.821a.96.96 0 0 0 0 1.357l10.04 10.041a.96.96 0 0 0 1.357 0l10.041-10.04ZM18 11.5H7v2h11v-2Z"}),S="0 0 25 25";var q=r(8072),z=r(3611),O=r(1301),D=r(7940),M=r(5206),F=r(9463);const L=s.Ay.span`
  display: none;
`,N=(0,i.forwardRef)(function(e,n){const{portalTarget:r}=(0,F.A)();return r?(0,M.createPortal)((0,a.jsx)(L,{...e,ref:n}),r):null});var V=r(8044),T=r(8);const B=(0,V.A)("radio-check",["control",...T.Y]),W=s.Ay.div(e=>{const{theme:{base:{spacing:n},components:{"form-field":r,"radio-check":{size:t,"touch-size":o,"background-color":a,"border-color":i,"border-width":d}}},status:l}=e;let c=i;return"error"!==l&&"warning"!==l||(c=r[l]["status-color"]),s.AH`
      display: flex;
      flex-shrink: 0;
      position: relative;
      width: ${t};
      height: ${t};
      margin-inline-end: calc(0.5 * ${n});
      border: ${d} solid ${c};
      background-color: ${a};

      @media (pointer: coarse) {
        width: ${o};
        height: ${o};
      }

      &::after {
        content: '';
        display: none;
      }
    `});W.defaultProps=l.qn;const G=s.Ay.input(e=>{const{disabled:n,theme:{base:{"border-radius":r},components:{"form-control":{":focus":{"box-shadow":t,"border-color":o},":read-only":{"background-color":a}},"radio-check":{size:i,":checked":{"background-color":l,"border-color":c}},checkbox:{"border-radius":u},"radio-button":{"border-radius":h}}}}=e,p=e.readOnly?a:l,f=(0,A.A)(()=>(0,$.W0)(p)),b=`+ ${m.G} ${W}`,{ltr:g}=(0,D.A)();return s.AH`
    ${d.Ic}
    margin: 0;

    /* Sets rect size for JAWS focus outline */
    width: ${i};
    height: ${i};

    ${!n&&s.AH`
      &:focus ${b} {
        box-shadow: ${t};
        border-color: ${o};
      }
    `}
    &:checked
      ${b},
      &:checked:disabled
      ${b},
      &[type='checkbox']:indeterminate
      ${b},
      &[type='checkbox']:indeterminate:disabled
      ${b} {
      border-color: ${e.readOnly?"inherit":c};
      background-color: ${p};

      &::after {
        display: block;
      }
    }

    &[type='radio'] ${b}, &[type='radio'] ${b}::after {
      border-radius: ${h};
    }

    &[type='radio'] ${b}::after {
      content: '';
      position: absolute;
      inset: 0;
      margin: auto;
      width: calc(${i} * 0.3);
      height: calc(${i} * 0.3);
      border-radius: ${h};
      border: calc(${i} * 0.2) solid ${f};
    }

    &[type='checkbox'] ${b} {
      border-radius: min(calc(${r} * ${u}), 0.25rem);
    }

    &[type='checkbox']:not(:indeterminate) ${b} {
      &::after {
        width: 40%;
        height: 75%;
        ${g?s.AH`
              transform: rotate(45deg) translate(50%, -30%);
            `:s.AH`
              transform: rotate(45deg) translate(-50%, 30%);
            `}
        border-right: 0.15em solid ${f};
        border-bottom: 0.15em solid ${f};
      }
    }

    &[type='checkbox']:indeterminate ${b} {
      display: flex;

      &::after {
        width: 90%;
        height: 0.15em;
        margin: auto;
        background-color: ${f};
      }
    }
  `});G.defaultProps=l.qn;const Z=s.Ay.div(e=>{const{disabled:n,readOnly:r,theme:{base:t,components:{"radio-check":{label:{color:o,"font-weight":a}},"form-control":{":hover":{"border-color":i}}}}}=e,d=(0,$.Vr)(t["font-size"],t["font-scale"]);return s.AH`
      > ${m.G} {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-weight: ${a};
        word-break: break-word;
        font-size: ${d.s};
        color: ${o};
        margin: 0;
        min-height: ${t["hit-area"]["mouse-min"]};

        @media (pointer: coarse) {
          min-height: ${t["hit-area"]["finger-min"]};
        }
      }

      > ${X} {
        margin: 0;
        padding-inline-start: calc(${t.spacing} / 4);
      }

      ${!(n||r)&&s.AH`
        &:not(:focus-within) > ${m.G}:hover ${W} {
          border-color: ${i};
        }
      `}
    `});Z.defaultProps=l.qn;const K=s.Ay.label(({disabled:e,readOnly:n,status:r,theme:{base:{palette:t,shadow:o,spacing:a},components:{card:i,"form-field":d,"radio-check":{label:l},"form-control":{":hover":{"border-color":c}}}}})=>{const u="error"===r?d.error["status-color"]:t["border-line"];return s.AH`
      min-width: min-content;
      cursor: pointer;
      background-color: ${i.background};
      border-radius: ${i["border-radius"]};
      border: 0.0625rem solid ${u};
      padding: ${a};

      ${e&&s.AH`
        cursor: not-allowed;
      `}
      ${!(e||n)&&s.AH`
        :hover:not(:focus-within) {
          border-color: ${c};

          ${m.G} ${W} {
            border-color: ${c};
          }
        }

        :focus-within {
          box-shadow: ${o.focus};
          border-color: transparent;
        }
      `}
        > ${m.G} {
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
    `});K.defaultProps=l.qn;const Y=(0,i.forwardRef)(function(e,n){const r=(0,h.A)(),t=(0,f.A)(),{testId:o,type:s,id:d=r,label:l,required:c=!1,disabled:u=!1,readOnly:b=!1,indeterminate:m=!1,checked:$,defaultChecked:x,variant:A="simple",onClick:v,onKeyDown:y,onChange:k,status:j,info:C,additionalInfo:H,ariaDescribedby:R,className:_,...I}=e,P=(0,p.A)(o,B),E="radio"===s,S="card"===A,q=(0,g.A)(n),z=(0,h.A)();return(0,i.useEffect)(()=>{!E&&q.current&&(q.current.indeterminate=!!m)},[q,m,E]),(0,a.jsx)(oe,{testId:P,as:S?K:Z,label:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(W,{status:j,isRadio:E,as:O.b,required:c,disabled:u,readOnly:b,onMouseDown:e=>e.preventDefault()}),l,b&&(0,a.jsx)(N,{id:z,children:t("read_only")})]}),labelAs:S?"div":void 0,id:d,required:c,disabled:u,readOnly:b,status:j,info:C,isRadioCheck:!0,inline:!0,labelAfter:!0,additionalInfo:H,children:(0,a.jsx)(G,{"data-testid":P.control,...I,className:(0,w.A)("radio-check",_,{variant:A,type:s}),id:d,type:s,required:c,checked:$,defaultChecked:x,"aria-describedby":b?`${R} ${z}`:R,disabled:u,readOnly:b,onChange:k,onClick:e=>{b&&e.preventDefault(),v?.(e)},onKeyDown:e=>{"checkbox"===s&&b&&" "===e.key&&e.preventDefault(),"radio"===s&&b&&e.key.includes("Arrow")&&e.preventDefault(),y?.(e)},ref:q})})});(0,y.A)(Y,B),(0,j.pU)(t,o,q);const J=(0,s.Ay)(j.Ay)(({theme:e,status:n})=>s.AH`
    height: 1em;
    width: 1em;
    color: ${(0,A.A)(()=>(0,$.ho)(e.components["form-field"][n]["status-color"],e.base.palette["primary-background"]),()=>e.components["form-field"][n]["status-color"])};
    vertical-align: baseline;
  `);J.defaultProps=l.qn;const U=(0,s.Ay)(k.Ay)(({theme:e})=>s.AH`
    margin-block-start: calc(${e.base.spacing} / 2);
    align-self: start;
  `);U.defaultProps=l.qn;const X=s.Ay.div(({status:e,theme:{base:{"font-size":n,"font-scale":r,spacing:t,palette:o},components:{"form-field":a}}})=>{const{xxs:i}=(0,$.Vr)(n,r);return s.AH`
      max-width: max-content;
      font-size: ${i};
      word-break: break-word;

      &:not(:empty) {
        margin-block-start: calc(0.25 * ${t});
      }

      ${e&&a[e]&&s.AH`
        color: ${(0,A.A)(()=>(0,$.ho)(a[e]["status-color"],o["primary-background"]),()=>a[e]["status-color"])};
      `}
    `});X.defaultProps=l.qn;const Q=s.Ay.div``,ee=s.Ay.div(e=>{const{labelAsLegend:n,isRadioCheck:r,showAdditionalInfo:t,disabled:o,required:a,theme:{base:{palette:{urgent:i},"disabled-opacity":d,spacing:l,"hit-area":{"compact-min":c}}}}=e;return s.AH`
    ${o&&s.AH`
      opacity: ${d};
      -webkit-user-select: none;
      user-select: none;
    `}
    position: relative;
    border: 0;

    &:has(${G}:only-of-type) {
      ${X} {
        min-width: 100%;
      }
    }

    > ${m.G}, > ${Q} {
      &:not(:empty) {
        margin-bottom: calc(0.25 * ${l});
        min-height: ${c};
      }
    }

    > ${m.G}, > ${Q} > ${m.G} {
      ${a&&s.AH`
        &::after {
          content: ${'"\\00a0*" / ""'};
          color: ${i};
        }
      `}

      ${o&&s.AH`
        cursor: not-allowed;
      `}
    }

    ${n&&s.AH`
      > legend {
        display: inline-flex;
        align-items: flex-end;
      }
    `}

    ${n&&t&&s.AH`
      display: block;

      > legend {
        float: inline-start;
      }

      > ${z.f} {
        ${!r&&s.AH`
          float: inline-end;
        `}
        + * {
          clear: both;
        }
      }
    `}
  `});ee.defaultProps=l.qn;const ne=(0,s.Ay)(k.Ay)(({theme:{base:{"font-size":e,"font-scale":n,"border-radius":r,spacing:t,palette:o},components:{"form-control":{"border-radius":a,"border-width":i},"form-field":l}}})=>{const{xxs:c}=(0,$.Vr)(e,n),u=(0,A.A)(()=>(0,$.ho)(l.pending["status-color"],o["primary-background"]),()=>l.pending["status-color"]),h=(0,$.ZV)(u),p=(0,A.A)(()=>(0,$.W0)(u)),f=p?(0,d.B3)(p,.4):p;return s.AH`
    background-color: ${u};
    color: ${p};
    font-size: ${c};
    min-width: calc(3 * ${t});
    min-height: calc(3 * ${t});
    padding: 0 ${t};
    border-radius: 0;
    border: none;

    &:first-child {
      border-inline-end: ${i} solid ${f};
      border-end-start-radius: calc(${r} * ${a});
      margin-inline-start: calc(2 * ${t});
    }

    &:last-child {
      border-end-end-radius: calc(${r} * ${a});
      margin-inline-start: 0;
    }

    &:hover {
      color: ${h.foreground};
      background-color: ${h.background};
    }

    @media (pointer: coarse) {
      min-height: 2rem;
    }
  `});ne.defaultProps=l.qn;const re={error:"warn-solid",warning:"diamond-minus",success:"check"},te=(0,i.forwardRef)(function(e,n){const r=(0,h.A)(),{testId:t,children:o,id:s=r,as:d="div",label:l,labelAs:$="label",labelFor:A=s,labelId:y,labelHidden:k=!1,labelAfter:j=!1,info:C,status:H,isRadioCheck:R,charLimitDisplay:_,required:I=!1,disabled:P=!1,readOnly:E=!1,inline:S=!1,onClear:q,actions:O,container:D,additionalInfo:M,onResolveSuggestion:F,"aria-describedby":L,className:N,...V}=e,B=(0,p.A)(t,T.R),W=(0,f.A)(),{announceAssertive:G}=(0,b.A)(),Z="legend"===$,K="pending"===H&&!!F,Y=(0,g.A)(n),te=(0,i.useRef)(null),[oe,ae]=(0,i.useState)(null),ie=!!M&&!P&&!k,se=(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(m.A,{"data-testid":B.label,id:y,as:$,htmlFor:"label"===$?A:void 0,labelHidden:k,onClick:e=>{E&&e.preventDefault()},inline:S,ref:te,children:l}),ie&&oe&&(0,a.jsx)(z.A,{"data-testid":B.additionalInfo,heading:M.heading,contextualLabel:oe,children:M.content})]}),de=R||Z||k?se:(0,a.jsx)(c.A,{as:Q,container:{justify:"between",alignItems:"end"},item:{alignSelf:"stretch"},children:se});let le;if((0,i.useEffect)(()=>{ae(te.current?.textContent??null)},[l]),(0,i.useEffect)(()=>{if("error"===H||"warning"===H){let e=`${W(H)} ${C}`;te.current?.textContent&&(e=`${te.current?.textContent} ${e}`),G({message:e,type:H})}},[H,C]),Z||i.Children.count(o)>1)le=o;else{const e=i.Children.only(o).props["aria-describedby"];le=(0,i.cloneElement)(o,{"aria-describedby":[e,C?`${s}-info`:void 0].join(" ").trim()||void 0})}O&&(le=(0,a.jsxs)(c.A,{container:{alignItems:"center",gap:.5},children:[le,(0,a.jsx)(u.A,{items:O,menuAt:3})]}));let ce=(0,a.jsxs)(c.A,{id:`${s}-info`,"data-testid":B.info,status:H,as:X,container:{alignItems:"center",gap:.5},children:[H&&"pending"!==H&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(c.A,{item:{alignSelf:"start"},as:J,status:H,name:re[H]}),(0,a.jsx)(x.A,{children:`${W(H)} `})]}),C]});if(_&&(ce=(0,a.jsxs)(c.A,{container:{justify:ce?"between":"end",gap:1},children:[ce,(0,a.jsx)(c.A,{item:{shrink:0},children:_})]})),K){const e=(0,v.A)(Y);ce=(0,a.jsxs)(c.A,{container:{alignItems:"start",justify:"between"},children:[(0,a.jsxs)(X,{"data-testid":B.info,status:H,id:`${s}-info`,children:[W("suggestion_info"),(0,a.jsx)(x.A,{"aria-live":"polite",children:W("suggestion_assist")})]}),(0,a.jsxs)(c.A,{container:{wrap:"nowrap"},children:[(0,a.jsx)(ne,{"data-testid":B.suggestionReject,onClick:()=>{F(!1),e[0]?.focus()},"aria-label":`${W("no")}, ${W("reject_suggestion_button_a11y")}${oe?` - ${oe}`:""}`,children:W("no")}),(0,a.jsx)(ne,{"data-testid":B.suggestionAccept,onClick:()=>{F(!0),e[0]?.focus()},"aria-label":`${W("yes")}, ${W("accept_suggestion_button_a11y")}${oe?` - ${oe}`:""}`,children:W("yes")})]})]})}const ue=[];return L&&ue.push(L),Z&&C&&ue.push(`${s}-info`),(0,a.jsxs)(c.A,{"data-testid":B.root,...V,container:{direction:S?"row":"column",alignItems:S?"center":void 0,wrap:R?"wrap":void 0,...D},as:ee,labelAsLegend:Z,isRadioCheck:R,showAdditionalInfo:ie,id:`${s}-field`,forwardedAs:d,required:I,disabled:P,readOnly:E,onKeyDown:K?e=>{"Enter"===e.key&&(e.target.closest("button")||(e.preventDefault(),F?.(!0)))}:void 0,"aria-describedby":ue.length?ue.join(" "):void 0,ref:Y,className:(0,w.A)("form-field",N,{status:H}),children:[(Z||!j)&&de,le,!Z&&j&&de,!E&&ce,R&&q&&(0,a.jsx)(U,{variant:"link",onClick:()=>{q()},children:W("clear_selection")})]})}),oe=(0,y.A)(te,T.R)},7251:(e,n,r)=>{r.d(n,{A:()=>v});var t=r(4848),o=r(1594),a=r(8267),i=r(1357),s=r(9549),d=r(2841),l=r(1301),c=r(7940),u=r(3351),h=r(9586),p=r(8579),f=r(7491),b=r(4869),g=r(8044),m=r(8);const $=(0,g.A)("select",["control",...m.Y]),x=a.Ay.select(e=>{const{readOnly:n}=e,{base:r,components:{"form-control":{"foreground-color":t,"background-color":o},select:s}}=e.theme,d=encodeURIComponent(t),{rtl:l}=(0,c.A)();return a.AH`
    appearance: none;
    -webkit-appearance: none;
    overflow-x: hidden;
    text-overflow: ellipsis;
    width: 100%;
    height: ${s.height};
    min-height: ${r["hit-area"]["mouse-min"]};
    padding-inline-start: ${s.padding};
    padding-inline-end: calc(4 * ${r.spacing});

    /* cspell:disable-next-line */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25 25' fill='${d}'%3E%3Cpath d='M12.1476563,16.5726562 C12.1476563,16.5726562 3.2875,9.72421875 3.2875,9.72421875 C3.2875,9.72421875 3.14375,9.58046875 3.14375,9.58046875 C3.04765625,9.3890625 3,9.19765625 3,9.00546875 C3,9.00546875 3,9.00546875 3,9.00546875 C3,8.33515625 3.33515625,8 3.9578125,8 C3.9578125,8 3.9578125,8 3.9578125,8 C4.1015625,8 4.29296875,8.09609375 4.628125,8.2390625 C4.628125,8.2390625 4.628125,8.2390625 4.628125,8.2390625 C4.628125,8.2390625 12.8179688,14.2257813 12.8179688,14.2257813 C12.8179688,14.2257813 21.103125,8.19140625 21.103125,8.19140625 C21.3421875,8.04765625 21.534375,8 21.678125,8 C21.678125,8 21.678125,8 21.678125,8 C22.3007813,8 22.6359375,8.33515625 22.6359375,9.00546875 C22.6359375,9.00546875 22.6359375,9.00546875 22.6359375,9.00546875 C22.6359375,9.196875 22.5882813,9.38828125 22.4921875,9.58046875 C22.4921875,9.58046875 22.4921875,9.58046875 22.4921875,9.58046875 C22.4921875,9.58046875 22.3484375,9.72421875 22.3484375,9.72421875 C22.3484375,9.72421875 13.4882812,16.525 13.4882812,16.525 C13.296875,16.7164063 13.0570312,16.8125 12.8179688,16.8125 C12.8179688,16.8125 12.8179688,16.8125 12.8179688,16.8125 C12.5789062,16.8125 12.3867188,16.7164062 12.1476563,16.5734375 C12.1476563,16.5734375 12.1476563,16.5734375 12.1476563,16.5734375 L12.1476563,16.5726562 Z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: calc(2 * ${r.spacing}) auto;
    background-position: ${l?r.spacing:`calc(100% - ${r.spacing}) `} 60%;
    border-width: ${s["border-width"]};
    border-radius: calc(${r["border-radius"]} * ${s["border-radius"]});

    ${n&&a.AH`
      background-image: none;
    `}

    ${!e.status&&a.AH`
      border-color: ${s["border-color"]};
    `}

    &:has(option[value='']:checked, option:not([value]):checked) {
      color: ${(0,i.jh)(r.transparency["transparent-3"],t,o)};
    }

    & option {
      color: ${t};

      &[value=''],
      &:not([value]) {
        color: ${(0,i.jh)(r.transparency["transparent-3"],t,o)};
      }
    }

    &::-ms-expand {
      display: none;
    }

    @media (pointer: coarse) {
      min-height: ${r["hit-area"]["finger-min"]};
    }
  `});x.defaultProps=s.qn;const A=(0,o.forwardRef)(function(e,n){const r=(0,u.A)(),o=(0,h.A)(),{testId:a,additionalInfo:i,children:s,id:c=r,label:b,labelHidden:g,info:m,status:A,required:v=!1,disabled:w=!1,readOnly:y=!1,actions:k,onResolveSuggestion:j,...C}=e,H=(0,p.A)(a,$),R=(0,t.jsx)(l.b,{"data-testid":H.control,...C,as:x,hasSuggestion:"pending"===A&&!!j,id:c,status:A,required:v,disabled:w,label:b,readOnly:y,ref:n,onMouseDown:y?e=>{e.preventDefault()}:void 0,onKeyDown:y?e=>{["Escape","Tab","Space"].includes(e.key)||e.preventDefault()}:void 0,children:s});return b?(0,t.jsx)(d.Ay,{testId:H,label:(0,t.jsxs)(t.Fragment,{children:[b,y&&(0,t.jsx)(f.A,{children:` ${o("read_only")}`})]}),labelHidden:g,id:c,info:m,status:A,required:v,disabled:w,readOnly:y,actions:k,onResolveSuggestion:j,additionalInfo:i,children:R}):R}),v=(0,b.A)(A,$)},7708:(e,n,r)=>{r.d(n,{A:()=>d});var t=r(4848),o=r(1594),a=r(6878),i=r(9061),s=r(1638);const d=(0,o.forwardRef)(function({value:e,displayText:n,variant:r="link",formattingOptions:{showCountryCode:o=!0}={},...d},l){const c=e?n||((e,{nationalFormat:n}={})=>n?(0,s.l)(e)?.formatNational():(0,s.l)(e)?.formatInternational())(e||"",{nationalFormat:!o})||e:(0,t.jsx)(i.A,{});return"text"!==r&&e?(0,t.jsx)(a.ah,{...d,variant:"link",ref:l,href:`tel:${e}`,children:c}):(0,t.jsx)("span",{ref:l,...d,children:c})})},8147:(e,n,r)=>{r.d(n,{A:()=>xe});var t={};r.r(t),r.d(t,{Component:()=>T,name:()=>V,set:()=>N,viewBox:()=>B});var o=r(4848),a=r(1594),i=r(8267),s=r(6878),d=r(150),l=r(331),c=r(9549),u=(r(8347),r(4680));const h={update:()=>{},dismiss:()=>{},activate:()=>{},minimize:()=>{},maximize:()=>{},dock:()=>{},unmount:()=>{}},p={alert:!1,dismissible:!0,minimizable:!1,maximizable:!1,dockable:!1,defaultMinimized:!1,unmountWhenMinimized:!0,state:"open",top:!1,initialized:!1,...h},f=(0,a.createContext)(p),b=(0,a.createContext)({create:()=>h,ModalContext:f,initialized:!1}),g=()=>{const{ModalContext:e}=(()=>{const e=u.A?window.cosmos.modalManagerContext??b:b;return(0,a.useContext)(e)})();return(0,a.useContext)(e)};var m=r(3351),$=r(4853),x=r(4651),A=r(9586),v=r(9839);let w;const y=()=>w||(w=v.A?navigator.userAgent.match(/(Windows|Macintosh)/)?.[0]||"Other":"",w),k=()=>{const[e,n]=(0,a.useState)(y);return(0,a.useEffect)(()=>{e||n(y())},[]),{windows:"Windows"===e,macintosh:"Macintosh"===e,name:e}};var j=r(8579),C=r(9187);const H=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;var R=r(127),_=r(4869),I=r(7321);(0,a.createContext)({drawerOpen:!1,openDrawer:()=>{},closeDrawer:()=>{}});const P=(0,a.createContext)({navOpen:!1,drawerOpen:!1,setDrawerOpen:()=>{},navState:"closed",collapsedHoverMenus:!1,focusedImperatively:{get current(){return!1}},headerEl:null,previewTriggerRef:{get current(){return null},set current(e){}},searchContainerEl:null,setSearchContainerEl:()=>{},mobileNavOpen:!1,previewActive:!1,setPreviewActive:()=>{}});var E=r(7491),S=r(8866);const q={Command:"⌘",Alt:"⌥",Option:"⌥",Control:"⌃",Return:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("span",{"aria-hidden":!0,children:"↵"}),(0,o.jsx)(E.A,{children:"Return"})]}),Enter:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("span",{"aria-hidden":!0,children:"↵"}),(0,o.jsx)(E.A,{children:"Enter"})]}),Delete:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("span",{"aria-hidden":!0,children:"Del"}),(0,o.jsx)(E.A,{children:"Delete"})]}),CommandOrControl:"⌘"},z={Control:"Ctrl",Alt:"Alt",Option:"Alt",Meta:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("span",{"aria-hidden":!0,children:"⊞"}),(0,o.jsx)(E.A,{children:"Windows"})]}),Command:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("span",{"aria-hidden":!0,children:"⊞"}),(0,o.jsx)(E.A,{children:"Windows"})]}),Backspace:"Backspace",CommandOrControl:"Ctrl"},O={"Page up":(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("span",{"aria-hidden":!0,children:"Pg up"}),(0,o.jsx)(E.A,{children:"Page up"})]}),"Page down":(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("span",{"aria-hidden":!0,children:"Pg dn"}),(0,o.jsx)(E.A,{children:"Page down"})]}),Ins:"Insert",Shift:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("span",{"aria-hidden":!0,children:"⇧"}),(0,o.jsx)(E.A,{children:"Shift"})]})},D=i.Ay.kbd(({theme:{base:e,components:{text:{primary:n},badges:{keyboard:r}}}})=>i.AH`
      background-color: ${r["background-color"]};
      color: ${e.palette["foreground-color"]};
      display: inline-block;
      position: relative;
      font-family: ${e["font-family"]};
      font-weight: ${n["font-weight"]};
      overflow: hidden;
      white-space: nowrap;
      padding: 0.125rem;
      border: 0.0125rem solid ${r["border-color"]};
      border-radius: calc(${e["border-radius"]} / 4);
      text-transform: capitalize;
      text-align: center;
      min-width: 1.25rem;
      height: 1.25rem;
      text-overflow: ellipsis;
      line-height: 1rem;
      inset-block-start: calc(1.25rem / 4 - 0.125rem);
    `);D.defaultProps=c.qn;const M=(0,_.A)((0,a.forwardRef)(function({testId:e,keyName:n,...r},t){const{windows:a}=k(),i=(0,j.A)(e,S.gF);return(0,o.jsx)(D,{"data-testid":i.root,...r,ref:t,children:a&&z[n]||q[n]||O[n]||n})}),S.gF);var F=r(7501),L=r(6765);const N="budicon",V="open",T=()=>(0,o.jsx)("path",{d:"M21 12h-.959V5.676L11.116 14.6l-.718-.718 8.925-8.925H13V4h8v8Zm-2 2h-1v5.5c0 .335-.165.5-.5.5H5.485c-.335 0-.526-.165-.526-.5V7.484c0-.335.191-.526.526-.526H11V6H5.485c-.431 0-.766.144-1.054.431A1.408 1.408 0 0 0 4 7.485V19.5c0 .431.144.712.431 1 .288.288.623.5 1.054.5H17.5c.431 0 .712-.212 1-.5.288-.288.5-.569.5-1V14Z"}),B="0 0 25 25";var W=r(5206),G=r(9463),Z=r(574),K=r(2365),Y=r(6629);var J=r(2477),U=r(6416),X=r(1649),Q=r(8044);const ee=(0,Q.A)("fullscreen",[]),ne=i.Ay.div(({theme:e,fullscreen:n})=>i.AH`
      ${n&&i.AH`
        --content-height-in-view: 100vh;
        position: fixed;
        z-index: ${e.base["z-index"].backdrop};
        inset: 0;
      `}
    `);ne.defaultProps=c.qn;const re=(0,a.createContext)(void 0),te=({parentJSX:e,parentElRef:n})=>{const{portalTarget:r}=(0,G.A)();(0,Z.A)(n);const{disableScroll:t,enableScroll:i}=((e=":root")=>{const n=(0,a.useRef)(0),r=(0,a.useRef)(null),{styleSheetTarget:t}=(0,G.A)(),o=(0,a.useCallback)(()=>{r.current?.remove(),r.current=null},[]),i=(0,a.useCallback)(()=>{if(r.current)return;const o=document.querySelector(e);if(!o)return;const[a,i]=(0,K.A)(o);(a||i)&&(r.current=document.createElement("style"),r.current.nonce=window.__webpack_nonce__,r.current.textContent=`\n      ${e} {\n        ${i?`padding-inline-end: ${n.current}px !important`:""};\n        ${a?`padding-block-end: ${n.current}px !important`:""};\n        overflow: hidden !important;\n      }\n    `,(t??document.head).append(r.current))},[e]);return(0,a.useLayoutEffect)(()=>(n.current=(0,Y.A)(),o),[o]),{enableScroll:o,disableScroll:i}})();return(0,a.useEffect)(()=>(t(),i),[]),r?(0,W.createPortal)((0,o.jsx)(X.A,{portalTarget:n.current??void 0,children:e}),r):null},oe=((0,_.A)((0,a.forwardRef)(function({children:e,testId:n,...r},t){const i=(0,j.A)(n,ee),[s,d]=(0,J.A)(),l=(0,$.A)(d,t),[c,u]=(0,J.A)(),[h,p]=(0,a.useState)(void 0),f=(0,a.useMemo)(()=>[h,()=>{p(e=>!e)}],[h]),b=(0,U.A)(c,!!h),g=(0,o.jsx)(ne,{"data-testid":i.root,"data-fullscreen-enabled":!!h||void 0,...r,ref:l,fullscreen:!!h,"data-popover-id":b,children:e});return(0,o.jsx)(re.Provider,{value:f,children:h&&s?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{ref:u,style:{display:"none"}}),(0,o.jsx)(te,{parentJSX:g,parentElRef:l})]}):g})}),ee),(0,Q.A)("link",["preview-popover","preview","new-tab"])),ae=i.Ay.div(({theme:e,preview:n})=>i.AH`
    background-color: ${e.components.tooltip["background-color"]};
    z-index: ${e.base["z-index"].tooltip};

    ${n&&i.AH`
      padding: calc(${e.base.spacing} / 4);
    `}
  `);ae.defaultProps=c.qn;const ie=(0,i.Ay)(l.A)(({theme:e})=>{const n=(0,C.A)(()=>(0,I.W0)(e.components.tooltip["background-color"])),r=(0,I.Vr)(e.base["font-size"],e.base["font-scale"]);return i.AH`
    position: relative;
    display: inline-flex;
    align-items: center;
    z-index: 1;
    padding: 0 ${e.base.spacing};
    min-height: 1.5rem;
    line-height: 1;
    color: ${n};
    font-size: ${r.xs};
    text-decoration: none;

    /* FIXME: Button selector specificity... */
    & + & {
      margin: 0;
    }

    & + &::before {
      content: '';
      position: absolute;
      inset-inline-start: 0;
      inset-block: 0;
      width: 1px; /* stylelint-disable-line unit-allowed-list */
      background-color: ${n};
      opacity: ${e.base.transparency["transparent-3"]};
    }

    &:hover,
    &:active {
      text-decoration: underline;
    }

    &:focus {
      box-shadow:
        inset 0 0 0 0.0625rem ${e.base.palette.light},
        0 0 0.125rem 0.0625rem ${e.base.palette.interactive};
    }
  `});ie.defaultProps=c.qn;const se=i.Ay.div``,de=(0,i.Ay)(ie)(({theme:e})=>i.AH`
    padding: calc(${e.base.spacing} / 2);

    & + & {
      padding-inline-start: calc(${e.base.spacing} - ${e.base.spacing} / 4);
      padding-inline-end: calc(${e.base.spacing} / 4);
    }

    &:hover,
    &:active {
      text-decoration: none;
      ${se} span {
        text-decoration: underline;
      }
      ${se} ${D} span {
        text-decoration: none;
      }
    }

    ${se} {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    ${D} {
      color: ${e.base.palette.light};
      background-color: ${e.base.colors.gray.dark};
      border-color: ${e.base.colors.gray.medium};
      inset-block-start: unset;
      margin-inline: calc(${e.base.spacing} / 4);

      &:first-of-type {
        margin-inline-start: calc(${e.base.spacing} / 2);
      }

      &:last-of-type {
        margin-inline-end: calc(${e.base.spacing} / 2);
      }
    }
  `);de.defaultProps=c.qn;const le=(0,i.Ay)(s.Ay)`
  &:has(> img) {
    display: inline-block;

    ${L.vE} {
      vertical-align: top;
    }
  }
`;le.defaultProps=c.qn,(0,L.pU)(t);const ce=(0,a.forwardRef)(function({testId:e,href:n,variant:r="link",icon:t=!1,previewable:i=!1,onPreview:s,target:l,children:c,...u},h){const p=H.test(n)?void 0:n,{initialized:f}=g(),b=(0,a.useContext)(re),v=!(!b||!b[0]),{previewTriggerRef:w}=(0,a.useContext)(P),y=(0,m.A)(),C=(0,$.A)(h),[_,I]=(0,a.useState)(!1),[S,q]=(0,a.useState)("short"),[z,O]=(0,a.useState)(!1),D=(0,a.useRef)(null),N=(0,x.A)("sm"),V=(0,A.A)(),{macintosh:T}=k(),B=(0,a.useRef)(!1),W=(0,j.A)(e,oe),G=(0,a.useRef)({x:0,y:0}),Z=(0,a.useRef)({x:0,y:0}),K=(0,a.useRef)({get contextElement(){return C.current??void 0},getBoundingClientRect:()=>({width:0,height:0,top:Z.current.y,bottom:Z.current.y,left:Z.current.x,right:Z.current.x,x:Z.current.x,y:Z.current.y,toJSON(){return JSON.stringify(this)}})}),Y=i&&!f&&!v;let J;try{if(p){const e=new URL(p,document.location.href);J=!!R.A&&/^https?:$/.test(e.protocol)&&document.location.origin!==e.origin}else J=!1}catch{J=!1}const U=J?"_blank":l,X=()=>{N&&!z&&I(!0)},Q=()=>{I(!1)},ee=()=>{O(!1)},ne=()=>{w.current=C.current,void 0!==p&&s?.({href:p})};return(0,a.useEffect)(()=>{"none"!==S||_||z||q("short")},[S,_,z]),(0,a.useEffect)(()=>{const e=({key:e})=>{"Escape"===e&&(_||z)&&(q("none"),I(!1),O(!1))};return document.addEventListener("keydown",e),()=>{document.removeEventListener("keydown",e)}},[_,z]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(le,{"data-testid":W.root,href:p,variant:r,ref:C,target:U,...u,"aria-describedby":Y?`${y}-preview-instructions`:void 0,onMouseEnter:i?e=>{G.current={x:e.clientX,y:e.clientY},X()}:void 0,onMouseLeave:Q,onMouseMove:e=>{G.current={x:e.clientX,y:e.clientY}},onFocus:i?()=>{!N||_||B.current||O(!0)}:void 0,onBlur:()=>{B.current=!1,ee()},onKeyUp:e=>{e.getModifierState("Alt")&&"KeyP"===e.code&&ne()},onContextMenu:()=>{B.current=!0,q("none"),ee(),Q()},children:[c,"_blank"===U&&(0,o.jsx)(E.A,{children:V("opens_in_a_new_tab")}),!t&&"_blank"===U&&(0,o.jsx)(L.Ay,{name:"open"})]}),Y&&(0,o.jsxs)(d.A,{"data-testid":W.previewPopover,show:z,placement:"top",groupId:"tooltip",showDelay:"short",hideDelay:S,target:C.current,as:ae,arrow:!0,preview:!0,portal:!0,onHide:ee,onClick:e=>{e.stopPropagation()},children:[(0,o.jsx)(de,{"data-testid":W.preview,preview:!0,type:"button",ref:D,onClick:ne,tabIndex:"-1",children:(0,o.jsxs)(se,{children:[(0,o.jsx)("span",{children:V("preview")}),(0,o.jsxs)(F.A,{container:{inline:!0,justify:"end"},children:[(0,o.jsx)(M,{keyName:"Alt"}),(0,o.jsx)(M,{keyName:"P"})]})]})}),(0,o.jsx)(de,{"data-testid":W.newTab,forwardedAs:"a",href:p,target:"_blank",rel:"noreferrer",tabIndex:"-1",children:(0,o.jsxs)(se,{children:[(0,o.jsx)("span",{children:V("link_open_in_tab_text")}),(0,o.jsxs)(F.A,{container:{inline:!0,justify:"end"},children:[(0,o.jsx)(M,{keyName:"CommandOrControl"}),(0,o.jsx)(M,{keyName:"Enter"})]})]})})]}),(0,o.jsxs)(d.A,{"data-testid":W.previewPopover,show:_,placement:"top",groupId:"tooltip",showDelay:"short",hideDelay:S,target:K.current,onMouseEnter:X,onMouseLeave:Q,as:ae,arrow:!0,portal:!0,onClick:e=>{e.stopPropagation()},onShow:()=>{const e=C.current?.getClientRects()??[],{x:n,y:r}=G.current,t=Array.from(e).find(e=>r<e.bottom&&n<e.right);t&&(Z.current={x:n,y:t.top})},children:[Y&&(0,o.jsx)(ie,{"data-testid":W.preview,preview:!0,type:"button",ref:D,onClick:ne,tabIndex:"-1",children:V("preview")}),(0,o.jsx)(ie,{"data-testid":W.newTab,forwardedAs:"a",href:p,target:"_blank",rel:"noreferrer",tabIndex:"-1",children:V("link_open_in_tab_text")})]}),Y&&(0,o.jsx)("span",{id:`${y}-preview-instructions`,hidden:!0,children:V("preview_link_instruction",[T?"option":"alt"])})]})}),ue=(0,_.A)(ce,oe);var he=r(7583);const pe=i.Ay.img`
  max-width: 100%;
`,fe=(0,a.forwardRef)(function(e,n){const{alt:r,...t}=e;return(0,o.jsx)(pe,{...t,alt:r,ref:n})});var be=r(2697);const ge=i.Ay.div(({theme:e})=>i.AH`
    height: ${e.base["content-width"].xs};
    width: ${e.base["content-width"].xs};
    border: 0.0625rem solid ${e.base.palette["border-line"]};
    border-radius: calc(${e.base["border-radius"]} / 2);
    text-align: center;
  `);ge.defaultProps=c.qn;const me=(0,a.forwardRef)(function({value:e,label:n=e,...r},t){const[i,s]=(0,a.useState)(""),d=(0,A.A)(),l=(0,a.useRef)(!1);return(0,a.useEffect)(()=>(l.current=!0,()=>{l.current=!1}),[]),(0,a.useEffect)(()=>{he.dY(e).then(e=>{l.current&&s(e)}).catch(()=>{s("")})},[e]),i?(0,o.jsx)(fe,{...r,ref:t,src:i,alt:n}):(0,o.jsx)(F.A,{...r,ref:t,container:{direction:"column",alignItems:"center",justify:"center",gap:1,pad:2},as:ge,children:(0,o.jsx)(be.A,{message:d("qr_code_not_available")})})});var $e=r(9061);const xe=(0,a.forwardRef)(function({value:e,displayText:n,variant:r="link",...t},a){const i=e?n||e.split("//").map(e=>e.replace(/:/giu,"$&").replace(/[/~.,\\-_?#%]/giu,"$&").replace(/[=&]/giu,"$&")).join("//").split("").reduce((e,n)=>(e.push(n,(0,o.jsx)("wbr",{},e.length)),e),[]):(0,o.jsx)($e.A,{});return"text"!==r&&e?"qrcode"===r?(0,o.jsx)(me,{ref:a,...t,value:e,label:n}):(0,o.jsx)(ue,{ref:a,...t,href:e,children:i}):(0,o.jsx)("span",{ref:a,...t,children:i})})}}]);
//# sourceMappingURL=Aja100_11257435.c84562c5.js.map