import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Flex, Spin } from 'antd';
import { useRouter } from 'next/router';

const withAuth = (Component) => {
    const WithAuth = (props) => {
        const { data: session, status } = useSession();
        const router = useRouter();

        useEffect(() => {
            if (status === 'unauthenticated') {
                router.push('/auth/login');
            }
        }, [status]);

        if (status === 'loading')
            return (
                <Flex
                    align="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Spin size="large" />
                </Flex>
            );

        return <Component {...props} />;
    };
    return WithAuth;
};

export default withAuth;
