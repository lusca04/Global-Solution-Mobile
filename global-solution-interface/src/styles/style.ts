import { StyleSheet } from 'react-native';

export const colors = {
  background: '#0D0D0D',
  card: '#1A1A1A',
  orange: '#FF6B00',
  orangeLight: '#FF8C42',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: '#2A2A2A',
  danger: '#FF3B30',
  success: '#32D74B',
  warning: '#FF9F0A',
};

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },

  screenContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.orange,
  },

  backButton: {
    fontSize: 18,
    color: colors.orange,
    marginRight: 10,
    fontWeight: '700',
  },

  addButton: {
    backgroundColor: colors.orange,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginLeft: 'auto',

    shadowColor: colors.orange,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },

  addButtonText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 14,
  },

  screenTitle: {
    fontSize: 22,
    alignItems: 'center',
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },

  title: {
    fontSize: 34,
    alignItems: 'center',
    fontWeight: 'bold',
    color: colors.orange,
    marginBottom: 10,
    letterSpacing: 1,
  },

  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 40,
  },

  menuButton: {
    backgroundColor: colors.card,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 14,
    minWidth: 280,
    borderWidth: 1,
    borderColor: colors.orange,

    shadowColor: colors.orange,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  menuButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },

  card: {
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 18,
    marginVertical: 10,
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: colors.orange,
    borderWidth: 1,
    borderColor: colors.border,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.orange,
    marginBottom: 10,
  },

  cardText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginVertical: 4,
  },

  status: {
    fontSize: 14,
    fontWeight: '700',
    marginVertical: 8,
  },

  loader: {
    marginTop: 20,
  },

  deleteButton: {
    backgroundColor: colors.danger,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 14,
  },

  deleteButtonText: {
    color: colors.text,
    fontWeight: '700',
    textAlign: 'center',
  },

  resolveButton: {
    backgroundColor: colors.success,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 14,
  },

  resolveButtonText: {
    color: colors.text,
    fontWeight: '700',
    textAlign: 'center',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 20,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.orange,
  },

  closeButton: {
    fontSize: 18,
    color: colors.orange,
    fontWeight: '700',
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },

  form: {
    padding: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.orange,
    marginBottom: 8,
    marginTop: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: '#121212',
    color: colors.text,
    marginBottom: 10,
  },

  picker: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#121212',
    overflow: 'hidden',
  },

  submitButton: {
    backgroundColor: colors.orange,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 28,
    alignItems: 'center',

    shadowColor: colors.orange,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },

  submitButtonText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 16,
  },
});

export default styles;