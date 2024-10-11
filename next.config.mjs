/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: [
        'antd',
        '@ant-design',
        'rc-util',
        'rc-pagination',
        'rc-picker',
        'rc-notification',
        'rc-tooltip',
    ],
    compiler: {
        styledComponents: true,
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/links',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
