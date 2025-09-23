import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'confirmation' | 'info';
  title: string;
  message?: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  acceptText?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  onConfirm,
  confirmText = "Sí",
  cancelText = "No",
  acceptText = "Aceptar"
}) => {
  const handleConfirm = React.useCallback(() => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  }, [onConfirm, onClose]);

  // Descripción por defecto para accesibilidad
  const defaultDescription = type === 'confirmation' 
    ? "Confirme su decisión seleccionando una opción"
    : "Pulse Aceptar para continuar";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-w-[90vw] mx-auto bg-white rounded-xl border-0 shadow-xl p-6">
        <DialogHeader className="text-center space-y-4">
       {/*   <DialogTitle className="text-gray-900 leading-relaxed">
            {title}
          </DialogTitle> */}
          <DialogTitle className="text-gray-900 leading-relaxed">
             
          </DialogTitle>
          <DialogDescription className="text-gray-900 leading-relaxed text-lg text-center flex justify-center items-center">
            {title || defaultDescription}
          </DialogDescription>
        </DialogHeader>
        
        {type === 'confirmation' ? (
      <div className="grid grid-cols-2 gap-3 mt-6 w-full">
        <Button
          onClick={handleConfirm}
          className="w-full h-12 bg-red-600 hover:bg-red-700 text-white"
        >
          {confirmText}
        </Button>
        <Button
          onClick={onClose}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {cancelText}
        </Button>
      </div>
    ) : (
      <div className="flex justify-center mt-6">
        <Button
          onClick={onClose}
          className="min-w-[150px] h-12 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {acceptText}
        </Button>
      </div>
    )}
      </DialogContent>
    </Dialog>
  );
};