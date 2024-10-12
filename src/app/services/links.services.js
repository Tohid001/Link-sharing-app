import axios from 'axios';

export const fetchSocialLinks = async (token) => {
    const res = await axios.get('/api/socials/read', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const createSocialLinks = async (newLinks, token) => {
    const res = await axios.post(
        '/api/socials/create',
        { links: newLinks },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};
