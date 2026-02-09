import{u as C,r as t,c as o,j as e}from"./index-BC19Iu_T.js";const L=()=>{const l=C(),[d,p]=t.useState({saveLoginInfo:!0}),[g,x]=t.useState(""),[r,u]=t.useState(""),[h,f]=t.useState(""),[b,n]=t.useState(""),[m,v]=t.useState(""),[w,a]=t.useState(!1),[c,j]=t.useState([]);t.useEffect(()=>{const s=o.getCurrentUser();s&&s.securitySettings&&p(s.securitySettings),j(o.getUserSessions());const i=db.subscribe("users",()=>{j(o.getUserSessions())});return()=>i()},[]);const N=s=>{const i={...d,[s]:!d[s]};p(i),o.updateSecuritySettings(i)},S=async s=>{if(s.preventDefault(),n(""),v(""),a(!0),r.length<6){n("A nova senha deve ter pelo menos 6 caracteres."),a(!1);return}if(r!==h){n("As novas senhas não coincidem."),a(!1);return}try{await o.changePassword(g,r),v("Senha alterada com sucesso!"),x(""),u(""),f("")}catch(i){n(i.message||"Erro ao alterar senha.")}finally{a(!1)}},k=async()=>{window.confirm("Deseja desconectar todos os outros dispositivos?")&&await o.revokeOtherSessions()},y=s=>new Date(s).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}),z=()=>{window.history.state&&window.history.state.idx>0?l(-1):l("/settings")};return e.jsxs("div",{className:"h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden",children:[e.jsx("style",{children:`
            * { margin:0; padding:0; box-sizing:border-box; font-family:'Inter', sans-serif; }
            header {
                display:flex; align-items:center; padding:16px;
                background: #0c0f14; position:fixed; width:100%; top:0; z-index:10;
                border-bottom:1px solid rgba(255,255,255,0.1); height: 65px;
            }
            header .back-btn {
                background:none; border:none; color:#fff; font-size:24px; cursor:pointer; padding-right: 15px;
            }
            header h1 { font-size:20px; font-weight:600; }
            
            main { 
                padding-top: 85px; padding-bottom: 40px; width: 100%; max-width: 600px; 
                margin: 0 auto; padding-left: 20px; padding-right: 20px;
                overflow-y: auto; flex-grow: 1; -webkit-overflow-scrolling: touch;
            }
            
            .settings-section {
                background: rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden;
                border: 1px solid rgba(255,255,255,0.05); margin-bottom: 25px;
            }
            
            .setting-row {
                display: flex; align-items: center; justify-content: space-between;
                padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.05);
            }
            .setting-row:last-child { border-bottom: none; }
            
            .label-title { font-size: 16px; font-weight: 500; color: #fff; }
            .label-desc { font-size: 13px; color: #888; margin-top: 2px; }
            
            /* Switch */
            .switch { position: relative; display: inline-block; width: 44px; height: 24px; }
            .switch input { opacity: 0; width: 0; height: 0; }
            .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #333; transition: .4s; border-radius: 24px; }
            .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
            input:checked + .slider { background-color: #00c2ff; }
            input:checked + .slider:before { transform: translateX(20px); }
            
            .section-title {
                font-size: 14px; color: #00c2ff; margin-bottom: 10px; text-transform: uppercase; font-weight: 700; padding-left: 5px;
            }

            /* Password Form */
            .password-form { padding: 20px; }
            .input-group { margin-bottom: 15px; }
            .input-group label { display: block; font-size: 13px; color: #aaa; margin-bottom: 5px; }
            .input-group input {
                width: 100%; padding: 12px; background: #111; border: 1px solid #333;
                border-radius: 8px; color: #fff; outline: none; transition: 0.3s;
            }
            .input-group input:focus { border-color: #00c2ff; }
            
            .save-btn {
                width: 100%; padding: 12px; background: #00c2ff; color: #000;
                border: none; border-radius: 8px; font-weight: 700; cursor: pointer;
                transition: 0.3s;
            }
            .save-btn:hover { background: #0099cc; }
            .save-btn:disabled { opacity: 0.7; cursor: not-allowed; }

            .alert-box {
                padding: 10px; border-radius: 8px; margin-bottom: 15px; font-size: 13px;
            }
            .alert-error { background: rgba(255, 77, 77, 0.1); color: #ff4d4d; border: 1px solid rgba(255, 77, 77, 0.3); }
            .alert-success { background: rgba(0, 255, 130, 0.1); color: #00ff82; border: 1px solid rgba(0, 255, 130, 0.3); }

            /* Login Activity */
            .session-item {
                display: flex; align-items: center; padding: 15px;
                border-bottom: 1px solid rgba(255,255,255,0.05);
            }
            .session-item:last-child { border-bottom: none; }
            .session-icon { font-size: 24px; color: #aaa; margin-right: 15px; }
            .session-info h4 { font-size: 15px; font-weight: 600; color: #fff; }
            .session-info p { font-size: 12px; color: #888; margin-top: 2px; }
            .active-now { color: #00ff82; font-size: 11px; font-weight: 700; margin-top: 4px; display: flex; align-items: center; gap: 4px; }
            .active-dot { width: 6px; height: 6px; background: #00ff82; border-radius: 50%; }
            
            .revoke-btn {
                background: transparent; color: #ff4d4d; border: 1px solid #ff4d4d;
                padding: 4px 10px; border-radius: 12px; font-size: 11px; cursor: pointer;
                transition: 0.2s;
            }
            .revoke-btn:hover { background: rgba(255, 77, 77, 0.1); }
        `}),e.jsxs("header",{children:[e.jsx("button",{onClick:z,className:"back-btn",children:e.jsx("i",{className:"fa-solid fa-arrow-left"})}),e.jsx("h1",{children:"Segurança e Login"})]}),e.jsxs("main",{children:[e.jsx("div",{className:"section-title",children:"Alterar Senha"}),e.jsx("div",{className:"settings-section",children:e.jsxs("div",{className:"password-form",children:[b&&e.jsx("div",{className:"alert-box alert-error",children:b}),m&&e.jsx("div",{className:"alert-box alert-success",children:m}),e.jsxs("form",{onSubmit:S,children:[e.jsxs("div",{className:"input-group",children:[e.jsx("label",{children:"Senha Atual"}),e.jsx("input",{type:"password",value:g,onChange:s=>x(s.target.value),required:!0})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{children:"Nova Senha"}),e.jsx("input",{type:"password",value:r,onChange:s=>u(s.target.value),required:!0})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{children:"Confirmar Nova Senha"}),e.jsx("input",{type:"password",value:h,onChange:s=>f(s.target.value),required:!0})]}),e.jsx("button",{type:"submit",className:"save-btn",disabled:w,children:w?"Alterando...":"Alterar Senha"})]})]})}),e.jsx("div",{className:"section-title",children:"Preferências"}),e.jsx("div",{className:"settings-section",children:e.jsxs("div",{className:"setting-row",children:[e.jsxs("div",{children:[e.jsx("div",{className:"label-title",children:"Salvar Login"}),e.jsx("div",{className:"label-desc",children:"Manter dados para login rápido."})]}),e.jsxs("label",{className:"switch",children:[e.jsx("input",{type:"checkbox",checked:d.saveLoginInfo,onChange:()=>N("saveLoginInfo")}),e.jsx("span",{className:"slider"})]})]})}),e.jsxs("div",{className:"flex justify-between items-end mb-2 px-1",children:[e.jsx("div",{className:"section-title mb-0",children:"Sessões Ativas"}),c.length>1&&e.jsx("button",{onClick:k,className:"revoke-btn",children:"Sair de outros dispositivos"})]}),e.jsx("div",{className:"settings-section",children:c.length>0?c.map(s=>e.jsxs("div",{className:"session-item",children:[e.jsx("i",{className:`fa-solid ${s.device.toLowerCase().includes("mobile")?"fa-mobile-screen-button":"fa-laptop"} session-icon`}),e.jsxs("div",{className:"session-info",children:[e.jsx("h4",{children:s.device}),e.jsxs("p",{children:[s.location," • ",y(s.timestamp)]}),s.isActive&&e.jsxs("div",{className:"active-now",children:[e.jsx("div",{className:"active-dot"})," Ativo agora"]})]})]},s.id)):e.jsx("div",{className:"session-item",children:e.jsx("div",{className:"session-info w-full text-center py-4",children:e.jsx("p",{children:"Nenhuma informação de sessão disponível."})})})})]})]})};export{L as SecurityLogin};
