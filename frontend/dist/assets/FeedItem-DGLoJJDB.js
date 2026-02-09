import{u as S,r as i,j as e,c as $,g as P}from"./index-BC19Iu_T.js";import{U as I,A}from"./UserBadge-CHMRiDZl.js";import{p as F}from"./postService-XFLx8Vj8.js";const L=({username:t,time:l,location:s,isAdult:o,isAd:n,onClick:a,isOwner:r,onDelete:c,authorEmail:x})=>{const h=S(),[f,m]=i.useState(null),[b,g]=i.useState(!1),[j,w]=i.useState(!1),[C,k]=i.useState(!0);i.useEffect(()=>{if(!t)return;(async()=>{const N=await $.fetchUserByHandle(t,x);N&&m(N),k(!1)})()},[t,x]);const p=d=>{d.stopPropagation();const N=t.replace("@","").toLowerCase().trim();h(`/user/${N}`,{state:{emailFallback:x}})},u=d=>{d.stopPropagation(),f?.profile?.photoUrl?w(!0):p(d)},v=f?.profile?.nickname||f?.profile?.name||t.replace("@","");return e.jsxs("div",{className:"flex items-center justify-between mb-3 relative px-4 pt-4",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(I,{avatarUrl:f?.profile?.photoUrl,nickname:v,handle:t,isVip:!1,avatarSize:"md",showHandle:!1,onAvatarClick:u,onNameClick:p}),e.jsxs("div",{className:"flex flex-col ml-[-8px]",children:[e.jsx("div",{className:"flex items-center",children:o&&e.jsx("span",{className:"bg-[#ff4d4d] text-white text-[9px] font-bold px-1.5 rounded ml-1",children:"18+"})}),e.jsx("span",{className:"text-[11px] text-[#aaa] font-medium",children:l})]})]}),r&&e.jsxs("div",{className:"relative",children:[e.jsx("button",{onClick:d=>{d.stopPropagation(),g(!b)},className:"text-gray-400 p-2 hover:text-white transition-colors",children:e.jsx("i",{className:"fa-solid fa-ellipsis-vertical"})}),b&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"fixed inset-0 z-10",onClick:d=>{d.stopPropagation(),g(!1)}}),e.jsx("div",{className:"absolute right-0 top-8 bg-[#1a1e26] border border-white/10 rounded-lg shadow-xl z-20 overflow-hidden w-32",onClick:d=>d.stopPropagation(),children:e.jsxs("button",{onClick:d=>{c(d),g(!1)},className:"w-full text-left px-4 py-3 text-red-400 hover:bg-white/5 text-sm font-semibold flex items-center gap-2",children:[e.jsx("i",{className:"fa-solid fa-trash-can"})," Excluir"]})})]})]}),e.jsx(A,{isOpen:j,onClose:()=>w(!1),imageSrc:f?.profile?.photoUrl||"",username:v})]})},z=({text:t,onUserClick:l,className:s="px-4 mb-3"})=>{const[o,n]=i.useState(3),[a,r]=i.useState(0),[c,x]=i.useState(!0),h=i.useRef(null),f=24,m=i.useMemo(()=>t.match(/[^.!?]+[.!?]+(\s+|$)|[^.!?]+$/g)||[t],[t]);i.useEffect(()=>{if(!h.current||a>=m.length){a>=m.length&&x(!1);return}const p=h.current.scrollHeight;Math.round(p/f)<o&&a<m.length?r(v=>v+1):x(!1)},[a,o,m,t]);const b=p=>p.split(/(@\w+)/g).map((u,v)=>u.startsWith("@")?e.jsx("span",{className:"text-[#00c2ff] font-semibold cursor-pointer hover:underline",onClick:d=>{d.stopPropagation(),l(u)},children:u},v):u),g=p=>{p.stopPropagation(),x(!0),n(u=>u+3)},j=p=>{p.stopPropagation(),n(3),r(0),x(!0)},w=a>=m.length,C=!w&&!c,k=w&&m.length>1&&o>3;return e.jsxs("div",{className:s,children:[e.jsx("div",{ref:h,className:"text-[15px] leading-[1.6] whitespace-pre-wrap break-words text-gray-200 font-normal overflow-hidden",children:b(m.slice(0,a).join(""))}),C&&e.jsx("button",{onClick:g,className:"text-[#00c2ff] font-bold cursor-pointer text-sm hover:underline bg-transparent border-none p-0 mt-1",children:"Ler mais"}),k&&e.jsx("button",{onClick:j,className:"text-[#00c2ff] font-bold cursor-pointer text-sm hover:underline bg-transparent border-none p-0 mt-1",children:"Ler menos"})]})},M=({images:t,onImageClick:l})=>{const[s,o]=i.useState(0),n=i.useRef(null),a=()=>{if(n.current){const r=n.current.scrollLeft,c=n.current.offsetWidth,x=Math.round(r/c);x!==s&&o(x)}};return e.jsxs("div",{className:"relative w-full mb-2.5 overflow-hidden rounded-xl bg-black aspect-[4/5]",children:[e.jsxs("div",{className:"absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full z-10 backdrop-blur-sm",children:[s+1,"/",t.length]}),e.jsx("div",{ref:n,className:"flex overflow-x-auto snap-x snap-mandatory no-scrollbar w-full h-full",style:{scrollbarWidth:"none",msOverflowStyle:"none"},onScroll:a,children:t.map((r,c)=>e.jsx("img",{src:r,loading:"lazy",alt:`Slide ${c}`,className:"w-full h-full flex-shrink-0 snap-center object-cover cursor-pointer",onClick:()=>l&&l(r)},c))}),e.jsx("div",{className:"absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10",children:t.map((r,c)=>e.jsx("div",{className:`w-1.5 h-1.5 rounded-full transition-all ${s===c?"bg-[#00c2ff] scale-125":"bg-white/50"}`},c))})]})},R=({groupId:t})=>{const l=S(),[s,o]=i.useState(null);if(i.useEffect(()=>{const r=P.getGroupById(t);r&&o(r)},[t]),!s)return null;const n=r=>{r.stopPropagation(),s.isVip?l(`/vip-group-sales/${s.id}`):l(`/group-landing/${s.id}`)},a=s.isVip;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
                .group-attachment-card {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: ${a?"linear-gradient(145deg, rgba(255, 215, 0, 0.05), rgba(0, 0, 0, 0.4))":"linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.2))"};
                    border: ${a?"1px solid rgba(255, 215, 0, 0.3)":"1px solid rgba(255, 255, 255, 0.1)"};
                    border-radius: 12px;
                    padding: 12px;
                    margin: 10px 16px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                    position: relative;
                    overflow: hidden;
                }
                .group-attachment-card:hover {
                    background: ${a?"rgba(255, 215, 0, 0.1)":"rgba(255, 255, 255, 0.08)"};
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                }
                .ga-left {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    overflow: hidden;
                    flex: 1;
                }
                .ga-cover {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    object-fit: cover;
                    flex-shrink: 0;
                    border: ${a?"2px solid rgba(255, 215, 0, 0.5)":"1px solid rgba(255,255,255,0.2)"};
                }
                .ga-cover.placeholder {
                    background: #1e2531;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: ${a?"#FFD700":"#555"};
                    font-size: 20px;
                }
                .ga-info {
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                    gap: 2px;
                }
                .ga-name {
                    font-weight: 700;
                    font-size: 15px;
                    color: #fff;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .ga-type {
                    font-size: 10px;
                    color: ${a?"#FFD700":"#aaa"};
                    text-transform: uppercase;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                .ga-btn {
                    background: ${a?"linear-gradient(90deg, #FFD700, #FDB931)":"linear-gradient(90deg, #00c2ff, #0099ff)"};
                    color: ${a?"#000":"#fff"};
                    border: none;
                    padding: 8px 18px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.2s;
                    white-space: nowrap;
                    margin-left: 10px;
                    box-shadow: ${a?"0 0 15px rgba(255, 215, 0, 0.2)":"0 0 15px rgba(0, 194, 255, 0.2)"};
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .ga-btn:hover {
                    transform: scale(1.05);
                    box-shadow: ${a?"0 0 20px rgba(255, 215, 0, 0.4)":"0 0 20px rgba(0, 194, 255, 0.4)"};
                }
                .ga-btn:active {
                    transform: scale(0.95);
                }
                .shine-effect {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%);
                    transform: skewX(-25deg);
                    animation: shine 4s infinite;
                    pointer-events: none;
                }
                @keyframes shine {
                    0% { left: -100%; }
                    20% { left: 200%; }
                    100% { left: 200%; }
                }
            `}),e.jsxs("div",{className:"group-attachment-card",onClick:r=>r.stopPropagation(),children:[a&&e.jsx("div",{className:"shine-effect"}),e.jsxs("div",{className:"ga-left",children:[s.coverImage?e.jsx("img",{src:s.coverImage,className:"ga-cover",alt:"Group"}):e.jsx("div",{className:"ga-cover placeholder",children:e.jsx("i",{className:`fa-solid ${s.isVip?"fa-crown":"fa-users"}`})}),e.jsxs("div",{className:"ga-info",children:[e.jsx("div",{className:"ga-name",children:s.name}),e.jsx("div",{className:"ga-type",children:a?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fa-solid fa-lock text-[9px]"})," ÁREA RESTRITA"]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fa-solid fa-user-group text-[9px]"})," COMUNIDADE ATIVA"]})})]})]}),e.jsx("button",{className:"ga-btn",onClick:n,children:"ACESSAR"})]})]})},E=t=>t?t>=1e3?(t/1e3).toFixed(1).replace(/\.0$/,"")+"k":t.toString():"0",D=({post:t,onVote:l})=>{if(!t.pollOptions)return null;const s=t.pollOptions.reduce((n,a)=>n+a.votes,0),o=n=>s===0?0:Math.round(n/s*100);return e.jsxs("div",{className:"mx-4 mt-2.5 mb-2.5 p-3 bg-[#00c2ff0d] rounded-xl border border-[#00c2ff22]",children:[t.pollOptions.map((n,a)=>{const r=o(n.votes),c=t.votedOptionIndex===a;return e.jsxs("div",{onClick:()=>l(t.id,a),className:`relative mb-2 p-3 rounded-lg cursor-pointer overflow-hidden font-medium transition-colors ${c?"bg-[#00c2ff] text-black font-bold":"bg-[#1e2531] hover:bg-[#28303f]"}`,children:[e.jsx("div",{className:"absolute top-0 left-0 h-full bg-[#00c2ff] opacity-30 z-0 transition-all duration-500",style:{width:`${r}%`}}),e.jsxs("div",{className:"relative z-10 flex justify-between items-center text-sm",children:[e.jsx("span",{children:n.text}),e.jsxs("span",{children:[r,"%"]})]})]},a)}),e.jsxs("div",{className:"text-right text-xs text-gray-500 mt-1",children:[E(s)," votos"]})]})},y=t=>t?t>=1e6?(t/1e6).toFixed(1).replace(/\.0$/,"")+"M":t>=1e3?(t/1e3).toFixed(1).replace(/\.0$/,"")+"k":t.toString():"0",O=({post:t,onLike:l,onCommentClick:s,onShare:o})=>e.jsxs("div",{className:"grid grid-cols-4 px-2 py-3 mt-1 border-t border-white/5 gap-1",children:[e.jsxs("button",{onClick:()=>l(t.id),className:`flex items-center justify-center gap-2 transition-all ${t.liked?"text-red-500 scale-110":"text-gray-400 hover:text-[#00c2ff]"}`,children:[e.jsx("i",{className:`${t.liked?"fa-solid":"fa-regular"} fa-heart text-xl`}),e.jsx("span",{className:"text-xs font-semibold",children:y(t.likes)})]}),e.jsxs("button",{onClick:()=>s(t.id),className:"flex items-center justify-center gap-2 text-gray-400 hover:text-[#00c2ff] transition-all",children:[e.jsx("i",{className:"fa-regular fa-comment text-xl"}),e.jsx("span",{className:"text-xs font-semibold",children:y(t.comments)})]}),e.jsx("button",{onClick:()=>o(t),className:"flex items-center justify-center text-gray-400 hover:text-[#00c2ff] transition-all",children:e.jsx("i",{className:"fa-regular fa-paper-plane text-xl"})}),e.jsxs("div",{className:"flex items-center justify-center gap-2 text-gray-400 transition-all cursor-default opacity-70",children:[e.jsx("i",{className:"fa-solid fa-eye text-lg"}),e.jsx("span",{className:"text-xs font-semibold",children:y(t.views)})]})]}),T={conferir:"fa-eye",participar:"fa-user-group",comprar:"fa-cart-shopping",assinar:"fa-credit-card",entrar:"fa-arrow-right-to-bracket",descubra:"fa-compass",baixar:"fa-download","saiba mais":"fa-circle-info"},G=({post:t,currentUserId:l,onLike:s,onDelete:o,onUserClick:n,onCommentClick:a,onShare:r,onVote:c,onCtaClick:x})=>{const[h,f]=i.useState(null),m=(g="")=>{const j=g.toLowerCase();return T[j]||"fa-arrow-right"},b=t.type==="video"||t.type==="photo"&&(!!t.image||t.images&&t.images.length>0);return e.jsxs("div",{"data-post-id":t.id,className:"feed-post-item relative bg-[#1a1e26] border border-white/5 rounded-2xl pb-2 mb-6 shadow-lg overflow-hidden animate-fade-in",children:[e.jsx(L,{username:t.username,authorEmail:t.authorEmail,time:F.formatRelativeTime(t.timestamp),location:t.location,isAdult:t.isAdultContent,isAd:t.isAd,onClick:()=>n(t.username),isOwner:l?t.authorId===l:!1,onDelete:g=>o(g,t.id)}),e.jsx(z,{text:t.text||"",onUserClick:n}),t.type==="photo"&&e.jsx("div",{className:"w-full overflow-hidden bg-black mb-0",children:t.images&&t.images.length>1?e.jsx(M,{images:t.images,onImageClick:f}):t.image&&e.jsx("img",{src:t.image,loading:"lazy",alt:"Post content",className:"w-full h-auto max-h-[600px] object-contain cursor-pointer",onClick:()=>f(t.image)})}),t.type==="video"&&t.video&&e.jsx("div",{className:"w-full overflow-hidden bg-black mb-0",children:e.jsx("video",{src:t.video,controls:!0,className:"w-full h-auto max-h-[600px] object-contain"})}),t.isAd&&t.ctaLink?e.jsxs("div",{className:`bg-[#00c2ff]/10 p-4 px-5 flex justify-between items-center border-[#00c2ff]/20 transition-all ${b?"w-full border-t mb-0":"mx-4 mb-4 rounded-xl border"}`,children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"text-[10px] text-[#00c2ff] font-black tracking-[2px] uppercase",children:"Patrocinado"}),e.jsx("span",{className:"text-[11px] text-gray-400 font-bold",children:"Sugestão Flux"})]}),e.jsxs("button",{className:"bg-[#00c2ff] text-black border-none px-6 py-2.5 rounded-xl text-xs font-black flex items-center gap-2.5 hover:bg-white transition-all shadow-[0_4px_15px_rgba(0,194,255,0.3)] active:scale-95",onClick:()=>x(t.ctaLink),children:[e.jsx("i",{className:`fa-solid ${m(t.ctaText)}`}),e.jsx("span",{className:"uppercase",children:t.ctaText||"Saiba Mais"})]})]}):t.relatedGroupId&&e.jsx("div",{className:"mt-2 mb-2",children:e.jsx(R,{groupId:t.relatedGroupId})}),t.type==="poll"&&e.jsx(D,{post:t,onVote:c}),e.jsx(O,{post:t,onLike:s,onCommentClick:a,onShare:r}),h&&e.jsxs("div",{className:"fixed inset-0 z-[60] bg-black bg-opacity-95 flex items-center justify-center p-2",onClick:()=>f(null),children:[e.jsx("button",{className:"absolute top-4 right-4 text-white text-4xl bg-black/50 rounded-full w-10 h-10 flex items-center justify-center",onClick:()=>f(null),children:"×"}),e.jsx("img",{src:h,alt:"Zoom",className:"max-w-full max-h-full object-contain rounded-lg shadow-2xl",onClick:g=>g.stopPropagation()})]})]})};export{G as F};
