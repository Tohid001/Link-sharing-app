import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Form, Input, Button, Select, Flex, Typography } from 'antd';
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
`;

const DraggableLink = ({
    link,
    index,
    name,
    removeLink,
    moveLink,
    restField,
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
                {...restField}
                label={`Platform`}
                name={[name, 'platform']}
                rules={[
                    {
                        required: true,
                        message: 'Missing platform',
                    },
                ]}
            >
                <Select placeholder="Select Platform" size="large">
                    <Select.Option value="GitHub">GitHub</Select.Option>
                    <Select.Option value="YouTube">YouTube</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                {...restField}
                label={`Link`}
                name={[name, 'url']}
                rules={[
                    {
                        required: true,
                        message: 'Missing url',
                    },
                ]}
            >
                <Input placeholder="Enter URL" size="large" />
            </Form.Item>
        </DraggableLinkStc>
    );
};

export default DraggableLink;
