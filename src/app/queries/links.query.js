import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
    createSocialLinks,
    fetchSocialLinks,
} from '../services/links.services';
import { useSession } from 'next-auth/react';
import { message } from 'antd';

export const useFetchSocialLinks = () => {
    const { data: session } = useSession();
    return useQuery({
        queryKey: ['socialLinks'],
        queryFn: () => fetchSocialLinks(session?.accessToken),
    });
};

export const useCreateSocialLinks = () => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    return useMutation({
        mutationFn: (newLinks) =>
            createSocialLinks(newLinks, session?.accessToken),
        onSuccess: () => {
            queryClient.invalidateQueries('socialLinks');
            message.success('Your changes have been successfully saved!');
        },
        onError: (error) => {
            message.error(error.response.data.error);
        },
    });
};
