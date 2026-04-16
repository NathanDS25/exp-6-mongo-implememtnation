import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/contacts`;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT || 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Contact API functions
export const contactAPI = {
  // Get all contacts
  getAllContacts: async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get single contact
  getContact: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create contact
  createContact: async (contactData) => {
    try {
      const response = await api.post('/', contactData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update contact
  updateContact: async (id, contactData) => {
    try {
      const response = await api.put(`/${id}`, contactData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete contact
  deleteContact: async (id) => {
    try {
      const response = await api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Search contacts
  searchContacts: async (query) => {
    try {
      const response = await api.get(`/search/query?q=${query}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default api;
