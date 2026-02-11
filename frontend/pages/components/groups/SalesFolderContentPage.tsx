import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// --- Serviços ---
import { groupService } from '../../../services/groupService';
import { postService } from '../../../services/postService';
import { authService } from '../../../services/authService';

// --- Tipos ---
import { Group, SalesFolder, Infoproduct } from '../../../types';

// --- Subcomponentes de UI ---
import { FolderContentHeader } from '../../../features/groups/components/platform/FolderContentHeader';
import { InfoproductCard } from '../../../features/groups/components/platform/InfoproductCard';
import { EmptyFolderState } from '../../../features/groups/components/platform/EmptyFolderState';
import { InfoproductPreviewModal } from '../../../features/groups/components/platform/InfoproductPreviewModal';
import { AddFileSophisticatedButton } from '../../../features/groups/components/platform/AddFileSophisticatedButton';
import { UploadProgressCard } from '../../../features/groups/components/platform/UploadProgressCard';

/**
 * Componente: SalesFolderContentPage
 * 
 * Propósito: Exibe o conteúdo de uma pasta de vendas específica de um grupo. 
 * Permite a visualização, upload e gerenciamento de infoprodutos (arquivos)
 * dentro dessa pasta. A página lida com a lógica de permissões (dono/admin vs. membro)
 * e o fluxo de upload de múltiplos arquivos com barra de progresso.
 */
export const SalesFolderContentPage: React.FC = () => {
    // --- Hooks de Navegação e Parâmetros ---
    const navigate = useNavigate();
    const { groupId, folderId } = useParams<{ groupId: string, folderId: string }>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- Estados do Componente ---
    const [group, setGroup] = useState<Group | null>(null);
    const [folder, setFolder] = useState<SalesFolder | null>(null);
    const [loading, setLoading] = useState(true);
    const [isOwnerOrAdmin, setIsOwnerOrAdmin] = useState(false);
    const [previewIndex, setPreviewIndex] = useState<number | null>(null);

    // --- Estados de Upload ---
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadCurrentItem, setUploadCurrentItem] = useState(0);
    const [uploadTotalItems, setUploadTotalItems] = useState(0);

    // --- Efeito para Carregar Dados ---
    // Busca os dados do grupo e da pasta quando o componente é montado ou os IDs mudam.
    useEffect(() => {
        if (groupId && folderId) {
            const foundGroup = groupService.getGroupById(groupId);
            if (foundGroup) {
                setGroup(foundGroup);
                
                // Verifica as permissões do usuário atual (dono ou admin).
                const currentUserId = authService.getCurrentUserId();
                const isOwner = foundGroup.creatorId === currentUserId;
                const isAdmin = foundGroup.adminIds?.includes(currentUserId || '') || false;
                setIsOwnerOrAdmin(isOwner || isAdmin);

                // Encontra a pasta específica dentro das seções da plataforma de vendas do grupo.
                let foundFolder: SalesFolder | null = null;
                foundGroup.salesPlatformSections?.forEach(sec => {
                    const f = sec.folders.find(fold => fold.id === folderId);
                    if (f) foundFolder = f;
                });
                
                // Garante que a lista de itens da pasta seja sempre um array.
                if (foundFolder && (!foundFolder.items || foundFolder.items.length === 0)) {
                    foundFolder.items = [];
                }
                setFolder(foundFolder);
            }
            setLoading(false);
        }
    }, [groupId, folderId]);

    // --- Funções Auxiliares ---

    /**
     * Formata o tamanho de um arquivo de bytes para um formato legível (KB, MB, GB).
     * @param bytes O tamanho do arquivo em bytes.
     * @returns A string formatada.
     */
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // --- Manipuladores de Eventos ---

    /**
     * Lida com o processo de upload de arquivos.
     * É acionado quando o usuário seleciona arquivos no input.
     */
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0 || !group || !folder) return;

        const fileArray = Array.from(files) as File[];
        setIsUploading(true);
        setUploadTotalItems(fileArray.length);

        const newItems: Infoproduct[] = [];

        // Itera sobre cada arquivo para fazer o upload individualmente.
        for (let i = 0; i < fileArray.length; i++) {
            const file: File = fileArray[i];
            setUploadCurrentItem(i + 1);
            setUploadProgress(Math.round(((i) / fileArray.length) * 100));

            try {
                // Faz o upload do arquivo para o serviço de armazenamento.
                const fileUrl = await postService.uploadMedia(file, 'infoproducts');
                const sizeStr = formatFileSize(file.size);
                const extension = file.name.split('.').pop()?.toLowerCase() || 'file';
                
                // Determina o tipo do infoproduto (imagem, vídeo ou arquivo genérico).
                let type: 'image' | 'video' | 'file' = 'file';
                if (file.type.startsWith('image/')) type = 'image';
                else if (file.type.startsWith('video/')) type = 'video';

                // Cria o novo objeto de infoproduto.
                const newItem: Infoproduct = {
                    id: `item_${Date.now()}_${i}`,
                    title: file.name.split('.')[0],
                    type: type,
                    fileType: extension as any,
                    url: fileUrl,
                    allowDownload: true, // TODO: Puxar de uma configuração global ou da pasta
                    size: sizeStr
                };
                newItems.push(newItem);
                setUploadProgress(Math.round(((i + 1) / fileArray.length) * 100));
            } catch (error) {
                console.error("Erro ao subir arquivo:", file.name, error);
            }
        }

        // Atualiza o estado do grupo e da pasta com os novos itens.
        if (newItems.length > 0) {
            const updatedGroup = { ...group };
            updatedGroup.salesPlatformSections?.forEach(sec => {
                const f = sec.folders.find(fold => fold.id === folderId);
                if (f) {
                    f.items = [...(f.items || []), ...newItems];
                    f.itemsCount = f.items.length;
                    setFolder({ ...f }); // Atualiza o estado local da pasta
                }
            });

            await groupService.updateGroup(updatedGroup as Group);
            setGroup(updatedGroup as Group);
        }

        if (fileInputRef.current) fileInputRef.current.value = ''; // Reseta o input de arquivo
        
        // Mantém o progresso em 100% por um segundo antes de esconder a UI de upload.
        setTimeout(() => {
            setIsUploading(false);
        }, 1000);
    };

    // --- Renderização ---

    // Exibe um spinner de carregamento enquanto os dados não chegam.
    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center">
                <i className="fa-solid fa-circle-notch fa-spin text-[#00c2ff]"></i>
            </div>
        );
    }

    // Determina as permissões de upload e download para a renderização.
    const allowDownload = folder?.allowDownload ?? group?.salesPlatformAllowDownload ?? true;
    const allowMemberUpload = folder?.allowMemberUpload ?? group?.salesPlatformAllowMemberUpload ?? false;
    const canUpload = isOwnerOrAdmin || allowMemberUpload;

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col">
            <FolderContentHeader 
                onBack={() => navigate(-1)} 
                folderName={folder?.name} 
            />

            <main className="flex-1 p-5 overflow-y-auto no-scrollbar pb-32">
                <div className="grid gap-3 max-w-[600px] mx-auto w-full">
                    {folder?.items && folder.items.length > 0 ? (
                        folder.items.map((item, index) => (
                            <InfoproductCard 
                                key={item.id} 
                                item={item} 
                                globalAllowDownload={allowDownload}
                                onPreview={() => setPreviewIndex(index)}
                            />
                        ))
                    ) : (
                        <EmptyFolderState />
                    )}
                </div>
            </main>

            {/* Exibe os controles de upload apenas se o usuário tiver permissão. */}
            {canUpload && (
                <>
                    <UploadProgressCard 
                        progress={uploadProgress}
                        current={uploadCurrentItem}
                        total={uploadTotalItems}
                        isVisible={isUploading}
                    />
                    
                    <AddFileSophisticatedButton 
                        onClick={() => fileInputRef.current?.click()}
                        isLoading={isUploading}
                    />
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileUpload} 
                        multiple
                        className="hidden" 
                    />
                </>
            )}

            {/* Modal para pré-visualização dos infoprodutos. */}
            <InfoproductPreviewModal 
                items={folder?.items || []}
                initialIndex={previewIndex}
                onClose={() => setPreviewIndex(null)}
            />

            <div className="text-center opacity-10 text-[8px] uppercase font-black tracking-[3px] mb-8">
                Flux Content Delivery v1.1
            </div>
        </div>
    );
};