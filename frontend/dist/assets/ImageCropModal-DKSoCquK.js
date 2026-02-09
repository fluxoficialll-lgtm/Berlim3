import{r as n,j as t}from"./index-BC19Iu_T.js";const X=({isOpen:c,imageSrc:p,onClose:m,onSave:N})=>{const[r,l]=n.useState(1),[o,x]=n.useState({x:0,y:0}),[g,h]=n.useState(!1),[b,k]=n.useState({x:0,y:0}),M=n.useRef(null),d=n.useRef(null);if(n.useEffect(()=>{c&&(l(1),x({x:0,y:0}))},[c,p]),!c)return null;const j=e=>{h(!0);const s="touches"in e?e.touches[0].clientX:e.clientX,a="touches"in e?e.touches[0].clientY:e.clientY;k({x:s-o.x,y:a-o.y})},y=e=>{if(!g)return;const s="touches"in e?e.touches[0].clientX:e.clientX,a="touches"in e?e.touches[0].clientY:e.clientY;x({x:s-b.x,y:a-b.y})},u=()=>h(!1),C=()=>{if(!d.current)return;const e=document.createElement("canvas"),s=400;e.width=s,e.height=s;const a=e.getContext("2d");if(a){const f=d.current,w=f.width*r,v=f.height*r,i=s/280;a.fillStyle="#000",a.fillRect(0,0,s,s);const R=o.x*i+s/2-w*i/2,S=o.y*i+s/2-v*i/2;a.drawImage(f,R,S,w*i,v*i),N(e.toDataURL("image/jpeg",.9)),m()}};return t.jsxs("div",{className:"fixed inset-0 z-[200] bg-black flex flex-col animate-fade-in touch-none",children:[t.jsx("style",{children:`
                .crop-mask {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    background: radial-gradient(circle 140px at center, transparent 100%, rgba(0,0,0,0.7) 100%);
                    border: 2px solid rgba(0, 194, 255, 0.3);
                    border-radius: 50%;
                    width: 280px;
                    height: 280px;
                    margin: auto;
                    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.8);
                }
                .image-container {
                    flex: 1;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #050505;
                }
                .draggable-img {
                    max-width: none;
                    cursor: move;
                    user-select: none;
                    touch-action: none;
                }
                .crop-footer {
                    background: #0c0f14;
                    padding: 30px 20px;
                    border-top: 1px solid rgba(255,255,255,0.1);
                }
                .zoom-slider {
                    width: 100%;
                    height: 6px;
                    -webkit-appearance: none;
                    background: #1e2531;
                    border-radius: 3px;
                    outline: none;
                    margin-bottom: 25px;
                }
                .zoom-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 24px;
                    height: 24px;
                    background: #00c2ff;
                    border-radius: 50%;
                    cursor: pointer;
                }
            `}),t.jsxs("header",{className:"flex justify-between items-center p-5 bg-[#0c0f14] border-b border-white/10",children:[t.jsx("button",{onClick:m,className:"text-white text-sm font-bold uppercase tracking-widest opacity-70",children:"Cancelar"}),t.jsx("h2",{className:"text-white font-bold",children:"Ajustar Foto"}),t.jsx("button",{onClick:C,className:"text-[#00c2ff] text-sm font-bold uppercase tracking-widest",children:"Concluir"})]}),t.jsxs("div",{className:"image-container",ref:M,onMouseDown:j,onMouseMove:y,onMouseUp:u,onMouseLeave:u,onTouchStart:j,onTouchMove:y,onTouchEnd:u,children:[t.jsx("img",{ref:d,src:p,className:"draggable-img",draggable:!1,style:{transform:`translate(${o.x}px, ${o.y}px) scale(${r})`,transition:g?"none":"transform 0.1s ease-out"},alt:"To crop"}),t.jsx("div",{className:"crop-mask"}),t.jsx("div",{className:"absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 text-[10px] uppercase font-bold tracking-widest pointer-events-none",children:"Arraste para enquadrar"})]}),t.jsxs("div",{className:"crop-footer",children:[t.jsxs("div",{className:"flex items-center gap-4 mb-4",children:[t.jsx("i",{className:"fa-solid fa-minus text-gray-500 text-xs"}),t.jsx("input",{type:"range",min:"1",max:"3",step:"0.01",value:r,onChange:e=>l(parseFloat(e.target.value)),className:"zoom-slider"}),t.jsx("i",{className:"fa-solid fa-plus text-gray-500 text-xs"})]}),t.jsxs("div",{className:"flex justify-center gap-8",children:[t.jsxs("button",{onClick:()=>x({x:0,y:0}),className:"text-gray-400 text-xs flex flex-col items-center gap-1",children:[t.jsx("i",{className:"fa-solid fa-arrows-to-dot"})," Centralizar"]}),t.jsxs("button",{onClick:()=>l(1),className:"text-gray-400 text-xs flex flex-col items-center gap-1",children:[t.jsx("i",{className:"fa-solid fa-maximize"})," Resetar Zoom"]})]})]})]})};export{X as I};
