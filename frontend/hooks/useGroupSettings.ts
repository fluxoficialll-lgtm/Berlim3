import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authService } from '@/services/authService';
import { Group, User, GroupLink, VipMediaItem } from '@/types';
import { useModal } from '@/components/ModalSystem';
import { API_BASE } from '@/apiConfig';

// ✅ ARQUITETURA NOVA: A lógica de API agora vive diretamente no hook.
const GROUPS_API_URL = `${API_BASE}/groups`;

export const useGroupSettings = () => {
    const navigate = useNavigate();
    const { id: groupId } = useParams<{ id: string }>();
    const { showConfirm, showAlert } = useModal();
    
    const [group, setGroup] = useState<Group | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
    const [isOwner, setIsOwner] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // Form States - Mantidos como no original
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState<string | undefined>(undefined);
    const [approveMembers, setApproveMembers] = useState(false);
    const [pendingRequests, setPendingRequests] = useState<User[]>([]);
    const [links, setLinks] = useState<GroupLink[]>([]);
    const [onlyAdminsPost, setOnlyAdminsPost] = useState(false);
    const [msgSlowMode, setMsgSlowMode] = useState(false);
    const [msgSlowModeInterval, setMsgSlowModeInterval] = useState('30');
    const [joinSlowMode, setJoinSlowMode] = useState(false);
    const [joinSlowModeInterval, setJoinSlowModeInterval] = useState('60');
    const [memberLimit, setMemberLimit] = useState<number | ''>('');
    const [forbiddenWords, setForbiddenWords] = useState<string[]>([]);
    const [members, setMembers] = useState<{ id: string, name: string, role: string, isMe: boolean, avatar?: string }[]>([]);
    const [vipPrice, setVipPrice] = useState('');
    const [vipCurrency, setVipCurrency] = useState<'BRL' | 'USD'>('BRL');
    const [vipDoorText, setVipDoorText] = useState('');
    const [vipButtonText, setVipButtonText] = useState('');
    const [vipMediaItems, setVipMediaItems] = useState<VipMediaItem[]>([]);
    const [pixelId, setPixelId] = useState('');
    const [pixelToken, setPixelToken] = useState('');
    const [isSalesPlatformEnabled, setIsSalesPlatformEnabled] = useState(false);
    const [salesFoldersCount, setSalesFoldersCount] = useState(0);

    const fetchGroupData = useCallback(async () => {
        if (!groupId) return;
        setLoading(true);

        const currentUserId = authService.getCurrentUserId();
        
        try {
            // Substitui groupService.getGroupById, .getPendingMembers, .getGroupMembers
            const response = await fetch(`${GROUPS_API_URL}/${groupId}`);
            if (!response.ok) throw new Error('Failed to fetch group data');
            
            // O backend deve retornar um objeto com todos os dados necessários
            const data = await response.json(); 
            const foundGroup: Group = data.group;
            const groupMembers: User[] = data.members || [];
            const pendingMembers: User[] = data.pendingMembers || [];

            if (foundGroup) {
                setGroup(foundGroup);
                const owner = foundGroup.creatorId === currentUserId;
                const admin = owner || (currentUserId && foundGroup.adminIds?.includes(currentUserId)) || false;
                setIsOwner(owner);
                setIsAdmin(admin);

                // Popula o estado do formulário com os dados da API
                setGroupName(foundGroup.name);
                setDescription(foundGroup.description);
                setCoverImage(foundGroup.coverImage);
                setLinks(foundGroup.links || []);
                setPendingRequests(pendingMembers);
                
                setMembers(groupMembers.map(u => ({
                    id: u.id,
                    name: u.profile?.nickname || u.profile?.name || 'Usuário',
                    role: u.id === foundGroup.creatorId ? 'Dono' : (foundGroup.adminIds?.includes(u.id) ? 'Admin' : 'Membro'),
                    isMe: u.id === currentUserId,
                    avatar: u.profile?.photoUrl
                })));

                if (foundGroup.settings) {
                    setApproveMembers(foundGroup.settings.approveMembers || false);
                    setOnlyAdminsPost(foundGroup.settings.onlyAdminsPost || false);
                    setMsgSlowMode(foundGroup.settings.msgSlowMode || false);
                    // ... etc ...
                }

                if (foundGroup.isVip) {
                    // ... populando estado do VIP ...
                }
            }
        } catch (error) {
            console.error("Error fetching group data:", error);
            navigate('/groups'); // Navega para longe se o grupo não for encontrado ou houver erro
        } finally {
            setLoading(false);
        }
    }, [groupId, navigate]);

    useEffect(() => {
        setCurrentUserEmail(authService.getCurrentUserEmail());
        fetchGroupData();
    }, [fetchGroupData]);

    const handleSave = async () => {
        if (!group) return;
        
        // Lógica de construção do DTO para a API, como no original
        const updatedGroupData = { /* ... objeto com os dados do formulário ... */ };

        try {
            // Substitui groupService.updateGroup
            const response = await fetch(`${GROUPS_API_URL}/${group.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedGroupData),
            });

            if (!response.ok) throw new Error('Failed to save settings');

            await showAlert('Sucesso', 'Configurações salvas com sucesso!');
        } catch (error) {
            console.error("Error saving group settings:", error);
            await showAlert('Erro', 'Não foi possível salvar as configurações.');
        }
    };

    const handleLeaveDelete = async (type: 'leave' | 'delete') => {
        if (!group) return;
        const msg = type === 'leave' ? 'Sair do grupo?' : 'EXCLUIR GRUPO PERMANENTEMENTE?';
        if (await showConfirm(type === 'leave' ? 'Sair' : 'Excluir', msg)) {
            
            const url = `${GROUPS_API_URL}/${group.id}${type === 'leave' ? '/leave' : ''}`;
            const method = type === 'leave' ? 'POST' : 'DELETE'; // POST para leave, DELETE para remoção completa

            try {
                // Substitui groupService.leaveGroup e groupService.deleteGroup
                const response = await fetch(url, { method });
                if (!response.ok) throw new Error(`Failed to ${type} group`);
                navigate('/groups');
            } catch (error) {
                console.error(`Error on group ${type}:`, error);
                await showAlert('Erro', `Não foi possível ${type === 'leave' ? 'sair do' : 'excluir o'} grupo.`);
            }
        }
    };

    // Retorno do hook com todos os estados e handlers
    return {
        id: groupId, group, loading, isOwner, isAdmin, handleSave, handleLeaveDelete,
        form: {
            groupName, setGroupName, description, setDescription, coverImage, setCoverImage,
            approveMembers, setApproveMembers, pendingRequests, setPendingRequests,
            links, setLinks, onlyAdminsPost, setOnlyAdminsPost,
            msgSlowMode, setMsgSlowMode, msgSlowModeInterval, setMsgSlowModeInterval,
            joinSlowMode, setJoinSlowMode, joinSlowModeInterval, setJoinSlowModeInterval,
            memberLimit, setMemberLimit, forbiddenWords, setForbiddenWords,
            members, setMembers, vipPrice, setVipPrice, vipCurrency, setVipCurrency,
            vipDoorText, setVipDoorText, vipButtonText, setVipButtonText,
            vipMediaItems, setVipMediaItems, pixelId, setPixelId, pixelToken, setPixelToken,
            isSalesPlatformEnabled, setIsSalesPlatformEnabled,
            salesFoldersCount, setSalesFoldersCount
        }
    };
};
