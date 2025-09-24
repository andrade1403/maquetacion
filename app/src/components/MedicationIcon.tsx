import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles/styles';

interface MedicationIconProps {
  type: string;
  style?: any;
}

const MedicationIcon = ({ type, style }: MedicationIconProps) => {
  const getIconColor = () => {
    switch (type) {
      case 'red':
        return '#DC2626';
      case 'blue':
        return '#2563EB';
      case 'green':
        return '#10B981';
      case 'gray':
        return '#626262';
      default:
        return '#DC2626';
    }
  };

  return (
    <View style={[styles.medicationIcon, { backgroundColor: getIconColor() }, style]}>
      <View style={styles.pillShape}>
        <View style={styles.pillDivider} />
      </View>
    </View>
  );
};

export default MedicationIcon;