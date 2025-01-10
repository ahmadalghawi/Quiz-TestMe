import api from './api';
import { User, LoginFormData, RegisterFormData } from '../types/auth';

export const login = async (data: LoginFormData): Promise<{ user: User; token: string }> => {
  const response = await api.post('/auth/login', data);
  const { token, user } = response.data.data;
  return { user, token };
};

export const register = async (data: RegisterFormData): Promise<{ user: User; token: string }> => {
  const response = await api.post('/auth/register', data);
  const { token, user } = response.data.data;
  return { user, token };
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get('/auth/me');
  return response.data.data.user;
};

export const logout = () => {
  // No need to remove from localStorage since we're using Zustand persist
};