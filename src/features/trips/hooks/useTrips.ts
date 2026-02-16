import { useState, useEffect } from 'react';
import { tripService } from '../../../services/tripService';
import type { Trip, SearchTripDto } from '../../../types/api.types';

export const useTrips = (searchParams?: SearchTripDto) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tripService.search(searchParams);
      setTrips(data);
    } catch (err) {
      setError('Error al cargar los viajes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [JSON.stringify(searchParams)]);

  return {
    trips,
    loading,
    error,
    refetch: fetchTrips,
  };
};
