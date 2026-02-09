import{u as f,f as p,r as m,j as e}from"./index-BC19Iu_T.js";import{u as h}from"./useGroupSettings-CvPAF9AB.js";import{S as a}from"./SettingItem-DxC-aysh.js";const k=()=>{const t=f(),{id:s}=p(),{group:i,loading:r,isOwner:n,isAdmin:o,handleLeaveDelete:c,form:d}=h();if(m.useEffect(()=>{!r&&i&&!o&&(console.warn("🔐 [Acesso Negado] Usuário tentou acessar configurações sem permissão."),t(`/group-chat/${s}`,{replace:!0}))},[r,i,o,t,s]),r||!i||!s)return e.jsx("div",{className:"min-h-screen bg-[#0c0f14] flex items-center justify-center text-white",children:e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin text-2xl text-[#00c2ff]"})});const x=()=>{t("/groups")},l=()=>e.jsx("span",{className:"bg-[#00c2ff] text-black text-[9px] font-black px-2 py-0.5 rounded-full ml-3 shadow-[0_0_10px_rgba(0,194,255,0.3)]",children:"NEW"}),g=()=>e.jsxs("div",{className:"flex items-center gap-1.5 bg-[#00ff821a] border border-[#00ff8233] px-2 py-0.5 rounded-lg ml-3",children:[e.jsx("div",{className:"w-1.5 h-1.5 rounded-full bg-[#00ff82] shadow-[0_0_5px_#00ff82]"}),e.jsx("span",{className:"text-[#00ff82] text-[8px] font-black uppercase",children:"Ativo"})]});return e.jsxs("div",{className:"min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden",children:[e.jsx("style",{children:`
                header { 
                    display: flex; 
                    align-items: center; 
                    padding: 0 16px; 
                    background: #0c0f14; 
                    position: fixed; 
                    width: 100%; 
                    top: 0; 
                    z-index: 40; 
                    border-bottom: 1px solid rgba(255,255,255,0.1); 
                    height: 65px; 
                }
                header .back-btn { background: none; border: none; color: #fff; font-size: 24px; cursor: pointer; padding: 0 15px; }
                
                main { 
                    padding-top: 85px; 
                    padding-bottom: 100px; 
                    width: 100%; 
                    max-width: 600px; 
                    margin: 0 auto; 
                    padding-left: 20px; 
                    padding-right: 20px; 
                    overflow-y: auto; 
                    flex-grow: 1; 
                }

                .settings-group { margin-bottom: 25px; }
                .settings-group h2 { 
                    font-size: 13px; 
                    color: #00c2ff; 
                    padding: 10px 0; 
                    margin-bottom: 12px; 
                    text-transform: uppercase; 
                    font-weight: 800; 
                    letter-spacing: 1.5px; 
                }
                
                .setting-item { 
                  display: flex; 
                  align-items: center; 
                  justify-content: space-between; 
                  padding: 16px; 
                  background-color: rgba(255, 255, 255, 0.03); 
                  border: 1px solid rgba(255,255,255,0.05);
                  transition: all 0.2s ease; 
                  color: #fff; 
                  cursor: pointer; 
                  border-radius: 14px; 
                  margin-bottom: 8px; 
                }
                .setting-item:hover { 
                    background-color: rgba(255, 255, 255, 0.06); 
                    border-color: rgba(0, 194, 255, 0.2);
                    transform: translateY(-1px);
                }
                
                .setting-info { display: flex; align-items: center; }
                .setting-info i { font-size: 18px; width: 30px; text-align: center; margin-right: 12px; color: #00c2ff; }
                .setting-item p { font-size: 15px; font-weight: 500; }
                
                .logout-container { margin-top: 20px; }
                .danger-btn { 
                  width: 100%; 
                  padding: 16px; 
                  background: rgba(255, 77, 77, 0.05); 
                  border: 1px solid rgba(255, 77, 77, 0.1); 
                  color: #ff4d4d; 
                  border-radius: 16px; 
                  font-weight: 700; 
                  font-size: 14px; 
                  cursor: pointer; 
                  transition: 0.3s; 
                  display: flex; 
                  align-items: center; 
                  justify-content: center; 
                  gap: 10px; 
                  margin-bottom: 12px;
                }
                .danger-btn:hover { 
                    background: rgba(255, 77, 77, 0.15); 
                    border-color: rgba(255, 77, 77, 0.3);
                    color: #ff3333;
                }
            `}),e.jsxs("header",{children:[e.jsx("button",{onClick:x,className:"back-btn",children:e.jsx("i",{className:"fa-solid fa-arrow-left"})}),e.jsx("h1",{className:"font-bold text-lg text-white",children:"Gestão da Comunidade"})]}),e.jsxs("main",{className:"no-scrollbar",children:[e.jsxs("div",{className:"settings-group",children:[e.jsx("h2",{children:"Estrutura e Identidade"}),e.jsx(a,{icon:"fa-circle-info",label:"Informações Principais",onClick:()=>t(`/group-settings/${s}/info`)}),e.jsx(a,{icon:"fa-chart-simple",label:"Estatísticas de Capacidade",onClick:()=>t(`/group-settings/${s}/stats`)}),e.jsx(a,{icon:"fa-cubes-stacked",label:"Modo Hub (Conteúdo e Chat)",onClick:()=>t(`/group-settings/${s}/sales-platform`),rightElement:e.jsxs("div",{className:"flex items-center",children:[d.isSalesPlatformEnabled&&e.jsx(g,{}),e.jsx("i",{className:"fas fa-chevron-right text-gray-600 text-xs ml-3"})]})})]}),e.jsxs("div",{className:"settings-group",children:[e.jsx("h2",{children:"Segurança e Moderação"}),e.jsx(a,{icon:"fa-id-card-clip",label:"Gestão de Cargos",onClick:()=>t(`/group-settings/${s}/roles`),rightElement:e.jsxs("div",{className:"flex items-center",children:[e.jsx(l,{}),e.jsx("i",{className:"fas fa-chevron-right text-gray-600 text-xs ml-3"})]})}),e.jsx(a,{icon:"fa-key",label:"Acesso e Convites",onClick:()=>t(`/group-settings/${s}/access`)}),e.jsx(a,{icon:"fa-sliders",label:"Regras de Chat",onClick:()=>t(`/group-settings/${s}/moderation`)}),e.jsx(a,{icon:"fa-users",label:"Lista de Membros",onClick:()=>t(`/group-settings/${s}/members`)})]}),e.jsxs("div",{className:"settings-group",children:[e.jsx("h2",{children:"Monetização e Escala"}),e.jsx(a,{icon:"fa-cash-register",label:"Configurações de Checkout",onClick:()=>t(`/group-settings/${s}/checkout-config`),rightElement:e.jsxs("div",{className:"flex items-center",children:[e.jsx(l,{}),e.jsx("i",{className:"fas fa-chevron-right text-gray-600 text-xs ml-3"})]})}),e.jsx(a,{icon:"fa-chart-pie",label:"Faturamento Detalhado",onClick:()=>t(`/group-revenue/${s}`)}),e.jsx(a,{icon:"fa-calendar-check",label:"Mensagens Agendadas",onClick:()=>t(`/group-settings/${s}/schedule`)}),i.isVip&&n&&e.jsx(a,{icon:"fa-crown",label:"Funil de Vendas VIP",onClick:()=>t(`/group-settings/${s}/vip`),rightElement:e.jsxs("div",{className:"flex items-center",children:[e.jsx("i",{className:"fa-solid fa-star text-[#FFD700] text-sm"}),e.jsx("i",{className:"fas fa-chevron-right text-gray-600 text-xs ml-3"})]})})]}),e.jsxs("div",{className:"logout-container",children:[e.jsx("h2",{className:"text-[11px] font-black text-red-500/50 uppercase tracking-[2px] mb-4 pl-1",children:"Zona Crítica"}),e.jsxs("button",{onClick:()=>c("leave"),className:"danger-btn",children:[e.jsx("i",{className:"fa-solid fa-right-from-bracket"})," Sair do Grupo"]}),n&&e.jsxs("button",{onClick:()=>c("delete"),className:"danger-btn",style:{background:"rgba(255, 77, 77, 0.1)",borderColor:"rgba(255, 77, 77, 0.3)"},children:[e.jsx("i",{className:"fa-solid fa-trash-can"})," Excluir Permanentemente"]})]}),e.jsxs("div",{className:"text-center mt-8 opacity-20 text-[9px] uppercase font-black tracking-[3px]",children:["Flux Community Engine • ",s]})]})]})};export{k as GroupSettings};
