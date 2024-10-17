import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import MobileMockUp from '@/modules/Editor/components/MobileMockUp';
import { useFetchSocialLinks } from '@/app/queries/links.query';
import { useFetchUser } from '@/app/queries/user.query';

const EditorLayoutStc = styled(Row)`
    gap: 24px;

    flex-wrap: wrap;

    height: 100%;

    @media (min-width: 1070px) {
        flex-wrap: nowrap;
    }
    .mobile-mockup,
    .form-box {
        background: #ffffff;
        border-radius: 10px;
        padding: 24px;
    }
    .mobile-mockup {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 75px;
        padding-bottom: 75px;
    }
`;

function WithMobileMockUp(Component) {
    const WithMobileMockUp = (props) => {
        const {
            data: { data: socialLinks = [] } = {},
            isLoading: isSocialLinksLoading,
        } = useFetchSocialLinks();
        const { data: { data: userData = {} } = {}, isLoading: isUserLoading } =
            useFetchUser();

        const [links, setLinks] = useState([]);
        const [user, setUser] = useState({});

        useEffect(() => {
            if (!isSocialLinksLoading) {
                setLinks(socialLinks);
            }
        }, [isSocialLinksLoading]);

        useEffect(() => {
            if (!isUserLoading) {
                setUser(userData);
            }
        }, [isUserLoading]);

        return (
            <EditorLayoutStc align={'start'}>
                <>
                    <Col
                        xs={{
                            flex: '1 1 100%',
                        }}
                        md={{
                            flex: '1 1 40%',
                        }}
                        className="mobile-mockup"
                    >
                        <MobileMockUp
                            {...props}
                            isSocialLinksLoading={isSocialLinksLoading}
                            isUserLoading={isUserLoading}
                            links={links}
                            user={user}
                        />
                    </Col>

                    <Col
                        xs={{
                            flex: '1 1 100%',
                        }}
                        md={{
                            flex: '1 1 60%',
                        }}
                        className="form-box"
                    >
                        <Component
                            {...props}
                            isSocialLinksLoading={isSocialLinksLoading}
                            isUserLoading={isUserLoading}
                            links={links}
                            user={user}
                            setLinks={setLinks}
                            setUser={setUser}
                        />
                    </Col>
                </>
            </EditorLayoutStc>
        );
    };
    return WithMobileMockUp;
}

export default WithMobileMockUp;
