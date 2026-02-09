import{u as m,r as u,j as e,R as x}from"./index-BC19Iu_T.js";const a={terms:{title:"Termos de Uso",sections:[{title:"1. Aceitação dos Termos",content:"Ao acessar e usar o Flux, você aceita e concorda em estar vinculado aos termos e disposições deste acordo. Além disso, ao usar os serviços particulares deste aplicativo, você estará sujeito a quaisquer regras ou diretrizes publicadas aplicáveis a tais serviços."},{title:"2. Uso do Serviço",content:"Você concorda em usar o serviço apenas para fins legais e de maneira que não infrinja os direitos de, restrinja ou iniba o uso e o aproveitamento do serviço por qualquer terceiro.",list:["Não é permitido publicar conteúdo ilegal, ofensivo ou pornográfico não autorizado.","O desrespeito a outros usuários pode resultar em banimento temporário ou permanente.","É proibido o uso de bots ou automação não autorizada."]},{title:"3. Grupos e Conteúdo Pago",content:"O Flux oferece a funcionalidade de Grupos VIP e conteúdo pago. A plataforma atua como intermediária tecnológica. Reembolsos devem ser solicitados diretamente ao criador do conteúdo ou através do suporte da plataforma em até 7 dias após a compra, conforme legislação local."},{title:"4. Propriedade Intelectual",content:"Todo o conteúdo incluído no aplicativo, como texto, gráficos, logotipos, ícones de botões, imagens, clipes de áudio, downloads digitais e compilações de dados, é propriedade do Flux ou de seus fornecedores de conteúdo."},{title:"5. Alterações nos Termos",content:"Reservamo-nos o direito de alterar estes termos a qualquer momento. Recomendamos que você revise esta página periodicamente para quaisquer alterações."}]},privacy:{title:"Privacidade",sections:[{title:"1. Coleta de Informações",content:"Coletamos informações quando você se registra em nosso aplicativo, faz login, cria um grupo ou realiza uma compra. As informações coletadas incluem seu nome, e-mail, número de telefone e dados de perfil."},{title:"2. Uso das Informações",content:"Qualquer informação que coletamos de você pode ser usada para:",list:["Personalizar sua experiência e responder às suas necessidades individuais.","Fornecer conteúdo publicitário personalizado.","Melhorar nosso aplicativo e atendimento ao cliente.","Analisar o uso do aplicativo para melhorar nossos serviços, o que inclui o rastreamento de eventos como visualizações de página por sessão de usuário.","Processar transações com segurança.","Administrar concursos, promoções ou pesquisas."]},{title:"3. Proteção de Dados",content:"Implementamos uma variedade de medidas de segurança para manter a segurança de suas informações pessoais. Utilizamos criptografia avançada para proteger informações sensíveis transmitidas online."},{title:"4. Divulgação a Terceiros",content:"Nós não vendemos, trocamos ou transferimos suas informações pessoais identificáveis para terceiros. Isso não inclui terceiros de confiança que nos auxiliam na operação do nosso aplicativo (ex: processadores de pagamento como SyncPay), desde que essas partes concordem em manter essas informações confidenciais."},{title:"5. Exclusão de Dados",content:"Você tem o direito de solicitar a exclusão de seus dados pessoais a qualquer momento através das configurações do aplicativo ou entrando em contato com nosso suporte."}]}},f=()=>{const i=m(),[s,t]=u.useState("terms"),n=()=>{window.history.state&&window.history.state.idx>0?i(-1):i("/settings")},r=d=>d.sections.map((o,c)=>e.jsxs(x.Fragment,{children:[e.jsx("h2",{children:o.title}),e.jsx("p",{children:o.content}),o.list&&e.jsx("ul",{children:o.list.map((l,p)=>e.jsx("li",{children:l},p))})]},c));return e.jsxs("div",{className:"h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden",children:[e.jsx("style",{children:`
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
            padding-top: 85px; padding-bottom: 40px; width: 100%; max-width: 800px; 
            margin: 0 auto; padding-left: 20px; padding-right: 20px;
            overflow-y: auto; flex-grow: 1; -webkit-overflow-scrolling: touch;
        }

        .tabs {
            display: flex; background: rgba(255,255,255,0.05); border-radius: 12px; padding: 4px;
            margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.1);
        }
        .tab-btn {
            flex: 1; padding: 12px; border: none; background: transparent; color: #aaa;
            font-size: 14px; font-weight: 600; cursor: pointer; border-radius: 8px; transition: 0.3s;
        }
        .tab-btn.active {
            background: #00c2ff; color: #000; box-shadow: 0 2px 10px rgba(0,194,255,0.3);
        }

        .content-box {
            background: rgba(255,255,255,0.05); border-radius: 12px; padding: 25px;
            border: 1px solid rgba(255,255,255,0.05); line-height: 1.6; color: rgba(255,255,255,0.8);
            font-size: 15px; text-align: justify;
        }
        
        h2 { color: #00c2ff; font-size: 18px; margin-top: 20px; margin-bottom: 10px; font-weight: 700; }
        h2:first-child { margin-top: 0; }
        p { margin-bottom: 15px; }
        ul { list-style-type: disc; padding-left: 20px; margin-bottom: 15px; }
        li { margin-bottom: 8px; }
      `}),e.jsxs("header",{children:[e.jsx("button",{onClick:n,className:"back-btn",children:e.jsx("i",{className:"fa-solid fa-arrow-left"})}),e.jsx("h1",{children:"Termos e Privacidade"})]}),e.jsxs("main",{children:[e.jsxs("div",{className:"tabs",children:[e.jsx("button",{className:`tab-btn ${s==="terms"?"active":""}`,onClick:()=>t("terms"),children:a.terms.title}),e.jsx("button",{className:`tab-btn ${s==="privacy"?"active":""}`,onClick:()=>t("privacy"),children:a.privacy.title})]}),e.jsx("div",{className:"content-box",children:r(s==="terms"?a.terms:a.privacy)})]})]})};export{f as TermsAndPrivacy};
