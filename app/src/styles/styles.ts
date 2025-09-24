import { StyleSheet, Dimensions } from 'react-native';

// const { width } = Dimensions.get('window'); // Commented out as it's not used

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
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillShape: {
    width: 40,
    height: 24,
    borderRadius: 10,
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
    borderWidth: 2,
    borderColor: '#2563EB',
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
  },
  medicationCard: {
    backgroundColor: '#E9EBEF',
    borderWidth: 2,
    borderColor: '#2563EB',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 28,
    marginBottom: 12,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
  },

  /* ---------- Medication Row ---------- */
  medicationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medicationInfo: {
    flex: 1,
    marginLeft: 10,
  },
  medicationName: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'InriaSans-Bold',
  },
  medicationDose: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'InriaSans-Bold',
  },
  medicationTime: {
    fontSize: 16,
    color: '#2563EB',
    fontFamily: 'InriaSans-Bold',
  },
  medicationQuantity: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'InriaSans-Regular',
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
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
  },

  /* ---------- Buttons ---------- */
  createButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
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
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
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
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
  },

  /* ---------- Header ---------- */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#E9EBEF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 16,
  },
  backButtonText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
  },
  headerTitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
  },

  /* ---------- Forms ---------- */
  formCard: {
    backgroundColor: '#E9EBEF',
    borderWidth: 1,
    borderColor: '#2563EB',
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
  },
  formSectionTitle: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 8,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
  },
  textInput: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    minHeight: 48,
    fontFamily: 'InriaSans-Regular',
  },

  /* ---------- Color Palette ---------- */
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
},
  colorButton: {
    flexBasis: '45%',       
    maxWidth: '45%',
    margin: 5,               
    paddingVertical: 15,     
    borderRadius: 12,
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
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
  },
  checkMark: {
    position: 'absolute',
    top: 4,
    right: 4,
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
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
    fontSize: 28,
    marginBottom: 24,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
  },
  inventoryCard: {
    backgroundColor: '#E9EBEF',
    borderWidth: 1,
    borderColor: '#2563EB',
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
  },
  stockInfo: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'InriaSans-Regular',
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
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
  },
  progressPercentage: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
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
    backgroundColor: '#FFCC00',
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
  },
  warningText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
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
    fontSize: 20,
    color: '#FFF',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'InriaSans-Bold',
  },
  adherencePercentage: {
    fontSize: 36,
    color: '#FFF',
    marginBottom: 8,
    fontFamily: 'InriaSans-Bold',
  },
  adherenceSubtitle: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'InriaSans-Regular',
  },
  progressCard: {
    backgroundColor: '#E9EBEF',
    borderWidth: 1,
    borderColor: '#2563EB',
    borderRadius: 10,
    padding: 10,
    marginBottom: 24,
  },
  progressCardTitle: {
    fontSize: 20,
    marginBottom: 16,
    color: '#000',
    fontFamily: 'InriaSans-Bold',
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
    color: '#000',
    fontFamily: 'InriaSans-Bold',
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
    textAlign: 'right',
    fontFamily: 'InriaSans-Regular',
  },
  statsContainer: {
    marginBottom: 32,
  },
  statsTitle: {
    fontSize: 20,
    marginBottom: 16,
    color: '#000',
    fontFamily: 'InriaSans-Bold',
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
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
  },
  statLabel: {
    fontSize: 20,
    color: '#FFF',
    fontFamily: 'InriaSans-Regular',
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
    borderWidth: 1,
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
    fontSize: 22,
    marginBottom: 8,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
  },
  confirmMedicationName: {
    fontSize: 20,
    marginBottom: 8,
    color: '#000',
    fontFamily: 'InriaSans-Regular',
  },
  confirmQuantity: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'InriaSans-Regular',
  },
  confirmTime: {
    fontSize: 22,
    color: '#2563EB',
    marginTop: 16,
    marginBottom: 32,
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
  },
  confirmActions: {
    width: '100%',
    gap: 16,
  },
  confirmButtonAlarm: {
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
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
    backgroundColor: '#E9EBEF',
    borderWidth: 1,
    borderColor: '#2563EB',
    borderRadius: 10,
    padding: 24,
    maxWidth: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
    fontFamily: 'InriaSans-Regular',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
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
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
    color: '#6B7280',
  },
  navLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'InriaSans-Regular',
  },
  activeNavIcon: {
    color: '#2563EB',
  },
  activeNavLabel: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
  },

  /* ---------- Restock Screen ---------- */
  restockCard: {
    backgroundColor: '#E9EBEF',
    borderWidth: 1,
    borderColor: '#2563EB',
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
  },
  restockCardTitle: {
    fontSize: 20,
    marginBottom: 16,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
  },
  totalToAddContainer: {
    backgroundColor: '#2563EB',
    borderWidth: 2,
    borderColor: '#2563EB',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  totalToAddText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
  },
  totalToAddNumber: {
    color: '#FFFFFF',
    fontFamily: 'InriaSans-Regular',
  },

  /* ---------- Radio buttons ---------- */
  containerRadio: {
    padding: 5,
    backgroundColor: '#E9EBEF',
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2563EB",
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'InriaSans-Bold',
  },
  description: {
    fontSize: 16,
    color: "#6B7280",
    fontFamily: 'InriaSans-Regular',
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    fontFamily: 'InriaSans-Regular',
  }
});
