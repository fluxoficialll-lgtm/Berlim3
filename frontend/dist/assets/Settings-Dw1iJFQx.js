import{u as g,j as e,c as d,e as b,r as u}from"./index-BC19Iu_T.js";import{F as j}from"./Footer-CqKWM_In.js";import{S as o}from"./SettingItem-DxC-aysh.js";import{LANGUAGES as k}from"./LanguageSettings-CxVe64_s.js";const v=()=>{const t=g();return e.jsxs("div",{className:"settings-group",children:[e.jsx("h2",{children:"Conta"}),e.jsx(o,{icon:"fa-user-edit",label:"Editar Perfil",onClick:()=>t("/edit-profile")}),e.jsx(o,{icon:"fa-wallet",label:"Resgatar Saldo (Financeiro)",onClick:()=>t("/financial")})]})},w=({isPrivate:t,onTogglePrivacy:n,isAdultContent:r,onToggleAdult:i})=>{const s=g(),l=(p,x)=>e.jsxs("label",{className:"switch",onClick:f=>f.stopPropagation(),children:[e.jsx("input",{type:"checkbox",checked:p,onChange:x}),e.jsx("span",{className:"slider"})]});return e.jsxs("div",{className:"settings-group",children:[e.jsx("h2",{children:"Privacidade e Segurança"}),e.jsx(o,{icon:"fa-lock",label:"Conta Privada",onClick:n,rightElement:l(t,n)}),e.jsx(o,{icon:"fa-triangle-exclamation",label:"Habilitar Conteúdo +18",onClick:i,rightElement:l(r,i)}),e.jsx(o,{icon:"fa-shield-alt",label:"Segurança e Login",onClick:()=>s("/security-login")}),e.jsx(o,{icon:"fa-user-slash",label:"Gerenciar Bloqueios",onClick:()=>s("/blocked-users")})]})},C=()=>{const t=g(),r=d.getCurrentUser()?.language||localStorage.getItem("app_language")||"pt",i=k.find(s=>s.id===r)?.label||"Português";return e.jsxs("div",{className:"settings-group",children:[e.jsx("h2",{children:"Geral"}),e.jsx(o,{icon:"fa-bell",label:"Configurações de Notificação",onClick:()=>t("/notification-settings")}),e.jsx(o,{icon:"fa-language",label:"Idioma",onClick:()=>t("/settings/language"),rightElement:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-xs font-bold text-gray-500 uppercase",children:i}),e.jsx("i",{className:"fas fa-chevron-right text-gray-600 text-xs"})]})}),e.jsx(o,{icon:"fa-file-alt",label:"Termos e Privacidade",onClick:()=>t("/terms")}),e.jsx(o,{icon:"fa-headset",label:"Ajuda e Suporte",onClick:()=>t("/help")})]})},A=()=>{const t=g(),{showConfirm:n,showAlert:r}=b(),[i,s]=u.useState(!1),[l,p]=u.useState(localStorage.getItem("settings_18_plus")==="true");u.useEffect(()=>{const a=d.getCurrentUser();a?.profile&&s(a.profile.isPrivate)},[]);const x=async a=>{a.preventDefault(),await n("Sair da conta","Deseja realmente sair do aplicativo? Você precisará fazer login novamente.","Sair","Ficar")&&(d.logout(),t("/",{replace:!0}))},f=async()=>{const a=!i;s(a);const c=d.getCurrentUser();c&&c.email&&c.profile&&d.completeProfile(c.email,{...c.profile,isPrivate:a}).catch(m=>console.error(m)),await r("Status da Conta",`Sua conta agora é ${a?"PRIVADA":"PÚBLICA"}.`)},h=()=>{const a=!l;p(a),localStorage.setItem("settings_18_plus",String(a))};return e.jsxs("div",{className:"h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden",children:[e.jsx("style",{children:`
        header { display:flex; align-items:center; padding:16px; background: #0c0f14; position:fixed; width:100%; top:0; z-index:10; border-bottom:1px solid rgba(255,255,255,0.1); height: 65px; }
        header .back-btn { background:none; border:none; color:#fff; font-size:24px; cursor:pointer; padding-right: 15px; }
        main { padding-top: 85px; padding-bottom: 100px; width: 100%; max-width: 600px; margin: 0 auto; padding-left: 20px; padding-right: 20px; overflow-y: auto; flex-grow: 1; -webkit-overflow-scrolling: touch; }
        
        .settings-group { margin-bottom: 20px; }
        .settings-group h2 { font-size: 13px; color: #00c2ff; padding: 10px 0; margin-bottom: 8px; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; }
        
        .setting-item { 
          display: flex; 
          align-items: center; 
          justify-content: space-between; 
          padding: 16px; 
          background-color: rgba(255, 255, 255, 0.03); 
          border: 1px solid rgba(255,255,255,0.05);
          transition: 0.2s; 
          color: #fff; 
          cursor: pointer; 
          border-radius: 14px; 
          margin-bottom: 8px; 
        }
        .setting-item:hover { background-color: rgba(255, 255, 255, 0.06); border-color: rgba(0, 194, 255, 0.2); }
        
        .setting-info { display: flex; align-items: center; }
        .setting-info i { font-size: 18px; width: 30px; text-align: center; margin-right: 12px; color: #00c2ff; }
        .setting-item p { font-size: 15px; font-weight: 500; }
        
        .switch { position: relative; display: inline-block; width: 44px; height: 24px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #333; transition: .4s; border-radius: 25px; }
        .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
        input:checked + .slider { background-color: #00c2ff; }
        input:checked + .slider:before { transform: translateX(20px); }
        
        .logout-container { margin-top: 30px; padding: 0 10px 40px 10px; }
        .logout-btn { 
          width: 100%; 
          padding: 16px; 
          background: rgba(255, 77, 77, 0.08); 
          border: 1px solid rgba(255, 77, 77, 0.2); 
          color: #ff4d4d; 
          border-radius: 16px; 
          font-weight: 700; 
          font-size: 15px; 
          cursor: pointer; 
          transition: 0.3s; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          gap: 10px; 
        }
        .logout-btn:hover { background: #ff4d4d; color: #fff; box-shadow: 0 4px 20px rgba(255, 77, 77, 0.2); }
      `}),e.jsxs("header",{children:[e.jsx("button",{onClick:()=>t("/profile"),className:"back-btn",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("h1",{className:"font-bold text-lg text-white",children:"Configurações"})]}),e.jsxs("main",{className:"no-scrollbar",children:[e.jsx(v,{}),e.jsx(w,{isPrivate:i,onTogglePrivacy:f,isAdultContent:l,onToggleAdult:h}),e.jsxs("div",{className:"settings-group",children:[e.jsx("h2",{children:"Geral"}),e.jsx(o,{icon:"fa-palette",label:"Temas do Chat",onClick:()=>t("/settings/chat-themes")}),e.jsx(C,{})]}),e.jsxs("div",{className:"logout-container",children:[e.jsxs("button",{onClick:x,className:"logout-btn",children:[e.jsx("i",{className:"fas fa-sign-out-alt"})," Sair da Conta"]}),e.jsx("div",{className:"text-center mt-6 opacity-20 text-[10px] uppercase font-black tracking-widest",children:"Flux Security Ecosystem • v1.2.3"})]})]}),e.jsx(j,{})]})};export{A as Settings};
