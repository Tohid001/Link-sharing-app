import { useFetchSocialLinks } from '@/app/queries/links.query';
import React, { useEffect, useState } from 'react';
import MobileMockUp from './components/MobileMockUp';
import LinkForm from './components/LinkForm';
import { Button, Col, Dropdown, Flex, Image, Input, message, Row } from 'antd';

function LinksPage() {
    const {
        data: { data: socialLinks } = {},
        isLoading: isSocialLinksLoading,
        error,
    } = useFetchSocialLinks();

    const [links, setLinks] = useState([]);

    useEffect(() => {
        socialLinks && !isSocialLinksLoading && setLinks(socialLinks);
    }, [socialLinks, isSocialLinksLoading]);

    return (
        <Row style={{ gap: '24px' }} wrap={false} align={'start'}>
            <Col
                xs={0}
                sm={0}
                md={10}
                lg={10}
                style={{
                    background: '#ffffff',
                    padding: '80px',
                    borderRadius: '10px',
                }}
            >
                <MobileMockUp
                    isSocialLinksLoading={isSocialLinksLoading}
                    links={links}
                />
            </Col>
            <Col
                // xs={{
                //     flex: '1 1 100%',
                //     // span: 24,
                // }}
                // md={{
                //     flex: '1 1 60%',
                //     // span: 14,
                // }
                xs={24}
                sm={24}
                md={14}
                lg={14}
                style={{
                    background: '#ffffff',
                    padding: '24px',
                    borderRadius: '10px',
                }}
            >
                <LinkForm
                    isSocialLinksLoading={isSocialLinksLoading}
                    links={links}
                />
            </Col>
        </Row>
    );
}

export default LinksPage;
