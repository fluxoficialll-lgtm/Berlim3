const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/PaymentFlowModal-BqbqE59P.js","assets/index-BC19Iu_T.js","assets/index-DQp5J8os.css","assets/currencyService-BC2Bcej_.js","assets/VipSalesTracker-FD1TTkOP.js","assets/paypalService-Dk5je5dH.js","assets/PurchaseIntention-CwMn_lv1.js"])))=>i.map(i=>d[i]);
import{j as e,u as w,r as c,c as j,n as b,g as z,m as D,y as f,_ as E}from"./index-BC19Iu_T.js";import{c as B}from"./currencyService-BC2Bcej_.js";import{F as A}from"./Footer-CqKWM_In.js";import{p as N}from"./postService-XFLx8Vj8.js";import{M}from"./MainHeader-C_NQXNMS.js";const T=({activeFilter:t,onFilterChange:p})=>{const n=[{id:"all",label:"Todos"},{id:"like",label:"Curtidas"},{id:"comment",label:"Comentários"},{id:"follow",label:"Seguidores"},{id:"mention",label:"Menções"},{id:"sale",label:"Venda Realizada"},{id:"pending",label:"Pendentes"}];return e.jsxs("div",{id:"filterButtons",children:[e.jsx("style",{children:`
                #filterButtons { 
                    display: flex; 
                    flex-wrap: nowrap; 
                    gap: 8px; 
                    position: fixed; 
                    top: 80px; 
                    left: 0; 
                    width: 100%; 
                    padding: 10px 16px; 
                    background: #0c0f14; 
                    z-index: 10; 
                    box-shadow: 0 4px 8px rgba(0,0,0,0.3); 
                    overflow-x: auto; 
                    -webkit-overflow-scrolling: touch; 
                    scrollbar-width: none; 
                    border-bottom: 1px solid rgba(255,255,255,0.1); 
                }
                #filterButtons::-webkit-scrollbar { display: none; }
                .filter-btn { 
                    background: rgba(0,194,255,0.1); 
                    border: 1px solid #00c2ff; 
                    border-radius: 20px; 
                    color: #00c2ff; 
                    padding: 8px 16px; 
                    cursor: pointer; 
                    font-size: 14px; 
                    font-weight: 600; 
                    transition: 0.3s; 
                    white-space: nowrap; 
                }
                .filter-btn.active { background: #00c2ff; color: #000; transform: translateY(-1px); }
                .filter-btn:hover:not(.active) { background: rgba(0,194,255,0.2); }
            `}),n.map(o=>e.jsx("button",{className:`filter-btn ${t===o.id?"active":""}`,onClick:()=>p(o.id),children:o.label},o.id))]})},G=({notif:t,onFollowToggle:p,onPendingAction:n,onNavigate:o})=>e.jsxs("div",{className:`notification-item ${t.type==="sale"?"notification-sale":""} ${t.type==="pending"?"notification-pending":""}`,onClick:()=>t.type!=="pending"&&o(`/user/${t.username.replace("@","")}`),children:[e.jsx("style",{children:`
                .notification-item { display: flex; align-items: center; padding: 12px 0; margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); transition: background 0.2s; cursor: pointer; border-radius: 8px; }
                .notification-item:hover { background: rgba(255,255,255,0.05); }
                .notification-sale { background: rgba(0, 255, 130, 0.05); border-left: 5px solid #00ff82; padding-left: 7px; }
                .notification-pending { border-left: 5px solid #ffaa00; padding-left: 7px; }
                .notification-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; margin-right: 12px; border: 2px solid #00c2ff; }
                .notification-content { flex-grow: 1; display: flex; flex-direction: column; min-width: 0; }
                .notification-text { font-size: 15px; line-height: 1.4; color: #eee; }
                .notification-time { font-size: 12px; color: #aaa; margin-top: 4px; }
                .notification-action { margin-left: 10px; display: flex; gap: 5px; align-items: center; }
                .notification-action img { width: 60px; height: 60px; border-radius: 8px; object-fit: cover; border: 1px solid rgba(255,255,255,0.2); }
                .action-button { background: #00c2ff; color: #000; border: none; padding: 8px 12px; border-radius: 20px; cursor: pointer; font-weight: 600; transition: 0.3s; font-size: 12px; }
                .action-button.following { background: #1a1a1a; color: #00c2ff; border: 1px solid #00c2ff; }
                .action-button.primary { background: #00ff82; }
                .action-button.secondary { background: rgba(255,255,255,0.1); color: #fff; }
            `}),e.jsx("img",{src:t.avatar,className:"notification-avatar",alt:"Avatar"}),e.jsxs("div",{className:"notification-content",children:[e.jsxs("p",{className:"notification-text",children:[t.type==="like"&&e.jsxs(e.Fragment,{children:[e.jsx("b",{className:"font-bold",children:t.displayName})," curtiu sua publicação."]}),t.type==="comment"&&e.jsxs(e.Fragment,{children:[e.jsx("b",{className:"font-bold",children:t.displayName})," ",t.text]}),t.type==="follow"&&e.jsxs(e.Fragment,{children:[e.jsx("b",{className:"font-bold",children:t.displayName})," começou a te seguir: ",t.text||""]}),t.type==="mention"&&e.jsxs(e.Fragment,{children:[e.jsx("b",{className:"font-bold",children:t.displayName})," te mencionou em uma publicação."]}),t.type==="sale"&&e.jsxs(e.Fragment,{children:[e.jsx("b",{className:"font-bold",children:t.displayName}),": ",t.text]}),t.type==="pending"&&e.jsxs(e.Fragment,{children:[e.jsx("b",{className:"font-bold",children:t.displayName})," ",t.text]})]}),e.jsx("span",{className:"notification-time",children:N.formatRelativeTime(t.timestamp)})]}),e.jsxs("div",{className:"notification-action",children:[t.type==="follow"&&e.jsx("button",{className:`action-button ${t.isFollowing?"following":""}`,onClick:s=>{s.stopPropagation(),p(t.id,t.username)},children:t.isFollowing?"Seguindo":"Seguir"}),t.type==="sale"&&e.jsx("i",{className:"fa-solid fa-money-bill-wave",style:{color:"#00ff82",fontSize:"30px",marginRight:"10px"}}),t.type==="pending"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"action-button primary",onClick:s=>{s.stopPropagation(),n("accept",t)},children:t.subtype==="group_join"?"Aprovar":"Aceitar"}),e.jsx("button",{className:"action-button secondary",onClick:s=>{s.stopPropagation(),n("reject",t)},children:t.subtype==="group_join"?"Negar":"Recusar"})]}),(t.type==="like"||t.type==="comment")&&t.postImage&&e.jsx("img",{src:t.postImage,alt:"Post"})]})]}),$=({notif:t,onIgnore:p,onPay:n})=>{const o=w(),s=x=>{x.stopPropagation(),t.groupId&&n(t.groupId)},g=()=>{t.groupId&&o(`/vip-group-sales/${t.groupId}`)};return e.jsxs("div",{className:"notification-item-vip",onClick:g,children:[e.jsx("style",{children:`
                .notification-item-vip { 
                    display: flex; 
                    align-items: center; 
                    padding: 12px 10px; 
                    margin-bottom: 8px; 
                    border-bottom: 1px solid rgba(255,255,255,0.1); 
                    transition: background 0.2s; 
                    cursor: pointer; 
                    border-radius: 8px;
                    background: rgba(255, 215, 0, 0.05);
                    border-left: 5px solid #FFD700;
                }
                .notification-item-vip:hover { background: rgba(255, 215, 0, 0.08); }
                
                .notification-avatar-vip { 
                    width: 48px; 
                    height: 48px; 
                    border-radius: 50%; 
                    object-fit: cover; 
                    margin-right: 12px; 
                    border: 2px solid #FFD700; 
                    flex-shrink: 0;
                }

                .notification-content-vip { 
                    flex-grow: 1; 
                    display: flex; 
                    flex-direction: column; 
                    min-width: 0; 
                }
                
                .notification-text-vip { 
                    font-size: 14px; 
                    line-height: 1.4; 
                    color: #eee; 
                }

                .notification-meta-vip {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-top: 4px;
                }

                .notification-time-vip { 
                    font-size: 11px; 
                    color: #FFD700; 
                    font-weight: 700;
                    text-transform: uppercase;
                }
                
                .notification-relative-vip {
                    font-size: 11px;
                    color: #555;
                    font-weight: 600;
                }

                .notification-action-vip { 
                    margin-left: 10px; 
                    display: flex; 
                    gap: 6px; 
                    align-items: center; 
                }

                .action-button-vip { 
                    background: #00c2ff; 
                    color: #000; 
                    border: none; 
                    padding: 8px 14px; 
                    border-radius: 20px; 
                    cursor: pointer; 
                    font-weight: 800; 
                    transition: 0.3s; 
                    font-size: 11px; 
                    text-transform: uppercase;
                }
                
                .action-button-vip.primary { 
                    background: #00ff82; 
                }
                
                .action-button-vip.secondary { 
                    background: rgba(255,255,255,0.1); 
                    color: #fff; 
                }
                
                .action-button-vip:active {
                    transform: scale(0.95);
                }
            `}),e.jsx("img",{src:t.avatar,className:"notification-avatar-vip",alt:"VIP"}),e.jsxs("div",{className:"notification-content-vip",children:[e.jsxs("p",{className:"notification-text-vip",children:["Sua assinatura no grupo ",e.jsxs("b",{className:"font-bold text-white",children:['"',t.text,'"']})," expira em breve."]}),e.jsxs("div",{className:"notification-meta-vip",children:[e.jsx("span",{className:"notification-time-vip",children:t.time}),e.jsx("span",{className:"text-gray-700 text-[10px]",children:"•"}),e.jsx("span",{className:"notification-relative-vip",children:N.formatRelativeTime(t.timestamp)})]})]}),e.jsxs("div",{className:"notification-action-vip",children:[e.jsx("button",{className:"action-button-vip primary",onClick:s,children:"Pagar"}),e.jsx("button",{className:"action-button-vip secondary",onClick:x=>{x.stopPropagation(),p(t.id)},children:"Ignorar"})]})]})},U=c.lazy(()=>E(()=>import("./PaymentFlowModal-BqbqE59P.js"),__vite__mapDeps([0,1,2,3,4,5,6])).then(t=>({default:t.PaymentFlowModal}))),Y=()=>{const t=w(),[p,n]=c.useState([]),[o,s]=c.useState("all"),[g,x]=c.useState(!1),[h,k]=c.useState(null),[v,F]=c.useState(null),[C,P]=c.useState(null);c.useEffect(()=>{if(!j.getCurrentUserEmail()){t("/");return}const i=()=>{const d=b.getNotifications().map(l=>{const u=j.getUserByHandle(l.username);return u?{...l,displayName:u.profile?.nickname||u.profile?.name||l.username,username:l.username,avatar:u.profile?.photoUrl||l.avatar}:{...l,displayName:l.username}});n(d)};i(),b.markAllAsRead();const r=db.subscribe("notifications",i);return()=>r()},[t]);const S=async(a,i)=>{const r=f.isFollowing(i);r==="following"?await f.unfollowUser(i):await f.followUser(i),n(m=>m.map(d=>d.username===i?{...d,isFollowing:r!=="following"}:d))},I=async(a,i)=>{n(r=>r.filter(m=>m.id!==i.id));try{i.subtype==="friend"&&(a==="accept"?await f.acceptFollowRequest(i.username):await f.rejectFollowRequest(i.username)),b.removeNotification(i.id)}catch(r){console.error("Error handling notification action:",r)}},_=a=>{n(i=>i.filter(r=>r.id!==a)),b.removeNotification(a)},R=async a=>{const i=z.getGroupById(a);if(!i)return;k(i);const r=await D.detectCountry();F(r);const m=i.currency||"BRL",d=parseFloat(i.price||"0"),l=r.currency||"BRL",u=await B.convert(d,m,l);P(u),x(!0)},y=p.filter(a=>o==="all"?!0:o==="pending"?a.type==="pending"||a.type==="expiring_vip":a.type===o);return e.jsxs("div",{className:"h-[100dvh] bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden",children:[e.jsx(M,{}),e.jsx(T,{activeFilter:o,onFilterChange:s}),e.jsx("main",{className:"flex-grow flex flex-col items-center justify-start w-full mt-5 transition-all overflow-y-auto no-scrollbar",children:e.jsxs("div",{className:"w-full max-w-[600px] px-4 pt-[140px] pb-[120px]",children:[e.jsx("h2",{className:"text-2xl font-700 mb-5 text-[#00c2ff] border-b-2 border-[#00c2ff]/30 pb-2",children:"Notificações"}),y.length===0?e.jsxs("div",{style:{textAlign:"center",color:"#777",marginTop:"50px",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},children:[e.jsx("i",{className:"fa-regular fa-bell-slash text-4xl opacity-50"}),e.jsx("span",{children:"Nenhuma notificação encontrada."})]}):y.map(a=>a.type==="expiring_vip"?e.jsx($,{notif:a,onIgnore:_,onPay:R},a.id):e.jsx(G,{notif:a,onFollowToggle:S,onPendingAction:I,onNavigate:t},a.id))]})}),e.jsx(A,{}),e.jsx(c.Suspense,{fallback:null,children:g&&h&&e.jsx(U,{isOpen:g,onClose:()=>x(!1),group:h,provider:v?.countryCode==="BR"?"syncpay":"stripe",convertedPriceInfo:C,geo:v})})]})};export{Y as Notifications};
