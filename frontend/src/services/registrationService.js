import { apiClient } from "./http";

export const registrationService = {
  registerToEvent: async (eventId) => (await apiClient.post("/registrations", { eventId })).data,
  cancelRegistration: async (registrationId) =>
    (await apiClient.delete(`/registrations/${registrationId}`)).data,
};
