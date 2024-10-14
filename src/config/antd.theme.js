import { theme as antTheme } from 'antd';

const { getDesignToken } = antTheme;

export const theme = {
    token: {
        colorPrimary: '#643DFF',
        colorLink: '#643DFF',
        colorPrimaryText: '#737373',
        colorBgContainer: '#FFFFFF',
        colorText: '#737373',
        colorTextHeading: '#333333',
        fontSizeSM: 14,
        fontSizeHeading2: 30,
        fontSizeHeading3: 24,
        fontSizeHeading5: 16,
        colorLinkActive: '#643DFF',
    },
    components: {
        Layout: {
            headerBg: '#ffffff',
            headerHeight: 'auto',
            headerPadding: '1rem',
        },
        Input: {},
        Form: {
            labelRequiredMarkColor: '',
            labelColor: '#737373',
        },
        Typography: {},
        Upload: {
            colorText: '#643DFF',
            fontSize: '32px',
        },
    },
};

export const antToken = getDesignToken(theme);
