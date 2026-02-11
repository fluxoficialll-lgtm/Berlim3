import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { Group, VipMediaItem, PaymentProviderConfig } from '@/types';
import { CurrencyType } from '@/components/groups/CurrencySelectorModal';
import { GATEWAY_CURRENCIES, DEFAULT_CURRENCY_FOR_GATEWAY } from '@/services/gatewayConfig';
import { generateUniqueId } from '@/utils/idGenerator';
import { API_BASE } from '@/apiConfig';

// ✅ ARQUITETURA NOVA: As chamadas de API foram movidas para dentro do hook.
const API_UPLOAD_URL = `${API_BASE}/api/upload`;
const API_GROUPS_URL = `${API_BASE}/groups`;

export const useCreateVipGroup = () => {
  const navigate = useNavigate();
  
  // ... (todos os useState e outros hooks permanecem os mesmos)
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState<string | undefined>(undefined);
  const [selectedCoverFile, setSelectedCoverFile] = useState<File | null>(null);
  const [vipMediaItems, setVipMediaItems] = useState<{file?: File, url: string, type: 'image' | 'video'}[]>([]);
  const [vipDoorText, setVipDoorText] = useState('');
  const [vipButtonText, setVipButtonText] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState<CurrencyType>('BRL');
  const [accessType, setAccessType] = useState<'lifetime' | 'temporary' | 'one_time'>('lifetime');
  const [accessConfig, setAccessConfig] = useState<any>(null);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);
  const [pixelId, setPixelId] = useState('');
  const [pixelToken, setPixelToken] = useState('');
  const [isPixelModalOpen, setIsPixelModalOpen] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [rawImage, setRawImage] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);
  const [hasProvider, setHasProvider] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadCurrent, setUploadCurrent] = useState(0);
  const [uploadTotal, setUploadTotal] = useState(0);

  // ... (useEffect e a maior parte das funções permanecem as mesmas)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating || isUploading) return;

    if (!selectedProviderId) {
        alert("⚠️ Selecione um provedor de pagamento para continuar.");
        setIsProviderModalOpen(true);
        return;
    }

    const rawPrice = price.replace(/\./g, '').replace(',', '.');
    const numericPrice = parseFloat(rawPrice);
    if (isNaN(numericPrice) || numericPrice < 6.00) {
        alert("⚠️ O preço mínimo para criar um grupo VIP é R$ 6,00.");
        return;
    }

    setIsCreating(true);
    setIsUploading(true);
    
    // --- Início da Lógica Refatorada ---
    try {
        const currentUserId = authService.getCurrentUserId();
        const currentUserEmail = authService.getCurrentUserEmail();
        
        const totalToUpload = vipMediaItems.filter(i => i.file).length + (selectedCoverFile ? 1 : 0);
        setUploadTotal(totalToUpload);
        setUploadCurrent(0);
        setUploadProgress(0);

        // Função de upload que substitui postService.uploadMedia
        const uploadMedia = async (file: File, folder: string): Promise<string> => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', folder);
            const res = await fetch(API_UPLOAD_URL, { method: 'POST', body: formData });
            if (!res.ok) throw new Error(`Upload failed for folder: ${folder}`);
            const data = await res.json();
            if (!data.files || !data.files[0] || !data.files[0].url) {
                throw new Error('Invalid response from upload API');
            }
            return data.files[0].url;
        };

        let finalCoverUrl = coverImage;
        if (selectedCoverFile) {
            setUploadCurrent(prev => prev + 1);
            finalCoverUrl = await uploadMedia(selectedCoverFile, 'avatars');
            setUploadProgress(Math.round((1 / totalToUpload) * 100));
        }

        const uploadedVipMedia: VipMediaItem[] = [];
        const filesToUpload = vipMediaItems.filter(i => i.file);
        const staticItems = vipMediaItems.filter(i => !i.file);

        let uploadedCount = selectedCoverFile ? 1 : 0;

        for (const item of filesToUpload) {
            uploadedCount++;
            setUploadCurrent(uploadedCount);
            const url = await uploadMedia(item.file!, 'vips_doors');
            uploadedVipMedia.push({ url, type: item.type });
            setUploadProgress(Math.round((uploadedCount / totalToUpload) * 100));
        }

        const finalMediaGallery = [...staticItems.map(i => ({ url: i.url, type: i.type })), ...uploadedVipMedia];

        let expirationValue = undefined;
        if (accessType === 'temporary') expirationValue = accessConfig?.interval;
        else if (accessType === 'one_time') expirationValue = `${accessConfig?.days}d${accessConfig?.hours}h`;

        const newGroup: Omit<Group, 'id' | 'created_at' | 'updated_at'> = {
          name: groupName,
          description: description,
          coverImage: finalCoverUrl,
          isVip: true,
          price: numericPrice.toString(),
          currency: currency as any,
          accessType: accessType,
          selectedProviderId: selectedProviderId,
          expirationDate: expirationValue,
          vipDoor: {
            mediaItems: finalMediaGallery,
            text: vipDoorText || "Bem-vindo ao VIP!",
            buttonText: vipButtonText
          },
          lastMessage: "Grupo criado. Configure os conteúdos.",
          time: "Agora",
          creatorId: currentUserId || '',
          creatorEmail: currentUserEmail || undefined,
          memberIds: currentUserId ? [currentUserId] : [],
          adminIds: currentUserId ? [currentUserId] : [],
          status: 'active',
          pixelId: pixelId || undefined,
          pixelToken: pixelToken || undefined
        };

        // Substitui groupService.createGroup
        await fetch(`${API_GROUPS_URL}/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newGroup)
        });
        
        setTimeout(() => {
            setIsUploading(false);
            navigate('/groups', { replace: true });
        }, 800);
        
    } catch (e) {
        console.error("Error creating VIP group:", e);
        alert("Erro ao criar grupo VIP.");
        setIsCreating(false);
        setIsUploading(false);
    }
    // --- Fim da Lógica Refatorada ---
  };

  // ... (o resto das funções permanece igual)

  return { /* ... mesmo retorno de antes ... */ };
};
