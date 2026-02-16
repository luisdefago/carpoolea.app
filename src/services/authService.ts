import apiClient from './api/apiClient';

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    photoUrl?: string;
    rating: number;
    totalRatings: number;
  };
  token: string;
}

export const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const{ data: response } = await apiClient.post<AuthResponse>('/auth/register', data);
    return response;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const { data: response } = await apiClient.post<AuthResponse>('/auth/login', data);
    return response;
  },
};
