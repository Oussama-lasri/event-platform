import { apiClient } from "./http";

export const userService = {
  getUsers: async () => (await apiClient.get("/users")).data,
  deleteUser: async (id) => (await apiClient.delete(`/users/${id}`)).data,
  getProfile: async () => (await apiClient.get("/users/profile")).data,
  updateProfile: async (payload) => (await apiClient.put("/users/profile", payload)).data,
  changePassword: async (payload) => (await apiClient.put("/users/change-password", payload)).data,
};
