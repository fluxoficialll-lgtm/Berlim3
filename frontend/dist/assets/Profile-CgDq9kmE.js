import{u as M,a as J,e as K,r as p,c as _,y as I,j as e}from"./index-BC19Iu_T.js";import{p as $}from"./postService-XFLx8Vj8.js";import{m as Q}from"./marketplaceService-ov_b-P0x.js";import{F as D}from"./FeedItem-DGLoJJDB.js";import{F as X}from"./Footer-CqKWM_In.js";import{a as Y,A as Z}from"./UserBadge-CHMRiDZl.js";import{M as ee}from"./MainHeader-C_NQXNMS.js";import{U as oe}from"./UserAvatar-BWaKHm2D.js";import{P as te,a as se,b as ae}from"./ProfileProductsGrid-BcnAIYzq.js";import"./ProductCard-CO49MvpN.js";const ie=()=>{const s=M(),i=J(),{showConfirm:m}=K(),[f,n]=p.useState("posts"),[x,u]=p.useState([]),[b,w]=p.useState([]),[c,v]=p.useState(null),[N,C]=p.useState(0),[j,P]=p.useState(0),[S,U]=p.useState(null),[O,k]=p.useState([]),[z,L]=p.useState(!1),F=p.useRef(null),g=p.useCallback(()=>{const o=_.getCurrentUser();if(!o)return;v(o);const r=$.getUserPosts(o.id)||[];u(r.sort((a,h)=>h.timestamp-a.timestamp));const d=Q.getItems().filter(a=>a.sellerId===o.email||a.sellerId===o.id)||[];if(w(d.sort((a,h)=>h.timestamp-a.timestamp)),o.profile&&o.profile.name){const a=I.getFollowers(o.profile.name);C(a.length)}if(o.id){const a=I.getFollowing(o.id);P(a.length)}},[]);p.useEffect(()=>{i.state&&i.state.activeTab&&n(i.state.activeTab)},[i.state]),p.useEffect(()=>{if(!_.getCurrentUserEmail()){s("/");return}g();const r=db.subscribe("posts",g),d=db.subscribe("relationships",g),a=db.subscribe("users",g);return()=>{r(),d(),a()}},[s,g]);const E=async(o,r)=>{r.stopPropagation(),await m("Excluir Post","Tem certeza que deseja excluir este post permanentemente?","Excluir","Cancelar")&&await $.deletePost(o)},T=o=>{$.toggleLike(o),u(r=>r.map(d=>{if(d.id===o){const a=!d.liked;return{...d,liked:a,likes:d.likes+(d.liked?-1:1)}}return d}))},A=o=>{if(!c)return;let r=[];o==="followers"&&c.profile?.name?r=I.getFollowers(c.profile.name):o==="following"&&c.id&&(r=I.getFollowing(c.id)),k(r),U(o)},t=()=>{U(null),k([])},l=o=>{t();const r=o.replace("@","");s(`/user/${r}`)},y=async o=>{const r=`${window.location.origin}/#/post/${o.id}`;if(navigator.share)try{await navigator.share({title:`Post de ${o.username}`,text:(o.text||"").substring(0,100),url:r})}catch{}else navigator.clipboard.writeText(r),alert("Link copiado!");$.incrementShare(o.id)},R=o=>{s(`/user/${o.replace("@","")}`)},V=(o,r)=>{u(d=>d.map(a=>{if(a.id===o&&a.pollOptions&&a.votedOptionIndex==null){const h=[...a.pollOptions];return h[r].votes+=1,{...a,pollOptions:h,votedOptionIndex:r}}return a}))},W=c?.profile?.nickname||c?.profile?.name||"Usuário",B=c?.profile?.name?`@${c.profile.name}`:"@usuario",H=c?.profile?.bio||"Sem biografia definida.",G=c?.profile?.photoUrl,q=c?.profile?.website;return{navigate:s,activeTab:f,setActiveTab:n,myPosts:x,myProducts:b,user:c,followersCount:N,followingCount:j,followListType:S,followListData:O,isPreviewOpen:z,setIsPreviewOpen:L,scrollRef:F,deletePost:E,handleLike:T,handleShowFollowList:A,closeFollowList:t,navigateToUserProfile:l,handleShare:y,handleUserClick:R,handleVote:V,handleNickname:W,handleUsername:B,displayBio:H,displayAvatar:G,displayWebsite:q}},le=({type:s,data:i,onClose:m,onUserClick:f})=>s?e.jsxs("div",{className:"follow-modal-overlay fixed inset-0 bg-black/80 z-[100] flex items-center justify-center animate-fade-in",onClick:m,children:[e.jsx("style",{children:`
                .follow-modal {
                    background: #1a1e26;
                    width: 90%;
                    max-width: 350px;
                    border-radius: 20px;
                    height: 70vh;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 10px 40px rgba(0,0,0,0.6);
                    animation: popIn 0.3s ease;
                }
                .follow-header {
                    padding: 18px 20px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.02);
                }
                .follow-header h3 {
                    font-size: 16px;
                    font-weight: 700;
                    margin: 0;
                    color: #00c2ff;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .close-modal-btn {
                    background: none;
                    border: none;
                    color: #888;
                    font-size: 24px;
                    cursor: pointer;
                    line-height: 1;
                }
                .follow-list {
                    flex-grow: 1;
                    overflow-y: auto;
                    padding: 10px 0;
                }
                .follow-item {
                    display: flex;
                    align-items: center;
                    padding: 12px 20px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .follow-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                }
                .f-avatar {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-right: 15px;
                    background: #333;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #555;
                    border: 2px solid rgba(0, 194, 255, 0.2);
                }
                .f-info {
                    display: flex;
                    flex-direction: column;
                }
                .f-name {
                    font-size: 14px;
                    font-weight: 600;
                    color: #fff;
                }
                .f-username {
                    font-size: 12px;
                    color: #888;
                }
                .empty-state {
                    padding: 40px 20px;
                    text-align: center;
                    color: #555;
                    font-size: 14px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                }
                .empty-state i {
                    font-size: 40px;
                    opacity: 0.3;
                }
            `}),e.jsxs("div",{className:"follow-modal",onClick:n=>n.stopPropagation(),children:[e.jsxs("div",{className:"follow-header",children:[e.jsx("h3",{children:s==="followers"?"Seguidores":"Seguindo"}),e.jsx("button",{className:"close-modal-btn",onClick:m,children:"×"})]}),e.jsx("div",{className:"follow-list no-scrollbar",children:i.length>0?i.map((n,x)=>e.jsxs("div",{className:"follow-item",onClick:()=>f(n.username),children:[n.avatar?e.jsx("img",{src:n.avatar,className:"f-avatar",alt:n.name}):e.jsx("div",{className:"f-avatar",children:e.jsx("i",{className:"fa-solid fa-user"})}),e.jsxs("div",{className:"f-info",children:[e.jsx("span",{className:"f-name",children:n.name}),e.jsxs("span",{className:"f-username",children:["@",n.username]})]}),e.jsx("i",{className:"fa-solid fa-chevron-right ml-auto text-gray-700 text-xs"})]},x)):e.jsxs("div",{className:"empty-state",children:[e.jsx("i",{className:`fa-solid ${s==="followers"?"fa-users":"fa-user-plus"}`}),e.jsx("p",{children:"Nenhum usuário encontrado."})]})})]})]}):null,re=({onHomeClick:s})=>{const i=M();return e.jsx(ee,{leftContent:e.jsx("button",{onClick:()=>i("/rank"),className:"bg-none border-none text-[#00c2ff] text-lg cursor-pointer",children:e.jsx("i",{className:"fa-solid fa-trophy"})}),rightContent:e.jsx("button",{onClick:()=>i("/settings"),className:"bg-none border-none text-[#00c2ff] text-lg cursor-pointer",children:e.jsx("i",{className:"fa-solid fa-gear"})}),onLogoClick:s})},ne=({avatar:s,nickname:i,username:m,bio:f,website:n,stats:x,onAvatarClick:u,onFollowersClick:b,onFollowingClick:w,onEditClick:c,onShareClick:v})=>e.jsxs("div",{className:"profile-card-box",children:[e.jsx(oe,{src:s,size:"xl",isVip:!1,onClick:u,alt:i,className:"mb-4"}),e.jsx(Y,{nickname:i,handle:m,size:"lg",className:"items-center",onClick:c}),e.jsxs("div",{className:"profile-stats-container",children:[e.jsxs("div",{className:"stat-box",children:[e.jsx("span",{className:"stat-value",children:x.posts}),e.jsx("span",{className:"stat-label",children:"Posts"})]}),e.jsxs("div",{className:"stat-box",onClick:b,children:[e.jsx("span",{className:"stat-value",children:x.followers}),e.jsx("span",{className:"stat-label",children:"Seguidores"})]}),e.jsxs("div",{className:"stat-box",onClick:w,children:[e.jsx("span",{className:"stat-value",children:x.following}),e.jsx("span",{className:"stat-label",children:"Seguindo"})]})]}),e.jsx("p",{className:"profile-bio",children:f}),n&&e.jsxs("a",{href:n,target:"_blank",rel:"noopener noreferrer",className:"profile-link",children:[e.jsx("i",{className:"fa-solid fa-link"}),n.replace(/^https?:\/\//,"").replace(/\/$/,"")]}),e.jsxs("div",{className:"profile-actions",children:[e.jsxs("button",{onClick:c,children:[e.jsx("i",{className:"fa-solid fa-pen"})," Editar Perfil"]}),e.jsxs("button",{onClick:v,children:[e.jsx("i",{className:"fa-solid fa-share-nodes"})," Compartilhar"]})]})]}),we=()=>{const{navigate:s,activeTab:i,setActiveTab:m,myPosts:f,myProducts:n,user:x,followersCount:u,followingCount:b,followListType:w,followListData:c,isPreviewOpen:v,setIsPreviewOpen:N,scrollRef:C,deletePost:j,handleLike:P,handleShowFollowList:S,closeFollowList:U,navigateToUserProfile:O,handleShare:k,handleUserClick:z,handleVote:L,handleNickname:F,handleUsername:g,displayBio:E,displayAvatar:T,displayWebsite:A}=ie();return e.jsxs("div",{className:"profile-page h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden",children:[e.jsx("style",{children:`
        main { flex-grow: 1; overflow-y: auto; padding-top: 80px; padding-bottom: 100px; scroll-behavior: smooth; }
        .profile-card-box { background: rgba(30, 35, 45, 0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 30px 20px; width: 90%; max-width: 400px; display: flex; flex-direction: column; align-items: center; margin: 0 auto 20px auto; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); }
        .profile-avatar { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 4px solid #00c2ff; margin-bottom: 15px; background: #1e2531; cursor: pointer; }
        .profile-avatar-placeholder { width: 100px; height: 100px; border-radius: 50%; border: 4px solid #00c2ff; margin-bottom: 15px; background: #1e2531; display: flex; align-items: center; justify-content: center; font-size: 40px; color: #00c2ff; }
        .profile-nickname { font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 2px; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
        .profile-handle { font-size: 14px; color: #00c2ff; margin-bottom: 15px; font-weight: 500; }
        .profile-stats-container { display: flex; justify-content: space-around; width: 100%; margin: 20px 0; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); padding: 15px 0; }
        .stat-box { display: flex; flex-direction: column; align-items: center; cursor: pointer; flex: 1; }
        .stat-value { font-size: 18px; font-weight: 800; color: #fff; }
        .stat-label { font-size: 11px; color: #aaa; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
        .profile-bio { font-size: 14px; color: #e0e0e0; text-align: center; line-height: 1.5; margin-bottom: 15px; max-width: 90%; }
        .profile-link { font-size: 13px; color: #00c2ff; display: flex; align-items: center; gap: 5px; background: rgba(0,194,255,0.1); padding: 5px 12px; border-radius: 20px; text-decoration: none; }
        .profile-actions { display: flex; gap: 10px; width: 100%; justify-content: center; margin-top: 10px; }
        .profile-actions button { flex: 1; max-width: 140px; padding: 12px; border-radius: 12px; font-weight: 700; font-size: 14px; border: none; cursor: pointer; background: #1e2531; color: #fff; border: 1px solid #555; }
        .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
        .gallery-item { position: relative; aspect-ratio: 9/16; cursor: pointer; background: #000; }
        .gallery-item img, .reel-thumbnail { width: 100%; height: 100%; object-fit: cover; }
        .reel-icon { position: absolute; bottom: 5px; left: 5px; color: #fff; font-size: 12px; display: flex; align-items: center; gap: 4px; text-shadow: 0 1px 2px rgba(0,0,0,0.8); }
        .no-content { text-align: center; color: #666; padding: 30px 0; font-size: 14px; width: 100%; }
      `}),e.jsx(re,{onHomeClick:()=>C.current?.scrollTo({top:0,behavior:"smooth"})}),e.jsx("main",{className:"flex-grow w-full overflow-y-auto no-scrollbar",ref:C,children:e.jsxs("div",{style:{width:"100%",maxWidth:"500px",margin:"0 auto",paddingTop:"10px",paddingBottom:"100px"},children:[e.jsx(ne,{avatar:T,nickname:F,username:g,bio:E,website:A,stats:{posts:f.length,followers:u,following:b},onAvatarClick:()=>N(!0),onFollowersClick:()=>S("followers"),onFollowingClick:()=>S("following"),onEditClick:()=>s("/edit-profile"),onShareClick:()=>alert("Compartilhar")}),e.jsxs("div",{className:"profile-tabs-container",children:[e.jsx(te,{activeTab:i,setActiveTab:m,hasProducts:n.length>0}),e.jsxs("div",{className:"tab-content",children:[i==="posts"&&e.jsx("div",{className:"post-list animate-fade-in px-3",children:f.filter(t=>t.type==="text"||t.type==="poll").length>0?f.filter(t=>t.type==="text"||t.type==="poll").map(t=>e.jsx(D,{post:t,currentUserId:x?.id,onLike:P,onDelete:(l,y)=>j(y,l),onUserClick:z,onCommentClick:l=>s(`/post/${l}`),onShare:k,onVote:L,onCtaClick:l=>l?.startsWith("http")?window.open(l,"_blank"):s(l||"")},t.id)):e.jsx("div",{className:"no-content",children:"Sem posts."})}),i==="products"&&e.jsx(se,{products:n,onProductClick:t=>s(`/marketplace/product/${t}`)}),i==="fotos"&&e.jsx("div",{className:"post-list animate-fade-in px-3",children:f.filter(t=>t.type==="photo").length>0?f.filter(t=>t.type==="photo").map(t=>e.jsx(D,{post:t,currentUserId:x?.id,onLike:P,onDelete:(l,y)=>j(y,l),onUserClick:z,onCommentClick:l=>s(`/post/${l}`),onShare:k,onVote:L,onCtaClick:l=>l?.startsWith("http")?window.open(l,"_blank"):s(l||"")},t.id)):e.jsx("div",{className:"no-content",children:"Sem fotos."})}),i==="reels"&&e.jsx(ae,{reels:f.filter(t=>t.type==="video"),onReelClick:t=>s(`/reels/${t.id}`,{state:{authorId:t.authorId}}),onDelete:(t,l)=>j(t,l)})]})]})]})}),e.jsx(X,{}),e.jsx(le,{type:w,data:c,onClose:U,onUserClick:O}),e.jsx(Z,{isOpen:v,onClose:()=>N(!1),imageSrc:T||"",username:F})]})};export{we as Profile};
