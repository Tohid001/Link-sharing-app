import { useFetchSocialLinks } from '@/app/queries/links.query';
import { useFetchUser } from '@/app/queries/user.query';
import ResponsiveButton from '@/components/ResponsiveButton';
import ScreenView from '@/components/ScreenView';
import { antToken } from '@/config/antd.theme';
import { Button, Flex, Layout, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const PreviewStc = styled.div`
    height: 100vh;
    overflow: hidden;
    position: relative;

    @media (max-width: 768px) {
        position: fixed;
        inset: 0;
        background: #ffffff;
    }
    header {
        position: relative;
        border-radius: 10px;
    }
    &::before {
        background: ${antToken.colorPrimary};
        height: 350px;
        border-radius: 0px 0px 30px 30px;
        content: '';
        display: block;
        position: fixed;
        width: 100%;
        top: 0px;
        left: 0px;
        visibility: hidden;
        @media (min-width: 768px) {
            visibility: visible;
        }
        @media (min-width: 768px) and (max-width: 1366px) {
            height: 400px;
        }
    }
    .screen {
        padding: 24px;
        height: 500px;
        width: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #ffffff;
        .link-group,
        .avatar-group {
            width: 100%;
        }
        border-radius: 20px;
    }
`;

function Preview() {
    const router = useRouter();
    const {
        query: { userId },
    } = router;
    const { data: { data: links = [] } = {}, isLoading: isSocialLinksLoading } =
        useFetchSocialLinks({ userId });
    const { data: { data: user = {} } = {}, isLoading: isUserLoading } =
        useFetchUser({ userId });
    return (
        <PreviewStc>
            <Layout.Header style={{ borderRadius: '10px' }}>
                <Flex align="center" justify="space-between">
                    <Link href="/">
                        <ResponsiveButton text="Back to Editor" type="link" />
                    </Link>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => {
                            navigator.clipboard
                                .writeText(window.location.href)
                                .then(() => {
                                    message.success('Link copied!');
                                });
                        }}
                    >
                        Share Link
                    </Button>
                </Flex>
            </Layout.Header>
            <ScreenView
                isSocialLinksLoading={isSocialLinksLoading}
                isUserLoading={isUserLoading}
                links={links}
                user={user}
                className={'screen'}
                preview={true}
            />
        </PreviewStc>
    );
}

export default Preview;
