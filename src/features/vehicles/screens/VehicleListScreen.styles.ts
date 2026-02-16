import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl * 2,
  },
  vehicleCard: {
    marginBottom: spacing.md,
  },
  vehicleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  licensePlate: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
    marginVertical: spacing.xs,
  },
  trunkText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  deleteButton: {
    padding: spacing.xs,
  },
  deleteButtonText: {
    color: colors.error,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  emptyText: {
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  emptyButton: {
    width: '60%',
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    color: colors.white,
    fontSize: 40,
    fontWeight: '300',
    marginTop: -4,
  },
});
