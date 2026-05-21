import api from './api';
import type { CreateIssuePayload, UpdateIssuePayload } from '../types/issue.types';

export const issueService = {
  getIssues: async (params?: Record<string, string | number>) => {
    const res = await api.get('/issues', { params });
    return res.data;
  },

  getIssue: async (id: string) => {
    const res = await api.get(`/issues/${id}`);
    return res.data;
  },

  createIssue: async (payload: CreateIssuePayload) => {
    const res = await api.post('/issues', payload);
    return res.data;
  },

  updateIssue: async (id: string, payload: UpdateIssuePayload) => {
    const res = await api.put(`/issues/${id}`, payload);
    return res.data;
  },

  deleteIssue: async (id: string) => {
    const res = await api.delete(`/issues/${id}`);
    return res.data;
  },

  exportIssues: async () => {
    const res = await api.get('/issues/export');
    return res.data;
  },
};