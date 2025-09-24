import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generateTimeOptions } from '../utils/timeUtils';

interface TimePickerModalProps {
  visible: boolean;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  onClose: () => void;
}

const TimePickerModal = ({ visible, selectedTime, onTimeSelect, onClose }: TimePickerModalProps) => (
  <Modal visible={visible} animationType="slide">
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16, flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Seleccione hora</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ color: '#2563EB', fontSize: 18 }}>Cerrar</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {generateTimeOptions().map((time) => (
            <TouchableOpacity
              key={time}
              style={{
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#E5E7EB',
              }}
              onPress={() => {
                onTimeSelect(time);
                onClose();
              }}
            >
              <Text style={{ fontSize: 18 }}>{time}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  </Modal>
);

export default TimePickerModal;