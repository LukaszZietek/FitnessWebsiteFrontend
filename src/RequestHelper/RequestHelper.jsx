import axios from 'axios';

const request = axios.create({
    baseURL: 'https://localhost:44323',
    validateStatus: false,
    headers: {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-Type': 'application/json'
    }
});

export const getActivities = async () => {
    const {data} = await request.get('/api/activity');
    return data;
};

export const deleteActivity = async (id) => {
    const response = await request.delete(`/api/activity/${id}`);
    return response;
}

export const registerAccount = async (obj) => {
    const response = await request.post('/api/user/register', obj);
    return response;
}

export const authorizeUser = async (credentials) => {
    const response = await request.post('api/user/authenticate', credentials);
    return response;
}


