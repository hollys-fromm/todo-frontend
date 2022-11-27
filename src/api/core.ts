import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://3.35.173.0',
});

export default instance;
