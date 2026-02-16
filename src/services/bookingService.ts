import apiClient from './api/apiClient';
import type { Booking, CreateBookingDto } from '../types/api.types';

export const bookingService = {
  /**
   * Get all user's bookings
   */
  getMyBookings: async (): Promise<Booking[]> => {
    const { data } = await apiClient.get<Booking[]>('/bookings/my-bookings');
    return data;
  },

  /**
   * Request a seat (create booking)
   */
  requestSeat: async (dto: CreateBookingDto): Promise<Booking> => {
    const { data } = await apiClient.post<Booking>('/bookings', dto);
    return data;
  },

  /**
   * Confirm a booking
   */
  confirm: async (id: number): Promise<Booking> => {
    const { data } = await apiClient.patch<Booking>(`/bookings/${id}/confirm`);
    return data;
  },

  /**
   * Reject a booking
   */
  reject: async (id: number): Promise<Booking> => {
    const { data } = await apiClient.patch<Booking>(`/bookings/${id}/reject`);
    return data;
  },

  /**
   * Cancel a booking
   */
  cancel: async (id: number): Promise<void> => {
    await apiClient.delete(`/bookings/${id}`);
  },
};
