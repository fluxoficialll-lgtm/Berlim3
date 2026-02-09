import{j as e,k as u,u as g,f as j,r as o,g as b,c as N}from"./index-BC19Iu_T.js";import{O as v}from"./OwnerControls-9CBqD19P.js";const y=({groupName:s,coverImage:t})=>e.jsxs("div",{className:"group-hero-mini animate-fade-in",children:[e.jsx("style",{children:`
                .group-hero-mini {
                    background: linear-gradient(135deg, rgba(0, 194, 255, 0.1) 0%, rgba(0, 0, 0, 0) 100%);
                    border-radius: 24px;
                    padding: 20px;
                    margin-bottom: 30px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
            `}),e.jsx("div",{className:"w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-[#00c2ff33]",children:t?e.jsx("img",{src:t,className:"w-full h-full object-cover",alt:"Cover"}):e.jsx("div",{className:"w-full h-full bg-black flex items-center justify-center text-[#00c2ff]",children:e.jsx("i",{className:"fa-solid fa-users"})})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("h1",{className:"text-xl font-black text-white truncate leading-tight",children:s}),e.jsx("p",{className:"text-[10px] text-gray-500 uppercase font-black tracking-widest mt-1",children:"Canais da Comunidade"})]})]}),m=({title:s})=>e.jsxs("div",{className:"flex flex-col gap-1 mb-6 px-2 mt-8 first:mt-2 animate-fade-in",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"h-4 w-1 bg-[#00c2ff] rounded-full shadow-[0_0_10px_#00c2ff]"}),e.jsx("h3",{className:"text-sm font-black text-white uppercase tracking-[3px]",children:s})]}),e.jsx("div",{className:"w-full h-px bg-gradient-to-r from-white/10 to-transparent mt-2"})]}),x=({id:s,groupId:t,name:n,icon:c="fa-hashtag",isPrivate:d=!1,onClick:a})=>{const i=u.getGroupUnreadCount(`${t}_${s}`);return e.jsxs("div",{onClick:a,className:"flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl cursor-pointer hover:bg-white/10 transition-all active:scale-[0.98] group",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center text-[#00c2ff] group-hover:bg-[#00c2ff1a] transition-colors",children:e.jsx("i",{className:`fa-solid ${c}`})}),e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("span",{className:"font-bold text-gray-200",children:["# ",n]}),d&&e.jsx("span",{className:"text-[9px] text-gray-500 uppercase font-black",children:"Somente Admins"})]})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[i>0&&e.jsx("div",{className:"bg-[#ff4d4d] text-white text-[10px] font-black px-2 py-0.5 rounded-full",children:i}),e.jsx("i",{className:"fa-solid fa-chevron-right text-gray-700 text-xs"})]})]})},w=()=>e.jsxs("div",{className:"text-center py-10 opacity-20 border-2 border-dashed border-white/5 rounded-3xl mt-4",children:[e.jsx("i",{className:"fa-solid fa-hashtag text-4xl mb-2"}),e.jsx("p",{className:"text-xs font-bold uppercase tracking-widest",children:"Nenhum canal extra ativo"})]}),k=({group:s,isAdmin:t,onChannelClick:n})=>{const c=a=>a==="general"?{id:"general",name:"Geral",onlyAdminsPost:!1,type:"text"}:(s.channels||[]).find(i=>i.id===a);return s.channelSections&&s.channelSections.length>0?e.jsx("div",{className:"space-y-4",children:s.channelSections.map(a=>e.jsxs("div",{className:"animate-fade-in",children:[e.jsx(m,{title:a.title}),e.jsx("div",{className:"space-y-3",children:(a.channelIds||[]).map(i=>{const r=c(i);return r?e.jsx(x,{id:r.id,groupId:s.id,name:r.name,icon:"fa-hashtag",isPrivate:r.onlyAdminsPost,onClick:()=>n(r.id)},r.id):null})})]},a.id))}):e.jsxs("div",{className:"space-y-4",children:[e.jsx(m,{title:"Discussões"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(x,{id:"general",groupId:s.id,name:"Geral",icon:"fa-hashtag",onClick:()=>n("general")}),(s.channels||[]).map(a=>e.jsx(x,{id:a.id,groupId:s.id,name:a.name,icon:"fa-hashtag",isPrivate:a.onlyAdminsPost,onClick:()=>n(a.id)},a.id)),(!s.channels||s.channels.length===0)&&!t&&e.jsx(w,{})]})]})},C=()=>e.jsx("div",{className:"text-center opacity-10 text-[8px] uppercase font-black tracking-[3px] mb-8 mt-auto",children:"Flux Community Engine v4.2"}),A=()=>{const s=g(),{id:t}=j(),[n,c]=o.useState(null),[d,a]=o.useState(!0),[i,r]=o.useState(!1);if(o.useEffect(()=>{if(t){const l=b.getGroupById(t);if(l){c(l);const f=N.getCurrentUserId(),p=l.creatorId===f||l.adminIds?.includes(f||"");r(!!p)}else s("/groups");a(!1)}},[t,s]),d||!n)return e.jsx("div",{className:"min-h-screen bg-[#0c0f14] flex items-center justify-center text-white",children:e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin text-2xl text-[#00c2ff]"})});const h=l=>{s(`/group-chat/${t}/${l}`)};return e.jsxs("div",{className:"min-h-screen bg-[#0a0c10] text-white font-['Inter'] flex flex-col",children:[e.jsx("style",{children:`
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
                    z-index: 60;
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
            `}),e.jsxs("header",{className:"platform-header",children:[e.jsx("button",{onClick:()=>s("/groups"),className:"text-[#00c2ff] text-xl p-2 -ml-4",children:e.jsx("i",{className:"fa-solid fa-arrow-left"})}),e.jsx("div",{className:"ml-2 flex flex-col",children:e.jsx("span",{className:"text-[10px] font-black text-[#00c2ff] uppercase tracking-[3px]",children:"Canais da Comunidade"})})]}),i&&e.jsx(v,{group:n}),e.jsxs("main",{className:"flex-1 p-5 pt-10 max-w-[600px] mx-auto w-full flex flex-col",children:[e.jsx(y,{groupName:n.name,coverImage:n.coverImage}),e.jsx(k,{group:n,isAdmin:i,onChannelClick:h}),e.jsx(C,{})]})]})};export{A as GroupChannelsList};
