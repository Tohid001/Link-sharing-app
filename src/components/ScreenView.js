import { Avatar, Button, Flex, Skeleton, Space, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import BlockSkeleton from './BlockSkeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGithub,
    faLinkedin,
    faYoutube,
    faFacebook,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { antToken } from '@/config/antd.theme';

const ScreenViewStc = styled(Flex)`
    .ant-skeleton.title,
    h5 {
        margin-top: 10px;
        margin-bottom: 0px;
        text-align: center;
    }
    .ant-skeleton .title {
        height: 15px;
        width: 150px;
    }
    .ant-skeleton .email {
        height: 10px;
        width: 90px;
    }
    .link-group {
        max-height: 320px;
        overflow-y: auto;
    }
`;

const LinkButtonStc = styled.div`
    cursor: pointer;
    border-radius: 10px;
    padding: 16px;
    display: Flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    background: ${({ brandColor }) => brandColor};
    color: #ffffff;
`;

function ScreenView({
    isSocialLinksLoading,
    isUserLoading,
    links,
    user,
    className,
    mobileMockUpView,
    preview,
}) {
    const linkMetaDataByPlatform = {
        github: {
            label: (
                <Space>
                    <FontAwesomeIcon icon={faGithub} />
                    GitHub
                </Space>
            ),
            color: '#000000',
        },
        linkedin: {
            label: (
                <Space>
                    <FontAwesomeIcon icon={faLinkedin} />
                    LinkedIn
                </Space>
            ),
            color: '#0a66c2',
        },
        youtube: {
            label: (
                <Space>
                    <FontAwesomeIcon icon={faYoutube} />
                    YouTube
                </Space>
            ),
            color: '#ff0000',
        },
        facebook: {
            label: (
                <Space>
                    <FontAwesomeIcon icon={faFacebook} />
                    FaceBook
                </Space>
            ),
            color: '#1877f2',
        },
        twitter: {
            label: (
                <Space>
                    <FontAwesomeIcon icon={faTwitter} />
                    Twitter
                </Space>
            ),
            color: '#1da1f2',
        },
    };

    return (
        <ScreenViewStc
            gap={32}
            vertical={true}
            align={'center'}
            className={className}
        >
            <Flex
                vertical={true}
                align={'center'}
                gap={'8px'}
                className="avatar-group"
            >
                {!user.avatar ? (
                    <Skeleton.Avatar
                        className="avatar"
                        active={isUserLoading}
                        shape={'circle'}
                        style={{
                            height: '90px',
                            width: '90px',
                        }}
                    />
                ) : (
                    <Avatar
                        size={90}
                        src={
                            user.avatar instanceof File
                                ? URL.createObjectURL(user.avatar)
                                : user.avatar
                        }
                        style={{ border: `3px solid ${antToken.colorPrimary}` }}
                    />
                )}
                {isUserLoading ? (
                    <>
                        <BlockSkeleton
                            className="title"
                            active={true}
                            size={'small'}
                            block={false}
                            shape={'round'}
                        />
                        <BlockSkeleton
                            className="email"
                            active={true}
                            size={'small'}
                            block={false}
                            shape={'round'}
                        />
                    </>
                ) : (
                    <>
                        <Typography.Title level={5}>
                            {`${user.firstName} ${user.lastName}`}
                        </Typography.Title>
                        <Typography.Text>{user.email}</Typography.Text>
                    </>
                )}
            </Flex>

            <Flex
                gap={16}
                vertical={true}
                align={'center'}
                className="link-group"
            >
                {!isSocialLinksLoading
                    ? links.map(({ platform, url }) => {
                          const linkMeta = linkMetaDataByPlatform[platform];
                          return (
                              <LinkButtonStc
                                  brandColor={linkMeta.color}
                                  onClick={() => {
                                      window.open(url, '_blank');
                                  }}
                              >
                                  {linkMeta.label}
                                  {<FontAwesomeIcon icon={faArrowRight} />}
                              </LinkButtonStc>
                          );
                      })
                    : null}
                {mobileMockUpView || isSocialLinksLoading ? (
                    <>
                        {Array(5)
                            .fill()
                            .map(() => (
                                <BlockSkeleton
                                    active={isSocialLinksLoading}
                                    height={'50px'}
                                />
                            ))}
                    </>
                ) : null}
            </Flex>
        </ScreenViewStc>
    );
}

export default ScreenView;
