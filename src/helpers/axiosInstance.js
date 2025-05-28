import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Set base URL for your backend
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
 