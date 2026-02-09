import{r,j as e,u as V,c as G,w as L}from"./index-BC19Iu_T.js";import{P as Y}from"./PixelSettingsModal-DKkwl8oi.js";const A={BRL:{symbol:"R$",color:"#00ff82",label:"Real"},USD:{symbol:"$",color:"#00c2ff",label:"Dólar"},EUR:{symbol:"€",color:"#ffd700",label:"Euro"}},K=({stats:c,selectedFilter:a,filters:o,onFilterChange:h,onRefresh:d,loading:v,showCurrencySwitch:u})=>{const[s,S]=r.useState("BRL"),N=c[s],x=A[s],f=n=>{const b=s==="BRL"?"pt-BR":s==="USD"?"en-US":"de-DE";return n.toLocaleString(b,{minimumFractionDigits:2,maximumFractionDigits:2})};return e.jsxs("div",{className:"flux-card bg-white/5 border border-white/10 rounded-[20px] p-6 mb-5 shadow-2xl relative animate-fade-in overflow-hidden",children:[e.jsx("style",{children:`
                .currency-pill {
                    padding: 6px 12px;
                    border-radius: 10px;
                    font-size: 11px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: 0.2s;
                    border: 1px solid rgba(255,255,255,0.05);
                    background: rgba(255,255,255,0.02);
                    color: #555;
                }
                .currency-pill.active {
                    color: #fff;
                    background: rgba(255,255,255,0.1);
                }
            `}),e.jsxs("div",{className:"flex justify-between items-start mb-6",children:[u?e.jsx("div",{className:"flex gap-2 p-1 bg-black/20 rounded-xl border border-white/5",children:["BRL","USD","EUR"].map(n=>e.jsxs("button",{className:`currency-pill ${s===n?"active":""}`,onClick:()=>S(n),style:{borderColor:s===n?A[n].color:void 0},children:[A[n].symbol," ",n]},n))}):e.jsx("div",{className:"text-[11px] font-black text-gray-500 uppercase tracking-widest",children:"Saldo em Conta"}),e.jsx("button",{className:"bg-[#00c2ff]/10 text-[#00c2ff] border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-all hover:bg-[#00c2ff]/20",onClick:d,disabled:v,children:e.jsx("i",{className:`fa-solid fa-rotate-right ${v?"fa-spin":""}`})})]}),e.jsxs("div",{className:"balance-label text-[13px] text-white/40 mb-1 uppercase tracking-widest",children:[e.jsx("i",{className:"fa-solid fa-chart-line mr-2"}),a==="Disponível"?"Saldo Total":`Faturamento (${a})`]}),e.jsxs("div",{className:"balance-amount text-[42px] font-extrabold mb-2.5 flex items-baseline gap-2 transition-all duration-500",style:{color:x.color,textShadow:`0 0 20px ${x.color}33`},children:[e.jsx("span",{className:"text-[20px] font-semibold text-white/50",children:x.symbol}),f(N.total)]}),e.jsxs("div",{className:"breakdown bg-black/30 rounded-2xl p-4 mb-5 flex flex-col gap-3 border border-white/5",children:[e.jsxs("div",{className:"breakdown-item flex justify-between text-[13px]",children:[e.jsxs("span",{className:"flex items-center gap-2 text-gray-400",children:[e.jsx("div",{className:"w-1.5 h-1.5 rounded-full",style:{background:x.color}}),"Vendas Próprias"]}),e.jsxs("span",{className:"font-bold text-white",children:[x.symbol," ",f(N.own)]})]}),e.jsxs("div",{className:"breakdown-item flex justify-between text-[13px]",children:[e.jsxs("span",{className:"flex items-center gap-2 text-gray-400",children:[e.jsx("div",{className:"w-1.5 h-1.5 rounded-full bg-[#FFD700]"}),"Comissões Afiliados"]}),e.jsxs("span",{className:"font-bold text-white",children:[x.symbol," ",f(N.affiliate)]})]})]}),e.jsx("div",{className:"filter-container flex gap-2 overflow-x-auto pb-3 no-scrollbar mb-4 border-b border-white/5",children:o.map(n=>e.jsx("button",{className:`filter-chip px-4 py-2 rounded-full border text-[12px] font-bold transition-all whitespace-nowrap cursor-pointer ${a===n?"bg-[#00c2ff]/15 border-[#00c2ff] text-[#00c2ff]":"bg-white/5 border-white/10 text-white/40"}`,onClick:()=>h(n),children:n},n))})]})},H=({isOpen:c,onClose:a,sellers:o,onDismissSeller:h})=>{const[d,v]=r.useState(""),u=r.useMemo(()=>o.filter(s=>s.name.toLowerCase().includes(d.toLowerCase())||s.username.toLowerCase().includes(d.toLowerCase())),[o,d]);return c?e.jsxs("div",{className:"fixed inset-0 bg-black/90 z-[120] flex items-center justify-center p-4 backdrop-blur-md animate-fade-in",onClick:s=>s.target===s.currentTarget&&a(),children:[e.jsx("style",{children:`
                .sellers-modal-card {
                    width: 100%;
                    max-width: 400px;
                    background: #1a1e26;
                    border: 1px solid rgba(255, 215, 0, 0.3);
                    border-radius: 24px;
                    display: flex;
                    flex-direction: column;
                    max-height: 85vh;
                    overflow: hidden;
                    box-shadow: 0 0 50px rgba(255, 215, 0, 0.1);
                    animation: popIn 0.3s ease;
                }
                .search-wrapper {
                    position: relative;
                    padding: 20px;
                    background: rgba(255, 255, 255, 0.02);
                    border-bottom: 1px solid rgba(255, 215, 0, 0.1);
                }
                .search-wrapper i {
                    position: absolute;
                    left: 35px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #FFD700;
                }
                .search-input {
                    width: 100%;
                    background: #0c0f14;
                    border: 1px solid rgba(255, 215, 0, 0.2);
                    border-radius: 12px;
                    padding: 12px 12px 12px 40px;
                    color: #fff;
                    outline: none;
                    font-size: 14px;
                }
                .search-input:focus { border-color: #FFD700; }
                
                .sellers-list {
                    flex: 1;
                    overflow-y: auto;
                    padding: 10px 0;
                }
                .seller-card-item {
                    display: flex;
                    align-items: center;
                    padding: 15px 20px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
                    transition: 0.2s;
                }
                .seller-card-item:hover { background: rgba(255, 215, 0, 0.03); }
                
                .seller-avatar {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    border: 2px solid #FFD700;
                    object-fit: cover;
                    background: #333;
                }
                .seller-info { flex: 1; margin-left: 12px; min-width: 0; }
                .seller-name { font-weight: 700; font-size: 15px; color: #fff; display: block; }
                .seller-user { font-size: 12px; color: #888; }
                
                .seller-values { text-align: right; margin-left: 10px; }
                .value-earned { font-size: 14px; font-weight: 800; color: #00ff82; }
                .sales-count { font-size: 10px; color: #aaa; text-transform: uppercase; }

                .dismiss-btn {
                    padding: 6px 12px;
                    background: rgba(255, 77, 77, 0.1);
                    border: 1px solid rgba(255, 77, 77, 0.3);
                    color: #ff4d4d;
                    border-radius: 8px;
                    font-size: 10px;
                    font-weight: 800;
                    cursor: pointer;
                    margin-top: 5px;
                    text-transform: uppercase;
                    transition: 0.2s;
                }
                .dismiss-btn:hover { background: #ff4d4d; color: #fff; }

                .modal-footer {
                    padding: 15px;
                    text-align: center;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }
                .count-badge {
                    background: rgba(255, 215, 0, 0.1);
                    color: #FFD700;
                    padding: 4px 10px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 700;
                }
            `}),e.jsxs("div",{className:"sellers-modal-card",children:[e.jsxs("div",{className:"flex items-center justify-between px-5 pt-5",children:[e.jsxs("h2",{className:"text-lg font-bold text-white uppercase tracking-wider",children:[e.jsx("i",{className:"fa-solid fa-users mr-2 text-[#FFD700]"})," Vendedores"]}),e.jsxs("span",{className:"count-badge",children:[o.length," Indicados"]})]}),e.jsxs("div",{className:"search-wrapper",children:[e.jsx("i",{className:"fa-solid fa-magnifying-glass"}),e.jsx("input",{type:"text",className:"search-input",placeholder:"Buscar por nome ou @usuário...",value:d,onChange:s=>v(s.target.value)})]}),e.jsx("div",{className:"sellers-list no-scrollbar",children:u.length>0?u.map(s=>e.jsxs("div",{className:"seller-card-item",children:[s.avatar?e.jsx("img",{src:s.avatar,className:"seller-avatar",alt:"S"}):e.jsx("div",{className:"seller-avatar flex items-center justify-center text-lg text-[#FFD700]",children:e.jsx("i",{className:"fa-solid fa-user"})}),e.jsxs("div",{className:"seller-info",children:[e.jsx("span",{className:"seller-name truncate",children:s.name||"Vendedor"}),e.jsxs("span",{className:"seller-user",children:["@",s.username]}),e.jsx("div",{children:e.jsx("button",{className:"dismiss-btn",onClick:()=>{window.confirm(`Deseja dispensar @${s.username}? Você deixará de receber comissões sobre as vendas deste parceiro.`)&&h(s.id)},children:"Dispensar Vendedor"})})]}),e.jsxs("div",{className:"seller-values",children:[e.jsxs("div",{className:"value-earned",children:["R$ ",s.totalGenerated.toLocaleString("pt-BR",{minimumFractionDigits:2})]}),e.jsxs("div",{className:"sales-count",children:[s.salesCount," vendas"]})]})]},s.id)):e.jsxs("div",{className:"text-center py-20 opacity-30",children:[e.jsx("i",{className:"fa-solid fa-user-slash text-4xl mb-4"}),e.jsx("p",{className:"text-sm",children:"Nenhum vendedor encontrado."})]})}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{className:"w-full py-3 text-gray-500 font-bold uppercase text-xs hover:text-white transition-colors",onClick:a,children:"Fechar Lista"})})]})]}):null},W=({affiliateStats:c,pixelId:a,setPixelId:o,pixelToken:h,setPixelToken:d,isSavingMarketing:v,onSaveMarketing:u,onCopyAffiliateLink:s,isCopyingLink:S,onOpenTracking:N})=>{const[x,f]=r.useState(!1),[n,b]=r.useState(!1),C=p=>{alert(`Vendedor ${p} dispensado. O sistema deixará de atribuir comissões deste usuário à sua conta.`)};return e.jsxs("div",{className:"flux-card bg-white/5 border border-[#FFD700]/30 rounded-[20px] p-6 mb-5 shadow-2xl animate-fade-in",style:{background:"rgba(255, 215, 0, 0.03)"},children:[e.jsx("style",{children:`
                .add-pixel-btn {
                    width: 100%;
                    padding: 14px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px dashed #FFD700;
                    border-radius: 12px;
                    color: #FFD700;
                    font-weight: 700;
                    font-size: 14px;
                    cursor: pointer;
                    transition: 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 20px;
                }
                .add-pixel-btn:hover {
                    background: rgba(255, 215, 0, 0.1);
                    border-style: solid;
                }
                .pixel-active-badge {
                    font-size: 10px;
                    color: #00ff82;
                    text-align: center;
                    margin-top: 8px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                }
                .sellers-btn {
                    width: 100%;
                    padding: 14px;
                    background: #1a1e26;
                    border: 1px solid rgba(255, 215, 0, 0.2);
                    border-radius: 12px;
                    color: #fff;
                    font-weight: 700;
                    font-size: 13px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 15px;
                    transition: 0.3s;
                }
                .sellers-btn:hover {
                    border-color: #FFD700;
                    background: rgba(255, 215, 0, 0.05);
                }
                .seller-count-tag {
                    background: #FFD700;
                    color: #000;
                    padding: 2px 8px;
                    border-radius: 6px;
                    font-size: 11px;
                    font-weight: 900;
                }
            `}),e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-[14px] text-[#FFD700] font-bold uppercase tracking-wider",children:[e.jsx("i",{className:"fa-solid fa-users-rays mr-2"})," Programa de Afiliados"]}),e.jsx("div",{className:"bg-[#FFD700] text-black px-2 py-0.5 rounded text-[10px] font-black uppercase",children:"Master"})]}),e.jsxs("button",{className:"w-full py-4 bg-[#FFD700] text-black border-none rounded-xl font-black cursor-pointer flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-[0_4px_15px_rgba(255,215,0,0.2)]",onClick:s,children:[e.jsx("i",{className:`fa-solid ${S?"fa-check":"fa-link"}`}),S?"LINK COPIADO!":"LINK DE RECRUTAMENTO"]}),e.jsxs("button",{className:"w-full py-3 mt-3 bg-transparent border border-dashed border-[#FFD700]/50 text-[#FFD700] rounded-xl font-bold text-[13px] cursor-pointer flex items-center justify-center gap-2 transition-all hover:bg-[#FFD700]/10",onClick:N,children:[e.jsx("i",{className:"fa-solid fa-bullseye"})," GERAR LINK RASTREÁVEL (UTM)"]}),e.jsxs("div",{className:"marketing-section mt-5 pt-5 border-t border-[#FFD700]/20",children:[e.jsxs("label",{className:"block text-[11px] text-gray-400 font-bold uppercase mb-1 tracking-widest text-center",children:[e.jsx("i",{className:"fa-solid fa-rocket mr-1"})," Rastreamento de Recrutamento"]}),e.jsxs("button",{className:"add-pixel-btn",onClick:()=>f(!0),children:[e.jsx("i",{className:`fa-solid ${a?"fa-gear":"fa-plus-circle"}`}),a?"CONFIGURAR PIXEL":"ADICIONAR PIXEL"]}),a&&e.jsxs("div",{className:"pixel-active-badge animate-fade-in",children:[e.jsx("i",{className:"fa-solid fa-circle-check"})," Pixel Ativo (PageView, Lead)"]})]}),e.jsxs("button",{className:"sellers-btn",onClick:()=>b(!0),children:[e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx("i",{className:"fa-solid fa-users text-[#FFD700]"}),"Vendedores Indicados"]}),e.jsx("span",{className:"seller-count-tag",children:c?.referredSellers.length||0})]}),e.jsx("p",{className:"text-[10px] text-gray-500 text-center mt-4 px-4 italic",children:"Acompanhe o desempenho de sua rede de vendedores e gerencie suas comissões ativas."}),e.jsx(Y,{isOpen:x,onClose:()=>f(!1),initialData:{pixelId:a,pixelToken:h},onSave:p=>{o(p.pixelId),d(p.pixelToken),u(p)}}),e.jsx(H,{isOpen:n,onClose:()=>b(!1),sellers:c?.referredSellers||[],onDismissSeller:C})]})},X=({activeProvider:c,onManage:a})=>{const o=!!c;return e.jsxs("div",{className:"flux-card bg-white/5 border border-white/10 rounded-[20px] p-6 shadow-2xl animate-fade-in",children:[e.jsxs("div",{className:"text-[16px] font-bold text-white mb-4",children:[e.jsx("i",{className:"fa-solid fa-plug text-[#00c2ff] mr-2"})," Gateway de Pagamento"]}),e.jsxs("div",{className:`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-bold uppercase mb-4 ${o?"bg-[#00ff82]/10 text-[#00ff82]":"bg-red-500/10 text-red-500"}`,children:[e.jsx("div",{className:`w-1.5 h-1.5 rounded-full ${o?"bg-[#00ff82] shadow-[0_0_5px_#00ff82]":"bg-red-500 shadow-[0_0_5px_#ff4d4d]"}`}),o?e.jsxs("span",{children:[c," Selecionado"]}):e.jsx("span",{children:"Nenhum Provedor Ativo"})]}),e.jsx("button",{className:"w-full py-4 bg-[#1e2531] border border-[#00c2ff] text-[#00c2ff] text-[15px] font-extrabold rounded-xl cursor-pointer transition-all hover:bg-[#00c2ff]/10",onClick:a,children:o?"TROCAR GATEWAY":"CONECTAR AGORA"})]})},ee=()=>{const c=V(),[a,o]=r.useState("Disponível"),[h,d]=r.useState(""),[v,u]=r.useState(!0),[s,S]=r.useState("syncpay"),[N,x]=r.useState({BRL:{total:0,own:0,affiliate:0},USD:{total:0,own:0,affiliate:0},EUR:{total:0,own:0,affiliate:0}}),[f,n]=r.useState([]),[b,C]=r.useState({BRL:0,USD:0,EUR:0}),[p,P]=r.useState(null),[U,B]=r.useState(""),[T,M]=r.useState(""),[O,q]=r.useState(!1),[I,J]=r.useState(!1),_=["Disponível","Hoje","Ontem","7d","30d","180d"],E=r.useCallback(()=>{const i=new Date,m=new Date(i.getFullYear(),i.getMonth(),i.getDate()).getTime(),w=1440*60*1e3,y=(t=>{switch(t){case"Hoje":return m;case"Ontem":return m-w;case"7d":return i.getTime()-7*w;case"30d":return i.getTime()-30*w;case"180d":return i.getTime()-180*w;default:return 0}})(a),g=a==="Disponível",l={BRL:{total:0,own:0,affiliate:0},USD:{total:0,own:0,affiliate:0},EUR:{total:0,own:0,affiliate:0}};g?(l.BRL.total=b.BRL||0,l.USD.total=b.USD||0,l.EUR.total=b.EUR||0,l.BRL.affiliate=p?.totalEarned||0,l.BRL.own=Math.max(0,l.BRL.total-l.BRL.affiliate)):(Array.isArray(f)&&f.forEach(t=>{const j=(t.status||"").toLowerCase();if(!["paid","completed","approved","settled"].includes(j))return;const k=new Date(t.created_at||t.createdAt||t.date_created||0).getTime();if(a==="Ontem"?k>=y&&k<m:k>=y){const R=(t.currency||"BRL").toUpperCase();l[R]&&(l[R].own+=parseFloat(t.amount||0),l[R].total+=parseFloat(t.amount||0))}}),p?.recentSales?.forEach(t=>{const j=t.timestamp;(a==="Ontem"?j>=y&&j<m:j>=y)&&(l.BRL.affiliate+=t.commission,l.BRL.total+=t.commission)})),x(l)},[a,f,b,p]),F=async()=>{u(!0);const i=G.getCurrentUser(),m=localStorage.getItem("flux_preferred_provider")||"syncpay";if(S(m),i){const w=i.paymentConfigs?.syncpay?.isConnected||i.paymentConfig?.providerId==="syncpay",D=i.paymentConfigs?.stripe?.isConnected,y=i.paymentConfigs?.paypal?.isConnected;let g="";if(m==="syncpay"&&w?g="SyncPay":m==="stripe"&&D?g="Stripe":m==="paypal"&&y?g="PayPal":w?g="SyncPay":D?g="Stripe":y&&(g="PayPal"),d(g),w||D||y)try{const t=await L.getBalance(i.email);C(m==="syncpay"?{BRL:t,USD:0,EUR:0}:{BRL:t,USD:t/5,EUR:t/5.4});const j=await L.getTransactions(i.email);n(Array.isArray(j)?j:[]);const k=await L.getAffiliateStats(i.email);P(k)}catch(t){console.error("Erro dados financeiros",t)}}u(!1)};r.useEffect(()=>{F();const i=()=>F();return window.addEventListener("storage",i),()=>window.removeEventListener("storage",i)},[]),r.useEffect(()=>{E()},[E]);const z=()=>c("/settings");return e.jsxs("div",{className:"h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-y-auto overflow-x-hidden",children:[e.jsxs("header",{className:"flex items-center justify-between p-4 bg-[#0c0f14] fixed w-full z-10 border-b border-white/10 top-0 h-[65px]",children:[e.jsx("button",{onClick:z,"aria-label":"Voltar",children:e.jsx("i",{className:"fa-solid fa-arrow-left"})}),e.jsx("h1",{className:"text-[20px] font-semibold",children:"Painel Financeiro"}),e.jsx("div",{style:{width:"24px"}})]}),e.jsxs("main",{className:"pt-[80px] pb-[40px] w-full max-w-[600px] mx-auto px-5",children:[e.jsx(K,{stats:N,selectedFilter:a,filters:_,onFilterChange:o,onRefresh:F,loading:v,showCurrencySwitch:s!=="syncpay"}),h&&e.jsx(W,{affiliateStats:p,pixelId:U,setPixelId:B,pixelToken:T,setPixelToken:M,isSavingMarketing:O,onSaveMarketing:()=>{},onCopyAffiliateLink:()=>{},isCopyingLink:I,onOpenTracking:()=>{}}),e.jsx(X,{activeProvider:h,onManage:()=>c("/financial/providers")})]})]})};export{ee as FinancialPanel};
