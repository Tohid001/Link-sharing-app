import axios from 'axios';

export const fetchSocialLinks = async () => {
    const res = await axios.get('/api/socials/read');
    return res.data;
};

export const createSocialLink = async (newLink) => {
    const res = await axios.post('/api/socials/create', newLink);
    return res.data;
};

export const deleteSocialLink = async (platform) => {
    const res = await axios.delete('/api/socials/delete', {
        data: { platform },
    });
    return res.data;
};

export const updateSocialLink = async (link) => {
    const res = await axios.put('/api/socials/update', link);
    return res.data;
};

export const reorderSocialLinks = async (links) => {
    const res = await axios.patch('/api/socials/reorder', {
        socialLinks: links,
    });
    return res.data;
};
