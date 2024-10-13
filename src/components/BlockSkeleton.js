import { Skeleton } from 'antd';
import React from 'react';

function BlockSkeleton({ height }) {
    return (
        <Skeleton.Button
            active={true}
            size={'large'}
            block={'true'}
            style={{ height }}
        />
    );
}

export default BlockSkeleton;
