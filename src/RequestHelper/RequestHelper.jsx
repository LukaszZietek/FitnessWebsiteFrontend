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
    const response = await request.get('/api/activity');
    return response;
};

export const deleteActivity = async ({id, token}) => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await request.delete(`/api/activity/${id}`);
    return response;
};

export const addActivity = async ({activityName, slowSpeedMet, mediumSpeedMet, fastSpeedMet, token}) => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await request.post('/api/activity', {name : activityName, slowSpeedMet,
         mediumSpeedMet, fastSpeedMet});
    return response;
};

export const getUserActivities = async (userId, token, activityDate) => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await request.get(`/api/user-activity/GetUserActivitiesFromGivenDate/${userId}?date=${activityDate}`);
    return response;
};

export const getUserActivitiesForTimePeriod = async (userId, token, startDate, endDate) => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await request.get(`/api/user-activity/GetUserActivitiesForTimePeriod/${userId}?` + 
        `startDate=${startDate}&endDate=${endDate}`);
    return response;
};

export const addUserActivity = async ({activityId, activityTime, activitySpeed, burnedCalories, token}) => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await request.post('/api/user-activity', {duration: activityTime, speed: activitySpeed, burnedCalories, activityId});
    return response;
};

export const deleteUserActivity = async ({userActivityId, token}) => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await request.delete(`/api/user-activity/${userActivityId}`);
    return response;
}

export const getMealTypes = async (token) => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await request.get('/api/meal');
    return response;
}

export const getUserMeals = async (userId, token, mealsDate) => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await request.get(`/api/user-meal/GetMealsFromGivenDate/${userId}?date=${mealsDate}`);
    return response;
};

export const getUserMealsForTimePeriod = async (userId, token, startDate, endDate) => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await request.get(`/api/user-meal/GetMealsForTimePeriod/${userId}?` + 
        `startDate=${startDate}&endDate=${endDate}`);
    return response;
};

export const getUserMealTypes = async (userId, token) => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await request.get(`/api/meal/GetAllUserMealTypes/${userId}`);
    return response;
}

export const deleteUserMeal = async ({mealId, token}) => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await request.delete(`/api/user-meal/${mealId}`);
    return response;
};

export const deleteUserMealType = async ({mealTypeId, token}) => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await request.delete(`/api/meal/${mealTypeId}`);
    return response;
};

export const addUserMeal = async ({name, quantity, mealId, token}) => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await request.post('api/user-meal', {name, quantity, mealId});
    return response;
};

export const addUserMealType = async ({name, quantityUnit, caloriesIn100Unit, 
    proteinsIn100Unit, carbohydratesIn100Unit, fatsIn100Unit, token}) =>
    {
        request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await request.post('api/meal', {name, quantityUnit, caloriesIn100Unit, proteinsIn100Unit,
             carbohydratesIn100Unit, fatsIn100Unit});
        return response;
    }

export const registerAccount = async (obj) => {
    const response = await request.post('/api/user/register', obj);
    return response;
};

export const authorizeUser = async (credentials) => {
    const response = await request.post('/api/user/authenticate', credentials);
    return response;
};

export const getUserInfo = async (userId, token) => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await request.get(`/api/user-info/${userId}`);
    return response;
};

export const changeUserPassword = async ({oldPassword, newPassword, token}) => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await request.patch('/api/user/ChangePassword', {oldPassword, newPassword});
    return response;
};

export const updateUserInfo = async ({weight, height, gender, token, userId}) => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await request.patch(`/api/user-info/${userId}`, {id: userId, weight, height, gender});
    return response;
};

export const deleteUser = async (token) => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await request.delete('api/user');
    return response;
};

export const getMessagesFromClient = async (token) => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await request.get('/api/client-message');
    return response;
};

export const getMessage = async ({messageId, token}) => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await request.get(`/api/client-message/${messageId}`);
    return response;
};

export const deleteMessage = async ({messageId, token}) => {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await request.delete(`/api/client-message/${messageId}`);
    return response;
};

export const sendClientMessage = async ({clientName, clientSurname, clientEmail, content}) => {
    const response = await request.post('/api/client-message', {clientName, clientSurname, clientEmail, content});
    return response;
}




