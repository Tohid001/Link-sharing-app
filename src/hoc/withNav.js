import { Layout, Row, Col } from 'antd';
import Nav from '@/modules/Editor/components/Nav';

Row;

const withNav = (Component) => {
    const withNav = (props) => {
        return (
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <Layout.Header style={{ borderRadius: '10px' }}>
                        <Nav />
                    </Layout.Header>
                </Col>
                <Layout.Content
                    style={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}
                >
                    <Col span={24}>
                        <Component {...props} />
                    </Col>
                </Layout.Content>
            </Row>
        );
    };

    return withNav;
};

export default withNav;
