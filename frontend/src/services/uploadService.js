import { apiClient } from "./http";

export const uploadService = {
  uploadEventImage: async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return (await apiClient.post("/uploads/image", formData, { headers: { "Content-Type": "multipart/form-data" } }))
      .data;
  },
};
