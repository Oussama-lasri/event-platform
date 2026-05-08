import { apiClient } from "./http";

export const authService = {
  register: async (payload) => (await apiClient.post("/auth/register", payload)).data,
  login: async (payload) => (await apiClient.post("/auth/login", payload)).data,
  forgotPassword: async (payload) =>
    (await apiClient.post("/auth/forgot-password", payload)).data,
  resetPassword: async (payload) => (await apiClient.post("/auth/reset-password", payload)).data,
};
