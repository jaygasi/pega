"use strict";(self.webpackChunkj251=self.webpackChunkj251||[]).push([[22553069],{285:(e,t,n)=>{n.d(t,{e:()=>g,A:()=>b});var r=n(4848),o=n(1594),a=n(8267),i=n(9549),s=n(4869),l=n(1862),c=n(7497),d=n(7501),u=n(8579),p=n(2477),m=n(4853);const f=(0,n(8044).A)("backdrop",[]),h={slow:2,medium:1,fast:.5,none:0},g=(0,a.Ay)(d.A)(e=>{const{theme:{base:t}}=e,{opacity:n,alpha:r,variant:o,position:i}=e,s=`max(calc(${h[e.transitionSpeed]} * ${t.animation.speed}), 1ms)`;return a.AH`
      position: ${i};
      z-index: ${"fixed"===i?t["z-index"].backdrop:t["z-index"].popover+1};
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      border-radius: inherit;
      opacity: ${n};
      transition-property: opacity;
      transition-timing-function: ${e.theme.base.animation.timing.ease};
      /* stylelint-disable declaration-block-no-duplicate-properties */
      transition-duration: 1ms;
      transition-duration: ${s};
      /* stylelint-enable declaration-block-no-duplicate-properties */

      ${"dark"===o&&a.AH`
        background: rgba(0, 0, 0, ${r});
      `}

      ${"light"===o&&a.AH`
        background: rgba(255, 255, 255, ${r});
      `}
    `});g.defaultProps=i.qn;const b=(0,s.A)((0,o.forwardRef)(function({testId:e,children:t,container:n,open:a=!1,variant:i="dark",transitionSpeed:s="medium",alpha:d=.6,position:h="fixed",onBeforeTransitionIn:b,onAfterTransitionIn:A,onBeforeTransitionOut:v,onAfterTransitionOut:$,...y},w){const x=(0,u.A)(e,f),[k,E]=(0,o.useState)("closed"),[j,H]=(0,p.A)(),I=(0,m.A)(w,H),C=(0,o.useCallback)(e=>{if("opacity"!==e.propertyName||e.target!==e.currentTarget)return;let t;"closing"===k?(t="closed",$?.()):(t="open",A?.()),E(t)},[k,$,A]);return(0,o.useEffect)(()=>{a?"closed"!==k&&"closing"!==k||(b?.(),(0,l.A)(),E("opening")):"open"!==k&&"opening"!==k||(v?.(),E("closing"))},[a]),(0,o.useEffect)(()=>{if(!I.current)return;const e=window.getComputedStyle(I.current).opacity;"closing"===k&&"0"===e&&($?.(),E("closed")),"opening"===k&&"1"===e&&(A?.(),E("open"))},[k]),a||"closed"!==k?(0,r.jsx)(c.A,{portalTarget:j??void 0,children:(0,r.jsx)(g,{"data-testid":x.root,container:{justify:"center",alignItems:"center",...n},transitionSpeed:s,opacity:"opening"===k||"open"===k?1:0,alpha:d,variant:i,position:h,onTransitionEnd:C,ref:I,...y,children:t})}):null}),f)},393:(e,t,n)=>{n.d(t,{A:()=>a});var r=n(1594),o=n(712);const a=function(e,t,{target:n=document,eventOptions:a,dependencies:i=[]}={}){(0,r.useEffect)(()=>{const[r]=(0,o.A)([n]);if(r)return r.addEventListener(e,t,a),()=>{r.removeEventListener(e,t,a)}},[e,n,t,a,...i])}},405:(e,t,n)=>{n.d(t,{D2:()=>d,QS:()=>m,pT:()=>p,r3:()=>g,wE:()=>f,z5:()=>h});var r=n(1357),o=n(8267),a=n(7321),i=n(9549),s=n(9187),l=n(285),c=n(7501);const d=(0,o.Ay)(l.A)(()=>o.AH`
    border-radius: inherit;
  `);d.defaultProps=i.qn;const u=o.Ay.div(({theme:e})=>o.AH`
    &:focus-visible {
      box-shadow: ${e.components.button["focus-shadow"]};
      outline: none;
      border-radius: calc(9999 * ${e.base["border-radius"]});
    }
  `);u.defaultProps=i.qn;const p=(0,o.Ay)(u)(({theme:e,placement:t,determinate:n})=>{const a="inline"===t?"1em":"2rem",i=(0,r.J1)(e.base.palette["foreground-color"])>.5?e.base.colors.gray["extra-dark"]:e.base.colors.gray.light;return o.AH`
    position: relative;

    svg {
      display: block;
      width: ${a};
      height: ${a};

      circle {
        fill: transparent;
        stroke: ${i};
        stroke-width: 2;
        r: 45%;
        cx: 50%;
        cy: 50%;
        transform: rotate(-90deg);
        transform-origin: 50% 50%;

        &:nth-child(2) {
          stroke: ${e.components.progress["progress-color"]};
          transition: stroke-dashoffset calc(0.5 * ${e.base.animation.speed})
            ${e.base.animation.timing.ease};

          ${!n&&o.AH`
            @keyframes LoadingRing {
              0% {
                transform: rotate(0deg);
              }

              100% {
                transform: rotate(360deg);
              }
            }
            animation: LoadingRing calc(4 * ${e.base.animation.speed}) linear infinite;
          `}
        }
      }
    }

    ${"inline"===t&&o.AH`
      display: inline-flex;
      vertical-align: top;
    `}
  `});p.defaultProps=i.qn;const m=(0,o.Ay)(u)(({theme:e,placement:t,determinate:n})=>{const a=(0,r.J1)(e.base.palette["foreground-color"])>.5?e.base.colors.gray["extra-dark"]:e.base.colors.gray.light;return o.AH`
    background-color: ${a};
    border-radius: ${e.base["border-radius"]};
    ${"local"===t?o.AH`
          width: calc(100% - 4 * ${e.base.spacing});
        `:o.AH`
          width: 100%;
        `}
    height: 0.375rem;
    min-width: 2rem;
    max-width: min(calc(100vw - 4 * ${e.base.spacing}), ${e.base["content-width"].lg});
    overflow: hidden;

    ::before {
      content: '';
      display: block;
      height: 100%;
      width: 100%;
      left: 0;
      border-radius: ${e.base["border-radius"]};
      background-color: ${e.components.progress["progress-color"]};
      ${n&&o.AH`
        transform: translateX(var(--progress, 0));
        transform-origin: 0 50%;
        transition: transform calc(0.5 * ${e.base.animation.speed})
          ${e.base.animation.timing.ease};
      `}

      ${!n&&o.AH`
        @keyframes LoadingBar {
          0% {
            transform: translateX(-100%);
          }

          100% {
            transform: translateX(200%);
          }
        }
        animation: LoadingBar calc(8 * ${e.base.animation.speed}) linear infinite;
        width: 50%;
      `}
    }

    ${"inline"===t&&o.AH`
      width: 3rem;
      display: inline-block;
      position: relative;
    `}
  `});m.defaultProps=i.qn;const f=(0,o.Ay)(u)(({theme:e,placement:t})=>o.AH`
    line-height: 1;
    display: ${"inline"===t?"inline-flex":"block"};

    @keyframes LoadingEllipsis {
      0% {
        transform: scale(0);
        opacity: 0;
      }

      50% {
        transform: scale(1);
        opacity: 1;
      }

      100% {
        transform: scale(0);
        opacity: 0;
      }
    }

    > span {
      display: flex;
      justify-content: center;

      ${"inline"===t&&o.AH`
        display: inline-flex;
      `}
    }

    > span span {
      margin: 0 0.3125rem;
      background: ${e.components.progress["progress-color"]};
      border-radius: 50%;
      animation: LoadingEllipsis calc(4 * ${e.base.animation.speed}) infinite;

      ${"global"===t&&o.AH`
        width: 1.25rem;
        height: 1.25rem;
      `}

      ${("local"===t||"block"===t)&&o.AH`
        width: 0.625rem;
        height: 0.625rem;
      `}

      ${"inline"===t&&o.AH`
        width: 0.1875rem;
        height: 0.1875rem;
        margin: 0 0.1875rem;
        animation-duration: calc(4 * ${e.base.animation.speed});
      `}

      &:nth-child(2) {
        animation-delay: 0.1667s;
      }

      &:nth-child(3) {
        animation-delay: ${.3334}s;
      }
    }
  `);f.defaultProps=i.qn;const h=o.Ay.span(({theme:e})=>{const t=(0,s.A)(()=>(0,r.B3)((0,a.W0)(e.base.palette["primary-background"]),e.base.transparency["transparent-3"])),n=(0,a.Vr)(e.base["font-size"],e.base["font-scale"]);return o.AH`
    font-size: ${n[e.components.label["font-size"]]};
    font-weight: ${e.base["font-weight"]["semi-bold"]};
    color: ${t};
  `});h.defaultProps=i.qn;const g=(0,o.Ay)(c.A)(({theme:e,placement:t})=>o.AH`
    ${"inline"!==t&&o.AH`
      width: 100%;
    `}

    ${"block"===t&&o.AH`
      margin-block: calc(2 * ${e.base.spacing});
    `}
  `);g.defaultProps=i.qn},712:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(8268);const o=e=>e.flatMap(e=>{if(!e)return[];const t=(0,r.A)(e,EventTarget)?e:e.current;return t?[t]:[]})},1166:(e,t,n)=>{n.d(t,{A:()=>x});var r=n(4848),o=n(1594),a=n(5206),i=n(832),s=n(9463),l=n(2477),c=n(4853),d=n(3351),u=n(2558),p=n(5582);var m=n(393);const f=(e,t)=>{const n=e.getBoundingClientRect(),r=t.getBoundingClientRect();return{x:n.x-r.x,y:n.y-r.y}};var h=n(4680);const g=(0,o.createContext)({checkActive:()=>!0,setActive:()=>{},popovers:{}});var b=n(8889),A=n(127);var v=n(2365);Object.freeze({name:"sameWidth",enabled:!0,phase:"beforeWrite",fn({state:e}){e.styles.popper.width=`${e.rects.reference.width}px`},requires:["computeStyles"]});const $=A.A?(()=>{const e=document.createElement("div"),t="50px";let n=0;return e.style.position="absolute",e.style.top=`-${t}`,e.style.width=t,e.style.height=t,e.style.overflow="scroll",document.body.appendChild(e),n=e.offsetWidth-e.clientWidth,document.body.removeChild(e),n})():0,y=(Object.freeze({name:"fitToContent",enabled:!0,phase:"beforeWrite",requires:["computeStyles","offset"],fn({state:e}){e.styles.popper.width="fit-content",e.elements.popper.style.maxWidth="60ch",e.elements.popper.style.minWidth=`${e.rects.reference.width}px`}}),Object.freeze({name:"placeAndContain",enabled:!0,phase:"beforeWrite",requires:["computeStyles","offset"],fn:({state:e})=>{const[t,n]=e.placement.split("-"),r={top:0,bottom:0,right:0,left:0},o=e.orderedModifiers.find(({name:e})=>"preventOverflow"===e)?.options?.padding;"number"==typeof o?(r.top=o,r.bottom=o,r.right=o,r.left=o):o&&(r.top=o.top??r.top,r.bottom=o.bottom??r.bottom,r.right=o.right??r.right,r.left=o.left??r.left);const a=document.documentElement.clientWidth,i=document.documentElement.clientHeight,s=e.rects.reference,l=s.x,c=l+s.width,d=s.y,u=d+s.height,p=(l+c)/2<a/2,m=(d+u)/2<i/2,f=e.modifiersData.offset?.[e.placement]?.x??0,h=e.modifiersData.offset?.[e.placement]?.y??0;let g=null,b=null;const A=[...e.elements.popper.children].flatMap(e=>{const t=e.querySelectorAll("[data-popover-scroll-el]");return t.length>0?[...t]:e}).reduce((t,n)=>n===e.elements.arrow?t:(0,v.A)(n)[0]?t+n.scrollHeight+$:t+n.scrollHeight,0),y=Math.max(e.elements.popper.scrollHeight,A),w=Math.max(e.elements.popper.scrollWidth,...Array.from(e.elements.popper.children).map(t=>t===e.elements.arrow?-1/0:(0,v.A)(t)[1]?t.scrollWidth+$:t.scrollWidth));let x=t;"bottom"===t?(b=i-u-h-r.bottom,u+h+y+r.bottom>i&&(x=m?"bottom":"top")):"top"===t?(b=d+h-r.top,d+h-y+r.top<0&&(x=m?"bottom":"top")):"left"===t?(g=l+f-r.left,l+f-w+r.left<0&&(x=p?"right":"left")):"right"===t&&(g=a-c-f-r.right,c+f+w+r.right>a&&(x=p?"right":"left")),"left"!==x&&"right"!==x||(b=i-r.top-r.bottom),e.elements.popper.style.maxHeight=`${b}px`,e.elements.popper.style.maxWidth=null!==g?`${g}px`:"",x=`${x}${n?`-${n}`:""}`,e.placement!==x&&(e.placement=x,e.reset=!0)}})),w={none:0,short:500,long:1e3},x=(0,o.forwardRef)(function({show:e=!0,portal:t=!0,target:n,placement:A="bottom",strategy:v="fixed",style:$,modifiers:x=[],arrow:k=!1,groupId:E,showDelay:j="none",hideDelay:H="none",hideOnTargetHidden:I=!1,children:C,onHide:S,onShow:R,...L},D){const{portalTarget:z}=(0,s.A)(),{checkActive:M,setActive:T,popovers:P}=(0,o.useContext)(g),[F,q]=(0,l.A)(),B=(0,c.A)(D,q),O=(0,o.useRef)(null),_=(0,o.useRef)(),W=(0,o.useRef)(null),[N,U]=(0,o.useState)(e),V=(0,o.useRef)(),Z=(0,d.A)(),G=n instanceof Element?n:n?.contextElement,K="boolean"==typeof t?z:t,X=(0,o.useMemo)(()=>{const e=!!x.slice().reverse().find(e=>"flip"===e.name&&void 0!==e.enabled)?.enabled;return[{name:"computeStyles",options:{gpuAcceleration:!1}},{name:"offset",options:{offset:[0,k?5.5:2]}},{name:"hide",enabled:I},{name:"arrow",enabled:k,options:{element:O.current,padding:7}},{name:"preventOverflow",options:{tether:!x.find(e=>"sameWidth"===e.name||"fitToContent"),padding:16}},{...y,enabled:!e},...x]},[k,I,x]),Q=(0,o.useMemo)(()=>{const e=[...X].reverse().find(e=>"offset"===e.name&&!1!==e.enabled);return Array.isArray(e?.options?.offset)?e?.options?.offset[1]??0:0},[X]),{styles:J,attributes:Y,forceUpdate:ee}=(0,i.E)(n,F,{placement:A,strategy:v,modifiers:X});ee&&(_.current=ee);const[te]=(0,o.useState)(()=>new AbortController),[ne]=(0,o.useState)(()=>new WeakSet),[re]=(0,o.useState)(()=>new ResizeObserver(e=>{let t=!1;for(const{target:n}of e)ne.has(n)?t||(t=!0,te.signal.aborted||_.current?.()):ne.add(n)}));(0,o.useEffect)(()=>()=>{te.abort(),re.disconnect()},[]),(0,o.useEffect)(()=>{if(F)return re.observe(F),()=>{re.unobserve(F)}},[F]),(0,o.useEffect)(()=>{if(G)return re.observe(G),()=>{re.unobserve(G)}},[G]),(0,o.useLayoutEffect)(()=>{W.current=G?f(G,document.documentElement):null},[G]),(0,o.useEffect)(()=>{if(!N||!G)return;let e;const t=()=>{if(G&&W.current){const n=f(G,document.documentElement);W.current.x!==n.x||W.current.y!==n.y?(W.current=n,_.current?.()):e=requestAnimationFrame(t)}};return e=requestAnimationFrame(t),()=>{cancelAnimationFrame(e)}},[N,G]),(0,o.useEffect)(()=>{E&&e&&T(Z,E),h.A?(V.current&&clearTimeout(V.current),V.current=window.setTimeout(()=>{U(e),e&&_.current?.()},w[e?j:H])):(U(e),e&&_.current?.())},[e]),(0,o.useEffect)(()=>()=>clearTimeout(V.current),[]),(0,u.A)(()=>{N?R?.():S?.()},[N]),(0,o.useEffect)(()=>{E&&P[E]&&P[E]!==Z&&U(!1)},[E?P[E]:void 0]);const oe=((e,t=!0)=>{const n=(0,d.A)();return(0,o.useEffect)(()=>{if(e&&t)return p.y.has(e)||p.y.set(e,new Set),e.toggleAttribute("data-popover-target",!0),p.y.get(e).add(n),()=>{p.y.has(e)&&(p.y.get(e).delete(n),0===p.y.get(e).size&&(p.y.delete(e),e.removeAttribute("data-popover-target")))}},[t,e,n]),n})(G,!!t),ae=(0,o.useCallback)(e=>{if(G&&t){const t=new Event(e.type.startsWith("popover:")?e.type:`popover:${e.type}`,{bubbles:!0,cancelable:!0});G.dispatchEvent(t)}},[G,t]);(0,m.A)("focusout",ae,{target:B}),(0,m.A)("popover:focusout",ae,{target:B}),(0,m.A)("focusin",ae,{target:B}),(0,m.A)("popover:focusin",ae,{target:B});const ie=(0,r.jsxs)(b.l,{...L,"data-popover-id":oe,portal:!(!t||!K),offset:Q,ref:B,style:{...$,...J.popper},...Y.popper,children:[k&&(0,r.jsx)(b.s,{ref:O,style:{...J.arrow}}),C]});return!n||!N||E&&!M(Z,E)?null:t&&K?(0,a.createPortal)(ie,K):ie})},1862:(e,t,n)=>{n.d(t,{A:()=>r});const r=e=>(e=e??document.body).offsetWidth},2365:(e,t,n)=>{n.d(t,{A:()=>r});const r=e=>[e.scrollWidth>e.clientWidth,e.scrollHeight>e.clientHeight]},2558:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(1594);const o=(e,t)=>{const n=(0,r.useRef)(!1);(0,r.useEffect)(()=>{if(n.current)return e();n.current=!0},t)}},2884:(e,t,n)=>{n.d(t,{A:()=>i});var r=n(1594),o=(n(8347),n(4680));const a=(0,r.createContext)({announce:()=>{},announcePolite:()=>{},announceAssertive:()=>{},initialized:!1}),i=()=>{const e=o.A?window.cosmos.liveLogContext??a:a;return(0,r.useContext)(e)}},3113:(e,t,n)=>{n.d(t,{A:()=>u,G:()=>d});var r=n(4848),o=n(1594),a=n(8267),i=n(1357),s=n(9549),l=n(9187),c=n(7321);const d=a.Ay.label(({theme:e,labelHidden:t})=>{const{"foreground-color":n}=e.components.label,r=(0,l.A)(()=>t?i.Ic:(0,i.B3)((0,c.W0)(e.base.palette["primary-background"]),e.base.transparency["transparent-3"])),o=(0,c.Vr)(e.base["font-size"],e.base["font-scale"]);return t?i.Ic:a.AH`
          max-width: max-content;
          font-size: ${o[e.components.label["font-size"]]};
          font-weight: ${e.components.label["font-weight"]};
          color: ${"auto"===n?r:n};
        `});d.defaultProps=s.qn;const u=(0,o.forwardRef)(function({children:e,labelHidden:t=!1,htmlFor:n,...o},a){return(0,r.jsx)(d,{ref:a,labelHidden:t,htmlFor:""===n?void 0:n,...o,children:e})})},3249:(e,t,n)=>{n.d(t,{A:()=>c});var r=n(4848),o=n(1594),a=n(4853),i=n(3700),s=n(3456);const l=e=>{const{status:t,dimension:n,transitionSpeed:r,transitionTimingFunction:o,min:a,max:i,nullWhenCollapsed:s,el:l}=e,c={};let d=i;return l&&!i&&(d=((e,t)=>e?"height"===t?`${e.scrollHeight}px`:`${e.scrollWidth}px`:"")(l,n)),"expanded"!==t&&"collapsed"!==t||((i||a)&&(c[n]="expanded"===t?d:a||0,c["overflow"+("width"===n?"X":"Y")]="hidden"),"collapsed"!==t||s||a||(c[n]=0,c.overflow="hidden",c.visibility="hidden")),"expanding"!==t&&"collapsing"!==t||(c[n]="expanding"===t?d:a||0,c.overflow="hidden",c.transitionProperty=n,c.transitionDuration=`max(${r}, 0.01ms)`,c.transitionTimingFunction=o),c},c=(0,o.forwardRef)(function(e,t){const{base:{animation:n}}=(0,s.A)(),{children:c,dimension:d="height",collapsed:u=!1,onBeforeExpand:p,onAfterExpand:m,onBeforeCollapse:f,onAfterCollapse:h,transitionSpeed:g=n.speed,min:b,max:A,nullWhenCollapsed:v=!1,as:$="div",...y}=e,[w,x]=(0,o.useState)(u?"collapsed":"expanded"),k=(0,o.useState)(),E=k[1];let j=k[0];const H=(0,i.A)(w),I=(0,a.A)(t),C=(0,o.useCallback)(e=>{e.target===I.current&&e.propertyName===d&&x("expanding"===w?"expanded":"collapsed")},[I.current,w]);return(0,o.useLayoutEffect)(()=>{const e=u,t=!u,r=["expanded","expanding"].includes(w),o=["collapsed","collapsing"].includes(w);t&&o?(p?.(),x("expanding")):e&&r&&(f?.(),x("collapsing")),"expanded"===w&&"expanded"!==H?m?.():"collapsed"===w&&"collapsed"!==H&&h?.(),E(l({dimension:d,min:b,max:A,transitionSpeed:g,nullWhenCollapsed:v,status:w,el:I.current,transitionTimingFunction:n.timing.ease}))},[u,w,b,A]),w!==H&&["expanded","collapsed"].includes(H)&&(j=l({dimension:d,min:b,max:A,transitionSpeed:g,nullWhenCollapsed:v,status:"expanding"===w?"collapsing":"expanding",el:I.current,transitionTimingFunction:n.timing.ease})),"collapsed"===w&&v&&!b?null:(0,r.jsx)($,{ref:I,onTransitionEnd:C,...y,inert:"collapsed"!==w||v||b?void 0:"",style:j,children:c})})},3351:(e,t,n)=>{n.d(t,{A:()=>a});var r=n(1594),o=n(4685);const a=()=>(0,r.useRef)((0,o.A)()).current},3456:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(9463);const o=()=>(0,r.A)().themeMachine.theme},3700:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(1594);const o=e=>{const t=(0,r.useRef)();return(0,r.useLayoutEffect)(()=>{t.current=e},[e]),t.current}},3974:(e,t,n)=>{n.d(t,{A:()=>r});const r=(e,t)=>Object.hasOwn(e,t)},4527:(e,t,n)=>{n.d(t,{f:()=>T,A:()=>P});var r={};n.r(r),n.d(r,{Component:()=>z,name:()=>D,set:()=>L,viewBox:()=>M});var o=n(4848),a=n(1594),i=n(8267),s=n(6765),l=n(5679),c=n(6878),d=n(9586),u=n(3351),p=n(4853),m=n(5190),f=n(7784),h=n(7521),g=n(9466),b=n(7501),A=n(9721),v=n(7666),$=n(9749),y=n(9549),w=n(1166);const x=i.Ay.div``,k=i.Ay.div``,E=i.Ay.div(({theme:e})=>i.AH`
    position: relative;
    @media (height >= 31.25rem) {
      overflow-y: auto;
      min-height: 4rem;
    }
    padding: calc(2 * ${e.base.spacing});

    /* Small amount of block padding accounts for focus ring clipping within overflow auto. */
    ${k} + & {
      padding-block-start: calc(0.5 * ${e.base.spacing});
    }

    &:not(:last-child) {
      padding-block-end: calc(0.5 * ${e.base.spacing});
    }
  `);E.defaultProps=y.qn,i.Ay.div``;const j=(0,i.Ay)(w.A)(({theme:e})=>i.AH`
    display: flex;
    flex-direction: column;
    min-width: min(${e.base["content-width"].sm}, calc(100vw - 2rem));
    max-width: min(${e.base["content-width"].lg}, calc(100vw - 2rem));
    max-height: calc(100vh - 2rem);

    @media (height < 31.25rem) {
      overflow-y: auto;
    }

    &[aria-busy='true'] {
      ${E} {
        overflow: hidden;
      }
    }
  `);j.defaultProps=y.qn;var H=n(393);const I=(0,a.forwardRef)(function({arrow:e=!0,target:t,portal:n,strategy:r,placement:i,children:s,progress:l,focusTrap:c=!0,...d},u){const m=(0,p.A)(u);return((e,t=!0,n=[],r=!0)=>{const o=(0,a.useCallback)(t=>{if(e?.current&&"Tab"===t.key){const n=(0,v.A)(e),{0:o,[n.length-1]:a}=n,i=(0,$.A)();if((i===e.current||!e.current.contains(i)||e.current.contains(i)&&!n.includes(i))&&r)if(t.preventDefault(),i){const n=(0,v.A)(e,{includeActiveEl:!0}),r=n.findIndex(e=>e===i);-1!==r?t.shiftKey?n[(r-1+n.length)%n.length].focus():n[(r+1)%n.length].focus():t.shiftKey?a?.focus():o?.focus()}else t.shiftKey?a?.focus():o?.focus();else t.shiftKey&&i===o?(t.preventDefault(),a?.focus()):t.shiftKey||i!==a||(t.preventDefault(),o?.focus())}},n);(0,H.A)("keydown",o,{target:t?void 0:e})})(c?m:null,!1),(0,o.jsx)(j,{...d,role:"dialog",arrow:e,"aria-modal":!1,"aria-busy":!!l,ref:m,target:t,portal:n,strategy:r,placement:i,children:s})}),C=(0,i.Ay)(c.Ay)``,S=(0,i.Ay)(I)(({theme:e})=>i.AH`
    /* When a header is not rendered(e.g. progress state) the button must positioned atop. */
    ${E} > ${C} {
      position: relative;
      z-index: calc(${e.base["z-index"].backdrop} + 1);
      align-self: end;
    }
  `);S.defaultProps=y.qn;const R=(0,a.forwardRef)(function({target:e,heading:t,children:n,progress:r,onDismiss:i,...l},c){const y=(0,d.A)(),w=(0,u.A)(),j=(0,p.A)(c),H=(0,a.useRef)(null),I=(0,a.useRef)(null);(0,m.A)(e=>{i?.(),e.stopPropagation()},j,[i]),(0,f.A)("mousedown",[e,j],()=>{i?.()}),(0,a.useLayoutEffect)(()=>{const e=(0,$.A)();return()=>{e instanceof HTMLElement&&e.isConnected&&e.focus()}},[]),(0,a.useEffect)(()=>{r||(()=>{if(r)return;const e=(0,v.A)(j),t=e.find(e=>H.current?.contains(e))??I.current??e[0];t?.focus()})()},[r]),(0,a.useEffect)(()=>{const t=()=>{setTimeout(()=>{i?.()},0)};return e.addEventListener("click",t),()=>{e.removeEventListener("click",t)}},[]);const R=t?(0,o.jsx)(h.A,{id:w,variant:"h2",children:"string"==typeof t?t:t.primary}):null,L=(0,o.jsx)(g.A,{visible:!!r,focusOnVisible:!0,placement:"local",message:"string"==typeof r?r:void 0}),D=(0,o.jsx)(C,{icon:!0,variant:"simple",onClick:()=>{i()},label:y("close"),ref:I,children:(0,o.jsx)(s.Ay,{name:"times"})});return(0,o.jsxs)(S,{...l,..."string"==typeof t?{"aria-labelledby":w}:{"aria-label":t?.primary},arrow:!0,target:e,progress:r,ref:j,children:[t&&R&&(0,o.jsxs)(b.A,{container:{alignItems:"center",justify:"between",pad:2,gap:1},item:{shrink:0},as:k,children:["string"==typeof t?R:(0,o.jsx)(A.Ay,{primary:R,secondary:t.secondary?(0,o.jsx)(h.A,{variant:"secondary",children:t.secondary}):void 0,visual:t.visual}),D]}),(!t||n||r)&&(0,o.jsxs)(b.A,{container:{direction:"column"},item:{grow:1},as:E,ref:H,children:[!t&&D,n&&(0,o.jsx)(x,{inert:r?"":void 0,children:n}),L]})]})}),L="budicon",D="information",z=()=>(0,o.jsx)("path",{d:"M4.37 20.63C2.122 18.386 1 15.69 1 12.5c0-3.19 1.123-5.885 3.37-8.13C6.614 2.122 9.31 1 12.5 1c3.19 0 5.885 1.123 8.13 3.37C22.878 6.614 24 9.31 24 12.5c0 3.19-1.123 5.885-3.37 8.13C18.386 22.878 15.69 24 12.5 24c-3.19 0-5.885-1.123-8.13-3.37Zm-2.49-8.182c0 2.15.582 4.12 1.791 5.866 1.164 1.79 2.73 3.09 4.701 3.94 1.971.851 4.03 1.03 6.134.627s3.895-1.388 5.418-2.91c1.478-1.478 2.463-3.314 2.91-5.418.404-2.105.224-4.12-.626-6.09-.806-1.97-2.104-3.537-3.85-4.745-1.792-1.21-3.761-1.791-5.91-1.791-2.911 0-5.373 1.03-7.433 3.045-2.06 2.06-3.09 4.567-3.134 7.477ZM13.65 5.14c.843 0 1.61.69 1.61 1.61 0 .92-.69 1.61-1.61 1.61-.843 0-1.61-.69-1.61-1.61 0-.92.69-1.61 1.61-1.61ZM12.1 19.4c-1.263 0-2.175-1.04-1.824-2.274l1.5-4.36c.14-.51.359-1.437-.132-1.437-.328 0-.728.164-1.201.491.35-1.09 1.333-1.62 2.456-1.62 1.264 0 2.176 1.04 1.825 2.274l-1.5 4.36c-.14.51-.17 1.338.322 1.338.328 0 .665-.13 1.011-.392-.35 1.09-1.333 1.62-2.456 1.62Z"}),M="0 0 25 25";(0,s.pU)(r);const T=i.Ay.div``,P=(0,a.forwardRef)(function(e,t){const n=(0,d.A)(),{heading:r=n("additional_info"),contextualLabel:i,children:u,dialogHandle:m,...f}=e,[h,g]=(0,a.useState)(null),A=(0,a.useRef)(null),v=(0,p.A)(m);return(0,a.useImperativeHandle)(v,()=>({open:()=>{g(A.current)},close:()=>{g(null)}})),(0,o.jsxs)(b.A,{container:!0,as:T,ref:t,...f,children:[(0,o.jsx)(c.Ay,{variant:"simple",label:n("additional_info"),compact:!0,icon:!0,ref:A,onClick:()=>{v.current?.open()},"aria-label":`${n("additional_info")} - ${i??r}`,children:(0,o.jsx)(s.Ay,{name:"information"})}),h&&(0,o.jsx)(R,{heading:r,target:h,onDismiss:()=>{v.current?.close()},children:"string"==typeof u?(0,o.jsx)(l.Ay,{content:u}):u})]})})},4685:(e,t,n)=>{n.d(t,{A:()=>r});const r=()=>`_${Math.random().toString(36).slice(2,11)}`},4869:(e,t,n)=>{n.d(t,{A:()=>r});const r=(e,t)=>(e.getTestIds=t,e)},5190:(e,t,n)=>{n.d(t,{A:()=>a});var r=n(1594),o=n(393);const a=(e,t=document,n=[])=>{const a=(0,r.useCallback)(t=>{"Escape"===t.key&&e(t)},[e,...n]);(0,o.A)("keydown",a,{target:t})}},5387:(e,t,n)=>{n.d(t,{A:()=>j});var r=n(4848),o=n(1594),a=n(8267),i=n(9549),s=n(1166),l=n(3351),c=n(4853),d=n(8579),u=n(3456),p=n(7321),m=n(2365),f=n(127);const h={primary:!1,secondary:!1,auxillary:!1,fourth:!1,fifth:!1};if(f.A){const e=({buttons:e})=>{h.primary=!!(1&e),h.secondary=!!(2&e),h.auxillary=!!(4&e),h.fourth=!!(8&e),h.fifth=!!(16&e)};document.addEventListener("mousedown",e),document.addEventListener("mouseup",e),document.addEventListener("drop",e)}const g=h;var b=n(9749),A=n(4869),v=n(4860),$=n(4680),y=n(7497);const w=({children:e,theme:t})=>{const n=$.A?window.cosmos.configurationContext??y.Q:y.Q,i=(0,o.useContext)(n),s=new v.A({theme:t,parent:i.themeMachine});return(0,r.jsx)(n.Provider,{value:{...i,themeMachine:s},children:(0,r.jsx)(a.NP,{theme:s.theme,children:e})})},x=(0,n(8044).A)("tooltip",[]),k=a.Ay.div(({theme:e})=>{const t=(0,p.Vr)(e.base["font-size"],e.base["font-scale"]);return a.AH`
    background-color: ${e.components.tooltip["background-color"]};
    color: ${e.components.tooltip["foreground-color"]};
    font-size: ${t.xxs};
    max-width: 40ch;
    padding: ${e.base.spacing};
    white-space: pre-line;
    word-break: break-word;
  `});k.defaultProps=i.qn;const E=(0,o.forwardRef)(function({testId:e,children:t,target:n,ignoredElements:a=[],showDelay:i="short",hideDelay:f="long",placement:h="top",describeTarget:A=!0,smart:v,groupId:$="tooltip",...y},E){const j=(0,l.A)(),[H,I]=(0,o.useState)(!1),[C,S]=(0,o.useState)(!1),R=(0,c.A)(E),L=(0,o.useRef)(null),D=(0,d.A)(e,x),z="string"==typeof t||Array.isArray(t)&&t.every(e=>"string"==typeof e),M=(0,o.useCallback)(({target:e})=>{L.current=e,e!==R.current&&e!==n&&I(!1)},[n]);(0,o.useEffect)(()=>{if(!n)return;const e=()=>{const e=t=>{if((0,m.A)(t).some(Boolean)&&!["absolute","fixed"].includes(window.getComputedStyle(t).position))return!0;for(const n of t.children)if(e(n))return!0;return!1};I(!v||e(n))},t=()=>{e()},r=()=>{L.current&&L.current===R.current||I(!1),L.current=null},o=()=>{a.some(e=>e?.matches(":hover"))||g.primary||e()},i=()=>{(0,b.A)()!==n&&I(!1)},s=({key:e})=>{"Escape"===e&&H&&(S(!0),I(!1))};return document.addEventListener("keydown",s),document.addEventListener("mousedown",M),n.addEventListener("focusin",t),n.addEventListener("focusout",r),n.addEventListener("mouseenter",o),n.addEventListener("mouseleave",i),()=>{document.removeEventListener("keydown",s),document.removeEventListener("mousedown",M),n.removeEventListener("focusin",t),n.removeEventListener("focusout",r),n.removeEventListener("mouseenter",o),n.removeEventListener("mouseleave",i)}},[n,M,v,H]),(0,o.useEffect)(()=>{if(n&&A&&H){const e=n.getAttribute("aria-describedby");n.setAttribute("aria-describedby",e?`${e} ${j}`:j)}else if(n){const e=n.getAttribute("aria-describedby");if(e)if(e===j)n.removeAttribute("aria-describedby");else{const t=e.replace(new RegExp(`(?:^|\\s+)${j}`),"");n.setAttribute("aria-describedby",t)}}},[A,n,H]),(0,o.useEffect)(()=>{!H&&C&&S(!1)},[H,C]);const T=(0,u.A)(),P={base:{palette:{"primary-background":T.components.tooltip["background-color"],"foreground-color":T.components.tooltip["foreground-color"],interactive:(0,p.ho)(T.base.palette.interactive,T.components.tooltip["background-color"])}}};return(0,r.jsx)(w,{theme:P,children:(0,r.jsx)(s.A,{"data-testid":D.root,id:j,groupId:$,...y,show:H,showDelay:C?"none":i,hideDelay:C?"none":f,onMouseOver:()=>{I(!0)},onMouseOut:()=>{I(!1)},strategy:"fixed",as:k,role:z?"tooltip":"dialog",target:n,arrow:!0,placement:h,onMouseDown:M,hideOnTargetHidden:!0,ref:R,children:t})})}),j=(0,A.A)(E,x)},5582:(e,t,n)=>{n.d(t,{A:()=>i,y:()=>o}),n(8347);var r=n(4680);r.A&&(window.cosmos.popoverMap??=new WeakMap);const o=r.A?window.cosmos.popoverMap:new WeakMap,a=e=>{const t=e.getRootNode();return t instanceof Document||t instanceof DocumentFragment?[...e.querySelectorAll("[data-popover-target]")].flatMap(e=>o.has(e)?[...o.get(e)].map(e=>t.querySelector(`[data-popover-id="${e.replace(/"/g,'\\"')}"]`)).flatMap(e=>e?[e,...a(e)]:[]):[]):[]},i=a},5679:(e,t,n)=>{n.d(t,{Ay:()=>A});var r=n(4848),o=n(1594),a=n(8267),i=n(9418),s=n(8889),l=n(9549),c=n(7321);const d=/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|about|blob):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i;var u=n(4869),p=n(8579);const m=(0,n(8044).A)("html",[]),f=(0,i.A)(),h=a.AH`
  ul,
  ol {
    padding-inline-start: 2.5rem;
  }

  li {
    margin: 0.5rem 0;
  }

  ul li {
    ul {
      margin-inline-start: 1rem;
      list-style-type: circle;
    }

    ul ul {
      margin-inline-start: 2rem;
      list-style-type: square;
    }

    ul ul ul {
      margin-inline-start: 3rem;
      list-style-type: disc;
    }
  }

  ol li {
    ol {
      margin-inline-start: 1rem;
      list-style-type: lower-alpha;
    }

    ol ol {
      margin-inline-start: 2rem;
      list-style-type: lower-roman;
    }

    ol ol ol {
      margin-inline-start: 3rem;
      list-style-type: decimal;
    }
  }
`,g=a.Ay.div(({theme:e})=>a.AH`
    width: 100%;
    overflow-x: auto;
    overflow-wrap: break-word;
    contain: paint;
    ${(e=>{const{base:{"font-size":t,"font-scale":n,palette:r},components:{text:o}}=e,i=(0,c.Vr)(t,n);return`\n    ${h}\n    table {\n      ${(e=>a.AH`
  border-collapse: collapse;

  td {
    border: 0.0625rem solid ${e.base.palette["border-line"]};
    min-width: 6.25rem;
  }

  tr:first-child {
    td:first-child {
      border-top-left-radius: 0.125rem;
    }

    td:last-child {
      border-top-right-radius: 0.125rem;
    }
  }

  tr:last-child {
    td:first-child {
      border-bottom-left-radius: 0.125rem;
    }

    td:last-child {
      border-bottom-right-radius: 0.125rem;
    }
  }
`)(e)}\n    }\n    img {\n      max-width: 100%;\n      height: auto;\n      border-radius: 0.25rem;\n    }\n    a {\n      color: ${r.interactive};\n    }\n    pre {\n      white-space: break-spaces;\n    }\n    p {\n      min-height: ${i[o.primary["font-size"]]};\n    }\n    h1 {\n      font-size: ${i[o.h1["font-size"]]};\n      font-weight: ${o.h1["font-weight"]};\n      min-height: ${i[o.h1["font-size"]]};\n    }\n    h2 {\n      font-size: ${i[o.h2["font-size"]]};\n      font-weight: ${o.h2["font-weight"]};\n      min-height: ${i[o.h2["font-size"]]};\n    }\n    h3 {\n      font-size: ${i[o.h3["font-size"]]};\n      font-weight: ${o.h3["font-weight"]};\n      min-height: ${i[o.h3["font-size"]]};\n    }\n    h4 {\n      font-size: ${i[o.h4["font-size"]]};\n      font-weight: ${o.h4["font-weight"]};\n      min-height: ${i[o.h4["font-size"]]};\n    }\n    h5 {\n      font-size: ${i[o.h5["font-size"]]};\n      font-weight: ${o.h5["font-weight"]};\n      min-height: ${i[o.h5["font-size"]]};\n    }\n    h6 {\n      font-size: ${i[o.h6["font-size"]]};\n      font-weight: ${o.h6["font-weight"]};\n      min-height: ${i[o.h6["font-size"]]};\n    }\n  `})(e)}

    ${s.l} ul {
      ul {
        padding-inline-start: 0;
      }
      ol {
        padding-inline-start: 0;
      }
    }

    ${s.l} li {
      margin: 0;
    }
  `);if(g.defaultProps=l.qn,f.isSupported){const e=new WeakSet;f.addHook("beforeSanitizeAttributes",t=>{(t instanceof HTMLElement||t instanceof SVGElement)&&(t.removeAttribute("class"),"A"===t.tagName&&t.hasAttribute("href")&&"_blank"===t.getAttribute("target")&&e.add(t))}),f.addHook("afterSanitizeAttributes",t=>{if("A"===t.tagName&&t.hasAttribute("href")){const n=t.getAttribute("href");let r;try{r=new URL(n,window.location.href)}catch(e){return}window.location.origin!==r.origin?(t.setAttribute("target","_blank"),t.setAttribute("rel","noopener")):e.has(t)&&(t.setAttribute("target","_blank"),e.delete(t))}})}const b=(0,o.forwardRef)(function({testId:e,content:t,customTags:n,...a},i){const[s,l]=(0,o.useState)(!1),c=(0,o.useMemo)(()=>s&&f.isSupported?f.sanitize(t,{FORBID_TAGS:["style","font"],CUSTOM_ELEMENT_HANDLING:{tagNameCheck:n?e=>n.includes(e):void 0},ALLOWED_URI_REGEXP:d}):"",[t,n,s]),u=(0,p.A)(e,m);return(0,o.useEffect)(()=>{l(!0)},[]),(0,r.jsx)(g,{"data-testid":u.root,...a,dangerouslySetInnerHTML:{__html:c},ref:i})}),A=(0,u.A)(b,m)},5764:(e,t,n)=>{n.r(t),n.d(t,{Component:()=>i,name:()=>a,set:()=>o,viewBox:()=>s});var r=n(4848);const o="budicon",a="caret-right",i=()=>(0,r.jsx)("path",{d:"M8 4h2.75l6.5 8.5-6.5 8.5H8l6.5-8.5z"}),s="0 0 25 25"},5882:(e,t,n)=>{n.d(t,{Ay:()=>z});var r=n(4848),o=n(1594),a=n(8267),i=n(6883),s=n(3113),l=n(8579),c=n(4853),d=n(4680);const u=(e,t)=>{let n;return function(...r){window.clearTimeout(n),n=window.setTimeout(()=>{n=void 0,e.apply(this,r)},t)}},p=n(127).A?(()=>{const e=document.createElement("div");e.style.width="1ch",e.style.position="fixed",document.body.append(e);const t=e.offsetWidth;return e.remove(),t})():1;var m=n(3456);const f=d.A&&window.getComputedStyle(document.documentElement).fontSize||"16px";var h=n(9549),g=n(9586),b=n(6878),A=n(3249);const v=(0,a.Ay)(b.Ay)``,$=({children:e,lines:t})=>{const[n,a]=(0,o.useState)(!0),[i,s]=(0,o.useState)(!1),l=(0,o.useRef)(null),c=(0,g.A)(),u=(0,o.useMemo)(()=>{if(!d.A)return 1/0;const e=1.25*Number.parseInt(window.getComputedStyle(document.documentElement).getPropertyValue("font-size"),10);return t*e},[]);return(0,o.useLayoutEffect)(()=>{if(!l.current)return;const e=new ResizeObserver(e=>{const t=e.some(({target:e,contentRect:t})=>{if(e===l.current)return t.height>u});s(t)});return e.observe(l.current),()=>{e.disconnect()}},[l.current,u]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(A.A,{collapsed:n,min:i?`${u}px`:"max-content",children:(0,r.jsx)("div",{ref:l,children:e})}),i&&(0,r.jsx)(v,{variant:"link",onClick:()=>a(e=>!e),children:c(n?"show_more":"show_less")})]})};var y=n(4869),w=n(7491);const x=a.Ay.span`
  display: inline-block;
  position: relative;
`,k=()=>{const e=(0,g.A)();return(0,r.jsxs)(x,{children:[(0,r.jsx)("span",{"aria-hidden":!0,children:"––"}),(0,r.jsx)(w.A,{children:e("no_value")})]})};var E=n(8044);const j=(0,E.A)("field-value-list",[]),H=(0,E.A)("field-value-item",["name","value"]),I=a.Ay.dt`
  word-break: break-word;
`,C=a.Ay.dd`
  word-break: break-word;
`,S=a.Ay.div``,R=a.Ay.dl(({variant:e,theme:t})=>{const{components:{"field-value-list":{inline:{detached:n}}}}=t;return a.AH`
    width: 100%;

    ${"value-comparison"===e&&a.AH`
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

    ${n&&"inline"===e&&a.AH`
      dt {
        width: 100%;
        padding-inline-end: calc(${t.base.spacing});
      }
      ${s.G} {
        max-width: unset;
      }
      dd:not(:last-of-type),
      dt:not(:last-of-type),
      dd:has(+ ${S}),
      dt:has(+ dd + ${S}),
      ${S}:has(+ dt + dd),
      ${S}:not(:last-of-type) {
        border-bottom: 0.0625rem dashed ${t.base.palette["border-line"]};
        padding-bottom: calc(0.5 * ${t.base.spacing});
      }
    `}
  `});R.defaultProps=h.qn;const L=(0,y.A)(({testId:e,name:t,value:n,variant:o="inline",truncate:a=!0})=>{const i=(0,l.A)(e,H),c="string"==typeof n&&a?(0,r.jsx)($,{lines:3,children:n}):n,d=(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.G,{"data-testid":i.name,as:I,role:"none",children:t}),(0,r.jsx)(C,{"data-testid":i.value,role:"none",children:n?c:(0,r.jsx)(k,{})})]});return"stacked"===o?(0,r.jsx)(S,{"data-testid":i.root,children:d}):(0,r.jsx)(r.Fragment,{children:d})},H),D=(0,o.forwardRef)(function({testId:e,fields:t,variant:n="inline",...a},s){const h=(0,l.A)(e,j),g=(0,c.A)(s),b=((e,{breakpointRef:t,defaultValue:n=!1,themeProp:r="breakpoints"}={})=>{const{base:{breakpoints:a,"content-width":i}}=(0,m.A)(),s="content-width"===r?i[e]:a[e],[l,c]=(0,o.useState)(d.A?window.matchMedia(`(min-width: ${s})`).matches:!!n),h=p,g=(0,o.useCallback)(e=>{c(e.matches)},[]);return(0,o.useLayoutEffect)(()=>{if(t&&t.current){const e=u(e=>{if(!t.current?.checkVisibility())return;const n=e.some(({target:e,contentRect:n})=>{if(e!==t.current)return;const o="breakpoints"===r?parseFloat(f):h;return n.width>=parseFloat(s)*o});c(n)},100),n=new ResizeObserver(e);return n.observe(t.current),()=>{n.disconnect()}}if(d.A){const e=window.matchMedia(`(min-width: ${s})`),t="addEventListener"in e,n=u(()=>{c(window.innerWidth>=parseInt(s,10))},100);return t?(e.addEventListener("change",g),c(e.matches)):(window.addEventListener("resize",n),c(window.innerWidth>=parseInt(s,10))),()=>{t?e.removeEventListener("change",g):window.removeEventListener("resize",n)}}},[t?.current]),l})("xs",{breakpointRef:g,themeProp:"content-width"}),{components:{"field-value-list":{inline:{detached:A}}}}=(0,m.A)();return(0,r.jsx)(i.A,{"data-testid":h.root,...a,ref:g,container:{cols:["inline","value-comparison"].includes(n)&&b?"16ch minmax(0, 1fr)":"minmax(0, 1fr)",colGap:A||"value-comparison"===n?0:2,rowGap:A||"value-comparison"===n?.5:1},as:R,role:"none",variant:b?n:"stacked",children:t.map(({id:e,name:t,value:o,truncate:a=!0,variant:i})=>{const s={name:t,variant:"stacked"!==(i??n)&&b?"inline":"stacked"};return"string"==typeof o?(0,r.jsx)(L,{...s,value:o,truncate:a},e??t):(0,r.jsx)(L,{...s,value:o},e??t)})})}),z=(0,y.A)(D,j)},6765:(e,t,n)=>{n.d(t,{Ay:()=>f,pU:()=>d,vE:()=>u});var r=n(4848),o=n(1594),a=n(8267),i=n(3456),s=n(9549),l=n(7321);const c=new Map([]),d=(...e)=>{e.forEach(({set:e,name:t,...n})=>{const r=e??"budicon";c.has(r)?c.get(r).has(t)||c.get(r).set(t,n):c.set(r,new Map([[t,n]]))})},u=a.Ay.svg(({theme:e,size:t="s"})=>{const{components:{icon:{size:{s:n,m:r,l:o}}}}=e;return a.AH`
    display: inline-block;
    fill: currentColor;
    vertical-align: middle;
    flex-shrink: 0;
    /* stylelint-disable unit-allowed-list */
    min-width: 14px;
    min-height: 14px;
    /* stylelint-enable unit-allowed-list */

    @media (forced-colors: active) {
      fill: CanvasText;
    }

    ${"s"===t&&a.AH`
      width: ${n};
      height: ${n};
    `}

    ${"m"===t&&a.AH`
      width: ${r};
      height: ${r};
    `}

    ${"l"===t&&a.AH`
      width: ${o};
      height: ${o};
    `}

    ${"font-size"===t&&a.AH`
      width: 1em;
      height: 1em;
    `}
  `});u.defaultProps=s.qn;const p=a.Ay.div(({theme:e,background:t,foreground:n,size:r="m",shape:o="square"})=>{const i=(0,l.W0)(t),{base:{"border-radius":s},components:{icon:{size:{s:c,m:d,l:p},"border-radius-multiplier":m}}}=e;return a.AH`
    color: ${n??i};
    background-color: ${t};
    display: flex;
    justify-content: center;
    align-items: center;

    ${"s"===r&&a.AH`
      width: ${c};
      height: ${c};
    `}

    ${"m"===r&&a.AH`
      width: ${d};
      height: ${d};
    `}

    ${"l"===r&&a.AH`
      width: ${p};
      height: ${p};
    `}

    ${"font-size"===r&&a.AH`
      width: 1em;
      height: 1em;
    `}

    ${"square"===o&&a.AH`
      border-radius: calc(${m} * ${s});
    `}

    ${"circle"===o&&a.AH`
      border-radius: 50%;
    `}

    ${u} {
      width: 50%;
      height: 50%;
      /* stylelint-disable unit-allowed-list */
      min-width: min(14px, 90%);
      min-height: min(14px, 90%);
      /* stylelint-enable unit-allowed-list */
    }
  `});p.defaultProps=s.qn;const m=Object.freeze({Component:()=>null}),f=(0,o.forwardRef)(function({set:e,name:t,size:a,"aria-label":s,role:l,...f},h){const{base:{"icon-set":g}}=(0,i.A)(),b=e??g??"budicon",[A,v]=(0,o.useState)(c.get(b)?.get(t)??m);return(0,o.useEffect)(()=>{if(c.get(b)?.has(t))return void v(c.get(b).get(t));const e=new AbortController;return(async()=>{try{const e=encodeURIComponent(t);let r,o;switch(b){case"streamline":r="streamline-icons";break;case"budicon":r="icons";break;default:throw new Error("Unknown icon")}try{o=await n(2020)(`./${r}/${e}.icon`)}catch{o=await n(6935)(`./${r}/${e}.icon.tsx`)}if(o.name!==t||!o.Component)throw new Error("Malformed icon definition");d(o)}catch{d({set:b,name:t,...m})}e.signal.aborted||v(c.get(b).get(t)??m)})(),()=>e.abort()},[t,b]),"string"==typeof f.background?(0,r.jsx)(p,{...f,background:f.background,foreground:f.foreground,shape:f.shape,size:a,ref:h,children:(0,r.jsx)(u,{role:l??void 0!==s?"img":"presentation","aria-label":s,viewBox:A.viewBox,children:(0,r.jsx)(A.Component,{})})}):(0,r.jsx)(u,{...f,role:l??void 0!==s?"img":"presentation","aria-label":s,viewBox:A.viewBox,size:a,ref:h,children:(0,r.jsx)(A.Component,{})})})},6878:(e,t,n)=>{n.d(t,{OV:()=>w,Ay:()=>k});var r=n(4848),o=n(1594),a=n(8267),i=n(1357),s=n(9549),l=n(9187);var c=n(9576),d=n(7321),u=n(2477),p=n(4853),m=n(5387),f=n(405),h=n(9466),g=n(285),b=n(6765),A=n(8889);const v=e=>{const{base:{spacing:t,animation:{speed:n,timing:{ease:r}},"disabled-opacity":o},components:{button:{"focus-shadow":i}}}=e;return a.AH`
    outline: none;
    text-decoration: none;
    transition-property: background-color, color, border-color, box-shadow, translate;
    transition-duration: calc(0.5 * ${n});
    transition-timing-function: ${r};
    cursor: pointer;

    & + & {
      margin-inline-start: ${t};
    }

    /* Not able to combine with selector above. Stylis bug? */

    & + ${A.l} + & {
      margin-inline-start: ${t};
    }

    &:disabled,
    &[disabled] {
      opacity: ${o};
      cursor: not-allowed;
      pointer-events: none;
    }

    &:enabled:focus,
    &:not([disabled]):focus {
      box-shadow: ${i};
    }
  `},$=(e,t)=>({contrastColor:t?e:(0,l.A)(()=>(0,d.W0)(e)),hoverColors:(0,d.ZV)(t||e),activeColors:(0,d.BI)(t||e)}),y=(e,t)=>{const n=(0,d.VR)(t)?t:(0,d.W0)(e),r=(0,l.A)(()=>(0,i.IM)(e,n).AA),o=r?e:(0,d.ho)(e,t),a=(0,l.A)(()=>(0,i.jh)(.9,t,e)),s=(0,l.A)(()=>(0,i.jh)(.8,t,o));return{textColor:r?e:(0,d.W0)(e),hoverBg:a,hoverFg:(0,d.ho)(e,a??"transparent"),activeBg:(0,l.A)(()=>(0,i.jh)(.8,t,o)),activeFg:(0,d.ho)(o,s??"transparent")}},w=a.Ay.button.withConfig((0,d.ks)("loading"))(({variant:e,icon:t,loading:n,compact:r,theme:o})=>{const{base:{spacing:i,"border-radius":s,palette:{"primary-background":l},"hit-area":{"mouse-min":c,"finger-min":d,"compact-min":u},animation:{speed:p}},components:{button:{color:m,"foreground-color":h,"secondary-color":b,"secondary-fill-style":A,padding:w,"border-radius":x,"border-width":k,touch:{padding:E}}}}=o,j=v(o),H=a.AH`
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: ${c};
      min-width: ${c};
      border: ${k} solid transparent;
      border-radius: calc(${s} * ${x});
      -webkit-user-select: none;
      user-select: none;
      white-space: nowrap;

      ${!t&&a.AH`
        padding: ${w};
      `}

      ${t&&a.AH`
        border-radius: calc(${s} * ${x});

        > svg {
          display: block;
        }
      `} ${r&&a.AH`
        min-height: ${u};
        min-width: ${u};
      `} @media (
        pointer: coarse) {
        border-radius: calc(${s} * ${x});

        ${!r&&a.AH`
          min-height: ${d};
          min-width: ${d};
        `}

        ${!t&&a.AH`
          padding: ${E};
        `}
      }

      &:active {
        translate: 0 0.0625rem;
      }
    `,{contrastColor:I,hoverColors:C,activeColors:S}="primary"!==e||"auto"===h?$("primary"===e?m:b):$(h,m),R=a.AH`
      --button-background-color: ${"primary"===e?m:b};
      color: ${I};
      background-color: ${"primary"===e?m:b};

      @media (hover: hover) {
        &:hover {
          background-color: ${C.background};
          text-decoration: none;
        }
      }

      &:active {
        background-color: ${S.background};
        color: ${S.foreground};
        text-decoration: none;
      }
    `,L=y(b,l),D=a.AH`
      --button-background-color: ${l};
      color: ${L.textColor};
      background-color: ${l};
      border-color: ${b};

      @media (hover: hover) {
        &:hover {
          background-color: ${L.hoverBg};
          text-decoration: none;
        }
      }

      &:active {
        color: ${L.activeFg};
        background-color: ${L.activeBg};
        border-color: ${L.activeFg};
        text-decoration: none;
      }
    `,z=y("outline"===A?b:m,l),M=a.AH`
      --button-background-color: ${t?"transparent":l};
      color: ${t?"currentColor":z.textColor};
      background-color: ${t?"transparent":l};

      @media (hover: hover) {
        &:hover {
          ${t&&a.AH`
            ::before {
              content: '';
              position: absolute;
              top: calc(${k} * -1);
              bottom: calc(${k} * -1);
              left: calc(${k} * -1);
              right: calc(${k} * -1);
              border-radius: inherit;
              background-color: currentColor;
              opacity: 0.1;
            }
          `}

          ${!t&&a.AH`
            background-color: ${z.hoverBg};
            color: ${z.hoverFg};
            border-color: ${z.hoverFg};
            text-decoration: none;
          `}
        }

        &:active {
          ${t&&a.AH`
            ::before {
              content: '';
              position: absolute;
              top: calc(${k} * -1);
              bottom: calc(${k} * -1);
              left: calc(${k} * -1);
              right: calc(${k} * -1);
              border-radius: inherit;
              background-color: currentColor;
              opacity: 0.2;
            }
          `}

          ${!t&&a.AH`
            background-color: ${z.activeBg};
            color: ${z.activeFg};
            border-color: ${z.activeFg};
            text-decoration: none;
          `}
        }
      }
    `;return a.AH`
      ${j}
      ${H}
        ${("primary"===e||"secondary"===e&&"fill"===A)&&R}
        ${"secondary"===e&&"outline"===A&&D}
        ${"simple"===e&&M}
        ${"primary"===e&&a.AH`
        font-weight: ${o.base["font-weight"]["semi-bold"]};
      `}

        ${n&&a.AH`
        ${g.e} {
          background-color: var(--button-background-color);
          border-radius: inherit;
        }

        ${f.pT} {
          width: 1em;
          height: 1em;

          ${!t&&a.AH`
            margin-inline-end: calc(${i} / 2);
          `}
          circle:nth-child(2) {
            animation-duration: calc(${p} * 2);
          }
        }
      `}
    `});w.defaultProps=s.qn;const x=a.Ay.a.withConfig((0,d.ks)("loading"))(({theme:e,variant:t,href:n})=>{const{base:{palette:{"foreground-color":r}},components:{button:{color:o,"secondary-fill-style":i},link:{color:s}}}=e;let l=s;n||"solid"!==i||(l=o);const{background:c}=(0,d.BI)(l),{background:u}=(0,d.BI)(r),p=v(e),m=a.AH`
    background-color: transparent;
    display: inline;
    text-align: start;
    border: none;

    @media (hover: hover) {
      &:hover {
        text-decoration: underline;
      }
    }

    > ${b.vE} {
      vertical-align: bottom;
    }
  `,f=a.AH`
    color: ${l};

    &:active {
      color: ${c};
    }
  `,h=a.AH`
    color: ${r};

    &:active {
      color: ${u};
    }
  `;return a.AH`
    ${p}
    ${m}
      ${"link"===t&&f}
      ${"text"===t&&h}
  `});x.defaultProps=s.qn;const k=(0,o.forwardRef)(function({variant:e="secondary",type:t="button",disabled:n=!1,icon:a=!1,compact:i=!1,href:s,as:l,forwardedAs:d,label:f,"aria-label":g,loading:b=!1,children:A,className:v,...$},y){const[k,E]=(0,u.A)(),j=(0,o.useRef)(),H=(0,o.useRef)(),I=(0,o.useRef)(),C=(0,p.A)(y,E),S=["link","text"].includes(e),R=b&&!S,L=S?x:w,D=e=>{C.current&&H.current&&I.current&&(({x:e,y:t},n)=>e>=n.left&&e<=n.right&&t>=n.top&&t<=n.bottom)({x:e.clientX,y:e.clientY},H.current)&&Date.now()-I.current<500&&C.current.click()};return(0,o.useEffect)(()=>(document.addEventListener("mouseup",D),()=>{document.removeEventListener("mouseup",D),j.current=void 0,H.current=void 0,I.current=void 0}),[]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(L,{...$,ref:C,as:l||(s?"a":"button"),forwardedAs:d||(s?"a":"button"),className:(0,c.A)("button",v,{variant:e,icon:a,compact:i,loading:b}),variant:e,icon:a,compact:i,type:s?void 0:t,href:s,disabled:n&&!s,loading:R,"aria-label":g||f,onMouseDown:e=>{$.onMouseDown?.(e),e.persist(),j.current=e,H.current=e.currentTarget.getBoundingClientRect(),I.current=Date.now()},onMouseUp:e=>{const t=j.current&&!j.current.defaultPrevented;return j.current=void 0,H.current=void 0,I.current=void 0,t&&C.current!==document.activeElement&&C.current?.focus(),$.onMouseUp?.(e)},children:[R&&(0,r.jsx)(h.A,{variant:"ring",placement:"inline"}),a&&R?null:A]}),k&&f&&(0,r.jsx)(m.A,{target:k,showDelay:"none",hideDelay:"none",describeTarget:!1,children:f})]})})},6883:(e,t,n)=>{n.d(t,{A:()=>p,e:()=>u});var r=n(4848),o=n(1594),a=n(8267),i=n(9549);const s=e=>["between","around","evenly"].includes(e)?`space-${e}`:e,l=e=>{if(!e)return;if(!0===e)return a.AH`
      display: grid;
    `;const{inline:t,pad:n,cols:r,autoCols:o,rows:i,autoRows:l,autoFlow:c,areas:d,template:u,colGap:p,rowGap:m,gap:f,justifyItems:h,justifyContent:g,alignItems:b,alignContent:A}=e;return a.AH`
    display: ${t?"inline-grid":"grid"};

    ${void 0!==n&&a.AH`
      padding: ${({theme:{base:{spacing:e}}})=>(Array.isArray(n)?n:[n]).map(t=>`calc(${t} * ${e})`).join(" ")};
    `}

    ${r&&a.AH`
      grid-template-columns: ${r};
    `}

    ${o&&a.AH`
      grid-auto-columns: ${o};
    `}

    ${i&&a.AH`
      grid-template-rows: ${i};
    `}

    ${l&&a.AH`
      grid-auto-rows: ${l};
    `}

    ${c&&a.AH`
      grid-auto-flow: ${c};
    `}

    ${d&&a.AH`
      grid-template-areas: ${d};
    `}

    ${u&&a.AH`
      grid-template: ${u};
    `}

    ${void 0!==f&&a.AH`
      gap: calc(${f} * ${e=>e.theme.base.spacing});
    `}

    ${void 0!==p&&a.AH`
      column-gap: calc(${p} * ${e=>e.theme.base.spacing});
    `}

    ${void 0!==m&&a.AH`
      row-gap: calc(${m} * ${e=>e.theme.base.spacing});
    `}

    ${h&&a.AH`
      justify-items: ${h};
    `}

    ${g&&a.AH`
      justify-content: ${s(g)};
    `}

    ${b&&a.AH`
      align-items: ${b};
    `}

    ${A&&a.AH`
      align-content: ${s(A)};
    `}
  `},c=e=>{if(!e)return;const{colStart:t,colEnd:n,colStartEnd:r,rowStart:o,rowEnd:i,rowStartEnd:s,area:l,justifySelf:c,alignSelf:d}=e;return a.AH`
    ${t&&a.AH`
      grid-column-start: ${t};
    `}

    ${n&&a.AH`
      grid-column-end: ${n};
    `}

    ${r&&a.AH`
      grid-column: ${r};
    `}

    ${o&&a.AH`
      grid-row-start: ${o};
    `}

    ${i&&a.AH`
      grid-row-end: ${i};
    `}

    ${s&&a.AH`
      grid-row: ${s};
    `}

    ${l&&a.AH`
      grid-area: ${l};
    `}

    ${c&&a.AH`
      justify-self: ${c};
    `}

    ${d&&a.AH`
      align-self: ${d};
    `}
  `},d=["xs","sm","md","lg","xl"],u=a.Ay.div(({container:e,item:t,theme:{base:{breakpoints:n}},xs:r,sm:o,md:i,lg:s,xl:u})=>{const p={xs:r,sm:o,md:i,lg:s,xl:u};return a.AH`
      ${l(e)}
      ${c(t)}

    ${d.map(e=>p[e]&&a.AH`
            @media screen and (min-width: ${n[e]}) {
              ${l(p[e]?.container)}
              ${c(p[e]?.item)}
            }
          `)}
    `});u.defaultProps=i.qn;const p=(0,o.forwardRef)(function(e,t){return(0,r.jsx)(u,{...e,ref:t})})},7491:(e,t,n)=>{n.d(t,{A:()=>l,U:()=>s});var r=n(4848),o=n(1594),a=n(8267),i=n(1357);const s=a.Ay.span`
  ${i.Ic}
  -webkit-user-select: none;
  user-select: none;
`,l=(0,o.forwardRef)(function(e,t){return(0,r.jsx)(s,{...e,ref:t})})},7501:(e,t,n)=>{n.d(t,{A:()=>p,D:()=>u});var r=n(4848),o=n(1594),a=n(8267),i=n(9549);const s=e=>["between","around","evenly"].includes(e)?`space-${e}`:["start","end"].includes(e)?`flex-${e}`:e,l=(e,t)=>{if(!e)return"";if(!0===e)return a.AH`
      display: flex;
    `;const n=(e=>{if(!Array.isArray(e))return[e,e,e,e];switch(e.length){case 1:return[e[0],e[0],e[0],e[0]];case 2:return[e[0],e[1],e[0],e[1]];case 3:return[e[0],e[1],e[2],e[1]];case 4:return e;default:return[void 0,void 0,void 0,void 0]}})(e.pad);if(e&&"object"==typeof e){const r=!e.direction||e.direction.includes("row"),o=e.direction&&e.direction.includes("reverse");return a.AH`
      display: ${e.inline?"inline-flex":"flex"};

      ${void 0!==n[0]&&a.AH`
        padding-block-start: calc(${n[0]} * ${t});
      `}
      ${void 0!==n[1]&&a.AH`
        padding-inline-end: calc(${n[1]} * ${t});
      `}

        ${void 0!==n[2]&&a.AH`
        padding-block-end: calc(${n[2]} * ${t});
      `}

        ${void 0!==n[3]&&a.AH`
        padding-inline-start: calc(${n[3]} * ${t});
      `}

      ${e.direction&&a.AH`
        flex-direction: ${e.direction};
      `}

      ${e.justify&&a.AH`
        justify-content: ${s(e.justify)};
      `}

      ${e.wrap&&a.AH`
        flex-wrap: ${e.wrap};
      `}

      ${e.alignItems&&a.AH`
        align-items: ${s(e.alignItems)};
      `}

      ${e.alignContent&&a.AH`
        align-content: ${s(e.alignContent)};
      `}

      ${e.itemGap&&a.AH`
          > * {
            margin-${r?"inline-start":"block-start"}: calc(${e.itemGap} * ${e=>e.theme.base.spacing});
            ${o?":last-child":":first-child"} {
              margin-${r?"inline-start":"block-start"}: 0;
            }
          }
        `}

      ${void 0!==e.gap&&a.AH`
        gap: calc(${e.gap} * ${e=>e.theme.base.spacing});
      `}

      ${void 0!==e.colGap&&a.AH`
        column-gap: calc(${e.colGap} * ${e=>e.theme.base.spacing});
      `}

      ${void 0!==e.rowGap&&a.AH`
        row-gap: calc(${e.rowGap} * ${e=>e.theme.base.spacing});
      `}
    `}},c=e=>a.AH`
    ${e&&a.AH`
      max-width: 100%;
      min-width: 0;

      ${void 0!==e.grow&&a.AH`
        flex-grow: ${e.grow};
      `}

      ${void 0!==e.shrink&&a.AH`
        flex-shrink: ${e.shrink};
      `}

      ${e.alignSelf&&a.AH`
        align-self: ${s(e.alignSelf)};
      `}

      ${e.basis&&a.AH`
        flex-basis: ${e.basis};
      `}
    `}
  `,d=["xs","sm","md","lg","xl"],u=a.Ay.div(({container:e,item:t,theme:{base:{breakpoints:n,spacing:r}},xs:o,sm:i,md:s,lg:u,xl:p})=>{const m={xs:o,sm:i,md:s,lg:u,xl:p};return a.AH`
      ${l(e,r)}
      ${c(t)}

    ${d.map(e=>m[e]&&a.AH`
            @media screen and (min-width: ${n[e]}) {
              ${l(m[e]?.container,r)}
              ${c(m[e]?.item)}
            }
          `)}
    `});u.defaultProps=i.qn;const p=(0,o.forwardRef)(function(e,t){return(0,r.jsx)(u,{...e,ref:t})})},7521:(e,t,n)=>{n.d(t,{A:()=>u,D:()=>d});var r=n(4848),o=n(1594),a=n(8267),i=n(1357),s=n(9549),l=n(9187),c=n(7321);const d=a.Ay.span(e=>{const{variant:t,status:n,theme:{base:{"font-size":r,"font-scale":o,"font-family":s,palette:{"foreground-color":d,urgent:u,warn:p,success:m},transparency:{"transparent-2":f}},components:{text:h}}}=e;let g;n&&(g={error:u,warning:p,success:m}[n]),"secondary"===t&&(g=(0,l.A)(()=>(0,i.B3)(g??d,f)));const b=(0,c.Vr)(r,o);return a.AH`
    font-size: ${b[h[t]["font-size"]]};
    font-weight: ${h[t]["font-weight"]};
    font-family: ${h[t]["font-family"]||s};
    color: ${g};
  `});d.defaultProps=s.qn;const u=(0,o.forwardRef)(function({variant:e="primary",as:t,...n},o){return!t&&/h\d/i.test(e)&&(t=e),(0,r.jsx)(d,{ref:o,variant:e,as:t,...n})})},7666:(e,t,n)=>{n.d(t,{A:()=>s,U:()=>i});var r=n(3974),o=n(9749),a=n(4685);const i='a[href], button, input, textarea, select, details, video[controls], audio[controls], [tabindex]:not([tabindex="-1"])',s=(e,{includeActiveEl:t=!1}={})=>{const n=(0,a.A)();let s=n,l=null;const c=(0,r.A)(e,"current")?e.current:e;if(!c)return[];let d=i;t&&(l=(0,o.A)(),l&&(s=l.id||n,l.id=s,d=`${d}, [id="${s}"]`));const u=[...c.querySelectorAll(d)].filter(e=>e instanceof HTMLElement&&(e.id===s||!e.hasAttribute("disabled")&&"-1"!==e.getAttribute("tabindex")&&!e.closest("[inert]")));return l?.id===n&&l.removeAttribute("id"),u}},7784:(e,t,n)=>{n.d(t,{A:()=>l});var r=n(1594),o=n(5582),a=n(8268),i=n(712),s=n(9463);const l=(e,t,n)=>{const{portalTarget:l}=(0,s.A)(),c=l?.ownerDocument?.defaultView||window,d=(0,r.useCallback)(e=>{const r=e.composedPath(),s=r[0];if(!(0,a.A)(s,Node))return;let l=0,c=1;for(;!(0,a.A)(r[l],Document);){const e=r[l],t=r[c];if(!e||!t)return;if((0,a.A)(t,DocumentFragment)||(0,a.A)(t,Document)){if(!(0,a.A)(e,Node)||!t.contains(e))return;l=c}else if((0,a.A)(e,DocumentFragment)){if(!(0,a.A)(t,Element)||t.shadowRoot!==e)return;l=c}c+=1}(0,i.A)(t).flatMap(e=>(0,a.A)(e,Element)||(0,a.A)(e,Document)||(0,a.A)(e,DocumentFragment)?[e,...(0,o.A)(e)]:[e]).every(e=>e!==s&&!e.contains(s))&&n(e)},[...t,n]);(0,r.useEffect)(()=>{const t=Array.isArray(e)?e:[e];return t.forEach(e=>c?.document?.addEventListener(e,d)),()=>{t.forEach(e=>c?.document?.removeEventListener(e,d))}},[e,d])}},7940:(e,t,n)=>{n.d(t,{A:()=>a});var r=n(1594),o=n(9463);const a=()=>{const{direction:e}=(0,o.A)();return(0,r.useMemo)(()=>"ltr"===e?{start:"left",end:"right",ltr:!0,rtl:!1}:{start:"right",end:"left",ltr:!1,rtl:!0},[e])}},8044:(e,t,n)=>{n.d(t,{A:()=>r});const r=(e,t)=>n=>{const r=`${n??""}:${e}:`,o=Object.fromEntries(t.map(e=>{return[(t=e,t.replace(/^-+/g,"").replace(/-+(.)?/g,(e,t)=>t.toUpperCase())),`${r}${e}`];var t}));return o.root=r,o}},8072:(e,t,n)=>{n.r(t),n.d(t,{Component:()=>i,name:()=>a,set:()=>o,viewBox:()=>s});var r=n(4848);const o="budicon",a="check",i=()=>(0,r.jsx)("path",{d:"m3.464 11.371 6.222 5.974L21.582 5 23 6.371 9.732 20 2 12.743l1.464-1.372Z"}),s="0 0 25 25"},8268:(e,t,n)=>{n.d(t,{A:()=>r});const r=(e,t)=>{if("object"!=typeof e||!e)return!1;if(e instanceof t)return!0;const n=Object.prototype.toString.call(t.prototype);let r=e;for(;r;){if(Object.prototype.toString.call(r)===n)return!0;r=Object.getPrototypeOf(r)}return!1}},8579:(e,t,n)=>{n.d(t,{A:()=>a});var r=n(1594),o=n(9463);const a=(e,t)=>{const{testIds:n}=(0,o.A)();return(0,r.useMemo)(()=>n?"object"==typeof e&&e?e:t(e):{},[n,e,t])}},8866:(e,t,n)=>{n.d(t,{EF:()=>o,XP:()=>a});var r=n(8044);(0,r.A)("alert",[]);const o=(0,r.A)("count",[]),a=((0,r.A)("keyboard",[]),(0,r.A)("selectable",["remove"]),(0,r.A)("status",[]));(0,r.A)("tag",[])},8889:(e,t,n)=>{n.d(t,{l:()=>s,s:()=>i});var r=n(8267),o=n(9549),a=n(7321);const i=r.Ay.div`
  background-color: inherit;

  ::before {
    content: '';
    display: block;
    position: absolute;
    inset: -0.25rem;
    background-color: inherit;
    transform: rotate(45deg);
  }
`;i.defaultProps=o.qn;const s=r.Ay.div(({theme:{base:{"border-radius":e,"z-index":{popover:t,backdrop:n},shadow:{high:o},palette:s},components:{card:{background:l,"foreground-color":c},"form-control":{"border-radius":d}}},portal:u,offset:p})=>{const{backgroundColor:m}=(0,a.LP)(l,c);return r.AH`
      /*
        Margin should never be used with Popper.
        https://popper.js.org/docs/v2/migration-guide/#4-remove-all-css-margins
      */
      margin: 0 !important;
      z-index: ${u?n-1:t};
      background: ${m};
      border-radius: calc(${d} * ${e});
      box-shadow: ${o};
      color: ${s["foreground-color"]};

      @media (forced-colors: active) {
        border: 0.0625rem solid transparent;
      }

      &[data-popper-reference-hidden='true'] {
        visibility: hidden;
        pointer-events: none;
      }

      &[data-popper-placement^='top'] {
        > ${i} {
          top: calc(100%);

          ::before {
            border-bottom-right-radius: calc(${e} / 4);
          }
        }

        ::before {
          content: '';
          position: absolute;
          height: ${p}px;
          bottom: -${p}px;
          left: 0;
          right: 0;
        }
      }

      &[data-popper-placement^='bottom'] {
        > ${i} {
          bottom: calc(100%);

          ::before {
            border-top-left-radius: calc(${e} / 4);
          }
        }

        ::before {
          content: '';
          position: absolute;
          height: ${p}px;
          top: -${p}px;
          left: 0;
          right: 0;
        }
      }

      &[data-popper-placement^='right'] {
        > ${i} {
          right: calc(100%);

          ::before {
            border-bottom-left-radius: calc(${e} / 4);
          }
        }

        ::before {
          content: '';
          position: absolute;
          width: ${p}px;
          left: -${p}px;
          top: 0;
          bottom: 0;
        }
      }

      &[data-popper-placement^='left'] {
        > ${i} {
          left: calc(100%);

          ::before {
            border-top-right-radius: calc(${e} / 4);
          }
        }

        ::before {
          content: '';
          position: absolute;
          width: ${p}px;
          right: -${p}px;
          top: 0;
          bottom: 0;
        }
      }
    `});s.defaultProps=o.qn},9300:(e,t,n)=>{n.d(t,{A:()=>Tt});var r={};n.r(r),n.d(r,{Component:()=>W,name:()=>_,set:()=>O,viewBox:()=>N});var o={};n.r(o),n.d(o,{Component:()=>Z,name:()=>V,set:()=>U,viewBox:()=>G});var a={};n.r(a),n.d(a,{Component:()=>pe,name:()=>ue,set:()=>de,viewBox:()=>me});var i={};n.r(i),n.d(i,{Component:()=>it,name:()=>at,set:()=>ot,viewBox:()=>st});var s={};n.r(s),n.d(s,{Component:()=>dt,name:()=>ct,set:()=>lt,viewBox:()=>ut});var l={};n.r(l),n.d(l,{Component:()=>It,name:()=>Ht,set:()=>jt,viewBox:()=>Ct});var c=n(1594),d=n(4848),u=n(9586),p=n(4853),m=n(6878),f=n(6765),h=n(8267),g=n(9549),b=n(3351),A=n(8579),v=n(712),$=n(5582),y=n(8268),w=n(9463);var x=n(5190),k=n(7940),E=n(8889),j=n(1166),H=n(4685),I=n(7666),C=n(9749);const S=["button","a","input","li","legend"];var R=n(3700);const L=e=>e.charAt(0).toUpperCase()+e.slice(1);var D=n(4869),z=n(7491),M=n(2884);const T=(e,t,n,r)=>{(0,c.useEffect)(()=>{if(!e.current)return;let o=null;if(t>0){const n=e.current.querySelectorAll(r);n.length>t&&(o=n[t])}if(o){const t=new IntersectionObserver(e=>{e[0].isIntersecting&&n()},{root:e.current});return t.observe(o),()=>{t.disconnect()}}},[n,e.current,t])};var P=n(2558),F=n(9466),q=n(1357),B=n(7501);const O="budicon",_="galaxy",W=()=>(0,d.jsx)("path",{d:"M17.66 3.3 16.5 6.5l-3.3 1.16c-.22.088-.264.562 0 .67l3.3 1.17 1.16 3.3c.1.3.543.3.67 0l1.17-3.3c1.981-.7 3.081-1.09 3.3-1.17.328-.119.205-.598 0-.67L19.5 6.5l-1.17-3.2c-.187-.415-.522-.377-.67 0ZM15.5 22a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM5 10a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"}),N="0 0 25 25",U="streamline",V="folder-empty",Z=()=>(0,d.jsx)("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"M15.188 7.313v-2.25a1.125 1.125 0 0 0-1.126-1.125H6.189V2.813a1.125 1.125 0 0 0-1.125-1.125H1.688A1.125 1.125 0 0 0 .563 2.813v12.224a1.275 1.275 0 0 0 2.502.329l1.763-7.243a1.125 1.125 0 0 1 1.081-.81h10.404A1.125 1.125 0 0 1 17.4 8.726l-1.65 6.75a1.125 1.125 0 0 1-1.087.835H1.835"}),G="0 0 18 18";var K=n(7521),X=n(9187),Q=n(3456),J=n(8044);const Y=(0,J.A)("empty-state",["message","icon"]);(0,f.pU)(r),(0,f.pU)(o);const ee=h.Ay.div(({theme:e})=>{const t=(0,X.A)(()=>(0,q.B3)(e.base.palette["foreground-color"],e.base.transparency["transparent-2"]));return h.AH`
    height: 100%;

    ${f.vE} {
      font-size: 1.5rem;
      height: 1.5rem;
      width: 1.5rem;
      color: ${t};
    }
  `});ee.defaultProps=g.qn;const te=(0,c.forwardRef)(function(e,t){const{base:{"icon-set":n}}=(0,Q.A)(),r=(0,u.A)(),{testId:o,message:a=r("no_items"),...i}=e,s=(0,A.A)(o,Y);return(0,d.jsxs)(B.A,{"data-testid":s.root,...i,as:ee,ref:t,container:{direction:"column",alignItems:"center",justify:"center",gap:1},children:[(0,d.jsx)(f.Ay,{"data-testid":s.icon,name:"streamline"===n?"folder-empty":"galaxy"}),(0,d.jsx)(K.A,{"data-testid":s.message,variant:"secondary",children:a})]})}),ne=(0,D.A)(te,Y),re=(0,c.createContext)({mode:"action",variant:"drill-down",itemLayout:"stacked",scrollAt:7,loading:!1,componentId:(0,H.A)(),pushFlyoutId:()=>null,flyOutActiveIdStack:[],focusControl:null,updateActiveDescendants:()=>null,setFocusDescendant:()=>null,setFocusReturnEl:()=>null,getScopedItemId:()=>"",updateParentDescendantStack:()=>null}),oe=(0,J.A)("meta-list",[]),ae=h.Ay.ul(({wrapItems:e})=>h.AH`
    list-style: none;
    overflow: hidden;

    /* Negative margin to account for overflow clipping of focus indicator */
    padding: 0.3rem;
    margin: -0.3rem;

    ${!e&&h.AH`
      white-space: nowrap;
    `}
  `),ie=h.Ay.li(({wrapItems:e})=>h.AH`
    min-width: 0;
    display: inline-block;

    ${e?h.AH`
          overflow-wrap: break-word;
        `:h.AH`
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        `}

    &[role='separator'] {
      -webkit-user-select: none;
      user-select: none;
    }
  `),se=(0,c.forwardRef)(function({testId:e,items:t,wrapItems:n=!0,...r},o){const a=(0,A.A)(e,oe),i=t.length<=1?"none":void 0;return(0,d.jsx)(B.A,{"data-testid":a.root,...r,as:ae,role:i,container:{colGap:.5,alignItems:"center",wrap:n?"wrap":"nowrap"},wrapItems:n,ref:o,children:t.flatMap((e,t,r)=>e?[(0,d.jsx)(K.A,{as:ie,variant:"secondary",role:i,wrapItems:n,children:e},`${t+0}`)].concat(t!==r.length-1?[(0,d.jsx)(K.A,{as:ie,"aria-hidden":!0,variant:"secondary",children:"•"},`${t+0}-sep`)]:[]):[])})}),le=(0,D.A)(se,oe);var ce=n(9721);const de="budicon",ue="caret-left",pe=()=>(0,d.jsx)("path",{d:"M17.25 21H14.5L8 12.5 14.5 4h2.75l-6.5 8.5z"}),me="0 0 25 25";var fe=n(5764),he=n(8072),ge=n(7321),be=n(8866);const Ae=h.Ay.span(({theme:e,variant:t,children:n})=>{const{foreground:r,background:o}=e.components.badges.count[t],a=(0,X.A)(()=>(0,q.B3)(r,.1)),i=(0,ge.Vr)(e.base["font-size"],e.base["font-scale"]);return h.AH`
    display: inline-block;
    block-size: 1rem;
    flex-shrink: 0;
    border-radius: calc(9999 * ${e.base["border-radius"]});
    color: ${r};
    background-color: ${o};
    box-shadow: inset 0 0 0 0.0625rem ${a};
    font-size: ${i.xxs};
    font-weight: ${e.base["font-weight"].bold};
    line-height: 1rem;
    text-align: center;
    white-space: nowrap;

    ${1===n.length?h.AH`
          aspect-ratio: 1 / 1;
        `:h.AH`
          padding-inline: ${e.base.spacing};
        `}
  `});Ae.defaultProps=g.qn;const ve=e=>e<1e3?"":1e3<=e&&e<1e6?"K":1e6<=e&&e<1e9?"M":1e9<=e&&e<1e12?"B":1e12<=e&&e<1e15?"T":"",$e=e=>{const t=Math.abs(e);return t<1e3?`${e}`:`${e<0?"-":""}${(e=>{for(let t=3;t<15;t+=3){if(e<10**(t+1))return`${`${e}`.slice(0,1)}.${`${e}`.slice(1,2)}${ve(e)}`;if(e<10**(t+2))return`${`${e}`.slice(0,2)}${ve(e)}`;if(e<10**(t+3))return`${`${e}`.slice(0,3)}${ve(e)}`}return"999T+"})(t)}`},ye=(0,D.A)((0,c.forwardRef)(function({testId:e,variant:t="default",children:n,...r},o){const a=(0,A.A)(e,be.EF);return Number.isInteger(n)?(0,d.jsx)(Ae,{"data-testid":a.root,variant:t,...r,ref:o,children:$e(n)}):null}),be.EF),we=h.Ay.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  user-select: none;
  color: inherit;

  & + & {
    margin-inline-start: ${e=>e.theme.base.spacing};
  }
`;we.defaultProps=g.qn;const xe=(0,c.forwardRef)(function({type:e="button",disabled:t=!1,href:n,...r},o){const a=(0,c.useRef)(),i=(0,p.A)(o);(0,c.useEffect)(()=>()=>{a.current=void 0},[]);const s=e=>{r.onMouseDown?.(e),e.persist(),a.current=e},l=e=>{const t=a.current&&!a.current.defaultPrevented;return a.current=void 0,t&&i.current!==document.activeElement&&i.current?.focus(),r.onMouseUp?.(e)};return n?(0,d.jsx)(we,{as:"a",ref:i,href:n,disabled:t,...r,onMouseDown:s,onMouseDownCapture:l}):(0,d.jsx)(we,{ref:i,type:e,disabled:t,...r,onMouseDown:s,onMouseUp:l})});var ke=n(2477),Ee=n(5387);const je=h.Ay.mark(({theme:e})=>h.AH`
    color: ${e.base.colors.black};
    background-color: ${e.components.mark["background-color"]};
    font-weight: ${e.components.mark["font-weight"]};
  `);je.defaultProps=g.qn;const He=e=>(0,d.jsx)(je,{...e});var Ie=n(3974);const Ce={isItem:e=>(0,Ie.A)(e,"primary"),getItem(e,t){let n;return e.some(e=>this.isItem(e)&&e.id===t?(n=e,!0):!!e.items&&(n=this.getItem(e.items,t),!!n)),n},getPath(e,t){let n=[];return e.some(e=>{if(e.id===t)return n=[e],!0;if(e.items){const r=this.getPath(e.items,t);return r.length&&(n=r.concat(e)),!!n.length}return!1}),n},setItem(e,t,n){return e.map(e=>e.id===t?{...n}:e.items?{...e,items:this.setItem(e.items,t,n)}:e)},mapItem(e,t,n){return e.map((e,r,o)=>{let a=e;return e.items&&(a={...a,items:this.mapItem(e.items,t,n)}),this.isItem(a)&&e.id===t&&(a=n(a,r,o)),a})},mapTree(e,t){return e.map((e,n,r)=>{let o=e;return e.items&&(o={...o,items:this.mapTree(e.items,t)}),this.isItem(o)?t(o,n,r):o})},flatten(e,t=[],n={parentFirst:!1}){let r=[],o=[];return e.forEach(e=>{if(this.isItem(e)&&r.push(t.length>0?{...e,ancestors:t}:e),e.items){const a=this.flatten(e.items,[...t,e],n);n.parentFirst?o=[...o,...a]:r=[...r,...a]}}),n.parentFirst?[...r,...o]:r},toggleSelected(e,t,n,r){return this.mapTree(e,e=>{if(this.isItem(e)){if(e.id===t)return{...e,selected:void 0!==r?r:!e.selected};if("single-select"===n)return{...e,selected:!1}}return e})},selectItem(e,t,n){return this.toggleSelected(e,t,n,!0)},deselectItem(e,t,n){return this.toggleSelected(e,t,n,!1)},getSelected(e){return e.reduce((e,t)=>(this.isItem(t)&&t.selected&&(e=[...e,t]),t.items&&(e=[...e,...this.getSelected(t.items)]),e),[])},prependTo(e,t,n){return n?this.mapItem(e,n,e=>({...e,items:[...t,...e.items??[]]})):[...t,...e]},appendTo(e,t,n){return n?this.mapItem(e,n,e=>({...e,items:[...e.items??[],...t]})):[...e,...t]},getNextItem(e,t){if(!t)return e[0];let n;return this.mapItem(e,t,(e,t,r)=>(n=r[t+1],e)),n},getPrevItem(e,t){if(!t)return e[0];let n;return this.mapItem(e,t,(e,t,r)=>(n=r[t-1],e)),n},getParentItem(e,t){if(!t)return;const[,n]=this.getPath(e,t);return n}};var Se=n(6883);const Re=h.AH`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`,Le=((0,h.Ay)(m.Ay)`
  align-self: center;
`,(0,h.Ay)(f.Ay)``),De=h.Ay.li(({theme:{base:e,components:t},isParentItem:n,itemLayout:r,mode:o="action","aria-selected":a=!1,selectableParent:i=!1})=>{const s=(0,X.A)(()=>(0,q.jh)(.85,e.palette["primary-background"],e.palette.interactive)),l=(0,X.A)(()=>(0,q.jh)(.95,e.palette["primary-background"],e.palette.interactive)),c=(0,X.A)(()=>(0,q.B3)(t["radio-check"][":checked"]["background-color"],e.transparency["transparent-5"])),d=t["radio-check"][":checked"]["background-color"],u=(0,X.A)(()=>(0,ge.W0)(d));return h.AH`
      min-height: ${e["hit-area"]["mouse-min"]};
      padding-block: calc(0.75 * ${e.spacing});
      padding-inline: ${e.spacing};
      cursor: pointer;

      ${"inline"===r&&h.AH`
        justify-content: flex-start;

        ${ce.J0} {
          /* Sets grid columns based on SummaryItem content combinations */

          &:has(${ce.Ik}):has(${ce.oF}):has(${ce.Af}) {
            grid-template-areas: 'visual primary secondary actions';
            grid-template-columns: auto auto 1fr auto;
          }

          &:has(${ce.Ik}):has(${ce.oF}):not(:has(${ce.Af})) {
            grid-template-areas: 'visual primary secondary';
            grid-template-columns: auto auto 1fr;
          }

          &:has(${ce.Ik}):not(:has(${ce.oF})):has(${ce.Af}) {
            grid-template-areas: 'visual primary actions';
            grid-template-columns: auto 1fr auto;
          }

          &:has(${ce.Ik}):not(:has(${ce.oF})):not(
              :has(${ce.Af})
            ) {
            grid-template-areas: 'visual primary';
            grid-template-columns: auto 1fr;
          }

          &:not(:has(${ce.Ik})):has(${ce.oF}):has(${ce.Af}) {
            grid-template-areas: 'primary secondary actions';
            grid-template-columns: auto 1fr auto;
          }

          &:not(:has(${ce.Ik})):has(${ce.oF}):not(
              :has(${ce.Af})
            ) {
            grid-template-areas: 'primary secondary';
            grid-template-columns: auto 1fr;
          }

          &:not(:has(${ce.Ik})):not(:has(${ce.oF})):has(
              ${ce.Af}
            ) {
            grid-template-areas: 'primary actions';
            grid-template-columns: auto 1fr;
          }

          &:not(:has(${ce.Ik})):not(:has(${ce.oF})):not(
              :has(${ce.Af})
            ) {
            grid-template-areas: 'primary';
            grid-template-columns: 1fr;
            flex-grow: 0;
          }

          & > ${ce.ox} {
            ${Re};
          }

          & > ${ce.oF} {
            ${Re};

            ul {
              li {
                ${Re};
              }
              justify-content: end;
            }
          }

          & > ${ce.Af} > ${B.D} {
            justify-content: end;
          }
        }
      `}

      @media (pointer: coarse) {
        min-height: ${e["hit-area"]["finger-min"]};
      }

      &:focus-within {
        background-color: ${s};
      }

      &:hover {
        ${Le} {
          visibility: visible;
          ${"single-select"===o&&h.AH`
            color: ${a?d:c};
          `}
          ${"multi-select"===o&&h.AH`
            ${!a&&h.AH`
              border-color: ${t["form-control"][":hover"]["border-color"]};
            `}
          `}
        }
      }

      &:hover:not([aria-disabled='true']) {
        background-color: ${l};
      }

      a:first-of-type {
        display: block;
        width: 100%;
        text-decoration: none;
        color: inherit;
      }

      ${n&&!i&&("multi-select"===o||"single-select"===o)&&h.AH`
        padding-inline-start: calc(1.125rem + 2 * ${e.spacing});
      `}

      ${Se.e} {
        flex-grow: 1;
      }

      ${Le} {
        margin-inline-start: 0;
        ${"single-select"===o&&h.AH`
          ${a?h.AH`
                color: ${d};
              `:h.AH`
                visibility: hidden;
              `}
        `}
        ${"multi-select"===o&&h.AH`
          ${a?h.AH`
                color: ${u};
                background-color: ${d};
                border: 0.0625rem solid ${t["radio-check"][":checked"]["border-color"]};
              `:h.AH`
                color: transparent;
                border: 0.0625rem solid ${t["radio-check"]["border-color"]};
              `}
          border-radius: min(
            calc(${e["border-radius"]} * ${t.checkbox["border-radius"]}),
            0.25rem
          );
        `}
      }

      &[aria-disabled='true'] {
        background-color: ${t["form-control"][":disabled"]["background-color"]};
        opacity: ${e["disabled-opacity"]};
      }
    `});De.defaultProps=g.qn;const ze=h.Ay.div`
  ${f.vE} {
    width: 1em;
    height: 1em;
  }

  & > ${K.D} {
    ${Re};
  }
`,Me=(h.Ay.p`
  ${q.Ic}
`,h.Ay.li(({theme:e})=>h.AH`
    height: 0.0625rem;
    background-color: ${e.base.palette["border-line"]};
    margin: ${e.base.spacing} 0;
  `));Me.defaultProps=g.qn;const Te=h.Ay.div(({theme:e})=>h.AH`
    min-height: ${e.base["hit-area"]["mouse-min"]};
    font-weight: ${e.base["font-weight"]["semi-bold"]};
    background-color: ${e.base.palette["secondary-background"]};

    @media (pointer: coarse) {
      min-height: ${e.base["hit-area"]["finger-min"]};
    }
  `);Te.defaultProps=g.qn;const Pe=h.Ay.legend(({theme:{base:e}})=>{const t=(0,X.A)(()=>(0,q.jh)(.95,e.palette["primary-background"],e.palette.interactive)),n=(0,X.A)(()=>(0,q.jh)(.85,e.palette["primary-background"],e.palette.interactive));return h.AH`
    cursor: pointer;
    width: 100%;
    background-color: ${e.palette["primary-background"]};

    &:first-child {
      border-top-left-radius: inherit;
      border-top-right-radius: inherit;
    }

    &:last-child {
      border-bottom-left-radius: inherit;
      border-bottom-right-radius: inherit;
    }

    &:focus-within {
      box-shadow: ${e.shadow["focus-inset"]};
      background-color: ${n};
    }

    &:hover:not([aria-disabled='true']):not([data-current='true']) {
      background-color: ${t};
    }
    color: ${e.palette["foreground-color"]};
    padding: calc(0.5 * ${e.spacing}) ${e.spacing};
    text-align: start;
    border-radius: inherit;

    > ${Se.e} {
      grid-column-gap: ${e.spacing};
    }

    ${f.vE} {
      /* Fixes vertical align issue increasing box size beyond square */
      display: block;
    }
  `});Pe.defaultProps=g.qn;const Fe=h.Ay.ul(({theme:e})=>h.AH`
    overflow-x: hidden;
    overflow-y: auto;
    list-style: none;
    height: 100%;
    border-radius: inherit;

    ${ee} {
      padding: ${e.base.spacing};
      height: auto;
    }

    li:not(:first-child):not([role='presentation']) > ${Te} {
      margin-block-start: ${e.base.spacing};
    }
  `);Fe.defaultProps=g.qn;const qe=h.Ay.fieldset(({theme:e})=>h.AH`
    background-color: ${e.base.palette["primary-background"]};
    border: 0;
    border-radius: inherit;
  `);qe.defaultProps=g.qn;const Be=(0,h.Ay)(qe)`
  min-width: 10rem;
`,Oe=h.Ay.li`
  display: block;
  position: relative;
  height: 2.8rem;
`,_e=h.Ay.div(({theme:e})=>h.AH`
    position: relative;
    overflow: hidden;
    transition: height ${e.base.animation.speed} ${e.base.animation.timing.ease};

    & > fieldset:first-child {
      position: relative;
    }

    &:first-child {
      border-top-left-radius: inherit;
      border-top-right-radius: inherit;
    }

    &:last-child {
      border-bottom-left-radius: inherit;
      border-bottom-right-radius: inherit;
    }
  `);_e.defaultProps=g.qn;const We=h.Ay.div(({theme:e})=>{const t=`0.0625rem solid ${e.base.palette["border-line"]}`;return h.AH`
    display: flex;
    flex-direction: column;

    &,
    ${_e} {
      max-height: inherit;
    }

    &:focus {
      box-shadow: ${e.base.shadow.focus};
      outline: none;
    }

    &:first-child {
      border-top-left-radius: inherit;
      border-top-right-radius: inherit;
    }

    &:last-child {
      border-bottom-left-radius: inherit;
      border-bottom-right-radius: inherit;
    }

    &[data-active-scope='true'] [data-current='true'] {
      box-shadow: ${e.base.shadow["focus-inset"]};
    }

    ${z.U}:first-child {
      + ${_e}, + header {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
      }
    }

    > header,
    > footer {
      padding: ${e.base.spacing};
    }

    > header {
      border-bottom: ${t};
    }

    > footer {
      border-top: ${t};
    }
  `});We.defaultProps=g.qn;const Ne=(0,J.A)("menu",["create-new"]),Ue=(0,J.A)("menu-item",[]);(0,f.pU)(a,fe,he);const Ve=({expandHandler:e})=>{const{end:t}=(0,k.A)(),n=(0,d.jsx)(f.Ay,{name:`caret-${t}`});return e?(0,d.jsx)(m.Ay,{as:"span",icon:!0,variant:"simple","aria-hidden":!0,onClick:e,children:n}):n},Ze=({ancestors:e=[]})=>{const t=e.length>2,n=t?[e[0],e[e.length-1]]:e,{end:r}=(0,k.A)();return(0,d.jsx)(B.A,{container:{gap:.5,alignItems:"center"},as:ze,title:e.map(e=>Ce.isItem(e)?e.primary:e.label).join(" > "),children:n.map((e,n,o)=>{const a=Ce.isItem(e)?e.primary:e.label;return(0,d.jsxs)(c.Fragment,{children:[(0,d.jsx)(K.A,{variant:"secondary",children:a}),n<o.length-1&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(K.A,{variant:"secondary",children:(0,d.jsx)(f.Ay,{name:`caret-${r}`})}),t&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(K.A,{variant:"secondary",children:"…"}),(0,d.jsx)(K.A,{variant:"secondary",children:(0,d.jsx)(f.Ay,{name:`caret-${r}`})})]})]})]},e.id)})})},Ge=(0,D.A)(({testId:e,id:t,primary:n,secondary:r,ancestors:o,visual:a,count:i,items:s,selected:l,partial:p,href:m,tooltip:f,onClick:h,onExpand:g,disabled:b,role:v="menuitem",...$})=>{const y=(0,u.A)(),{mode:w,onItemClick:x,itemLayout:k,accent:E,variant:j,setFocusDescendant:H,getScopedItemId:I,arrowNavigationUnsupported:C}=(0,c.useContext)(re),S=(0,A.A)(e,Ue),R="single-select"===w||"multi-select"===w,L=s&&"boolean"==typeof l,D=(0,c.useMemo)(()=>I(t),[t,I]),z=`${t}-count`,M=`${t}-secondary`,T=(0,c.useCallback)(e=>{if(e.detail>0){const t=e.target,n=t.getAttribute("role")===v?t:t.closest(`li[role="${v}"]`);n&&H(n)}h?.(t,e),x?.(t,e)},[h,x,t]),P=(0,c.useCallback)(e=>{g?.(t,e),e.stopPropagation()},[g,t]);let F;if(E&&!s){const e="function"==typeof E?E(n):E;F=((e,t,n)=>{const r=[];if(t.global||t.sticky){let o,a=0;for(;o=t.exec(e);)r.push(e.slice(a,o.index),n(o[0])),a=o.index+o[0].length;r.push(e.slice(a))}else{const o=t.exec(e);o?r.push(e.slice(0,o.index),n(o[0]),e.slice(o.index+o[0].length)):r.push(e)}return r.flatMap((e,t)=>e?(0,d.jsx)(c.Fragment,{children:e},t):[])})(n,e,e=>(0,d.jsx)(He,{children:e}))}const q=o?(0,d.jsx)(Ze,{ancestors:o}):r&&(0,d.jsx)(le,{items:r,id:M}),[O,_]=(0,ke.A)(),W=(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(ce.Ay,{ref:_,primary:F||(s?n:(0,d.jsx)(K.A,{children:n})),secondary:q,layout:k,visual:a,actions:s||i?(0,d.jsxs)(B.A,{container:{gap:1,alignItems:"center",justify:"center"},children:[void 0!==i&&(0,d.jsx)(ye,{id:z,"aria-label":y("menu_item_count",[i]),children:i}),s&&(0,d.jsx)(Ve,{expandHandler:L?P:void 0})]}):void 0,container:{colGap:1}}),f&&(0,d.jsx)(Ee.A,{target:O,hideDelay:"none",showDelay:"short",children:f})]}),N=(0,c.useMemo)(()=>{const e=y("menu_collapsed",[n]);return s?y(C?"menu_item_shift_space_expand_collapse":"menu_item_expand_arrow",[e]):n},[l,n,s]),U=(0,c.useMemo)(()=>{let e;return r?(e=M,void 0!==i&&i>=0&&(e=`${e} ${z}`)):e=void 0!==i&&i>=0?z:"",e},[s,r,z,M]);return(0,d.jsxs)(B.A,{"data-testid":S.root,...$,container:{alignItems:"center",justify:"between",gap:1},id:D,as:De,"aria-label":N,"aria-describedby":U,role:v,"aria-disabled":b,"data-expand":!!s,itemLayout:k,tabIndex:-1,disabled:b,onMouseDown:e=>{e.preventDefault()},onClick:e=>{if(!b)return s&&"boolean"!=typeof l?P(e):T(e)},onMouseEnter:"flyout"===j?P:void 0,href:m,mode:w,isParentItem:!!s,"aria-selected":!!l,selectableParent:L,children:[R&&(!s||L)&&(0,d.jsx)(Le,{name:"check"}),m&&!R?(0,d.jsx)(xe,{href:m,tabIndex:"-1",children:W}):W]})},Ue),Ke=(e,t,n,r)=>{const o=!!e.firstElementChild?.matches("legend"),a=e.querySelectorAll([':scope > ul > li:not([role="separator"]):not([role="presentation"])',':scope > ul > li[role="presentation"] > div:first-child',':scope > ul > li > ul[role="group"] > li:not([role="separator"])'].join(", "))[Math.max(Math.min(r-(o?2:1),n-1),0)];let i;if(a){const t=e.getBoundingClientRect().top,o=a.getBoundingClientRect(),s=e.querySelector(":scope > ul")?.scrollTop??0;let l=o.bottom;n>r&&(l=(o.top+o.bottom)/2),i=l-t+s}t.style.height=i?`${i}px`:""},Xe=({id:e,label:t,items:n,itemRole:r})=>{const{componentId:o}=(0,c.useContext)(re),a=`${o}-${e}`;return(0,d.jsxs)("li",{role:"presentation",children:[(0,d.jsx)(B.A,{container:{alignItems:"center",pad:[.5,1]},as:Te,id:a,children:t}),(0,d.jsx)("ul",{role:"group","aria-labelledby":a,children:n.length>0&&n.map(e=>(0,c.createElement)(Ge,{...e,key:e.id,role:r??"menuitem"}))})]})},Qe=e=>Array.isArray(e.items),Je=(0,c.forwardRef)(function({items:e,parent:t,menuRole:n},r){const o=(0,u.A)(),a=(0,p.A)(r),i=(0,c.useRef)(null),s=(0,c.useRef)(null),l=(0,c.useRef)(null),[m,f]=(0,c.useState)(),{componentId:h,loadMore:g,loading:b,scrollAt:A,emptyText:v,onItemExpand:$,pushFlyoutId:y,flyOutActiveIdStack:w,updateActiveDescendants:x,updateParentDescendantStack:k}=(0,c.useContext)(re),{announcePolite:E}=(0,M.A)();T(i,e.length-1,()=>{g?.(t?.item?.id)},":scope > li"),(0,P.A)(()=>{if(m){const t=e.find(e=>e.id===m.id);t&&Qe(t)?f(t):f(void 0)}},[m,e]),(0,c.useEffect)(()=>{e.some(e=>w.includes(e.id))||(l.current=null,f(void 0))},[w]),(0,c.useEffect)(()=>{0!==e.length||b||E({message:v??o("no_items")})},[e.length,b]);const H=(0,c.useMemo)(()=>e.length?e.map(e=>Ce.isItem(e)?(0,c.createElement)(Ge,{...e,key:e.id,"aria-haspopup":!!e.items,"aria-expanded":e.items?e.id===m?.id:void 0,role:"listbox"===n?"option":"menuitem",onExpand:(t,n)=>{e.items?(l.current=n.currentTarget,f(Qe(e)?e:void 0),e?.onExpand?.(t,n),$?.(t,n),y(e.id||h),x(),k&&k(l.current.closest("li"))):(l.current=null,f(void 0))}}):(0,c.createElement)(Xe,{...e,key:e.id,itemRole:"listbox"===n?"option":"menuitem"})):b?null:(0,d.jsx)(ne,{message:v,forwardedAs:"li"}),[e,b,v,m,w]),I=(0,d.jsxs)(Fe,{ref:i,role:n,children:[H,b&&!m&&(0,d.jsx)(Oe,{children:(0,d.jsx)(F.A,{placement:"local"})})]});(0,c.useLayoutEffect)(()=>{f(void 0),a.current&&(s.current=a.current.parentElement,Ke(a.current,a.current,e.length,A))},[e]);const C=(0,c.useCallback)(()=>{m&&f(void 0)},[m]);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(Be,{ref:a,onScroll:C,"data-flyout-menu-parent-id":h,"data-flyout-menu-id":t?.item.id||h,children:I}),m&&a.current&&(0,d.jsx)(j.A,{target:l.current,show:!0,strategy:"fixed",placement:"right-start",portal:!1,children:(0,d.jsx)(Je,{items:m.items,parent:{el:a.current,item:m,siblingItems:e,setExpandedItem:f,returnFocusRef:l},menuRole:n})})]})}),Ye=Je;var et=n(7784),tt=n(1862);const nt=e=>{const t=e.current?.getRootNode();if((0,y.A)(t,Document)||(0,y.A)(t,ShadowRoot))for(const n of t.childNodes)if(n.contains(e.current)&&(0,y.A)(n,HTMLElement))return n},rt="calc(100vw - 20rem)",ot="budicon",at="drag",it=()=>(0,d.jsx)("path",{d:"M9.5 5.136V3.5h1.708v1.636H9.5Zm0 4.111V7.611h1.708v1.636H9.5Zm0 4.071v-1.636h1.708v1.636H9.5Zm0 4.11v-1.635h1.708v1.636H9.5Zm0 4.072v-1.636h1.708V21.5H9.5Zm4.292-16.364V3.5H15.5v1.636h-1.708Zm0 4.111V7.611H15.5v1.636h-1.708Zm0 4.071v-1.636H15.5v1.636h-1.708Zm0 4.11v-1.635H15.5v1.636h-1.708Zm0 4.072v-1.636H15.5V21.5h-1.708Z"}),st="0 0 25 25",lt="budicon",ct="arrow-micro-up-down",dt=()=>(0,d.jsx)("path",{d:"m12.402 5 4.597 6H8l4.402-6Zm.195 15L8 14h9l-4.403 6Z"}),ut="0 0 25 25";(0,f.pU)(i),(0,f.pU)(s);const pt=(0,h.Ay)(m.Ay)(({rotateIcon:e})=>h.AH`
    cursor: grab;

    &:active {
      cursor: grabbing;
    }

    &:not(:focus) {
      ${q.Ic};
    }

    ${e&&h.AH`
      ${f.vE} {
        transform: rotate(90deg);
      }
    `}
  `),mt=h.Ay.div(({theme:e})=>h.AH`
    position: absolute;
    inset-inline-start: 0;
    inset-block: 0;
    inline-size: 0.125rem;
    background-color: transparent;
    transition: background-color ${e.base.animation.speed} ${e.base.animation.timing.ease};
    cursor: ew-resize;
    z-index: ${e.base["z-index"].max};

    ::before {
      content: '';
      position: absolute;
      inset: 0;
      width: calc(${e.base["hit-area"].compact} * 0.75);
    }

    &:hover {
      background-color: ${e.base.palette.interactive};
    }

    ${m.OV} {
      position: absolute;
      inset-block-start: 50%;
      inset-inline-start: calc(-2 * ${e.base.spacing});
      translate: 0 -50%;
      box-shadow: ${e.base.shadow.focus};
    }
  `);mt.defaultProps=g.qn;const ft=(0,c.forwardRef)(function({onMouseDown:e,onKeyDown:t},n){const r=(0,p.A)(n),o=(0,u.A)(),[a,i]=(0,c.useState)(!1),[s,l]=(0,c.useState)(!1);(0,x.A)(()=>{i(!1),l(!1)});const m=t=>{const n=nt(r);n&&(n.style.setProperty("user-select","none"),i(!0),e?.(t))};return(0,d.jsx)(mt,{onMouseDown:m,onMouseUp:()=>{const e=nt(r);e&&(e.style.removeProperty("user-select"),i(!1))},ref:r,children:(0,d.jsx)(pt,{tabIndex:0,icon:!0,label:a||s?void 0:o("resize"),"aria-label":o(a||s?"drag_handle_cancel_description":"drag_handle_activate_description"),onMouseDown:m,onKeyDown:e=>{"Space"===e.code&&(e.preventDefault(),l(!s)),t?.(e,s)},onBlur:()=>{l(!1)},rotateIcon:s,children:(0,d.jsx)(f.Ay,{name:s?"arrow-micro-up-down":"drag"})})})}),ht=(0,q.ir)("21.875rem"),gt=h.Ay.div(e=>{const{state:t,shadow:n,position:r,placement:o,transitionSpeed:a,size:i,resizeable:s,theme:l}=e;let c="horizontal",d="X",u="top";"top"!==o&&"bottom"!==o||(c="vertical",d="Y",u="left");const p="open"===t||"opening"===t?0:"100%",m=a||l.base.animation.speed;return h.AH`
    z-index: ${l.base["z-index"].drawer};
    position: ${r};
    ${o}: 0;
    ${u}: 0;
    height: ${"vertical"===c?i:"100%"};
    width: ${"horizontal"===c?i:"100%"};
    transition-property: transform, box-shadow, opacity;
    transition-duration: max(${m}, 0.0001s);
    transition-timing-function: ${l.base.animation.timing.ease};
    transform: ${"open"===t?"none":`translate${d}(${"top"===o||"left"===o?"-":""}${p})`};

    ${n&&h.AH`
      box-shadow: ${l.base.shadow.high};
    `}

    ${s&&h.AH`
      width: ${"horizontal"===c?"var(--resize-drawer-width)":"100%"};
    `}
  `});gt.defaultProps=g.qn;const bt=(0,c.forwardRef)(function(e,t){const{open:n=!1,shadow:r=!1,position:o="absolute",children:a,placement:i="right",transitionSpeed:s,size:l="100%",resizeable:u=!1,onAfterOpen:m,onAfterClose:f,onBeforeOpen:h,onBeforeClose:g,onOuterClick:b,nullWhenClosed:A=!1,...v}=e,$=(0,p.A)(t),{ltr:y,rtl:w}=(0,k.A)(),[x,E]=(0,c.useState)(n?"open":"closed");let j=(0,R.A)(x);j||(j=x),(0,et.A)("mousedown",[$],(0,c.useCallback)(()=>{n&&b?.()},[n,b])),(0,c.useEffect)(()=>{!n||"closed"!==x&&"closing"!==x?n||"open"!==x&&"opening"!==x?n&&"open"===x&&"open"!==j?m?.():n||"closed"!==x||"closed"===j||f?.():(g?.(),E("closing")):(h?.(),(0,tt.A)($.current),E("opening"))},[n,x,j,h,g,m,f]);const H=(0,c.useCallback)(e=>{e.target===$.current&&"transform"===e.propertyName&&E(n?"open":"closed")},[n]),I=(0,c.useRef)();(0,c.useEffect)(()=>{if(!u||!$.current)return;const e=nt($);e&&(e.style.getPropertyValue("--resize-drawer-width")||e.style.setProperty("--resize-drawer-width",l))},[$.current]);const C=(0,c.useCallback)(e=>{const t=nt($),n=$.current?.getBoundingClientRect();if(!n||!t)return;I.current=e.clientX;const r=new AbortController;t.addEventListener("mousemove",e=>{if(!I.current||!n.width)return;const r=I.current,o="right"===i?r-e.clientX:e.clientX-r,a=Math.max(o+n.width,parseInt(ht,10));t.style.setProperty("--resize-drawer-width",`clamp(${ht}, ${a}px, ${rt})`)},{passive:!0,signal:r.signal}),t.addEventListener("mouseup",()=>{r.abort()},{once:!0})},[i]),S=(0,c.useCallback)((e,t)=>{if(!t)return;const n=nt($),r=.05*document.documentElement.clientWidth,o=$.current?.getBoundingClientRect();if(!o||!n)return;if("ArrowLeft"!==e.code&&"ArrowRight"!==e.code)return;e.preventDefault();const a=("ArrowLeft"===e.code?1:-1)*("right"===i?1:-1),s=Math.max(o.width+a*r,parseInt(ht,10));n.style.setProperty("--resize-drawer-width",`clamp(${ht}, ${s}px, ${rt})`)},[i]),L=u&&"open"===x&&("left"===i&&w||"right"===i&&y);return"closed"===x&&!n&&A?null:(0,d.jsxs)(gt,{ref:$,position:o,shadow:r&&n,transitionSpeed:s,placement:i,size:l,resizeable:u,open:n,state:x,onTransitionEnd:H,...v,children:[a,L&&(0,d.jsx)(ft,{onMouseDown:C,onKeyDown:S})]})});(0,f.pU)(a,fe);const At=({text:e,onClick:t})=>{const n=(0,u.A)(),{arrowNavigationUnsupported:r}=(0,c.useContext)(re),{start:o}=(0,k.A)(),a=(0,c.useCallback)(e=>{"Enter"!==e.key&&e.key!==`Arrow${L(o)}`||t()},[t,o]);return(0,d.jsx)(B.A,{container:{alignItems:"center"},as:Pe,onClick:t,onKeyDown:a,"data-collapse":"true","aria-expanded":!0,"aria-label":`${n("menu_expanded",[e||""])} ${n(r?"menu_item_collapse_shift_space":"menu_item_collapse_arrow")}`,children:(0,d.jsx)(ce.Ay,{visual:(0,d.jsx)(f.Ay,{name:`caret-${o}`}),primary:e})})},vt=(e,t)=>{e.disabled=t;const n=e.querySelector("legend button");n&&(n.disabled=t)},$t=(e,t)=>e.reduce((e,t)=>!Ce.isItem(t)&&t.items?e+t.items.length+1:e+1,t?1:0),yt=e=>e.flatMap(e=>Ce.isItem(e)?e:[e,...e.items?e.items:[]]),wt=(0,c.forwardRef)(function({items:e,parent:t,id:n,menuRole:r,...o},a){const i=(0,u.A)(),s=(0,c.useRef)(null),l=(0,p.A)(a),m=(0,c.useRef)(null),f=(0,c.useRef)(null),[h,g]=(0,c.useState)(!t),[b,A]=(0,c.useState)(),{scrollAt:v,"aria-label":$,loadMore:y,loading:w,emptyText:x,currentItemId:E,onItemExpand:j,focusControl:H,updateActiveDescendants:I,setFocusReturnEl:C,onItemCollapse:S,expandTo:R}=(0,c.useContext)(re),{end:L}=(0,k.A)(),{announcePolite:D}=(0,M.A)();T(m,e.length-1,()=>{w||y?.(t?.item?.id)},":scope > li"),(0,c.useLayoutEffect)(()=>{l.current&&!b&&(s.current=l.current.parentElement,Ke(l.current,s.current,$t(e,w),v))}),(0,c.useEffect)(()=>{t&&g(!0)},[]),(0,P.A)(()=>{if(b){const t=yt(e).find(e=>e.id===b.id);t&&Qe(t)?A(t):A(void 0)}},[b,e]),(0,P.A)(()=>{if(E){const t=yt(e).find(e=>e.items?.length&&void 0!==Ce.getItem(e.items,E));t&&(A(Qe(t)?t:void 0),I({preventScroll:!0}))}},[E,e,t]),(0,c.useEffect)(()=>{if(R?.parentItemId){const t=yt(e).find(e=>e.id===R.parentItemId);if(t)A(Qe(t)?t:void 0),I({preventScroll:!0}),R.onComplete();else{const t=yt(e).find(e=>e.items?.length&&void 0!==Ce.getItem(e.items,R.parentItemId));t?A(Qe(t)?t:void 0):R.onComplete()}}},[R,e,t]);const z=(0,c.useCallback)((t,n)=>{const r=Ce.getItem(e,t);f.current=n.currentTarget,r&&Qe(r)?A(r):A(void 0),r?.onExpand?.(t,n),j?.(t,n),I({preventScroll:!0})},[e]);(0,c.useEffect)(()=>{0!==e.length||w||D({message:x??i("no_items")})},[e.length,w]);const q=(0,c.useMemo)(()=>e.length?e.map((t,n)=>Ce.isItem(t)?(0,c.createElement)(Ge,{...t,key:t.id,role:"listbox"===r?"option":"menuitem",onExpand:t.items?z:void 0}):(0,d.jsxs)(c.Fragment,{children:[(0,d.jsx)(Xe,{...t,items:t.items.map(e=>e.items?{...e,onExpand:z}:e),itemRole:"listbox"===r?"option":"menuitem"}),e[n+1]&&Ce.isItem(e[n+1])&&(0,d.jsx)(Me,{role:"separator"})]},t.id)):w?null:(0,d.jsx)(ne,{message:x,forwardedAs:"li"}),[e,w,x]),B=(0,d.jsxs)(Fe,{id:b?void 0:n,ref:m,role:r,...o,children:[t&&(0,d.jsx)(At,{text:t.item.primary,onClick:()=>{g(!1)}}),q,w&&!b&&(0,d.jsx)(Oe,{children:(0,d.jsx)(F.A,{placement:"local",liveConfig:{contextualLabel:$??i("menu")}})})]});return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(bt,{"aria-hidden":!!b,as:qe,ref:l,open:h,style:{opacity:b?0:1},disabled:!!b,placement:L,onBeforeOpen:()=>{t&&(t.el.style.opacity="0"),l.current&&(l.current.style.opacity="1")},onAfterOpen:()=>{t&&vt(t.el,!0)},onBeforeClose:()=>{t&&s.current&&(vt(t.el,!1),t.el.style.opacity="1",Ke(t.el,s.current,$t(t.siblingItems),v)),l.current&&(l.current.style.opacity="0")},onAfterClose:()=>{if(t){H?.focus();const e=t.returnFocusRef.current;t.setExpandedItem(void 0),e&&C(e?.closest("li")),S?.(t.item.id),I()}},children:B}),b&&l.current&&(0,d.jsx)(wt,{id:n,items:b.items,parent:{el:l.current,item:b,siblingItems:e,setExpandedItem:A,returnFocusRef:f},menuRole:r})]})}),xt=wt,kt=(0,c.forwardRef)(function(e,t){const n=(0,b.A)(),{testId:r,id:o=n,items:a=[],itemLayout:i="stacked",onCreateNew:s,mode:l="action",accent:h,scrollAt:g=7,emptyText:v,onItemClick:$,onItemActive:w,onItemExpand:x,loadMore:E,onItemCollapse:j,loading:D=!1,currentItemId:M,header:T,footer:P,variant:F="drill-down",focusControlEl:q,arrowNavigationUnsupported:B,"aria-describedby":O,"aria-label":_,role:W="menu",listId:N,pauseDescendantEvaluation:U,menuList:V,handleRef:Z,...G}=e,K=(0,A.A)(r,Ne),X=(0,u.A)(),{end:Q,start:J}=(0,k.A)(),Y=(0,b.A)(),ee=(0,p.A)(t),te=(0,c.useRef)(0),[ne,oe]=(0,c.useState)(0),[ae,ie]=(0,c.useState)(null),[se,le]=(0,c.useState)([o]),[ce,de]=(0,c.useState)(),[ue,pe]=(0,c.useState)(!1),[me,fe]=(0,c.useState)([]),[he,ge]=(0,c.useState)(),be=!q,Ae=(0,c.useMemo)(()=>`fieldset[data-flyout-menu-id="${se[se.length-1]}"]`,[se]),ve=(0,c.useMemo)(()=>q||ee.current,[q,ee.current]);(0,c.useImperativeHandle)(Z,()=>({expandTo:e=>{ge(e)}}),[]);const $e=(0,c.useCallback)(e=>{le([...se,e])},[se]);(0,c.useEffect)(()=>{le([...se,o])},[o]);const ye=(0,c.useCallback)(e=>{fe([...me,e])},[me]),we=(0,c.useCallback)(e=>btoa(encodeURIComponent(e)),[o]),xe=(0,c.useCallback)(e=>decodeURIComponent(atob(e)),[o]),ke=(0,c.useCallback)(({preventScroll:e=!1}={})=>{pe(e),oe(Math.random())},[]),Ee=(0,c.useMemo)(()=>({focusEl:ve,scope:ee.current,scopeSelector:"drill-down"===F?'fieldset[aria-hidden="false"]':Ae,selector:`[role="${"menu"===W?"menuitem":"option"}"], legend`,focusDescendantEl:ae,clearFocusDescendant:()=>{ie(null)},focusReturnEl:ce,clearFocusReturn:()=>{de(null)},currentDescendantId:M?we(M):void 0,preventInitialScroll:ue,clearPreventScroll:()=>{pe(!1)},pauseDescendantEvaluation:U}),[ve,ee.current,Ae,ce,ae,M,ue,U]),{activeDescendant:je,descendants:He}=(({focusEl:e,scope:t,scopeSelector:n,selector:r,orientation:o="vertical",focusDescendantEl:a,clearFocusDescendant:i,focusReturnEl:s,clearFocusReturn:l,currentDescendantId:d,onClick:u,preventInitialScroll:p,pauseDescendantEvaluation:m=!1,clearPreventScroll:f},h=[])=>{const[g,b]=(0,c.useState)(0),A=(0,c.useRef)(""),v=(0,c.useRef)(m),[$,w]=(0,c.useState)(null),[x,E]=(0,c.useState)(null),[j,R]=(0,c.useState)(),{rtl:L}=(0,k.A)(),D=(0,c.useCallback)(()=>{j?.forEach(e=>{e.setAttribute("data-current","false")})},[j]),z=(0,c.useCallback)(e=>{D(),R(e?Array.from(e).filter(e=>(0,y.A)(e,HTMLElement)):null)},[j]),M=(0,c.useCallback)(({clear:t}={clear:!1})=>{const n=[];if(j&&j.length&&j.forEach(e=>{e.id=e.id||(0,H.A)(),n.push(e.id)}),t){const t=e?.getAttribute("aria-owns")?.split(" "),r=t?.filter(e=>!n.includes(e));e?.setAttribute("aria-owns",r?.join(" ")||"")}else e?.setAttribute("aria-owns",n.join(" "))},[e,j]),T=(0,c.useCallback)(()=>{if(m)return;let e=t;if(e&&(0,y.A)(e,HTMLElement)){if(n&&(e=e.querySelector(n)),!e)return void z(null);if(r){const t=e.querySelectorAll(r);z(t)}else{const t=e.querySelectorAll(I.U);z(t)}}else z(null);null===x&&E(0)},[t,n,r,m,x]);return(0,c.useEffect)(()=>{v.current=m},[m]),(0,c.useEffect)(()=>{if(!t||!e)return;t.setAttribute("data-active-scope",(0,C.A)()===e?"true":"false");const n=()=>{t.setAttribute("data-active-scope","true")},r=()=>{t.setAttribute("data-active-scope","false")};return e.addEventListener("focus",n),e.addEventListener("blur",r),()=>{e.removeEventListener("focus",n),e.removeEventListener("blur",r)}},[t,e]),(0,c.useEffect)(()=>{m||T()},[m]),(0,c.useEffect)(()=>{const e=setTimeout(()=>{T(),v.current||E(0)},0);return()=>clearTimeout(e)},[...h]),(0,c.useEffect)(()=>{m?(D(),M({clear:!0})):(M(),b(Math.random()))},[m,e,j]),(0,c.useEffect)(()=>{const t=()=>{l?.(),f?.(),null!==x&&x+1<j.length?E(x+1):E(0)},n=()=>{l?.(),f?.(),E(null!==x&&x-1>-1?x-1:j.length-1)},r=e=>{j?.length&&(["ArrowDown","ArrowUp"].includes(e.key)&&"vertical"===o&&e.preventDefault(),["ArrowLeft","ArrowRight"].includes(e.key)&&"horizontal"===o&&e.preventDefault(),setTimeout(()=>{switch(e.key){case"ArrowDown":"vertical"===o&&t();break;case"ArrowUp":"vertical"===o&&n();break;case"ArrowRight":"horizontal"===o&&(L?n():t());break;case"ArrowLeft":"horizontal"===o&&(L?t():n());break;case"Enter":if(null!==x){if(u){u(j[x]);break}const e=j[x].nodeName.toLowerCase();S.includes(e)?j[x].click():j[x].querySelector(`${S.join(",")}`)?.click()}}},0))};return!m&&e&&j?.length&&!d&&e.addEventListener("keydown",r),()=>{e?.removeEventListener("keydown",r)}},[e,x,j,m]),(0,c.useEffect)(()=>{!m&&j&&d&&j.forEach((e,t)=>{e.id===d&&E(t)})},[d,j,m]),(0,c.useEffect)(()=>{if(v.current)return;const t=$||x,n=s?.id;let r;const o=a?.id;let c,d=!1;if(j&&j.length){if(j.forEach((e,t)=>{null===$&&e.id===o&&(c=t,d=!0,w(t)),e.id===n&&(r=t),e.setAttribute("data-current","false")}),r&&r!==x)return E(r),void l?.();if(d&&void 0!==c)return b(Math.random()),void E(c);if(null!==t&&j[t]){const n=j[t];if(n.setAttribute("data-current","true"),e?.setAttribute("aria-activedescendant",n.id),n.id!==A.current&&!p){const e=Element.prototype.scrollIntoViewIfNeeded??Element.prototype.scrollIntoView;e?.call(n,!1)}null!==$&&(w(null),i?.()),A.current=n.id}}return()=>{e?.removeAttribute("aria-activedescendant")}},[j,x,a,e,g]),{activeDescendant:null!==x&&j?j[x]:void 0,descendants:j||null}})(Ee,[ne]),Ie=(0,R.A)(je);(({loading:e,descendants:t,previousActiveDescendant:n,activeDescendant:r,focusReturnEl:o,setFocusReturnEl:a,scrollEl:i})=>{(0,c.useEffect)(()=>{if(e&&t&&t.length&&r){const e=[...t].pop();let n;return(e?.id||void 0)===r.id?(i&&(i.scrollTop=i.scrollHeight-i.offsetHeight),o?.id!==r.id&&(n=setTimeout(()=>{a(e)},0))):o?.id!==r.id&&(n=setTimeout(()=>{a(r)},0)),()=>clearTimeout(n)}},[e,t,n,r,i,o])})({loading:D,descendants:He,previousActiveDescendant:Ie,activeDescendant:je,focusReturnEl:ce,setFocusReturnEl:de,scrollEl:Ee.scope?.querySelector(Ee.scopeSelector)?.querySelector("ul")}),(0,c.useEffect)(()=>{const e=(e=null)=>{if(je){if("true"===je.dataset.expand&&"collapse"!==e)return void(je.querySelector('span[aria-hidden="true"]')??je).click();if("expand"!==e)if("flyout"===F&&se.length>1&&me.length>0){le([...se].slice(0,-1));const e=me.pop();void 0!==e&&de(e),ke()}else"true"===je.dataset.collapse&&je.click()}},t=t=>{switch(t.key){case`Arrow${L(Q)}`:if(B)break;e("expand");break;case`Arrow${L(J)}`:if(B)break;e("collapse");break;case"Escape":if("flyout"===F&&se.length>1&&me.length>0){t.preventDefault(),t.stopPropagation(),le([...se].slice(0,-1));const e=me.pop();void 0!==e&&de(e),ke()}}B&&(" "===t.key||"Spacebar"===t.key)&&t.shiftKey&&(t.preventDefault(),e())};return je&&w?.(xe(je.id)),ve?.addEventListener("keydown",t),()=>ve?.removeEventListener("keydown",t)},[ve,je,se]),(0,c.useEffect)(()=>{const e=setTimeout(()=>{if(a.length===te.current){const e=He?.map(e=>e.id),t=Ee.scope?.querySelector(Ee.scopeSelector)?.querySelectorAll(Ee.selector);if(!t)return void ke();const n=Array.from(t);return n?.length!==e?.length?void ke():void(n.every((t,n)=>t.id===e[n])||ke())}te.current=a.length,ke()},0);return()=>clearTimeout(e)},[a]);const Ce=(0,c.useMemo)(()=>({componentId:o,"aria-label":_,mode:l,arrowNavigationUnsupported:B,onItemClick:(e,t)=>{be&&ee.current?.focus(),$?.(e,t)},onItemActive:w,onItemExpand:x,onItemCollapse:j,itemLayout:i,accent:h,scrollAt:g,emptyText:v,radioName:Y,loadMore:E,loading:D,variant:F,focusControl:ve,updateActiveDescendants:ke,setFocusReturnEl:de,setFocusDescendant:ie,getScopedItemId:we,pushFlyoutId:$e,flyOutActiveIdStack:se,updateParentDescendantStack:ye,expandTo:{parentItemId:he,onComplete:()=>{ge(void 0)}}}),[o,_,l,B,$,w,x,j,i,h,g,v,Y,E,D,F,ve,ke,de,ie,we,$e,se,ye,he]),Se=V??("drill-down"===F?(0,d.jsx)(xt,{items:a,id:N,menuRole:W,"aria-multiselectable":"multi-select"===l,"aria-labelledby":_?`${o}-menuLabel`:void 0}):(0,d.jsx)(Ye,{items:a,menuRole:W}));return(0,d.jsxs)(We,{"data-testid":K.root,id:o,"aria-describedby":be?`${o}-menuDescription`:void 0,...G,ref:ee,tabIndex:be?0:void 0,children:[be&&(0,d.jsx)("span",{id:`${o}-menuDescription`,hidden:!0,children:`${X("menu_selection_instructions")} `&&O||""}),_&&(0,d.jsx)(z.A,{id:`${o}-menuLabel`,children:_}),T&&(0,d.jsx)("header",{"data-popover-scroll-el":!0,children:T}),(0,d.jsx)(_e,{"data-popover-scroll-el":!0,children:(0,d.jsx)(re.Provider,{value:Ce,children:Se})}),(s||P)&&(0,d.jsx)("footer",{"data-popover-scroll-el":!0,children:s?(0,d.jsxs)(m.Ay,{"data-testid":K.createNew,variant:"link",onClick:s,children:[(0,d.jsx)(f.Ay,{name:"plus"})," ",X("create_new")]}):P})]})}),Et=(0,D.A)(kt,Ne),jt="budicon",Ht="arrow-micro-down",It=()=>(0,d.jsx)("path",{d:"M8 9.5h9l-4.402 6-4.597-6H8Z"}),Ct="0 0 25 25",St=(0,J.A)("menu-button",[]);(0,f.pU)(l);const Rt=h.Ay.button(({theme:{base:{spacing:e}}})=>h.AH`
      gap: ${e};
      flex-shrink: 0;
      white-space: nowrap;
      max-width: 100%;

      & + ${E.l} + ${m.OV} {
        margin-inline-start: ${e};
      }
    `);Rt.defaultProps=g.qn;const Lt=h.Ay.span(({theme:e,padIcon:t})=>{const{base:{"hit-area":{"mouse-min":n,"finger-min":r}},components:{icon:{size:{s:o}}}}=e;return h.AH`
    max-width: 100%;

    ${t&&h.AH`
      padding-inline-start: calc((${n} - ${o}) / 2);

      @media (pointer: coarse) {
        padding-inline-start: calc(${r} - ${o} * 2);
      }
    `}

    ${K.D} {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    ${f.vE}:last-child:not(:first-child) {
      /* Offsets the flex gap to make the down arrow appear to trail the text. */
      margin-inline-start: -${e.base.spacing};
    }
  `}),Dt=(0,h.Ay)(j.A)`
  min-width: 20ch;
`,zt=(0,c.forwardRef)(function(e,t){const n=(0,b.A)(),{testId:r,id:o=n,text:a,menu:i,popover:s,onClick:l,icon:u,count:h,iconOnly:g=!1,showArrow:E=!1,...j}=e,H=(0,A.A)(r,St),[I,C]=(0,c.useState)(!1),S=(0,p.A)(t),R=(0,p.A)(s?.ref),L=(0,p.A)(i?.ref);((e,t)=>{const[n,r]=(0,c.useState)(!1),o=(0,c.useRef)(null),{portalTarget:a}=(0,w.A)(),i=a?.ownerDocument?.defaultView||window,s=(0,c.useRef)();(0,c.useEffect)(()=>()=>{s.current?.abort()},[]);const l=(0,c.useCallback)(a=>{if(!n)return;const l=(0,y.A)(a,FocusEvent)?a.relatedTarget:null,c=(0,v.A)(e).flatMap(e=>[e,...(0,$.A)(e)]);if((0,y.A)(l,Node)){const e=c.find(e=>e?.contains(l));if(e)return void(o.current=e)}const d=new AbortController,u=e=>{c.some(t=>e.composedPath().some(e=>(0,y.A)(e,Node)&&t.contains(e)))||(r(!1),t?.(!1,o.current),o.current=null),d.abort()};i?.document?.addEventListener("focusin",u,{once:!0,signal:d.signal}),i?.document?.addEventListener("mouseup",u,{once:!0,signal:d.signal});const p=()=>{r(!1),t?.(!1,o.current),o.current=null,d.abort()};try{window.parent?.document.addEventListener("focusin",p,{once:!0,signal:d.signal}),window.parent?.document.addEventListener("mouseup",p,{once:!0,signal:d.signal})}catch{}s.current=d},[n,t,e]),d=(0,c.useCallback)(e=>{if(!n){r(!0);const n=e.currentTarget;t?.(!0,n),o.current=n}},[n,t]);(0,c.useEffect)(()=>{const t=(e=>(0,v.A)(e).flatMap(e=>[e,...(0,$.A)(e)]).filter(e=>(0,y.A)(e,HTMLElement)))(e);t.forEach(e=>{e?.contains(document.activeElement)&&d(new FocusEvent("focusin",{relatedTarget:document.activeElement}))})},[]),(0,c.useEffect)(()=>{const t=(0,v.A)(e);return t.forEach(e=>{e?.addEventListener("focusin",d),e?.addEventListener("popover:focusin",d),e?.addEventListener("focusout",l),e?.addEventListener("popover:focusout",l)}),()=>{t.forEach(e=>{e?.removeEventListener("focusin",d),e?.removeEventListener("popover:focusin",d),e?.removeEventListener("focusout",l),e?.removeEventListener("popover:focusout",l)})}},[e,d,l])})([R,S],(0,c.useCallback)(e=>{e||C(!1)},[])),(0,x.A)(e=>{I&&(C(!1),e.stopPropagation())},S),(0,x.A)(e=>{I&&(C(!1),e.stopPropagation(),S.current?.focus())},i?.focusControlEl);const{rtl:D}=(0,k.A)();return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(m.Ay,{"data-testid":H.root,as:Rt,"aria-label":a,...j,id:o,ref:S,"aria-expanded":I,"aria-haspopup":"menu","aria-controls":I?`${o}-popover`:void 0,label:g&&!I?a:void 0,onClick:e=>{const t=e.detail>0;I?t&&C(!1):C(!0),I&&!t||l?.(e)},icon:g,children:(0,d.jsxs)(B.A,{as:Lt,container:{alignItems:"center",gap:1},padIcon:g&&E,children:[u&&(0,d.jsx)(f.Ay,{name:u}),!g&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(K.A,{children:a}),"number"==typeof h&&(0,d.jsx)(ye,{children:h})]}),(!g||E)&&(0,d.jsx)(f.Ay,{name:"arrow-micro-down"})]})}),(0,d.jsx)(Dt,{placement:D?"bottom-end":"bottom-start",hideOnTargetHidden:!0,...s,id:`${o}-popover`,show:!!i&&I,target:S.current,ref:R,children:i&&(0,d.jsx)(Et,{testId:H.root,...i,ref:L,items:i.items,onItemClick:(e,t)=>{"multi-select"!==i.mode&&C(!1),i.onItemClick?.(e,t)},focusControlEl:i.focusControlEl||S.current||void 0})})]})}),Mt=(0,D.A)(zt,St),Tt=(0,c.forwardRef)(function({"data-testid":e,items:t,menuAt:n=2,scrollAt:r,iconOnly:o=!0,menuButtonProps:a,contextualLabel:i,compact:s=!1,disabled:l=!1,tabIndex:h},g){const b=(0,u.A)(),A=(0,p.A)(g);return t&&0!==t.length?t.length>=n?(0,d.jsx)(Mt,{...e?{"data-testid":e}:{},ref:A,text:b("actions"),"aria-label":i&&b("actions_for",[i]),iconOnly:!0,icon:"more",variant:"simple",compact:s,onClick:a?.onClick,onKeyDown:a?.onKeyDown,disabled:l,tabIndex:h,menu:{scrollAt:r,items:t.map(({text:e,onClick:t,...n})=>({...n,primary:e,onClick:t?(e,n)=>{t(e,n,A.current??void 0)}:void 0}))}}):(0,d.jsx)(d.Fragment,{children:t.map(({id:t,icon:n,text:r,onClick:a,...u})=>(0,c.createElement)(m.Ay,{...e?{"data-testid":e}:{},key:t,variant:n&&o?"simple":void 0,onClick:e=>a?.(t,e),label:n?r:void 0,icon:!!n&&o,compact:s,"aria-label":i?`${r} - ${i}`:r,disabled:l,...u},n&&o?(0,d.jsx)(f.Ay,{name:n}):r))}):null})},9463:(e,t,n)=>{n.d(t,{A:()=>i});var r=n(1594),o=(n(8347),n(4680)),a=n(7497);const i=()=>{const e=o.A?window.cosmos.configurationContext??a.Q:a.Q;return(0,r.useContext)(e)}},9466:(e,t,n)=>{n.d(t,{A:()=>A});var r=n(4848),o=n(1594),a=n(5206),i=n(1357),s=n(7521),l=n(9586),c=n(9463),d=n(2884),u=n(3456),p=n(4853),m=n(7501),f=n(405);const h=(0,o.forwardRef)(function({value:e,minValue:t=0,maxValue:n=100,message:o,placement:a,style:i,...s},l){let c=e;return"number"==typeof e&&(c=e>n||t>n?0:e<t?100:-100*(1-(e-t)/(n-t))),(0,r.jsx)(f.QS,{ref:l,role:"progressbar","aria-valuemin":t,"aria-valuemax":n,"aria-valuenow":e,placement:a,determinate:"number"==typeof e,style:{...i,"--progress":c?`${c}%`:""},...s})}),g=(0,o.forwardRef)(function({message:e,placement:t,...n},o){return(0,r.jsx)(f.wE,{ref:o,role:"progressbar",placement:t,...n,children:(0,r.jsxs)("span",{children:[(0,r.jsx)("span",{}),(0,r.jsx)("span",{}),(0,r.jsx)("span",{})]})})}),b={ring:(0,o.forwardRef)(function({value:e,minValue:t=0,maxValue:n=100,placement:o,...a},i){let s;const l=18*Math.PI;return s="number"!=typeof e?(1-.33)*l:e>n||t>n?0:e<t?l:(1-(e-t)/(n-t))*l,(0,r.jsx)(f.pT,{ref:i,role:"progressbar","aria-valuemin":t,"aria-valuemax":n,"aria-valuenow":e,placement:o,determinate:"number"==typeof e,...a,children:(0,r.jsxs)("svg",{viewBox:"0 0 20 20",children:[(0,r.jsx)("circle",{}),(0,r.jsx)("circle",{strokeDasharray:l,style:{strokeDashoffset:s}})]})})}),bar:h,ellipsis:g},A=(0,o.forwardRef)(function({variant:e="ring",placement:t="global",visible:n=!0,focusOnVisible:h=!1,delay:g=!1,onTransitionStartIn:A,onTransitionEndIn:v,onTransitionStartOut:$,onTransitionEndOut:y,value:w,message:x,liveConfig:k,...E},j){const H=(0,l.A)(),{portalTarget:I}=(0,c.A)(),{announcePolite:C}=(0,d.A)(),S=(0,u.A)(),R=(0,p.A)(j),[L,D]=(0,o.useState)(!g&&n),[z,M]=(0,o.useState)(!L),T=(0,o.useRef)(),P=(0,o.useRef)(),F=(0,o.useRef)(),q=(0,o.useRef)(),B="global"===t||"local"===t,O="number"==typeof w?`${w}%`:void 0,_=x&&O?`${x} - ${O}`:x||O,W=()=>{D(!0),M(!1)},N=()=>{D(!1),B||M(!0)};if((0,o.useEffect)(()=>{if(n)T.current=Date.now(),g?F.current=window.setTimeout(W,100):W();else if(void 0!==F.current)if(clearTimeout(F.current),void 0!==P.current){const e=Date.now()-P.current;e>=1e3?N():q.current=window.setTimeout(N,1e3-e)}else N();else N()},[n]),(0,o.useEffect)(()=>{k?.contextualLabel&&L&&C({message:`${k.contextualLabel}, ${_??H("loading")}`,type:"status"})},[L]),(0,o.useEffect)(()=>{!z&&L&&(P.current=Date.now(),h&&R.current?.focus())},[z]),z)return null;const U=b[e];let V=(0,r.jsx)(U,{"aria-label":"number"!=typeof w&&_?_:H("loading"),as:"inline"===t?"span":void 0,...E,placement:t,value:w,"aria-valuetext":"number"==typeof w?_:void 0,ref:R,tabIndex:-1});"inline"!==t&&(V=(0,r.jsxs)(m.A,{container:{direction:"column",alignItems:"center",gap:.5},as:f.r3,placement:t,children:[V,x&&(0,r.jsx)(s.A,{as:f.z5,variant:"secondary","aria-hidden":!0,children:x})]}));const Z=(0,i.J1)(S.base.palette["foreground-color"])>.5?"dark":"light",G=B?(0,r.jsx)(f.D2,{open:L,container:{direction:"column"},position:"global"===t?"fixed":"absolute",variant:Z,alpha:.8,onBeforeTransitionIn:A,onAfterTransitionIn:v,onBeforeTransitionOut:$,onAfterTransitionOut:()=>{M(!0),y?.()},children:V}):V;return"global"===t&&I?(0,a.createPortal)(G,I):G})},9576:(e,t,n)=>{n.d(t,{A:()=>r});const r=(e,t,n)=>{const r=`pega-${e}`;return Object.entries(n??{}).reduce((e,[t,n])=>("string"==typeof n?e.push(`${r}-${t}-${n}`):!0===n&&e.push(`${r}-${t}`),e),t?[t,r]:[r]).join(" ")}},9586:(e,t,n)=>{n.d(t,{A:()=>i});var r=n(1594),o=n(4848);var a=n(9463);const i=()=>{const{translations:e,locale:t}=(0,a.A)();return(0,r.useMemo)(()=>((e,t)=>{const n=new Intl.PluralRules(t),a=new Intl.PluralRules(t,{type:"ordinal"});return(t,i=[],s)=>{let l=e[t];if(!l)return`!unknown key: ${t}`;const c=[];return"object"==typeof l&&(l=l[("ordinal"===s?.pluralType?a:n).select(s?.count||0)]),l.split(/\{(\d+)\}/g).forEach((e,t)=>{const n=t%2?i[Number(e)]:e;void 0!==n&&""!==n&&c.push(n)}),c.every(e=>"string"==typeof e||"number"==typeof e)?c.join("").trim():c.map((e,t)=>(0,o.jsx)(r.Fragment,{children:e},t))}})(e,t),[e,t])}},9721:(e,t,n)=>{n.d(t,{ox:()=>m,oF:()=>f,J0:()=>g,Af:()=>h,Ik:()=>p,Ay:()=>$});var r=n(4848),o=n(1594),a=n(8267),i=n(6883),s=n(9549),l=n(405),c=n(8579),d=n(4869);const u=(0,n(8044).A)("summary-item",["primary","secondary","visual","actions"]),p=a.Ay.div`
  > ${l.pT}, img {
    display: block;
    object-fit: cover;
    width: 2rem;
    height: 2rem;
  }
`;p.defaultProps=s.qn;const m=(0,a.Ay)(i.A)(({theme:e,isString:t,overflowStrategy:n})=>a.AH`
    ${"ellipsis"===n?a.AH`
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        `:a.AH`
          word-break: break-word;
        `}

    ${t&&a.AH`
      font-weight: ${e.base["font-weight"]["semi-bold"]};
    `}
  `);m.defaultProps=s.qn;const f=(0,a.Ay)(i.A)(({overflowStrategy:e})=>a.AH`
    ${"ellipsis"===e?a.AH`
          overflow: hidden;
          text-overflow: ellipsis;
        `:a.AH`
          word-break: break-word;
        `}
  `),h=a.Ay.div`
  white-space: nowrap;
`,g=a.Ay.div``,b=({visual:e,actions:t})=>`${e?"auto ":""}minmax(0, 1fr)${t?" auto":""}`,A=({secondary:e,layout:t,visual:n,actions:r})=>`"${n?"visual ":""}primary${e&&"inline"===t?" secondary":""}${r?" actions":""}"${e&&"stacked"===t?`\n"${n?"visual ":""}secondary${r?" actions":""}"`:""}`,v=(0,o.forwardRef)(function({testId:e,visual:t,primary:n,secondary:o,layout:a="stacked",actions:s,container:l,overflowStrategy:d="wrap",as:v,...$},y){const w=(0,c.A)(e,u);return(0,r.jsxs)(i.A,{"data-testid":w.root,...$,ref:y,container:{cols:b({visual:t,actions:s}),colGap:2,areas:A({secondary:o,layout:a,visual:t,actions:s}),...l},as:g,forwardedAs:v,children:[t&&(0,r.jsx)(i.A,{"data-testid":w.visual,as:p,item:{area:"visual",alignSelf:"center"},children:t}),(0,r.jsx)(m,{"data-testid":w.primary,item:{area:"primary",alignSelf:o&&"stacked"===a?"end":"center"},isString:"string"==typeof n,overflowStrategy:d,children:n}),o&&(0,r.jsx)(f,{"data-testid":w.secondary,item:{area:"secondary",alignSelf:"stacked"===a?"start":"center"},overflowStrategy:d,children:o}),s&&(0,r.jsx)(i.A,{"data-testid":w.actions,as:h,item:{area:"actions",alignSelf:"center"},children:s})]})}),$=(0,d.A)(v,u)},9749:(e,t,n)=>{n.d(t,{A:()=>o});const r=(e=document)=>{let t=e.activeElement;return t?("iframe"===t.tagName.toLowerCase()&&t.contentDocument&&(t=r(t.contentDocument)??t),t.shadowRoot&&(t=r(t.shadowRoot)??t),t):null},o=r}}]);
//# sourceMappingURL=Aja100_22553069.f2946268.js.map