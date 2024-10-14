import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUser, updateUser, registerUSer } from '../services/user.service';
import { useSession } from 'next-auth/react';
import { message } from 'antd';
import { useRouter } from 'next/router';

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

export const useRegisterUser = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: (data) => registerUSer(data),
        onSuccess: () => {
            message.success('Sign up is successfull!');
            router.push('/auth/login');
        },
        onError: (error) => {
            message.error(error.response.data.error);
        },
    });
};
