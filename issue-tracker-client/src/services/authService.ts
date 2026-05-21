import api from './api';
import type { LoginPayload, RegisterPayload } from '../types/auth.types';

export const authService = {
  register: async (payload: RegisterPayload) => {
    const res = await api.post('/auth/register', payload);
    return res.data;
  },
  login: async (payload: LoginPayload) => {
    const res = await api.post('/auth/login', payload);
    return res.data;
  },
};