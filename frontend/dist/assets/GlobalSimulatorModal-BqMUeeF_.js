import{r as l,j as e}from"./index-BC19Iu_T.js";const o=[{code:"BR",name:"Brasil",currency:"BRL",flag:"🇧🇷"},{code:"US",name:"Estados Unidos",currency:"USD",flag:"🇺🇸"},{code:"EU",name:"Europa",currency:"EUR",flag:"🇪🇺"},{code:"GB",name:"Reino Unido",currency:"GBP",flag:"🇬🇧"},{code:"CA",name:"Canadá",currency:"CAD",flag:"🇨🇦"},{code:"SG",name:"Singapura",currency:"SGD",flag:"🇸🇬"},{code:"AU",name:"Austrália",currency:"AUD",flag:"🇦🇺"},{code:"MX",name:"México",currency:"MXN",flag:"🇲🇽"},{code:"JP",name:"Japão",currency:"JPY",flag:"🇯🇵"},{code:"IN",name:"Índia",currency:"INR",flag:"🇮🇳"}],u=({isOpen:d,onClose:c,onConfirm:n})=>{const[s,r]=l.useState("provider"),[i,x]=l.useState(null);if(!d)return null;const t=a=>{x(a),a==="syncpay"?(n("syncpay",o.find(m=>m.code==="BR")),r("provider")):r("country")},p=a=>{i&&(n(i,a),r("provider"))},f=()=>r("provider");return e.jsxs("div",{className:"simulator-modal fixed inset-0 bg-black/90 z-[150] flex items-center justify-center p-4 backdrop-blur-md animate-fade-in",onClick:c,children:[e.jsx("style",{children:`
                .simulator-card { 
                    background: #0c0f14; 
                    border-radius: 28px; 
                    padding: 24px; 
                    width: 100%; 
                    max-width: 400px; 
                    border: 1px solid rgba(0, 194, 255, 0.3); 
                    box-shadow: 0 20px 60px rgba(0,0,0,0.8);
                    position: relative;
                }
                
                .step-indicator {
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                    margin-bottom: 20px;
                }
                .dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.1); }
                .dot.active { background: #00c2ff; box-shadow: 0 0 10px #00c2ff; }

                .provider-btn {
                    width: 100%;
                    padding: 18px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                    transition: 0.2s;
                    margin-bottom: 10px;
                }
                .provider-btn:hover { border-color: #00c2ff; background: rgba(0, 194, 255, 0.05); }

                .country-grid { 
                    display: grid; 
                    grid-template-columns: repeat(2, 1fr); 
                    gap: 10px; 
                    max-height: 400px;
                    overflow-y: auto;
                    padding-right: 5px;
                }
                .country-btn { 
                    background: rgba(255,255,255,0.03); 
                    border: 1px solid rgba(255,255,255,0.08); 
                    padding: 14px; 
                    border-radius: 16px; 
                    display: flex; 
                    align-items: center; 
                    gap: 10px;
                    cursor: pointer; 
                    transition: 0.2s; 
                    font-size: 13px;
                }
                .country-btn:hover { background: #00c2ff11; border-color: #00c2ff; }
            `}),e.jsxs("div",{className:"simulator-card animate-pop-in",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"text-center mb-6",children:[e.jsx("h3",{className:"text-lg font-black text-white uppercase tracking-tight",children:s==="provider"?"1. Escolha o Provedor":"2. Escolha o Mercado"}),e.jsxs("div",{className:"step-indicator",children:[e.jsx("div",{className:`dot ${s==="provider"?"active":""}`}),e.jsx("div",{className:`dot ${s==="country"?"active":""}`})]})]}),s==="provider"?e.jsxs("div",{className:"animate-fade-in",children:[e.jsxs("button",{className:"provider-btn",onClick:()=>t("syncpay"),children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-10 h-10 bg-[#00ff8211] rounded-xl flex items-center justify-center text-[#00ff82]",children:e.jsx("i",{className:"fa-solid fa-bolt"})}),e.jsxs("div",{className:"text-left",children:[e.jsx("span",{className:"block text-sm font-bold",children:"SyncPay"}),e.jsx("span",{className:"block text-[10px] text-gray-500 font-bold uppercase",children:"Brasil (Pix/Boleto)"})]})]}),e.jsx("i",{className:"fa-solid fa-chevron-right text-gray-800 text-xs"})]}),e.jsxs("button",{className:"provider-btn",onClick:()=>t("stripe"),children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-10 h-10 bg-[#635bff11] rounded-xl flex items-center justify-center text-[#635bff]",children:e.jsx("i",{className:"fa-brands fa-stripe"})}),e.jsxs("div",{className:"text-left",children:[e.jsx("span",{className:"block text-sm font-bold",children:"Stripe"}),e.jsx("span",{className:"block text-[10px] text-gray-500 font-bold uppercase",children:"Global (Cartão/Local)"})]})]}),e.jsx("i",{className:"fa-solid fa-chevron-right text-gray-800 text-xs"})]}),e.jsxs("button",{className:"provider-btn",onClick:()=>t("paypal"),children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-10 h-10 bg-[#00308711] rounded-xl flex items-center justify-center text-[#003087]",children:e.jsx("i",{className:"fa-brands fa-paypal"})}),e.jsxs("div",{className:"text-left",children:[e.jsx("span",{className:"block text-sm font-bold",children:"PayPal"}),e.jsx("span",{className:"block text-[10px] text-gray-500 font-bold uppercase",children:"Carteira Digital"})]})]}),e.jsx("i",{className:"fa-solid fa-chevron-right text-gray-800 text-xs"})]})]}):e.jsxs("div",{className:"animate-fade-in",children:[e.jsx("div",{className:"country-grid no-scrollbar",children:o.map(a=>e.jsxs("button",{className:"country-btn",onClick:()=>p(a),children:[e.jsx("span",{className:"text-xl grayscale-0",children:a.flag}),e.jsx("span",{className:"truncate font-bold",children:a.name})]},a.code))}),e.jsxs("button",{className:"w-full mt-6 py-2 text-[#00c2ff] font-bold text-[10px] uppercase tracking-widest",onClick:f,children:[e.jsx("i",{className:"fa-solid fa-arrow-left mr-2"})," Voltar ao Provedor"]})]}),e.jsx("button",{className:"w-full mt-8 py-2 text-gray-600 font-black uppercase text-[10px] tracking-[3px] hover:text-white transition-colors",onClick:c,children:"Cancelar"})]})]})};export{u as GlobalSimulatorModal,o as PREVIEW_COUNTRIES};
