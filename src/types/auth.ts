export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'student';
  phone?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  acceptTerms: boolean;
}