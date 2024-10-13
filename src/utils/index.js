import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    body{
       margin:0;
    }
    .ant-message{
        top: 80vh !important;
    }
    .ant-message-notice-content{
        background: #3b3b3b !important;
        color: white !important;
    }
    .ant-form-item .ant-form-item-label >label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before{
         content:"" !important;
    }
    .ant-form-item .ant-form-item-label >label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::after{
         content:"*" !important;
         visibility: visible !important;
    }
    .ant-form-item-label{
        text-align: start !important;
    }
`;

export const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
