import axios from 'axios';

const API_URL = 'http://localhost:3001/api/carts';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API request failed:', error);
    throw error;
  }
);

const cartApi = {
  getCart: async (customerId) => {
    try {
      const response = await api.get(`/${customerId}`);
      return response;
    } catch (error) {
      console.error('Error getting cart:', error);
      throw error;
    }
  },

  addToCart: async (customerId, bookId, quantity) => {
    try {
      const response = await api.post(`/${customerId}`, { bookId, quantity });
      return response;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  updateCartItem: async (customerId, bookId, quantity) => {
    try {
      const response = await api.put(`/${customerId}/${bookId}`, { quantity });
      return response;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },

  removeFromCart: async (customerId, bookId) => {
    try {
      const response = await api.delete(`/${customerId}/${bookId}`);
      return response;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },
};

export default cartApi;
