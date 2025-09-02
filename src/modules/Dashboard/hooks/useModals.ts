import { useState, useCallback } from 'react';

interface ModalState {
  addTask: boolean;
  viewTask: boolean;
  confirm: boolean;
}

interface ConfirmModalData {
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  confirmClass?: string;
}

export const useModals = () => {
  const [modals, setModals] = useState<ModalState>({
    addTask: false,
    viewTask: false,
    confirm: false
  });

  const [confirmData, setConfirmData] = useState<ConfirmModalData | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const openModal = useCallback((modal: keyof ModalState, taskId?: number) => {
    setModals(prev => ({ ...prev, [modal]: true }));
    if (taskId) setSelectedTaskId(taskId);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback((modal: keyof ModalState) => {
    setModals(prev => ({ ...prev, [modal]: false }));
    if (modal === 'viewTask') setSelectedTaskId(null);
    document.body.style.overflow = 'auto';
  }, []);

  const closeAllModals = useCallback(() => {
    setModals({ addTask: false, viewTask: false, confirm: false });
    setSelectedTaskId(null);
    setConfirmData(null);
    document.body.style.overflow = 'auto';
  }, []);

  const showConfirm = useCallback((data: ConfirmModalData) => {
    setConfirmData(data);
    openModal('confirm');
  }, [openModal]);

  const executeConfirm = useCallback(() => {
    if (confirmData) {
      confirmData.onConfirm();
      setConfirmData(null);
      closeModal('confirm');
    }
  }, [confirmData, closeModal]);

  return {
    modals,
    selectedTaskId,
    confirmData,
    openModal,
    closeModal,
    closeAllModals,
    showConfirm,
    executeConfirm
  };
};
