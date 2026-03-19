import axios from 'axios';

const PrivateApi = axios.create({
    baseURL: 'https://coursebank.onrender.com/api/v1',
    withCredentials: true,
});

export default PrivateApi;