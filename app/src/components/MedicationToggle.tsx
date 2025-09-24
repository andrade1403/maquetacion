import React, { useState } from 'react';
import { View, Switch } from 'react-native';

const MedicationToggle = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View>
      <Switch
        value={isEnabled}
        onValueChange={() => setIsEnabled(!isEnabled)}
        trackColor={{ false: "#b0b1b3ff", true: "#2563EB" }}
        thumbColor={isEnabled ? "#FFFFFF" : "#626262"}
      />
    </View>
  );
};

export default MedicationToggle;