import { useUpdateUser } from '@/app/queries/user.query';
import BlockSkeleton from '@/components/BlockSkeleton';
import { DraggableLinkStc as FieldStc } from '@/components/DraggableLink';
import { Typography, Button, Form, Flex, Input, Upload, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { LinkFormStc } from './LinkForm';
import { antToken } from '@/config/antd.theme';

const flexCenterColumn = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const ProfileFormStc = styled(LinkFormStc)`
    .upload-wrapper {
        width: 200px;
        height: 200px;
        border-radius: 10px;
        overflow: hidden;
        background-color: ${(props) =>
            props.hasImage ? '#f0f0f0' : antToken.colorPrimaryBgHover};
        cursor: pointer;
        ${flexCenterColumn}
    }

    .upload-text {
        font-size: 16px;
    }

    .image-preview {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .uploaded-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .image-overlay {
        position: absolute;
        inset: 0;
        background: #000000;
        opacity: 0.5;
        color: #ffffff;
        ${flexCenterColumn}
    }
`;

function ProfileForm({ isUserLoading, user, setUser }) {
    const [form] = Form.useForm();
    const avatar = Form.useWatch('avatar', form);
    // const avatarBlobUrl = URL.createObjectURL(avatar);
    const { mutate: saveUser, isPending: isSavingUser } = useUpdateUser();

    console.log('tohidDev001ProfileForm', { user });

    useEffect(() => {
        if (!isUserLoading) {
            form.setFieldsValue({ ...user });
        }
    }, [isUserLoading, user]);

    const validateImage = (file) => {
        const isValidType =
            file.type === 'image/jpeg' ||
            file.type === 'image/png' ||
            file.type === 'image/bmp';
        if (!isValidType) {
            message.error('You can only upload JPG/PNG/BMP files!');
            return Upload.LIST_IGNORE;
        }

        const img = new Image();
        const fileUrl = URL.createObjectURL(file);
        img.src = fileUrl;

        img.onload = () => {
            if (img.width > 10241 || img.height > 10241) {
                message.error('Image must be below 1024x1024px');
                return false;
            }
            setUser({
                ...user,
                avatar: fileUrl,
            });
            return true;
        };

        return false;
    };

    const handleSubmit = (values) => {
        console.log('tohidDev001handleSubmit', { values });
        saveUser(values);
    };

    return (
        <ProfileFormStc vertical={true}>
            <Typography.Title>Profile Details</Typography.Title>
            <Typography.Text style={{ display: 'block' }}>
                Add your details to create a personal touch to your profile.
            </Typography.Text>
            <br></br>
            <br></br>

            {isUserLoading ? (
                <Flex vertical={true} gap={'16px'}>
                    <BlockSkeleton height={'200px'} />
                    <BlockSkeleton height={'200px'} />
                </Flex>
            ) : (
                <Form
                    form={form}
                    colon={false}
                    onFinish={handleSubmit}
                    labelCol={{
                        sm: { span: 24 },
                        md: { span: 4 },
                    }}
                    wrapperCol={{
                        sm: { span: 24 },
                        md: { span: 20, offset: 4 },
                    }}
                >
                    <Flex vertical={true} gap={'24px'}>
                        <FieldStc>
                            <Form.Item
                                label={`Profile Picture`}
                                name={'avatar'}
                                valuePropName="fileList"
                                getValueFromEvent={({ fileList }) => fileList}
                            >
                                <Flex align="center" gap="16px">
                                    <Upload
                                        name="file"
                                        accept="image/jpeg,image/png,image/bmp"
                                        showUploadList={false}
                                        maxCount={1}
                                        beforeUpload={validateImage}
                                    >
                                        <div className="upload-wrapper">
                                            {avatar ? (
                                                <div className="image-preview">
                                                    <img
                                                        className="uploaded-image"
                                                        src={avatar}
                                                        alt="Profile"
                                                    />
                                                    <div className="image-overlay">
                                                        <FontAwesomeIcon
                                                            icon={faImage}
                                                        />
                                                        <span className="upload-text">
                                                            Change Image
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon
                                                        icon={faImage}
                                                    />
                                                    <span className="upload-text">
                                                        + Upload Image
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </Upload>
                                    <Typography.Text>
                                        Image must be below 1024x1024px. Use
                                        PNG,JPG or BMP format.
                                    </Typography.Text>
                                </Flex>
                            </Form.Item>
                        </FieldStc>
                        <FieldStc>
                            <Form.Item
                                label={`First Name`}
                                name={'firstName'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Missing First Name',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={'John'}
                                    size="large"
                                    onChange={(event) => {
                                        setUser({
                                            ...user,
                                            firstName: event.target.value,
                                        });
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={`Last Name`}
                                name={'lastName'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Missing Last Name',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={'Doe'}
                                    size="large"
                                    onChange={(event) => {
                                        setUser({
                                            ...user,
                                            lastName: event.target.value,
                                        });
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                label={`Email`}
                                name={'email'}
                                rules={[
                                    {
                                        type: 'email',
                                        message:
                                            'The input is not valid email!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={'mail@mail.com'}
                                    size="large"
                                    onChange={(event) => {
                                        setUser({
                                            ...user,
                                            email: event.target.value,
                                        });
                                    }}
                                />
                            </Form.Item>
                        </FieldStc>
                    </Flex>
                </Form>
            )}

            <br></br>

            <div className="footer">
                <hr></hr>
                <Button
                    type="primary"
                    loading={isSavingUser}
                    disabled={isUserLoading}
                    size="large"
                    onClick={() => {
                        form.submit();
                    }}
                >
                    Save
                </Button>
            </div>
        </ProfileFormStc>
    );
}

export default ProfileForm;
