import{r as s,j as e,c as b,u as w}from"./index-BC19Iu_T.js";import{s as N,p as P}from"./paypalService-Dk5je5dH.js";const S=({isConnected:m,onStatusChange:f})=>{const[t,n]=s.useState(!1),[i,x]=s.useState(localStorage.getItem("flux_preferred_provider")==="syncpay"),[c,o]=s.useState({type:null,message:""});s.useEffect(()=>{const r=()=>x(localStorage.getItem("flux_preferred_provider")==="syncpay");return window.addEventListener("storage",r),()=>window.removeEventListener("storage",r)},[]);const h=async()=>{n(!0),o({type:null,message:""});try{const r={providerId:"syncpay",isConnected:!0};await b.updatePaymentConfig(r),localStorage.getItem("flux_preferred_provider")||(localStorage.setItem("flux_preferred_provider","syncpay"),x(!0)),f("syncpay",!0),o({type:"success",message:"Conectado com sucesso! Redirecionando..."})}catch(r){o({type:"error",message:r.message||"Falha na conexão com o provedor."})}finally{n(!1)}},g=()=>{localStorage.setItem("flux_preferred_provider","syncpay"),x(!0),window.dispatchEvent(new Event("storage"))},u=async()=>{if(window.confirm("Deseja desconectar o SyncPay? Isso desativará o Pix nos seus grupos VIP.")){n(!0);try{await b.updatePaymentConfig({providerId:"syncpay",isConnected:!1}),localStorage.getItem("flux_preferred_provider")==="syncpay"&&localStorage.removeItem("flux_preferred_provider"),f("syncpay",!1)}catch{alert("Erro ao desconectar")}finally{n(!1)}}};return m?e.jsxs("div",{className:"animate-fade-in",style:{textAlign:"center",padding:"10px"},children:[e.jsxs("div",{className:"flex items-center justify-center gap-3 mb-6",children:[e.jsxs("div",{className:"feedback-msg success !mt-0",children:[e.jsx("i",{className:"fa-solid fa-circle-check"})," SyncPay Ativo"]}),e.jsx("button",{onClick:g,className:`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all ${i?"text-[#00c2ff] border-[#00c2ff]/50 bg-[#00c2ff]/10":"text-gray-400 hover:text-[#00c2ff]"}`,title:i?"Ativo no Painel":"Definir como Principal",children:e.jsx("i",{className:"fa-solid fa-star"})})]}),e.jsx("button",{className:"disconnect-btn",onClick:u,disabled:t,children:t?e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin"}):"Desconectar Provedor"})]}):e.jsxs("div",{className:"animate-fade-in",children:[e.jsxs("div",{className:"p-4 text-center bg-gray-800/20 rounded-lg",children:[e.jsx("p",{className:"text-sm text-gray-400 mb-4",children:"Conecte sua conta SyncPay para começar a receber pagamentos via PIX em seus grupos VIP."}),e.jsxs("button",{className:"save-btn",onClick:h,disabled:t,children:[t?e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin mr-2"}):null,t?"Conectando...":"Conectar SyncPay"]})]}),c.message&&e.jsxs("div",{className:`feedback-msg ${c.type} mt-4`,children:[e.jsx("i",{className:`fa-solid ${c.type==="success"?"fa-check":"fa-triangle-exclamation"}`}),c.message]})]})},C=({isConnected:m,onStatusChange:f})=>{const[t,n]=s.useState(!1),[i,x]=s.useState(""),[c,o]=s.useState(localStorage.getItem("flux_preferred_provider")==="stripe");s.useEffect(()=>{const r=()=>o(localStorage.getItem("flux_preferred_provider")==="stripe");return window.addEventListener("storage",r),()=>window.removeEventListener("storage",r)},[]);const h=async()=>{if(i){n(!0);try{await N.authenticate(i);const r={providerId:"stripe",clientSecret:i,isConnected:!0};await b.updatePaymentConfig(r),f("stripe",!0)}catch{alert("Erro na conexão com Stripe")}finally{n(!1)}}},g=()=>{localStorage.setItem("flux_preferred_provider","stripe"),o(!0),window.dispatchEvent(new Event("storage"))},u=async()=>{if(window.confirm("Deseja desconectar a Stripe?")){n(!0);try{await b.updatePaymentConfig({providerId:"stripe",isConnected:!1}),localStorage.getItem("flux_preferred_provider")==="stripe"&&localStorage.removeItem("flux_preferred_provider"),f("stripe",!1)}catch{alert("Erro ao desconectar")}finally{n(!1)}}};return m?e.jsxs("div",{className:"animate-fade-in",style:{textAlign:"center",padding:"10px"},children:[e.jsxs("div",{className:"flex items-center justify-center gap-3 mb-6",children:[e.jsxs("div",{className:"feedback-msg success !mt-0",children:[e.jsx("i",{className:"fa-solid fa-circle-check"})," Stripe Conectada"]}),e.jsx("button",{onClick:g,className:`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all ${c?"text-[#00c2ff] border-[#00c2ff]/50 bg-[#00c2ff]/10":"text-gray-400 hover:text-[#00c2ff]"}`,title:"Ver no Painel",children:e.jsx("i",{className:"fa-solid fa-eye"})})]}),e.jsx("button",{className:"disconnect-btn",onClick:u,disabled:t,children:t?e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin"}):"Desconectar"})]}):e.jsxs("div",{className:"animate-fade-in",children:[e.jsxs("div",{className:"input-group",children:[e.jsx("label",{children:"Secret Key (sk_...)"}),e.jsx("input",{type:"password",value:i,onChange:r=>x(r.target.value),placeholder:"Sua sk_live ou sk_test"})]}),e.jsx("button",{className:"save-btn",onClick:h,disabled:t,children:t?e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin"}):"Conectar Stripe"})]})},k=({isConnected:m,onStatusChange:f})=>{const[t,n]=s.useState(""),[i,x]=s.useState(""),[c,o]=s.useState(!1),[h,g]=s.useState(localStorage.getItem("flux_preferred_provider")==="paypal");s.useEffect(()=>{const a=()=>g(localStorage.getItem("flux_preferred_provider")==="paypal");return window.addEventListener("storage",a),()=>window.removeEventListener("storage",a)},[]);const u=async()=>{if(!(!t||!i)){o(!0);try{await P.authenticate(t,i);const a={providerId:"paypal",clientId:t,clientSecret:i,isConnected:!0};await b.updatePaymentConfig(a),f("paypal",!0)}catch{alert("Erro na conexão com PayPal")}finally{o(!1)}}},r=()=>{localStorage.setItem("flux_preferred_provider","paypal"),g(!0),window.dispatchEvent(new Event("storage"))},y=async()=>{if(window.confirm("Deseja desconectar o PayPal?")){o(!0);try{await b.updatePaymentConfig({providerId:"paypal",isConnected:!1}),localStorage.getItem("flux_preferred_provider")==="paypal"&&localStorage.removeItem("flux_preferred_provider"),f("paypal",!1)}catch{alert("Erro ao desconectar")}finally{o(!1)}}};return m?e.jsxs("div",{className:"animate-fade-in",style:{textAlign:"center",padding:"10px"},children:[e.jsxs("div",{className:"flex items-center justify-center gap-3 mb-6",children:[e.jsxs("div",{className:"feedback-msg success !mt-0",children:[e.jsx("i",{className:"fa-solid fa-circle-check"})," PayPal Conectado"]}),e.jsx("button",{onClick:r,className:`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all ${h?"text-[#00c2ff] border-[#00c2ff]/50 bg-[#00c2ff]/10":"text-gray-400 hover:text-[#00c2ff]"}`,title:"Ver no Painel",children:e.jsx("i",{className:"fa-solid fa-eye"})})]}),e.jsx("button",{className:"disconnect-btn",onClick:y,disabled:c,children:c?e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin"}):"Desconectar"})]}):e.jsxs("div",{className:"animate-fade-in",children:[e.jsxs("div",{className:"input-group",children:[e.jsx("label",{children:"Client ID"}),e.jsx("input",{type:"text",value:t,onChange:a=>n(a.target.value),placeholder:"PayPal Client ID"})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{children:"Secret Key"}),e.jsx("input",{type:"password",value:i,onChange:a=>x(a.target.value),placeholder:"PayPal Secret Key"})]}),e.jsx("button",{className:"save-btn",onClick:u,disabled:c,children:c?e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin"}):"Conectar PayPal"})]})},E=()=>{const m=w(),[f,t]=s.useState(null),[n,i]=s.useState(new Set),x=s.useRef(!1),c=s.useMemo(()=>[{id:"syncpay",name:"SyncPay (Oficial)",icon:"fa-bolt",isPrimary:!0,status:"active",methods:[{type:"pix",label:"PIX"}]},{id:"stripe",name:"Stripe",icon:"fa-brands fa-stripe",status:"active",methods:[{type:"card",label:"Cartão"}]},{id:"paypal",name:"PayPal",icon:"fa-brands fa-paypal",status:"active",methods:[{type:"pix",label:"PIX"},{type:"card",label:"Cartão"}]},{id:"picpay",name:"PicPay",icon:"fa-qrcode",status:"coming_soon",methods:[{type:"pix",label:"PIX"},{type:"card",label:"Cartão"}]}],[]);s.useEffect(()=>{(()=>{const l=b.getCurrentUser();if(l){const d=new Set;l.paymentConfigs&&Object.values(l.paymentConfigs).forEach(p=>{p.isConnected&&d.add(p.providerId)}),l.paymentConfig&&l.paymentConfig.isConnected&&d.add(l.paymentConfig.providerId),i(d),x.current||(d.size>0?t(Array.from(d)[0]):t("syncpay"),x.current=!0)}})()},[]);const o=(a,l)=>{i(d=>{const p=new Set(d);return l?p.add(a):(p.delete(a),f===a&&t(null)),p})},h=a=>{t(l=>l===a?null:a)},g=()=>{window.history.state&&window.history.state.idx>0?m(-1):m("/financial")},u=c.filter(a=>n.has(a.id)),r=c.filter(a=>!n.has(a.id)),y=a=>{const l=f===a.id,d=a.status==="coming_soon",p=n.has(a.id);return e.jsxs("div",{className:`provider-card ${a.isPrimary?"primary":""} ${p?"connected":""}`,style:{opacity:d?.6:1},children:[e.jsxs("div",{className:"provider-header",onClick:()=>!d&&h(a.id),children:[e.jsxs("div",{className:"provider-info",children:[e.jsx("div",{className:"provider-icon",style:{filter:d?"grayscale(100%)":"none"},children:e.jsx("i",{className:`fa-solid ${a.icon}`})}),e.jsxs("div",{className:"provider-name",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[a.name,p&&e.jsx("i",{className:"fa-solid fa-circle-check text-[#00ff82] text-xs"})]}),e.jsx("div",{className:"method-indicators",children:a.methods.map((v,j)=>e.jsxs("div",{className:"method-item",children:[e.jsx("div",{className:`method-dot ${p?"active":""}`}),v.label]},j))}),d&&e.jsx("span",{className:"badge-soon",children:"Em Breve"})]})]}),!d&&e.jsx("i",{className:`fa-solid fa-chevron-down arrow-icon ${l?"expanded":""}`})]}),l&&!d&&e.jsxs("div",{className:"provider-body",children:[a.id==="syncpay"&&e.jsx(S,{isConnected:p,onStatusChange:o}),a.id==="stripe"&&e.jsx(C,{isConnected:p,onStatusChange:o}),a.id==="paypal"&&e.jsx(k,{isConnected:p,onStatusChange:o})]})]},a.id)};return e.jsxs("div",{className:"min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-x-hidden",children:[e.jsx("style",{children:`
        header {
            display:flex; align-items:center; padding:16px 24px;
            background: #0c0f14; position:fixed; width:100%; top:0; z-index:10;
            border-bottom:1px solid rgba(255,255,255,0.1); height: 65px;
        }
        header button { background:none; border:none; color:#00c2ff; font-size:24px; cursor:pointer; padding-right: 15px; }
        header h1 { font-size:18px; font-weight:700; color:#fff; }
        
        main { padding: 90px 20px 40px 20px; max-width: 600px; margin: 0 auto; width: 100%; }

        .section-header {
            font-size: 10px; font-weight: 900; color: #555; text-transform: uppercase;
            letter-spacing: 2px; margin: 30px 0 15px 5px; display: flex; align-items: center; gap: 10px;
        }
        .section-header span { flex-grow: 1; height: 1px; background: rgba(255,255,255,0.05); }
        
        .provider-card {
            background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
            border-radius: 20px; margin-bottom: 12px; overflow: hidden; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .provider-card.primary { border-color: rgba(0, 194, 255, 0.3); background: rgba(0, 194, 255, 0.02); }
        .provider-card.connected { border-color: rgba(0, 255, 130, 0.2); }
        
        .provider-header {
            display: flex; align-items: center; justify-content: space-between;
            padding: 20px; cursor: pointer; transition: 0.2s;
        }
        .provider-header:hover { background: rgba(255,255,255,0.03); }

        .provider-info { display: flex; align-items: center; gap: 15px; }
        .provider-icon {
            width: 44px; height: 44px; border-radius: 12px;
            background: #1a1e26; color: #00c2ff;
            display: flex; align-items: center; justify-content: center; font-size: 20px;
            border: 1px solid rgba(255,255,255,0.05);
        }
        
        .provider-name { font-size: 15px; font-weight: 800; color: #fff; display: flex; flex-direction: column; }
        .method-indicators { display: flex; gap: 12px; margin-top: 6px; }
        .method-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #666; font-weight: 700; text-transform: uppercase; }
        .method-dot { width: 6px; height: 6px; border-radius: 50%; background: #333; }
        .method-dot.active { background: #00ff82; box-shadow: 0 0 8px rgba(0, 255, 130, 0.4); }

        .arrow-icon { color: #555; transition: 0.3s; font-size: 14px; }
        .arrow-icon.expanded { transform: rotate(180deg); color: #00c2ff; }
        
        .provider-body { padding: 5px 20px 25px 20px; border-top: 1px solid rgba(255,255,255,0.03); animation: slideDown 0.3s ease; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

        .input-group { margin-bottom: 18px; }
        .input-group label { display: block; font-size: 11px; font-weight: 800; color: #555; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 1px; }
        .input-group input { 
            width: 100%; background: #0c0f14; border: 1px solid rgba(255,255,255,0.1); 
            padding: 14px; border-radius: 12px; color: #fff; font-size: 14px; outline: none; transition: 0.3s;
        }
        .input-group input:focus { border-color: #00c2ff; box-shadow: 0 0 15px rgba(0,194,255,0.1); }

        .save-btn {
            width: 100%; padding: 16px; background: #00c2ff; color: #000; border: none;
            border-radius: 14px; font-weight: 900; font-size: 14px; cursor: pointer;
            transition: 0.3s; text-transform: uppercase; letter-spacing: 1px;
            display: flex; align-items: center; justify-content: center; gap: 10px;
            box-shadow: 0 4px 15px rgba(0,194,255,0.2);
        }
        .save-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,194,255,0.4); }
        .save-btn:active { transform: scale(0.98); }
        .save-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .disconnect-btn {
            width: 100%; padding: 12px; background: rgba(255, 77, 77, 0.05); color: #ff4d4d;
            border: 1px solid rgba(255, 77, 77, 0.2); border-radius: 12px; font-weight: 800;
            font-size: 12px; cursor: pointer; transition: 0.3s; text-transform: uppercase;
        }
        .disconnect-btn:hover { background: rgba(255, 77, 77, 0.15); border-color: #ff4d4d; }

        .feedback-msg {
            margin-top: 15px; padding: 12px; border-radius: 10px; font-size: 12px;
            display: flex; align-items: center; gap: 8px; font-weight: 700;
        }
        .feedback-msg.success { background: rgba(0, 255, 130, 0.1); color: #00ff82; border: 1px solid rgba(0, 255, 130, 0.2); }
        .feedback-msg.error { background: rgba(255, 77, 77, 0.1); color: #ff4d4d; border: 1px solid rgba(255, 77, 77, 0.2); }

        .badge-soon { background: rgba(255,255,255,0.05); color: #444; font-size: 9px; padding: 2px 6px; border-radius: 4px; font-weight: 900; margin-top: 5px; align-self: flex-start; text-transform: uppercase; }
      `}),e.jsxs("header",{children:[e.jsx("button",{onClick:g,children:e.jsx("i",{className:"fa-solid fa-arrow-left"})}),e.jsx("h1",{children:"Provedores de Pagamento"})]}),e.jsxs("main",{className:"no-scrollbar",children:[u.length>0&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section-header",children:[e.jsx("span",{})," Conectados ",e.jsx("span",{})]}),u.map(y)]}),e.jsxs("div",{className:"section-header",children:[e.jsx("span",{})," Disponíveis ",e.jsx("span",{})]}),r.map(y),e.jsxs("div",{className:"mt-12 p-6 bg-white/[0.02] border border-dashed border-white/5 rounded-2xl text-center opacity-30",children:[e.jsx("i",{className:"fa-solid fa-shield-halved text-2xl mb-3"}),e.jsx("p",{className:"text-[10px] uppercase font-black tracking-[2px] leading-relaxed",children:"Suas credenciais são criptografadas e enviadas via túnel seguro. O Flux não armazena chaves privadas em texto aberto."})]})]})]})};export{E as ProviderConfig};
