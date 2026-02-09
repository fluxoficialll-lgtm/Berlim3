import{j as e,r as o,u as O,f as R,g as D,c as H}from"./index-BC19Iu_T.js";import{p as L}from"./postService-XFLx8Vj8.js";import{U as Y}from"./UploadProgressCard-CTKpf9n9.js";const q=({onBack:t,folderName:i})=>e.jsxs("header",{className:"flex items-center justify-between p-4 px-6 bg-[#0c0f14] border-b border-white/10 h-[65px] sticky top-0 z-50",children:[e.jsx("button",{onClick:t,className:"w-10 h-10 rounded-full text-[#00c2ff] hover:bg-[#00c2ff1a] transition-all active:scale-90 flex items-center justify-center",children:e.jsx("i",{className:"fa-solid fa-arrow-left"})}),e.jsx("div",{className:"flex-1 text-center px-4",children:e.jsx("h1",{className:"text-sm font-bold text-white uppercase tracking-[2px] truncate",children:i||"Conteúdo"})}),e.jsx("div",{className:"w-10"})]}),V=({item:t,globalAllowDownload:i,onPreview:h})=>{const n=d=>d.type==="video"?"fa-video":d.type==="image"?"fa-image":d.fileType==="pdf"?"fa-file-pdf":d.fileType==="zip"?"fa-file-zipper":d.fileType==="doc"?"fa-file-word":"fa-file-lines",u=i&&t.allowDownload,a=d=>{d.stopPropagation(),u&&(t.url&&t.url!=="#"?window.open(t.url,"_blank"):alert("Este é um arquivo de demonstração."))};return e.jsxs("div",{className:"bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 group active:scale-[0.98] transition-all hover:bg-white/[0.08] hover:border-white/10",children:[e.jsx("div",{className:"w-12 h-12 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center text-[#00c2ff] text-lg overflow-hidden flex-shrink-0",children:t.type==="image"?e.jsx("img",{src:t.url,className:"w-full h-full object-cover",alt:t.title}):e.jsx("i",{className:`fa-solid ${n(t)} opacity-60`})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("h4",{className:"font-bold text-sm text-gray-200 truncate",children:t.title}),e.jsxs("div",{className:"flex items-center gap-2 mt-1",children:[e.jsx("span",{className:"text-[9px] font-black text-gray-600 uppercase tracking-widest bg-white/5 px-1.5 py-0.5 rounded",children:t.fileType?.toUpperCase()||t.type.toUpperCase()}),e.jsx("span",{className:"text-[9px] font-bold text-[#00c2ff] uppercase tracking-widest opacity-60",children:t.size||"Tamanho N/A"})]})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{onClick:()=>h(t),className:"w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#00c2ff] hover:bg-[#00c2ff1a] transition-colors",children:e.jsx("i",{className:`fa-solid ${t.type==="video"?"fa-play-circle text-lg":"fa-eye"}`})}),u&&e.jsx("button",{onClick:a,className:"w-9 h-9 rounded-full bg-[#00ff82]/5 flex items-center justify-center text-[#00ff82] hover:bg-[#00ff82]/10 transition-colors",title:"Baixar",children:e.jsx("i",{className:"fa-solid fa-cloud-arrow-down"})})]})]})},W=()=>e.jsxs("div",{className:"text-center py-20 opacity-20",children:[e.jsx("i",{className:"fa-solid fa-box-open text-5xl mb-4"}),e.jsx("p",{className:"font-bold uppercase tracking-widest text-sm",children:"Pasta Vazia"})]}),X=({items:t,initialIndex:i,onClose:h})=>{const[n,u]=o.useState(null),[a,d]=o.useState(!0),[N,I]=o.useState(null),[w,j]=o.useState(null);if(o.useEffect(()=>{i!==null&&(u(i),d(!0))},[i]),n===null||i===null||t.length===0)return null;const l=t[n],g=s=>{s?.stopPropagation(),n<t.length-1&&u(n+1)},y=s=>{s?.stopPropagation(),n>0&&u(n-1)},k=()=>{d(!a)},C=50,P=s=>{j(null),I(s.targetTouches[0].clientX)},U=s=>{j(s.targetTouches[0].clientX)},S=()=>{if(!N||!w)return;const s=N-w;s>C&&g(),s<-C&&y()},T=()=>l.type==="image"?e.jsx("img",{src:l.url,className:"max-w-full max-h-full object-contain animate-fade-in pointer-events-none select-none",alt:l.title}):l.type==="video"?e.jsx("video",{src:l.url,controls:a,autoPlay:!0,className:"max-w-full max-h-full animate-fade-in",onClick:s=>s.stopPropagation()},l.url):e.jsxs("div",{className:"flex flex-col items-center justify-center p-10 text-center animate-fade-in bg-[#161a21] border border-white/10 rounded-[40px] max-w-[340px] shadow-2xl",onClick:s=>s.stopPropagation(),children:[e.jsx("div",{className:"w-20 h-20 rounded-3xl bg-[#00c2ff]/10 flex items-center justify-center text-[#00c2ff] text-3xl mb-6 border border-[#00c2ff]/20",children:e.jsx("i",{className:`fa-solid ${l.fileType==="pdf"?"fa-file-pdf":l.fileType==="zip"?"fa-file-zipper":"fa-file-lines"}`})}),e.jsx("h3",{className:"text-lg font-bold text-white mb-2 truncate max-w-full px-4",children:l.title}),e.jsxs("div",{className:"flex items-center gap-3 mb-8",children:[e.jsx("span",{className:"text-[9px] font-black bg-white/5 px-2 py-1 rounded text-gray-400 uppercase tracking-widest border border-white/5",children:l.fileType?.toUpperCase()}),e.jsx("span",{className:"text-[9px] font-black text-[#00c2ff] uppercase tracking-widest",children:l.size||"N/A"})]}),e.jsx("button",{onClick:()=>window.open(l.url,"_blank"),className:"w-full py-4 bg-white text-black font-black rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-3",children:"ABRIR ARQUIVO"})]});return e.jsxs("div",{className:`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-fade-in transition-all duration-500 ${a?"":"cursor-none"}`,onTouchStart:P,onTouchMove:U,onTouchEnd:S,onClick:k,children:[e.jsx("style",{children:`
                .hud-btn {
                    backdrop-filter: blur(25px);
                    -webkit-backdrop-filter: blur(25px);
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    color: white;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .hud-hidden {
                    opacity: 0;
                    pointer-events: none;
                    transform: translateY(-15px);
                }
                .hud-hidden-bottom {
                    opacity: 0;
                    pointer-events: none;
                    transform: translateY(15px);
                }
                .count-pill {
                    padding: 8px 16px;
                    border-radius: 14px;
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: 1px;
                    color: rgba(255,255,255,0.9);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .close-pill {
                    width: 54px;
                    height: 54px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                }
                .close-pill:active { transform: scale(0.9); background: rgba(255,255,255,0.2); }
                
                .nav-arrow-slim {
                    font-size: 32px;
                    color: rgba(255, 255, 255, 0.2);
                    padding: 30px;
                    cursor: pointer;
                    transition: 0.3s;
                }
                .nav-arrow-slim:hover { color: white; }
                .nav-arrow-slim.disabled { opacity: 0; pointer-events: none; }
            `}),e.jsxs("div",{className:`absolute top-0 left-0 w-full p-6 flex items-start justify-between z-50 pointer-events-none transition-all duration-500 ${a?"":"hud-hidden"}`,children:[e.jsx("div",{className:"flex flex-col gap-1 pointer-events-auto",children:e.jsxs("div",{className:"hud-btn bg-black/40 px-4 py-2 rounded-xl border border-white/5 inline-flex items-center gap-2 max-w-[200px]",children:[e.jsx("i",{className:"fa-solid fa-file-lines text-[10px] text-gray-500"}),e.jsx("span",{className:"text-[11px] font-bold truncate",children:l.title})]})}),e.jsx("div",{className:"absolute left-1/2 -translate-x-1/2 pointer-events-auto",children:e.jsxs("div",{className:"hud-btn count-pill",children:[e.jsx("span",{className:"opacity-40",children:n+1}),e.jsx("div",{className:"w-px h-3 bg-white/10"}),e.jsx("span",{children:t.length})]})}),e.jsx("button",{onClick:s=>{s.stopPropagation(),h()},className:"hud-btn close-pill pointer-events-auto shadow-2xl",children:e.jsx("i",{className:"fa-solid fa-xmark"})})]}),e.jsxs("div",{className:"relative w-full h-full flex items-center justify-center overflow-hidden select-none",children:[e.jsx("button",{onClick:y,className:`absolute left-0 z-20 hidden md:block nav-arrow-slim ${n===0?"disabled":""} ${a?"":"opacity-0"}`,children:e.jsx("i",{className:"fa-solid fa-angle-left"})}),T(),e.jsx("button",{onClick:g,className:`absolute right-0 z-20 hidden md:block nav-arrow-slim ${n===t.length-1?"disabled":""} ${a?"":"opacity-0"}`,children:e.jsx("i",{className:"fa-solid fa-angle-right"})})]}),l.type!=="file"&&e.jsx("footer",{className:`absolute bottom-0 left-0 w-full p-8 flex items-center justify-center z-50 transition-all duration-500 ${a?"":"hud-hidden-bottom"}`,children:e.jsxs("div",{className:"hud-btn flex items-center gap-2 p-1 rounded-2xl",children:[e.jsxs("button",{className:"px-6 py-3 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2",onClick:s=>{s.stopPropagation(),window.open(l.url,"_blank")},children:[e.jsx("i",{className:"fa-solid fa-cloud-arrow-down text-sm"}),e.jsx("span",{className:"text-[10px] font-black uppercase tracking-wider",children:"Download"})]}),e.jsx("div",{className:"w-px h-6 bg-white/10"}),e.jsxs("button",{className:"px-6 py-3 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2",onClick:s=>{s.stopPropagation(),navigator.clipboard.writeText(l.url),alert("Link copiado.")},children:[e.jsx("i",{className:"fa-solid fa-link text-sm"}),e.jsx("span",{className:"text-[10px] font-black uppercase tracking-wider",children:"Copiar Link"})]})]})})]})},K=({onClick:t,isLoading:i})=>e.jsxs("div",{className:"fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[340px] px-4 animate-slide-up",children:[e.jsx("style",{children:`
                .btn-premium-upload {
                    width: 100%;
                    height: 58px;
                    background: rgba(12, 15, 20, 0.85);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(0, 194, 255, 0.3);
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    color: #fff;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 194, 255, 0.1);
                    position: relative;
                    overflow: hidden;
                }
                
                .btn-premium-upload:hover {
                    border-color: #00c2ff;
                    background: rgba(12, 15, 20, 0.95);
                    transform: translateY(-2px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 194, 255, 0.2);
                }

                .btn-premium-upload:active {
                    transform: translateY(0) scale(0.98);
                }

                .btn-premium-upload:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    border-color: rgba(255,255,255,0.1);
                }

                .btn-label-sophisticated {
                    font-size: 11px;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    color: rgba(255, 255, 255, 0.9);
                }

                .icon-circle-bg {
                    width: 28px;
                    height: 28px;
                    background: rgba(0, 194, 255, 0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #00c2ff;
                }

                .glow-line {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(0, 194, 255, 0.4), transparent);
                }
            `}),e.jsxs("button",{className:"btn-premium-upload",onClick:t,disabled:i,children:[e.jsx("div",{className:"glow-line"}),i?e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin text-xl text-[#00c2ff]"}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"icon-circle-bg",children:e.jsx("i",{className:"fa-solid fa-plus text-xs"})}),e.jsx("span",{className:"btn-label-sophisticated",children:"Adicionar Arquivo"})]})]})]}),ee=()=>{const t=O(),{groupId:i,folderId:h}=R(),[n,u]=o.useState(null),[a,d]=o.useState(null),[N,I]=o.useState(!0),[w,j]=o.useState(!1),[l,g]=o.useState(0),[y,k]=o.useState(0),[C,P]=o.useState(0),[U,S]=o.useState(null),[T,s]=o.useState(!1),z=o.useRef(null);o.useEffect(()=>{if(i&&h){const c=D.getGroupById(i);if(c){u(c);const p=H.getCurrentUserId(),m=c.creatorId===p,b=c.adminIds?.includes(p||"")||!1;s(m||b);let r=null;c.salesPlatformSections?.forEach(x=>{const f=x.folders.find(v=>v.id===h);f&&(r=f)}),r&&(!r.items||r.items.length===0)&&(r.items=[]),d(r)}I(!1)}},[i,h]);const M=c=>{if(c===0)return"0 Bytes";const p=1024,m=["Bytes","KB","MB","GB","TB"],b=Math.floor(Math.log(c)/Math.log(p));return parseFloat((c/Math.pow(p,b)).toFixed(2))+" "+m[b]},F=async c=>{const p=c.target.files;if(!p||p.length===0||!n||!a)return;const m=Array.from(p);j(!0),P(m.length),k(0),g(0);const b=[];for(let r=0;r<m.length;r++){const x=m[r];k(r+1),g(Math.round(r/m.length*100));try{const f=await L.uploadMedia(x,"infoproducts"),v=M(x.size),_=x.name.split(".").pop()?.toLowerCase()||"file";let A="file";x.type.startsWith("image/")?A="image":x.type.startsWith("video/")&&(A="video");const G={id:`item_${Date.now()}_${r}`,title:x.name.split(".")[0],type:A,fileType:_,url:f,allowDownload:!0,size:v};b.push(G),g(Math.round((r+1)/m.length*100))}catch(f){console.error("Erro ao subir arquivo:",x.name,f)}}if(b.length>0){const r={...n};r.salesPlatformSections?.forEach(x=>{const f=x.folders.find(v=>v.id===h);f&&(f.items=[...f.items||[],...b],f.itemsCount=f.items.length,d({...f}))}),await D.updateGroup(r),u(r)}z.current&&(z.current.value=""),setTimeout(()=>{j(!1),g(0)},1e3)};if(N)return e.jsx("div",{className:"min-h-screen bg-[#0a0c10] flex items-center justify-center",children:e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin text-[#00c2ff]"})});const E=a?.allowDownload??n?.salesPlatformAllowDownload??!0,$=a?.allowMemberUpload??n?.salesPlatformAllowMemberUpload??!1,B=T||$;return e.jsxs("div",{className:"min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col",children:[e.jsx(q,{onBack:()=>t(-1),folderName:a?.name}),e.jsx("main",{className:"flex-1 p-5 overflow-y-auto no-scrollbar pb-32",children:e.jsx("div",{className:"grid gap-3 max-w-[600px] mx-auto w-full",children:a?.items&&a.items.length>0?a.items.map((c,p)=>e.jsx(V,{item:c,globalAllowDownload:E,onPreview:()=>S(p)},c.id)):e.jsx(W,{})})}),B&&e.jsxs(e.Fragment,{children:[e.jsx(Y,{progress:l,current:y,total:C,isVisible:w}),e.jsx(K,{onClick:()=>z.current?.click(),isLoading:w}),e.jsx("input",{type:"file",ref:z,onChange:F,multiple:!0,className:"hidden"})]}),e.jsx(X,{items:a?.items||[],initialIndex:U,onClose:()=>S(null)}),e.jsx("div",{className:"text-center opacity-10 text-[8px] uppercase font-black tracking-[3px] mb-8",children:"Flux Content Delivery v1.1"})]})};export{ee as SalesFolderContentPage};
