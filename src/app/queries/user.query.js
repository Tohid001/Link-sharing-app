import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchUser, updateUser } from '../services/user.service';
import { useSession } from 'next-auth/react';
import { message } from 'antd';

export const useFetchUser = ({ userId } = {}) => {
    const { data: session } = useSession();
    return useQuery({
        queryKey: ['user'],
        queryFn: () =>
            fetchUser({
                userId,
                ignoreToken: Boolean(userId),
                token: session?.accessToken,
            }),
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    return useMutation({
        mutationFn: (data) => updateUser(data, session?.accessToken),
        onSuccess: () => {
            queryClient.invalidateQueries('user');
            message.success('Your changes have been successfully saved!');
        },
        onError: (error) => {
            message.error(error.response.data.error);
        },
    });
};
