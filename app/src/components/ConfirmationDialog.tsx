import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

interface ConfirmationDialogProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationDialog = ({
  visible,
  onClose: _onClose,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = 'Sí',
  cancelText = 'No',
}: ConfirmationDialogProps) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{title}</Text>
        {/* <Text style={styles.modalDescription}>{description}</Text> */}
        <View style={styles.modalButtons}>
          <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onCancel}>
            <Text style={styles.buttonText}>{cancelText}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={onConfirm}>
            <Text style={styles.buttonText}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default ConfirmationDialog;