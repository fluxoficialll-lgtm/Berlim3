import{u as J,f as V,r as i,c as B,g as d,j as e}from"./index-BC19Iu_T.js";const X=()=>{const S=J(),{id:m}=V(),[t,G]=i.useState(null),[H,R]=i.useState(null),[_,h]=i.useState(0),[u,k]=i.useState(""),[v,M]=i.useState(!1),[x,C]=i.useState(!1),[z,A]=i.useState("30"),[j,L]=i.useState(!1),[b,P]=i.useState(!1),[I,E]=i.useState("60"),[c,N]=i.useState([]),[g,T]=i.useState(""),[n,l]=i.useState(null),[w,W]=i.useState(""),[D,p]=i.useState([]);i.useEffect(()=>{const s=B.getCurrentUserEmail();if(R(s),m){const a=d.getGroupById(m);if(a){G(a),a.settings&&(a.settings.memberLimit&&k(a.settings.memberLimit),a.settings.onlyAdminsPost&&M(a.settings.onlyAdminsPost),a.settings.msgSlowMode&&C(a.settings.msgSlowMode),a.settings.msgSlowModeInterval&&A(a.settings.msgSlowModeInterval.toString()),a.settings.approveMembers&&L(a.settings.approveMembers),a.settings.joinSlowMode&&P(a.settings.joinSlowMode),a.settings.joinSlowModeInterval&&E(a.settings.joinSlowModeInterval.toString()),a.settings.forbiddenWords&&N(a.settings.forbiddenWords));const f=d.getGroupMembers(m);h(f.length);const y=f.map(o=>{const r=a.adminIds?.includes(o.id)||a.creatorId===o.id;return{id:o.id,name:o.profile?.nickname||"Usuário",username:o.profile?.name?`@${o.profile.name}`:"@user",role:o.id===a.creatorId?"Dono":r?"Admin":"Membro"}});p(y)}}},[m]),i.useEffect(()=>{n||W("")},[n]);const Y=s=>{s.preventDefault(),g.trim()&&!c.includes(g.trim().toLowerCase())&&(N([...c,g.trim().toLowerCase()]),T(""))},q=s=>{N(c.filter(a=>a!==s))},F=(s,a)=>{if(!n||!t)return;if(s===t.creatorId){alert("Não é possível realizar ações contra o Dono do grupo.");return}const f=B.getCurrentUserId();if(s===f){alert("Você não pode realizar esta ação em si mesmo aqui.");return}const y={kick:"expulso",ban:"banido",promote:"promovido a Admin",demote:"rebaixado para Membro"};n==="kick"?(d.removeMember(t.id,s),p(o=>o.filter(r=>r.id!==s)),h(o=>o-1)):n==="ban"?(d.banMember(t.id,s),p(o=>o.filter(r=>r.id!==s)),h(o=>o-1)):n==="promote"?(d.promoteMember(t.id,s),p(o=>o.map(r=>r.id===s?{...r,role:"Admin"}:r))):n==="demote"&&(d.demoteMember(t.id,s),p(o=>o.map(r=>r.id===s?{...r,role:"Membro"}:r))),alert(`${a} foi ${y[n]} com sucesso.`),l(null)},$=()=>{if(t){const s={...t,settings:{memberLimit:u?Number(u):void 0,onlyAdminsPost:v,msgSlowMode:x,msgSlowModeInterval:Number(z),approveMembers:j,joinSlowMode:t.isPrivate?!1:b,joinSlowModeInterval:Number(I),forbiddenWords:c}};d.updateGroup(s),alert("Configurações salvas com sucesso!"),S(-1)}},U=D.filter(s=>s.name.toLowerCase().includes(w.toLowerCase())||s.username.toLowerCase().includes(w.toLowerCase()));return e.jsxs("div",{className:"h-[100dvh] bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col",children:[e.jsx("style",{children:`
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Inter',sans-serif; }
        
        header {
            display:flex; align-items:center; padding:16px;
            background: #0c0f14; position:fixed; width:100%; z-index:10;
            border-bottom:1px solid rgba(255,255,255,0.1); top: 0; height: 65px;
        }
        header button {
            background:none; border:none; color:#fff; font-size:24px; cursor:pointer;
            transition:0.3s; padding-right: 15px;
        }
        header h1 { font-size:20px; font-weight:600; }
        
        main {
            padding-top: 90px; padding-bottom: 40px;
            width: 100%; max-width: 600px; margin: 0 auto; padding-left: 20px; padding-right: 20px;
            overflow-y: auto; flex-grow: 1; -webkit-overflow-scrolling: touch;
        }

        .section-title {
            font-size: 13px; color: #00c2ff; margin: 25px 0 10px 5px; 
            text-transform: uppercase; font-weight: 700; letter-spacing: 1px; display: flex; align-items: center; gap: 8px;
        }

        .control-card {
            background: rgba(255,255,255,0.03); border-radius: 16px; overflow: hidden;
            border: 1px solid rgba(255,255,255,0.05); margin-bottom: 10px;
        }

        .control-row {
            display: flex; align-items: center; justify-content: space-between;
            padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .control-row:last-child { border-bottom: none; }
        
        .control-col {
            display: flex; flex-direction: column; width: 100%; padding: 16px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .label-main { font-size: 16px; font-weight: 500; color: #fff; margin-bottom: 4px; }
        .label-sub { font-size: 13px; color: #888; line-height: 1.3; }

        /* Inputs inside cards */
        .card-input {
            background: #1a1e26; border: 1px solid rgba(255,255,255,0.1);
            color: #fff; padding: 10px; border-radius: 8px; outline: none;
            width: 100%; font-size: 14px; margin-top: 10px;
        }
        .card-input:focus { border-color: #00c2ff; }

        /* Switch Style */
        .switch { position: relative; display: inline-block; width: 44px; height: 24px; flex-shrink: 0; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #333; transition: .4s; border-radius: 24px; }
        .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
        input:checked + .slider { background-color: #00c2ff; }
        input:checked + .slider:before { transform: translateX(20px); }

        /* Actions Grid */
        .actions-grid {
            display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; padding: 16px;
        }
        .action-btn-card {
            background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px; padding: 15px 5px; text-align: center; cursor: pointer;
            transition: 0.2s; display: flex; flex-direction: column; align-items: center; gap: 8px;
        }
        .action-btn-card:hover { background: rgba(255,255,255,0.1); transform: translateY(-2px); }
        .action-btn-card i { font-size: 20px; }
        .action-btn-card span { font-size: 12px; font-weight: 600; }
        
        .btn-expel { color: #ff9800; border-color: rgba(255, 152, 0, 0.3); }
        .btn-ban { color: #ff4d4d; border-color: rgba(255, 77, 77, 0.3); }
        .btn-promote { color: #00c2ff; border-color: rgba(0, 194, 255, 0.3); }
        .btn-demote { color: #aaa; border-color: #555; }

        /* Tags / Chips */
        .tags-container {
            display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;
        }
        .tag {
            background: rgba(0,194,255,0.15); color: #00c2ff; padding: 5px 10px;
            border-radius: 4px; font-size: 12px; display: flex; align-items: center; gap: 6px;
        }
        .tag i { cursor: pointer; font-size: 10px; opacity: 0.7; }
        .tag i:hover { opacity: 1; }

        .save-btn {
            width: 100%; padding: 16px; background: #00c2ff; color: #000; border: none;
            border-radius: 12px; font-weight: 700; font-size: 16px; cursor: pointer;
            transition: 0.3s; margin-top: 20px; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,194,255,0.3);
        }
        .save-btn:hover { background: #0099cc; transform: translateY(-1px); }

        /* Simple Modal */
        .modal-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.8); z-index: 50; display: flex; align-items: center; justify-content: center;
            backdrop-filter: blur(3px);
        }
        .modal-box {
            background: #1a1e26; width: 90%; max-width: 350px; border-radius: 16px;
            padding: 20px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            display: flex; flex-direction: column; max-height: 80vh;
        }
        
        /* Search in Modal */
        .modal-search-wrapper {
            position: relative; margin-bottom: 15px;
        }
        .modal-search-wrapper i {
            position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
            color: #aaa; font-size: 14px;
        }
        .modal-search-input {
            width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2);
            border-radius: 8px; padding: 10px 10px 10px 35px; color: #fff; outline: none;
            font-size: 14px; transition: 0.3s;
        }
        .modal-search-input:focus { border-color: #00c2ff; background: rgba(255,255,255,0.1); }

        .user-select-item {
            display: flex; justify-content: space-between; align-items: center;
            padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer;
        }
        .user-select-item:hover { background: rgba(255,255,255,0.05); }
        .user-detail { display: flex; flex-direction: column; }
        .user-handle { font-size: 12px; color: #aaa; }
        
        .disabled-text { font-size: 12px; color: #666; padding: 16px; text-align: center; }
      `}),e.jsxs("header",{children:[e.jsx("button",{onClick:()=>S(-1),"aria-label":"Voltar",children:e.jsx("i",{className:"fa-solid fa-arrow-left"})}),e.jsx("h1",{children:"Limite e Controle"})]}),e.jsxs("main",{children:[e.jsxs("div",{className:"section-title",children:[e.jsx("i",{className:"fa-solid fa-users"})," Capacidade"]}),e.jsxs("div",{className:"control-card",children:[e.jsxs("div",{className:"control-row",children:[e.jsxs("div",{children:[e.jsx("div",{className:"label-main",children:"Contagem Atual"}),e.jsx("div",{className:"label-sub",children:"Membros ativos no grupo"})]}),e.jsx("div",{style:{fontWeight:"bold",color:"#00c2ff",fontSize:"18px"},children:_})]}),e.jsxs("div",{className:"control-col",children:[e.jsx("div",{className:"label-main",children:"Limite de Membros"}),e.jsx("div",{className:"label-sub",children:"Deixe em branco para ilimitado"}),e.jsx("input",{type:"number",className:"card-input",placeholder:"Ex: 5000",value:u,onChange:s=>k(s.target.value?parseInt(s.target.value):"")})]})]}),e.jsxs("div",{className:"section-title",children:[e.jsx("i",{className:"fa-solid fa-gavel"})," Ações Administrativas"]}),e.jsxs("div",{className:"actions-grid",children:[e.jsxs("div",{className:"action-btn-card btn-expel",onClick:()=>l("kick"),children:[e.jsx("i",{className:"fa-solid fa-user-minus"}),e.jsx("span",{children:"Expulsar"})]}),e.jsxs("div",{className:"action-btn-card btn-ban",onClick:()=>l("ban"),children:[e.jsx("i",{className:"fa-solid fa-ban"}),e.jsx("span",{children:"Banir"})]}),e.jsxs("div",{className:"action-btn-card btn-promote",onClick:()=>l("promote"),children:[e.jsx("i",{className:"fa-solid fa-user-shield"}),e.jsx("span",{children:"Promover"})]}),e.jsxs("div",{className:"action-btn-card btn-demote",onClick:()=>l("demote"),children:[e.jsx("i",{className:"fa-solid fa-user"}),e.jsx("span",{children:"Rebaixar"})]})]}),e.jsxs("div",{className:"section-title",children:[e.jsx("i",{className:"fa-solid fa-comments"})," Controle de Mensagens"]}),e.jsxs("div",{className:"control-card",children:[e.jsxs("div",{className:"control-row",children:[e.jsxs("div",{children:[e.jsx("div",{className:"label-main",children:"Apenas Administradores"}),e.jsx("div",{className:"label-sub",children:"Membros não podem enviar mensagens"})]}),e.jsxs("label",{className:"switch",children:[e.jsx("input",{type:"checkbox",checked:v,onChange:()=>M(!v)}),e.jsx("span",{className:"slider"})]})]}),e.jsxs("div",{className:"control-row",children:[e.jsxs("div",{children:[e.jsx("div",{className:"label-main",children:"Modo Lento (Mensagens)"}),e.jsx("div",{className:"label-sub",children:"Intervalo entre mensagens"})]}),e.jsxs("label",{className:"switch",children:[e.jsx("input",{type:"checkbox",checked:x,onChange:()=>C(!x)}),e.jsx("span",{className:"slider"})]})]}),x&&e.jsxs("div",{className:"control-col",style:{paddingTop:0,borderBottom:"none"},children:[e.jsx("div",{className:"label-sub",style:{marginBottom:"5px"},children:"Tempo de espera (segundos)"}),e.jsx("input",{type:"number",className:"card-input",value:z,onChange:s=>A(s.target.value)})]})]}),e.jsxs("div",{className:"section-title",children:[e.jsx("i",{className:"fa-solid fa-door-open"})," Controle de Entrada"]}),e.jsxs("div",{className:"control-card",children:[e.jsxs("div",{className:"control-row",children:[e.jsxs("div",{children:[e.jsx("div",{className:"label-main",children:"Aprovar Novos Membros"}),e.jsx("div",{className:"label-sub",children:"Admins precisam aceitar solicitações"})]}),e.jsxs("label",{className:"switch",children:[e.jsx("input",{type:"checkbox",checked:j,onChange:()=>L(!j)}),e.jsx("span",{className:"slider"})]})]}),e.jsxs("div",{className:"control-row",children:[e.jsxs("div",{children:[e.jsx("div",{className:"label-main",children:"Modo Lento (Entrada)"}),e.jsx("div",{className:"label-sub",children:"Limitar frequência de novos membros"})]}),t?.isPrivate?e.jsx("div",{style:{fontSize:"12px",color:"#555",fontStyle:"italic"},children:"Apenas Grupos Públicos"}):e.jsxs("label",{className:"switch",children:[e.jsx("input",{type:"checkbox",checked:b,onChange:()=>P(!b)}),e.jsx("span",{className:"slider"})]})]}),!t?.isPrivate&&b&&e.jsxs("div",{className:"control-col",style:{paddingTop:0,borderBottom:"none"},children:[e.jsx("div",{className:"label-sub",style:{marginBottom:"5px"},children:"Permitir 1 pessoa a cada (minutos)"}),e.jsx("input",{type:"number",className:"card-input",value:I,onChange:s=>E(s.target.value)})]}),t?.isPrivate&&e.jsx("div",{className:"disabled-text",children:"Modo lento de entrada disponível apenas para grupos públicos."})]}),e.jsxs("div",{className:"section-title",children:[e.jsx("i",{className:"fa-solid fa-filter"})," Palavras Proibidas"]}),e.jsx("div",{className:"control-card",children:e.jsxs("div",{className:"control-col",children:[e.jsx("div",{className:"label-main",children:"Filtro de Conteúdo"}),e.jsx("div",{className:"label-sub",children:"Mensagens com estas palavras serão ocultadas"}),e.jsxs("form",{onSubmit:Y,style:{display:"flex",gap:"10px",marginTop:"10px"},children:[e.jsx("input",{type:"text",className:"card-input",style:{marginTop:0},placeholder:"Adicionar palavra...",value:g,onChange:s=>T(s.target.value)}),e.jsx("button",{type:"submit",style:{background:"#00c2ff",border:"none",borderRadius:"8px",padding:"0 15px",color:"#000",fontWeight:"bold"},children:"+"})]}),e.jsxs("div",{className:"tags-container",children:[c.map((s,a)=>e.jsxs("div",{className:"tag",children:[s," ",e.jsx("i",{className:"fa-solid fa-xmark",onClick:()=>q(s)})]},a)),c.length===0&&e.jsx("span",{style:{fontSize:"12px",color:"#555",fontStyle:"italic",marginTop:"5px"},children:"Nenhuma palavra filtrada."})]})]})}),e.jsx("button",{className:"save-btn",onClick:$,children:"Salvar Configurações"})]}),n&&e.jsx("div",{className:"modal-overlay",onClick:()=>l(null),children:e.jsxs("div",{className:"modal-box",onClick:s=>s.stopPropagation(),children:[e.jsxs("h3",{style:{fontSize:"18px",fontWeight:"bold",color:"#fff",marginBottom:"15px",textAlign:"center"},children:["Selecione para ",n==="kick"?"Expulsar":n==="ban"?"Banir":n==="promote"?"Promover":"Rebaixar"]}),e.jsxs("div",{className:"modal-search-wrapper",children:[e.jsx("i",{className:"fa-solid fa-magnifying-glass"}),e.jsx("input",{type:"text",className:"modal-search-input",placeholder:"Pesquisar por @usuário",value:w,onChange:s=>W(s.target.value),autoFocus:!0})]}),e.jsx("div",{style:{maxHeight:"200px",overflowY:"auto"},children:U.length>0?U.map(s=>e.jsxs("div",{className:"user-select-item",onClick:()=>F(s.id,s.name),children:[e.jsxs("div",{className:"user-detail",children:[e.jsx("span",{style:{color:"#fff"},children:s.name}),e.jsx("span",{className:"user-handle",children:s.username})]}),e.jsx("span",{style:{fontSize:"12px",color:"#888"},children:s.role})]},s.id)):e.jsx("div",{style:{textAlign:"center",color:"#777",padding:"10px",fontSize:"13px"},children:"Nenhum usuário encontrado."})}),e.jsx("button",{onClick:()=>l(null),style:{width:"100%",padding:"10px",marginTop:"15px",background:"transparent",border:"1px solid #555",color:"#aaa",borderRadius:"8px",cursor:"pointer"},children:"Cancelar"})]})})]})};export{X as LimitAndControl};
