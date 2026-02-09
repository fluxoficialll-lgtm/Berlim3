import{f as m,r as d,z as f,i as b,j as e,u as h,c as g}from"./index-BC19Iu_T.js";const u=()=>{const{category:i}=m(),n=i==="private"||i==="vip"||i==="public"?i:"public",[t,o]=d.useState([]),[a,l]=d.useState(!0),s=d.useCallback((c=!1)=>{c||l(!0);const r=f.getRankedList(n);o(r),l(!1)},[n]);return d.useEffect(()=>{s();const c=b.subscribe("groups",()=>{s(!0)});return()=>c()},[s]),{groups:t,loading:a,activeTab:n}},v=({activeTab:i,onTabChange:n})=>e.jsxs("div",{className:"tabs-container",children:[e.jsx("button",{className:`tab-btn ${i==="public"?"active":""}`,onClick:()=>n("public"),children:"Públicos"}),e.jsx("button",{className:`tab-btn ${i==="private"?"active":""}`,onClick:()=>n("private"),children:"Privados"}),e.jsx("button",{className:`tab-btn ${i==="vip"?"active":""}`,onClick:()=>n("vip"),children:"VIP"})]}),x=({group:i,position:n,onClick:t})=>{const o=()=>n===1?"first-place":n===2?"second-place":"third-place";return e.jsxs("div",{className:`podium-item ${o()}`,onClick:()=>t(i),children:[e.jsxs("div",{className:"podium-cover-wrapper",children:[e.jsx("i",{className:"fa-solid fa-crown crown-icon"}),e.jsx("div",{className:"podium-cover",children:i.coverImage?e.jsx("img",{src:i.coverImage,alt:i.name}):e.jsx("i",{className:`fa-solid ${i.isVip?"fa-crown":"fa-users"}`})}),e.jsx("div",{className:"rank-badge",children:n})]}),e.jsx("div",{className:"podium-name",children:i.name}),e.jsxs("div",{className:"podium-count",children:[i.memberCount||i.memberIds?.length||0," membros"]})]})},j=({groups:i,onGroupClick:n})=>i.length===0?null:e.jsxs("div",{className:"top-three-container",children:[i[1]&&e.jsx(x,{group:i[1],position:2,onClick:n}),i[0]&&e.jsx(x,{group:i[0],position:1,onClick:n}),i[2]&&e.jsx(x,{group:i[2],position:3,onClick:n})]}),k=({group:i,rank:n,onClick:t,isMember:o})=>e.jsxs("div",{className:"rank-item",onClick:()=>t(i),children:[e.jsxs("div",{className:"rank-number",children:["#",n]}),e.jsx("div",{className:"list-cover",children:i.coverImage?e.jsx("img",{src:i.coverImage,alt:"cover"}):e.jsx("i",{className:`fa-solid ${i.isVip?"fa-crown":"fa-users"}`})}),e.jsxs("div",{className:"list-info",children:[e.jsx("span",{className:"list-name",children:i.name}),e.jsxs("span",{className:"list-desc",children:[i.memberCount||i.memberIds?.length||0," membros"]})]}),e.jsx("div",{onClick:a=>a.stopPropagation(),children:o?e.jsx("button",{className:"action-btn open-btn",onClick:()=>t(i),children:"Acessar"}):e.jsx("button",{className:"action-btn join-btn",onClick:()=>t(i),children:"Explorar"})})]}),C=()=>{const i=h(),n=g.getCurrentUserId(),{groups:t,loading:o,activeTab:a}=u(),l=r=>{r!==a&&i(`/top-groups/${r}`,{replace:!0})},s=r=>{if(!n){alert("Você precisa estar logado para acessar os grupos.");return}r.memberIds?.includes(n)?i(`/group-chat/${r.id}`):r.isVip?i(`/vip-group-sales/${r.id}`):i(`/group-landing/${r.id}`)},c=()=>{i("/groups")};return e.jsxs("div",{className:"min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-x-hidden",children:[e.jsx("style",{children:`
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Inter',sans-serif; }
        header { display:flex; align-items:center; padding:16px; background: #0c0f14; position:fixed; width:100%; z-index:10; border-bottom:1px solid rgba(255,255,255,0.1); top: 0; height: 65px; }
        header button { background:none; border:none; color:#fff; font-size:22px; cursor:pointer; transition:0.3s; padding-right: 15px; }
        header h1 { font-size:20px; font-weight:700; color: #FFD700; text-transform: uppercase; letter-spacing: 1px; }
        main { padding-top: 80px; padding-bottom: 40px; width: 100%; max-width: 600px; margin: 0 auto; padding-left: 20px; padding-right: 20px; }
        .tabs-container { display: flex; background: rgba(255,255,255,0.05); border-radius: 12px; padding: 4px; margin-bottom: 30px; border: 1px solid rgba(255,255,255,0.1); }
        .tab-btn { flex: 1; padding: 10px; border: none; background: transparent; color: #aaa; font-size: 13px; font-weight: 600; cursor: pointer; border-radius: 8px; transition: 0.3s; }
        .tab-btn.active { background: #00c2ff; color: #000; box-shadow: 0 2px 10px rgba(0,194,255,0.3); }
        .top-three-container { display: flex; justify-content: center; align-items: flex-end; margin-bottom: 40px; gap: 10px; }
        .podium-item { display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: transform 0.3s; position: relative; width: 33%; }
        .podium-item:hover { transform: translateY(-5px); }
        .podium-cover-wrapper { position: relative; margin-bottom: 10px; }
        .podium-cover { border-radius: 16px; object-fit: cover; background: #333; display: flex; align-items: center; justify-content: center; color: #555; overflow: hidden; }
        .podium-cover i { font-size: 24px; }
        .podium-cover img { width: 100%; height: 100%; object-fit: cover; }
        .crown-icon { position: absolute; top: -25px; left: 50%; transform: translateX(-50%); font-size: 24px; filter: drop-shadow(0 0 5px rgba(0,0,0,0.8)); }
        .rank-badge { position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 24px; height: 24px; border-radius: 50%; color: #000; font-weight: 800; font-size: 14px; display: flex; align-items: center; justify-content: center; border: 2px solid #0c0f14; }
        .podium-name { text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%; margin-top: 5px; padding: 0 5px; }
        .first-place .podium-cover { width: 100px; height: 100px; border: 4px solid #FFD700; box-shadow: 0 0 25px rgba(255, 215, 0, 0.4); }
        .first-place .crown-icon { color: #FFD700; font-size: 32px; }
        .first-place .rank-badge { background: #FFD700; }
        .first-place .podium-name { color: #FFD700; font-size: 16px; font-weight: 700; }
        .second-place .podium-cover { width: 80px; height: 80px; border: 3px solid #C0C0C0; box-shadow: 0 0 15px rgba(192, 192, 192, 0.3); }
        .second-place .crown-icon { color: #C0C0C0; }
        .second-place .rank-badge { background: #C0C0C0; }
        .second-place .podium-name { color: #C0C0C0; font-size: 14px; font-weight: 600; }
        .third-place .podium-cover { width: 80px; height: 80px; border: 3px solid #CD7F32; box-shadow: 0 0 15px rgba(205, 127, 50, 0.3); }
        .third-place .crown-icon { color: #CD7F32; }
        .third-place .rank-badge { background: #CD7F32; }
        .third-place .podium-name { color: #CD7F32; font-size: 14px; font-weight: 600; }
        .podium-count { font-size: 12px; color: #aaa; margin-top: 2px; }
        .rank-list { display: flex; flex-direction: column; gap: 10px; }
        .rank-item { display: flex; align-items: center; padding: 15px; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); transition: background 0.2s; cursor: pointer; }
        .rank-item:hover { background: rgba(255,255,255,0.06); }
        .rank-number { font-size: 16px; font-weight: 700; color: #555; width: 30px; text-align: center; margin-right: 10px; }
        .list-cover { width: 45px; height: 45px; border-radius: 10px; object-fit: cover; margin-right: 15px; border: 1px solid #333; display: flex; align-items: center; justify-content: center; background: #222; color: #555; flex-shrink: 0; overflow: hidden; }
        .list-info { flex-grow: 1; display: flex; flex-direction: column; min-width: 0; }
        .list-name { font-weight: 600; font-size: 15px; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .list-desc { font-size: 12px; color: #888; }
        .action-btn { border: none; border-radius: 20px; padding: 6px 16px; font-size: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; white-space: nowrap; margin-left: 10px; }
        .open-btn { background: rgba(0,194,255,0.1); color: #00c2ff; border: 1px solid #00c2ff; }
        .open-btn:hover { background: #00c2ff; color: #000; }
        .join-btn { background: #00c2ff; color: #000; box-shadow: 0 4px 10px rgba(0, 194, 255, 0.2); }
        .join-btn:hover { background: #0099cc; transform: translateY(-1px); }
        .empty-state { text-align: center; color: #777; margin-top: 50px; }
      `}),e.jsxs("header",{children:[e.jsx("button",{onClick:c,"aria-label":"Voltar",children:e.jsx("i",{className:"fa-solid fa-arrow-left"})}),e.jsx("h1",{children:"Top Grupos"})]}),e.jsxs("main",{children:[e.jsx(v,{activeTab:a,onTabChange:l}),o?e.jsxs("div",{className:"text-center text-gray-500 mt-10",children:[e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin text-2xl mb-2 text-[#FFD700]"}),e.jsxs("p",{children:["Sincronizando ranking ",a,"..."]})]}):e.jsxs(e.Fragment,{children:[e.jsx(j,{groups:t,onGroupClick:s}),e.jsx("div",{className:"rank-list",children:t.length>0?t.map((r,p)=>p<3?null:e.jsx(k,{group:r,rank:p+1,onClick:s,isMember:!!r.memberIds?.includes(n||"")},r.id)):!o&&e.jsxs("div",{className:"empty-state",children:[e.jsx("i",{className:"fa-solid fa-ghost text-4xl mb-2 opacity-30"}),e.jsx("p",{children:"Nenhum grupo nesta categoria ainda."})]})})]})]})]})};export{C as TopGroups};
