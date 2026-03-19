import axios from 'axios';

const PublicApi = axios.create({
    baseURL: 'https://coursebank.onrender.com/api/v1',
    withCredentials: true,
});

export default PublicApi;