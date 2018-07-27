import axios from 'axios';

export default axios.create({
  baseURL: process.env.BACKEND_HOST,
  withCredentials: true,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json'
  }
});