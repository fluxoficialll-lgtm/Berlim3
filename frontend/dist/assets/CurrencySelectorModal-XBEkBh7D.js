import{r as l,j as r}from"./index-BC19Iu_T.js";const x=({isOpen:n,onClose:i,currentCurrency:a,onSelect:c,allowedCurrencies:t})=>{if(!n)return null;const o=[{id:"BRL",label:"Real Brasileiro",symbol:"R$",color:"#00ff82"},{id:"USD",label:"Dólar Americano",symbol:"$",color:"#00c2ff"},{id:"EUR",label:"Euro",symbol:"€",color:"#ffd700"}],s=l.useMemo(()=>!t||t.length===0?o:o.filter(e=>t.includes(e.id)),[t]);return r.jsxs("div",{className:"fixed inset-0 bg-black/90 z-[120] flex items-center justify-center p-4 backdrop-blur-md animate-fade-in",onClick:e=>e.target===e.currentTarget&&i(),children:[r.jsx("style",{children:`
                .currency-modal-card {
                    width: 100%;
                    max-width: 360px;
                    background: #1a1e26;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 24px;
                    padding: 30px 20px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                    animation: popIn 0.3s ease;
                }
                .currency-option {
                    width: 100%;
                    padding: 14px 18px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 2px solid transparent;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    cursor: pointer;
                    transition: 0.2s;
                    margin-bottom: 10px;
                    text-align: left;
                }
                .currency-option:hover {
                    background: rgba(255, 255, 255, 0.06);
                }
                .currency-option.active {
                    border-color: #00c2ff;
                    background: rgba(0, 194, 255, 0.05);
                }
                .curr-icon-box {
                    width: 44px;
                    height: 40px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    font-weight: 900;
                    flex-shrink: 0;
                }
                .curr-info { flex-grow: 1; }
                .curr-info h4 { font-size: 15px; font-weight: 700; color: #fff; margin: 0; }
                .curr-info span { font-size: 13px; color: #888; font-weight: 800; }
            `}),r.jsxs("div",{className:"currency-modal-card",children:[r.jsx("h2",{className:"text-xl font-bold text-center mb-6 text-white",children:"Moeda do Grupo"}),r.jsxs("div",{className:"space-y-1",children:[s.map(e=>r.jsxs("button",{className:`currency-option ${a===e.id?"active":""}`,onClick:()=>{c(e.id),i()},children:[r.jsx("div",{className:"curr-icon-box",style:{background:`${e.color}1a`,color:e.color},children:e.symbol}),r.jsxs("div",{className:"curr-info",children:[r.jsx("h4",{children:e.label}),r.jsx("span",{className:"text-white",children:e.id})]}),a===e.id&&r.jsx("i",{className:"fa-solid fa-circle-check text-[#00c2ff]"})]},e.id)),s.length===0&&r.jsx("div",{className:"text-center py-10 opacity-40",children:r.jsx("p",{className:"text-sm",children:"Nenhuma moeda disponível para este gateway."})})]}),r.jsx("button",{className:"w-full mt-6 py-3 text-gray-500 font-bold uppercase text-xs hover:text-white transition-colors",onClick:i,children:"Fechar"})]})]})};export{x as C};
