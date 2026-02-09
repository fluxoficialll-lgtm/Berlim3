import{u as z,f as _,r as i,j as e,c as D,g as k,w as B}from"./index-BC19Iu_T.js";const R=()=>{const u=z(),{id:s}=_(),[d,x]=i.useState([]),[f,m]=i.useState(0),[c,l]=i.useState(!0),[h,b]=i.useState("");i.useEffect(()=>{(async()=>{const a=D.getCurrentUser();if(!a||!s){l(!1);return}const p=k.getGroupById(s);p&&b(p.name);try{const o=(await B.getTransactions(a.email)).filter(r=>{const n=["paid","completed","approved","settled"].includes((r.status||"").toLowerCase());return r.groupId===s&&n});o.sort((r,n)=>{const S=new Date(r.created_at||r.createdAt||r.date_created||0).getTime();return new Date(n.created_at||n.createdAt||n.date_created||0).getTime()-S}),x(o);const N=o.reduce((r,n)=>r+(parseFloat(n.amount)||0),0);m(N)}catch(g){console.error("Erro ao carregar histórico técnico:",g)}finally{l(!1)}})()},[s]);const y=t=>{if(!t)return"-";try{return new Date(t).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"})}catch{return t}},j=t=>{const a=(t||"").toLowerCase();return["paid","completed","approved","settled"].includes(a)?"Aprovado":["pending","processing","created"].includes(a)?"Pendente":["expired","cancelled","failed"].includes(a)?"Expirado":a||"Desconhecido"},v=t=>{const a=(t||"").toLowerCase();return["paid","completed","approved","settled"].includes(a)?"approved":["pending","processing","created"].includes(a)?"pending":"failed"},w=t=>t.payer&&t.payer.name?t.payer.name:t.payer_email?t.payer_email.split("@")[0]:"Cliente Desconhecido";return e.jsxs("div",{className:"min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-x-hidden",children:[e.jsx("style",{children:`
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Inter',sans-serif; }
        
        header {
            display:flex; align-items:center; justify-content:space-between; padding:16px;
            background: #0c0f14; position:fixed; width:100%; z-index:10;
            border-bottom:1px solid rgba(255,255,255,0.1); top: 0; height: 65px;
        }
        header button {
            background:none; border:none; color:#fff; font-size:24px; cursor:pointer;
            transition:0.3s; padding-right: 15px;
        }
        header h1 { font-size:20px; font-weight:600; }
        
        main {
            padding-top: 90px; padding-bottom: 40px;
            width: 100%; max-width: 600px; margin: 0 auto; padding-left: 20px; padding-right: 20px;
        }

        .sales-summary {
            background: rgba(255,215,0,0.1); border: 1px solid rgba(255,215,0,0.3);
            border-radius: 12px; padding: 20px; margin-bottom: 25px; text-align: center;
        }
        .total-label { font-size: 14px; color: #FFD700; text-transform: uppercase; letter-spacing: 1px; }
        .total-amount { font-size: 32px; font-weight: 800; color: #fff; margin-top: 5px; }

        .sale-item {
            background: rgba(255,255,255,0.05); border-radius: 10px; padding: 15px;
            margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;
            border: 1px solid rgba(255,255,255,0.05);
        }
        .sale-info h3 { font-size: 15px; font-weight: 600; margin-bottom: 4px; color: #fff; }
        .sale-info p { font-size: 11px; color: #aaa; }
        
        .sale-value { text-align: right; display: flex; flex-direction: column; align-items: flex-end; }
        .amount { font-size: 16px; font-weight: 700; color: #00ff82; }
        
        .status { font-size: 11px; padding: 2px 8px; border-radius: 4px; background: rgba(255,255,255,0.1); display: inline-block; margin-top: 4px; font-weight: 600; text-transform: uppercase; }
        .status.pending { color: #ffaa00; background: rgba(255,170,0,0.15); }
        .status.approved { color: #00ff82; background: rgba(0,255,130,0.15); }
        .status.failed { color: #ff4d4d; background: rgba(255,77,77,0.15); }

        .loading-container { text-align: center; color: #777; margin-top: 50px; }
        .empty-state { text-align: center; color: #777; padding: 30px; font-size: 14px; }
      `}),e.jsxs("header",{children:[e.jsx("button",{onClick:()=>u(-1),"aria-label":"Voltar",children:e.jsx("i",{className:"fa-solid fa-arrow-left"})}),e.jsx("h1",{children:"Histórico de Vendas"})]}),e.jsxs("main",{children:[e.jsxs("div",{className:"sales-summary",children:[e.jsx("div",{className:"total-label",children:"Total Faturado"}),e.jsx("div",{className:"total-amount",children:c?"...":`R$ ${f.toLocaleString("pt-BR",{minimumFractionDigits:2})}`}),e.jsxs("p",{style:{fontSize:"12px",color:"#aaa",marginTop:"5px"},children:["Grupo: ",h||"Carregando..."]})]}),e.jsx("h3",{style:{marginBottom:"15px",color:"#aaa",fontSize:"13px",textTransform:"uppercase",fontWeight:"700"},children:"Últimas Transações"}),c?e.jsxs("div",{className:"loading-container",children:[e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin text-2xl mb-2"}),e.jsx("p",{children:"Buscando dados..."})]}):d.length>0?d.map((t,a)=>e.jsxs("div",{className:"sale-item",children:[e.jsxs("div",{className:"sale-info",children:[e.jsx("h3",{children:w(t)}),e.jsx("p",{children:y(t.created_at||t.createdAt||t.date_created)})]}),e.jsxs("div",{className:"sale-value",children:[e.jsxs("div",{className:"amount",children:["R$ ",parseFloat(t.amount||0).toLocaleString("pt-BR",{minimumFractionDigits:2})]}),e.jsx("div",{className:`status ${v(t.status)}`,children:j(t.status)})]})]},t.id||a)):e.jsxs("div",{className:"empty-state",children:[e.jsx("i",{className:"fa-solid fa-receipt text-4xl mb-3 opacity-30"}),e.jsx("p",{children:"Nenhuma venda registrada para este grupo ainda."})]})]})]})};export{R as VipSalesHistory};
