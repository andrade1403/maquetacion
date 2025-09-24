import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { styles } from '../styles/styles';

const AccountScreen = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.screenTitle}>Mi Cuenta</Text>

    <View style={styles.adherenceCard}>
      <Text style={styles.adherenceTitle}>Seguimiento de tu adherencia</Text>
      <Text style={styles.adherencePercentage}>90%</Text>
      <Text style={styles.adherenceSubtitle}>¡Muy Bien! Excelente adherencia esta semana</Text>
    </View>

    <View style={styles.progressCard}>
      <Text style={styles.progressCardTitle}>Progreso Diario</Text>
      <View style={styles.dailyProgress}>
        {[
          { day: 'Lun', progress: 100 },
          { day: 'Mar', progress: 100 },
          { day: 'Mié', progress: 100 },
          { day: 'Jue', progress: 100 },
          { day: 'Vie', progress: 100 },
          { day: 'Sáb', progress: 25 },
          { day: 'Dom', progress: 75 },
        ].map((item) => (
          <View key={item.day} style={styles.dailyProgressRow}>
            <Text style={styles.dayLabel}>{item.day}</Text>
            <View style={styles.dailyProgressBar}>
              <View
                style={[
                  styles.dailyProgressFill,
                  {
                    width: `${item.progress}%`,
                    backgroundColor: item.progress === 100 ? '#10B981' : item.progress >= 75 ? '#F59E0B' : '#DC2626',
                  },
                ]}
              />
            </View>
            <Text
              style={[
                styles.progressText,
                {
                  color: item.progress === 100 ? '#10B981' : item.progress >= 75 ? '#F59E0B' : '#DC2626',
                },
              ]}
            >
              {item.progress}%
            </Text>
          </View>
        ))}
      </View>
    </View>

    <View style={styles.statsContainer}>
      <Text style={styles.statsTitle}>Estadísticas Mensuales</Text>
      <View style={styles.statsRow}>
        <View style={[styles.statCard, styles.successStat]}>
          <Text style={styles.statNumber}>27</Text>
          <Text style={styles.statLabel}>Días tomados</Text>
        </View>
        <View style={[styles.statCard, styles.errorStat]}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Días perdidos</Text>
        </View>
      </View>
    </View>
  </ScrollView>
);

export default AccountScreen;