import apiClient from './api/apiClient';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  photoUrl?: string;
  rating: number;
  totalRatings: number;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
}

export const userService = {
  getProfile: async (): Promise<User> => {
    const { data } = await apiClient.get<User>('/users/me');
    return data;
  },

  updateProfile: async (data: UpdateProfileData): Promise<User> => {
    const { data: response } = await apiClient.patch<User>('/users/me', data);
    return response;
  },

  searchByName: async (name: string): Promise<User[]> => {
    const { data } = await apiClient.get<User[]>('/users/search', { params: { name } });
    return data;
  },
};
