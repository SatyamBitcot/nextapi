
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://mern-admin-backend-jxw3.onrender.com/general",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
