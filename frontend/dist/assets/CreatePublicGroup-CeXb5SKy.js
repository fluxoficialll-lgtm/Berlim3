import{u as _,r as t,j as e,c as f,g as k}from"./index-BC19Iu_T.js";import{p as z}from"./postService-XFLx8Vj8.js";import{I as G}from"./ImageCropModal-DKSoCquK.js";import{g as F}from"./idGenerator-C8OoQYlS.js";const P=()=>{const i=_(),[n,u]=t.useState(""),[d,m]=t.useState(""),[l,b]=t.useState(void 0),[p,h]=t.useState(null),[c,x]=t.useState(!1),[v,g]=t.useState(!1),[w,j]=t.useState(""),y=r=>{const o=r.target.files?.[0];if(o){const a=new FileReader;a.onload=s=>{j(s.target?.result),g(!0)},a.readAsDataURL(o)}},C=r=>{b(r),fetch(r).then(o=>o.blob()).then(o=>{const a=new File([o],"group_cover.jpg",{type:"image/jpeg"});h(a)})},N=()=>{window.history.state&&window.history.state.idx>0?i(-1):i("/create-group")},I=async r=>{if(r.preventDefault(),!c){x(!0);try{const o=f.getCurrentUserId(),a=f.getCurrentUserEmail();let s=l;p&&(s=await z.uploadMedia(p,"group_covers"));const S={id:F(),name:n,description:d,coverImage:s,isVip:!1,isPrivate:!1,lastMessage:"Grupo público criado.",time:"Agora",creatorId:o||"",creatorEmail:a||void 0,memberIds:o?[o]:[],adminIds:o?[o]:[]};await k.createGroup(S),i("/groups")}catch{alert("Erro ao criar grupo público.")}finally{x(!1)}}};return e.jsxs("div",{className:"min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-x-hidden",children:[e.jsx("style",{children:`
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Inter',sans-serif; }
        header {
            display:flex; align-items:center; justify-content:space-between; padding:16px 32px;
            background: #0c0f14; position:fixed; width:100%; z-index:10; border-bottom:1px solid rgba(255,255,255,0.1);
            top: 0; height: 80px;
        }
        header button {
            background:none; border:none; color:#00c2ff; font-size:18px; cursor:pointer; transition:0.3s;
        }
        header button:hover { color:#fff; }
        main { 
            flex-grow:1; display:flex; flex-direction:column; align-items:center; 
            justify-content:flex-start; width:100%; padding-top: 100px; 
            padding-bottom: 40px; 
        }
        #creationContainer {
            width:100%; max-width:500px; padding: 0 20px;
            display: flex; flex-direction: column; gap: 20px;
        }
        h1 { font-size: 24px; text-align: center; margin-bottom: 20px; color: #00c2ff; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .cover-upload-container { display: flex; flex-direction: column; align-items: center; margin-bottom: 10px; }
        .cover-preview {
            width: 120px; height: 120px; border-radius: 50%;
            border: 3px solid #00c2ff; background: rgba(255,255,255,0.05);
            display: flex; align-items: center; justify-content: center;
            overflow: hidden; position: relative; cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 0 20px rgba(0,194,255,0.2);
        }
        .cover-preview:hover { border-color: #fff; box-shadow: 0 0 25px rgba(0,194,255,0.4); }
        .cover-preview img { width: 100%; height: 100%; object-fit: cover; }
        .cover-icon { font-size: 40px; color: rgba(255,255,255,0.3); }
        .cover-label { margin-top: 10px; font-size: 14px; color: #00c2ff; cursor: pointer; font-weight: 600; }
        .form-group { display: flex; flex-direction: column; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #00c2ff; font-size: 14px; }
        .form-group input[type="text"], .form-group textarea {
            width: 100%; padding: 14px; border: 1px solid rgba(0,194,255,0.3); border-radius: 12px;
            background: rgba(255,255,255,0.05); color: #fff; font-size: 16px;
            transition: border-color 0.3s, box-shadow 0.3s; resize: vertical;
        }
        .form-group input[type="text"]:focus, .form-group textarea:focus { border-color: #00c2ff; outline: none; box-shadow: 0 0 10px rgba(0,194,255,0.2); }
        .form-group textarea { min-height: 120px; }
        .submit-button {
            width: 100%; padding: 16px 0; border: none; border-radius: 12px;
            background-color: #00c2ff; color: #000; font-size: 18px; font-weight: 700;
            cursor: pointer; transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
            box-shadow: 0 4px 15px rgba(0,194,255,0.3); margin-top: 20px;
            display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .submit-button:hover { background-color: #0099cc; box-shadow: 0 6px 20px rgba(0,194,255,0.5); }
        .submit-button:disabled { background-color: #333; color: #888; cursor: not-allowed; box-shadow: none; }
      `}),e.jsxs("header",{children:[e.jsx("button",{onClick:N,children:e.jsx("i",{className:"fa-solid fa-arrow-left"})}),e.jsxs("div",{className:"absolute left-1/2 -translate-x-1/2 w-[60px] h-[60px] bg-white/5 rounded-2xl flex justify-center items-center z-20 cursor-pointer shadow-[0_0_20px_rgba(0,194,255,0.3),inset_0_0_20px_rgba(0,194,255,0.08)]",onClick:()=>i("/feed"),children:[e.jsx("div",{className:"absolute w-[40px] h-[22px] rounded-[50%] border-[3px] border-[#00c2ff] rotate-[25deg]"}),e.jsx("div",{className:"absolute w-[40px] h-[22px] rounded-[50%] border-[3px] border-[#00c2ff] -rotate-[25deg]"})]}),e.jsx("button",{style:{marginLeft:"auto"},onClick:()=>i("/messages"),children:e.jsx("i",{className:"fa-solid fa-message"})})]}),e.jsx("main",{id:"mainContent",children:e.jsxs("div",{id:"creationContainer",children:[e.jsxs("h1",{children:[e.jsx("i",{className:"fa-solid fa-globe"})," Novo Grupo Público"]}),e.jsxs("form",{onSubmit:I,children:[e.jsxs("div",{className:"cover-upload-container",children:[e.jsx("label",{htmlFor:"coverImage",className:"cover-preview",children:l?e.jsx("img",{src:l,alt:"Preview"}):e.jsx("i",{className:"fa-solid fa-camera cover-icon"})}),e.jsx("label",{htmlFor:"coverImage",className:"cover-label",children:"Alterar Capa"}),e.jsx("input",{type:"file",id:"coverImage",accept:"image/*",onChange:y,style:{display:"none"}})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"groupName",children:"Nome do Grupo"}),e.jsx("input",{type:"text",id:"groupName",value:n,onChange:r=>u(r.target.value),placeholder:"Digite o nome do grupo",required:!0,maxLength:50})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"groupDescription",children:"Descrição do Grupo"}),e.jsx("textarea",{id:"groupDescription",value:d,onChange:r=>m(r.target.value),placeholder:"Sobre o que é este grupo?",maxLength:250})]}),e.jsx("button",{type:"submit",className:"submit-button",disabled:!n||c,children:c?e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin"}):"Criar Grupo"})]})]})}),e.jsx(G,{isOpen:v,imageSrc:w,onClose:()=>g(!1),onSave:C})]})};export{P as CreatePublicGroup};
