import DraggableLink from '@/components/DraggableLink';
import ResponsiveButton from '@/components/ResponsiveButton';
import { Typography, Button, Empty, Form, Flex } from 'antd';
import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';

const LinkFormStc = styled(Flex)`
    min-height: 100%;
    .scrollable {
        max-height: 467px;
        overflow-y: auto;
        overflow-x: hidden;
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

function LinkForm({
    isSocialLinksLoading,
    initialLinks = [
        { platform: '', url: '1' },
        { platform: '', url: '2' },
        { platform: '', url: '3' },
        { platform: '', url: '4' },
    ],
}) {
    const [links, setLinks] = useState(initialLinks);
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({ links: initialLinks });
    }, []);

    const addNewLink = () => {
        const newLink = { platform: '', url: '' };
        setLinks([...links, newLink]);
        form.setFieldsValue({ links: [...links, newLink] });
    };

    const removeLink = (index) => {
        const updatedLinks = links.filter((_, idx) => idx !== index);
        setLinks(updatedLinks);
        form.setFieldsValue({ links: updatedLinks });
    };

    const moveLink = (dragIndex, hoverIndex) => {
        const updatedLinks = [...links];
        const draggedItem = updatedLinks.splice(dragIndex, 1)[0];
        updatedLinks.splice(hoverIndex, 0, draggedItem);
        setLinks(updatedLinks);
        form.setFieldsValue({ links: updatedLinks });
    };

    const handleSubmit = (values) => {
        console.log('tohidDev001handleSubmit', { values });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <LinkFormStc
                vertical={true}
                // justify={'space-between'}
            >
                <Typography.Title>Customize your links</Typography.Title>
                <Typography.Text style={{ display: 'block' }}>
                    Add/edit/remove links below and then share all your profiles
                    with the world!
                </Typography.Text>
                <br></br>
                <br></br>
                <Form
                    form={form}
                    colon={false}
                    layout={'vertical'}
                    onFinish={handleSubmit}
                >
                    <Form.List name="links" initialValue={[]}>
                        {(fields) => {
                            return (
                                <>
                                    <Form.Item>
                                        <ResponsiveButton
                                            type="link"
                                            text={'+ Add New Link'}
                                            block={true}
                                            handleClick={addNewLink}
                                        />
                                    </Form.Item>

                                    {links.length ? (
                                        <Flex
                                            vertical={true}
                                            gap={'16px'}
                                            className="scrollable"
                                        >
                                            {fields.map(
                                                (
                                                    { key, name, ...restField },
                                                    index
                                                ) => (
                                                    <DraggableLink
                                                        key={index}
                                                        index={index}
                                                        name={name}
                                                        link={{}}
                                                        removeLink={() =>
                                                            removeLink(index)
                                                        }
                                                        moveLink={moveLink}
                                                        restField={restField}
                                                    />
                                                )
                                            )}
                                        </Flex>
                                    ) : (
                                        <Empty
                                            description={
                                                'No links available. Please add links, edit them, delete them, reorder them and share with the outer world.'
                                            }
                                        />
                                    )}
                                </>
                            );
                        }}
                    </Form.List>
                </Form>
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
