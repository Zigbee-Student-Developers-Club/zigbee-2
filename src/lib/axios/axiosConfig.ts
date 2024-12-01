
import axios from 'axios';

// Create an Axios instance with default settings
const apiClient = axios.create({   
  baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT}`, 
  timeout: 3000,  
  headers: {
    'Content-Type': 'application/json',
  }
});
export default apiClient;