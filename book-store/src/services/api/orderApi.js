import axios from 'axios';

const API_URL = 'http://localhost:3001/api/orders';

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

const orderApi = {
  // Lấy thông tin đơn hàng theo ID
  getOrderById: async (orderId) => {
    try {
      const response = await api.get(`/${orderId}`);
      return response;
    } catch (error) {
      console.error('Error getting order by ID:', error);
      throw error;
    }
  },

  // Tạo đơn hàng mới
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/', orderData);
      return response;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Cập nhật trạng thái của đơn hàng
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await api.put(`/${orderId}`, { status });
      return response;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // Xóa đơn hàng
  deleteOrder: async (orderId) => {
    try {
      const response = await api.delete(`/${orderId}`);
      return response;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  },
};

export default orderApi;
