import { useCreateSocialLinks } from '@/app/queries/links.query';
import BlockSkeleton from '@/components/BlockSkeleton';
import DraggableLink from '@/components/DraggableLink';
import ResponsiveButton from '@/components/ResponsiveButton';
import { Typography, Button, Empty, Form, Flex } from 'antd';
import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';

export const LinkFormStc = styled(Flex)`
    min-height: 100%;
    .scrollable {
        max-height: 61vh;
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
            width: 100%;
            @media (min-width: 768px) {
                width: fit-content;
                margin-left: auto;
            }
        }
    }
`;

function LinkForm({ isSocialLinksLoading, links, setLinks }) {
    const [form] = Form.useForm();
    const { mutate: saveLinks, isPending: isSavingLinks } =
        useCreateSocialLinks();

    useEffect(() => {
        if (!isSocialLinksLoading) {
            form.setFieldsValue({ links });
        }
    }, [isSocialLinksLoading, links]);

    const addNewLink = () => {
        const newLink = { platform: 'github', url: '' };
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

    const handleChange = ({ value, index, type }) => {
        const updatedLinks = links.map((link, idx) => {
            if (idx === index) {
                link[type] = value;
            }
            return link;
        });
        setLinks(updatedLinks);
        form.setFieldsValue({ links: updatedLinks });
    };

    const handleSubmit = ({ links }) => {
        saveLinks(links);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <LinkFormStc vertical={true}>
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
                                            disabled={
                                                isSocialLinksLoading ||
                                                isSavingLinks
                                            }
                                        />
                                    </Form.Item>

                                    {isSocialLinksLoading ? (
                                        <Flex vertical={true} gap={'16px'}>
                                            <BlockSkeleton height={'100px'} />
                                            <BlockSkeleton height={'100px'} />
                                            <BlockSkeleton height={'100px'} />
                                            <BlockSkeleton height={'100px'} />
                                        </Flex>
                                    ) : links.length ? (
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
                                                        form={form}
                                                        index={index}
                                                        name={name}
                                                        link={{}}
                                                        removeLink={() =>
                                                            removeLink(index)
                                                        }
                                                        moveLink={moveLink}
                                                        restField={restField}
                                                        handleChange={
                                                            handleChange
                                                        }
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
                            loading={isSavingLinks}
                            disabled={isSocialLinksLoading}
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
