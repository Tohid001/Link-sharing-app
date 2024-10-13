import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import MobileMockUp from '@/modules/Editor/components/MobileMockUp';
import { useFetchSocialLinks } from '@/app/queries/links.query';
import { useFetchUser } from '@/app/queries/user.query';

const EditorLayoutStc = styled(Row)`
    gap: 24px;

    flex-wrap: wrap;

    @media (min-width: 1070px) {
        flex-wrap: nowrap;
    }
    .mobileMockup,
    .formBox {
        background: #ffffff;
        border-radius: 10px;
        padding: 24px;
    }
    .mobileMockup {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

function withMobileMockUp(Component) {
    const withMobileMockUp = (props) => {
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
                        className="mobileMockup"
                    >
                        <MobileMockUp
                            isSocialLinksLoading={isSocialLinksLoading}
                            initialLinks={links}
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
                        className="formBox"
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
    return withMobileMockUp;
}

export default withMobileMockUp;
