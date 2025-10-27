(self.webpackChunkj251=self.webpackChunkj251||[]).push([[48621572],{8:(e,t,n)=>{"use strict";n.d(t,{R:()=>i,Y:()=>o});var r=n(8044);const o=["label","info","additional-info","suggestion-accept","suggestion-reject"],i=(0,r.A)("form-field",o)},1301:(e,t,n)=>{"use strict";n.d(t,{b:()=>l});var r=n(4848),o=n(1594),i=n(8267),a=n(1357),s=n(9549),d=n(7321);const l=i.Ay.div(({theme:{base:{"border-radius":e,"font-size":t,"font-scale":n,animation:{speed:r,timing:o},palette:s},components:{"form-field":l,"form-control":{"foreground-color":c,"background-color":u,"border-color":h,"border-radius":p,"border-width":f,":hover":{"border-color":b},":focus":{"border-color":m,"box-shadow":g},":disabled":{"border-color":$,"background-color":x},":read-only":{"border-color":A,"background-color":w}}}},status:y,hasSuggestion:v})=>{const k=(0,d.Vr)(t,n),j=y&&l[y]?l[y]["status-color"]:h,C=v&&y?(0,a.jh)(.1,l[y]["status-color"],s["primary-background"]):u;return i.AH`
      color: ${c};
      background-color: ${C};
      border-radius: calc(${e} * ${p});
      border-color: ${j};
      border-width: ${f};
      border-style: solid;
      transition-property: color, background-color, border-color;
      transition-duration: ${r};
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
        border-color: ${m};
        box-shadow: ${g};
        ${v&&i.AH`
          background-color: ${u};
        `}
      }

      &:focus-within:not([disabled]) {
        ${v&&i.AH`
          background-color: ${u};
        `}
      }

      &:hover:not([readonly]):not([disabled]):not(:focus, :focus-within) {
        ${!y&&i.AH`
          border-color: ${b};
        `}
        ${v&&i.AH`
          background-color: ${u};
          box-shadow: 0 0 0 0.125rem ${(0,a.B3)(j,.2)};
        `}
      }

      ${v&&i.AH`
        border-end-end-radius: 0;
      `}

      &[readonly] {
        background-color: ${w};
        border-color: ${A};
      }

      @media (pointer: coarse) {
        /* stylelint-disable-next-line unit-allowed-list */
        font-size: max(${k.s}, 16px);
      }
    `});l.defaultProps=s.qn,(0,o.forwardRef)(function(e,t){return(0,r.jsx)(l,{ref:t,...e})})},2020:(e,t,n)=>{var r={};function o(e){return Promise.resolve().then(()=>{if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n(r[e])})}o.keys=()=>Object.keys(r),o.id=2020,e.exports=o},2841:(e,t,n)=>{"use strict";n.d(t,{Ah:()=>ee,GW:()=>X,Ay:()=>oe});var r={};n.r(r),n.d(r,{Component:()=>S,name:()=>H,set:()=>C,viewBox:()=>I});var o={};n.r(o),n.d(o,{Component:()=>E,name:()=>_,set:()=>P,viewBox:()=>R});var i=n(4848),a=n(1594),s=n(8267),d=n(1357),l=n(9549),c=n(7501),u=n(9573),h=n(3351),p=n(8579),f=n(9586),b=n(2884),m=n(4853),g=n(3113),$=n(7321),x=n(7491),A=n(9187),w=n(7666),y=n(9576),v=n(4869),k=n(6878),j=n(6765);const C="budicon",H="warn-solid",S=()=>(0,i.jsx)("path",{d:"M23.5 22.5h-22l11-20 11 20Zm-9.741-6.935V9.39a1.655 1.655 0 0 0-1.166-.447c-.42 0-.792.134-1.212.447v6.175a3.23 3.23 0 0 0 1.212.223c.466 0 .839-.09 1.166-.223Zm-1.212 4.787c.466 0 .886-.179 1.212-.492.326-.313.466-.671.466-1.074 0-.447-.14-.85-.466-1.163-.326-.313-.746-.447-1.212-.447-.42 0-.792.134-1.119.447a1.594 1.594 0 0 0-.512 1.163c0 .403.186.76.512 1.074.327.313.7.492 1.119.492Z"}),I="0 0 25 25",P="budicon",_="diamond-minus",E=()=>(0,i.jsx)("path",{fill:"currentColor",fillRule:"evenodd",d:"M23.219 13.178a.96.96 0 0 0 0-1.356L13.179 1.78a.96.96 0 0 0-1.357 0L1.78 11.821a.96.96 0 0 0 0 1.357l10.04 10.041a.96.96 0 0 0 1.357 0l10.041-10.04ZM18 11.5H7v2h11v-2Z"}),R="0 0 25 25";var D=n(8072),O=n(3611),q=n(1301),T=n(7940),F=n(5206),L=n(9463);const V=s.Ay.span`
  display: none;
`,G=(0,a.forwardRef)(function(e,t){const{portalTarget:n}=(0,L.A)();return n?(0,F.createPortal)((0,i.jsx)(V,{...e,ref:t}),n):null});var N=n(8044),z=n(8);const M=(0,N.A)("radio-check",["control",...z.Y]),W=s.Ay.div(e=>{const{theme:{base:{spacing:t},components:{"form-field":n,"radio-check":{size:r,"touch-size":o,"background-color":i,"border-color":a,"border-width":d}}},status:l}=e;let c=a;return"error"!==l&&"warning"!==l||(c=n[l]["status-color"]),s.AH`
      display: flex;
      flex-shrink: 0;
      position: relative;
      width: ${r};
      height: ${r};
      margin-inline-end: calc(0.5 * ${t});
      border: ${d} solid ${c};
      background-color: ${i};

      @media (pointer: coarse) {
        width: ${o};
        height: ${o};
      }

      &::after {
        content: '';
        display: none;
      }
    `});W.defaultProps=l.qn;const B=s.Ay.input(e=>{const{disabled:t,theme:{base:{"border-radius":n},components:{"form-control":{":focus":{"box-shadow":r,"border-color":o},":read-only":{"background-color":i}},"radio-check":{size:a,":checked":{"background-color":l,"border-color":c}},checkbox:{"border-radius":u},"radio-button":{"border-radius":h}}}}=e,p=e.readOnly?i:l,f=(0,A.A)(()=>(0,$.W0)(p)),b=`+ ${g.G} ${W}`,{ltr:m}=(0,T.A)();return s.AH`
    ${d.Ic}
    margin: 0;

    /* Sets rect size for JAWS focus outline */
    width: ${a};
    height: ${a};

    ${!t&&s.AH`
      &:focus ${b} {
        box-shadow: ${r};
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
      width: calc(${a} * 0.3);
      height: calc(${a} * 0.3);
      border-radius: ${h};
      border: calc(${a} * 0.2) solid ${f};
    }

    &[type='checkbox'] ${b} {
      border-radius: min(calc(${n} * ${u}), 0.25rem);
    }

    &[type='checkbox']:not(:indeterminate) ${b} {
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

    &[type='checkbox']:indeterminate ${b} {
      display: flex;

      &::after {
        width: 90%;
        height: 0.15em;
        margin: auto;
        background-color: ${f};
      }
    }
  `});B.defaultProps=l.qn;const Z=s.Ay.div(e=>{const{disabled:t,readOnly:n,theme:{base:r,components:{"radio-check":{label:{color:o,"font-weight":i}},"form-control":{":hover":{"border-color":a}}}}}=e,d=(0,$.Vr)(r["font-size"],r["font-scale"]);return s.AH`
      > ${g.G} {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-weight: ${i};
        word-break: break-word;
        font-size: ${d.s};
        color: ${o};
        margin: 0;
        min-height: ${r["hit-area"]["mouse-min"]};

        @media (pointer: coarse) {
          min-height: ${r["hit-area"]["finger-min"]};
        }
      }

      > ${X} {
        margin: 0;
        padding-inline-start: calc(${r.spacing} / 4);
      }

      ${!(t||n)&&s.AH`
        &:not(:focus-within) > ${g.G}:hover ${W} {
          border-color: ${a};
        }
      `}
    `});Z.defaultProps=l.qn;const U=s.Ay.label(({disabled:e,readOnly:t,status:n,theme:{base:{palette:r,shadow:o,spacing:i},components:{card:a,"form-field":d,"radio-check":{label:l},"form-control":{":hover":{"border-color":c}}}}})=>{const u="error"===n?d.error["status-color"]:r["border-line"];return s.AH`
      min-width: min-content;
      cursor: pointer;
      background-color: ${a.background};
      border-radius: ${a["border-radius"]};
      border: 0.0625rem solid ${u};
      padding: ${i};

      ${e&&s.AH`
        cursor: not-allowed;
      `}
      ${!(e||t)&&s.AH`
        :hover:not(:focus-within) {
          border-color: ${c};

          ${g.G} ${W} {
            border-color: ${c};
          }
        }

        :focus-within {
          box-shadow: ${o.focus};
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
    `});U.defaultProps=l.qn;const Y=(0,a.forwardRef)(function(e,t){const n=(0,h.A)(),r=(0,f.A)(),{testId:o,type:s,id:d=n,label:l,required:c=!1,disabled:u=!1,readOnly:b=!1,indeterminate:g=!1,checked:$,defaultChecked:x,variant:A="simple",onClick:w,onKeyDown:v,onChange:k,status:j,info:C,additionalInfo:H,ariaDescribedby:S,className:I,...P}=e,_=(0,p.A)(o,M),E="radio"===s,R="card"===A,D=(0,m.A)(t),O=(0,h.A)();return(0,a.useEffect)(()=>{!E&&D.current&&(D.current.indeterminate=!!g)},[D,g,E]),(0,i.jsx)(oe,{testId:_,as:R?U:Z,label:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(W,{status:j,isRadio:E,as:q.b,required:c,disabled:u,readOnly:b,onMouseDown:e=>e.preventDefault()}),l,b&&(0,i.jsx)(G,{id:O,children:r("read_only")})]}),labelAs:R?"div":void 0,id:d,required:c,disabled:u,readOnly:b,status:j,info:C,isRadioCheck:!0,inline:!0,labelAfter:!0,additionalInfo:H,children:(0,i.jsx)(B,{"data-testid":_.control,...P,className:(0,y.A)("radio-check",I,{variant:A,type:s}),id:d,type:s,required:c,checked:$,defaultChecked:x,"aria-describedby":b?`${S} ${O}`:S,disabled:u,readOnly:b,onChange:k,onClick:e=>{b&&e.preventDefault(),w?.(e)},onKeyDown:e=>{"checkbox"===s&&b&&" "===e.key&&e.preventDefault(),"radio"===s&&b&&e.key.includes("Arrow")&&e.preventDefault(),v?.(e)},ref:D})})});(0,v.A)(Y,M),(0,j.pU)(r,o,D);const K=(0,s.Ay)(j.Ay)(({theme:e,status:t})=>s.AH`
    height: 1em;
    width: 1em;
    color: ${(0,A.A)(()=>(0,$.ho)(e.components["form-field"][t]["status-color"],e.base.palette["primary-background"]),()=>e.components["form-field"][t]["status-color"])};
    vertical-align: baseline;
  `);K.defaultProps=l.qn;const J=(0,s.Ay)(k.Ay)(({theme:e})=>s.AH`
    margin-block-start: calc(${e.base.spacing} / 2);
    align-self: start;
  `);J.defaultProps=l.qn;const X=s.Ay.div(({status:e,theme:{base:{"font-size":t,"font-scale":n,spacing:r,palette:o},components:{"form-field":i}}})=>{const{xxs:a}=(0,$.Vr)(t,n);return s.AH`
      max-width: max-content;
      font-size: ${a};
      word-break: break-word;

      &:not(:empty) {
        margin-block-start: calc(0.25 * ${r});
      }

      ${e&&i[e]&&s.AH`
        color: ${(0,A.A)(()=>(0,$.ho)(i[e]["status-color"],o["primary-background"]),()=>i[e]["status-color"])};
      `}
    `});X.defaultProps=l.qn;const Q=s.Ay.div``,ee=s.Ay.div(e=>{const{labelAsLegend:t,isRadioCheck:n,showAdditionalInfo:r,disabled:o,required:i,theme:{base:{palette:{urgent:a},"disabled-opacity":d,spacing:l,"hit-area":{"compact-min":c}}}}=e;return s.AH`
    ${o&&s.AH`
      opacity: ${d};
      -webkit-user-select: none;
      user-select: none;
    `}
    position: relative;
    border: 0;

    &:has(${B}:only-of-type) {
      ${X} {
        min-width: 100%;
      }
    }

    > ${g.G}, > ${Q} {
      &:not(:empty) {
        margin-bottom: calc(0.25 * ${l});
        min-height: ${c};
      }
    }

    > ${g.G}, > ${Q} > ${g.G} {
      ${i&&s.AH`
        &::after {
          content: ${'"\\00a0*" / ""'};
          color: ${a};
        }
      `}

      ${o&&s.AH`
        cursor: not-allowed;
      `}
    }

    ${t&&s.AH`
      > legend {
        display: inline-flex;
        align-items: flex-end;
      }
    `}

    ${t&&r&&s.AH`
      display: block;

      > legend {
        float: inline-start;
      }

      > ${O.f} {
        ${!n&&s.AH`
          float: inline-end;
        `}
        + * {
          clear: both;
        }
      }
    `}
  `});ee.defaultProps=l.qn;const te=(0,s.Ay)(k.Ay)(({theme:{base:{"font-size":e,"font-scale":t,"border-radius":n,spacing:r,palette:o},components:{"form-control":{"border-radius":i,"border-width":a},"form-field":l}}})=>{const{xxs:c}=(0,$.Vr)(e,t),u=(0,A.A)(()=>(0,$.ho)(l.pending["status-color"],o["primary-background"]),()=>l.pending["status-color"]),h=(0,$.ZV)(u),p=(0,A.A)(()=>(0,$.W0)(u)),f=p?(0,d.B3)(p,.4):p;return s.AH`
    background-color: ${u};
    color: ${p};
    font-size: ${c};
    min-width: calc(3 * ${r});
    min-height: calc(3 * ${r});
    padding: 0 ${r};
    border-radius: 0;
    border: none;

    &:first-child {
      border-inline-end: ${a} solid ${f};
      border-end-start-radius: calc(${n} * ${i});
      margin-inline-start: calc(2 * ${r});
    }

    &:last-child {
      border-end-end-radius: calc(${n} * ${i});
      margin-inline-start: 0;
    }

    &:hover {
      color: ${h.foreground};
      background-color: ${h.background};
    }

    @media (pointer: coarse) {
      min-height: 2rem;
    }
  `});te.defaultProps=l.qn;const ne={error:"warn-solid",warning:"diamond-minus",success:"check"},re=(0,a.forwardRef)(function(e,t){const n=(0,h.A)(),{testId:r,children:o,id:s=n,as:d="div",label:l,labelAs:$="label",labelFor:A=s,labelId:v,labelHidden:k=!1,labelAfter:j=!1,info:C,status:H,isRadioCheck:S,charLimitDisplay:I,required:P=!1,disabled:_=!1,readOnly:E=!1,inline:R=!1,onClear:D,actions:q,container:T,additionalInfo:F,onResolveSuggestion:L,"aria-describedby":V,className:G,...N}=e,M=(0,p.A)(r,z.R),W=(0,f.A)(),{announceAssertive:B}=(0,b.A)(),Z="legend"===$,U="pending"===H&&!!L,Y=(0,m.A)(t),re=(0,a.useRef)(null),[oe,ie]=(0,a.useState)(null),ae=!!F&&!_&&!k,se=(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(g.A,{"data-testid":M.label,id:v,as:$,htmlFor:"label"===$?A:void 0,labelHidden:k,onClick:e=>{E&&e.preventDefault()},inline:R,ref:re,children:l}),ae&&oe&&(0,i.jsx)(O.A,{"data-testid":M.additionalInfo,heading:F.heading,contextualLabel:oe,children:F.content})]}),de=S||Z||k?se:(0,i.jsx)(c.A,{as:Q,container:{justify:"between",alignItems:"end"},item:{alignSelf:"stretch"},children:se});let le;if((0,a.useEffect)(()=>{ie(re.current?.textContent??null)},[l]),(0,a.useEffect)(()=>{if("error"===H||"warning"===H){let e=`${W(H)} ${C}`;re.current?.textContent&&(e=`${re.current?.textContent} ${e}`),B({message:e,type:H})}},[H,C]),Z||a.Children.count(o)>1)le=o;else{const e=a.Children.only(o).props["aria-describedby"];le=(0,a.cloneElement)(o,{"aria-describedby":[e,C?`${s}-info`:void 0].join(" ").trim()||void 0})}q&&(le=(0,i.jsxs)(c.A,{container:{alignItems:"center",gap:.5},children:[le,(0,i.jsx)(u.A,{items:q,menuAt:3})]}));let ce=(0,i.jsxs)(c.A,{id:`${s}-info`,"data-testid":M.info,status:H,as:X,container:{alignItems:"center",gap:.5},children:[H&&"pending"!==H&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(c.A,{item:{alignSelf:"start"},as:K,status:H,name:ne[H]}),(0,i.jsx)(x.A,{children:`${W(H)} `})]}),C]});if(I&&(ce=(0,i.jsxs)(c.A,{container:{justify:ce?"between":"end",gap:1},children:[ce,(0,i.jsx)(c.A,{item:{shrink:0},children:I})]})),U){const e=(0,w.A)(Y);ce=(0,i.jsxs)(c.A,{container:{alignItems:"start",justify:"between"},children:[(0,i.jsxs)(X,{"data-testid":M.info,status:H,id:`${s}-info`,children:[W("suggestion_info"),(0,i.jsx)(x.A,{"aria-live":"polite",children:W("suggestion_assist")})]}),(0,i.jsxs)(c.A,{container:{wrap:"nowrap"},children:[(0,i.jsx)(te,{"data-testid":M.suggestionReject,onClick:()=>{L(!1),e[0]?.focus()},"aria-label":`${W("no")}, ${W("reject_suggestion_button_a11y")}${oe?` - ${oe}`:""}`,children:W("no")}),(0,i.jsx)(te,{"data-testid":M.suggestionAccept,onClick:()=>{L(!0),e[0]?.focus()},"aria-label":`${W("yes")}, ${W("accept_suggestion_button_a11y")}${oe?` - ${oe}`:""}`,children:W("yes")})]})]})}const ue=[];return V&&ue.push(V),Z&&C&&ue.push(`${s}-info`),(0,i.jsxs)(c.A,{"data-testid":M.root,...N,container:{direction:R?"row":"column",alignItems:R?"center":void 0,wrap:S?"wrap":void 0,...T},as:ee,labelAsLegend:Z,isRadioCheck:S,showAdditionalInfo:ae,id:`${s}-field`,forwardedAs:d,required:P,disabled:_,readOnly:E,onKeyDown:U?e=>{"Enter"===e.key&&(e.target.closest("button")||(e.preventDefault(),L?.(!0)))}:void 0,"aria-describedby":ue.length?ue.join(" "):void 0,ref:Y,className:(0,y.A)("form-field",G,{status:H}),children:[(Z||!j)&&de,le,!Z&&j&&de,!E&&ce,S&&D&&(0,i.jsx)(J,{variant:"link",onClick:()=>{D()},children:W("clear_selection")})]})}),oe=(0,v.A)(re,z.R)},3249:(e,t,n)=>{"use strict";n.d(t,{A:()=>l});var r=n(4848),o=n(1594),i=n(4853),a=n(3700),s=n(3456);const d=e=>{const{status:t,dimension:n,transitionSpeed:r,transitionTimingFunction:o,min:i,max:a,nullWhenCollapsed:s,el:d}=e,l={};let c=a;return d&&!a&&(c=((e,t)=>e?"height"===t?`${e.scrollHeight}px`:`${e.scrollWidth}px`:"")(d,n)),"expanded"!==t&&"collapsed"!==t||((a||i)&&(l[n]="expanded"===t?c:i||0,l["overflow"+("width"===n?"X":"Y")]="hidden"),"collapsed"!==t||s||i||(l[n]=0,l.overflow="hidden",l.visibility="hidden")),"expanding"!==t&&"collapsing"!==t||(l[n]="expanding"===t?c:i||0,l.overflow="hidden",l.transitionProperty=n,l.transitionDuration=`max(${r}, 0.01ms)`,l.transitionTimingFunction=o),l},l=(0,o.forwardRef)(function(e,t){const{base:{animation:n}}=(0,s.A)(),{children:l,dimension:c="height",collapsed:u=!1,onBeforeExpand:h,onAfterExpand:p,onBeforeCollapse:f,onAfterCollapse:b,transitionSpeed:m=n.speed,min:g,max:$,nullWhenCollapsed:x=!1,as:A="div",...w}=e,[y,v]=(0,o.useState)(u?"collapsed":"expanded"),k=(0,o.useState)(),j=k[1];let C=k[0];const H=(0,a.A)(y),S=(0,i.A)(t),I=(0,o.useCallback)(e=>{e.target===S.current&&e.propertyName===c&&v("expanding"===y?"expanded":"collapsed")},[S.current,y]);return(0,o.useLayoutEffect)(()=>{const e=u,t=!u,r=["expanded","expanding"].includes(y),o=["collapsed","collapsing"].includes(y);t&&o?(h?.(),v("expanding")):e&&r&&(f?.(),v("collapsing")),"expanded"===y&&"expanded"!==H?p?.():"collapsed"===y&&"collapsed"!==H&&b?.(),j(d({dimension:c,min:g,max:$,transitionSpeed:m,nullWhenCollapsed:x,status:y,el:S.current,transitionTimingFunction:n.timing.ease}))},[u,y,g,$]),y!==H&&["expanded","collapsed"].includes(H)&&(C=d({dimension:c,min:g,max:$,transitionSpeed:m,nullWhenCollapsed:x,status:"expanding"===y?"collapsing":"expanding",el:S.current,transitionTimingFunction:n.timing.ease})),"collapsed"===y&&x&&!g?null:(0,r.jsx)(A,{ref:S,onTransitionEnd:I,...w,inert:"collapsed"!==y||x||g?void 0:"",style:C,children:l})})},6467:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>g});var r={};n.r(r),n.d(r,{Component:()=>b,name:()=>f,set:()=>p,viewBox:()=>m});var o=n(1594),i=n(6765),a=n(8565),s=n(7521),d=n(6723),l=n(1093),c=(n(6859),n(8267));const u=c.Ay.div(()=>c.AH`
    margin: 0px 0;
    
    /* Container for input with search button */
    .input-with-search {
      display: flex;
      align-items: flex-end; /* Align to bottom to match input field level */
      gap: 0.5rem; /* Consistent spacing with other components */
      position: relative;
      width: 100%;
      
      /* Target the Input component wrapper (first child) */
      & > div:first-child {
        flex-grow: 1; /* Allows the input field to take up available space */
        min-width: 0; /* Allow the input to shrink if needed */
      }
      
      /* Search emoji button styling - match emoji controls */
      .search-emoji-button {
        align-self: flex-end; /* Align button to bottom to match input field */
        margin-bottom: 0.15rem; /* Adjust to lower the emoji slightly more */
        flex-shrink: 0;
        font-size: 30px;
        width: 30px;
        height: 30px;
        border: none;
        background: none;
        padding: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        border-radius: 4px;

        &:hover:not(:disabled) {
          background-color: rgba(0, 0, 0, 0.04);
          transform: scale(1.05);
        }

        &:active:not(:disabled) {
          transform: scale(0.95);
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        &:focus {
          outline: 2px solid #007acc;
          outline-offset: 2px;
        }
      }
    }
  `);var h=n(4848);const p="budicon",f="search",b=()=>(0,h.jsx)("path",{d:"m18.513 17.115 4.754 4.755.047.14c.14.232.186.42.186.512 0 .653-.326.979-.979.979-.186 0-.42-.094-.652-.28l-4.708-4.708c-1.77 1.445-3.776 2.144-6.06 2.144-2.656 0-4.894-.932-6.758-2.797-1.91-1.91-2.843-4.148-2.843-6.758 0-2.61.932-4.848 2.843-6.759C6.253 2.433 8.491 1.5 11.102 1.5c2.61 0 4.847.932 6.758 2.843 1.865 1.864 2.797 4.102 2.797 6.759 0 2.237-.7 4.242-2.144 6.013Zm-7.365 1.631c2.098 0 3.869-.746 5.36-2.237 1.492-1.492 2.238-3.263 2.238-5.36 0-2.099-.746-3.916-2.237-5.408-1.492-1.492-3.263-2.237-5.36-2.237-2.099 0-3.916.745-5.408 2.237-1.492 1.492-2.237 3.31-2.237 5.407 0 2.098.745 3.869 2.237 5.36 1.492 1.492 3.31 2.238 5.407 2.238Z"}),m="0 0 25 25";(0,i.pU)(r);const g=(0,l.A)(function(e){const{getPConnect:t,placeholder:n,validatemessage:r,label:i,hideLabel:l=!1,helperText:c,testId:p,additionalProps:f={},value:b,searchPropRef:m,displayMode:g}=e,$=t().getActionsApi(),[x,A,w]=[e.readOnly,e.required,e.disabled].map(e=>!0===e||"string"==typeof e&&"true"===e),[y,v]=(0,o.useState)(b);(0,o.useEffect)(()=>v(b),[b]);const k=()=>{if(console.log("TextInputSearch: Search button clicked!",{inputValue:y,searchPropRef:m,disabled:w,readOnly:x}),!y?.trim())return console.warn("TextInputSearch: No search text provided"),void alert("Please enter search text first");if(m)try{$.triggerFieldChange(m,y),console.log("TextInputSearch: Triggered server search for:",y)}catch(e){console.error("TextInputSearch: Failed to trigger server search:",e)}(e=>{try{window.dispatchEvent(new CustomEvent("pdfViewerSearch",{detail:{searchText:e,property:m}})),window.dispatchEvent(new CustomEvent("simplePdfViewerSearch",{detail:{searchText:e,property:m}})),window.PDFSearchManager&&window.PDFSearchManager.triggerSearch(e),window.simplePdfViewer?.search&&window.simplePdfViewer.search(e)&&console.log("TextInputSearch: PDF viewer handled search directly"),window.pdfViewer?.search&&window.pdfViewer.search(e),console.log("TextInputSearch: Dispatched PDF search events for:",e)}catch(e){console.error("TextInputSearch: Error in PDF search communication:",e)}})(y)};if("DISPLAY_ONLY"===g){const e=b||(0,h.jsx)("span",{"aria-hidden":"true",children:"––"});return(0,h.jsx)(u,{children:e})}if("LABELS_LEFT"===g){const e=b||(0,h.jsx)("span",{"aria-hidden":"true",children:"––"});return(0,h.jsx)(u,{children:(0,h.jsx)(a.Ay,{variant:l?"stacked":"inline","data-testid":p,fields:[{id:"1",name:l?"":i,value:e}]})})}if("STACKED_LARGE_VAL"===g){const e=void 0!==b&&""!==b?(0,h.jsx)(s.A,{variant:"h1",as:"span",children:b}):"";return(0,h.jsx)(u,{children:(0,h.jsx)(a.Ay,{variant:"stacked","data-testid":p,fields:[{id:"2",name:l?"":i,value:e}]})})}return(0,h.jsx)(u,{children:(0,h.jsxs)("div",{className:"input-with-search",children:[(0,h.jsx)(d.A,{...f,type:"text",label:i,labelHidden:l,value:y,placeholder:n,helperText:c,info:r,onChange:e=>{v(e.target.value)},readOnly:x,disabled:w,required:A,"data-testid":p}),(0,h.jsx)("button",{className:"search-emoji-button",onClick:k,onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),k())},disabled:w||x||!y?.trim(),"aria-label":`Search for: ${y||"Enter text first"}`,"data-testid":`${p}-search`,type:"button",children:"🔍"})]})})})},6723:(e,t,n)=>{"use strict";n.d(t,{A:()=>A});var r=n(4848),o=n(1594),i=n(2841),a=n(1301),s=n(4869),d=n(3974),l=n(9576),c=n(3351),u=n(8579),h=n(8267),p=n(9549),f=n(3113);h.Ay.div`
  gap: 1rem;

  /* Let flex items be aligned to the baseline of their first child */
  align-items: baseline;

  ${a.b} {
    position: relative;
  }

  > :first-child {
    > ${a.b}:after {
      content: '-';
      position: absolute;
      width: 1rem;
      inset-inline-end: -1rem;
      text-align: center;
    }
  }

  > ${a.b}:first-child:after {
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

  > ${i.Ah} {
    /* Override 'display: flex' to not interfere with labels' baseline alignment */
    display: block;

    ${f.G} {
      /* Enable baseline alignment against this element */
      display: inline-block;
    }
  }
`.defaultProps=p.qn;const b=h.Ay.input(({theme:{base:e,components:t}})=>h.AH`
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
  `);b.defaultProps=p.qn;const m=b;var g=n(8044),$=n(8);const x=(0,g.A)("input",["control",...$.Y]),A=(0,s.A)((0,o.forwardRef)(function(e,t){const n=(0,c.A)(),{testId:o,id:s=n,value:h,defaultValue:p,required:f=!1,disabled:b=!1,readOnly:g=!1,label:$,additionalInfo:A,labelHidden:w,info:y,status:v,actions:k,onResolveSuggestion:j,className:C,...H}=e,S=(0,u.A)(o,x),I={};(0,d.A)(e,"value")?I.value=h??"":(0,d.A)(e,"defaultValue")&&(I.defaultValue=p??"");const P=(0,r.jsx)(a.b,{"data-testid":S.control,ref:t,id:s,required:f,disabled:b,readOnly:g,status:v,hasSuggestion:!!j&&"pending"===v,...I,autoComplete:"_off",...H,as:m,className:(0,l.A)("input",C)});return $?(0,r.jsx)(i.Ay,{testId:S,additionalInfo:A,label:$,labelHidden:w,id:s,info:y,readOnly:g,status:v,required:f,disabled:b,actions:k,onResolveSuggestion:j,children:P}):P}),x)},6859:(e,t,n)=>{window?.__webpack_nonce__&&(n.nc=window.__webpack_nonce__)},6935:e=>{function t(e){return Promise.resolve().then(()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t})}t.keys=()=>[],t.resolve=t,t.id=6935,e.exports=t},8565:(e,t,n)=>{"use strict";n.d(t,{Ay:()=>P});var r=n(4848),o=n(1594),i=n(8267),a=n(6883),s=n(3113),d=n(8579),l=n(4853),c=n(4651),u=n(3456),h=n(9549),p=n(9586),f=n(4680),b=n(6878),m=n(3249);const g=(0,i.Ay)(b.Ay)``,$=({children:e,lines:t})=>{const[n,i]=(0,o.useState)(!0),[a,s]=(0,o.useState)(!1),d=(0,o.useRef)(null),l=(0,p.A)(),c=(0,o.useMemo)(()=>{if(!f.A)return 1/0;const e=1.25*Number.parseInt(window.getComputedStyle(document.documentElement).getPropertyValue("font-size"),10);return t*e},[]);return(0,o.useLayoutEffect)(()=>{if(!d.current)return;const e=new ResizeObserver(e=>{const t=e.some(({target:e,contentRect:t})=>{if(e===d.current)return t.height>c});s(t)});return e.observe(d.current),()=>{e.disconnect()}},[d.current,c]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(m.A,{collapsed:n,min:a?`${c}px`:"max-content",children:(0,r.jsx)("div",{ref:d,children:e})}),a&&(0,r.jsx)(g,{variant:"link",onClick:()=>i(e=>!e),children:l(n?"show_more":"show_less")})]})};var x=n(4869),A=n(9061),w=n(8044);const y=(0,w.A)("field-value-list",[]),v=(0,w.A)("field-value-item",["name","value"]),k=i.Ay.dt`
  word-break: break-word;
`,j=i.Ay.dd`
  word-break: break-word;
`,C=i.Ay.div``,H=i.Ay.dl(({variant:e,theme:t})=>{const{components:{"field-value-list":{inline:{detached:n}}}}=t;return i.AH`
    width: 100%;

    ${"value-comparison"===e&&i.AH`
      dt {
        width: 100%;
      }
      dd {
        text-align: end;
        padding-inline-start: calc(2 * ${t.base.spacing});
      }
      ${s.G} {
        max-width: unset;
      }
      dd:not(:last-of-type),
      dt:not(:last-of-type) {
        border-bottom: 0.0625rem solid ${t.base.palette["border-line"]};
        padding-bottom: calc(0.5 * ${t.base.spacing});
      }
    `}

    ${n&&"inline"===e&&i.AH`
      dt {
        width: 100%;
        padding-inline-end: calc(${t.base.spacing});
      }
      ${s.G} {
        max-width: unset;
      }
      dd:not(:last-of-type),
      dt:not(:last-of-type),
      dd:has(+ ${C}),
      dt:has(+ dd + ${C}),
      ${C}:has(+ dt + dd),
      ${C}:not(:last-of-type) {
        border-bottom: 0.0625rem dashed ${t.base.palette["border-line"]};
        padding-bottom: calc(0.5 * ${t.base.spacing});
      }
    `}
  `});H.defaultProps=h.qn;const S=(0,x.A)(({testId:e,name:t,value:n,variant:o="inline",truncate:i=!0})=>{const a=(0,d.A)(e,v),l="string"==typeof n&&i?(0,r.jsx)($,{lines:3,children:n}):n,c=(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.G,{"data-testid":a.name,as:k,role:"none",children:t}),(0,r.jsx)(j,{"data-testid":a.value,role:"none",children:n?l:(0,r.jsx)(A.A,{})})]});return"stacked"===o?(0,r.jsx)(C,{"data-testid":a.root,children:c}):(0,r.jsx)(r.Fragment,{children:c})},v),I=(0,o.forwardRef)(function({testId:e,fields:t,variant:n="inline",...o},i){const s=(0,d.A)(e,y),h=(0,l.A)(i),p=(0,c.A)("xs",{breakpointRef:h,themeProp:"content-width"}),{components:{"field-value-list":{inline:{detached:f}}}}=(0,u.A)();return(0,r.jsx)(a.A,{"data-testid":s.root,...o,ref:h,container:{cols:["inline","value-comparison"].includes(n)&&p?"16ch minmax(0, 1fr)":"minmax(0, 1fr)",colGap:f||"value-comparison"===n?0:2,rowGap:f||"value-comparison"===n?.5:1},as:H,role:"none",variant:p?n:"stacked",children:t.map(({id:e,name:t,value:o,truncate:i=!0,variant:a})=>{const s={name:t,variant:"stacked"!==(a??n)&&p?"inline":"stacked"};return"string"==typeof o?(0,r.jsx)(S,{...s,value:o,truncate:i},e??t):(0,r.jsx)(S,{...s,value:o},e??t)})})}),P=(0,x.A)(I,y)}}]);
//# sourceMappingURL=Aja100_Any_jaygasi_TextInputSearch.017a2279.js.map