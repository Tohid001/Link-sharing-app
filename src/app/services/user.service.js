import axios from 'axios';

export const fetchUser = async ({ token, userId, ignoreToken }) => {
    const res = await axios.get(
        `/api/user/getUser?userId=${ignoreToken ? userId : ''}`,
        {
            headers: {
                ...(!ignoreToken && { Authorization: `Bearer ${token}` }),
            },
        }
    );
    return res.data;
};

export const updateUser = async (data, token) => {
    const res = await axios.put('/api/user/updateUser', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};
