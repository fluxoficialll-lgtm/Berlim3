import{j as e,u as m,r as d,y as f}from"./index-BC19Iu_T.js";const p=({user:o,position:a,followerCount:n,onClick:s})=>{const i=()=>a===1?"first-place":a===2?"second-place":"third-place",t=o.profile?.name||"",c=o.profile?.nickname||o.profile?.name;return e.jsxs("div",{className:`podium-item ${i()}`,onClick:()=>s(t),children:[e.jsxs("div",{className:"podium-avatar-wrapper",children:[e.jsx("i",{className:"fa-solid fa-crown crown-icon"}),e.jsx("img",{src:o.profile?.photoUrl||"https://via.placeholder.com/150",className:"podium-avatar",alt:String(a)}),e.jsx("div",{className:"rank-badge",children:a})]}),e.jsx("div",{className:"podium-name",children:c}),e.jsxs("div",{className:"podium-count",children:[n," seguidores"]})]})},h=({user:o,rank:a,followerCount:n,onClick:s})=>{const i=o.profile?.name||"",t=o.profile?.nickname||o.profile?.name;return e.jsxs("div",{className:"rank-item",onClick:()=>s(i),children:[e.jsxs("div",{className:"rank-number",children:["#",a]}),e.jsx("img",{src:o.profile?.photoUrl||"https://via.placeholder.com/150",className:"list-avatar",alt:"avatar"}),e.jsxs("div",{className:"list-info",children:[e.jsx("span",{className:"list-name",children:t}),e.jsxs("span",{className:"list-username",children:["@",i]})]}),e.jsxs("div",{className:"list-count",children:[n," seg"]})]})},u=()=>{const o=m(),[a,n]=d.useState([]),[s,i]=d.useState(!0);d.useEffect(()=>{(async()=>{const l=await f.getTopCreators();n(l),i(!1)})()},[]);const t=r=>{r&&o(`/user/${r}`)},c=()=>{window.history.state&&window.history.state.idx>0?o(-1):o("/profile")};return e.jsxs("div",{className:"min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-x-hidden",children:[e.jsx("style",{children:`
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Inter',sans-serif; }
        
        header {
            display:flex; align-items:center; padding:16px;
            background: #0c0f14; position:fixed; width:100%; z-index:10;
            border-bottom:1px solid rgba(255,255,255,0.1); top: 0; height: 65px;
        }
        header button {
            background:none; border:none; color:#fff; font-size:22px; cursor:pointer;
            transition:0.3s; padding-right: 15px;
        }
        header h1 { font-size:20px; font-weight:700; color: #FFD700; text-transform: uppercase; letter-spacing: 1px; }
        
        main {
            padding-top: 110px; padding-bottom: 40px;
            width: 100%; max-width: 600px; margin: 0 auto; padding-left: 20px; padding-right: 20px;
        }

        .top-three-container {
            display: flex; justify-content: center; align-items: flex-end; margin-bottom: 40px; gap: 15px;
        }

        .podium-item {
            display: flex; flex-direction: column; align-items: center; cursor: pointer;
            transition: transform 0.3s;
        }
        .podium-item:hover { transform: translateY(-5px); }

        .podium-avatar-wrapper {
            position: relative; margin-bottom: 10px;
        }
        
        .podium-avatar {
            border-radius: 50%; object-fit: cover; background: #333;
        }
        
        .crown-icon {
            position: absolute; top: -25px; left: 50%; transform: translateX(-50%);
            font-size: 24px; filter: drop-shadow(0 0 5px rgba(0,0,0,0.8));
        }

        .rank-badge {
            position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%);
            width: 24px; height: 24px; border-radius: 50%; color: #000; font-weight: 800; font-size: 14px;
            display: flex; align-items: center; justify-content: center; border: 2px solid #0c0f14;
        }

        .first-place .podium-avatar { width: 100px; height: 100px; border: 4px solid #FFD700; box-shadow: 0 0 25px rgba(255, 215, 0, 0.4); }
        .first-place .crown-icon { color: #FFD700; font-size: 32px; }
        .first-place .rank-badge { background: #FFD700; }
        .first-place .podium-name { color: #FFD700; font-size: 18px; font-weight: 700; }
        
        .second-place .podium-avatar { width: 80px; height: 80px; border: 3px solid #C0C0C0; box-shadow: 0 0 15px rgba(192, 192, 192, 0.3); }
        .second-place .crown-icon { color: #C0C0C0; }
        .second-place .rank-badge { background: #C0C0C0; }
        .second-place .podium-name { color: #C0C0C0; font-size: 15px; font-weight: 600; }

        .third-place .podium-avatar { width: 80px; height: 80px; border: 3px solid #CD7F32; box-shadow: 0 0 15px rgba(205, 127, 50, 0.3); }
        .third-place .crown-icon { color: #CD7F32; }
        .third-place .rank-badge { background: #CD7F32; }
        .third-place .podium-name { color: #CD7F32; font-size: 14px; font-weight: 600; }

        .podium-count { font-size: 12px; color: #aaa; margin-top: 2px; }

        .rank-list { display: flex; flex-direction: column; gap: 10px; }
        .rank-item {
            display: flex; align-items: center; padding: 15px; background: rgba(255,255,255,0.03);
            border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); cursor: pointer;
            transition: background 0.2s;
        }
        .rank-item:hover { background: rgba(255,255,255,0.08); }
        
        .rank-number {
            font-size: 16px; font-weight: 700; color: #555; width: 30px; text-align: center; margin-right: 10px;
        }
        
        .list-avatar {
            width: 45px; height: 45px; border-radius: 50%; object-fit: cover; margin-right: 15px; border: 1px solid #333;
        }
        
        .list-info { flex-grow: 1; display: flex; flex-direction: column; }
        .list-name { font-weight: 600; font-size: 15px; color: #fff; }
        .list-username { font-size: 12px; color: #888; }
        
        .list-count {
            font-weight: 700; font-size: 14px; color: #fff; background: rgba(0,194,255,0.1);
            padding: 4px 10px; border-radius: 20px; color: #00c2ff;
        }

        .empty-state {
            text-align: center; color: #555; margin-top: 50px;
        }
      `}),e.jsxs("header",{children:[e.jsx("button",{onClick:c,"aria-label":"Voltar",children:e.jsx("i",{className:"fa-solid fa-arrow-left"})}),e.jsx("h1",{children:"Top Criadores"})]}),e.jsx("main",{children:s?e.jsxs("div",{className:"text-center text-gray-500 mt-10",children:[e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin text-2xl mb-2 text-[#FFD700]"}),e.jsx("p",{children:"Carregando ranking..."})]}):e.jsxs(e.Fragment,{children:[a.length>=3&&e.jsxs("div",{className:"top-three-container",children:[e.jsx(p,{user:a[1],position:2,followerCount:a[1].followerCount,onClick:t}),e.jsx(p,{user:a[0],position:1,followerCount:a[0].followerCount,onClick:t}),e.jsx(p,{user:a[2],position:3,followerCount:a[2].followerCount,onClick:t})]}),e.jsx("div",{className:"rank-list",children:a.slice(a.length>=3?3:0).map((r,l)=>{const x=a.length>=3?l+4:l+1;return e.jsx(h,{user:r,rank:x,followerCount:r.followerCount,onClick:t},r.email)})}),a.length===0&&e.jsxs("div",{className:"empty-state",children:[e.jsx("i",{className:"fa-solid fa-trophy text-4xl mb-2 opacity-30"}),e.jsx("p",{children:"Nenhum usuário no ranking ainda."})]})]})})]})};export{u as Leaderboard};
