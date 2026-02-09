import{j as s}from"./index-BC19Iu_T.js";import{P as r}from"./ProductCard-CO49MvpN.js";const c=({activeTab:e,setActiveTab:a,hasProducts:t})=>s.jsxs("nav",{className:"tab-nav",children:[s.jsx("style",{children:`
                .tab-nav { 
                    display: flex; 
                    border-bottom: 1px solid rgba(255,255,255,0.1); 
                    margin-bottom: 15px; 
                    background: #0c0f14; 
                    position: -webkit-sticky;
                    position: sticky;
                    top: 80px;
                    z-index: 40;
                    box-shadow: 0 10px 20px -10px rgba(0,0,0,0.5);
                }
                .tab-nav button { 
                    flex: 1; 
                    padding: 14px 0; 
                    background: none; 
                    border: none; 
                    color: #888; 
                    font-weight: 600; 
                    cursor: pointer; 
                    border-bottom: 2px solid transparent; 
                    display: flex; 
                    flex-direction: column; 
                    align-items: center; 
                    gap: 6px; 
                    transition: all 0.2s ease;
                    font-size: 10px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .tab-nav button i { 
                    font-size: 18px; 
                    opacity: 0.4; 
                    transition: 0.2s;
                }
                .tab-nav button.active { 
                    color: #fff; 
                    border-bottom: 2px solid #00c2ff; 
                    background: rgba(0, 194, 255, 0.03);
                }
                .tab-nav button.active i { 
                    opacity: 1; 
                    color: #00c2ff; 
                    transform: translateY(-2px);
                }
                .tab-nav button:active {
                    transform: scale(0.95);
                }
            `}),s.jsxs("button",{className:e==="posts"?"active":"",onClick:()=>a("posts"),children:[s.jsx("i",{className:"fa-solid fa-list-ul"}),s.jsx("span",{children:"Posts"})]}),t&&s.jsxs("button",{className:e==="products"?"active":"",onClick:()=>a("products"),children:[s.jsx("i",{className:"fa-solid fa-store"}),s.jsx("span",{children:"Produtos"})]}),s.jsxs("button",{className:e==="fotos"?"active":"",onClick:()=>a("fotos"),children:[s.jsx("i",{className:"fa-solid fa-camera"}),s.jsx("span",{children:"Fotos"})]}),s.jsxs("button",{className:e==="reels"?"active":"",onClick:()=>a("reels"),children:[s.jsx("i",{className:"fa-solid fa-video"}),s.jsx("span",{children:"Reels"})]})]}),d=({reels:e,onReelClick:a,onDelete:t})=>e.length===0?s.jsx("div",{className:"no-content",children:"Sem reels."}):s.jsx("div",{className:"gallery-grid animate-fade-in",children:e.map(i=>s.jsxs("div",{className:"gallery-item reel-item relative",onClick:()=>a(i),children:[s.jsx("video",{src:i.video,className:"reel-thumbnail",muted:!0,preload:"metadata"}),s.jsxs("div",{className:"reel-icon",children:[s.jsx("i",{className:"fa-solid fa-video"})," ",i.views]}),s.jsx("button",{onClick:o=>t(i.id,o),className:"absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center border-none color-[#ff4d4d] cursor-pointer z-10",children:s.jsx("i",{className:"fa-solid fa-trash-can text-xs"})})]},i.id))}),p=({products:e,onProductClick:a})=>e.length===0?s.jsx("div",{className:"no-content",children:"Sem produtos."}):s.jsxs("div",{className:"profile-products-container px-2 pb-10",children:[s.jsx("style",{children:`
                .profile-products-grid { 
                    display: grid; 
                    grid-template-columns: repeat(2, 1fr); 
                    gap: 12px; 
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                @media (min-width: 640px) {
                    .profile-products-grid {
                        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                    }
                }
            `}),s.jsx("div",{className:"profile-products-grid animate-fade-in",children:e.map(t=>s.jsx(r,{product:t,onClick:i=>a(i.id)},t.id))})]});export{c as P,p as a,d as b};
