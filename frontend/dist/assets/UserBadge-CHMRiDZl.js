import{r as p,j as e}from"./index-BC19Iu_T.js";import{U as b}from"./UserAvatar-BWaKHm2D.js";const g=({isOpen:n,onClose:t,imageSrc:s,username:o})=>{const[r,a]=p.useState(!1);if(!n)return null;const i=l=>{l.stopPropagation(),a(!r)};return e.jsxs("div",{className:"fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in",onClick:t,children:[e.jsx("style",{children:`
                .avatar-modal-container {
                    width: 300px;
                    height: 300px;
                    background: #1a1e26;
                    border-radius: 24px;
                    border: 1px solid rgba(255,255,255,0.1);
                    overflow: hidden;
                    position: relative;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .avatar-modal-fullscreen {
                    width: 100vw;
                    height: 100vh;
                    border-radius: 0;
                    border: none;
                    background: black;
                }
                .avatar-modal-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    cursor: pointer;
                    transition: object-fit 0.3s;
                }
                .avatar-modal-fullscreen .avatar-modal-img {
                    object-fit: contain;
                }
                .close-btn {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    z-index: 110;
                    background: rgba(0,0,0,0.5);
                    color: white;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    items-center;
                    justify-content: center;
                    border: none;
                    cursor: pointer;
                }
                .modal-label {
                    position: absolute;
                    bottom: 15px;
                    left: 0;
                    width: 100%;
                    text-align: center;
                    font-size: 12px;
                    font-weight: bold;
                    color: rgba(255,255,255,0.5);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    pointer-events: none;
                }
            `}),e.jsx("button",{className:"close-btn",onClick:t,children:e.jsx("i",{className:"fa-solid fa-xmark"})}),e.jsxs("div",{className:`avatar-modal-container ${r?"avatar-modal-fullscreen":""} animate-pop-in`,onClick:l=>l.stopPropagation(),children:[e.jsx("img",{src:s,alt:o,className:"avatar-modal-img",onClick:i}),!r&&e.jsx("div",{className:"modal-label",children:"Toque para ampliar"})]})]})},f=({nickname:n,handle:t,isVip:s=!1,isVerified:o=!1,showHandle:r=!0,size:a="md",className:i="",onClick:l})=>{const d=n||t?.replace("@","")||"Usuário",x=t?.startsWith("@")?t:`@${t||"user"}`,c={sm:{name:"text-[13px]",handle:"text-[10px]"},md:{name:"text-base",handle:"text-xs"},lg:{name:"text-xl",handle:"text-sm"}};return e.jsxs("div",{className:`flex flex-col min-w-0 ${i} cursor-pointer`,onClick:l,children:[e.jsxs("div",{className:"flex items-center gap-1.5 min-w-0",children:[e.jsx("span",{className:`font-bold truncate ${c[a].name} ${s?"text-[#FFD700]":"text-white"}`,children:d}),o&&e.jsx("i",{className:"fa-solid fa-circle-check text-[#00c2ff] text-[10px]"}),s&&e.jsx("span",{className:"bg-[#FFD700] text-black text-[8px] font-black px-1 rounded-sm leading-tight",children:"VIP"})]}),r&&e.jsx("span",{className:`font-medium opacity-50 truncate ${c[a].handle} ${s?"text-[#FFD700]":"text-gray-400"}`,children:x})]})},j=({avatarUrl:n,nickname:t,handle:s,isVip:o,isVerified:r,avatarSize:a="md",showHandle:i=!0,layout:l="row",gap:d="gap-3",className:x="",onAvatarClick:c,onNameClick:m})=>e.jsxs("div",{className:`flex ${l==="row"?"flex-row items-center":"flex-col items-center text-center"} ${d} ${x}`,children:[e.jsx(b,{src:n,isVip:o,size:a,onClick:c,alt:t}),e.jsx(f,{nickname:t,handle:s,isVip:o,isVerified:r,showHandle:i,size:a==="lg"||a==="xl"?"lg":a==="xs"?"sm":"md",onClick:m})]});export{g as A,j as U,f as a};
