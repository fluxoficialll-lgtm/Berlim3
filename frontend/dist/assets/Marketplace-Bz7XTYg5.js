import{u as p,j as e,r as n,c as m}from"./index-BC19Iu_T.js";import{m as f}from"./marketplaceService-ov_b-P0x.js";import{P as N}from"./ProductCard-CO49MvpN.js";import{F as C}from"./Footer-CqKWM_In.js";const I=()=>{const t=p();return e.jsxs("header",{className:"flex items-center justify-between p-[16px_32px] bg-[#0c0f14] fixed w-full z-30 border-b border-white/10 h-[80px] top-0",children:[e.jsx("button",{onClick:()=>t("/feed"),className:"bg-none border-none text-[#00c2ff] text-2xl cursor-pointer transition-all p-1.5",children:e.jsx("i",{className:"fa-solid fa-arrow-left"})}),e.jsxs("div",{className:"absolute left-1/2 -translate-x-1/2 w-[60px] h-[60px] bg-white/5 rounded-2xl flex justify-center items-center z-20 cursor-pointer shadow-[0_0_20px_rgba(0,194,255,0.3),inset_0_0_20px_rgba(0,194,255,0.08)]",onClick:()=>t("/feed"),children:[e.jsx("div",{className:"absolute w-[40px] h-[22px] rounded-[50%] border-[3px] border-[#00c2ff] rotate-[25deg]"}),e.jsx("div",{className:"absolute w-[40px] h-[22px] rounded-[50%] border-[3px] border-[#00c2ff] -rotate-[25deg]"})]}),e.jsx("button",{onClick:()=>t("/my-store"),className:"bg-none border-none text-[#00c2ff] text-2xl cursor-pointer transition-all p-1.5",children:e.jsx("i",{className:"fa-solid fa-briefcase"})})]})},S=({value:t,onChange:o})=>e.jsxs("div",{className:"search-bar flex items-center gap-2.5 w-full max-w-[600px] mx-auto mb-4 p-[12px_20px] rounded-[50px] bg-white/5 backdrop-blur-xl border border-white/10 transition-all sticky top-0 z-25",children:[e.jsx("style",{children:`
                .search-bar:focus-within {
                    border-color: rgba(0, 194, 255, 0.4);
                    background: rgba(255, 255, 255, 0.1);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
                }
            `}),e.jsx("i",{className:"fa-solid fa-magnifying-glass text-gray-500"}),e.jsx("input",{type:"text",placeholder:"O que você procura hoje?",value:t,onChange:r=>o(r.target.value),className:"flex-1 bg-transparent border-none outline-none color-white text-base placeholder-gray-500"})]}),_=[{id:"Todos",icon:"fa-store",label:"Todos"},{id:"Destaque",icon:"fa-rocket",label:"Destaques"},{id:"Comida",icon:"fa-utensils",label:"Comida"},{id:"Infoprodutos",icon:"fa-graduation-cap",label:"Infoprodutos"},{id:"Vagas de Emprego",icon:"fa-briefcase",label:"Empregos"},{id:"Serviços",icon:"fa-screwdriver-wrench",label:"Serviços"},{id:"Imóveis",icon:"fa-building",label:"Imóveis"},{id:"Casa",icon:"fa-couch",label:"Casa"},{id:"Automotivo",icon:"fa-car",label:"Carro"},{id:"Eletrônicos",icon:"fa-mobile-screen",label:"Eletrônicos"},{id:"Moda",icon:"fa-shirt",label:"Moda"}],z=({activeCategory:t,onSelect:o})=>e.jsxs("div",{className:"category-scroll-container",children:[e.jsx("style",{children:`
                .category-scroll-container { width: 100%; position: relative; z-index: 20; margin-bottom: 20px; flex-shrink: 0; background: transparent; }
                .category-scroll { display:flex; gap:12px; overflow-x:auto; scroll-behavior:smooth; padding:5px 5px 15px 5px; width:100%; flex-wrap: nowrap; }
                .category-scroll::-webkit-scrollbar { display: none; }
                
                .category-icon {
                    flex:0 0 auto; background: rgba(255,255,255,0.05);
                    border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:12px 16px;
                    text-align:center; color:#aaa; cursor:pointer;
                    transition:all 0.3s ease; min-width: 90px;
                }
                .category-icon i { font-size:20px; margin-bottom:6px; display:block; transition: 0.3s; }
                .category-icon span { font-size:11px; font-weight: 500; }
                .category-icon:hover { background: rgba(255,255,255,0.1); color: #fff; }
                .category-icon.active { background:#00c2ff; color:#000; border-color: #00c2ff; box-shadow: 0 4px 15px rgba(0,194,255,0.4); transform: translateY(-2px); }
                .category-icon.active span { font-weight:800; }
            `}),e.jsx("div",{className:"category-scroll no-scrollbar",children:_.map(r=>e.jsxs("div",{className:`category-icon ${t===r.id?"active":""}`,onClick:()=>o(r.id),children:[e.jsx("i",{className:`fa-solid ${r.icon}`}),e.jsx("span",{children:r.label})]},r.id))})]}),E=({items:t,isLoading:o,onItemClick:r})=>e.jsx("div",{className:"products-grid grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 w-full max-w-[1200px] mx-auto relative z-1 items-start content-start",children:o?e.jsxs("div",{className:"col-span-full w-full text-center text-[#555] mt-20 flex flex-col items-center",children:[e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin text-[#00c2ff] text-2xl mb-4"}),e.jsx("p",{className:"text-sm font-medium",children:"Carregando ofertas..."})]}):t.length>0?t.map(i=>e.jsx(N,{product:i,onClick:r},i.id)):e.jsxs("div",{className:"col-span-full w-full text-center text-gray-600 mt-20 flex flex-col items-center gap-2",children:[e.jsx("i",{className:"fa-solid fa-ghost text-4xl opacity-30"}),e.jsx("p",{className:"text-sm",children:"Nenhum resultado encontrado."})]})}),M=({isOpen:t,setIsOpen:o})=>{const r=p(),i=(d,c)=>{o(!1),r(d,{state:c})};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
                #postButton {
                    position: fixed; bottom: 110px; right: 20px; width: 56px; height: 56px;
                    background: #00c2ff; border: none; border-radius: 50%; color: #fff;
                    font-size: 24px; cursor: pointer; box-shadow: 0 4px 20px rgba(0,194,255,0.4);
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); z-index: 35; 
                    display: flex; align-items: center; justify-content: center;
                }
                #postButton:hover { transform: scale(1.1); background: #fff; color: #00c2ff; }
                #postButton.active { transform: rotate(45deg); background: #ff4d4d; color: #fff; }

                .fab-menu-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 30; backdrop-filter: blur(3px); animation: fadeIn 0.2s; }
                .fab-menu { position: fixed; bottom: 180px; right: 20px; display: flex; flex-direction: column; gap: 12px; z-index: 35; align-items: flex-end; }
                .fab-option {
                    background: #1a1e26; border: 1px solid rgba(255,255,255,0.1);
                    padding: 12px 20px; border-radius: 12px; color: #fff;
                    display: flex; align-items: center; gap: 12px;
                    box-shadow: 0 8px 30px rgba(0,0,0,0.5);
                    cursor: pointer; transition: all 0.2s;
                    animation: slideUp 0.3s forwards;
                    opacity: 0; transform: translateY(20px);
                }
                .fab-option:hover { transform: translateX(-5px); background: #252a33; border-color: #00c2ff; }
                .fab-option span { font-weight: 600; font-size: 14px; }
                @keyframes slideUp { to { opacity: 1; transform: translateY(0); } }
            `}),t&&e.jsx("div",{className:"fab-menu-overlay",onClick:()=>o(!1)}),t&&e.jsxs("div",{className:"fab-menu",children:[e.jsxs("button",{className:"fab-option",onClick:()=>i("/ad-type-selector"),children:[e.jsx("span",{children:"Impulsionar Alcance"}),e.jsx("i",{className:"fa-solid fa-rocket",style:{color:"#FFD700"}})]}),e.jsxs("button",{className:"fab-option",onClick:()=>i("/create-marketplace-item",{type:"organic"}),children:[e.jsx("span",{children:"Anunciar Grátis"}),e.jsx("i",{className:"fa-solid fa-tag",style:{color:"#00ff82"}})]})]}),e.jsx("button",{id:"postButton",className:t?"active":"",onClick:()=>o(!t),children:e.jsx("i",{className:"fa-solid fa-plus"})})]})},F=()=>{const t=p(),[o,r]=n.useState("Todos"),[i,d]=n.useState(""),[c,b]=n.useState([]),[g,h]=n.useState(!1),[u,j]=n.useState(void 0),[v,w]=n.useState(!0),x=n.useCallback(()=>{const a=m.getCurrentUserEmail()||void 0,s=f.getRecommendedItems(a);b(s||[]),w(!1)},[]);n.useEffect(()=>{const a=m.getCurrentUserEmail()||void 0;j(a),x(),f.fetchItems().catch(l=>console.warn("Marketplace sync failed",l));const s=db.subscribe("marketplace",()=>{x()});return()=>s()},[x]);const k=n.useMemo(()=>{if(!c)return[];let a=[...c];if(o!=="Todos"&&(o==="Destaque"?a=a.filter(s=>s&&s.isAd):a=a.filter(s=>s&&s.category===o)),i.trim()){const s=i.toLowerCase();a=a.filter(l=>l&&(l.title&&l.title.toLowerCase().includes(s)||l.location&&l.location.toLowerCase().includes(s)))}return a},[c,o,i]),y=a=>{a&&(u&&f.trackView(a,u),a.isAd&&a.ctaLink?a.ctaLink.startsWith("http")?window.open(a.ctaLink,"_blank"):t(a.ctaLink):t(`/marketplace/product/${a.id}`))};return e.jsxs("div",{className:"h-screen flex flex-col font-['Inter'] overflow-hidden bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white",children:[e.jsx(I,{}),e.jsxs("main",{className:"flex-grow pt-[100px] pb-[100px] px-5 flex flex-col overflow-y-auto no-scrollbar",children:[e.jsx(S,{value:i,onChange:d}),e.jsx(z,{activeCategory:o,onSelect:r}),e.jsx(E,{items:k,isLoading:v,onItemClick:y})]}),e.jsx(M,{isOpen:g,setIsOpen:h}),e.jsx(C,{})]})};export{F as Marketplace};
