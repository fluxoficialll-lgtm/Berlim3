import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Rota principal para um grupo específico, usando o ID do grupo
const GroupLandingPage = lazy(() => import('../../pages/GroupLanding'));

// Rota para a página de vendas de um grupo VIP
const VipGroupSalesPage = lazy(() => import('../../pages/VipGroupSales'));

// Rota para o conteúdo de uma pasta de vendas (corrigido o caminho)
const SalesFolderContentPage = lazy(() => import('../../pages/components/groups/SalesFolderContentPage'));

/**
 * @deprecated As rotas de chat agora são gerenciadas pelo ChatRoutes.
 */
const GroupChatPage = lazy(() => import('../../pages/GroupChat'));

// Rota para a página de criação de grupo
const CreateGroupPage = lazy(() => import('../../pages/CreateGroup'));

/**
 * Rotas relacionadas aos grupos.
 */
export const GroupRoutes: RouteObject[] = [
    {
        path: ":id", // Rota para a página de um grupo específico, ex: /groups/123
        element: <GroupLandingPage />,
    },
    {
        path: ":id/chat", // Rota para o chat de um grupo
        element: <GroupChatPage />
    },
    {
        path: ":id/vip", // Rota para a página de vendas de um grupo VIP
        element: <VipGroupSalesPage />
    },
    {
        path: ":id/folder/:folderId", // Rota para o conteúdo de uma pasta de vendas específica
        element: <SalesFolderContentPage />
    },
    {
        path: "create", // Rota para a página de criação de grupo
        element: <CreateGroupPage />
    }
];
