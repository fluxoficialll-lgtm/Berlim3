const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/TrackingModal-Djzk6djA.js","assets/index-BC19Iu_T.js","assets/index-DQp5J8os.css"])))=>i.map(i=>d[i]);
import{j as e,u as z,i as J,a as Y,e as W,r as o,g as j,c as O,k as X,_ as K}from"./index-BC19Iu_T.js";import{F as Q}from"./Footer-CqKWM_In.js";import{M as Z}from"./MainHeader-C_NQXNMS.js";const ee=({onClick:t})=>e.jsxs("button",{className:"join-via-link-btn w-full padding-4 mb-5 bg-[#00c2ff0d] border border-dashed border-[#00c2ff] rounded-[12px] text-[#00c2ff] font-semibold cursor-pointer flex items-center justify-center gap-2.5 transition-all h-[54px]",onClick:t,children:[e.jsx("i",{className:"fa-solid fa-link"})," Entrar no Grupo via Link"]}),se=({group:t,isActive:d,onTracking:u,onDelete:g})=>{const m=z();return d?e.jsxs("div",{className:"group-dropdown-container absolute right-2 top-10 z-[100] animate-pop-in",children:[e.jsx("style",{children:`
                .group-dropdown-card {
                    min-width: 200px;
                    background: rgba(26, 30, 38, 0.95);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 18px;
                    padding: 6px;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
                }
                
                .dropdown-btn {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 14px;
                    background: transparent;
                    border: none;
                    border-radius: 12px;
                    color: #efefef;
                    font-size: 13px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-align: left;
                }

                .dropdown-btn:hover {
                    background: rgba(255, 255, 255, 0.05);
                    transform: translateX(2px);
                }

                .dropdown-btn:active {
                    transform: scale(0.98);
                }

                .dropdown-btn i {
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    font-size: 14px;
                    transition: 0.2s;
                }

                .icon-settings { background: rgba(0, 194, 255, 0.1); color: #00c2ff; }
                .icon-preview { background: rgba(255, 215, 0, 0.1); color: #FFD700; }
                .icon-tracking { background: rgba(0, 255, 130, 0.1); color: #00ff82; }
                .icon-delete { background: rgba(255, 77, 77, 0.1); color: #ff4d4d; }

                .dropdown-btn.danger:hover {
                    background: rgba(255, 77, 77, 0.1);
                    color: #ff4d4d;
                }

                .btn-label {
                    flex: 1;
                }

                .shortcut-hint {
                    font-size: 10px;
                    color: rgba(255, 255, 255, 0.2);
                    font-weight: 800;
                }
            `}),e.jsxs("div",{className:"group-dropdown-card",onClick:c=>c.stopPropagation(),children:[e.jsxs("button",{className:"dropdown-btn",onClick:c=>{c.stopPropagation(),m(`/group-settings/${t.id}`)},children:[e.jsx("i",{className:"fa-solid fa-gear icon-settings"}),e.jsx("span",{className:"btn-label",children:"Configurações"})]}),t.isVip&&e.jsxs("button",{className:"dropdown-btn",onClick:c=>{c.stopPropagation(),m(`/vip-group-sales/${t.id}`)},children:[e.jsx("i",{className:"fa-solid fa-eye icon-preview"}),e.jsx("span",{className:"btn-label",children:"Preview de Venda"})]}),e.jsxs("button",{className:"dropdown-btn",onClick:u,children:[e.jsx("i",{className:"fa-solid fa-link icon-tracking"}),e.jsx("span",{className:"btn-label",children:"Rastreamento"})]}),e.jsx("div",{className:"h-px bg-white/5 my-1 mx-2"}),e.jsxs("button",{className:"dropdown-btn danger",onClick:g,children:[e.jsx("i",{className:"fa-solid fa-trash icon-delete"}),e.jsx("span",{className:"btn-label",children:"Excluir Grupo"}),e.jsx("span",{className:"shortcut-hint",children:"PERMANENTE"})]})]})]}):null},te=({group:t,currentUserEmail:d,unreadCount:u,isMenuActive:g,onToggleMenu:m,onItemClick:c,onTracking:I,onDelete:k})=>{const v=t.creatorEmail===d,N=J.chats.getAll(),S=Object.values(N).filter(i=>{const p=i.id.toString();return p===t.id||p.startsWith(`${t.id}_`)});let r=null;S.forEach(i=>{if(i.messages&&i.messages.length>0){const p=i.messages[i.messages.length-1];(!r||p.id>r.id)&&(r=p)}});let w="",b="";if(r){const C=(r.senderEmail||r.senderId||"").toLowerCase()===d?.toLowerCase()?"Você: ":r.senderName?`${r.senderName}: `:"",E=r.contentType==="text"?r.text:r.contentType==="image"?"📷 Foto":r.contentType==="video"?"🎥 Vídeo":r.contentType==="audio"?"🎤 Áudio":"📎 Arquivo";w=C+E,b=r.timestamp}else w=t.isSalesPlatformEnabled?"Acesse o catálogo do grupo":t.description||"Toque para abrir a comunidade",b="Novo";return e.jsxs("div",{className:"group-preview flex items-center p-3 border-b border-white/5 cursor-pointer transition-all relative",onClick:c,children:[e.jsx("div",{className:"group-avatar w-[50px] h-[50px] rounded-full mr-4 border-2 border-[#00c2ff] bg-[#00c2ff33] flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden",children:t.coverImage?e.jsx("img",{src:t.coverImage,alt:t.name,className:"w-full h-full object-cover"}):e.jsx("i",{className:`fa-solid ${t.isVip?"fa-crown":"fa-users"}`})}),e.jsxs("div",{className:"group-info flex flex-col flex-grow min-w-0 mr-2.5",children:[e.jsx("div",{className:"groupname font-bold text-base mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis text-white",children:t.name}),e.jsx("div",{className:`last-message text-sm whitespace-nowrap overflow-hidden text-ellipsis ${u>0?"text-white font-semibold":"text-gray-400"}`,children:w})]}),e.jsxs("div",{className:"flex flex-col items-end flex-shrink-0",children:[e.jsx("div",{className:`text-[10px] uppercase font-bold ${u>0?"text-[#00c2ff]":"text-gray-500"}`,children:b}),u>0&&e.jsx("div",{className:"group-unread-badge bg-[#ff4d4d] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center mt-1",children:u})]}),v&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"group-menu-btn absolute right-1 top-1 text-gray-500 p-2 cursor-pointer z-[5]",onClick:m,children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})}),e.jsx(se,{group:t,isActive:g,onTracking:I,onDelete:k})]})]})},ne=({visible:t,onClick:d})=>e.jsx("button",{onClick:d,className:`fixed bottom-[105px] right-[20px] w-[60px] h-[60px] bg-[#00c2ff] border-none rounded-full text-white cursor-pointer shadow-[0_4px_12px_rgba(0,194,255,0.3)] z-20 flex items-center justify-center transition-transform duration-300 ${t?"scale-100":"scale-0"}`,children:e.jsx("i",{className:"fa-solid fa-plus text-2xl"})}),re=o.lazy(()=>K(()=>import("./TrackingModal-Djzk6djA.js"),__vite__mapDeps([0,1,2])).then(t=>({default:t.TrackingModal}))),le=()=>{const t=z(),d=Y(),{showAlert:u,showConfirm:g,showPrompt:m}=W(),[c,I]=o.useState(!0),[k,v]=o.useState([]),[N,S]=o.useState(null),[r,w]=o.useState(null),[b,i]=o.useState(null),[p,C]=o.useState(!1),[E,R]=o.useState(null),[M,U]=o.useState(!0),[$,B]=o.useState(!0),[A,P]=o.useState(0),G=10,V=o.useRef(0),T=o.useRef(null),f=o.useCallback((s,n=!1)=>{const{groups:a,hasMore:l}=j.getGroupsPaginated(s,G);n?(v(a),P(G)):(v(x=>{const L=new Set(x.map(h=>h.id)),y=a.filter(h=>!L.has(h.id));return[...x,...y]}),P(x=>x+G)),B(l),U(!1)},[]);o.useEffect(()=>{const s=O.getCurrentUserEmail(),n=O.getCurrentUserId();if(!s){t("/");return}S(s),w(n),f(0,!0),j.fetchGroups();const l=new URLSearchParams(d.search).get("join");l&&(F(l),t("/groups",{replace:!0}));const x=db.subscribe("groups",()=>{f(0,!0)}),L=db.subscribe("chats",()=>{f(0,!0)}),y=()=>{const _=window.scrollY;I(_<=V.current||_<=80),V.current=_},h=()=>i(null);return window.addEventListener("scroll",y),document.addEventListener("click",h),()=>{x(),L(),window.removeEventListener("scroll",y),document.removeEventListener("click",h)}},[t,d.search,f]),o.useEffect(()=>{const s=new IntersectionObserver(n=>{n[0].isIntersecting&&$&&!M&&f(A)},{threshold:.5});return T.current&&s.observe(T.current),()=>s.disconnect()},[$,M,A,f]);const D=s=>{const n=s.creatorEmail===N,a=s.memberIds?.includes(r||"");if(s.isSalesPlatformEnabled&&(n||a)){t(`/group-platform/${s.id}`);return}if(n||a){if(s.isVip&&!n&&r&&!db.vipAccess.check(r,s.id)){t(`/vip-group-sales/${s.id}`);return}const l=s.channels&&s.channels.length>0;t(l?`/group/${s.id}/channels`:`/group-chat/${s.id}`)}else s.isVip?t(`/vip-group-sales/${s.id}`):t(`/group-landing/${s.id}`)},F=s=>{if(!s.trim())return;let n=s;n.includes("?join=")&&(n=n.split("?join=")[1]);const a=j.joinGroupByLinkCode(n);if(a.success)if(u("Sucesso!",a.message),a.groupId){const l=j.getGroupById(a.groupId);l&&l.channels&&l.channels.length>0?t(`/group/${a.groupId}/channels`):t(`/group-chat/${a.groupId}`)}else f(0,!0);else u("Ops!",a.message)},q=async(s,n)=>{n.stopPropagation(),i(null),await g("Excluir Grupo?","Tem certeza que deseja excluir este grupo permanentemente?","Excluir","Cancelar")&&(j.deleteGroup(s),v(a=>a.filter(l=>l.id!==s)))},H=(s,n)=>{n.stopPropagation(),i(null),R(s),C(!0)};return e.jsxs("div",{className:"min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-x-hidden",children:[e.jsx(Z,{leftContent:e.jsx("button",{onClick:()=>t("/top-groups"),className:"bg-none border-none text-[#00c2ff] text-lg cursor-pointer",children:e.jsx("i",{className:"fa-solid fa-ranking-star"})}),rightContent:e.jsx("button",{onClick:()=>t("/messages"),className:"bg-none border-none text-[#00c2ff] text-lg cursor-pointer",children:e.jsx("i",{className:"fa-solid fa-message"})}),onLogoClick:()=>window.scrollTo({top:0,behavior:"smooth"})}),e.jsxs("main",{className:"flex-grow pt-[100px] pb-[100px] px-4",children:[e.jsx(ee,{onClick:async()=>{const s=await m("Entrar via Link","Cole o código do grupo:","Ex: AF72B");s&&F(s)}}),e.jsxs("div",{className:"w-full",children:[k.length>0?k.map(s=>e.jsx(te,{group:s,currentUserEmail:N,unreadCount:X.getGroupUnreadCount(s.id),isMenuActive:b===s.id,onToggleMenu:n=>{n.stopPropagation(),i(b===s.id?null:s.id)},onItemClick:()=>D(s),onTracking:n=>H(s,n),onDelete:n=>q(s.id,n)},s.id)):M?e.jsx("div",{className:"text-center mt-10",children:e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin text-2xl text-[#00c2ff]"})}):e.jsx("div",{className:"text-center text-gray-500 mt-10",children:"Você não participa de nenhum grupo."}),e.jsx("div",{ref:T,className:"h-10"})]})]}),e.jsx(ne,{visible:c,onClick:()=>t("/create-group")}),e.jsx(Q,{visible:c}),p&&E&&e.jsx(o.Suspense,{fallback:null,children:e.jsx(re,{isOpen:p,onClose:()=>C(!1),group:E})})]})};export{le as Groups};
