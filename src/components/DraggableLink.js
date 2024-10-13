import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Form, Input, Button, Select, Flex, Typography, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGithub,
    faLinkedin,
    faYoutube,
    faFacebook,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { antToken } from '@/config/antd.theme';
import styled from 'styled-components';

const ItemType = 'LINK';

const DraggableLinkStc = styled.div`
    cursor: ${({ isDragging }) => (isDragging ? 'grabbing' : 'grab')};
    opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
    padding: 16px;
    background: ${antToken.colorBgLayout};
    border-radius: 10px;
    h5 {
        color: ${antToken.colorTextDescription};
        margin-top: 0;
    }
    max-height: 235px;
    .ant-select-arrow {
        color: ${antToken.colorPrimary};
    }
`;

const DraggableLink = ({
    index,
    name,
    removeLink,
    moveLink,
    restField,
    form,
}) => {
    const ref = React.useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: ItemType,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveLink(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const options = [
        {
            label: (
                <Space>
                    <FontAwesomeIcon icon={faGithub} />
                    GitHub
                </Space>
            ),
            value: 'github',
        },
        {
            label: (
                <Space>
                    <FontAwesomeIcon icon={faLinkedin} />
                    LinkedIn
                </Space>
            ),
            value: 'linkedin',
        },
        {
            label: (
                <Space>
                    <FontAwesomeIcon icon={faYoutube} />
                    YouTube
                </Space>
            ),
            value: 'youtube',
        },
        {
            label: (
                <Space>
                    <FontAwesomeIcon icon={faFacebook} />
                    FaceBook
                </Space>
            ),

            value: 'facebook',
        },
        {
            label: (
                <Space>
                    <FontAwesomeIcon icon={faTwitter} />
                    Twitter
                </Space>
            ),

            value: 'twitter',
        },
    ];

    const urlPatterns = {
        github: /^(https?:\/\/)?(www\.)?github\.com\/[\w.-]+\/[\w.-]+\/?$/,
        linkedin:
            /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[\w\-_%]+\/?$/i,
        youtube: /^(https?:\/\/)?(www\.)?(youtube\.com\/@[\w.-]+)$/,
        facebook:
            /^(https?:\/\/)?(www\.)?(facebook|fb)\.com\/(pages\/)?[\w\-\.\%]+\/?(\?[\w=&]+)?$/i,
        twitter: /^(https?:\/\/)?(www\.)?x\.com\/[A-Za-z0-9_-]+$/,
    };

    drag(drop(ref));

    return (
        <DraggableLinkStc
            ref={ref}
            data-handler-id={handlerId}
            isDragging={isDragging}
        >
            <Flex justify={'space-between'} align="center">
                <Typography.Title
                    level={5}
                >{`Link #${index + 1}`}</Typography.Title>
                <Button
                    type="text"
                    text={'Remove'}
                    onClick={() => removeLink(index)}
                >
                    Remove
                </Button>
            </Flex>
            <Form.Item
                label={`Platform`}
                name={[name, 'platform']}
                rules={[
                    {
                        required: true,
                        message: 'Missing platform',
                    },
                ]}
                {...restField}
            >
                <Select
                    placeholder="Select Platform"
                    size="large"
                    options={options}
                    optionRender={(option) => option.data.label}
                />
            </Form.Item>

            <Form.Item
                label={`Link`}
                name={[name, 'url']}
                dependencies={[['links', name, 'platform']]}
                rules={[
                    {
                        required: true,
                        message: 'Missing url',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            const platform = getFieldValue([
                                'links',
                                name,
                                'platform',
                            ]);
                            const pattern = urlPatterns[platform] || '';

                            if (!pattern && value) {
                                return Promise.reject(
                                    new Error(`Select a pattern first!`)
                                );
                            }

                            if (!value || pattern.test(value)) {
                                return Promise.resolve();
                            }

                            return Promise.reject(
                                new Error(`Invalid ${platform} URL!`)
                            );
                        },
                    }),
                ]}
                {...restField}
            >
                <Input placeholder="Enter URL" size="large" />
            </Form.Item>
        </DraggableLinkStc>
    );
};

export default DraggableLink;
