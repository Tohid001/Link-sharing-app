import { GlobalStyles } from '../utils/index';
import { ConfigProvider, App as AntdApp, Layout } from 'antd';
import { ThemeProvider } from 'styled-components';
import { theme } from '../config/antd.theme';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <ConfigProvider theme={theme}>
                    <ThemeProvider theme={{ ...theme.token }}>
                        <AntdApp>
                            <Layout
                                style={{
                                    minHeight: '100vh',
                                    overflow: 'scroll',
                                }}
                            >
                                <Component {...pageProps} />
                                <GlobalStyles />
                            </Layout>
                        </AntdApp>
                    </ThemeProvider>
                </ConfigProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
}

export default MyApp;
