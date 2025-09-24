import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

const NotificationOptions = () => {
  const [selected, setSelected] = useState("voz");

  const options = [
    { key: "voz", title: "Voz familiar", subtitle: "Grabación personalizada" },
    { key: "sonido", title: "Sonido suave", subtitle: "Melodía relajante" },
    { key: "vibracion", title: "Vibración", subtitle: "Solo vibrar" },
  ];

  return (
    <View style={styles.containerRadio}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.key}
          style={styles.option}
          onPress={() => setSelected(option.key)}
        >
          <View style={styles.radioOuter}>
            {selected === option.key && <View style={styles.radioInner} />}
          </View>
          <View>
            <Text style={styles.title}>{option.title}</Text>
            <Text style={styles.subtitle}>{option.subtitle}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default NotificationOptions;