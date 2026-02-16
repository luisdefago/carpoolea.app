import React, { createContext, useContext, useState, useCallback } from 'react';
import { ConfirmationModal } from '../components/ConfirmationModal/ConfirmationModal';

interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
}

interface ConfirmationContextData {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmationContext = createContext<ConfirmationContextData>({} as ConfirmationContextData);

export const ConfirmationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalState, setModalState] = useState<{
    visible: boolean;
    options: ConfirmOptions;
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setModalState({
        visible: true,
        options,
        resolve,
      });
    });
  }, []);

  const handleConfirm = () => {
    if (modalState) {
      modalState.resolve(true);
      setModalState(null);
    }
  };

  const handleCancel = () => {
    if (modalState) {
      modalState.resolve(false);
      setModalState(null);
    }
  };

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}
      {modalState && (
        <ConfirmationModal
          visible={modalState.visible}
          title={modalState.options.title}
          message={modalState.options.message}
          confirmLabel={modalState.options.confirmLabel}
          cancelLabel={modalState.options.cancelLabel}
          isDestructive={modalState.options.isDestructive}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </ConfirmationContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmationProvider');
  }
  return context;
};
