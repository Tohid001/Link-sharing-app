import DraggableLink from '@/components/DraggableLink';
import ResponsiveButton from '@/components/ResponsiveButton';
import { antToken } from '@/config/antd.theme';
import { Typography, Button, Empty, Form, Space, Flex, Row, Col } from 'antd';
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';

const LinkFormStc = styled(Flex)`
    min-height: 100%;
    .scrollable {
        overflow-y: auto;
        overflow-x: hidden;

        form {
            max-height: 470px;
        }
    }

    hr {
        margin-inline: -24px;
    }
    .footer {
        margin-top: auto;
        button {
            display: block;

            @media (max-width: 576px) {
                width: 100%;
            }
            @media (min-width: 577px) {
                width: fit-content;
                margin-left: auto;
            }
        }
    }
`;

function LinkForm({ isSocialLinksLoading }) {
    const [links, setLinks] = useState([{ platform: '', url: '' }]);
    const [form] = Form.useForm();

    const addNewLink = () => {
        setLinks([...links, { platform: '', url: '' }]);
    };

    const removeLink = (index) => {
        setLinks(links.filter((_, idx) => idx !== index));
    };

    const moveLink = (dragIndex, hoverIndex) => {
        const dragItem = links[dragIndex];
        const updatedLinks = [...links];
        updatedLinks.splice(dragIndex, 1);
        updatedLinks.splice(hoverIndex, 0, dragItem);
        setLinks(updatedLinks);
    };

    const handleSubmit = () => {};

    return (
        <DndProvider backend={HTML5Backend}>
            <LinkFormStc vertical={true} justify={'space-between'}>
                <div className="scrollable">
                    <Typography.Title>Customize your links</Typography.Title>
                    <Typography.Text style={{ display: 'block' }}>
                        Add/edit/remove links below and then share all your
                        profiles with the world!
                    </Typography.Text>
                    <br></br>
                    <br></br>
                    <ResponsiveButton
                        type="link"
                        text={'+ Add New Link'}
                        block={true}
                        handleClick={addNewLink}
                    />
                    <br></br>
                    <br></br>
                    {!links.length ? (
                        <Empty
                            description={
                                'No links available. Please add links, edit them, delete them, reorder them and share with the outer world.'
                            }
                        />
                    ) : (
                        <Form
                            form={form}
                            colon={false}
                            layout={'vertical'}
                            onFinish={handleSubmit}
                        >
                            <Flex vertical={true} gap={'16px'}>
                                {links.map((link, index) => (
                                    <DraggableLink
                                        key={index}
                                        index={index}
                                        link={link}
                                        removeLink={removeLink}
                                        moveLink={moveLink}
                                    />
                                ))}
                            </Flex>
                        </Form>
                    )}
                </div>
                <br></br>
                {links.length ? (
                    <div className="footer">
                        <hr></hr>
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => {
                                form.submit();
                            }}
                        >
                            Save
                        </Button>
                    </div>
                ) : null}
            </LinkFormStc>
        </DndProvider>
    );
}

export default LinkForm;
