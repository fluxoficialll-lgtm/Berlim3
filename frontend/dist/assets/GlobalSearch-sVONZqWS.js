import{u as E,e as F,r,c as p,j as s,y as i,k as q}from"./index-BC19Iu_T.js";const _=()=>{const n=E(),{showAlert:j}=F(),[o,v]=r.useState(""),[f,u]=r.useState([]),[x,g]=r.useState(!1),[h,m]=r.useState(null),[T,y]=r.useState(0);r.useEffect(()=>{const e=setTimeout(async()=>{if(o.trim().length>0){g(!0);try{const a=await p.searchUsers(o);u(a)}catch(a){console.error("Search error",a)}finally{g(!1)}}else u([])},300);return()=>clearTimeout(e)},[o]),r.useEffect(()=>{const e=db.subscribe("relationships",()=>{y(a=>a+1)});return()=>e()},[]);const k=async e=>{const a=e.profile?.name;if(!(!a||h)){m(e.id);try{i.isFollowing(a)==="none"?await i.followUser(a):window.confirm(`Deixar de seguir @${a}?`)&&await i.unfollowUser(a)}catch(t){console.error("[Search] Follow error:",t),j("Erro",t.message||"Falha ao processar solicitação.")}finally{m(null)}}},N=e=>{const a=e.startsWith("@")?e.substring(1):e;n(`/user/${a}`)},S=e=>{const a=p.getCurrentUserEmail();if(a&&e.email){const t=q.getPrivateChatId(a,e.email);n(`/chat/${t}`)}},U=()=>{window.history.state&&window.history.state.idx>0?n(-1):n("/messages")};return s.jsxs("div",{className:"min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-x-hidden",children:[s.jsx("style",{children:`
        header {
            display: flex; align-items: center; gap: 15px; padding: 16px 20px;
            background: #0c0f14; position: fixed; width: 100%; z-index: 10;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1); top: 0; height: 70px;
        }
        header button {
            background: none; border: none; color: #00c2ff; font-size: 20px; cursor: pointer;
        }
        header h1 { font-size: 18px; font-weight: 600; color: #fff; }

        main { padding-top: 80px; width: 100%; max-width: 600px; margin: 0 auto; padding-bottom: 20px; }

        .search-container {
            padding: 0 20px 20px 20px;
        }
        .search-input-wrapper {
            position: relative;
        }
        .search-input-wrapper i {
            position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #aaa;
        }
        .search-input-wrapper input {
            width: 100%; padding: 12px 12px 12px 45px; background: #1a1e26;
            border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
            color: #fff; font-size: 16px; outline: none; transition: 0.3s;
        }
        .search-input-wrapper input:focus {
            border-color: #00c2ff; box-shadow: 0 0 10px rgba(0, 194, 255, 0.2);
        }

        .global-badge {
            display: flex; align-items: center; justify-content: center; gap: 6px;
            margin-top: 8px; font-size: 11px; color: #00ff82; text-transform: uppercase; letter-spacing: 1px;
        }

        .user-list { display: flex; flex-direction: column; }
        .user-item {
            display: flex; align-items: center; padding: 15px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            cursor: pointer;
            transition: background 0.2s;
        }
        .user-item:hover { background: rgba(255,255,255,0.05); }

        .user-avatar {
            width: 50px; height: 50px; border-radius: 50%; margin-right: 15px;
            background: #333; display: flex; align-items: center; justify-content: center;
            object-fit: cover; border: 1px solid #444; color: #888; font-size: 20px;
        }
        .user-info { flex-grow: 1; }
        .user-name { font-weight: 600; font-size: 15px; color: #fff; display: block; text-transform: capitalize; }
        .user-username { font-size: 13px; color: #888; }

        .action-buttons { display: flex; gap: 10px; align-items: center; }

        .action-btn {
            padding: 8px 20px; border-radius: 20px; font-size: 13px; font-weight: 600;
            border: none; cursor: pointer; transition: 0.2s; min-width: 80px;
            display: flex; align-items: center; justify-content: center; gap: 5px;
        }
        .btn-follow {
            background: #00c2ff; color: #000;
        }
        .btn-follow:hover { background: #0099cc; }
        
        .btn-requested {
            background: transparent; border: 1px solid #aaa; color: #aaa;
        }
        .btn-following {
            background: transparent; border: 1px solid #00c2ff; color: #00c2ff;
        }
        .action-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .msg-btn {
            width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.1);
            display: flex; align-items: center; justify-content: center; color: #fff;
            border: none; cursor: pointer; transition: 0.2s;
        }
        .msg-btn:hover { background: rgba(0,194,255,0.2); color: #00c2ff; }
      `}),s.jsxs("header",{children:[s.jsx("button",{onClick:U,children:s.jsx("i",{className:"fa-solid fa-arrow-left"})}),s.jsx("h1",{children:"Encontrar Pessoas"})]}),s.jsxs("main",{children:[s.jsxs("div",{className:"search-container",children:[s.jsxs("div",{className:"search-input-wrapper",children:[s.jsx("i",{className:`fa-solid ${x?"fa-circle-notch fa-spin":"fa-magnifying-glass"}`}),s.jsx("input",{type:"text",placeholder:"Pesquisar por nome ou @...",value:o,onChange:e=>v(e.target.value),autoFocus:!0})]}),s.jsxs("div",{className:"global-badge",children:[s.jsx("i",{className:"fa-solid fa-globe"})," Pesquisa Global"]})]}),s.jsxs("div",{className:"user-list",children:[f.map(e=>{const a=e.profile?.name||"unknown",t=i.isFollowing(a),C=e.profile?.isPrivate||!1,P=p.getCurrentUserEmail(),b=e.email===P,w=h===e.id,z=(!C||t==="following")&&!b;let l="Seguir",c="action-btn btn-follow";return t==="requested"?(l="Solicitado",c="action-btn btn-requested"):t==="following"&&(l="Seguindo",c="action-btn btn-following"),s.jsxs("div",{className:"user-item",onClick:()=>N(a),children:[e.profile?.photoUrl?s.jsx("img",{src:e.profile.photoUrl,className:"user-avatar",alt:a}):s.jsx("div",{className:"user-avatar",children:s.jsx("i",{className:"fa-solid fa-user"})}),s.jsxs("div",{className:"user-info",children:[s.jsx("span",{className:"user-name",children:e.profile?.nickname||e.profile?.name}),s.jsxs("span",{className:"user-username",children:["@",a]})]}),s.jsxs("div",{className:"action-buttons",children:[z&&s.jsx("button",{className:"msg-btn",onClick:d=>{d.stopPropagation(),S(e)},children:s.jsx("i",{className:"fa-solid fa-comment"})}),!b&&s.jsx("button",{className:c,onClick:d=>{d.stopPropagation(),k(e)},disabled:w,children:w?s.jsx("i",{className:"fa-solid fa-circle-notch fa-spin"}):l})]})]},e.email)}),f.length===0&&!x&&s.jsx("div",{style:{textAlign:"center",color:"#777",padding:"30px"},children:o?"Nenhum usuário encontrado.":"Digite para pesquisar em toda a rede."})]})]})]})};export{_ as GlobalSearch};
