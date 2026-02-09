import{r as o,j as e}from"./index-BC19Iu_T.js";const N=({isOpen:n,onClose:c,onSave:g,initialData:a,initialPlatform:i})=>{const[h,x]=o.useState("selection"),[l,f]=o.useState(null),[b,s]=o.useState(""),[u,r]=o.useState("");o.useEffect(()=>{n&&(i?m(i):(x("selection"),f(null)))},[n,i]);const m=t=>{f(t),x("form"),t==="meta"?(s(a.metaId||""),r(a.metaToken||"")):t==="tiktok"?(s(a.tiktokId||""),r(a.tiktokToken||"")):t==="google"?(s(a.googleId||""),r("")):t==="x"&&(s(a.xId||""),r(""))},k=()=>{l&&(g(l,{pixelId:b,pixelToken:u}),c())};if(!n)return null;const d={meta:{name:"Meta (Facebook)",icon:"fa-brands fa-facebook",color:"#1877F2",hasToken:!0},tiktok:{name:"TikTok Ads",icon:"fa-brands fa-tiktok",color:"#00f2ea",hasToken:!0},google:{name:"Google Ads",icon:"fa-brands fa-google",color:"#4285F4",hasToken:!1},x:{name:"X / Twitter",icon:"fa-brands fa-x-twitter",color:"#fff",hasToken:!1}};return e.jsxs("div",{className:"fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 backdrop-blur-md animate-fade-in",onClick:t=>t.target===t.currentTarget&&c(),children:[e.jsx("style",{children:`
                .pixel-modal-card {
                    width: 100%;
                    max-width: 380px;
                    background: #1a1e26;
                    border: 1px solid rgba(0, 194, 255, 0.2);
                    border-radius: 32px;
                    padding: 32px 24px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
                    animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .p-opt-btn {
                    width: 100%;
                    padding: 16px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    cursor: pointer;
                    transition: 0.2s;
                    margin-bottom: 10px;
                    text-align: left;
                }
                .p-opt-btn:hover {
                    background: rgba(255, 255, 255, 0.06);
                    border-color: rgba(0, 194, 255, 0.3);
                }
                .p-opt-btn i {
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 10px;
                    font-size: 18px;
                }
                .input-field {
                    width: 100%;
                    background: #0c0f14;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 14px 16px;
                    border-radius: 12px;
                    color: #fff;
                    outline: none;
                    font-size: 15px;
                }
                .input-field:focus {
                    border-color: #00c2ff;
                }
            `}),e.jsx("div",{className:"pixel-modal-card",onClick:t=>t.stopPropagation(),children:h==="selection"?e.jsxs(e.Fragment,{children:[e.jsx("h2",{className:"text-xl font-black text-white mb-6 text-center uppercase tracking-tight",children:"Hub de Marketing"}),e.jsx("div",{className:"space-y-1",children:Object.entries(d).map(([t,p])=>e.jsxs("button",{className:"p-opt-btn",onClick:()=>m(t),children:[e.jsx("i",{className:p.icon,style:{color:p.color}}),e.jsxs("div",{className:"flex-1",children:[e.jsx("div",{className:"text-sm font-bold text-white",children:p.name}),e.jsx("div",{className:"text-[10px] text-gray-600 uppercase font-black",children:"Pixel & CAPI"})]}),e.jsx("i",{className:"fa-solid fa-chevron-right text-gray-800 text-xs"})]},t))}),e.jsx("button",{className:"w-full mt-6 py-2 text-gray-600 text-[10px] font-black uppercase tracking-widest hover:text-white",onClick:c,children:"Cancelar"})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center gap-4 mb-8",children:[e.jsx("button",{onClick:()=>x("selection"),className:"w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400",children:e.jsx("i",{className:"fa-solid fa-arrow-left"})}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-bold text-white",children:d[l].name}),e.jsx("p",{className:"text-[10px] text-gray-500 uppercase font-black tracking-widest",children:"Configuração de Pixel"})]})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"input-group mb-0",children:[e.jsx("label",{className:"text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2",children:"Pixel ID / Measurement ID"}),e.jsx("input",{type:"text",className:"input-field",placeholder:"Ex: 123456789...",value:b,onChange:t=>s(t.target.value),autoFocus:!0})]}),d[l].hasToken&&e.jsxs("div",{className:"input-group mb-0",children:[e.jsx("label",{className:"text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2",children:"Token de Acesso (API / CAPI)"}),e.jsx("input",{type:"text",className:"input-field",placeholder:"Cole o token aqui...",value:u,onChange:t=>r(t.target.value)}),e.jsx("p",{className:"text-[9px] text-gray-600 mt-2",children:"Necessário para rastreamento server-side à prova de bloqueadores."})]}),e.jsx("button",{className:"w-full py-4 bg-[#00c2ff] text-black font-black rounded-2xl uppercase text-xs shadow-lg shadow-[#00c2ff]/20 active:scale-95 transition-all",onClick:k,children:"Salvar Configuração"})]})]})})]})};export{N as P};
