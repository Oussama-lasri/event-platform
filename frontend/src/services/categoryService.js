import { apiClient } from "./http";

export const categoryService = {
  getCategories: async () => (await apiClient.get("/categories")).data,
  createCategory: async (payload) => (await apiClient.post("/categories", payload)).data,
};
