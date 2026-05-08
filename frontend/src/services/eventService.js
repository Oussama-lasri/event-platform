import { apiClient } from "./http";

export const eventService = {
  getEvents: async (params = {}) => (await apiClient.get("/events", { params })).data,
  getEventById: async (id) => (await apiClient.get(`/events/${id}`)).data,
  createEvent: async (payload) => (await apiClient.post("/events", payload)).data,
  updateEvent: async (id, payload) => (await apiClient.put(`/events/${id}`, payload)).data,
  deleteEvent: async (id) => (await apiClient.delete(`/events/${id}`)).data,
};
