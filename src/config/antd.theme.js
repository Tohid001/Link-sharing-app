import { theme as antTheme } from 'antd';

const { getDesignToken } = antTheme;

export const theme = {
    token: {
        colorPrimary: '#643DFF',
        colorLink: '#643DFF',
        colorPrimaryText: '#737373',
        colorBgContainer: '#FFFFFF',
        // colorTextLightSolid: '#FFFFFF',
        colorText: '#737373',
        colorTextHeading: '#333333',
        // colorBgSpotlight: '#000000D9',
        fontSizeSM: 14,
        fontSizeHeading2: 30,
        fontSizeHeading3: 24,
        fontSizeHeading5: 16,
        // colorBgLayout: 'black',
        // colorTextPlaceholder: '#00000040',
        // colorTextDescription: '#00000073',
        // colorBgMask: 'rgba(13, 10, 41, 0.5)',
        // colorTextHeading: '#45426E',
        // colorTextDescription: '#747192',
        // colorLinkHover: '#5D54C0',
        colorLinkActive: '#643DFF',
        // itemHeight: '32px',
        // colorTextSecondary: '#747192',
        // colorTextTertiary: '#A2A1B7',
        // colorTextQuaternary: '#D1D0DB',
        // colorBorder: '#643DFF',
        // colorBorderSecondary: '#643DFF',
        // colorBgLayout: '#F4F6F9',
        // colorFill: '#F6F5FA',
        // colorFillSecondary: '#e7e4f2',
        // colorPrimaryBgHover: '#EFEBFF',
        // colorFillTertiary: '#F4F6F9',
        // boxShadowSecondary:
        //     '0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)',
    },
    components: {
        Layout: {
            headerBg: '#ffffff',
            headerHeight: 'auto',
            headerPadding: '1rem',
        },
        Input: {
            // colorText: '#000000E0',
        },
        Form: {
            // controlHeightLG: 40,
            // labelColor: '#FFFFFFA6',
            labelRequiredMarkColor: '',
            labelColor: '#737373',
        },
        Typography: {
            // colorText: '#ffffff',
            // colorLink: '#ffffff',
            // colorTextHeading: '#ffffff',
        },
        Upload: {
            // margin: '0',
            // padding: '0',
            // colorText: '#000000E0',
            // colorTextHeading: '#000000E0',
            // colorTextDescription: '#00000073',
        },
    },
};

export const antToken = getDesignToken(theme);
