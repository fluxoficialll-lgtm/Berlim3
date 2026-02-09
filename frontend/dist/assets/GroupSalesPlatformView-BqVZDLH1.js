import{j as e,u as f,f as p,r as i,g as h,c as g}from"./index-BC19Iu_T.js";import{O as b}from"./OwnerControls-9CBqD19P.js";const u=({group:a})=>{const l=a.memberIds?.length||0;return e.jsxs("div",{className:"bg-white/5 border border-white/10 rounded-[32px] p-6 mb-10 shadow-2xl relative overflow-hidden group",children:[e.jsx("div",{className:"absolute -top-24 -right-24 w-48 h-48 bg-[#00c2ff]/5 blur-[60px] rounded-full"}),e.jsxs("div",{className:"flex flex-col gap-6 relative z-10",children:[e.jsxs("div",{className:"flex items-center gap-5",children:[e.jsx("div",{className:"w-16 h-16 rounded-2xl bg-black/40 border border-white/10 overflow-hidden flex-shrink-0",children:a.coverImage?e.jsx("img",{src:a.coverImage,className:"w-full h-full object-cover",alt:"Capa"}):e.jsx("div",{className:"w-full h-full flex items-center justify-center text-[#00c2ff]",children:e.jsx("i",{className:`fa-solid ${a.isVip?"fa-crown":"fa-users-line"} text-2xl`})})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("h1",{className:"text-xl font-bold text-white truncate leading-tight",children:a.name}),e.jsxs("div",{className:"flex items-center gap-2 mt-1.5",children:[e.jsxs("div",{className:"px-2 py-0.5 rounded-lg bg-[#00ff82]/10 border border-[#00ff82]/20 text-[#00ff82] text-[9px] font-black uppercase tracking-wider",children:[e.jsx("i",{className:"fa-solid fa-users mr-1"})," ",l," Membros"]}),a.isVip&&e.jsxs("div",{className:"px-2 py-0.5 rounded-lg bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700] text-[9px] font-black uppercase tracking-wider",children:[e.jsx("i",{className:"fa-solid fa-crown mr-1"})," VIP"]})]})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("span",{className:"text-[10px] font-black text-[#00c2ff] uppercase tracking-[2px] opacity-70",children:"Apresentação"}),e.jsx("p",{className:"text-gray-400 text-[13px] leading-relaxed line-clamp-3 font-medium",children:a.description||"Esta comunidade oferece acesso a conteúdos exclusivos e interações em tempo real com especialistas."})]})]})]})},v=()=>{const a=f(),{id:l}=p(),[t,c]=i.useState(null),[n,o]=i.useState(!1);if(i.useEffect(()=>{if(l){const s=h.getGroupById(l);if(s){c(s);const r=g.getCurrentUserId(),m=s.creatorId===r||s.adminIds?.includes(r||"");o(m)}else a("/groups")}},[l,a]),!t)return null;const d=s=>{a(`/group-folder/${t.id}/${s}`)},x=s=>{a(`/group-chat/${t.id}/${s}`)};return e.jsxs("div",{className:"min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col",children:[e.jsx("style",{children:`
                .platform-header {
                    height: 75px;
                    padding: 0 24px;
                    display: flex;
                    align-items: center;
                    background: #0c0f14;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    position: sticky;
                    top: 0;
                    z-index: 40;
                }
                
                .owner-controls {
                    position: fixed;
                    top: 17px;
                    right: 20px;
                    z-index: 50;
                    display: flex;
                    gap: 12px;
                    height: 40px;
                    align-items: center;
                }
                .ctrl-btn {
                    width: 42px;
                    height: 42px;
                    background: rgba(255,255,255,0.05);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #00c2ff;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .ctrl-btn:hover { 
                    background: #00c2ff; 
                    color: #000; 
                    box-shadow: 0 0 20px rgba(0, 194, 255, 0.4);
                    transform: translateY(-2px);
                }
                
                .main-scroll-area {
                    flex: 1;
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                }

                .folder-item-premium {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    padding: 20px 24px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    position: relative;
                    overflow: hidden;
                }
                .folder-item-premium:hover {
                    background: rgba(255, 255, 255, 0.07);
                    border-color: rgba(0, 194, 255, 0.3);
                    transform: translateY(-3px) scale(1.01);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.4);
                }
                .folder-item-premium:active { transform: scale(0.98); }
                
                .icon-gradient-box {
                    width: 54px;
                    height: 54px;
                    background: linear-gradient(135deg, #1e2531 0%, #0c0f14 100%);
                    color: #00c2ff;
                    border-radius: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    border: 1px solid rgba(0, 194, 255, 0.2);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                }
                .channel-icon-box {
                    background: linear-gradient(135deg, #00ff821a 0%, #00ff8205 100%);
                    border-color: rgba(0, 255, 130, 0.3);
                    color: #00ff82;
                }
                .count-badge-new {
                    background: #00c2ff;
                    color: #000;
                    padding: 2px 10px;
                    border-radius: 8px;
                    font-size: 10px;
                    font-weight: 900;
                    text-transform: uppercase;
                }
                .channel-badge {
                    background: #00ff82;
                }
            `}),e.jsxs("header",{className:"platform-header",children:[e.jsx("button",{onClick:()=>a("/groups"),className:"text-[#00c2ff] text-xl p-2 -ml-4",children:e.jsx("i",{className:"fa-solid fa-arrow-left"})}),e.jsx("div",{className:"ml-2 flex flex-col",children:e.jsx("span",{className:"text-[10px] font-black text-[#00c2ff] uppercase tracking-[3px]",children:"Hub da Comunidade"})})]}),n&&e.jsx(b,{group:t}),e.jsx("main",{className:"main-scroll-area p-5 pb-32",children:e.jsxs("div",{className:"max-w-[600px] mx-auto w-full",children:[e.jsx("div",{className:"mb-12",children:e.jsx(u,{group:t})}),(t.salesPlatformSections||[]).map(s=>e.jsxs("section",{className:"mb-12 animate-fade-in",children:[e.jsxs("div",{className:"flex flex-col gap-1 mb-6 px-2",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"h-4 w-1 bg-[#00c2ff] rounded-full shadow-[0_0_10px_#00c2ff]"}),e.jsx("h3",{className:"text-sm font-black text-white uppercase tracking-[3px]",children:s.title})]}),e.jsx("div",{className:"w-full h-px bg-gradient-to-r from-white/10 to-transparent mt-2"})]}),e.jsxs("div",{className:"grid gap-3",children:[(s.folders||[]).map(r=>e.jsxs("div",{className:"folder-item-premium",onClick:()=>d(r.id),children:[e.jsx("div",{className:"icon-gradient-box",children:e.jsx("i",{className:"fa-solid fa-folder-open"})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("h4",{className:"font-extrabold text-white text-base truncate mb-1.5",children:r.name}),e.jsxs("span",{className:"count-badge-new",children:[r.items?.length||0," Arquivos"]})]}),e.jsx("i",{className:"fa-solid fa-chevron-right text-gray-800 text-xs"})]},r.id)),(s.channels||[]).map(r=>e.jsxs("div",{className:"folder-item-premium",onClick:()=>x(r.id),children:[e.jsx("div",{className:"icon-gradient-box channel-icon-box",children:e.jsx("i",{className:"fa-solid fa-comments"})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsxs("h4",{className:"font-extrabold text-white text-base truncate mb-1.5",children:["# ",r.name]}),e.jsx("span",{className:"count-badge-new channel-badge",children:"Canal de Chat"})]}),e.jsx("i",{className:"fa-solid fa-chevron-right text-gray-800 text-xs"})]},r.id))]})]},s.id)),(!t.salesPlatformSections||t.salesPlatformSections.length===0)&&e.jsxs("div",{className:"text-center py-20 opacity-30 border-2 border-dashed border-white/5 rounded-[40px] mt-4",children:[e.jsx("i",{className:"fa-solid fa-store-slash text-3xl text-gray-600 mb-4"}),e.jsx("p",{className:"font-black uppercase tracking-widest text-[11px]",children:"Nenhum conteúdo disponível."})]}),e.jsxs("div",{className:"mt-20 text-center opacity-10",children:[e.jsx("div",{className:"text-[9px] uppercase font-black tracking-[5px] mb-2",children:"Flux Hub Engine v4.3"}),e.jsx("div",{className:"w-10 h-1 bg-white mx-auto rounded-full"})]})]})})]})};export{v as GroupSalesPlatformView};
