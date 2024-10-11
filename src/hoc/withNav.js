import { Layout } from 'antd';
import Nav from '@/modules/Editor/components/Nav';

const withNav = (Component) => {
    const withNav = (props) => {
        return (
            <>
                <Layout.Header>
                    <Nav />
                </Layout.Header>

                <Layout.Content
                // style={{ marginTop: '16px', padding: '0 48px' }}
                >
                    <Component {...props} />
                </Layout.Content>
            </>
        );
    };

    return withNav;
};

export default withNav;
