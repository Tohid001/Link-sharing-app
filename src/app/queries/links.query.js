import { useQuery, useMutation } from '@tanstack/react-query';

import {
    createSocialLink,
    deleteSocialLink,
    updateSocialLink,
    reorderSocialLinks,
    fetchSocialLinks,
} from '../services/links.services';

export const useFetchSocialLinks = () => {
    return useQuery({
        queryKey: ['socialLinks'],
        queryFn: fetchSocialLinks,
    });
};

export const useCreateSocialLink = () => {
    const queryClient = useQueryClient();

    return useMutation(createSocialLink, {
        onSuccess: () => {
            queryClient.invalidateQueries('socialLinks');
        },
    });
};

export const useDeleteSocialLink = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteSocialLink, {
        onSuccess: () => {
            queryClient.invalidateQueries('socialLinks');
        },
    });
};

export const useUpdateSocialLink = () => {
    const queryClient = useQueryClient();

    return useMutation(updateSocialLink, {
        onSuccess: () => {
            queryClient.invalidateQueries('socialLinks');
        },
    });
};

export const useReorderSocialLinks = () => {
    const queryClient = useQueryClient();

    return useMutation(reorderSocialLinks, {
        onSuccess: () => {
            queryClient.invalidateQueries('socialLinks');
        },
    });
};
