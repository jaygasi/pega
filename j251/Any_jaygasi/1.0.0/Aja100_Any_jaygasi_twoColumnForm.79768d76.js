(self.webpackChunkj251=self.webpackChunkj251||[]).push([[50369017],{1210:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>H});var o=t(4848),a=t(1594),r=t(8267),i=t(7521),s=t(6878),l=t(3249),c=t(7501),d=t(6883),h=t(5679),p=t(6765),g=t(5764),m=t(9300),f=t(9549),u=t(7940),x=t(9586),b=t(3351),A=t(7321),j=t(4527);(0,p.pU)(g);const $=(0,r.Ay)(s.Ay)(({theme:{base:{animation:e}}})=>{const{rtl:n}=(0,u.A)();return r.AH`
    ${p.vE} {
      transition: transform ${e.speed} ${e.timing.ease};
    }
    &[aria-expanded='true'] ${p.vE} {
      transform: rotate(90deg);
    }
    &[aria-expanded='false'] ${p.vE} {
      transform: rotate(${n?180:0}deg);
    }
  `});$.defaultProps=f.qn;const w=r.Ay.span``,y=(0,r.Ay)(c.A)``,v=(0,r.Ay)(d.A)``,C=r.Ay.legend.withConfig((0,A.ks)("collapsed"))(({collapsed:e,theme:{base:{spacing:n,animation:t,"hit-area":{"mouse-min":o,"finger-min":a}}}})=>r.AH`
      width: 100%;
      margin-bottom: 0;
      ${!e&&r.AH`
        margin-block-end: calc(1.5 * ${n});
      `}
      transition: margin-block-end ${t.speed} ${t.timing.ease};

      > ${$} {
        min-height: ${o};

        @media (pointer: 'coarse') {
          min-height: ${a};
        }
      }
    `);C.defaultProps=f.qn;const P=r.Ay.fieldset(({theme:{base:{"font-size":e,"font-scale":n},components:{text:t}}})=>{const o=(0,A.Vr)(e,n);return r.AH`
      border: none;

      & ${w} {
        font-size: ${o[t.h3["font-size"]]};
        font-weight: ${t.h3["font-weight"]};
      }

      & & ${w} {
        font-size: ${o[t.h4["font-size"]]};
        font-weight: ${t.h4["font-weight"]};
      }

      & & & ${w} {
        font-size: ${o[t.h5["font-size"]]};
        font-weight: ${t.h5["font-weight"]};
      }

      & & & & ${w} {
        font-size: ${o[t.h6["font-size"]]};
        font-weight: ${t.h6["font-weight"]};
      }
    `});P.defaultProps=f.qn;const _=r.Ay.div(({theme:e,collapsed:n,border:t})=>{const{base:{animation:{speed:o,timing:a},palette:{"border-line":i},spacing:s,"border-radius":l},components:{"form-control":{"border-width":c}}}=e;if(!t)return null;const d=!n;return r.AH`
      padding: ${s};
      border-radius: calc(${l} / 2);
      border: ${c} solid transparent;
      transition-property: border-color;
      transition-duration: ${o};
      transition-timing-function: ${a.ease};

      ${d&&r.AH`
        border-color: ${i};
      `}
    `});_.defaultProps=f.qn;const L=({name:e,contextualLabel:n,children:t,collapsed:a,actions:r,additionalInfo:i})=>(0,o.jsx)(C,{collapsed:a,children:(0,o.jsxs)(c.A,{container:{alignItems:"center",justify:"between",gap:.5},children:[(0,o.jsxs)(c.A,{container:{alignItems:"center",gap:.5},as:y,children:[t,i&&(0,o.jsx)(j.A,{heading:i.heading,contextualLabel:n||e,children:i.content})]}),r&&(0,o.jsx)(m.A,{items:r,contextualLabel:n})]})}),k=(0,a.forwardRef)(function({children:e,description:n,name:t,contextualLabel:a,additionalInfo:r,actions:s,collapsed:d,headingTag:g,onToggleCollapsed:m,variant:f,...u},A){const j=(0,x.A)(),y=(0,b.A)(),C=(0,o.jsxs)(v,{container:{cols:"minmax(0, 1fr)",gap:2},children:[n&&(0,o.jsx)(h.Ay,{id:`${y}-description`,as:"p",content:n}),(0,o.jsx)("div",{children:e})]});return(0,o.jsx)(_,{border:"form-group"===f,collapsed:d,children:(0,o.jsxs)(P,{"aria-label":a||t,"aria-describedby":n?`${y}-description`:void 0,as:t?"fieldset":"div",...u,ref:A,children:[t&&(0,o.jsx)(L,{collapsed:d,actions:s,additionalInfo:r,name:t,contextualLabel:a,children:"boolean"==typeof d?(0,o.jsx)($,{type:"button",variant:"text",onClick:()=>{m?.()},"aria-expanded":!d,"aria-label":j(d?"expand_noun":"collapse_noun",[a||t]),children:(0,o.jsxs)(c.A,{container:{direction:"row",alignItems:"center",gap:.5},forwardedAs:"span",children:[(0,o.jsx)(p.Ay,{name:"caret-right"}),g?(0,o.jsx)(i.A,{variant:g,children:t}):(0,o.jsx)(w,{children:t})]})}):(0,o.jsx)(o.Fragment,{children:g?(0,o.jsx)(i.A,{variant:g,children:t}):(0,o.jsx)(w,{children:t})})}),"boolean"==typeof d?(0,o.jsx)(l.A,{collapsed:d,children:C}):C]})})});var I=t(1093),O=(t(9042),t(5882));const z=e=>{const{child:n}=e,t=n.props.getPConnect().getChildren(),r=[];return Object.values(t).forEach(e=>{const{type:n}=e.getPConnect().getRawMetadata(),{hideLabel:t,variant:i,testId:s,label:l}=e.getPConnect().resolveConfigProps(e.getPConnect().getConfigProps());let c;const d=JSON.stringify(e.getPConnect());if("reference"===n){const n=e.getPConnect().getComponent();r.push(n)}else{const n=e.getPConnect().getComponent(),h=(0,o.jsx)(a.Fragment,{children:n},d),p={myColGap:{columnGap:"0",marginLineStart:0}};c=(0,o.jsx)(a.Fragment,{children:(0,o.jsx)(O.Ay,{style:p.myColGap,variant:t?"stacked":i,"data-testid":s,fields:[{id:"1",name:t?"":l,value:h}]})},d),r.push(c)}}),(0,o.jsx)(o.Fragment,{children:r})},E=r.Ay.div(()=>r.AH`
    margin: 0px 0;
  `),H=(0,I.A)(function(e){const{children:n=[],label:t,showLabel:a,getPConnect:r,readOnly:i,displayMode:s}=e,l={label:t,showLabel:a,...r().getInheritedProps()},h=n?.length,p="repeat(".concat(h).concat(", 1fr)"),g={colGap:6};g.cols=p,g.alignItems="start";const m={direction:"column",gap:2};return i&&!0===i||s&&"DISPLAY_ONLY"===s?(0,o.jsx)(E,{children:(0,o.jsx)(k,{name:l.showLabel?l.label:"",children:(0,o.jsx)(d.A,{container:g,"data-testid":`column-count-${h}`,children:n.map((e,n)=>(0,o.jsx)(c.A,{container:{direction:"column",alignItems:"normal",colGap:1,rowGap:1.5},children:(0,o.jsx)(z,{child:e})},`r-${n+1}`))})})}):(0,o.jsx)(E,{children:(0,o.jsx)(k,{name:l.showLabel?l.label:"",children:(0,o.jsx)(d.A,{container:g,children:n.map((e,n)=>(0,o.jsx)(c.A,{container:m,children:e},`r-${n+1}`))})})})})},2020:(e,n,t)=>{var o={};function a(e){return Promise.resolve().then(()=>{if(!t.o(o,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t(o[e])})}a.keys=()=>Object.keys(o),a.id=2020,e.exports=a},6935:e=>{function n(e){return Promise.resolve().then(()=>{var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n})}n.keys=()=>[],n.resolve=n,n.id=6935,e.exports=n},9042:(e,n,t)=>{window?.__webpack_nonce__&&(t.nc=window.__webpack_nonce__)}}]);
//# sourceMappingURL=Aja100_Any_jaygasi_twoColumnForm.79768d76.js.map