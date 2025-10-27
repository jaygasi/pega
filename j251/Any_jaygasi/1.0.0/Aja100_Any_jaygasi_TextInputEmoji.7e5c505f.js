(self.webpackChunkj251=self.webpackChunkj251||[]).push([[84651018],{8:(e,t,n)=>{"use strict";n.d(t,{R:()=>o,Y:()=>a});var i=n(8044);const a=["label","info","additional-info","suggestion-accept","suggestion-reject"],o=(0,i.A)("form-field",a)},1301:(e,t,n)=>{"use strict";n.d(t,{b:()=>l});var i=n(4848),a=n(1594),o=n(8267),r=n(1357),s=n(9549),d=n(7321);const l=o.Ay.div(({theme:{base:{"border-radius":e,"font-size":t,"font-scale":n,animation:{speed:i,timing:a},palette:s},components:{"form-field":l,"form-control":{"foreground-color":c,"background-color":u,"border-color":p,"border-radius":m,"border-width":h,":hover":{"border-color":f},":focus":{"border-color":g,"box-shadow":b},":disabled":{"border-color":x,"background-color":$},":read-only":{"border-color":y,"background-color":A}}}},status:w,hasSuggestion:v})=>{const j=(0,d.Vr)(t,n),k=w&&l[w]?l[w]["status-color"]:p,C=v&&w?(0,r.jh)(.1,l[w]["status-color"],s["primary-background"]):u;return o.AH`
      color: ${c};
      background-color: ${C};
      border-radius: calc(${e} * ${m});
      border-color: ${k};
      border-width: ${h};
      border-style: solid;
      transition-property: color, background-color, border-color;
      transition-duration: ${i};
      transition-timing-function: ${a.ease};
      &,
      & > select {
        outline: none;
      }

      &:disabled,
      &[disabled] {
        background-color: ${$};
        border-color: ${x};
        cursor: not-allowed;
      }

      &:focus:not([disabled]) {
        border-color: ${g};
        box-shadow: ${b};
        ${v&&o.AH`
          background-color: ${u};
        `}
      }

      &:focus-within:not([disabled]) {
        ${v&&o.AH`
          background-color: ${u};
        `}
      }

      &:hover:not([readonly]):not([disabled]):not(:focus, :focus-within) {
        ${!w&&o.AH`
          border-color: ${f};
        `}
        ${v&&o.AH`
          background-color: ${u};
          box-shadow: 0 0 0 0.125rem ${(0,r.B3)(k,.2)};
        `}
      }

      ${v&&o.AH`
        border-end-end-radius: 0;
      `}

      &[readonly] {
        background-color: ${A};
        border-color: ${y};
      }

      @media (pointer: coarse) {
        /* stylelint-disable-next-line unit-allowed-list */
        font-size: max(${j.s}, 16px);
      }
    `});l.defaultProps=s.qn,(0,a.forwardRef)(function(e,t){return(0,i.jsx)(l,{ref:t,...e})})},2020:(e,t,n)=>{var i={};function a(e){return Promise.resolve().then(()=>{if(!n.o(i,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n(i[e])})}a.keys=()=>Object.keys(i),a.id=2020,e.exports=a},2841:(e,t,n)=>{"use strict";n.d(t,{Ah:()=>ee,GW:()=>X,Ay:()=>ae});var i={};n.r(i),n.d(i,{Component:()=>I,name:()=>S,set:()=>C,viewBox:()=>L});var a={};n.r(a),n.d(a,{Component:()=>H,name:()=>E,set:()=>_,viewBox:()=>D});var o=n(4848),r=n(1594),s=n(8267),d=n(1357),l=n(9549),c=n(7501),u=n(9573),p=n(3351),m=n(8579),h=n(9586),f=n(2884),g=n(4853),b=n(3113),x=n(7321),$=n(7491),y=n(9187),A=n(7666),w=n(9576),v=n(4869),j=n(6878),k=n(6765);const C="budicon",S="warn-solid",I=()=>(0,o.jsx)("path",{d:"M23.5 22.5h-22l11-20 11 20Zm-9.741-6.935V9.39a1.655 1.655 0 0 0-1.166-.447c-.42 0-.792.134-1.212.447v6.175a3.23 3.23 0 0 0 1.212.223c.466 0 .839-.09 1.166-.223Zm-1.212 4.787c.466 0 .886-.179 1.212-.492.326-.313.466-.671.466-1.074 0-.447-.14-.85-.466-1.163-.326-.313-.746-.447-1.212-.447-.42 0-.792.134-1.119.447a1.594 1.594 0 0 0-.512 1.163c0 .403.186.76.512 1.074.327.313.7.492 1.119.492Z"}),L="0 0 25 25",_="budicon",E="diamond-minus",H=()=>(0,o.jsx)("path",{fill:"currentColor",fillRule:"evenodd",d:"M23.219 13.178a.96.96 0 0 0 0-1.356L13.179 1.78a.96.96 0 0 0-1.357 0L1.78 11.821a.96.96 0 0 0 0 1.357l10.04 10.041a.96.96 0 0 0 1.357 0l10.041-10.04ZM18 11.5H7v2h11v-2Z"}),D="0 0 25 25";var O=n(8072),T=n(3611),R=n(1301),z=n(7940),P=n(5206),q=n(9463);const F=s.Ay.span`
  display: none;
`,N=(0,r.forwardRef)(function(e,t){const{portalTarget:n}=(0,q.A)();return n?(0,P.createPortal)((0,o.jsx)(F,{...e,ref:t}),n):null});var G=n(8044),Y=n(8);const V=(0,G.A)("radio-check",["control",...Y.Y]),B=s.Ay.div(e=>{const{theme:{base:{spacing:t},components:{"form-field":n,"radio-check":{size:i,"touch-size":a,"background-color":o,"border-color":r,"border-width":d}}},status:l}=e;let c=r;return"error"!==l&&"warning"!==l||(c=n[l]["status-color"]),s.AH`
      display: flex;
      flex-shrink: 0;
      position: relative;
      width: ${i};
      height: ${i};
      margin-inline-end: calc(0.5 * ${t});
      border: ${d} solid ${c};
      background-color: ${o};

      @media (pointer: coarse) {
        width: ${a};
        height: ${a};
      }

      &::after {
        content: '';
        display: none;
      }
    `});B.defaultProps=l.qn;const K=s.Ay.input(e=>{const{disabled:t,theme:{base:{"border-radius":n},components:{"form-control":{":focus":{"box-shadow":i,"border-color":a},":read-only":{"background-color":o}},"radio-check":{size:r,":checked":{"background-color":l,"border-color":c}},checkbox:{"border-radius":u},"radio-button":{"border-radius":p}}}}=e,m=e.readOnly?o:l,h=(0,y.A)(()=>(0,x.W0)(m)),f=`+ ${b.G} ${B}`,{ltr:g}=(0,z.A)();return s.AH`
    ${d.Ic}
    margin: 0;

    /* Sets rect size for JAWS focus outline */
    width: ${r};
    height: ${r};

    ${!t&&s.AH`
      &:focus ${f} {
        box-shadow: ${i};
        border-color: ${a};
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
      background-color: ${m};

      &::after {
        display: block;
      }
    }

    &[type='radio'] ${f}, &[type='radio'] ${f}::after {
      border-radius: ${p};
    }

    &[type='radio'] ${f}::after {
      content: '';
      position: absolute;
      inset: 0;
      margin: auto;
      width: calc(${r} * 0.3);
      height: calc(${r} * 0.3);
      border-radius: ${p};
      border: calc(${r} * 0.2) solid ${h};
    }

    &[type='checkbox'] ${f} {
      border-radius: min(calc(${n} * ${u}), 0.25rem);
    }

    &[type='checkbox']:not(:indeterminate) ${f} {
      &::after {
        width: 40%;
        height: 75%;
        ${g?s.AH`
              transform: rotate(45deg) translate(50%, -30%);
            `:s.AH`
              transform: rotate(45deg) translate(-50%, 30%);
            `}
        border-right: 0.15em solid ${h};
        border-bottom: 0.15em solid ${h};
      }
    }

    &[type='checkbox']:indeterminate ${f} {
      display: flex;

      &::after {
        width: 90%;
        height: 0.15em;
        margin: auto;
        background-color: ${h};
      }
    }
  `});K.defaultProps=l.qn;const M=s.Ay.div(e=>{const{disabled:t,readOnly:n,theme:{base:i,components:{"radio-check":{label:{color:a,"font-weight":o}},"form-control":{":hover":{"border-color":r}}}}}=e,d=(0,x.Vr)(i["font-size"],i["font-scale"]);return s.AH`
      > ${b.G} {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-weight: ${o};
        word-break: break-word;
        font-size: ${d.s};
        color: ${a};
        margin: 0;
        min-height: ${i["hit-area"]["mouse-min"]};

        @media (pointer: coarse) {
          min-height: ${i["hit-area"]["finger-min"]};
        }
      }

      > ${X} {
        margin: 0;
        padding-inline-start: calc(${i.spacing} / 4);
      }

      ${!(t||n)&&s.AH`
        &:not(:focus-within) > ${b.G}:hover ${B} {
          border-color: ${r};
        }
      `}
    `});M.defaultProps=l.qn;const W=s.Ay.label(({disabled:e,readOnly:t,status:n,theme:{base:{palette:i,shadow:a,spacing:o},components:{card:r,"form-field":d,"radio-check":{label:l},"form-control":{":hover":{"border-color":c}}}}})=>{const u="error"===n?d.error["status-color"]:i["border-line"];return s.AH`
      min-width: min-content;
      cursor: pointer;
      background-color: ${r.background};
      border-radius: ${r["border-radius"]};
      border: 0.0625rem solid ${u};
      padding: ${o};

      ${e&&s.AH`
        cursor: not-allowed;
      `}
      ${!(e||t)&&s.AH`
        :hover:not(:focus-within) {
          border-color: ${c};

          ${b.G} ${B} {
            border-color: ${c};
          }
        }

        :focus-within {
          box-shadow: ${a.focus};
          border-color: transparent;
        }
      `}
        > ${b.G} {
        display: flex;
        align-items: center;
        color: ${l.color};
        font-weight: ${l["font-weight"]};
        margin: 0;
      }

      > ${X} {
        margin: 0;
        padding-inline-start: calc(${o} / 4);
      }
    `});W.defaultProps=l.qn;const U=(0,r.forwardRef)(function(e,t){const n=(0,p.A)(),i=(0,h.A)(),{testId:a,type:s,id:d=n,label:l,required:c=!1,disabled:u=!1,readOnly:f=!1,indeterminate:b=!1,checked:x,defaultChecked:$,variant:y="simple",onClick:A,onKeyDown:v,onChange:j,status:k,info:C,additionalInfo:S,ariaDescribedby:I,className:L,..._}=e,E=(0,m.A)(a,V),H="radio"===s,D="card"===y,O=(0,g.A)(t),T=(0,p.A)();return(0,r.useEffect)(()=>{!H&&O.current&&(O.current.indeterminate=!!b)},[O,b,H]),(0,o.jsx)(ae,{testId:E,as:D?W:M,label:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(B,{status:k,isRadio:H,as:R.b,required:c,disabled:u,readOnly:f,onMouseDown:e=>e.preventDefault()}),l,f&&(0,o.jsx)(N,{id:T,children:i("read_only")})]}),labelAs:D?"div":void 0,id:d,required:c,disabled:u,readOnly:f,status:k,info:C,isRadioCheck:!0,inline:!0,labelAfter:!0,additionalInfo:S,children:(0,o.jsx)(K,{"data-testid":E.control,..._,className:(0,w.A)("radio-check",L,{variant:y,type:s}),id:d,type:s,required:c,checked:x,defaultChecked:$,"aria-describedby":f?`${I} ${T}`:I,disabled:u,readOnly:f,onChange:j,onClick:e=>{f&&e.preventDefault(),A?.(e)},onKeyDown:e=>{"checkbox"===s&&f&&" "===e.key&&e.preventDefault(),"radio"===s&&f&&e.key.includes("Arrow")&&e.preventDefault(),v?.(e)},ref:O})})});(0,v.A)(U,V),(0,k.pU)(i,a,O);const Z=(0,s.Ay)(k.Ay)(({theme:e,status:t})=>s.AH`
    height: 1em;
    width: 1em;
    color: ${(0,y.A)(()=>(0,x.ho)(e.components["form-field"][t]["status-color"],e.base.palette["primary-background"]),()=>e.components["form-field"][t]["status-color"])};
    vertical-align: baseline;
  `);Z.defaultProps=l.qn;const J=(0,s.Ay)(j.Ay)(({theme:e})=>s.AH`
    margin-block-start: calc(${e.base.spacing} / 2);
    align-self: start;
  `);J.defaultProps=l.qn;const X=s.Ay.div(({status:e,theme:{base:{"font-size":t,"font-scale":n,spacing:i,palette:a},components:{"form-field":o}}})=>{const{xxs:r}=(0,x.Vr)(t,n);return s.AH`
      max-width: max-content;
      font-size: ${r};
      word-break: break-word;

      &:not(:empty) {
        margin-block-start: calc(0.25 * ${i});
      }

      ${e&&o[e]&&s.AH`
        color: ${(0,y.A)(()=>(0,x.ho)(o[e]["status-color"],a["primary-background"]),()=>o[e]["status-color"])};
      `}
    `});X.defaultProps=l.qn;const Q=s.Ay.div``,ee=s.Ay.div(e=>{const{labelAsLegend:t,isRadioCheck:n,showAdditionalInfo:i,disabled:a,required:o,theme:{base:{palette:{urgent:r},"disabled-opacity":d,spacing:l,"hit-area":{"compact-min":c}}}}=e;return s.AH`
    ${a&&s.AH`
      opacity: ${d};
      -webkit-user-select: none;
      user-select: none;
    `}
    position: relative;
    border: 0;

    &:has(${K}:only-of-type) {
      ${X} {
        min-width: 100%;
      }
    }

    > ${b.G}, > ${Q} {
      &:not(:empty) {
        margin-bottom: calc(0.25 * ${l});
        min-height: ${c};
      }
    }

    > ${b.G}, > ${Q} > ${b.G} {
      ${o&&s.AH`
        &::after {
          content: ${'"\\00a0*" / ""'};
          color: ${r};
        }
      `}

      ${a&&s.AH`
        cursor: not-allowed;
      `}
    }

    ${t&&s.AH`
      > legend {
        display: inline-flex;
        align-items: flex-end;
      }
    `}

    ${t&&i&&s.AH`
      display: block;

      > legend {
        float: inline-start;
      }

      > ${T.f} {
        ${!n&&s.AH`
          float: inline-end;
        `}
        + * {
          clear: both;
        }
      }
    `}
  `});ee.defaultProps=l.qn;const te=(0,s.Ay)(j.Ay)(({theme:{base:{"font-size":e,"font-scale":t,"border-radius":n,spacing:i,palette:a},components:{"form-control":{"border-radius":o,"border-width":r},"form-field":l}}})=>{const{xxs:c}=(0,x.Vr)(e,t),u=(0,y.A)(()=>(0,x.ho)(l.pending["status-color"],a["primary-background"]),()=>l.pending["status-color"]),p=(0,x.ZV)(u),m=(0,y.A)(()=>(0,x.W0)(u)),h=m?(0,d.B3)(m,.4):m;return s.AH`
    background-color: ${u};
    color: ${m};
    font-size: ${c};
    min-width: calc(3 * ${i});
    min-height: calc(3 * ${i});
    padding: 0 ${i};
    border-radius: 0;
    border: none;

    &:first-child {
      border-inline-end: ${r} solid ${h};
      border-end-start-radius: calc(${n} * ${o});
      margin-inline-start: calc(2 * ${i});
    }

    &:last-child {
      border-end-end-radius: calc(${n} * ${o});
      margin-inline-start: 0;
    }

    &:hover {
      color: ${p.foreground};
      background-color: ${p.background};
    }

    @media (pointer: coarse) {
      min-height: 2rem;
    }
  `});te.defaultProps=l.qn;const ne={error:"warn-solid",warning:"diamond-minus",success:"check"},ie=(0,r.forwardRef)(function(e,t){const n=(0,p.A)(),{testId:i,children:a,id:s=n,as:d="div",label:l,labelAs:x="label",labelFor:y=s,labelId:v,labelHidden:j=!1,labelAfter:k=!1,info:C,status:S,isRadioCheck:I,charLimitDisplay:L,required:_=!1,disabled:E=!1,readOnly:H=!1,inline:D=!1,onClear:O,actions:R,container:z,additionalInfo:P,onResolveSuggestion:q,"aria-describedby":F,className:N,...G}=e,V=(0,m.A)(i,Y.R),B=(0,h.A)(),{announceAssertive:K}=(0,f.A)(),M="legend"===x,W="pending"===S&&!!q,U=(0,g.A)(t),ie=(0,r.useRef)(null),[ae,oe]=(0,r.useState)(null),re=!!P&&!E&&!j,se=(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(b.A,{"data-testid":V.label,id:v,as:x,htmlFor:"label"===x?y:void 0,labelHidden:j,onClick:e=>{H&&e.preventDefault()},inline:D,ref:ie,children:l}),re&&ae&&(0,o.jsx)(T.A,{"data-testid":V.additionalInfo,heading:P.heading,contextualLabel:ae,children:P.content})]}),de=I||M||j?se:(0,o.jsx)(c.A,{as:Q,container:{justify:"between",alignItems:"end"},item:{alignSelf:"stretch"},children:se});let le;if((0,r.useEffect)(()=>{oe(ie.current?.textContent??null)},[l]),(0,r.useEffect)(()=>{if("error"===S||"warning"===S){let e=`${B(S)} ${C}`;ie.current?.textContent&&(e=`${ie.current?.textContent} ${e}`),K({message:e,type:S})}},[S,C]),M||r.Children.count(a)>1)le=a;else{const e=r.Children.only(a).props["aria-describedby"];le=(0,r.cloneElement)(a,{"aria-describedby":[e,C?`${s}-info`:void 0].join(" ").trim()||void 0})}R&&(le=(0,o.jsxs)(c.A,{container:{alignItems:"center",gap:.5},children:[le,(0,o.jsx)(u.A,{items:R,menuAt:3})]}));let ce=(0,o.jsxs)(c.A,{id:`${s}-info`,"data-testid":V.info,status:S,as:X,container:{alignItems:"center",gap:.5},children:[S&&"pending"!==S&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(c.A,{item:{alignSelf:"start"},as:Z,status:S,name:ne[S]}),(0,o.jsx)($.A,{children:`${B(S)} `})]}),C]});if(L&&(ce=(0,o.jsxs)(c.A,{container:{justify:ce?"between":"end",gap:1},children:[ce,(0,o.jsx)(c.A,{item:{shrink:0},children:L})]})),W){const e=(0,A.A)(U);ce=(0,o.jsxs)(c.A,{container:{alignItems:"start",justify:"between"},children:[(0,o.jsxs)(X,{"data-testid":V.info,status:S,id:`${s}-info`,children:[B("suggestion_info"),(0,o.jsx)($.A,{"aria-live":"polite",children:B("suggestion_assist")})]}),(0,o.jsxs)(c.A,{container:{wrap:"nowrap"},children:[(0,o.jsx)(te,{"data-testid":V.suggestionReject,onClick:()=>{q(!1),e[0]?.focus()},"aria-label":`${B("no")}, ${B("reject_suggestion_button_a11y")}${ae?` - ${ae}`:""}`,children:B("no")}),(0,o.jsx)(te,{"data-testid":V.suggestionAccept,onClick:()=>{q(!0),e[0]?.focus()},"aria-label":`${B("yes")}, ${B("accept_suggestion_button_a11y")}${ae?` - ${ae}`:""}`,children:B("yes")})]})]})}const ue=[];return F&&ue.push(F),M&&C&&ue.push(`${s}-info`),(0,o.jsxs)(c.A,{"data-testid":V.root,...G,container:{direction:D?"row":"column",alignItems:D?"center":void 0,wrap:I?"wrap":void 0,...z},as:ee,labelAsLegend:M,isRadioCheck:I,showAdditionalInfo:re,id:`${s}-field`,forwardedAs:d,required:_,disabled:E,readOnly:H,onKeyDown:W?e=>{"Enter"===e.key&&(e.target.closest("button")||(e.preventDefault(),q?.(!0)))}:void 0,"aria-describedby":ue.length?ue.join(" "):void 0,ref:U,className:(0,w.A)("form-field",N,{status:S}),children:[(M||!k)&&de,le,!M&&k&&de,!H&&ce,I&&O&&(0,o.jsx)(J,{variant:"link",onClick:()=>{O()},children:B("clear_selection")})]})}),ae=(0,v.A)(ie,Y.R)},3249:(e,t,n)=>{"use strict";n.d(t,{A:()=>l});var i=n(4848),a=n(1594),o=n(4853),r=n(3700),s=n(3456);const d=e=>{const{status:t,dimension:n,transitionSpeed:i,transitionTimingFunction:a,min:o,max:r,nullWhenCollapsed:s,el:d}=e,l={};let c=r;return d&&!r&&(c=((e,t)=>e?"height"===t?`${e.scrollHeight}px`:`${e.scrollWidth}px`:"")(d,n)),"expanded"!==t&&"collapsed"!==t||((r||o)&&(l[n]="expanded"===t?c:o||0,l["overflow"+("width"===n?"X":"Y")]="hidden"),"collapsed"!==t||s||o||(l[n]=0,l.overflow="hidden",l.visibility="hidden")),"expanding"!==t&&"collapsing"!==t||(l[n]="expanding"===t?c:o||0,l.overflow="hidden",l.transitionProperty=n,l.transitionDuration=`max(${i}, 0.01ms)`,l.transitionTimingFunction=a),l},l=(0,a.forwardRef)(function(e,t){const{base:{animation:n}}=(0,s.A)(),{children:l,dimension:c="height",collapsed:u=!1,onBeforeExpand:p,onAfterExpand:m,onBeforeCollapse:h,onAfterCollapse:f,transitionSpeed:g=n.speed,min:b,max:x,nullWhenCollapsed:$=!1,as:y="div",...A}=e,[w,v]=(0,a.useState)(u?"collapsed":"expanded"),j=(0,a.useState)(),k=j[1];let C=j[0];const S=(0,r.A)(w),I=(0,o.A)(t),L=(0,a.useCallback)(e=>{e.target===I.current&&e.propertyName===c&&v("expanding"===w?"expanded":"collapsed")},[I.current,w]);return(0,a.useLayoutEffect)(()=>{const e=u,t=!u,i=["expanded","expanding"].includes(w),a=["collapsed","collapsing"].includes(w);t&&a?(p?.(),v("expanding")):e&&i&&(h?.(),v("collapsing")),"expanded"===w&&"expanded"!==S?m?.():"collapsed"===w&&"collapsed"!==S&&f?.(),k(d({dimension:c,min:b,max:x,transitionSpeed:g,nullWhenCollapsed:$,status:w,el:I.current,transitionTimingFunction:n.timing.ease}))},[u,w,b,x]),w!==S&&["expanded","collapsed"].includes(S)&&(C=d({dimension:c,min:b,max:x,transitionSpeed:g,nullWhenCollapsed:$,status:"expanding"===w?"collapsing":"expanding",el:I.current,transitionTimingFunction:n.timing.ease})),"collapsed"===w&&$&&!b?null:(0,i.jsx)(y,{ref:I,onTransitionEnd:L,...A,inert:"collapsed"!==w||$||b?void 0:"",style:C,children:l})})},6039:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>u});var i=n(1594),a=n(8565),o=n(7521),r=n(6723),s=n(1093),d=(n(6479),n(8267));const l=d.Ay.div(()=>d.AH`
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
        transform: translateY(0px);
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
      transform: translateY(0px); /* Same transform as TextInputSearch button */
      flex-shrink: 0; /* Same as TextInputSearch button */
      font-size: 24px;
      width: 28px;
      height: 28px;
      margin: 0;
    }
  `);var c=n(4848);const u=(0,s.A)(function(e){const{getPConnect:t,value:n,placeholder:s,disabled:d=!1,displayMode:u,readOnly:p=!1,required:m=!1,label:h,hideLabel:f=!1,testId:g,variant:b="inline",emojiConfig:x,helperText:$,validatemessage:y,additionalProps:A}=e,w=t(),v=w.getActionsApi(),j=w.getStateProps().value,[k,C]=(0,i.useState)(n||""),[S,I]=(0,i.useState)(!1);(0,i.useEffect)(()=>{C(n||"")},[n]);const L=((e,t)=>{if(!t||!e)return null;try{const n=JSON.parse(t),i=n.status_emojis?.find(t=>t.status.toLowerCase()===e.toLowerCase());return i?i.emoji:null}catch(e){return console.warn("Invalid emoji configuration JSON:",e),null}})(n,x),_=e=>(0,c.jsxs)("div",{className:"display-with-emoji",children:[(0,c.jsx)("span",{children:e}),L&&(0,c.jsx)("span",{className:"status-emoji",children:L})]});if("LABELS_LEFT"===u||"DISPLAY_ONLY"===u){let e=n||(0,c.jsx)("span",{"aria-hidden":"true",children:"––"});return e=_(e),"DISPLAY_ONLY"===u?(0,c.jsx)(l,{"data-display-mode":"DISPLAY_ONLY",children:e}):(0,c.jsx)(l,{"data-display-mode":"LABELS_LEFT",children:(0,c.jsx)(a.Ay,{variant:f?"stacked":b,"data-testid":g,fields:[{id:"1",name:f?"":h,value:e}]})})}if("STACKED_LARGE_VAL"===u){const e=void 0!==n&&""!==n?_((0,c.jsx)(o.A,{variant:"h1",as:"span",children:n})):"";return(0,c.jsx)(l,{"data-display-mode":"STACKED_LARGE_VAL",children:(0,c.jsx)(a.Ay,{variant:"stacked","data-testid":g,fields:[{id:"2",name:f?"":h,value:e}]})})}return(0,c.jsxs)(l,{"data-display-mode":"EDIT",children:[(0,c.jsx)(r.A,{type:"text",value:k,label:h,labelHidden:f,placeholder:s,disabled:d,readOnly:p,required:m,onChange:e=>{const{value:t}=e.target;C(t),I(!0),v.updateFieldValue(j,t)},onBlur:()=>{S&&v.triggerFieldChange(j,k)},onKeyDown:e=>{"Enter"===e.key&&(e.preventDefault(),v.triggerFieldChange(j,k))},testId:g,className:"input-with-emoji",validatemessage:y,helperText:$,...A}),L&&(0,c.jsx)("span",{className:"status-emoji",children:L})]})})},6479:(e,t,n)=>{window?.__webpack_nonce__&&(n.nc=window.__webpack_nonce__)},6723:(e,t,n)=>{"use strict";n.d(t,{A:()=>y});var i=n(4848),a=n(1594),o=n(2841),r=n(1301),s=n(4869),d=n(3974),l=n(9576),c=n(3351),u=n(8579),p=n(8267),m=n(9549),h=n(3113);p.Ay.div`
  gap: 1rem;

  /* Let flex items be aligned to the baseline of their first child */
  align-items: baseline;

  ${r.b} {
    position: relative;
  }

  > :first-child {
    > ${r.b}:after {
      content: '-';
      position: absolute;
      width: 1rem;
      inset-inline-end: -1rem;
      text-align: center;
    }
  }

  > ${r.b}:first-child:after {
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

  > ${o.Ah} {
    /* Override 'display: flex' to not interfere with labels' baseline alignment */
    display: block;

    ${h.G} {
      /* Enable baseline alignment against this element */
      display: inline-block;
    }
  }
`.defaultProps=m.qn;const f=p.Ay.input(({theme:{base:e,components:t}})=>p.AH`
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
  `);f.defaultProps=m.qn;const g=f;var b=n(8044),x=n(8);const $=(0,b.A)("input",["control",...x.Y]),y=(0,s.A)((0,a.forwardRef)(function(e,t){const n=(0,c.A)(),{testId:a,id:s=n,value:p,defaultValue:m,required:h=!1,disabled:f=!1,readOnly:b=!1,label:x,additionalInfo:y,labelHidden:A,info:w,status:v,actions:j,onResolveSuggestion:k,className:C,...S}=e,I=(0,u.A)(a,$),L={};(0,d.A)(e,"value")?L.value=p??"":(0,d.A)(e,"defaultValue")&&(L.defaultValue=m??"");const _=(0,i.jsx)(r.b,{"data-testid":I.control,ref:t,id:s,required:h,disabled:f,readOnly:b,status:v,hasSuggestion:!!k&&"pending"===v,...L,autoComplete:"_off",...S,as:g,className:(0,l.A)("input",C)});return x?(0,i.jsx)(o.Ay,{testId:I,additionalInfo:y,label:x,labelHidden:A,id:s,info:w,readOnly:b,status:v,required:h,disabled:f,actions:j,onResolveSuggestion:k,children:_}):_}),$)},6935:e=>{function t(e){return Promise.resolve().then(()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t})}t.keys=()=>[],t.resolve=t,t.id=6935,e.exports=t},8565:(e,t,n)=>{"use strict";n.d(t,{Ay:()=>_});var i=n(4848),a=n(1594),o=n(8267),r=n(6883),s=n(3113),d=n(8579),l=n(4853),c=n(4651),u=n(3456),p=n(9549),m=n(9586),h=n(4680),f=n(6878),g=n(3249);const b=(0,o.Ay)(f.Ay)``,x=({children:e,lines:t})=>{const[n,o]=(0,a.useState)(!0),[r,s]=(0,a.useState)(!1),d=(0,a.useRef)(null),l=(0,m.A)(),c=(0,a.useMemo)(()=>{if(!h.A)return 1/0;const e=1.25*Number.parseInt(window.getComputedStyle(document.documentElement).getPropertyValue("font-size"),10);return t*e},[]);return(0,a.useLayoutEffect)(()=>{if(!d.current)return;const e=new ResizeObserver(e=>{const t=e.some(({target:e,contentRect:t})=>{if(e===d.current)return t.height>c});s(t)});return e.observe(d.current),()=>{e.disconnect()}},[d.current,c]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(g.A,{collapsed:n,min:r?`${c}px`:"max-content",children:(0,i.jsx)("div",{ref:d,children:e})}),r&&(0,i.jsx)(b,{variant:"link",onClick:()=>o(e=>!e),children:l(n?"show_more":"show_less")})]})};var $=n(4869),y=n(9061),A=n(8044);const w=(0,A.A)("field-value-list",[]),v=(0,A.A)("field-value-item",["name","value"]),j=o.Ay.dt`
  word-break: break-word;
`,k=o.Ay.dd`
  word-break: break-word;
`,C=o.Ay.div``,S=o.Ay.dl(({variant:e,theme:t})=>{const{components:{"field-value-list":{inline:{detached:n}}}}=t;return o.AH`
    width: 100%;

    ${"value-comparison"===e&&o.AH`
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

    ${n&&"inline"===e&&o.AH`
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
  `});S.defaultProps=p.qn;const I=(0,$.A)(({testId:e,name:t,value:n,variant:a="inline",truncate:o=!0})=>{const r=(0,d.A)(e,v),l="string"==typeof n&&o?(0,i.jsx)(x,{lines:3,children:n}):n,c=(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.G,{"data-testid":r.name,as:j,role:"none",children:t}),(0,i.jsx)(k,{"data-testid":r.value,role:"none",children:n?l:(0,i.jsx)(y.A,{})})]});return"stacked"===a?(0,i.jsx)(C,{"data-testid":r.root,children:c}):(0,i.jsx)(i.Fragment,{children:c})},v),L=(0,a.forwardRef)(function({testId:e,fields:t,variant:n="inline",...a},o){const s=(0,d.A)(e,w),p=(0,l.A)(o),m=(0,c.A)("xs",{breakpointRef:p,themeProp:"content-width"}),{components:{"field-value-list":{inline:{detached:h}}}}=(0,u.A)();return(0,i.jsx)(r.A,{"data-testid":s.root,...a,ref:p,container:{cols:["inline","value-comparison"].includes(n)&&m?"16ch minmax(0, 1fr)":"minmax(0, 1fr)",colGap:h||"value-comparison"===n?0:2,rowGap:h||"value-comparison"===n?.5:1},as:S,role:"none",variant:m?n:"stacked",children:t.map(({id:e,name:t,value:a,truncate:o=!0,variant:r})=>{const s={name:t,variant:"stacked"!==(r??n)&&m?"inline":"stacked"};return"string"==typeof a?(0,i.jsx)(I,{...s,value:a,truncate:o},e??t):(0,i.jsx)(I,{...s,value:a},e??t)})})}),_=(0,$.A)(L,w)}}]);
//# sourceMappingURL=Aja100_Any_jaygasi_TextInputEmoji.7e5c505f.js.map