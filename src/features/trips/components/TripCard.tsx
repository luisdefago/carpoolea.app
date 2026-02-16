import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../../components';
import { colors, spacing, typography } from '../../../constants';
import type { Trip } from '../../../types/api.types';

interface TripCardProps {
  trip: Trip;
  onPress?: () => void;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, onPress }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-UY', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price: number) => {
    return `$${price}`;
  };

  return (
    <Card style={styles.container} padding="md">
      <View style={styles.header}>
        <View style={styles.route}>
          <Text style={styles.city}>{trip.originCity}</Text>
          <Text style={styles.arrow}>→</Text>
          <Text style={styles.city}>{trip.destinationCity}</Text>
        </View>
        <Text style={styles.price}>{formatPrice(trip.pricePerSeat)}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.detailText}>
          🕐 {formatDate(trip.departureTime)}
        </Text>
        <Text style={styles.detailText}>
          💺 {trip.availableSeats} asientos disponibles
        </Text>
      </View>

      {trip.driver && (
        <View style={styles.driver}>
          <Text style={styles.driverName}>
            {trip.driver.firstName} {trip.driver.lastName}
          </Text>
          <Text style={styles.rating}>
            ⭐ {trip.driver.totalRatings && trip.driver.totalRatings > 0 
                ? (trip.driver.rating / trip.driver.totalRatings).toFixed(1) 
                : 'Sin calificar'}
          </Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  route: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  city: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  arrow: {
    fontSize: typography.fontSize.lg,
    color: colors.primary,
    marginHorizontal: spacing.sm,
  },
  price: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  details: {
    marginBottom: spacing.sm,
  },
  detailText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  driver: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  driverName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  rating: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
});
