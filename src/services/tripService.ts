import apiClient from './api/apiClient';
import type { Trip, CreateTripDto, SearchTripDto } from '../types/api.types';

export const tripService = {
  /**
   * Search trips
   */
  search: async (params: SearchTripDto = {}): Promise<Trip[]> => {
    const { data } = await apiClient.get<Trip[]>('/trips/search', { params });
    return data;
  },

  /**
   * Create a new trip
   */
  create: async (dto: CreateTripDto): Promise<Trip> => {
    const { data } = await apiClient.post<Trip>('/trips', dto);
    return data;
  },

  /**
   * Get trip by ID
   */
  getById: async (id: number): Promise<Trip> => {
    const { data } = await apiClient.get<Trip>(`/trips/${id}`);
    return data;
  },

  /**
   * Cancel a trip
   */
  cancel: async (id: number): Promise<void> => {
    await apiClient.delete(`/trips/${id}`);
  },
};
