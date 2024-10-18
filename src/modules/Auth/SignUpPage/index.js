import { Button, Flex, Form, Input, Layout, Spin } from 'antd';
import React, { useEffect } from 'react';
import { FormWithLogoStc } from '../auth.stc';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Logo from '@/modules/Editor/components/Logo';
import { useRegisterUser } from '@/app/queries/user.query';

function SignUp() {
    const { mutate: registerUSer, isPending: isRegisteringUser } =
        useRegisterUser();
    const { status } = useSession();
    const router = useRouter();
    const [form] = Form.useForm();
    const handleSignUp = async (values) => {
        await registerUSer(values);
    };

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/');
        }
    }, [status]);

    if (status === 'loading' || !status)
        return (
            <Flex
                align="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <Spin size="large" />
            </Flex>
        );

    const passwordRules = [
        {
            required: true,
            message: 'Password is required!',
        },
        {
            min: 8,
            message: 'Password must be at least 8 characters long!',
        },
        {
            pattern: /(?=.*\d)/,
            message: 'Password must contain at least one number!',
        },
        {
            pattern: /(?=.*[A-Z])/,
            message: 'Password must contain at least one uppercase letter!',
        },
        {
            pattern: /(?=.*[a-z])/,
            message: 'Password must contain at least one lowercase letter!',
        },
    ];

    return (
        <Layout.Content>
            <Flex
                align="center"
                justify="center"
                vertical={true}
                style={{ minHeight: '100vh' }}
            >
                <Logo responsive={false} />

                <FormWithLogoStc>
                    <Form
                        onFinish={handleSignUp}
                        size="large"
                        form={form}
                        layout="vertical"
                    >
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
                            <Input placeholder={'John'} size="large" />
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
                            <Input placeholder={'Doe'} size="large" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            type="email"
                            placeholder={'example@mail.com'}
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid email!',
                                },
                                {
                                    required: true,
                                    message: 'Email is required!',
                                },
                            ]}
                        >
                            <Input
                                placeholder="example@gmail.com"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={passwordRules} // Updated validation rules
                        >
                            <Input.Password
                                placeholder="Type your password"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                {
                                    validator: (rule, value) => {
                                        const { getFieldValue } = form;
                                        if (
                                            value &&
                                            value !== getFieldValue('password')
                                        ) {
                                            return Promise.reject(
                                                'Passwords do not match!'
                                            );
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                block
                                size="large"
                                type="primary"
                                htmlType="submit"
                                loading={isRegisteringUser}
                            >
                                Sign up
                            </Button>
                        </Form.Item>
                    </Form>
                </FormWithLogoStc>
            </Flex>
        </Layout.Content>
    );
}

export default SignUp;
