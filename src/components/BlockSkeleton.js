import { Skeleton } from 'antd';
import React from 'react';

function BlockSkeleton({
    height,
    width,
    active = true,
    block = true,
    shape = 'default',
    size = 'large',
    className,
}) {
    return (
        <Skeleton.Button
            className={className}
            active={active}
            size={size}
            block={block}
            shape={shape}
            style={{ height, width }}
        />
    );
}

export default BlockSkeleton;
