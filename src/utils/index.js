import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    .ant-message{
        top: 80vh !important;
    }
    .ant-message-notice-content{
        background: #3b3b3b !important;
        color: white !important;
    }
`;

export const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
