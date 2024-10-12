import { antToken } from '@/config/antd.theme';
import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

export const ResponsiveButtonStc = styled(Button)`
    span:nth-of-type(2) {
        display: none;
    }

    @media (min-width: 768px) {
        span:nth-of-type(2) {
            display: inline-block;
        }
    }

    ${({ type }) =>
        type === 'link' && `border: 1px solid ${antToken.colorPrimary}`};

    ${({ type }) =>
        type === 'selected' &&
        `background: ${antToken.colorPrimaryBgHover}; color: ${antToken.colorPrimary}`};
    ${({ type }) =>
        type === 'nonSelected' &&
        `&&&&:hover {
        color: ${antToken.colorPrimary};
        background: transparent;`};
`;

function ResponsiveButton({ icon, text, type }) {
    return (
        <ResponsiveButtonStc icon={icon} type={type} size="large">
            <span>{text}</span>
        </ResponsiveButtonStc>
    );
}

export default ResponsiveButton;
