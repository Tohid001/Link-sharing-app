import { Layout, Row, Col } from 'antd';
import Nav from '@/modules/Editor/components/Nav';

Row;

const withNav = (Component) => {
    const withNav = (props) => {
        return (
            <Row gutter={[24, 24]} style={{ flex: '1 1 100%' }}>
                <Col span={24}>
                    <Layout.Header
                        style={{ borderRadius: '10px', height: '100%' }}
                    >
                        <Nav />
                    </Layout.Header>
                </Col>

                <Col span={24}>
                    <Component {...props} />
                </Col>
            </Row>
        );
    };

    return withNav;
};

export default withNav;
