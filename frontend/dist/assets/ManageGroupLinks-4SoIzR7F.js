import{u as L,f as z,r as o,g as u,j as e}from"./index-BC19Iu_T.js";const E=()=>{const m=L(),{id:a}=z(),[C,g]=o.useState(void 0),[r,d]=o.useState(""),[c,p]=o.useState(""),[x,f]=o.useState(""),[h,l]=o.useState([]);o.useEffect(()=>{a&&b()},[a]);const b=()=>{if(!a)return;const i=u.getGroupById(a);i?(g(i),l(i.links||[])):g({id:a,name:"Grupo Exemplo",description:"...",isVip:!1})},j=i=>{if(i.preventDefault(),!r.trim()||!a)return;const n=c?parseInt(c):void 0,t=u.addGroupLink(a,r,n,x);if(t)l(s=>[t,...s]),d(""),p(""),f("");else{const s={id:Date.now().toString(),name:r,code:Math.random().toString(36).substring(2,8).toUpperCase(),joins:0,createdAt:Date.now(),maxUses:n,expiresAt:x};l(N=>[s,...N]),d(""),p(""),f("")}},k=i=>{window.confirm("Deseja excluir este link? O código deixará de funcionar.")&&(a&&u.removeGroupLink(a,i),l(n=>n.filter(t=>t.id!==i)))},w=i=>{const n=`${window.location.origin}/#/groups?join=${i}`;navigator.clipboard.writeText(n),alert("Link copiado para a área de transferência!")},y=i=>i?new Date(i).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}):"Nunca expira",v=()=>{window.history.state&&window.history.state.idx>0?m(-1):m(`/group-chat/${a}`)};return e.jsxs("div",{className:"min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-x-hidden",children:[e.jsx("style",{children:`
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
                padding-top: 85px; padding-bottom: 40px; 
                width: 100%; max-width: 600px; margin: 0 auto; 
                padding-left: 20px; padding-right: 20px; 
            }

            .create-card {
                background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px;
                border: 1px solid rgba(255,255,255,0.1); margin-bottom: 30px;
            }
            
            .form-row { display: flex; flex-direction: column; gap: 15px; }
            
            .input-group { display: flex; flex-direction: column; }
            .input-group label { font-size: 13px; color: #aaa; margin-bottom: 5px; font-weight: 600; }
            .input-group input {
                background: #111; border: 1px solid #333; border-radius: 8px;
                color: #fff; padding: 12px; outline: none; font-size: 14px; width: 100%;
            }
            .input-group input:focus { border-color: #00c2ff; }
            
            .create-btn {
                background: #00c2ff; color: #000; border: none; border-radius: 8px;
                padding: 12px; font-weight: 700; cursor: pointer; font-size: 16px; margin-top: 10px;
                transition: 0.3s;
            }
            .create-btn:hover { background: #0099cc; }

            .links-list { display: flex; flex-direction: column; gap: 15px; }
            .link-item {
                background: rgba(255,255,255,0.02); border-radius: 12px; padding: 15px;
                border: 1px solid rgba(255,255,255,0.05); position: relative;
            }
            .link-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
            .link-name-container { display: flex; flex-direction: column; }
            .link-name { font-weight: 700; color: #fff; font-size: 16px; }
            .link-details { font-size: 12px; color: #888; margin-top: 2px; }
            .link-stats { font-size: 12px; color: #00ff82; background: rgba(0, 255, 130, 0.1); padding: 2px 8px; border-radius: 4px; white-space: nowrap; }
            
            .link-url-box {
                background: #000; padding: 10px; border-radius: 6px; font-family: monospace;
                color: #aaa; font-size: 13px; display: flex; justify-content: space-between; align-items: center;
                border: 1px dashed #333; margin-bottom: 12px;
                overflow: hidden;
            }
            .link-url-box span {
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;
            }
            .actions { display: flex; gap: 10px; }
            .action-btn {
                flex: 1; padding: 8px; border-radius: 6px; border: none; font-size: 13px; font-weight: 600; cursor: pointer;
                display: flex; align-items: center; justify-content: center; gap: 5px;
            }
            .copy-btn { background: rgba(0,194,255,0.1); color: #00c2ff; }
            .delete-btn { background: rgba(255,77,77,0.1); color: #ff4d4d; }

            .empty-state { text-align: center; color: #777; font-size: 14px; padding: 20px; }
        `}),e.jsxs("header",{children:[e.jsx("button",{onClick:v,className:"back-btn",children:e.jsx("i",{className:"fa-solid fa-arrow-left"})}),e.jsx("h1",{children:"Gerenciar Links"})]}),e.jsxs("main",{children:[e.jsx("h2",{style:{fontSize:"14px",color:"#00c2ff",textTransform:"uppercase",marginBottom:"10px",fontWeight:"700"},children:"Criar Novo Link"}),e.jsx("div",{className:"create-card",children:e.jsxs("form",{onSubmit:j,className:"form-row",children:[e.jsxs("div",{className:"input-group",children:[e.jsx("label",{children:"Nome do Link (Identificador)"}),e.jsx("input",{type:"text",placeholder:"Ex: Instagram Bio, Campanha Youtube",value:r,onChange:i=>d(i.target.value),maxLength:30,required:!0})]}),e.jsxs("div",{style:{display:"flex",gap:"10px"},children:[e.jsxs("div",{className:"input-group",style:{flex:1},children:[e.jsx("label",{children:"Limite de Usos"}),e.jsx("input",{type:"number",placeholder:"Ex: 100 (Vazio = ∞)",value:c,onChange:i=>p(i.target.value),min:"1"})]}),e.jsxs("div",{className:"input-group",style:{flex:1},children:[e.jsx("label",{children:"Expiração (Opcional)"}),e.jsx("input",{type:"datetime-local",value:x,onChange:i=>f(i.target.value),style:{colorScheme:"dark"}})]})]}),e.jsxs("button",{type:"submit",className:"create-btn",children:[e.jsx("i",{className:"fa-solid fa-plus"})," Gerar Link"]})]})}),e.jsx("h2",{style:{fontSize:"14px",color:"#00c2ff",textTransform:"uppercase",marginBottom:"10px",fontWeight:"700"},children:"Links Ativos"}),e.jsx("div",{className:"links-list",children:h.length>0?h.map(i=>{const n=i.maxUses?` / ${i.maxUses}`:"",t=i.expiresAt?`Expira: ${y(i.expiresAt)}`:null,s=`${window.location.origin}/#/groups?join=${i.code}`;return e.jsxs("div",{className:"link-item",children:[e.jsxs("div",{className:"link-header",children:[e.jsxs("div",{className:"link-name-container",children:[e.jsx("span",{className:"link-name",children:i.name}),t&&e.jsxs("span",{className:"link-details",children:[e.jsx("i",{className:"fa-regular fa-clock"})," ",t]})]}),e.jsxs("span",{className:"link-stats",children:[e.jsx("i",{className:"fa-solid fa-users"})," ",i.joins,n]})]}),e.jsx("div",{className:"link-url-box",children:e.jsx("span",{children:s})}),e.jsxs("div",{className:"actions",children:[e.jsxs("button",{className:"action-btn copy-btn",onClick:()=>w(i.code),children:[e.jsx("i",{className:"fa-regular fa-copy"})," Copiar"]}),e.jsxs("button",{className:"action-btn delete-btn",onClick:()=>k(i.id),children:[e.jsx("i",{className:"fa-solid fa-trash"})," Excluir"]})]})]},i.id)}):e.jsx("div",{className:"empty-state",children:"Nenhum link criado para este grupo."})})]})]})};export{E as ManageGroupLinks};
