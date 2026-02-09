import{r as d,j as e}from"./index-BC19Iu_T.js";import{C as j}from"./CommentItem-BgB3JV1X.js";const N=({isOpen:s,onClose:n,title:l,comments:i,commentText:o,onCommentTextChange:p,onSend:c,onLike:x,onDelete:m,onUserClick:f,currentUserId:u,replyingTo:r,onCancelReply:b,onReplyClick:h,placeholder:g="Adicione um comentário..."})=>{const a=d.useRef(null);return d.useEffect(()=>{r&&a.current&&a.current.focus()},[r]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
                .comments-overlay {
                    position: fixed; inset: 0; background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px); z-index: 100; opacity: 0; pointer-events: none;
                    transition: opacity 0.3s ease;
                }
                .comments-overlay.open { opacity: 1; pointer-events: auto; }
                
                .comments-drawer {
                    position: fixed; bottom: 0; left: 0; width: 100%; height: 75vh;
                    background: #1a1e26; border-top-left-radius: 32px; border-top-right-radius: 32px;
                    z-index: 101; transform: translateY(100%); 
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    display: flex; flex-direction: column;
                    box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
                    border-top: 1px solid rgba(255,255,255,0.1);
                }
                .comments-drawer.open { transform: translateY(0); }
                
                .drawer-header {
                    padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.05);
                    display: flex; justify-content: space-between; align-items: center;
                }
                .drawer-content { flex: 1; overflow-y: auto; padding: 24px; }
                
                .drawer-input-area {
                    padding: 16px 24px 32px 24px; background: #252a33;
                    border-top: 1px solid rgba(255,255,255,0.05);
                }
                .reply-indicator {
                    display: flex; justify-content: space-between; align-items: center;
                    background: rgba(0, 194, 255, 0.1); padding: 8px 16px;
                    border-radius: 12px; margin-bottom: 12px; font-size: 12px;
                    border-left: 3px solid #00c2ff;
                }
                .input-container { display: flex; gap: 12px; align-items: center; }
                .input-container input {
                    flex: 1; background: #0c0f14; border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 14px; padding: 12px 18px; color: #fff; outline: none;
                    font-size: 15px; transition: border-color 0.2s;
                }
                .input-container input:focus { border-color: #00c2ff; }
                .send-btn-circle {
                    width: 46px; height: 46px; border-radius: 50%; background: #00c2ff;
                    color: #000; border: none; display: flex; items-center; justify-content: center;
                    cursor: pointer; transition: transform 0.2s, background 0.2s;
                }
                .send-btn-circle:active { transform: scale(0.9); }
                .send-btn-circle:disabled { background: #333; color: #777; cursor: not-allowed; }
            `}),e.jsx("div",{className:`comments-overlay ${s?"open":""}`,onClick:n}),e.jsxs("div",{className:`comments-drawer ${s?"open":""}`,children:[e.jsxs("header",{className:"drawer-header",children:[e.jsx("h3",{className:"text-base font-black text-white uppercase tracking-widest",children:l}),e.jsx("button",{onClick:n,className:"w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white",children:e.jsx("i",{className:"fa-solid fa-xmark"})})]}),e.jsx("div",{className:"drawer-content no-scrollbar",children:i.length>0?i.map(t=>e.jsx(j,{comment:t,onReplyClick:h,onLike:x,onDelete:m,onUserClick:f,currentUserId:u},t.id)):e.jsxs("div",{className:"flex flex-col items-center justify-center py-20 opacity-20",children:[e.jsx("i",{className:"fa-regular fa-comments text-5xl mb-4"}),e.jsx("p",{className:"font-bold uppercase tracking-widest text-sm",children:"Nenhuma interação ainda"})]})}),e.jsxs("div",{className:"drawer-input-area",children:[r&&e.jsxs("div",{className:"reply-indicator animate-fade-in",children:[e.jsxs("span",{className:"text-gray-300",children:["Respondendo a ",e.jsxs("strong",{className:"text-[#00c2ff]",children:["@",r.username]})]}),e.jsx("button",{onClick:b,className:"text-gray-500 hover:text-white",children:e.jsx("i",{className:"fa-solid fa-circle-xmark"})})]}),e.jsxs("div",{className:"input-container",children:[e.jsx("input",{ref:a,type:"text",placeholder:r?`Responda @${r.username}...`:g,value:o,onChange:t=>p(t.target.value),onKeyDown:t=>t.key==="Enter"&&c()}),e.jsx("button",{className:"send-btn-circle",onClick:c,disabled:!o.trim(),children:e.jsx("i",{className:"fa-solid fa-paper-plane text-sm"})})]})]})]})]})};export{N as C};
