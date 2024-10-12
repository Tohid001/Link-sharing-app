import { Flex, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

const LogoStc = styled(Flex)`
    .logoImage {
        background: url('/assets/logoSmall.png');
        width: 32px;
        height: 32px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }
    h2 {
        margin: 0;
        display: ${({ responsive }) => (responsive ? 'none' : 'inline-block')};
    }
    @media screen and (min-width: 768px) {
        h2 {
            display: inline-block;
        }
    }
`;

function Logo({ responsive = true }) {
    return (
        <LogoStc align="center" responsive={responsive} gap={8}>
            <div className="logoImage" />
            <Typography.Title level={2}>devlinks</Typography.Title>
        </LogoStc>
    );
}

export default Logo;
