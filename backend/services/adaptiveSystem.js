
// 🤖 Este é o Sistema Adaptativo, o "fusível" inteligente e o cérebro de autoproteção da aplicação.
// Ele monitora a saúde do servidor em tempo real e ajusta dinamicamente o comportamento da aplicação para
// evitar sobrecargas e garantir a estabilidade. Ele implementa um padrão de Degradação Graciosa (Graceful Degradation).

import os from 'os';
import { EventEmitter } from 'events';

class AdaptiveSystem extends EventEmitter {
    constructor() {
        super();
        
        // ========================
        // === CONFIGURAÇÃO ===
        // ========================
        // Limiares que definem a transição entre os estados de saúde do sistema.
        // Estes valores são "relaxados" para tolerar picos em ambientes de contêineres com recursos limitados.
        this.config = {
            checkIntervalMs: 10000, // Frequência da verificação de saúde (10s).
            cpuThresholds: { yellow: 0.8, red: 0.95 },   // 80% e 95% da capacidade da CPU.
            memThresholds: { yellow: 0.85, red: 0.95 },  // 85% e 95% do uso de memória heap.
            rpsThresholds: { yellow: 500, red: 1000 },   // Requisições por segundo.
            
            // --- Configurações Dinâmicas (Saídas) ---
            // Estes são os "knobs" que o sistema ajusta conforme o estado de saúde muda.
            poolLimits: { green: 20, yellow: 15, red: 5 },  // Limite de conexões simultâneas com o banco de dados.
            rateLimits: { green: 2000, yellow: 1000, red: 200 }, // Limite de requisições por minuto para um usuário (rate-limiter).
            socketRate: { green: 1.0, yellow: 0.8, red: 0.2 }  // (Não utilizado atualmente) Fator de amostragem para eventos de socket.
        };

        // ======================
        // === MÉTRICAS VIVAS ===
        // ======================
        this.metrics = {
            cpuLoad: 0,         // Carga da CPU normalizada (0 a 1+).
            memoryUsage: 0,     // Uso da memória heap (0 a 1).
            activeConnections: 0, // Conexões de socket ativas.
            currentRPS: 0,      // Requisições por segundo (RPS) atuais.
            dbLatency: 0        // Latência média do banco de dados (em ms).
        };

        // ==========================
        // === ESTADO ATUAL ===
        // ==========================
        this.state = 'GREEN'; // Pode ser 'GREEN' (Saudável), 'YELLOW' (Aviso), ou 'RED' (Crítico).
        this.requestCounter = 0;
        this.activeUsers = 0;
        
        this.startMonitoring();
    }

    /**
     * @name startMonitoring
     * @description Inicia os loops de monitoramento contínuo.
     */
    startMonitoring() {
        // Loop para calcular RPS a cada segundo.
        setInterval(() => {
            this.metrics.currentRPS = this.requestCounter;
            this.requestCounter = 0;
        }, 1000);

        // Loop principal de verificação de saúde.
        setInterval(() => {
            this.updateMetrics();
            this.determineState();
        }, this.config.checkIntervalMs);
    }

    /**
     * @name updateMetrics
     * @description Coleta as métricas de saúde atuais do sistema operacional e do processo Node.js.
     */
    updateMetrics() {
        const cpus = os.cpus().length;
        const loadAvg = os.loadavg()[0]; // Média de carga do último minuto.
        
        // Normaliza a carga da CPU dividindo pela quantidade de núcleos.
        // Um valor de 1.0 significa que todos os núcleos estão 100% ocupados.
        this.metrics.cpuLoad = loadAvg / cpus;

        const mem = process.memoryUsage();
        // Define um limite "seguro" de heap para um contêiner padrão (ex: 1.5GB). 
        // Isso evita que o processo seja morto por falta de memória (OOM Killer).
        const HEAP_LIMIT = 1.5 * 1024 * 1024 * 1024; 
        this.metrics.memoryUsage = mem.heapUsed / HEAP_LIMIT;
    }

    /**
     * @name determineState
     * @description Compara as métricas atuais com os limiares e define o estado do sistema.
     */
    determineState() {
        const { cpuLoad, memoryUsage, currentRPS } = this.metrics;
        const { cpuThresholds, memThresholds, rpsThresholds } = this.config;

        let newState = 'GREEN';

        // A ordem é importante: do mais crítico para o menos crítico.
        if (cpuLoad > cpuThresholds.red || memoryUsage > memThresholds.red || currentRPS > rpsThresholds.red) {
            newState = 'RED';
        } else if (cpuLoad > cpuThresholds.yellow || memoryUsage > memThresholds.yellow || currentRPS > rpsThresholds.yellow) {
            newState = 'YELLOW';
        }

        // Se o estado mudou, emite um evento para que o resto da aplicação possa reagir.
        if (newState !== this.state) {
            console.log(`⚡ [ADAPTIVE] Mudança de Estado do Sistema: ${this.state} -> ${newState} | CPU: ${(cpuLoad*100).toFixed(1)}% | MEM: ${(memoryUsage*100).toFixed(1)}%`);
            this.state = newState;
            this.emit('stateChange', newState);
        }
    }

    // =================================================
    // === API Pública para o Consumo da Aplicação ===
    // =================================================

    trackRequest() {
        this.requestCounter++;
    }

    setOnlineUsers(count) {
        this.activeUsers = count;
        this.metrics.activeConnections = count;
    }

    reportDbLatency(ms) {
        // Usa uma média móvel simples para suavizar picos de latência.
        this.metrics.dbLatency = (this.metrics.dbLatency * 0.9) + (ms * 0.1);
    }

    // ===============================
    // === TOMADORES DE DECISÃO ===
    // ===============================
    // Métodos consultados por outras partes do sistema para se adaptarem.

    /**
     * @returns {number} O número de queries que o DB manager deve executar em paralelo.
     */
    getDbConcurrencyLimit() {
        const map = { GREEN: this.config.poolLimits.green, YELLOW: this.config.poolLimits.yellow, RED: this.config.poolLimits.red };
        return map[this.state];
    }

    /**
     * @returns {number} O limite de requisições por minuto para o middleware de rate-limit.
     */
    getCurrentRateLimit() {
        const map = { GREEN: this.config.rateLimits.green, YELLOW: this.config.rateLimits.yellow, RED: this.config.rateLimits.red };
        return map[this.state];
    }

    /**
     * @returns {boolean} Se a aplicação deve operar em "modo leve", cortando dados não essenciais das respostas.
     */
    isLightMode() {
        return this.state === 'RED';
    }

    /**
     * Decide se um evento de socket deve ser transmitido com base no estado do sistema.
     * @param {string} eventType - O tipo de evento (ex: 'typing', 'new_message').
     * @returns {boolean} `true` se o evento deve ser enviado, `false` se deve ser descartado.
     */
    shouldBroadcast(eventType) {
        if (this.state === 'GREEN') return true;
        
        // Em estados de sobrecarga, bloqueia eventos de baixa prioridade.
        const lowPriorityEvents = ['typing', 'presence', 'read_receipt'];
        if (lowPriorityEvents.includes(eventType)) {
            // Em estado YELLOW, descarta 50% dos eventos de baixa prioridade. Em RED, descarta 100%.
            return this.state === 'YELLOW' ? Math.random() > 0.5 : false;
        }
        return true;
    }

    /**
     * @returns {object} Um snapshot do estado e das métricas atuais do sistema.
     */
    getStatus() {
        return {
            state: this.state,
            metrics: this.metrics,
            onlineUsers: this.activeUsers
        };
    }
}

// Exporta uma instância única (Singleton) do sistema para toda a aplicação.
export const adaptiveSystem = new AdaptiveSystem();
