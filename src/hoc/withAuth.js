import { useSession } from 'next-auth/react';
import { Flex, Spin } from 'antd';
import { useRouter } from 'next/router';

const WithAuth = (Component) => {
    const WithAuth = (props) => {
        const { status } = useSession({
            required: true,
            onUnauthenticated() {
                router.push('/auth/login');
            },
        });
        const router = useRouter();

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

export default WithAuth;
