import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Form, Input, Button, Select, Flex, Typography } from 'antd';
import { antToken } from '@/config/antd.theme';
import styled from 'styled-components';

const ItemType = 'LINK';

const DraggableLinkStc = styled.div`
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

const DraggableLink = ({ link, index, removeLink, moveLink }) => {
    const ref = React.useRef(null);

    const [, drop] = useDrop({
        accept: ItemType,
        hover(item) {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
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
        <DraggableLinkStc ref={ref} isDragging={isDragging}>
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
            <Form.Item label={`Platform`}>
                <Select placeholder="Select Platform" value={link.platform}>
                    <Select.Option value="GitHub">GitHub</Select.Option>
                    <Select.Option value="YouTube">YouTube</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label={`Link`}>
                <Input placeholder="Enter URL" value={link.link} />
            </Form.Item>
        </DraggableLinkStc>
    );
};

export default DraggableLink;
