import{j as r}from"./index-BC19Iu_T.js";const a={conferir:"fa-eye",participar:"fa-user-group",comprar:"fa-cart-shopping",assinar:"fa-credit-card",entrar:"fa-arrow-right-to-bracket",descubra:"fa-compass",baixar:"fa-download","saiba mais":"fa-circle-info"},i=t=>{if(!t)return"";if(t.category==="Vagas de Emprego")return"Vaga de trabalho";try{const o=typeof t.price=="number"?t.price:parseFloat(String(t.price||0)),e=isNaN(o)?"0,00":o.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2});return t.category==="Serviços"?`A partir de R$ ${e}`:t.category==="Infoprodutos"?`R$ ${e}`:t.isAd&&(isNaN(o)||o===0)?"Patrocinado":`R$ ${e}`}catch{return"Consulte"}},n=t=>{if(!t)return{text:"Ver",icon:"fa-eye"};if(t.isAd&&t.ctaText){const o=t.ctaText.toLowerCase();return{text:t.ctaText,icon:a[o]||"fa-arrow-right"}}return t.category==="Vagas de Emprego"?{text:"Candidatar-se",icon:"fa-briefcase"}:{text:"Ver Produto",icon:"fa-cart-shopping"}},c=({product:t,onClick:o})=>{const e=n(t);return r.jsxs("div",{className:`product-card ${t.isAd?"sponsored":""}`,onClick:()=>o(t),children:[r.jsx("style",{children:`
                .product-card {
                    background: rgba(20,20,25,0.6); border-radius:16px; padding:10px;
                    display:flex; flex-direction:column; transition:0.3s; 
                    border: 1px solid rgba(255,255,255,0.05);
                    cursor: pointer; position: relative;
                    overflow: hidden;
                    height: fit-content;
                    align-self: start;
                }
                .product-card.sponsored { border-color: #FFD700; background: rgba(255, 215, 0, 0.05); }
                .product-card:hover { background: rgba(30,30,40,0.8); border-color: rgba(0,194,255,0.3); transform:translateY(-2px); }
                
                .product-img-container { width:100%; aspect-ratio: 1/1; border-radius:12px; overflow: hidden; margin-bottom:10px; background: #000; position: relative; }
                .product-card img { width:100%; height:100%; object-fit:cover; transition: 0.5s; }
                .product-card:hover img { transform: scale(1.05); }
                
                .ad-badge { position: absolute; top: 8px; left: 8px; background: #FFD700; color: #000; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px; z-index: 5; }
                
                .product-info h4 { color:#fff; font-size:14px; margin-bottom:4px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .product-price { color:#00ff82; font-size:13px; font-weight:700; margin-bottom:4px; }
                .product-card.sponsored .product-price { color: #FFD700; }
                .product-sales { font-size: 10px; color: #FFD700; margin-bottom: 4px; font-weight: 500; }
                .product-location { color:#888; font-size:11px; display: flex; align-items: center; gap: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                
                .product-actions { margin-top:10px; width:100%; }
                .product-actions button {
                    width:100%; border:none; padding:10px; border-radius:10px; cursor:pointer; 
                    font-size: 11px; font-weight:900; background:rgba(0,194,255,0.1); color:#00c2ff;
                    transition:0.3s; text-transform: uppercase; letter-spacing: 0.5px;
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                }
                .product-card.sponsored .product-actions button { background: #FFD700; color: #000; }
                .product-card:hover .product-actions button { background:#00c2ff; color:#000; }
            `}),r.jsxs("div",{className:"product-img-container",children:[t.isAd&&r.jsx("div",{className:"ad-badge",children:"Destaque"}),r.jsx("img",{src:t.image||"https://via.placeholder.com/300?text=Sem+Imagem",alt:t.title,loading:"lazy"})]}),r.jsxs("div",{className:"product-info",children:[r.jsx("h4",{children:t.title}),r.jsx("div",{className:"product-price",children:i(t)}),t.soldCount!==void 0&&r.jsxs("div",{className:"product-sales",children:[Number(t.soldCount||0)," vendidos"]}),r.jsxs("div",{className:"product-location",children:[r.jsx("i",{className:"fa-solid fa-location-dot"})," ",t.location]})]}),r.jsx("div",{className:"product-actions",children:r.jsxs("button",{children:[r.jsx("i",{className:`fa-solid ${e.icon}`}),e.text]})})]})};export{c as P};
