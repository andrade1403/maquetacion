import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  /* ---------- Medication Icon ---------- */
  medicationIcon: {
    width: 84,
    height: 84,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillShape: {
    width: 40,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'relative',
  },
  pillDivider: {
    position: 'absolute',
    left: '50%',
    top: 0,
    width: 2,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginLeft: -1,
  },

  /* ---------- Cards ---------- */
  nextMedicationCard: {
    backgroundColor: '#E9EBEF',
    borderWidth: 4,
    borderColor: '#2563EB',
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
  },
  medicationCard: {
    backgroundColor: '#E9EBEF',
    borderWidth: 4,
    borderColor: '#2563EB',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },

  /* ---------- Medication Row ---------- */
  medicationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medicationInfo: {
    flex: 1,
    marginLeft: 16,
  },
  medicationName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  medicationDose: {
    fontSize: 20,
    color: '#666',
  },
  medicationTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  medicationQuantity: {
    fontSize: 20,
    color: '#666',
  },
  medicationActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10
},

  /* ---------- List ---------- */
  medicationsList: {
    flex: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },

  /* ---------- Buttons ---------- */
  createButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  editButton: {
    backgroundColor: '#ffffffff',
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  },
  buttonText: {
    color: '#ffffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  alarmButtonContainer: {
    alignItems: 'flex-end',
    paddingTop: 16,
  },
  alarmButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 30,
  },
  alarmButtonText: {
    fontSize: 48,
  },

  /* ---------- Header ---------- */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    borderWidth: 2,
    borderColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 16,
  },
  backButtonText: {
    color: '#2563EB',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },

  /* ---------- Forms ---------- */
  formCard: {
    backgroundColor: '#E9EBEF',
    borderWidth: 4,
    borderColor: '#2563EB',
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
  },
  formSectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  textInput: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    fontSize: 20,
    minHeight: 48,
  },

  /* ---------- Color Palette ---------- */
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#2563EB',
  },
  colorButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkMark: {
    position: 'absolute',
    top: 4,
    right: 4,
    color: '#FFF',
    fontSize: 20,
  },

  /* ---------- Action Buttons ---------- */
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelActionButton: {
    backgroundColor: '#DC2626',
  },
  saveActionButton: {
    backgroundColor: '#2563EB',
  },

  /* ---------- Inventory ---------- */
  screenTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
  },
  inventoryCard: {
    backgroundColor: '#E9EBEF',
    borderWidth: 4,
    borderColor: '#2563EB',
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
  },
  stockInfo: {
    fontSize: 20,
    color: '#000',
  },
  progressSection: {
    marginTop: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  progressPercentage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  progressBar: {
    width: '100%',
    height: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 8,
  },
  lowStockWarning: {
    backgroundColor: '#FEF3C7',
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
  },
  warningText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  restockButton: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  /* ---------- Account ---------- */
  adherenceCard: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  adherenceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  adherencePercentage: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  adherenceSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  progressCard: {
    backgroundColor: '#E9EBEF',
    borderWidth: 4,
    borderColor: '#2563EB',
    borderRadius: 10,
    padding: 24,
    marginBottom: 24,
  },
  progressCardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  dailyProgress: {
    gap: 12,
  },
  dailyProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  dayLabel: {
    width: 48,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  dailyProgressBar: {
    flex: 1,
    height: 24,
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  dailyProgressFill: {
    height: '100%',
    borderRadius: 12,
  },
  progressText: {
    width: 64,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  statsContainer: {
    marginBottom: 32,
  },
  statsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  successStat: {
    backgroundColor: '#10B981',
  },
  errorStat: {
    backgroundColor: '#DC2626',
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
  },
  statLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },

  /* ---------- Confirm ---------- */
  confirmContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
    padding: 24
  },
  confirmCard: {
    backgroundColor: '#E9EBEF',
    borderWidth: 4,
    borderColor: '#2563EB',
    borderRadius: 10,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    height: '95%',
  },
  confirmIcon: {
    width: 168,
    height: 168,
    backgroundColor: '#2563EB',
    borderRadius: 88,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  confirmMedicationIcon: {
    backgroundColor: '#2563EB',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '135deg' }],
  },
  confirmTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#000',
  },
  confirmMedicationName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  confirmQuantity: {
    fontSize: 20,
    color: '#666',
  },
  confirmTime: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2563EB',
    marginTop: 16,
    marginBottom: 32,
  },
  confirmActions: {
    width: '100%',
    gap: 16,
  },
  confirmButtonAlarm: {
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 43
  },
  confirmTakeButton: {
    backgroundColor: '#10B981',
  },
  postponeButton: {
    backgroundColor: '#FFCC00',
  },

  /* ---------- Modal ---------- */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderWidth: 4,
    borderColor: '#2563EB',
    borderRadius: 20,
    padding: 24,
    maxWidth: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#000',
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#DC2626',
  },
  confirmButton: {
    backgroundColor: '#2563EB',
  },

  /* ---------- Bottom Navigation ---------- */
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderTopWidth: 1,
    borderTopColor: '#D1D5DB',
    paddingVertical: 8,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeNavButton: {
    backgroundColor: '#2563EB',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },

  /* ---------- Restock Screen ---------- */
  restockCard: {
    backgroundColor: '#E9EBEF',
    borderWidth: 4,
    borderColor: '#2563EB',
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
  },
  restockCardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  totalToAddContainer: {
    backgroundColor: '#DBEAFE',
    borderWidth: 2,
    borderColor: '#93C5FD',
    borderRadius: 10,
    padding: 16,
  },
  totalToAddText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  totalToAddNumber: {
    color: '#2563EB',
  },
});
