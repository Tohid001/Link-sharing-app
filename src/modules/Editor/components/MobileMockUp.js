import ScreenView from '@/components/ScreenView';
import { antToken } from '@/config/antd.theme';
import React from 'react';
import styled from 'styled-components';

const MobileMockUpStc = styled.div`
    width: 300px;
    padding: 10px;
    border: 1px solid ${antToken.colorText};
    border-radius: 50px;
    position: relative;

    .mobile-container {
        width: 100%;
        height: 600px;
        border: inherit;
        border-radius: inherit;
        position: relative;
    }

    .notch {
        width: 160px;
        height: 30px;
        background-color: white;
        position: absolute;
        top: -1px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 0 0 30px 30px;
        border: 1px solid ${antToken.colorText};
        border-top: none;
    }

    .ant-flex {
        width: 100%;
    }

    .screen {
        padding: 24px;
        padding-top: 48px;
        height: 100%;
        width: 100%;
    }
`;

function MobileMockUp({ isSocialLinksLoading, isUserLoading, links, user }) {
    return (
        <MobileMockUpStc>
            <div className="mobile-container">
                <div className="notch"></div>

                <ScreenView
                    isSocialLinksLoading={isSocialLinksLoading}
                    isUserLoading={isUserLoading}
                    links={links}
                    user={user}
                    className="screen"
                    mobileMockUpView={true}
                />
            </div>
        </MobileMockUpStc>
    );
}

export default MobileMockUp;
