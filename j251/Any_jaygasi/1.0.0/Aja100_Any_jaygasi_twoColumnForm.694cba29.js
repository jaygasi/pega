(self.webpackChunkj251=self.webpackChunkj251||[]).push([[50369017],{1210:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>S});var a=t(4848),i=t(1594),o=t(8267),r=t(7521),s=t(6878),d=t(3249),l=t(7501),c=t(6883),p=t(5679),h=t(6765),u=t(5764),m=t(9573),g=t(9549),f=t(7940),x=t(9586),b=t(3351),A=t(7321),v=t(3611);(0,h.pU)(u);const w=(0,o.Ay)(s.Ay)(({theme:{base:{animation:e}}})=>{const{rtl:n}=(0,f.A)();return o.AH`
    ${h.vE} {
      transition: transform ${e.speed} ${e.timing.ease};
    }
    &[aria-expanded='true'] ${h.vE} {
      transform: rotate(90deg);
    }
    &[aria-expanded='false'] ${h.vE} {
      transform: rotate(${n?180:0}deg);
    }
  `});w.defaultProps=g.qn;const $=o.Ay.span``,j=(0,o.Ay)(l.A)``,y=(0,o.Ay)(c.A)``,C=o.Ay.legend.withConfig((0,A.ks)("collapsed"))(({collapsed:e,theme:{base:{spacing:n,animation:t,"hit-area":{"mouse-min":a,"finger-min":i}}}})=>o.AH`
      width: 100%;
      margin-bottom: 0;
      ${!e&&o.AH`
        margin-block-end: calc(1.5 * ${n});
      `}
      transition: margin-block-end ${t.speed} ${t.timing.ease};

      > ${w} {
        min-height: ${a};

        @media (pointer: 'coarse') {
          min-height: ${i};
        }
      }
    `);C.defaultProps=g.qn;const k=o.Ay.fieldset(({theme:{base:{"font-size":e,"font-scale":n},components:{text:t}}})=>{const a=(0,A.Vr)(e,n);return o.AH`
      border: none;

      & ${$} {
        font-size: ${a[t.h3["font-size"]]};
        font-weight: ${t.h3["font-weight"]};
      }

      & & ${$} {
        font-size: ${a[t.h4["font-size"]]};
        font-weight: ${t.h4["font-weight"]};
      }

      & & & ${$} {
        font-size: ${a[t.h5["font-size"]]};
        font-weight: ${t.h5["font-weight"]};
      }

      & & & & ${$} {
        font-size: ${a[t.h6["font-size"]]};
        font-weight: ${t.h6["font-weight"]};
      }
    `});k.defaultProps=g.qn;const P=o.Ay.div(({theme:e,collapsed:n,border:t})=>{const{base:{animation:{speed:a,timing:i},palette:{"border-line":r},spacing:s,"border-radius":d},components:{"form-control":{"border-width":l}}}=e;if(!t)return null;const c=!n;return o.AH`
      padding: ${s};
      border-radius: calc(${d} / 2);
      border: ${l} solid transparent;
      transition-property: border-color;
      transition-duration: ${a};
      transition-timing-function: ${i.ease};

      ${c&&o.AH`
        border-color: ${r};
      `}
    `});P.defaultProps=g.qn;const _=({name:e,contextualLabel:n,children:t,collapsed:i,actions:o,additionalInfo:r})=>(0,a.jsx)(C,{collapsed:i,children:(0,a.jsxs)(l.A,{container:{alignItems:"center",justify:"between",gap:.5},children:[(0,a.jsxs)(l.A,{container:{alignItems:"center",gap:.5},as:j,children:[t,r&&(0,a.jsx)(v.A,{heading:r.heading,contextualLabel:n||e,children:r.content})]}),o&&(0,a.jsx)(m.A,{items:o,contextualLabel:n})]})}),L=(0,i.forwardRef)(function({children:e,description:n,name:t,contextualLabel:i,additionalInfo:o,actions:s,collapsed:c,headingTag:u,onToggleCollapsed:m,variant:g,...f},A){const v=(0,x.A)(),j=(0,b.A)(),C=(0,a.jsxs)(y,{container:{cols:"minmax(0, 1fr)",gap:2},children:[n&&(0,a.jsx)(p.Ay,{id:`${j}-description`,as:"p",content:n}),(0,a.jsx)("div",{children:e})]});return(0,a.jsx)(P,{border:"form-group"===g,collapsed:c,children:(0,a.jsxs)(k,{"aria-label":i||t,"aria-describedby":n?`${j}-description`:void 0,as:t?"fieldset":"div",...f,ref:A,children:[t&&(0,a.jsx)(_,{collapsed:c,actions:s,additionalInfo:o,name:t,contextualLabel:i,children:"boolean"==typeof c?(0,a.jsx)(w,{type:"button",variant:"text",onClick:()=>{m?.()},"aria-expanded":!c,"aria-label":v(c?"expand_noun":"collapse_noun",[i||t]),children:(0,a.jsxs)(l.A,{container:{direction:"row",alignItems:"center",gap:.5},forwardedAs:"span",children:[(0,a.jsx)(h.Ay,{name:"caret-right"}),u?(0,a.jsx)(r.A,{variant:u,children:t}):(0,a.jsx)($,{children:t})]})}):(0,a.jsx)(a.Fragment,{children:u?(0,a.jsx)(r.A,{variant:u,children:t}):(0,a.jsx)($,{children:t})})}),"boolean"==typeof c?(0,a.jsx)(d.A,{collapsed:c,children:C}):C]})})});var E=t(1093),I=(t(9042),t(8565));const F=e=>{const{child:n}=e,t=n.props.getPConnect().getChildren(),o=[];return Object.values(t).forEach(e=>{const{type:n}=e.getPConnect().getRawMetadata(),{hideLabel:t,variant:r,testId:s,label:d}=e.getPConnect().resolveConfigProps(e.getPConnect().getConfigProps());let l;const c=JSON.stringify(e.getPConnect());if("reference"===n){const n=e.getPConnect().getComponent();o.push(n)}else{const n=e.getPConnect().getComponent(),p=(0,a.jsx)(i.Fragment,{children:n},c),h={myColGap:{columnGap:"0",marginLineStart:0}};l=(0,a.jsx)(i.Fragment,{children:(0,a.jsx)(I.Ay,{style:h.myColGap,variant:t?"stacked":r,"data-testid":s,fields:[{id:"1",name:t?"":d,value:p}]})},c),o.push(l)}}),(0,a.jsx)(a.Fragment,{children:o})},O=o.Ay.div(()=>o.AH`
    margin: 0px 0;
  `),S=(0,E.A)(function(e){const{children:n=[],label:t,showLabel:i,getPConnect:o,readOnly:r,displayMode:s}=e,d={label:t,showLabel:i,...o().getInheritedProps()},p=n?.length,h="repeat(".concat(p).concat(", 1fr)"),u={colGap:6};u.cols=h,u.alignItems="start";const m={direction:"column",gap:2};return r&&!0===r||s&&"DISPLAY_ONLY"===s?(0,a.jsx)(O,{children:(0,a.jsx)(L,{name:d.showLabel?d.label:"",children:(0,a.jsx)(c.A,{container:u,"data-testid":`column-count-${p}`,children:n.map((e,n)=>(0,a.jsx)(l.A,{container:{direction:"column",alignItems:"normal",colGap:1,rowGap:1.5},children:(0,a.jsx)(F,{child:e})},`r-${n+1}`))})})}):(0,a.jsx)(O,{children:(0,a.jsx)(L,{name:d.showLabel?d.label:"",children:(0,a.jsx)(c.A,{container:u,children:n.map((e,n)=>(0,a.jsx)(l.A,{container:m,children:e},`r-${n+1}`))})})})})},2020:(e,n,t)=>{var a={};function i(e){return Promise.resolve().then(()=>{if(!t.o(a,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t(a[e])})}i.keys=()=>Object.keys(a),i.id=2020,e.exports=i},3249:(e,n,t)=>{"use strict";t.d(n,{A:()=>l});var a=t(4848),i=t(1594),o=t(4853),r=t(3700),s=t(3456);const d=e=>{const{status:n,dimension:t,transitionSpeed:a,transitionTimingFunction:i,min:o,max:r,nullWhenCollapsed:s,el:d}=e,l={};let c=r;return d&&!r&&(c=((e,n)=>e?"height"===n?`${e.scrollHeight}px`:`${e.scrollWidth}px`:"")(d,t)),"expanded"!==n&&"collapsed"!==n||((r||o)&&(l[t]="expanded"===n?c:o||0,l["overflow"+("width"===t?"X":"Y")]="hidden"),"collapsed"!==n||s||o||(l[t]=0,l.overflow="hidden",l.visibility="hidden")),"expanding"!==n&&"collapsing"!==n||(l[t]="expanding"===n?c:o||0,l.overflow="hidden",l.transitionProperty=t,l.transitionDuration=`max(${a}, 0.01ms)`,l.transitionTimingFunction=i),l},l=(0,i.forwardRef)(function(e,n){const{base:{animation:t}}=(0,s.A)(),{children:l,dimension:c="height",collapsed:p=!1,onBeforeExpand:h,onAfterExpand:u,onBeforeCollapse:m,onAfterCollapse:g,transitionSpeed:f=t.speed,min:x,max:b,nullWhenCollapsed:A=!1,as:v="div",...w}=e,[$,j]=(0,i.useState)(p?"collapsed":"expanded"),y=(0,i.useState)(),C=y[1];let k=y[0];const P=(0,r.A)($),_=(0,o.A)(n),L=(0,i.useCallback)(e=>{e.target===_.current&&e.propertyName===c&&j("expanding"===$?"expanded":"collapsed")},[_.current,$]);return(0,i.useLayoutEffect)(()=>{const e=p,n=!p,a=["expanded","expanding"].includes($),i=["collapsed","collapsing"].includes($);n&&i?(h?.(),j("expanding")):e&&a&&(m?.(),j("collapsing")),"expanded"===$&&"expanded"!==P?u?.():"collapsed"===$&&"collapsed"!==P&&g?.(),C(d({dimension:c,min:x,max:b,transitionSpeed:f,nullWhenCollapsed:A,status:$,el:_.current,transitionTimingFunction:t.timing.ease}))},[p,$,x,b]),$!==P&&["expanded","collapsed"].includes(P)&&(k=d({dimension:c,min:x,max:b,transitionSpeed:f,nullWhenCollapsed:A,status:"expanding"===$?"collapsing":"expanding",el:_.current,transitionTimingFunction:t.timing.ease})),"collapsed"===$&&A&&!x?null:(0,a.jsx)(v,{ref:_,onTransitionEnd:L,...w,inert:"collapsed"!==$||A||x?void 0:"",style:k,children:l})})},6935:e=>{function n(e){return Promise.resolve().then(()=>{var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n})}n.keys=()=>[],n.resolve=n,n.id=6935,e.exports=n},8565:(e,n,t)=>{"use strict";t.d(n,{Ay:()=>E});var a=t(4848),i=t(1594),o=t(8267),r=t(6883),s=t(3113),d=t(8579),l=t(4853),c=t(4651),p=t(3456),h=t(9549),u=t(9586),m=t(4680),g=t(6878),f=t(3249);const x=(0,o.Ay)(g.Ay)``,b=({children:e,lines:n})=>{const[t,o]=(0,i.useState)(!0),[r,s]=(0,i.useState)(!1),d=(0,i.useRef)(null),l=(0,u.A)(),c=(0,i.useMemo)(()=>{if(!m.A)return 1/0;const e=1.25*Number.parseInt(window.getComputedStyle(document.documentElement).getPropertyValue("font-size"),10);return n*e},[]);return(0,i.useLayoutEffect)(()=>{if(!d.current)return;const e=new ResizeObserver(e=>{const n=e.some(({target:e,contentRect:n})=>{if(e===d.current)return n.height>c});s(n)});return e.observe(d.current),()=>{e.disconnect()}},[d.current,c]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(f.A,{collapsed:t,min:r?`${c}px`:"max-content",children:(0,a.jsx)("div",{ref:d,children:e})}),r&&(0,a.jsx)(x,{variant:"link",onClick:()=>o(e=>!e),children:l(t?"show_more":"show_less")})]})};var A=t(4869),v=t(9061),w=t(8044);const $=(0,w.A)("field-value-list",[]),j=(0,w.A)("field-value-item",["name","value"]),y=o.Ay.dt`
  word-break: break-word;
`,C=o.Ay.dd`
  word-break: break-word;
`,k=o.Ay.div``,P=o.Ay.dl(({variant:e,theme:n})=>{const{components:{"field-value-list":{inline:{detached:t}}}}=n;return o.AH`
    width: 100%;

    ${"value-comparison"===e&&o.AH`
      dt {
        width: 100%;
      }
      dd {
        text-align: end;
        padding-inline-start: calc(2 * ${n.base.spacing});
      }
      ${s.G} {
        max-width: unset;
      }
      dd:not(:last-of-type),
      dt:not(:last-of-type) {
        border-bottom: 0.0625rem solid ${n.base.palette["border-line"]};
        padding-bottom: calc(0.5 * ${n.base.spacing});
      }
    `}

    ${t&&"inline"===e&&o.AH`
      dt {
        width: 100%;
        padding-inline-end: calc(${n.base.spacing});
      }
      ${s.G} {
        max-width: unset;
      }
      dd:not(:last-of-type),
      dt:not(:last-of-type),
      dd:has(+ ${k}),
      dt:has(+ dd + ${k}),
      ${k}:has(+ dt + dd),
      ${k}:not(:last-of-type) {
        border-bottom: 0.0625rem dashed ${n.base.palette["border-line"]};
        padding-bottom: calc(0.5 * ${n.base.spacing});
      }
    `}
  `});P.defaultProps=h.qn;const _=(0,A.A)(({testId:e,name:n,value:t,variant:i="inline",truncate:o=!0})=>{const r=(0,d.A)(e,j),l="string"==typeof t&&o?(0,a.jsx)(b,{lines:3,children:t}):t,c=(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s.G,{"data-testid":r.name,as:y,role:"none",children:n}),(0,a.jsx)(C,{"data-testid":r.value,role:"none",children:t?l:(0,a.jsx)(v.A,{})})]});return"stacked"===i?(0,a.jsx)(k,{"data-testid":r.root,children:c}):(0,a.jsx)(a.Fragment,{children:c})},j),L=(0,i.forwardRef)(function({testId:e,fields:n,variant:t="inline",...i},o){const s=(0,d.A)(e,$),h=(0,l.A)(o),u=(0,c.A)("xs",{breakpointRef:h,themeProp:"content-width"}),{components:{"field-value-list":{inline:{detached:m}}}}=(0,p.A)();return(0,a.jsx)(r.A,{"data-testid":s.root,...i,ref:h,container:{cols:["inline","value-comparison"].includes(t)&&u?"16ch minmax(0, 1fr)":"minmax(0, 1fr)",colGap:m||"value-comparison"===t?0:2,rowGap:m||"value-comparison"===t?.5:1},as:P,role:"none",variant:u?t:"stacked",children:n.map(({id:e,name:n,value:i,truncate:o=!0,variant:r})=>{const s={name:n,variant:"stacked"!==(r??t)&&u?"inline":"stacked"};return"string"==typeof i?(0,a.jsx)(_,{...s,value:i,truncate:o},e??n):(0,a.jsx)(_,{...s,value:i},e??n)})})}),E=(0,A.A)(L,$)},9042:(e,n,t)=>{window?.__webpack_nonce__&&(t.nc=window.__webpack_nonce__)}}]);
//# sourceMappingURL=Aja100_Any_jaygasi_twoColumnForm.694cba29.js.map