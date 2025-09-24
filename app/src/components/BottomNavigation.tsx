import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from '../styles/styles';

interface BottomNavigationProps {
  activeTab: 'home' | 'inventory' | 'account';
  onTabChange: (tab: 'home' | 'inventory' | 'account') => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => (
  <View style={styles.bottomNav}>
    <TouchableOpacity
      style={styles.navButton}
      onPress={() => onTabChange('home')}
    >
      <Icon
        name="home"
        size={24}
        style={[
          styles.navIcon,
          activeTab === 'home' && styles.activeNavIcon,
        ]}
      />
      <Text
        style={[
          styles.navLabel,
          activeTab === 'home' && styles.activeNavLabel,
        ]}
      >
        Inicio
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.navButton}
      onPress={() => onTabChange('inventory')}
    >
      <Icon
        name="package"
        size={24}
        style={[
          styles.navIcon,
          activeTab === 'inventory' && styles.activeNavIcon,
        ]}
      />
      <Text
        style={[
          styles.navLabel,
          activeTab === 'inventory' && styles.activeNavLabel,
        ]}
      >
        Inventario
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.navButton}
      onPress={() => onTabChange('account')}
    >
      <Icon
        name="user"
        size={24}
        style={[
          styles.navIcon,
          activeTab === 'account' && styles.activeNavIcon,
        ]}
      />
      <Text
        style={[
          styles.navLabel,
          activeTab === 'account' && styles.activeNavLabel,
        ]}
      >
        Cuenta
      </Text>
    </TouchableOpacity>
  </View>
);

export default BottomNavigation;