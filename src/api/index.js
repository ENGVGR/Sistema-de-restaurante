import axios from 'axios';

const restaurantApi = axios.create({
  baseURL: 'http://localhost:3000',
});

export default restaurantApi;
