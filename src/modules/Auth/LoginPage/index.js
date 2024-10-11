import { Button, Flex, Form, Input, Layout, message, notification } from 'antd';
import React, { useState } from 'react';
import { FormWithLogoStc, FooterStc } from '../auth.stc';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();
    const [form] = Form.useForm();
    const email = Form.useWatch('email', form);
    const password = Form.useWatch('password', form);
    const handleLogin = async () => {
        setIsLoading(true);

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result.error) {
            setIsLoading(false);
            message.error(result.error || 'Failed to login');
        } else {
            setIsLoading(false);
            message.success('Logged in successfully');
            router.push('/links');
        }
    };

    return (
        <Layout.Content>
            <Flex
                align="center"
                justify="center"
                vertical={true}
                style={{ minHeight: '100vh' }}
            >
                <Flex justify="center">
                    <Image
                        src="/assets/logo.png"
                        alt="Logo"
                        width={256}
                        height={62}
                        priority={true}
                    />
                </Flex>

                <FormWithLogoStc>
                    <Form
                        onFinish={handleLogin}
                        size="large"
                        form={form}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            type="email"
                            rules={[
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
                            rules={[
                                {
                                    required: true,
                                    message: 'Password is required!',
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder="Type your password"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                block
                                size="large"
                                type="primary"
                                htmlType="submit"
                                loading={isLoading}
                            >
                                Login
                            </Button>
                        </Form.Item>

                        <FooterStc gap={10}>
                            Don&apos;t have an account?{' '}
                            <Link href="/auth/signup">Register Now</Link>
                        </FooterStc>
                    </Form>
                </FormWithLogoStc>
            </Flex>
        </Layout.Content>
    );
}

export default Login;
