import axios from 'axios';

const serverApi = axios.create({
  baseURL: 'http://localhost:3000/api',  
  timeout: 10000,  
});
export default serverApi;
