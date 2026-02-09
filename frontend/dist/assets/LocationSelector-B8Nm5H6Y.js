import{r as x,j as e,u as w}from"./index-BC19Iu_T.js";const g={getCurrentPosition:()=>new Promise((r,t)=>{if(!navigator.geolocation){t(new Error("Geolocalização não suportada."));return}navigator.geolocation.getCurrentPosition(l=>r({latitude:l.coords.latitude,longitude:l.coords.longitude}),l=>t(l),{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})}),reverseGeocode:async r=>{try{const l=await(await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${r.latitude}&lon=${r.longitude}&zoom=10&addressdetails=1`,{headers:{"Accept-Language":"pt-BR"}})).json(),s=l.address;return{city:s.city||s.town||s.village||s.municipality,state:s.state,stateCode:s["ISO3166-2-lvl4"]?.split("-")[1],country:s.country,countryCode:s.country_code?.toUpperCase(),displayName:l.display_name}}catch(t){throw console.error("Geocoding failed",t),new Error("Falha ao identificar endereço.")}}},h="flux_user_geo_filter",k=()=>{const[r,t]=x.useState(!1),[l,s]=x.useState(()=>{const i=localStorage.getItem(h);return i?JSON.parse(i):{type:"global"}}),c=x.useCallback(i=>{s(i),localStorage.setItem(h,JSON.stringify(i))},[]);return{currentFilter:l,loading:r,captureGps:async()=>{t(!0);try{const i=await g.getCurrentPosition(),n=await g.reverseGeocode(i),d={type:"radius",radius:50,coords:i,targetAddress:n};return c(d),d}catch(i){throw console.error(i),i}finally{t(!1)}},updateFilter:c,clearFilter:()=>{c({type:"global"})}}},C=({value:r,onChange:t})=>{const l=c=>{let o=parseInt(c.target.value);isNaN(o)&&(o=0),o>500&&(o=500),t(o)},s=()=>{r<1&&t(1)};return e.jsxs("div",{className:"bg-white/5 border border-white/10 rounded-2xl p-6 animate-fade-in",children:[e.jsx("style",{children:`
                .radius-input-manual {
                    background: rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(0, 194, 255, 0.2);
                    color: #fff;
                    font-size: 20px;
                    font-weight: 900;
                    width: 80px;
                    text-align: center;
                    padding: 4px;
                    border-radius: 8px;
                    outline: none;
                    transition: all 0.3s;
                }
                .radius-input-manual:focus {
                    border-color: #00c2ff;
                    box-shadow: 0 0 15px rgba(0, 194, 255, 0.2);
                }
                /* Remove setas do input number */
                .radius-input-manual::-webkit-inner-spin-button,
                .radius-input-manual::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
            `}),e.jsxs("div",{className:"flex justify-between items-center mb-6",children:[e.jsxs("div",{className:"text-left",children:[e.jsx("h3",{className:"text-[10px] font-black text-[#00c2ff] uppercase tracking-[2px]",children:"Raio de Alcance"}),e.jsx("p",{className:"text-[9px] text-gray-600 font-bold uppercase",children:"Ajuste o zoom do feed"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("input",{type:"number",className:"radius-input-manual",value:r,onChange:l,onBlur:s,min:"1",max:"500"}),e.jsx("span",{className:"text-xs font-black text-gray-500 uppercase",children:"KM"})]})]}),e.jsx("input",{type:"range",min:"1",max:"500",value:r,onChange:c=>t(parseInt(c.target.value)),className:"w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00c2ff]"}),e.jsxs("div",{className:"flex justify-between mt-3 text-[8px] font-black text-gray-700 uppercase tracking-widest",children:[e.jsx("span",{children:"Local (1km)"}),e.jsx("span",{children:"Regional (500km)"})]}),e.jsx("div",{className:"mt-6 p-4 bg-black/20 rounded-xl border border-white/5",children:e.jsxs("p",{className:"text-[11px] text-gray-400 leading-relaxed italic text-center",children:[e.jsx("i",{className:"fa-solid fa-circle-info text-[#00c2ff] mr-1 opacity-50"}),"Conteúdos criados dentro de ",e.jsxs("strong",{className:"text-white",children:[r,"km"]})," aparecerão prioritariamente no seu feed."]})})]})},A=()=>{const r=w(),{currentFilter:t,loading:l,captureGps:s,updateFilter:c,clearFilter:o}=k(),[p,i]=x.useState("feed"),[n,d]=x.useState("territory"),y=async()=>{try{await s(),d("territory")}catch{alert("Não foi possível acessar seu GPS. Verifique as permissões do seu navegador.")}},f=a=>{c({...t,type:a})},j=a=>{c({...t,type:"radius",radius:a})},v=()=>{if(t.coords&&t.targetAddress){let a="Global";const b=t.targetAddress;t.type==="city"?a=b.city||"Minha Cidade":t.type==="state"?a=b.state||"Meu Estado":t.type==="country"?a=b.country||"Meu País":t.type==="radius"&&(a=`${t.radius}km de você`),localStorage.setItem("feed_location_filter",a)}switch(p){case"reels":r("/reels");break;case"marketplace":r("/marketplace");break;default:r("/feed")}},N=[{id:"feed",label:"Feed",icon:"fa-newspaper",desc:"Posts e enquetes"},{id:"reels",label:"Reels",icon:"fa-clapperboard",desc:"Vídeos curtos"},{id:"marketplace",label:"Mercado",icon:"fa-cart-shopping",desc:"Ofertas e vendas"}],u=!!t.targetAddress,m=t.targetAddress;return e.jsxs("div",{className:"min-h-screen bg-[#0c0f14] text-white font-['Inter'] flex flex-col overflow-x-hidden",children:[e.jsx("style",{children:`
        .placement-card-item {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 18px;
            padding: 14px 18px;
            display: flex;
            align-items: center;
            gap: 16px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .placement-card-item.active {
            background: rgba(0, 194, 255, 0.08);
            border-color: #00c2ff;
        }
        .p-icon-box {
            width: 44px; height: 44px; border-radius: 12px;
            background: rgba(255, 255, 255, 0.05);
            display: flex; align-items: center; justify-content: center;
            color: #555; font-size: 18px;
        }
        .active .p-icon-box { background: #00c2ff; color: #000; }

        .territory-grid { display: grid; grid-template-columns: 1fr; gap: 8px; }
        .territory-btn {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 18px 20px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .territory-btn.active {
            background: rgba(0, 194, 255, 0.1);
            border-color: #00c2ff;
            box-shadow: 0 0 20px rgba(0, 194, 255, 0.1);
        }
        .t-label { font-size: 10px; font-weight: 900; text-transform: uppercase; color: #555; letter-spacing: 2px; margin-bottom: 2px; }
        .t-name { font-size: 16px; font-weight: 800; color: #fff; }
        .territory-btn.active .t-label { color: #00c2ff; }

        .radius-toggle-btn {
            width: 100%; padding: 14px; background: rgba(255,255,255,0.02);
            border: 1px dashed rgba(255,255,255,0.1); border-radius: 16px;
            color: #888; font-size: 11px; font-weight: 800; text-transform: uppercase;
            letter-spacing: 1px; margin-top: 10px; cursor: pointer; transition: 0.3s;
        }
        .radius-toggle-btn:hover { border-color: #00c2ff; color: #fff; }
        .radius-toggle-btn.active { background: #00c2ff1a; border: 1px solid #00c2ff; color: #00c2ff; }
      `}),e.jsxs("header",{className:"flex items-center p-[16px_32px] bg-[#0c0f14] fixed w-full z-10 border-b border-white/10 top-0 h-[65px]",children:[e.jsx("button",{onClick:()=>r("/feed"),className:"text-white text-[22px] pr-[15px]",children:e.jsx("i",{className:"fa-solid fa-xmark"})}),e.jsx("h1",{className:"text-[18px] font-bold text-[#00c2ff] uppercase tracking-tighter",children:"Explorar Mapa Flux"})]}),e.jsxs("main",{className:"pt-[90px] pb-10 w-full max-w-[500px] mx-auto px-5 flex flex-col gap-6",children:[e.jsxs("div",{className:"bg-white/5 border border-white/10 rounded-[32px] p-8 text-center relative overflow-hidden group",children:[l&&e.jsxs("div",{className:"absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center",children:[e.jsx("i",{className:"fa-solid fa-circle-notch fa-spin text-3xl text-[#00c2ff] mb-3"}),e.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest",children:"Localizando..."})]}),u?e.jsxs("div",{className:"animate-fade-in flex flex-col gap-6",children:[e.jsx("div",{className:"text-left mb-2",children:e.jsx("h3",{className:"text-[10px] font-black text-gray-600 uppercase tracking-[3px] ml-1",children:"Alcance por Território"})}),n==="territory"?e.jsxs("div",{className:"territory-grid",children:[e.jsxs("div",{className:`territory-btn ${t.type==="city"?"active":""}`,onClick:()=>f("city"),children:[e.jsxs("div",{className:"text-left",children:[e.jsx("div",{className:"t-label",children:"Local"}),e.jsx("div",{className:"t-name",children:m?.city||"Sua Cidade"})]}),e.jsx("i",{className:"fa-solid fa-city text-gray-600"})]}),e.jsxs("div",{className:`territory-btn ${t.type==="state"?"active":""}`,onClick:()=>f("state"),children:[e.jsxs("div",{className:"text-left",children:[e.jsx("div",{className:"t-label",children:"Regional"}),e.jsx("div",{className:"t-name",children:m?.state||"Seu Estado"})]}),e.jsx("i",{className:"fa-solid fa-map text-gray-600"})]}),e.jsxs("div",{className:`territory-btn ${t.type==="country"?"active":""}`,onClick:()=>f("country"),children:[e.jsxs("div",{className:"text-left",children:[e.jsx("div",{className:"t-label",children:"Nacional"}),e.jsx("div",{className:"t-name",children:m?.country||"Seu País"})]}),e.jsx("i",{className:"fa-solid fa-flag text-gray-600"})]})]}):e.jsx("div",{className:"animate-fade-in",children:e.jsx(C,{value:t.radius||50,onChange:j})}),e.jsxs("button",{className:`radius-toggle-btn ${n==="custom_radius"?"active":""}`,onClick:()=>d(n==="territory"?"custom_radius":"territory"),children:[e.jsx("i",{className:`fa-solid ${n==="territory"?"fa-radar":"fa-arrow-left"} mr-2`}),n==="territory"?"Ajustar Raio (KM)":"Voltar para Territórios"]})]}):e.jsxs("div",{className:"py-4",children:[e.jsx("div",{className:"w-20 h-20 bg-[#00c2ff1a] rounded-[30px] flex items-center justify-center mx-auto mb-6 border border-[#00c2ff33]",children:e.jsx("i",{className:"fa-solid fa-satellite text-3xl text-[#00c2ff]"})}),e.jsx("h2",{className:"text-lg font-bold mb-2",children:"GPS Desconectado"}),e.jsx("p",{className:"text-xs text-gray-500 px-10 leading-relaxed mb-8",children:"Ative o sinal para ver conteúdos reais baseados no seu território atual."}),e.jsx("button",{onClick:y,className:"w-full py-4 bg-[#00c2ff] text-black font-black rounded-2xl shadow-xl uppercase text-xs tracking-widest active:scale-95 transition-all",children:"Ativar Localização"})]})]}),u&&e.jsxs("div",{className:"bg-white/5 border border-white/10 rounded-[32px] p-6 animate-fade-in",children:[e.jsx("h3",{className:"text-[10px] font-black text-[#00c2ff] uppercase tracking-[2px] mb-4 ml-1",children:"O que deseja filtrar?"}),e.jsx("div",{className:"flex flex-col gap-2",children:N.map(a=>e.jsxs("div",{className:`placement-card-item ${p===a.id?"active":""}`,onClick:()=>i(a.id),children:[e.jsx("div",{className:"p-icon-box",children:e.jsx("i",{className:`fa-solid ${a.icon}`})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("h4",{className:"text-sm font-bold text-white",children:a.label}),e.jsx("p",{className:"text-[10px] text-gray-500 uppercase font-medium",children:a.desc})]}),p===a.id&&e.jsx("i",{className:"fa-solid fa-circle-check text-[#00c2ff]"})]},a.id))})]}),u&&e.jsx("button",{onClick:v,className:"w-full py-5 bg-[#00c2ff] text-black font-black rounded-2xl shadow-xl uppercase text-sm tracking-widest active:scale-95 transition-all",children:"Confirmar Filtro"}),e.jsxs("div",{className:"mt-4 pt-6 border-t border-white/5 space-y-4",children:[e.jsxs("button",{onClick:()=>{o(),localStorage.removeItem("feed_location_filter"),r("/feed")},className:"w-full bg-white/5 text-white border border-white/10 p-4 rounded-xl font-bold text-sm flex items-center justify-center gap-3 transition-all hover:bg-red-500/10 hover:border-red-500/30",children:[e.jsx("i",{className:"fa-solid fa-earth-americas text-[#00c2ff]"}),"Limpar Filtro (Ver Global)"]}),e.jsx("p",{className:"text-center text-[10px] text-gray-700 font-black uppercase tracking-[3px]",children:"Flux Territory Intelligence v3.0"})]})]})]})};export{A as LocationSelector};
