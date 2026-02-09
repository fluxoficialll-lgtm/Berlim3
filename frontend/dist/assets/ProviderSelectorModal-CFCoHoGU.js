import{u as l,r as x,c as f,j as e}from"./index-BC19Iu_T.js";const g=({isOpen:d,onClose:t,selectedProviderId:o,onSelect:s})=>{const p=l(),n=x.useMemo(()=>{const r=f.getCurrentUser();if(!r)return[];const i=[];return r.paymentConfig?.isConnected&&i.push({id:r.paymentConfig.providerId,name:r.paymentConfig.providerId==="syncpay"?"SyncPay (Pix)":r.paymentConfig.providerId.toUpperCase(),icon:r.paymentConfig.providerId==="syncpay"?"fa-bolt":"fa-credit-card"}),r.paymentConfigs&&Object.values(r.paymentConfigs).forEach(a=>{a.isConnected&&!i.find(c=>c.id===a.providerId)&&i.push({id:a.providerId,name:a.providerId==="syncpay"?"SyncPay (Pix)":a.providerId==="stripe"?"Stripe (Global)":a.providerId==="paypal"?"PayPal":a.providerId.toUpperCase(),icon:a.providerId==="syncpay"?"fa-bolt":a.providerId==="stripe"?"fa-brands fa-stripe":a.providerId==="paypal"?"fa-brands fa-paypal":"fa-wallet"})}),i},[]);return d?e.jsxs("div",{className:"fixed inset-0 bg-black/90 z-[130] flex items-center justify-center p-4 backdrop-blur-md animate-fade-in",onClick:r=>r.target===r.currentTarget&&t(),children:[e.jsx("style",{children:`
                .provider-modal-card {
                    width: 100%;
                    max-width: 360px;
                    background: #1a1e26;
                    border: 1px solid rgba(0, 194, 255, 0.3);
                    border-radius: 24px;
                    padding: 30px 24px;
                    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.6);
                    animation: popIn 0.3s ease;
                }
                .provider-opt {
                    width: 100%;
                    padding: 16px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 2px solid transparent;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    cursor: pointer;
                    transition: 0.2s;
                    margin-bottom: 12px;
                    text-align: left;
                }
                .provider-opt:hover {
                    background: rgba(255, 255, 255, 0.06);
                    transform: translateY(-2px);
                }
                .provider-opt.active {
                    border-color: #00c2ff;
                    background: rgba(0, 194, 255, 0.05);
                }
                .provider-icon-box {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 194, 255, 0.1);
                    color: #00c2ff;
                    font-size: 18px;
                    flex-shrink: 0;
                }
                .provider-info h4 {
                    font-size: 15px;
                    font-weight: 700;
                    color: #fff;
                    margin: 0;
                }
                .no-providers-box {
                    text-align: center;
                    padding: 20px 0;
                }
                .connect-now-btn {
                    width: 100%;
                    padding: 16px;
                    background: #00c2ff;
                    color: #000;
                    border-radius: 12px;
                    font-weight: 800;
                    border: none;
                    cursor: pointer;
                    margin-top: 15px;
                    box-shadow: 0 4px 15px rgba(0, 194, 255, 0.3);
                }
            `}),e.jsxs("div",{className:"provider-modal-card",children:[e.jsx("h2",{className:"text-xl font-bold text-center mb-6 text-white",children:"Escolher Provedor"}),n.length>0?e.jsx("div",{className:"space-y-1",children:n.map(r=>e.jsxs("button",{className:`provider-opt ${o===r.id?"active":""}`,onClick:()=>{s(r.id),t()},children:[e.jsx("div",{className:"provider-icon-box",children:e.jsx("i",{className:`fa-solid ${r.icon}`})}),e.jsx("div",{className:"provider-info",children:e.jsx("h4",{children:r.name})}),o===r.id&&e.jsx("i",{className:"fa-solid fa-circle-check ml-auto text-[#00c2ff]"})]},r.id))}):e.jsxs("div",{className:"no-providers-box",children:[e.jsx("i",{className:"fa-solid fa-plug-circle-exclamation text-4xl text-gray-600 mb-4"}),e.jsx("p",{className:"text-sm text-gray-400",children:"Nenhum provedor configurado. Você precisa conectar uma conta para vender."}),e.jsx("button",{className:"connect-now-btn",onClick:()=>p("/financial/providers"),children:"CONFIGURAR AGORA"})]}),e.jsx("button",{className:"w-full mt-6 py-2 text-gray-500 font-bold uppercase text-[10px] tracking-widest hover:text-white transition-colors",onClick:t,children:"Fechar"})]})]}):null};export{g as P};
