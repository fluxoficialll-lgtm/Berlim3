import{j as e}from"./index-BC19Iu_T.js";const i=({progress:s,current:a,total:r,isVisible:t})=>t?e.jsxs("div",{className:"fixed bottom-[100px] left-1/2 -translate-x-1/2 z-[55] w-full max-w-[340px] px-4 animate-slide-up",children:[e.jsx("style",{children:`
                .upload-status-card {
                    background: rgba(26, 30, 38, 0.85);
                    backdrop-filter: blur(25px);
                    -webkit-backdrop-filter: blur(25px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 20px;
                    border-radius: 24px;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 194, 255, 0.05);
                }
                .progress-bar-container {
                    width: 100%;
                    height: 6px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                    overflow: hidden;
                    margin: 12px 0 8px 0;
                }
                .progress-fill {
                    height: 100%;
                    background: #00c2ff;
                    box-shadow: 0 0 15px rgba(0, 194, 255, 0.6);
                    transition: width 0.3s ease-out;
                }
                .upload-label {
                    font-size: 10px;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: rgba(255, 255, 255, 0.9);
                }
                .upload-counter {
                    font-size: 10px;
                    font-weight: 900;
                    color: rgba(255, 255, 255, 0.4);
                }
                .percent-text {
                    font-size: 14px;
                    font-weight: 900;
                    color: #00c2ff;
                }
            `}),e.jsxs("div",{className:"upload-status-card",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("i",{className:"fa-solid fa-cloud-arrow-up text-[#00c2ff] text-xs animate-pulse"}),e.jsx("span",{className:"upload-label",children:"Enviando"})]}),e.jsxs("span",{className:"upload-counter",children:[a," / ",r]})]}),e.jsx("div",{className:"progress-bar-container",children:e.jsx("div",{className:"progress-fill",style:{width:`${s}%`}})}),e.jsx("div",{className:"flex justify-end",children:e.jsxs("span",{className:"percent-text",children:[s,"%"]})})]})]}):null;export{i as U};
