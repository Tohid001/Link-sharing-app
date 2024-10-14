import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
    faLink,
    faEye,
    faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Flex, Tooltip } from 'antd';
import ResponsiveButton from '@/components/ResponsiveButton';
import Logo from './Logo';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Nav() {
    const router = useRouter();
    const { pathname } = router;
    const { data: session } = useSession();

    return (
        <Flex align="center" justify="space-between">
            <Logo />
            <Flex align="center" justify="center">
                <Tooltip title={'Links'}>
                    <Link href={`/links`}>
                        <ResponsiveButton
                            icon={<FontAwesomeIcon icon={faLink} />}
                            text={'Links'}
                            type={
                                pathname !== '/links'
                                    ? 'nonSelected'
                                    : 'selected'
                            }
                        />
                    </Link>
                </Tooltip>
                <Tooltip title={'Profile'}>
                    <Link href={`/profile`}>
                        <ResponsiveButton
                            icon={<FontAwesomeIcon icon={faUser} />}
                            text={'Profile Details'}
                            type={
                                pathname !== '/profile'
                                    ? 'nonSelected'
                                    : 'selected'
                            }
                        />
                    </Link>
                </Tooltip>
            </Flex>
            <Flex>
                <Tooltip title={'Preview'}>
                    <Link href={`/preview?userId=${session?.user?.id}`}>
                        <ResponsiveButton
                            icon={<FontAwesomeIcon icon={faEye} />}
                            text={'Preview'}
                            type="link"
                        />
                    </Link>
                </Tooltip>
                <Tooltip title={'Logout'}>
                    <Button
                        type="link"
                        size="large"
                        icon={
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        }
                        onClick={() => {
                            signOut({ callbackUrl: '/auth/login' });
                        }}
                    />
                </Tooltip>
            </Flex>
        </Flex>
    );
}

export default Nav;
