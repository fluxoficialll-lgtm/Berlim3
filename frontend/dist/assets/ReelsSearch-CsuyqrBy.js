import{u as g,r as t,c as m,j as e}from"./index-BC19Iu_T.js";import{r as b}from"./reelsService-v3uh_RdW.js";import"./postService-XFLx8Vj8.js";const N=()=>{const p=g(),[i,f]=t.useState(""),[s,r]=t.useState("relevant"),[l,u]=t.useState([]),[c,x]=t.useState(!1),[o,h]=t.useState(void 0);return t.useEffect(()=>{const a=m.getCurrentUserEmail();a&&h(a)},[]),t.useEffect(()=>{x(!0);const a=setTimeout(()=>{const n=b.searchReels(i,s,o);u(n),x(!1)},400);return()=>clearTimeout(a)},[i,s,o]),e.jsxs("div",{className:"min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-x-hidden",children:[e.jsx("style",{children:`
        /* Header Search */
        header {
            display: flex; flex-direction: column; gap: 10px; padding: 16px 20px;
            background: #0c0f14; position: fixed; width: 100%; z-index: 20;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1); top: 0;
        }
        .top-row {
            display: flex; align-items: center; gap: 15px; width: 100%;
        }
        header button.back-btn {
            background: none; border: none; color: #00c2ff; font-size: 20px; cursor: pointer;
        }
        .search-input-wrapper {
            flex-grow: 1; position: relative;
        }
        .search-input-wrapper i {
            position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #aaa;
        }
        .search-input-wrapper input {
            width: 100%; padding: 10px 12px 10px 40px; background: #1a1e26;
            border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px;
            color: #fff; font-size: 14px; outline: none; transition: 0.3s;
        }
        .search-input-wrapper input:focus {
            border-color: #00c2ff; box-shadow: 0 0 10px rgba(0, 194, 255, 0.2);
        }

        /* Filters Bar */
        .filters-row {
            display: flex; gap: 8px; overflow-x: auto; width: 100%; padding-bottom: 5px;
            scrollbar-width: none; -webkit-overflow-scrolling: touch;
        }
        .filters-row::-webkit-scrollbar { display: none; }
        
        .filter-chip {
            padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600;
            background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
            color: #aaa; white-space: nowrap; cursor: pointer; transition: 0.3s;
            display: flex; align-items: center; gap: 5px;
        }
        .filter-chip:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }
        .filter-chip.active {
            background: #00c2ff; color: #000; border-color: #00c2ff; box-shadow: 0 0 10px rgba(0, 194, 255, 0.3);
        }

        /* Grid Layout */
        main {
            padding-top: 120px; padding-bottom: 20px; width: 100%;
        }
        .reels-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr); /* 2 Colunas tipo TikTok */
            gap: 8px;
            padding: 0 8px;
        }
        
        .reel-card {
            position: relative;
            width: 100%;
            aspect-ratio: 9/16; /* Formato Vertical */
            background: #1a1e26;
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .reel-card video {
            width: 100%; height: 100%; object-fit: cover;
        }
        
        .card-overlay {
            position: absolute; bottom: 0; left: 0; width: 100%;
            background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
            padding: 10px;
            display: flex; flex-direction: column; justify-content: flex-end;
        }
        
        .overlay-stats {
            display: flex; align-items: center; gap: 10px; font-size: 11px; font-weight: 600; color: #ddd;
        }
        .reel-desc-snippet {
            font-size: 12px; color: #fff; margin-bottom: 4px; font-weight: 500;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .play-icon-center {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            font-size: 30px; color: rgba(255, 255, 255, 0.8); opacity: 0.7;
        }
        
        .watched-badge {
            position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.6);
            padding: 2px 6px; border-radius: 4px; font-size: 10px; color: #aaa;
            display: flex; align-items: center; gap: 3px;
        }
      `}),e.jsxs("header",{children:[e.jsxs("div",{className:"top-row",children:[e.jsx("button",{className:"back-btn",onClick:()=>p("/reels"),children:e.jsx("i",{className:"fa-solid fa-arrow-left"})}),e.jsxs("div",{className:"search-input-wrapper",children:[e.jsx("i",{className:`fa-solid ${c?"fa-circle-notch fa-spin":"fa-magnifying-glass"}`}),e.jsx("input",{type:"text",placeholder:"Buscar vídeos...",value:i,onChange:a=>f(a.target.value),autoFocus:!0})]})]}),e.jsxs("div",{className:"filters-row",children:[e.jsxs("button",{className:`filter-chip ${s==="relevant"?"active":""}`,onClick:()=>r("relevant"),children:[e.jsx("i",{className:"fa-solid fa-fire"})," Relevantes"]}),e.jsxs("button",{className:`filter-chip ${s==="recent"?"active":""}`,onClick:()=>r("recent"),children:[e.jsx("i",{className:"fa-regular fa-clock"})," Recentes"]}),e.jsxs("button",{className:`filter-chip ${s==="watched"?"active":""}`,onClick:()=>r("watched"),children:[e.jsx("i",{className:"fa-regular fa-eye"})," Assistidos"]}),e.jsxs("button",{className:`filter-chip ${s==="unwatched"?"active":""}`,onClick:()=>r("unwatched"),children:[e.jsx("i",{className:"fa-regular fa-eye-slash"})," Não Assistidos"]}),e.jsxs("button",{className:`filter-chip ${s==="liked"?"active":""}`,onClick:()=>r("liked"),children:[e.jsx("i",{className:"fa-solid fa-heart"})," Curtidos"]})]})]}),e.jsx("main",{children:c&&l.length===0?e.jsx("div",{className:"flex justify-center items-center h-40",children:e.jsx("div",{className:"text-[#00c2ff]",children:"Buscando..."})}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"reels-grid",children:l.map(a=>{const n=o&&a.viewedBy?.includes(o);return e.jsxs("div",{className:"reel-card",onClick:()=>p(`/reels/${a.id}`),children:[e.jsx("video",{src:a.video,muted:!0,playsInline:!0,loop:!0,onMouseOver:d=>d.currentTarget.play(),onMouseOut:d=>d.currentTarget.pause()}),n&&e.jsxs("div",{className:"watched-badge",children:[e.jsx("i",{className:"fa-solid fa-check"})," Visto"]}),e.jsx("div",{className:"play-icon-center",children:e.jsx("i",{className:"fa-regular fa-circle-play"})}),e.jsxs("div",{className:"card-overlay",children:[e.jsx("div",{className:"reel-desc-snippet",children:a.title||a.text}),e.jsxs("div",{className:"overlay-stats",children:[e.jsxs("span",{children:[e.jsx("i",{className:"fa-regular fa-eye"})," ",a.views]}),e.jsxs("span",{children:[e.jsx("i",{className:"fa-solid fa-heart",style:{color:a.liked?"#ff4d4d":"inherit"}})," ",a.likes]})]})]})]},a.id)})}),l.length===0&&!c&&e.jsxs("div",{className:"text-center text-gray-500 mt-10 p-5",children:[e.jsx("i",{className:"fa-solid fa-video-slash text-4xl mb-3 opacity-50"}),e.jsx("p",{children:i?"Nenhum vídeo encontrado para sua busca.":"Nenhum vídeo encontrado nesta categoria."})]})]})})]})};export{N as ReelsSearch};
