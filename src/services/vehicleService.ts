import apiClient from './api/apiClient';
import type { Vehicle, CreateVehicleDto } from '../types/api.types';

export const vehicleService = {
  /**
   * Get all user's vehicles
   */
  getMyVehicles: async (): Promise<Vehicle[]> => {
    const { data} = await apiClient.get<Vehicle[]>('/vehicles/my-vehicles');
    return data;
  },

  /**
   * Create a new vehicle
   */
  create: async (dto: CreateVehicleDto): Promise<Vehicle> => {
    const { data } = await apiClient.post<Vehicle>('/vehicles', dto);
    return data;
  },

  /**
   * Update a vehicle
   */
  update: async (id: number, dto: Partial<CreateVehicleDto>): Promise<Vehicle> => {
    const { data } = await apiClient.put<Vehicle>(`/vehicles/${id}`, dto);
    return data;
  },

  /**
   * Check if vehicle has active trips
   */
  checkActiveTrips: async (id: number): Promise<{ hasActiveTrips: boolean; activeTripsCount: number }> => {
    const { data } = await apiClient.get(`/vehicles/${id}/check-active-trips`);
    return data;
  },

  /**
   * Delete a vehicle
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/vehicles/${id}`);
  },
};
