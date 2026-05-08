import { apiClient } from "./http";

export const dashboardService = {
  getStats: async () => (await apiClient.get("/dashboard")).data,
};
