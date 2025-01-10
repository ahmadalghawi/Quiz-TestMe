import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginFormData, RegisterFormData } from '../types/auth';
import * as authService from '../services/auth.service';

interface AuthStore {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ user: User; token: string }>;
  register: (data: RegisterFormData) => Promise<{ user: User; token: string }>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      login: async (email: string, password: string) => {
        try {
          set({ loading: true, error: null });
          const result = await authService.login({ email, password });
          set({ 
            user: result.user, 
            token: result.token,
            loading: false 
          });
          return result;
        } catch (error: any) {
          set({
            loading: false,
            error: error.response?.data?.message || 'An error occurred',
          });
          throw error;
        }
      },
      register: async (data: RegisterFormData) => {
        try {
          set({ loading: true, error: null });
          const result = await authService.register(data);
          set({
            loading: false,
            error: null,
          });
          return result;
        } catch (error: any) {
          set({
            loading: false,
            error: error.response?.data?.message || 'Registration failed',
          });
          throw error;
        }
      },
      logout: () => {
        authService.logout();
        set({ user: null, token: null });
      },
      checkAuth: async () => {
        try {
          set({ loading: true });
          const user = await authService.getCurrentUser();
          set({ user, loading: false });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        token: state.token
      }),
    }
  )
);