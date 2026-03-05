import { api } from "../../lib/axios";
import { handleError } from "../../lib/error.handler";
import { CreatePatient, Patient, UpdatePatient } from "../../types/patient/patient.types";

export const patientService = {
  // Get All Data
  getAll: async (params?: { page?: number; limit?: number }) => {
    try {
      const response = await api.get<Patient[]>(`/patient`, { params });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Get By Id one
  getById: async (id?: string) => {
    try {
      const response = await api.get<Patient>(`/patient/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Create
  create: async (data?: CreatePatient) => {
    try {
      const response = await api.post<Patient>(`/patient`, data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Update
  update: async (id?: string, data?: UpdatePatient) => {
    try {
      const response = await api.put<Patient>(`/patient,${id}`, data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Delete
  delete: async (id?: string) => {
    try {
      const response = await api.delete<Patient>(`/patient/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};
