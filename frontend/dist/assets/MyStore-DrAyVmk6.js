const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/PaymentFlowModal-BqbqE59P.js","assets/index-BC19Iu_T.js","assets/index-DQp5J8os.css","assets/currencyService-BC2Bcej_.js","assets/VipSalesTracker-FD1TTkOP.js","assets/paypalService-Dk5je5dH.js","assets/PurchaseIntention-CwMn_lv1.js"])))=>i.map(i=>d[i]);
import{c as S,i as k,M as E,U as A,u as C,j as e,e as D,r as u,x as R,_ as z,h as b}from"./index-BC19Iu_T.js";import{m as F}from"./marketplaceService-ov_b-P0x.js";import{a as P}from"./apiClient-cuuPgksg.js";import{u as I}from"./useVipPricing-SNzFdJyy.js";import"./currencyService-BC2Bcej_.js";const B=[{id:"prod-001",title:"iPhone 15 Pro Max 256GB - Titânio",price:7890,category:"Eletrônicos",location:"São Paulo, SP",description:"Aparelho novo, lacrado com nota fiscal e garantia Apple de 1 ano.",image:"https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600",sellerId:"u-creator-002",sellerName:"Eduardo MKT",timestamp:Date.now()-36e5,soldCount:14},{id:"prod-002",title:"Mentoria: Do Zero ao Milhão no Tráfego",price:497,category:"Infoprodutos",location:"Brasil / Online",description:"Aprenda as estratégias que usei para escalar mais de 100 operações de e-commerce.",image:"https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600",sellerId:"u-creator-002",sellerName:"Eduardo MKT",timestamp:Date.now()-864e5,soldCount:156},{id:"prod-003",title:"Setup Home Office High-End",price:12500,category:"Eletrônicos",location:"Curitiba, PR",description:"Cadeira Herman Miller + Monitor Ultrawide 34 + MacBook M2 Pro.",image:"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600",sellerId:"u-creator-002",sellerName:"Eduardo MKT",timestamp:Date.now()-1728e5,soldCount:1},{id:"prod-004",title:"E-book: 100 Copys que Vendem",price:29.9,category:"Infoprodutos",location:"Online",description:"Biblioteca de modelos de copy prontos para usar em anúncios de alta conversão.",image:"https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600",sellerId:"u-creator-002",sellerName:"Eduardo MKT",timestamp:Date.now()-5e5,soldCount:890}],T={getMyBusinessData:async s=>await P.call(`/api/screens/my-business?userId=${s}`),getAdminDashboardData:async()=>(await P.call("/api/admin/execute/stats/dashboard")).data},_={getMyBusinessData:async s=>{await new Promise(t=>setTimeout(t,600));const i=S.getCurrentUser();if(!i)throw new Error("Usuário não autenticado");const c=i.email.includes("test.com")||i.id.startsWith("u-mock"),r=k.posts.getAll().filter(t=>t.authorId===s||c&&t.authorId==="u-creator-002"),g=k.marketplace.getAll(),o=g.length>0?g.filter(t=>t.sellerId===s||t.sellerId===i.email||c&&t.sellerId==="u-creator-002"):c?B:[],m=k.ads.getAll(),n=m.length>0?m.filter(t=>t.ownerId===s||t.ownerEmail===i.email||c&&t.ownerId==="u-creator-002"):c?E:[];return n.filter(t=>t.status==="active").length,{stats:{totalPosts:r.filter(t=>t.type!=="video").length,totalReels:r.filter(t=>t.type==="video").length,totalProducts:o.length,activeAds:n.length,pendingReports:0},financial:{totalRevenue:1250.75,salesCount:14},lists:{products:o,campaigns:n}}},getAdminDashboardData:async()=>({financial:{totalGMV:5e4,totalTransactions:1200,platformNetProfit:5e3,revenueGrowth24h:1500},users:{totalRegistered:5e3,growthLast24h:45,bannedCount:12},content:{totalGroups:150,totalPosts:12e3,activeCampaigns:85},security:{pendingModeration:3}})},$=A?_:T,L=({products:s,onDelete:i})=>{const c=C(),x=r=>r.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});return e.jsxs("div",{className:"products-list animate-fade-in",children:[e.jsx("style",{children:`
                .item-badge-ad {
                    font-size: 8px;
                    font-weight: 900;
                    text-transform: uppercase;
                    background: #FFD700;
                    color: #000;
                    padding: 1px 4px;
                    border-radius: 3px;
                    margin-left: 6px;
                }
            `}),s.length>0?s.map(r=>e.jsxs("div",{className:"store-item",onClick:()=>c(`/marketplace/product/${r.id}`),children:[e.jsx("img",{src:r.image||"https://via.placeholder.com/100",className:"item-thumb",alt:r.title}),e.jsxs("div",{className:"item-info",children:[e.jsxs("div",{className:"item-title flex items-center",children:[r.title,r.isAd&&e.jsx("span",{className:"item-badge-ad",children:"AD"})]}),e.jsxs("div",{className:"item-meta",children:[r.category,e.jsxs("span",{className:"item-sales",children:[e.jsx("i",{className:"fa-solid fa-bag-shopping"})," ",r.soldCount||0]})]}),e.jsx("div",{className:"item-price",children:x(r.price)})]}),e.jsx("div",{className:"item-actions",children:e.jsx("div",{className:"action-icon delete",onClick:g=>i(r.id,g),title:"Excluir Produto",children:e.jsx("i",{className:"fa-solid fa-trash-can"})})})]},r.id)):e.jsxs("div",{className:"empty-state",children:[e.jsx("i",{className:"fa-solid fa-box-open"}),e.jsx("p",{children:"Você ainda não publicou produtos."})]}),e.jsxs("button",{className:"add-btn",onClick:()=>c("/create-marketplace-item"),children:[e.jsx("i",{className:"fa-solid fa-plus-circle"})," Criar Novo Anúncio"]})]})},O=u.lazy(()=>z(()=>import("./PaymentFlowModal-BqbqE59P.js"),__vite__mapDeps([0,1,2,3,4,5,6])).then(s=>({default:s.PaymentFlowModal}))),M=s=>s?s>=1e6?(s/1e6).toFixed(1).replace(/\.0$/,"")+"M":s>=1e3?(s/1e3).toFixed(1).replace(/\.0$/,"")+"k":s.toString():"0",U=({campaigns:s,onDelete:i,onEnd:c,onResume:x})=>{const r=C(),{showPrompt:g}=D(),[o,m]=u.useState(null),[n,t]=u.useState(0),{geoData:h,displayPriceInfo:y}=I(o?{id:o.id,name:o.name,price:(n||o.budget).toString(),currency:"BRL"}:null),j=a=>a.toLocaleString("pt-BR",{style:"currency",currency:"BRL"}),w=a=>{a.status==="pending"&&(t(0),m(a))},p=async(a,N)=>{a.stopPropagation();const v=await g("Adicionar Saldo","Informe o valor que deseja adicionar à sua campanha (Min R$ 10,00):","Ex: 50,00");if(v){const f=parseFloat(v.replace(/\./g,"").replace(",","."));if(isNaN(f)||f<10){alert("Valor inválido. O mínimo é R$ 10,00.");return}t(f),m(N)}},d=async()=>{o&&(n>0?await b.addBudget(o.id,n):await b.updateCampaignStatus(o.id,"active"),m(null),t(0))};return e.jsxs("div",{className:"campaigns-list animate-fade-in",children:[e.jsx("style",{children:`
                .btn-performance-grid {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    background: rgba(0, 194, 255, 0.1);
                    color: #00c2ff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: 0.3s;
                    border: 1px solid rgba(0, 194, 255, 0.2);
                    margin-top: 4px;
                }
                .btn-performance-grid:hover {
                    background: #00c2ff;
                    color: #000;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 10px rgba(0,194,255,0.3);
                }
                .camp-card-wrapper {
                    position: relative;
                    margin-bottom: 15px;
                    transition: 0.3s;
                }
                .camp-card-wrapper.pending {
                    cursor: pointer;
                }
                .camp-card-wrapper.pending:active {
                    transform: scale(0.98);
                }
                .camp-status.pending-payment {
                    background: #FFD700;
                    color: #000;
                    box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
                }
                .camp-status.ended {
                    background: rgba(255, 255, 255, 0.1);
                    color: #888;
                }
                .pending-overlay { position: absolute; inset: 0; background: rgba(255, 215, 0, 0.03); border-radius: 20px; pointer-events: none; border: 1px solid rgba(255, 215, 0, 0.1); }
                .pay-now-btn { width: 100%; padding: 14px; background: linear-gradient(90deg, #FFD700, #FDB931); color: #000; border: none; border-radius: 12px; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-top: 15px; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3); display: flex; align-items: center; justify-content: center; gap: 8px; }
                
                .top-up-btn {
                    width: 100%; padding: 12px; background: rgba(0, 194, 255, 0.08); 
                    border: 1px solid rgba(0, 194, 255, 0.2); border-radius: 12px; 
                    color: #00c2ff; font-weight: 900; font-size: 12px; 
                    text-transform: uppercase; letter-spacing: 1.5px;
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    margin-bottom: 12px; transition: 0.3s; cursor: pointer;
                }
                .top-up-btn:hover { background: #00c2ff; color: #000; box-shadow: 0 0 20px rgba(0, 194, 255, 0.3); }

                .camp-actions-footer {
                    display: flex;
                    gap: 10px;
                    margin-top: 15px;
                }
                .action-btn-list {
                    flex: 1;
                    padding: 12px;
                    border-radius: 12px;
                    font-size: 11px;
                    font-weight: 800;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                }
                .btn-stop { 
                    background: transparent; 
                    border: 1px solid rgba(255, 77, 77, 0.3); 
                    color: #ff4d4d; 
                    width: 100%;
                }
                .btn-stop:hover { background: rgba(255, 77, 77, 0.08); }

                .btn-resume { 
                    background: rgba(0, 194, 255, 0.1); 
                    border: 1px solid #00c2ff; 
                    color: #00c2ff; 
                }
                .btn-resume:hover { background: #00c2ff; color: #000; }

                .btn-delete { 
                    background: transparent; 
                    border: 1px solid rgba(255, 255, 255, 0.1); 
                    color: #666; 
                }
                .btn-delete:hover { border-color: #ff4d4d; color: #ff4d4d; background: rgba(255, 77, 77, 0.05); }
            `}),s.length>0?s.map(a=>{const N=a.status==="active",v=!R.hasAvailableBudget(a),f=N&&a.pricingModel!=="commission"&&v;return e.jsxs("div",{className:`campaign-card camp-card-wrapper ${a.status==="pending"?"pending":""}`,onClick:()=>w(a),children:[a.status==="pending"&&e.jsx("div",{className:"pending-overlay"}),e.jsxs("div",{className:"camp-header",children:[e.jsx("div",{className:"camp-name",children:a.name}),e.jsx("div",{className:`camp-status ${a.status==="active"?"":a.status==="ended"?"ended":"pending-payment"}`,children:a.status==="active"?"Veiculando":a.status==="ended"?"Encerrada":"Aguardando Pagamento"})]}),e.jsx("div",{className:"camp-desc",children:a.creative.text.length>80?a.creative.text.substring(0,80)+"...":a.creative.text}),e.jsxs("div",{className:"camp-metrics",children:[e.jsxs("div",{className:"metric",children:[e.jsx("span",{className:"metric-label",children:"Investimento"}),e.jsx("span",{className:"metric-val",style:{color:a.pricingModel==="commission"?"#FFD700":"#00ff82"},children:a.pricingModel==="commission"?"CPA":j(a.budget)})]}),e.jsxs("div",{className:"metric",children:[e.jsx("span",{className:"metric-label",children:"Alcance"}),e.jsx("span",{className:"metric-val",children:M(a.stats?.views||0)})]}),e.jsxs("div",{className:"metric",children:[e.jsx("span",{className:"metric-label",children:"Cliques"}),e.jsx("span",{className:"metric-val",children:M(a.stats?.clicks||0)})]}),e.jsxs("div",{className:"metric action",children:[e.jsx("span",{className:"metric-label",children:"Métricas"}),e.jsx("div",{className:"btn-performance-grid",title:"Ver Desempenho Completo",onClick:l=>{l.preventDefault(),l.stopPropagation(),a.status==="active"||a.status==="ended"?r(`/campaign-performance/${a.id}`):alert("As métricas estarão disponíveis após a ativação do pagamento.")},children:e.jsx("i",{className:`fa-solid ${a.status!=="pending"?"fa-chart-simple":"fa-lock opacity-30"}`})})]})]}),f&&e.jsxs("button",{className:"top-up-btn",onClick:l=>p(l,a),children:[e.jsx("i",{className:"fa-solid fa-circle-plus"})," Adicionar Saldo (Orçamento Esgotado)"]}),a.status==="pending"&&e.jsxs("button",{className:"pay-now-btn",onClick:l=>{l.stopPropagation(),m(a)},children:[e.jsx("i",{className:"fa-solid fa-credit-card"})," Fazer Pagamento"]}),e.jsx("div",{className:"camp-actions-footer",children:a.status==="active"?e.jsxs("button",{className:"action-btn-list btn-stop",onClick:l=>c(a.id,l),children:[e.jsx("i",{className:"fa-solid fa-stop-circle"})," Encerrar Campanha"]}):a.status==="ended"?e.jsxs(e.Fragment,{children:[e.jsxs("button",{className:"action-btn-list btn-resume",onClick:l=>x(a.id,l),children:[e.jsx("i",{className:"fa-solid fa-play-circle"})," Retomar"]}),e.jsxs("button",{className:"action-btn-list btn-delete",onClick:l=>i(a.id,l),children:[e.jsx("i",{className:"fa-solid fa-trash-can"})," Excluir"]})]}):e.jsxs("button",{className:"action-btn-list btn-delete w-full",onClick:l=>i(a.id,l),children:[e.jsx("i",{className:"fa-solid fa-trash-can"})," Remover Rascunho"]})})]},a.id)}):e.jsxs("div",{className:"empty-state",children:[e.jsx("i",{className:"fa-solid fa-bullhorn"}),e.jsx("p",{children:"Nenhuma campanha configurada."})]}),e.jsxs("button",{className:"add-btn gold",onClick:()=>r("/ad-type-selector"),children:[e.jsx("i",{className:"fa-solid fa-rocket"})," Iniciar Nova Promoção"]}),e.jsx(u.Suspense,{fallback:null,children:o&&e.jsx(O,{isOpen:!!o,onClose:()=>{m(null),t(0)},group:{id:o.id,name:n>0?`Recarga: ${o.name}`:`Anúncio: ${o.name}`,price:(n||o.budget).toString(),currency:"BRL",creatorEmail:o.ownerEmail,isVip:!1},provider:h?.countryCode==="BR"?"syncpay":"stripe",convertedPriceInfo:y,geo:h,onSuccess:d})})]})},W=()=>{const s=C(),{showConfirm:i}=D(),[c,x]=u.useState("products"),[r,g]=u.useState(null),[o,m]=u.useState(!0),n=async()=>{const p=S.getCurrentUser();if(!p){s("/");return}m(!0);try{const d=await $.getMyBusinessData(p.id);g(d)}catch(d){console.error("BFF Error:",d)}finally{m(!1)}};u.useEffect(()=>{n()},[]);const t=async(p,d)=>{d.stopPropagation(),await i("Excluir Produto","Tem certeza? A ação não pode ser desfeita.","Excluir","Cancelar")&&(await F.deleteItem(p),n())},h=async(p,d)=>{d.stopPropagation(),await i("Encerrar Campanha","Deseja parar a veiculação? Você poderá retomá-la a qualquer momento.","Encerrar","Manter")&&(await b.updateCampaignStatus(p,"ended"),n())},y=async(p,d)=>{d.stopPropagation(),await i("Retomar Campanha","Deseja reativar o anúncio agora?","Retomar","Cancelar")&&(await b.updateCampaignStatus(p,"active"),n())},j=async(p,d)=>{d.stopPropagation(),await i("Excluir Campanha","Deseja remover permanentemente este registro? O orçamento restante não será reembolsado.","Excluir","Cancelar")&&(await b.deleteCampaign(p),n())},w=()=>{s(-1)};return e.jsxs("div",{className:"min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden",children:[e.jsx("style",{children:`
        header { display:flex; align-items:center; padding:16px; background: #0c0f14; position:fixed; width:100%; top:0; z-index:10; border-bottom:1px solid rgba(255,255,255,0.1); height: 65px; }
        header .back-btn { background:none; border:none; color:#fff; font-size:22px; cursor:pointer; padding-right: 15px; }
        header h1 { font-size:20px; font-weight:600; }
        main { padding-top: 80px; padding-bottom: 40px; width: 100%; max-width: 600px; margin: 0 auto; padding-left: 20px; padding-right: 20px; flex-grow: 1; overflow-y: auto; }
        
        /* Tabs Styling */
        .store-tabs { display: flex; background: rgba(255,255,255,0.05); border-radius: 12px; padding: 4px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.1); }
        .tab-btn { flex: 1; padding: 12px; border: none; background: transparent; color: #aaa; font-size: 14px; font-weight: 600; cursor: pointer; border-radius: 8px; transition: 0.3s; }
        .tab-btn.active { background: #00c2ff; color: #000; box-shadow: 0 2px 10px rgba(0,194,255,0.3); }

        /* Generic Add Button */
        .add-btn { width: 100%; padding: 18px; border-radius: 16px; font-weight: 800; cursor: pointer; border: 1px dashed rgba(255,255,255,0.1); background: rgba(255,255,255,0.02); color: #888; margin-top: 15px; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 10px; text-transform: uppercase; font-size: 13px; letter-spacing: 1px; }
        .add-btn.gold { border-color: rgba(255,215,0,0.3); color: #FFD700; background: rgba(255,215,0,0.02); }
        .add-btn:hover { background: rgba(255,255,255,0.05); border-color: #00c2ff; color: #fff; }

        /* Products List Styles */
        .store-item { 
            display: flex; gap: 15px; background: rgba(255,255,255,0.03); 
            border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; 
            padding: 12px; margin-bottom: 12px; cursor: pointer; transition: 0.2s;
        }
        .store-item:hover { border-color: #00c2ff33; background: rgba(255,255,255,0.06); }
        .item-thumb { width: 64px; height: 64px; border-radius: 10px; object-fit: cover; background: #000; }
        .item-info { flex: 1; min-width: 0; display: flex; flex-direction: column; justify-content: center; }
        .item-title { font-weight: 700; font-size: 15px; color: #fff; margin-bottom: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .item-meta { font-size: 11px; color: #666; display: flex; align-items: center; gap: 10px; }
        .item-sales { color: #FFD700; font-weight: 700; }
        .item-price { font-size: 14px; font-weight: 800; color: #00ff82; margin-top: 2px; }
        .item-actions { display: flex; align-items: center; padding-left: 10px; }
        .action-icon { width: 36px; height: 36px; display: flex; items-center; justify-content: center; border-radius: 10px; background: rgba(255,255,255,0.05); color: #555; cursor: pointer; transition: 0.2s; }
        .action-icon.delete:hover { background: rgba(255,77,77,0.1); color: #ff4d4d; }

        /* Campaigns List Styles */
        .campaign-card { 
            background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); 
            border-radius: 20px; padding: 20px; margin-bottom: 16px; 
        }
        .camp-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
        .camp-name { font-weight: 800; font-size: 16px; color: #fff; }
        .camp-status { font-size: 10px; font-weight: 900; text-transform: uppercase; padding: 3px 8px; border-radius: 6px; background: #00ff82; color: #000; }
        .camp-desc { font-size: 13px; color: #888; line-height: 1.4; margin-bottom: 15px; }
        .camp-metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; padding: 15px 0; border-top: 1px solid rgba(255,255,255,0.05); }
        .metric { display: flex; flex-direction: column; gap: 4px; }
        .metric-label { font-size: 9px; color: #555; text-transform: uppercase; font-weight: 700; }
        .metric-val { font-size: 14px; font-weight: 800; color: #fff; }

        /* Empty State */
        .empty-state { text-align: center; padding: 60px 20px; color: #444; display: flex; flex-direction: column; align-items: center; gap: 15px; }
        .empty-state i { font-size: 48px; opacity: 0.2; }
        .empty-state p { font-size: 14px; font-weight: 500; }
      `}),e.jsxs("header",{children:[e.jsx("button",{onClick:w,className:"back-btn",children:e.jsx("i",{className:"fa-solid fa-arrow-left"})}),e.jsx("h1",{children:"Meus Negócios"})]}),e.jsx("main",{className:"no-scrollbar",children:o?e.jsxs("div",{className:"flex flex-col items-center justify-center py-20 opacity-50",children:[e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin text-2xl text-[#00c2ff] mb-2"}),e.jsx("p",{className:"text-xs uppercase font-bold tracking-widest",children:"Lendo cabo de dados..."})]}):r&&e.jsxs("div",{className:"animate-fade-in",children:[e.jsxs("div",{className:"store-tabs",children:[e.jsxs("button",{className:`tab-btn ${c==="products"?"active":""}`,onClick:()=>x("products"),children:["Meus Produtos (",r.stats.totalProducts,")"]}),e.jsxs("button",{className:`tab-btn ${c==="campaigns"?"active":""}`,onClick:()=>x("campaigns"),children:["Minhas Campanhas (",r.stats.activeAds,")"]})]}),c==="products"?e.jsx(L,{products:r.lists.products,onDelete:t}):e.jsx(U,{campaigns:r.lists.campaigns,onEnd:h,onResume:y,onDelete:j})]})})]})};export{W as MyStore};
