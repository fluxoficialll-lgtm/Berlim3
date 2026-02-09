import{G as m,c as d}from"./index-BC19Iu_T.js";class u{}var p={};class h extends u{id="gemini";async generate(e,r){const i=p.API_KEY;if(!i)throw new Error("GEMINI_API_KEY_MISSING");const n=new m({apiKey:i});let s="gemini-3-flash-preview";r.tier==="pro"&&(s="gemini-3-pro-preview"),r.tier==="ultra"&&(s="gemini-3-pro-preview");const t=(await n.models.generateContent({model:s,contents:[{parts:[{text:e}]}],config:{systemInstruction:r.systemInstruction,temperature:r.temperature??.7,responseMimeType:r.jsonMode?"application/json":void 0}})).text||"";let a=t;if(r.jsonMode)try{a=JSON.parse(t.trim())}catch{throw console.error("[GeminiProvider] Failed to parse JSON response:",t),new Error("AI_JSON_PARSE_ERROR")}return{content:a,provider:this.id,model:s}}}class g{requestHistory={};canProcess(e){const r=Date.now(),i=60*1e3;return this.requestHistory[e]||(this.requestHistory[e]=[]),this.requestHistory[e]=this.requestHistory[e].filter(s=>r-s<i),this.requestHistory[e].length<8}record(e){this.requestHistory[e]||(this.requestHistory[e]=[]),this.requestHistory[e].push(Date.now())}}const l=new g;class w{providers=[new h];defaultProvider="gemini";async run(e,r){const n=d.getCurrentUser()?.id||"anonymous_guest";if(!l.canProcess(n))throw console.warn(`[AiOrchestrator] Rate limit hit for user ${n}`),new Error("Limite de requisições de IA atingido. Tente novamente em 1 minuto.");const s=this.providers.find(t=>t.id===this.defaultProvider);if(!s)throw new Error("AI_PROVIDER_NOT_FOUND");const c=performance.now();try{const t=await s.generate(e,r),a=performance.now()-c;return console.log(`[AI_AUDIT] Task: ${r.task} | Provider: ${t.provider} | Model: ${t.model} | Latency: ${a.toFixed(0)}ms`),l.record(n),t.content}catch(t){throw console.error(`[AiOrchestrator] Critical error in task ${r.task}:`,t.message),t}}}const y=new w,A={suggestInterests:(o,e)=>`
    Aja como um especialista em tráfego pago de alta performance.
    Analise este produto/anúncio:
    "${o} - ${e}"
    
    Com base no comportamento de consumo atual nas redes sociais, retorne uma lista das 8 melhores 
    palavras-chave de interesses e comportamentos para segmentar o público ideal no gerenciador de anúncios.
    
    REQUISITO TÉCNICO: Retorne estritamente um array JSON de strings sem formatação markdown.
  `,translateCopy:(o,e)=>`
    Act as a professional direct-response copywriter.
    Translate the following marketing text to the language: ${e}.
    
    Rules:
    1. Maintain the emotional urgency and sales triggers.
    2. Use local cultural nuances for higher conversion (slangs are allowed if professional).
    3. Keep all emojis.
    4. Return ONLY the translated text.
    
    Text: "${o}"
  `};export{A as M,y as a};
