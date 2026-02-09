import{u as G,a as V,e as U,r as f,c as L,g as _,h as B,j as e,R as Y}from"./index-BC19Iu_T.js";import{g as H}from"./idGenerator-C8OoQYlS.js";import{A as Q,C as q}from"./AdPreview-0jQ92R6c.js";import{a as J,M as W}from"./MarketingPrompts-BDZDZdWa.js";import"./FeedItem-DGLoJJDB.js";import"./UserBadge-CHMRiDZl.js";import"./UserAvatar-BWaKHm2D.js";import"./postService-XFLx8Vj8.js";import"./ProductCard-CO49MvpN.js";const K=()=>{const a=G(),s=V(),{showAlert:r}=U(),t=f.useRef(null),[o,c]=f.useState("campaign"),[p,h]=f.useState([]),[u,k]=f.useState(null),[w,D]=f.useState(!1),[C,v]=f.useState("feed"),[I,A]=f.useState("url"),[F,y]=f.useState(""),[N,T]=f.useState({name:"",scheduleType:"continuous",budget:10,trafficObjective:"visits",pricingModel:"budget",creative:{text:"",mediaType:"image"},placementCreatives:{feed:{},reels:{},marketplace:{}},campaignObjective:"traffic",destinationType:"url",optimizationGoal:"views",placements:["feed","reels","marketplace"],ctaButton:"saiba mais",placementCtas:{feed:"saiba mais",reels:"saiba mais",marketplace:"comprar"},targeting:{ageMin:18,ageMax:65,gender:"all",interests:[],locations:[],location:"",radius:50},targetUrl:"",targetGroupId:""});f.useEffect(()=>{const x=s.state;if(x?.boostedContent){const b=x.boostedContent;k(b);const E=b.type==="video"?"video":"image",$=b.video||b.image,O=b.type==="video"?["reels"]:["feed"];v(b.type==="video"?"reels":"feed"),T(R=>({...R,name:`Turbinar: ${b.text.substring(0,20)}...`,placements:O,creative:{text:b.text,mediaUrl:$,mediaType:E},placementCreatives:{feed:b.type!=="video"?{mediaUrl:$,mediaType:"image"}:{},reels:b.type==="video"?{mediaUrl:$,mediaType:"video"}:{},marketplace:{}}}))}const j=L.getCurrentUserEmail();j&&h(_.getGroupsSync().filter(b=>b.creatorEmail===j))},[s.state]);const l=f.useCallback(x=>u?x==="marketplace"?!0:u.type==="video"?x==="feed":x==="reels":!1,[u]),n=(x,j)=>{T(b=>({...b,[x]:j}))};return{campaign:N,currentStep:o,myGroups:p,selectedContent:u,isLoading:w,previewTab:C,setPreviewTab:v,destinationMode:I,setDestinationMode:A,interestInput:F,setInterestInput:y,fileInputRef:t,isPlacementLocked:l,handleInputChange:n,handlePlacementToggle:x=>{if(l(x))return;const j=N.placements||[];j.includes(x)?j.length>1&&n("placements",j.filter(b=>b!==x)):n("placements",[...j,x])},handleInterestAdd:()=>{if(!F.trim())return;const x=N.targeting?.interests||[];if(!x.includes(F.trim())){const j=[...x,F.trim()];n("targeting",{...N.targeting,interests:j})}y("")},handleInterestRemove:x=>{const b=(N.targeting?.interests||[]).filter(E=>E!==x);n("targeting",{...N.targeting,interests:b})},handleFileChange:x=>{const j=x.target.files?.[0];if(j){const b=new FileReader;b.onload=E=>{const $=E.target?.result,O=j.type.startsWith("video/")?"video":"image";T(R=>({...R,creative:{...R.creative,mediaUrl:$,mediaType:O}}))},b.readAsDataURL(j)}},nextStep:()=>{if(o==="campaign"&&!N.name){r("Aviso","Dê um nome para a campanha.");return}if(o==="adset"&&(!N.targeting?.locations||N.targeting.locations.length===0)){r("Aviso","Selecione uma área de alcance.");return}o==="campaign"?c("adset"):o==="adset"&&c("ad")},prevStep:()=>{o==="campaign"?a("/ad-type-selector"):c(o==="adset"?"campaign":"adset")},submitCampaign:async()=>{D(!0);const x=L.getCurrentUser();if(x){const j={...N,id:H(),status:"pending",ownerId:x.id,ownerEmail:x.email};await B.createCampaign(j),a("/my-store")}else D(!1),r("Erro","Você precisa estar logado.")}}},X=({currentStep:a,onBack:s})=>e.jsxs("header",{className:"flex items-center px-6 bg-[#0c0f14] fixed w-full top-0 z-50 border-b border-white/10 h-[70px]",children:[e.jsx("style",{children:`
                .back-btn-flow { background:none; border:none; color:#fff; font-size:20px; cursor:pointer; }
                .stepper-container { display: flex; align-items: center; gap: 10px; margin-left: 20px; flex: 1; }
                .step-pill { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 800; text-transform: uppercase; color: #555; transition: 0.3s; cursor: default; }
                .step-pill.active { color: #00c2ff; }
                .step-pill.completed { color: #fff; }
                .step-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
                .step-line { flex: 1; height: 1px; background: rgba(255,255,255,0.05); max-width: 40px; }
            `}),e.jsx("button",{onClick:s,className:"back-btn-flow",children:e.jsx("i",{className:"fa-solid fa-xmark"})}),e.jsxs("div",{className:"stepper-container",children:[e.jsxs("div",{className:`step-pill ${a==="campaign"?"active":"completed"}`,children:[e.jsx("div",{className:"step-dot"})," CAMPANHA"]}),e.jsx("div",{className:"step-line"}),e.jsxs("div",{className:`step-pill ${a==="adset"?"active":a==="ad"?"completed":""}`,children:[e.jsx("div",{className:"step-dot"})," CONJUNTO"]}),e.jsx("div",{className:"step-line"}),e.jsxs("div",{className:`step-pill ${a==="ad"?"active":""}`,children:[e.jsx("div",{className:"step-dot"})," ANÚNCIO"]})]})]}),Z=({currentStep:a,isLoading:s,onPrev:r,onNext:t,onSubmit:o})=>e.jsxs("div",{className:"fixed bottom-0 left-0 w-full padding-6 bg-[#0c0f14]/90 backdrop-blur-xl border-t border-white/10 flex justify-between z-[60] p-6",children:[e.jsx("style",{children:`
                .btn-nav { padding: 14px 28px; border-radius: 12px; font-weight: 900; font-size: 13px; text-transform: uppercase; cursor: pointer; transition: 0.2s; border: none; letter-spacing: 1px; }
                .btn-prev { background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1); }
                .btn-next { background: #00c2ff; color: #000; box-shadow: 0 4px 20px rgba(0,194,255,0.3); }
                .btn-next:disabled { background: #333; color: #777; box-shadow: none; cursor: not-allowed; }
            `}),e.jsx("button",{className:"btn-nav btn-prev",onClick:r,children:a==="campaign"?"Sair":"Anterior"}),e.jsx("button",{className:"btn-nav btn-next",onClick:a==="ad"?o:t,disabled:s,children:s?e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin"}):a==="ad"?"Publicar Anúncio":"Continuar"})]}),ee=({name:a,onNameChange:s})=>e.jsxs("div",{className:"form-card",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("i",{className:"fa-solid fa-bullhorn"})," Detalhes Macro"]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"input-group",children:[e.jsx("label",{children:"Nome da Campanha"}),e.jsx("input",{type:"text",className:"meta-field",placeholder:"Ex: Campanha de Vendas Outono/Inverno",value:a,onChange:r=>s(r.target.value)})]})})]}),ae=[{id:"awareness",label:"Reconhecimento",icon:"fa-bullhorn",description:"Alcance o maior número de pessoas."},{id:"traffic",label:"Tráfego",icon:"fa-arrow-up-right-dots",description:"Envie pessoas para um destino."},{id:"engagement",label:"Engajamento",icon:"fa-comments",description:"Obtenha mais mensagens e curtidas."},{id:"leads",label:"Leads",icon:"fa-user-plus",description:"Encontre pessoas interessadas em você."},{id:"app_promotion",label:"Promoção do app",icon:"fa-download",description:"Faça com que as pessoas instalem seu app."},{id:"sales",label:"Vendas",icon:"fa-cart-shopping",description:"Encontre pessoas com intenção de compra."}],te=({campaign:a,onInputChange:s})=>e.jsxs("div",{className:"form-card animate-fade-in",children:[e.jsx("style",{children:`
                .objective-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 10px;
                }
                .objective-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 15px;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 16px;
                    cursor: pointer;
                    transition: 0.2s;
                }
                .objective-item:hover {
                    background: rgba(0,194,255,0.05);
                    border-color: rgba(0,194,255,0.2);
                }
                .objective-item.active {
                    background: rgba(0,194,255,0.1);
                    border-color: #00c2ff;
                }
                .obj-icon-circle {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.05);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    color: #aaa;
                    flex-shrink: 0;
                }
                .objective-item.active .obj-icon-circle {
                    background: #00c2ff;
                    color: #000;
                }
                .obj-text-info {
                    display: flex;
                    flex-direction: column;
                    text-align: left;
                }
                .obj-label {
                    font-size: 14px;
                    font-weight: 700;
                    color: #fff;
                }
                .obj-desc {
                    font-size: 11px;
                    color: #666;
                }
                .objective-item.active .obj-desc {
                    color: #888;
                }
            `}),e.jsxs("div",{className:"card-header",children:[e.jsx("i",{className:"fa-solid fa-crosshairs"})," Objetivo da Campanha"]}),e.jsxs("div",{className:"card-body",children:[e.jsx("p",{className:"text-[11px] text-gray-500 mb-4 font-bold uppercase tracking-widest pl-1",children:"Escolha um objetivo"}),e.jsx("div",{className:"objective-grid",children:ae.map(r=>e.jsxs("div",{className:`objective-item ${a.campaignObjective===r.id?"active":""}`,onClick:()=>s("campaignObjective",r.id),children:[e.jsx("div",{className:"obj-icon-circle",children:e.jsx("i",{className:`fa-solid ${r.icon}`})}),e.jsxs("div",{className:"obj-text-info",children:[e.jsx("span",{className:"obj-label",children:r.label}),e.jsx("span",{className:"obj-desc",children:r.description})]}),a.campaignObjective===r.id&&e.jsx("i",{className:"fa-solid fa-circle-check text-[#00c2ff] ml-auto"})]},r.id))})]})]}),se=({campaign:a,onInputChange:s})=>e.jsxs("div",{className:"animate-fade-in space-y-5",children:[e.jsx(ee,{name:a.name||"",onNameChange:r=>s("name",r)}),e.jsx(te,{campaign:a,onInputChange:s})]}),re=({campaign:a,onInputChange:s})=>e.jsxs("div",{className:"form-card",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("i",{className:"fa-solid fa-wallet"})," Orçamento e Modelo de Cobrança"]}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"type-selector",children:[e.jsxs("div",{className:`type-btn ${a.pricingModel==="budget"?"active":""}`,onClick:()=>s("pricingModel","budget"),children:[e.jsx("i",{className:"fa-solid fa-calendar-day"}),e.jsx("span",{children:"Orçamento Diário"})]}),e.jsxs("div",{className:`type-btn ${a.pricingModel==="commission"?"active":""}`,onClick:()=>s("pricingModel","commission"),children:[e.jsx("i",{className:"fa-solid fa-calendar-check"}),e.jsx("span",{children:"Orçamento Total"})]})]}),e.jsxs("div",{className:"input-group highlight-box animate-fade-in",children:[e.jsx("label",{children:a.pricingModel==="budget"?"Investimento Diário (R$)":"Investimento Total (R$)"}),e.jsx("input",{type:"number",className:"meta-field",placeholder:"0,00",value:a.budget,onChange:r=>s("budget",r.target.value)}),e.jsx("p",{className:"text-[10px] text-gray-500 mt-3 font-bold uppercase tracking-widest",children:a.pricingModel==="budget"?"• Cobrança recorrente a cada 24h":"• O valor será distribuído durante toda a campanha"})]})]})]}),ie={async getSmartSuggestions(a){try{return await J.run(W.suggestInterests(a.title,a.text),{task:"marketing_suggestion",tier:"flash",jsonMode:!0})}catch{return console.warn("[aiInterestEngine] AI suggestion unavailable, failing over to empty list."),[]}}},oe={estimate(a){const s=Number(a.budget||10),r=a.targeting;let t=s*100;if(!r)return{min:t,max:t*2.5,status:"broad"};let o=1;const c=r.ageMax-r.ageMin;if(o*=c/30,r.locations&&r.locations.length>0){const k=r.locations.reduce((w,D)=>w+D.radius,0)/r.locations.length;o*=k/50}else o*=5;const p=r.interests?.length||0;p>0&&(o*=Math.max(.2,1-p*.05));const h=t*o;let u="ideal";return o<.4?u="narrow":o>3&&(u="broad"),{min:Math.round(h*.7),max:Math.round(h*1.3),status:u}}},ne={async search(a){if(a.length<3)return[];try{return(await(await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(a)}&addressdetails=1&limit=5&accept-language=pt-BR`)).json()).map(t=>({name:t.address.city||t.address.town||t.address.village||t.display_name.split(",")[0],lat:parseFloat(t.lat),lon:parseFloat(t.lon),state:t.address.state,country:t.address.country}))}catch(s){return console.error("[GeoSearch] Failed:",s),[]}}},le=({campaign:a,interestInput:s,setInterestInput:r,onTargetingChange:t,addInterest:o,removeInterest:c})=>{const[p,h]=f.useState(!1),[u,k]=f.useState(""),[w,D]=f.useState([]),[C,v]=f.useState(!1),[I,A]=f.useState(!1),F=f.useRef(null),y=f.useMemo(()=>oe.estimate(a),[a]);f.useEffect(()=>{const l=setTimeout(async()=>{if(u.length>=3){v(!0);const n=await ne.search(u);D(n),A(!0),v(!1)}},500);return()=>clearTimeout(l)},[u]);const N=l=>{const n=a.targeting?.locations||[],m={id:`loc_${Date.now()}`,name:`${l.name}, ${l.state||l.country}`,radius:40,lat:l.lat,lon:l.lon};t("locations",[...n,m]),k(""),A(!1)},T=async()=>{h(!0);const l=await ie.getSmartSuggestions({title:a.name||"",text:a.creative?.text||""});if(l.length>0){const n=a.targeting?.interests||[];t("interests",Array.from(new Set([...n,...l])))}h(!1)};return e.jsxs("div",{className:"form-card",children:[e.jsx("style",{children:`
                .meter-container { margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.03); }
                .meter-bar { height: 4px; width: 100%; background: rgba(255,255,255,0.05); border-radius: 2px; position: relative; margin: 10px 0; }
                .meter-pointer { position: absolute; top: -4px; width: 2px; height: 12px; background: #fff; transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 0 10px #fff; }
                .magic-btn { background: rgba(0, 194, 255, 0.1); color: #00c2ff; border: 1px solid rgba(0, 194, 255, 0.3); padding: 0 15px; border-radius: 12px; font-weight: 800; cursor: pointer; transition: 0.3s; }
                .magic-btn:hover { background: #00c2ff; color: #000; }
                .loc-dropdown { position: absolute; top: 100%; left: 0; width: 100%; background: #1a1e26; border: 1px solid #333; border-radius: 12px; z-index: 50; overflow: hidden; margin-top: 5px; }
                .loc-item { padding: 12px 15px; cursor: pointer; border-bottom: 1px solid #222; font-size: 13px; color: #ccc; }
                .loc-item:hover { background: #222; color: #fff; }
            `}),e.jsxs("div",{className:"card-header",children:[e.jsx("i",{className:"fa-solid fa-users-viewfinder"})," Público e Segmentação"]}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"input-group mb-6 relative",ref:F,children:[e.jsx("label",{children:"Cidades ou Estados"}),e.jsx("div",{className:"flex gap-2 mb-2",children:e.jsxs("div",{className:"relative flex-1",children:[e.jsx("input",{type:"text",className:"meta-field w-full",placeholder:"Ex: São Paulo, Rio de Janeiro...",value:u,onChange:l=>k(l.target.value)}),C&&e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin absolute right-4 top-4 text-[#00c2ff]"})]})}),I&&w.length>0&&e.jsx("div",{className:"loc-dropdown shadow-2xl",children:w.map((l,n)=>e.jsxs("div",{className:"loc-item",onClick:()=>N(l),children:[e.jsx("i",{className:"fa-solid fa-location-dot mr-2 opacity-40"}),l.name,", ",l.state]},n))}),e.jsx("div",{className:"flex flex-wrap gap-2",children:a.targeting?.locations?.map(l=>e.jsxs("div",{className:"interest-tag !bg-blue-500/10 !border-blue-500/20 !text-blue-400",children:[l.name,e.jsx("i",{className:"fa-solid fa-xmark",onClick:()=>{const n=a.targeting?.locations?.filter(m=>m.id!==l.id);t("locations",n)}})]},l.id))})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 mb-6",children:[e.jsxs("div",{className:"input-group",children:[e.jsx("label",{children:"Idade Mínima"}),e.jsx("input",{type:"number",className:"meta-field",value:a.targeting?.ageMin,onChange:l=>t("ageMin",parseInt(l.target.value))})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{children:"Idade Máxima"}),e.jsx("input",{type:"number",className:"meta-field",value:a.targeting?.ageMax,onChange:l=>t("ageMax",parseInt(l.target.value))})]})]}),e.jsxs("div",{className:"input-group mb-6",children:[e.jsx("label",{children:"Gênero"}),e.jsxs("div",{className:"gender-selector",children:[e.jsx("button",{className:`gender-btn ${a.targeting?.gender==="all"?"active":""}`,onClick:()=>t("gender","all"),children:"Todos"}),e.jsx("button",{className:`gender-btn ${a.targeting?.gender==="male"?"active":""}`,onClick:()=>t("gender","male"),children:"Homens"}),e.jsx("button",{className:`gender-btn ${a.targeting?.gender==="female"?"active":""}`,onClick:()=>t("gender","female"),children:"Mulheres"})]})]}),e.jsxs("div",{className:"input-group",children:[e.jsxs("div",{className:"flex justify-between items-center mb-2",children:[e.jsx("label",{className:"mb-0",children:"Interesses Sugeridos"}),e.jsxs("button",{type:"button",className:"magic-btn text-[9px] uppercase tracking-widest py-1",onClick:T,disabled:p,children:[p?e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin mr-1"}):e.jsx("i",{className:"fa-solid fa-wand-magic-sparkles mr-1"}),"Sugerir Interesses"]})]}),e.jsxs("div",{className:"flex gap-2 mb-3",children:[e.jsx("input",{type:"text",className:"meta-field",placeholder:"Adicionar interesse manual...",value:s,onChange:l=>r(l.target.value),onKeyPress:l=>l.key==="Enter"&&o()}),e.jsx("button",{onClick:o,className:"bg-[#00c2ff] text-black w-12 rounded-xl font-bold",children:"+"})]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:a.targeting?.interests.map(l=>e.jsxs("div",{className:"interest-tag",children:[l,e.jsx("i",{className:"fa-solid fa-xmark",onClick:()=>c(l)})]},l))})]}),e.jsxs("div",{className:"meter-container",children:[e.jsxs("div",{className:"flex justify-between items-end",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"text-[9px] font-black text-gray-600 uppercase tracking-widest",children:"Alcance Estimado"}),e.jsxs("span",{className:"text-sm font-black text-white",children:[y.min.toLocaleString()," - ",y.max.toLocaleString()," ",e.jsx("span",{className:"text-gray-500 font-medium",children:"pessoas/dia"})]})]}),e.jsx("span",{className:"text-[10px] font-black uppercase",style:{color:y.status==="narrow"?"#ffaa00":y.status==="broad"?"#00c2ff":"#00ff82"},children:y.status==="narrow"?"Muito Específico":y.status==="broad"?"Muito Amplo":"Ideal"})]}),e.jsxs("div",{className:"meter-bar",children:[e.jsx("div",{className:"h-full rounded-full opacity-30",style:{background:"linear-gradient(90deg, #ffaa00 0%, #00ff82 50%, #00c2ff 100%)",width:"100%"}}),e.jsx("div",{className:"meter-pointer",style:{left:y.status==="narrow"?"15%":y.status==="ideal"?"50%":"85%"}})]})]})]})]})},ce=({campaign:a,myGroups:s,onTargetingChange:r})=>{const t=s.filter(o=>o.isVip);return e.jsxs("div",{className:"form-card",children:[e.jsx("style",{children:`
                .lookalike-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 14px;
                    margin-bottom: 8px;
                    cursor: pointer;
                    transition: 0.2s;
                }
                .lookalike-item.selected {
                    background: rgba(255, 215, 0, 0.05);
                    border-color: #FFD700;
                }
                .lookalike-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    background: #1a1e26;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #FFD700;
                    font-size: 16px;
                }
            `}),e.jsxs("div",{className:"card-header",children:[e.jsx("i",{className:"fa-solid fa-users-rays"})," Públicos Semelhantes (Lookalike)"]}),e.jsxs("div",{className:"card-body",children:[e.jsx("p",{className:"text-[10px] text-gray-500 mb-4 font-bold uppercase tracking-widest leading-relaxed",children:"A IA encontrará pessoas com o mesmo comportamento de compra dos membros do seu grupo selecionado."}),t.length>0?e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:`lookalike-item ${a.targeting?.lookalikeGroupId?"":"selected"}`,onClick:()=>r("lookalikeGroupId",void 0),children:[e.jsx("div",{className:"lookalike-icon",style:{color:"#aaa"},children:e.jsx("i",{className:"fa-solid fa-globe"})}),e.jsx("div",{className:"flex-1",children:e.jsx("span",{className:"text-xs font-bold text-white",children:"Nenhum (Público Amplo)"})}),!a.targeting?.lookalikeGroupId&&e.jsx("i",{className:"fa-solid fa-circle-check text-[#FFD700]"})]}),t.map(o=>e.jsxs("div",{className:`lookalike-item ${a.targeting?.lookalikeGroupId===o.id?"selected":""}`,onClick:()=>r("lookalikeGroupId",o.id),children:[e.jsx("div",{className:"lookalike-icon",children:e.jsx("i",{className:"fa-solid fa-crown"})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("span",{className:"text-xs font-bold text-white block truncate",children:o.name}),e.jsxs("span",{className:"text-[9px] text-gray-500 uppercase font-black",children:[o.memberIds?.length||0," Modelos de Perfil"]})]}),a.targeting?.lookalikeGroupId===o.id&&e.jsx("i",{className:"fa-solid fa-circle-check text-[#FFD700]"})]},o.id))]}):e.jsxs("div",{className:"bg-white/5 border border-dashed border-white/10 p-5 rounded-2xl text-center",children:[e.jsx("i",{className:"fa-solid fa-lock text-gray-700 text-2xl mb-2"}),e.jsx("p",{className:"text-[10px] text-gray-500 uppercase font-bold",children:"Você ainda não possui grupos VIP para usar como base."})]})]})]})},z=({label:a,value:s,icon:r,onClick:t,disabled:o,color:c="#00c2ff"})=>e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("label",{className:"text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1",children:a}),e.jsxs("div",{onClick:o?void 0:t,className:`flex items-center justify-between p-4 bg-[#0c0f14] border rounded-2xl transition-all group ${o?"opacity-40 cursor-not-allowed":"cursor-pointer hover:border-white/20 active:scale-[0.98]"}`,style:{borderColor:o?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.1)"},children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("i",{className:`${r}`,style:{color:o?"#555":c}}),e.jsx("span",{className:"font-bold text-sm text-gray-200",children:s||"Escolher..."})]}),e.jsx("i",{className:"fa-solid fa-chevron-down text-[10px] text-gray-600 transition-transform group-hover:translate-y-0.5"})]})]}),de=({isOpen:a,onClose:s,pricingModel:r,currentType:t,onSave:o,initialConfig:c})=>{const[p,h]=f.useState(t),[u,k]=f.useState(c.startDate?new Date(c.startDate).toISOString().split("T")[0]:""),[w,D]=f.useState(c.endDate?new Date(c.endDate).toISOString().split("T")[0]:""),[C,v]=f.useState(c.periodConfig?.days||[1,2,3,4,5]),[I,A]=f.useState(()=>{if(c.periodConfig?.hours){const i=[];return c.periodConfig.hours.forEach(d=>{const[S,P]=d.start.split(":").map(Number),[M,x]=d.end.split(":").map(Number),j=S*2+(P===30?1:0),b=M*2+(x===30?1:0);for(let E=j;E<b;E++)i.push(E)}),i.length>0?i:[18,19,20,21,22,23,36,37,38,39,40,41]}return[18,19,20,21,22,23,36,37,38,39,40,41]});if(f.useEffect(()=>{r==="budget"&&p==="period"&&h("continuous")},[r,p]),!a)return null;const F=i=>{const d=Math.floor(i/2),S=i%2*30;return`${String(d).padStart(2,"0")}:${String(S).padStart(2,"0")}`},y=i=>{if(i.length===0)return[];const d=[...i].sort((M,x)=>M-x),S=[];let P=d[0];for(let M=0;M<d.length;M++)d[M+1]!==d[M]+1&&(S.push({start:F(P),end:F(d[M]+1)}),P=d[M+1]);return S},N=()=>{const i={type:p};if(p==="date"){if(!u||!w){alert("Por favor, selecione as datas de início e fim.");return}i.startDate=new Date(u).getTime(),i.endDate=new Date(w).getTime()}else if(p==="period"){if(C.length===0){alert("Selecione ao menos um dia da semana.");return}if(I.length===0){alert("Selecione ao menos um slot de veiculação.");return}i.periodConfig={days:C,hours:y(I)}}o(i),s()},T=i=>{v(d=>d.includes(i)?d.filter(S=>S!==i):[...d,i])},l=i=>{A(d=>d.includes(i)?d.filter(S=>S!==i):[...d,i])},n=[{id:1,label:"S"},{id:2,label:"T"},{id:3,label:"Q"},{id:4,label:"Q"},{id:5,label:"S"},{id:6,label:"S"},{id:0,label:"D"}],m=Array.from({length:48},(i,d)=>d),g=r==="budget";return e.jsxs("div",{className:"fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in",onClick:s,children:[e.jsx("style",{children:`
                .duration-modal {
                    width: 100%;
                    max-width: 460px;
                    background: #161a21;
                    border: 1px solid rgba(0, 194, 255, 0.2);
                    border-radius: 32px;
                    padding: 28px;
                    box-shadow: 0 25px 60px rgba(0,0,0,0.8);
                    animation: popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    max-height: 95vh;
                    overflow-y: auto;
                }
                .mode-selector {
                    display: flex;
                    gap: 6px;
                    background: #090b0e;
                    padding: 6px;
                    border-radius: 18px;
                    margin-bottom: 24px;
                }
                .mode-btn {
                    flex: 1;
                    padding: 12px;
                    border: none;
                    background: transparent;
                    color: #555;
                    font-size: 10px;
                    font-weight: 800;
                    text-transform: uppercase;
                    border-radius: 14px;
                    cursor: pointer;
                    transition: 0.3s;
                    letter-spacing: 1px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                }
                .mode-btn.active {
                    background: #00c2ff;
                    color: #000;
                    box-shadow: 0 4px 12px rgba(0, 194, 255, 0.3);
                }
                .mode-btn.disabled {
                    opacity: 0.2;
                    cursor: not-allowed;
                }
                .day-chip {
                    width: 44px;
                    height: 44px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    color: #666;
                    font-weight: 800;
                    cursor: pointer;
                    transition: 0.2s;
                }
                .day-chip.selected {
                    background: #00c2ff15;
                    border-color: #00c2ff;
                    color: #00c2ff;
                }
                .slots-grid {
                    display: grid;
                    grid-template-columns: repeat(6, 1fr);
                    gap: 6px;
                    margin-top: 12px;
                }
                .slot-btn {
                    padding: 8px 0;
                    border-radius: 10px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    color: #444;
                    font-size: 10px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: 0.2s;
                }
                .slot-btn.selected {
                    background: #00c2ff;
                    color: #000;
                    border-color: #00c2ff;
                    box-shadow: 0 0 8px rgba(0, 194, 255, 0.2);
                }
                .hour-marker {
                    grid-column: span 6;
                    font-size: 9px;
                    color: #444;
                    margin-top: 10px;
                    border-bottom: 1px solid rgba(255,255,255,0.03);
                    padding-bottom: 4px;
                    font-weight: 800;
                    text-transform: uppercase;
                }
                .custom-input {
                    background: #0c0f14;
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #fff;
                    padding: 14px;
                    border-radius: 14px;
                    outline: none;
                    width: 100%;
                    font-size: 14px;
                }
                .custom-input:focus { border-color: #00c2ff; }
                
                @keyframes popIn {
                    from { transform: scale(0.95) translateY(10px); opacity: 0; }
                    to { transform: scale(1) translateY(0); opacity: 1; }
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                
                .lock-notice {
                    background: rgba(255, 215, 0, 0.05);
                    border: 1px solid rgba(255, 215, 0, 0.2);
                    padding: 12px;
                    border-radius: 16px;
                    margin-bottom: 20px;
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }
            `}),e.jsxs("div",{className:"duration-modal no-scrollbar",onClick:i=>i.stopPropagation(),children:[e.jsx("h3",{className:"text-xl font-black text-center mb-6 uppercase tracking-[3px] text-[#00c2ff]",children:"Programação de Pico"}),g&&e.jsxs("div",{className:"lock-notice animate-fade-in",children:[e.jsx("i",{className:"fa-solid fa-lock text-[#FFD700]"}),e.jsxs("p",{className:"text-[10px] text-gray-400 font-bold uppercase leading-relaxed",children:["A ",e.jsx("span",{className:"text-[#FFD700]",children:"Programação por Slots"})," está disponível apenas no modelo de ",e.jsx("span",{className:"text-[#FFD700]",children:"Orçamento Total / Comissão"}),"."]})]}),e.jsxs("div",{className:"mode-selector",children:[e.jsx("button",{className:`mode-btn ${p==="continuous"?"active":""}`,onClick:()=>h("continuous"),children:"Contínua"}),e.jsx("button",{className:`mode-btn ${p==="date"?"active":""}`,onClick:()=>h("date"),children:"Calendário"}),e.jsxs("button",{className:`mode-btn ${p==="period"?"active":""} ${g?"disabled":""}`,onClick:()=>!g&&h("period"),children:[g&&e.jsx("i",{className:"fa-solid fa-lock text-[9px]"}),"Slots"]})]}),e.jsxs("div",{className:"config-section min-h-[350px]",children:[p==="continuous"&&e.jsxs("div",{className:"flex flex-col items-center justify-center h-full text-center py-16 animate-fade-in",children:[e.jsx("div",{className:"w-20 h-20 bg-[#00c2ff]/10 rounded-full flex items-center justify-center text-[#00c2ff] text-3xl mb-6 border border-[#00c2ff]/20",children:e.jsx("i",{className:"fa-solid fa-infinity"})}),e.jsx("h4",{className:"text-white text-lg font-bold mb-2",children:"Entrega Fluida"}),e.jsx("p",{className:"text-gray-500 text-xs leading-relaxed px-10",children:"Os anúncios serão exibidos sem interrupções diárias enquanto houver orçamento."})]}),p==="date"&&e.jsxs("div",{className:"space-y-6 animate-fade-in py-4",children:[e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("label",{className:"text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1",children:"Data Inicial"}),e.jsx("input",{type:"date",className:"custom-input",value:u,onChange:i=>k(i.target.value),style:{colorScheme:"dark"}})]}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("label",{className:"text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1",children:"Data Final"}),e.jsx("input",{type:"date",className:"custom-input",value:w,onChange:i=>D(i.target.value),style:{colorScheme:"dark"}})]})]}),p==="period"&&!g&&e.jsxs("div",{className:"space-y-6 animate-fade-in py-2",children:[e.jsxs("div",{children:[e.jsx("label",{className:"text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-4 pl-1",children:"Dias de Atividade"}),e.jsx("div",{className:"flex justify-between",children:n.map(i=>e.jsx("div",{className:`day-chip ${C.includes(i.id)?"selected":""}`,onClick:()=>T(i.id),children:i.label},i.id))})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"flex justify-between items-center mb-4 pl-1",children:[e.jsx("label",{className:"text-[10px] font-black text-gray-500 uppercase tracking-widest",children:"Gráfico de Picos (30 em 30 min)"}),e.jsxs("span",{className:"text-[9px] font-bold text-[#00c2ff] bg-[#00c2ff]/10 px-2 py-0.5 rounded-full",children:[(I.length*.5).toFixed(1),"h Totais"]})]}),e.jsx("div",{className:"slots-grid h-[240px] overflow-y-auto pr-2 no-scrollbar",children:m.map(i=>{const d=i%2===0;return e.jsxs(Y.Fragment,{children:[d&&e.jsxs("div",{className:"hour-marker",children:["Das ",Math.floor(i/2),":00 às ",Math.floor(i/2)+1,":00"]}),e.jsx("button",{className:`slot-btn ${I.includes(i)?"selected":""}`,onClick:()=>l(i),children:F(i).split(":")[1]==="00"?":00":":30"})]},i)})})]})]})]}),e.jsxs("div",{className:"flex gap-4 mt-8 pt-4 border-t border-white/5",children:[e.jsx("button",{onClick:s,className:"flex-1 py-4 text-gray-500 font-bold uppercase text-xs hover:text-white transition-colors",children:"Voltar"}),e.jsx("button",{onClick:N,className:"flex-[1.5] py-4 bg-[#00c2ff] text-black font-black rounded-2xl uppercase text-sm shadow-[0_8px_20px_rgba(0,194,255,0.2)] active:scale-95 transition-all",children:"Confirmar"})]})]})]})},pe=({campaign:a,onInputChange:s})=>{const[r,t]=f.useState(!1),o=()=>a.scheduleType==="continuous"?"Contínua":a.scheduleType==="date"?"Data Definida":a.scheduleType==="period"?"Por Período":"Escolher";return e.jsxs("div",{className:"form-card",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("i",{className:"fa-solid fa-clock"})," Duração"]}),e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"w-full",children:e.jsx(z,{label:"Período de Veiculação",value:o(),icon:"fa-solid fa-calendar-days",onClick:()=>t(!0)})})}),e.jsx(de,{isOpen:r,onClose:()=>t(!1),pricingModel:a.pricingModel||"budget",currentType:a.scheduleType||"continuous",onSave:c=>{s("scheduleType",c.type),c.startDate&&s("startDate",c.startDate),c.endDate&&s("endDate",c.endDate),c.periodConfig&&s("scheduleConfig",c.periodConfig)},initialConfig:{startDate:a.startDate,endDate:a.endDate,periodConfig:a.scheduleConfig}})]})},xe=({campaign:a,onToggle:s,isLocked:r})=>e.jsxs("div",{className:"form-card",children:[e.jsx("style",{children:`
                .placement-chip.locked { 
                    opacity: 0.4; 
                    cursor: not-allowed !important; 
                    background: rgba(255,255,255,0.02) !important;
                    border-color: rgba(255,255,255,0.05) !important;
                    color: #555 !important;
                }
                .lock-indicator {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    font-size: 10px;
                    color: #ff4d4d;
                }
            `}),e.jsxs("div",{className:"card-header",children:[e.jsx("i",{className:"fa-solid fa-map"})," Posicionamento"]}),e.jsxs("div",{className:"card-body",children:[e.jsx("div",{className:"placements-row",children:["feed","reels","marketplace"].map(t=>{const o=r(t),c=a.placements?.includes(t);return e.jsxs("div",{className:`placement-chip ${c?"selected":""} ${o?"locked":""}`,onClick:()=>!o&&s(t),children:[e.jsx("i",{className:`fa-solid ${t==="feed"?"fa-newspaper":t==="reels"?"fa-video":"fa-store"}`}),e.jsx("span",{children:t.charAt(0).toUpperCase()+t.slice(1)}),o&&e.jsx("div",{className:"lock-indicator",children:e.jsx("i",{className:"fa-solid fa-lock"})})]},t)})}),a.placements?.length===1&&e.jsxs("p",{className:"text-[9px] text-gray-600 mt-4 text-center font-bold uppercase tracking-widest",children:[e.jsx("i",{className:"fa-solid fa-circle-info mr-1"})," Formatos restritos para manter a compatibilidade da mídia."]})]})]}),me=({campaign:a,interestInput:s,setInterestInput:r,onInputChange:t,onTargetingChange:o,addInterest:c,removeInterest:p,onTogglePlacement:h,isPlacementLocked:u,myGroups:k})=>e.jsxs("div",{className:"animate-fade-in space-y-5",children:[e.jsx(re,{campaign:a,onInputChange:t}),e.jsx(le,{campaign:a,interestInput:s,setInterestInput:r,onTargetingChange:o,addInterest:c,removeInterest:p}),e.jsx(ce,{campaign:a,myGroups:k,onTargetingChange:o}),e.jsx(pe,{campaign:a,onInputChange:t}),e.jsx(xe,{campaign:a,onToggle:h,isLocked:u})]}),fe=({campaign:a,destinationMode:s,setDestinationMode:r,onInputChange:t,onNestedChange:o,onPlacementCreativeChange:c,myGroups:p,selectedContent:h,ctaOptions:u,onCtaUpdate:k,isUrlAllowed:w,isGroupAllowed:D})=>{const{showOptions:C}=U(),v=async()=>{if(a.pricingModel==="commission")return;const n=[];w&&n.push({label:"Link Externo",value:"url",icon:"fa-solid fa-link"}),D&&n.push({label:"Comunidade Flux",value:"group",icon:"fa-solid fa-users"});const m=await C("Tipo de Destino",n);m&&r(m)},I=async()=>{if(h)return;const n=p.map(g=>({label:g.name,value:g.id,icon:g.isVip?"fa-solid fa-crown":"fa-solid fa-users"}));if(n.length===0){alert("Você não possui comunidades criadas.");return}const m=await C("Escolher Comunidade",n);m&&t("targetGroupId",m)},A=(n,m)=>{const g=m.target.files?.[0];if(g){const i=new FileReader;i.onload=d=>{const S=d.target?.result,P=g.type.startsWith("video/")?"video":"image";c(n,S,P)},i.readAsDataURL(g)}},F=async n=>{const m=u.map(i=>({label:i.label.toUpperCase(),value:i.label,icon:`fa-solid ${i.icon}`})),g=await C(`Ação do ${n.toUpperCase()}`,m);g&&k(n,g)},y=a.placements?.includes("feed"),N=a.placements?.includes("reels"),T=a.placements?.includes("marketplace"),l=(n,m,g,i)=>{const d=a.placementCreatives?.[n],S=a.placementCtas?.[n]||a.ctaButton||"saiba mais",P=`file-input-${n}`;return e.jsxs("div",{className:"bg-black/20 border border-white/5 rounded-2xl p-4 animate-fade-in",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-8 h-8 rounded-lg flex items-center justify-center",style:{backgroundColor:`${m}1a`,color:m},children:e.jsx("i",{className:`fa-solid ${g}`})}),e.jsx("h4",{className:"font-bold text-xs text-white uppercase tracking-widest",children:i})]}),d?.mediaUrl&&e.jsx("i",{className:"fa-solid fa-circle-check text-[#00ff82] text-[10px]"})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsxs("button",{onClick:()=>document.getElementById(P)?.click(),className:"py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-gray-400 hover:text-white hover:border-[#00c2ff] transition-all flex items-center justify-center gap-2",children:[e.jsx("i",{className:"fa-solid fa-image text-[#00c2ff]"}),d?.mediaUrl?"ALTERAR":"MÍDIA"]}),e.jsx("input",{type:"file",id:P,hidden:!0,accept:"image/*,video/*",onChange:M=>A(n,M)}),e.jsxs("button",{onClick:()=>F(n),className:"py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-gray-400 hover:text-white hover:border-[#00c2ff] transition-all flex items-center justify-center gap-2 truncate",children:[e.jsx("i",{className:"fa-solid fa-mouse-pointer text-[#00c2ff]"}),S.toUpperCase()]})]})]})};return e.jsxs("div",{className:"form-card",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("i",{className:"fa-solid fa-bullseye"})," Destino e Criativos"]}),e.jsxs("div",{className:"card-body space-y-6",children:[e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(z,{label:"Para onde o tráfego será enviado?",value:s==="url"?"Link Externo":"Comunidade Flux",icon:"fa-solid fa-location-arrow",onClick:v,disabled:a.pricingModel==="commission"}),s==="url"&&e.jsxs("div",{className:"input-group highlight-box",children:[e.jsx("label",{children:"URL de Destino"}),e.jsx("input",{type:"url",value:a.targetUrl,onChange:n=>t("targetUrl",n.target.value),placeholder:"https://exemplo.com",className:"w-full bg-[#0c0f14] border border-[#00c2ff]/30 p-4 rounded-2xl outline-none focus:border-[#00c2ff] text-sm text-[#00c2ff]"})]}),s==="group"&&e.jsx(z,{label:"Comunidade de Destino",value:p.find(n=>n.id===a.targetGroupId)?.name||"Selecione a Comunidade",icon:"fa-solid fa-circle-nodes",onClick:I,disabled:!!h})]}),e.jsx("div",{className:"w-full h-px bg-white/5 my-2"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-[10px] font-black text-[#00c2ff] uppercase tracking-[2px] ml-1",children:"Configurar Criativos Individuais"}),e.jsxs("div",{className:"grid gap-3",children:[y&&l("feed","#00c2ff","fa-newspaper","Feed"),N&&l("reels","#ee2a7b","fa-clapperboard","Reels"),T&&l("marketplace","#00ff82","fa-store","Mercado")]})]}),e.jsxs("div",{className:"input-group mt-6",children:[e.jsx("label",{children:"Legenda Principal (Copy)"}),e.jsx("textarea",{value:a.creative?.text,onChange:n=>o("creative","text",n.target.value),placeholder:"Escreva algo impactante para atrair seu público...",rows:4,className:"w-full bg-[#0c0f14] border border-white/10 p-4 rounded-2xl outline-none focus:border-[#00c2ff] text-sm resize-none"})]})]})]})},ue=({campaign:a,previewTab:s,setPreviewTab:r,destinationMode:t,setDestinationMode:o,onInputChange:c,onNestedChange:p,onPlacementCreativeChange:h,myGroups:u,selectedContent:k,fileInputRef:w,onFileChange:D,onCtaUpdate:C,isUrlAllowed:v,isGroupAllowed:I,ctaOptions:A})=>e.jsxs("div",{className:"animate-fade-in space-y-5",children:[e.jsx(Q,{campaign:a,previewTab:s,setPreviewTab:r,destinationMode:t}),e.jsx(fe,{campaign:a,destinationMode:t,setDestinationMode:o,onInputChange:c,onNestedChange:p,onPlacementCreativeChange:h,myGroups:u,selectedContent:k,fileInputRef:w,onFileChange:D,ctaOptions:A,onCtaUpdate:C,isUrlAllowed:v,isGroupAllowed:I})]}),Ce=()=>{const{campaign:a,currentStep:s,myGroups:r,selectedContent:t,isLoading:o,previewTab:c,setPreviewTab:p,destinationMode:h,setDestinationMode:u,interestInput:k,setInterestInput:w,fileInputRef:D,isPlacementLocked:C,handleInputChange:v,handlePlacementToggle:I,handleInterestAdd:A,handleInterestRemove:F,handleFileChange:y,nextStep:N,prevStep:T,submitCampaign:l}=K();return e.jsxs("div",{className:"min-h-screen bg-[#0a0c10] text-white font-['Inter'] flex flex-col overflow-hidden",children:[e.jsx("style",{children:`
        main { 
          padding: 90px 20px 120px 20px; 
          flex-grow: 1; 
          overflow-y: auto; 
          -webkit-overflow-scrolling: touch; 
          background: radial-gradient(circle at 50% 0%, #1a1e26 0%, #0a0c10 100%);
        }
        .flow-content { max-width: 650px; margin: 0 auto; }
        
        .boost-banner { 
          background: linear-gradient(90deg, rgba(255, 215, 0, 0.15), transparent); 
          border-left: 4px solid #FFD700; 
          padding: 16px 20px; 
          border-radius: 16px; 
          margin-bottom: 24px; 
          display: flex; 
          align-items: center; 
          gap: 15px; 
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        /* Form Cards & Common Layout */
        .form-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 24px;
          margin-bottom: 20px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          animation: slideUp 0.4s ease-out;
        }
        
        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          font-weight: 800;
          color: #00c2ff;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 16px;
        }

        .input-group label {
          display: block;
          font-size: 11px;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
          padding-left: 4px;
        }

        .meta-field {
          width: 100%;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          padding: 14px 18px;
          color: #fff;
          font-size: 15px;
          outline: none;
          transition: all 0.3s;
        }
        .meta-field:focus {
          border-color: #00c2ff;
          background: rgba(0, 0, 0, 0.5);
          box-shadow: 0 0 0 4px rgba(0, 194, 255, 0.1);
        }

        /* Type & Gender Selectors */
        .type-selector, .gender-selector {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        .type-btn, .gender-btn {
          flex: 1;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 14px;
          border-radius: 14px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.5);
        }
        .type-btn.active, .gender-btn.active {
          background: rgba(0, 194, 255, 0.1);
          border-color: #00c2ff;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 194, 255, 0.15);
        }

        /* Placements */
        .placements-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .placement-chip {
          padding: 16px 12px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid transparent;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
        }
        .placement-chip i { font-size: 20px; color: rgba(255,255,255,0.2); }
        .placement-chip span { font-size: 11px; font-weight: 800; text-transform: uppercase; color: rgba(255,255,255,0.4); }
        
        .placement-chip.selected {
          background: rgba(0, 194, 255, 0.05);
          border-color: #00c2ff;
        }
        .placement-chip.selected i { color: #00c2ff; }
        .placement-chip.selected span { color: #fff; }

        /* Interest Tags */
        .interest-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 600;
          color: #00c2ff;
        }
        .interest-tag i {
          font-size: 10px;
          cursor: pointer;
          opacity: 0.5;
        }
        .interest-tag i:hover { opacity: 1; }

        .highlight-box {
          background: rgba(0, 194, 255, 0.04);
          padding: 20px;
          border-radius: 18px;
          border: 1px solid rgba(0, 194, 255, 0.1);
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}),e.jsx(X,{currentStep:s,onBack:T}),e.jsx("main",{className:"no-scrollbar",children:e.jsxs("div",{className:"flow-content animate-fade-in",children:[t&&e.jsxs("div",{className:"boost-banner",children:[e.jsx("div",{className:"w-12 h-12 rounded-2xl bg-[#FFD700]/10 flex items-center justify-center border border-[#FFD700]/20",children:e.jsx("i",{className:"fa-solid fa-lock text-[#FFD700] text-xl"})}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest text-[#FFD700]",children:"Modo de Impulsionamento"}),e.jsx("span",{className:"text-xs font-bold text-white/80",children:"Formato Vinculado ao Post Original"})]})]}),s==="campaign"&&e.jsx(se,{campaign:a,onInputChange:v}),s==="adset"&&e.jsx(me,{campaign:a,interestInput:k,setInterestInput:w,onInputChange:v,onTargetingChange:(n,m)=>v("targeting",{...a.targeting,[n]:m}),addInterest:A,removeInterest:F,onTogglePlacement:I,isPlacementLocked:C,myGroups:r}),s==="ad"&&e.jsx(ue,{campaign:a,previewTab:c,setPreviewTab:p,destinationMode:h,setDestinationMode:u,onInputChange:v,onNestedChange:(n,m,g)=>v(n,{...a[n],[m]:g}),onPlacementCreativeChange:(n,m,g)=>v("placementCreatives",{...a.placementCreatives,[n]:{mediaUrl:m,mediaType:g}}),myGroups:r,selectedContent:t,fileInputRef:D,onFileChange:y,onCtaUpdate:(n,m)=>v("placementCtas",{...a.placementCtas,[n]:m}),isUrlAllowed:!0,isGroupAllowed:!0,ctaOptions:q})]})}),e.jsx(Z,{currentStep:s,isLoading:o,onPrev:T,onNext:N,onSubmit:l})]})};export{Ce as AdPlacementSelector};
