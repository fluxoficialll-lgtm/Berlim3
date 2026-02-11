
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contact } from '@/types';
import { API_BASE } from '@/apiConfig';

export const useMessageList = () => {
  const navigate = useNavigate();

  // Estado dos dados
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado do modo de seleção
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  /**
   * ✅ ARQUITETURA NOVA: Lógica de busca de dados centralizada.
   */
  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/chats`);
      if (!response.ok) throw new Error('Falha ao carregar conversas.');
      const data: Contact[] = await response.json();
      setContacts(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // =========================================================
  // Handlers (Ações)
  // =========================================================

  const toggleSelection = (contactId: string) => {
    const newSelectedIds = selectedIds.includes(contactId)
      ? selectedIds.filter(id => id !== contactId)
      : [...selectedIds, contactId];

    setSelectedIds(newSelectedIds);
    if (newSelectedIds.length === 0) {
      setIsSelectionMode(false);
    }
  };

  const startSelection = (contactId: string) => {
    if (!isSelectionMode) {
        setIsSelectionMode(true);
        setSelectedIds([contactId]);
    }
  };

  const handleContactClick = (contact: Contact) => {
    if (isSelectionMode) {
      toggleSelection(contact.id);
    } else {
      navigate(`/chat/${contact.id}`);
    }
  };

  const exitSelectionMode = () => {
    setIsSelectionMode(false);
    setSelectedIds([]);
  };

  const deleteSelected = async () => {
    setContacts(prev => prev.filter(c => !selectedIds.includes(c.id)));
    exitSelectionMode();
    try {
        await fetch(`${API_BASE}/api/chats`, {
            method: 'DELETE',
            body: JSON.stringify({ chatIds: selectedIds }),
        });
    } catch (err) {
        setError('Falha ao deletar as conversas. Tente novamente.');
        fetchContacts(); // Recarrega para restaurar o estado
    }
  };

  return {
    contacts,
    isLoading,
    error,
    isSelectionMode,
    selectedIds,
    startSelection,
    handleContactClick,
    exitSelectionMode,
    deleteSelected,
  };
};
