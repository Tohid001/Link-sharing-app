import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import MobileMockUp from '@/modules/Editor/components/MobileMockUp';
import { useFetchSocialLinks } from '@/app/queries/links.query';

const EditorLayoutStc = styled(Row)`
    gap: 24px;
    .mobileMockup,
    .formBox {
        background: #ffffff;
        border-radius: 10px;
    }
    .mobileMockup {
        padding: 80px;
    }
    .formBox {
        padding: 24px;
    }
`;

function withMobileMockUp(Component) {
    const withMobileMockUp = (props) => {
        const {
            data: { data: socialLinks = [] } = {},
            isLoading: isSocialLinksLoading,
            isFetching: isSocialLinksFetching,
            error,
        } = useFetchSocialLinks();

        const [links, setLinks] = useState([]);

        useEffect(() => {
            if (!isSocialLinksLoading) {
                setLinks(socialLinks);
            }
        }, [isSocialLinksLoading]);

        return (
            <EditorLayoutStc wrap={false} align={'start'}>
                <>
                    <Col
                        xs={{
                            flex: '1 1 100%',
                        }}
                        md={{
                            flex: '1 1 40%',
                        }}
                        className="mobileMockup"
                    >
                        <MobileMockUp
                            isSocialLinksLoading={isSocialLinksLoading}
                            initialLinks={links}
                        />
                    </Col>

                    <Col
                        xs={{
                            flex: '1 1 100%',
                        }}
                        md={{
                            flex: '1 1 60%',
                        }}
                        className="formBox"
                    >
                        <Component
                            {...props}
                            isLoading={isSocialLinksLoading}
                            links={links}
                            setLinks={setLinks}
                        />
                    </Col>
                </>
            </EditorLayoutStc>
        );
    };
    return withMobileMockUp;
}

export default withMobileMockUp;
