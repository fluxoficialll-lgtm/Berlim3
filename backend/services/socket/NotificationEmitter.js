
// 📣 Este é o Emissor de Notificações em Tempo Real da plataforma.
// Ele NÃO é um servidor de socket ativo. Em vez disso, é um serviço utilitário passivo
// que recebe uma instância do servidor Socket.IO (geralmente chamado de `io`)
// e a utiliza para enviar eventos para clientes específicos.

export const NotificationEmitter = {
    /**
     * @name emitPaymentSuccess
     * @description Envia uma notificação de "Pagamento Confirmado" para um usuário específico.
     * Isso informa ao cliente que o acesso a um grupo foi liberado após um pagamento bem-sucedido.
     *
     * @param {object} io - A instância do servidor Socket.IO, vinda do ponto de entrada da aplicação.
     * @param {string} userEmail - O email do usuário-alvo. O sistema de sockets usa o email como nome da "sala" para direcionar a mensagem.
     * @param {string} groupId - O ID do grupo ao qual o acesso foi liberado.
     * @param {string} groupName - O nome do grupo, para exibição na mensagem.
     */
    emitPaymentSuccess(io, userEmail, groupId, groupName) {
        // Validação para garantir que os parâmetros essenciais foram fornecidos.
        if (!io || !userEmail) return;
        
        console.log(`📡 [Socket] Enviando notificação 'payment_confirmed' para a sala: ${userEmail}`);
        
        // io.to(userEmail) -> Direciona a mensagem para a sala específica do usuário.
        // .emit(...) -> Envia o evento 'payment_confirmed' com os dados (payload).
        io.to(userEmail).emit('payment_confirmed', {
            groupId,
            groupName,
            message: `Seu acesso ao grupo ${groupName} foi liberado com sucesso!`,
            timestamp: Date.now()
        });
    },

    /**
     * @name emitRoleUpdate
     * @description Notifica um usuário que seu cargo (role) em um grupo foi alterado.
     *
     * @param {object} io - A instância do servidor Socket.IO.
     * @param {string} userEmail - O email do usuário-alvo.
     * @param {string} groupId - O ID do grupo onde o cargo foi alterado.
     * @param {string} roleName - O nome do novo cargo (ex: "Admin", "Membro").
     */
    emitRoleUpdate(io, userEmail, groupId, roleName) {
        if (!io || !userEmail) return;

        console.log(`📡 [Socket] Enviando notificação 'role_updated' para a sala: ${userEmail}`);

        io.to(userEmail).emit('role_updated', {
            groupId,
            roleName,
            message: `Seu cargo no grupo foi atualizado para: ${roleName}`
        });
    }

    // ✨ Para adicionar uma nova notificação, crie um novo método seguindo o mesmo padrão.
    // Exemplo:
    // emitNewPostInGroup(io, userEmail, groupId, postTitle) {
    //     if (!io || !userEmail) return;
    //     io.to(userEmail).emit('new_post', { groupId, postTitle });
    // }
};
