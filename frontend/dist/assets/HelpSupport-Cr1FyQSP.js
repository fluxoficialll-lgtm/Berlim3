import{j as e,r as l,u as h}from"./index-BC19Iu_T.js";const v=({question:r,answer:t,isOpen:s,onToggle:d})=>e.jsxs("div",{className:"faq-item",children:[e.jsxs("div",{className:`faq-question ${s?"active":""}`,onClick:d,children:[r,e.jsx("i",{className:"fa-solid fa-chevron-down"})]}),e.jsx("div",{className:`faq-answer ${s?"open":""}`,children:t})]}),j=({onOpenSupport:r})=>e.jsxs("div",{className:"contact-section",children:[e.jsx("div",{className:"contact-title",children:"Ainda precisa de ajuda?"}),e.jsx("div",{className:"contact-desc",children:"Nossa equipe está disponível para te ajudar."}),e.jsxs("button",{className:"contact-btn",onClick:r,children:[e.jsx("i",{className:"fa-solid fa-headset"})," Falar com Suporte"]})]}),w=({isOpen:r,onClose:t})=>{const[s,d]=l.useState(""),[o,c]=l.useState(null),[a,n]=l.useState(!1),p=l.useRef(null);if(!r)return null;const u=i=>{const x=i.target.files?.[0];if(x){const g=URL.createObjectURL(x),b=x.type.startsWith("video/")?"video":"image";c({file:x,preview:g,type:b})}},f=i=>{i.stopPropagation(),c(null),p.current&&(p.current.value="")},m=()=>{if(!s.trim()&&!o){alert("Por favor, descreva seu problema ou anexe um arquivo.");return}n(!0),setTimeout(()=>{alert("Solicitação enviada! Ticket #"+Math.floor(Math.random()*9e3+1e3)),d(""),c(null),t(),n(!1)},800)};return e.jsx("div",{className:"modal-overlay",onClick:()=>!a&&t(),children:e.jsxs("div",{className:"support-modal",onClick:i=>i.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{className:"modal-title",children:[e.jsx("i",{className:"fa-solid fa-comments text-[#00c2ff]"})," Falar com Suporte"]}),e.jsx("button",{className:"close-modal",onClick:()=>!a&&t(),children:e.jsx("i",{className:"fa-solid fa-xmark"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsx("div",{className:"input-label",children:"Mensagem"}),e.jsx("textarea",{className:"support-textarea",placeholder:"Descreva seu problema, dúvida ou sugestão...",value:s,onChange:i=>d(i.target.value),disabled:a}),e.jsxs("div",{className:"upload-box",onClick:()=>!o&&!a&&p.current?.click(),children:[o?e.jsxs("div",{className:"media-preview-container",children:[o.type==="video"?e.jsx("video",{src:o.preview,controls:!0,className:"media-preview"}):e.jsx("img",{src:o.preview,alt:"Print",className:"media-preview"}),e.jsx("button",{className:"remove-media",onClick:f,disabled:a,children:e.jsx("i",{className:"fa-solid fa-trash"})})]}):e.jsxs("div",{className:"upload-placeholder",children:[e.jsx("i",{className:"fa-solid fa-cloud-arrow-up"}),e.jsx("span",{children:"Adicionar Print, Foto ou Vídeo"}),e.jsx("span",{style:{fontSize:"11px",color:"#555"},children:"(Opcional)"})]}),e.jsx("input",{type:"file",ref:p,hidden:!0,accept:"image/*,video/*",onChange:u})]})]}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{className:"send-btn",onClick:m,disabled:a,children:a?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin"})," Enviando..."]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fa-solid fa-paper-plane"})," Enviar Mensagem"]})})})]})})},y=[{question:"Como recupero minha senha?",answer:"Na tela de login, clique em 'Esqueceu a senha?'. Você receberá um código de 6 dígitos no seu e-mail cadastrado para criar uma nova senha."},{question:"Como criar um Grupo VIP?",answer:"Vá até a aba 'Grupos', clique no botão de criar (+) e selecione a opção 'Grupo VIP'. Você precisará conectar sua conta SyncPay para receber pagamentos."},{question:"Como funciona o pagamento?",answer:"Utilizamos o sistema SyncPay para processar pagamentos via PIX de forma segura e instantânea. O acesso ao grupo é liberado automaticamente após a confirmação."},{question:"Como excluir minha conta?",answer:"Para excluir sua conta, vá em Configurações > Conta > Excluir Conta. Atenção: esta ação é irreversível e todos os seus dados serão perdidos."},{question:"Posso mudar meu nome de usuário?",answer:"Sim, vá em Perfil > Editar Perfil. Você pode alterar seu @usuário (se disponível) e seu apelido de exibição."}],N=()=>{const r=h(),[t,s]=l.useState(null),[d,o]=l.useState(!1),c=()=>{window.history.state&&window.history.state.idx>0?r(-1):r("/settings")};return e.jsxs("div",{className:"h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden",children:[e.jsx("style",{children:`
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

        .search-box {
            display: flex; align-items: center; background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 12px 15px;
            margin-bottom: 30px;
        }
        .search-box i { color: #aaa; margin-right: 10px; }
        .search-box input {
            background: transparent; border: none; color: #fff; width: 100%; outline: none; font-size: 16px;
        }

        .section-title { font-size: 14px; color: #00c2ff; margin-bottom: 15px; text-transform: uppercase; font-weight: 700; }

        .faq-item {
            background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
            border-radius: 10px; margin-bottom: 10px; overflow: hidden; transition: 0.3s;
        }
        .faq-question {
            padding: 15px; display: flex; justify-content: space-between; align-items: center;
            cursor: pointer; font-weight: 600; font-size: 15px;
        }
        .faq-question i { color: #00c2ff; transition: transform 0.3s; }
        .faq-question.active i { transform: rotate(180deg); }
        
        .faq-answer {
            padding: 0 15px 15px 15px; color: #aaa; font-size: 14px; line-height: 1.5;
            display: none; animation: fadeIn 0.3s;
        }
        .faq-answer.open { display: block; }
        
        @keyframes fadeIn { from { opacity:0; transform:translateY(-5px); } to { opacity:1; transform:translateY(0); } }

        .contact-section {
            margin-top: 40px; text-align: center; padding: 30px 20px;
            background: rgba(0,194,255,0.05); border-radius: 16px; border: 1px dashed rgba(0,194,255,0.3);
        }
        .contact-title { font-size: 18px; font-weight: 700; margin-bottom: 5px; }
        .contact-desc { font-size: 14px; color: #aaa; margin-bottom: 20px; }
        
        .contact-btn {
            display: inline-flex; align-items: center; gap: 10px;
            padding: 12px 25px; background: #00c2ff; color: #000;
            border-radius: 30px; font-weight: 700; text-decoration: none;
            transition: 0.3s; cursor: pointer; border: none; font-size: 15px;
        }
        .contact-btn:hover { background: #fff; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,194,255,0.4); }

        .modal-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85); z-index: 100;
            display: flex; align-items: center; justify-content: center;
            backdrop-filter: blur(5px); animation: fadeIn 0.3s ease;
        }

        .support-modal {
            background: #1a1e26; width: 90%; max-width: 400px;
            border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 10px 40px rgba(0,0,0,0.6);
            overflow: hidden; display: flex; flex-direction: column;
            animation: slideUp 0.3s ease;
        }

        .modal-header {
            padding: 15px 20px; border-bottom: 1px solid rgba(255,255,255,0.05);
            display: flex; justify-content: space-between; align-items: center;
            background: rgba(255,255,255,0.02);
        }
        .modal-title { font-size: 16px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 8px; }
        .close-modal { background: none; border: none; color: #aaa; font-size: 20px; cursor: pointer; }

        .modal-body { padding: 20px; }

        .input-label { display: block; font-size: 12px; color: #aaa; margin-bottom: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .support-textarea {
            width: 100%; background: #0c0f14; border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px; padding: 12px; color: #fff; font-size: 14px;
            resize: none; outline: none; min-height: 120px; transition: 0.3s;
        }
        .support-textarea:focus { border-color: #00c2ff; background: #000; }

        .upload-box {
            margin-top: 15px; border: 1px dashed rgba(255,255,255,0.2);
            border-radius: 12px; padding: 20px; text-align: center;
            cursor: pointer; transition: 0.2s; position: relative; overflow: hidden;
            background: rgba(255,255,255,0.02);
        }
        .upload-box:hover { border-color: #00c2ff; background: rgba(0,194,255,0.05); }

        .upload-placeholder { color: #666; font-size: 13px; display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .upload-placeholder i { font-size: 24px; color: #00c2ff; }

        .media-preview-container {
            width: 100%; height: 180px; position: relative;
        }
        .media-preview { width: 100%; height: 100%; object-fit: contain; border-radius: 8px; background: #000; }
        .remove-media {
            position: absolute; top: 5px; right: 5px; background: rgba(0,0,0,0.7);
            color: #fff; border: none; width: 28px; height: 28px; border-radius: 50%;
            cursor: pointer; display: flex; align-items: center; justify-content: center;
            transition: 0.2s;
        }
        .remove-media:hover { background: #ff4d4d; }

        .modal-footer {
            padding: 15px 20px; border-top: 1px solid rgba(255,255,255,0.05);
            background: rgba(255,255,255,0.02);
        }
        .send-btn {
            width: 100%; background: #00c2ff; color: #000; padding: 14px;
            border-radius: 12px; font-weight: 700; border: none; cursor: pointer;
            font-size: 15px; transition: 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .send-btn:hover { background: #0099cc; box-shadow: 0 4px 15px rgba(0,194,255,0.3); }
        .send-btn:disabled { opacity: 0.7; cursor: not-allowed; background: #333; color: #777; box-shadow: none; }

        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}),e.jsxs("header",{children:[e.jsx("button",{onClick:c,className:"back-btn",children:e.jsx("i",{className:"fa-solid fa-arrow-left"})}),e.jsx("h1",{children:"Ajuda e Suporte"})]}),e.jsxs("main",{className:"no-scrollbar",children:[e.jsxs("div",{className:"search-box",children:[e.jsx("i",{className:"fa-solid fa-magnifying-glass"}),e.jsx("input",{type:"text",placeholder:"Pesquisar dúvidas..."})]}),e.jsx("div",{className:"section-title",children:"Perguntas Frequentes"}),y.map((a,n)=>e.jsx(v,{question:a.question,answer:a.answer,isOpen:t===n,onToggle:()=>s(t===n?null:n)},n)),e.jsx(j,{onOpenSupport:()=>o(!0)})]}),e.jsx(w,{isOpen:d,onClose:()=>o(!1)})]})};export{N as HelpSupport};
