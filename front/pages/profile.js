import React from 'react';
import Head from 'next/head'

import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';

const profile = () => {
    const followerList = [{nickname: '준혁'},{nickname: '모르는 사람'},{nickname: '아는사람'}]
    const followingList = [{nickname: '준혁'},{nickname: '모르는 사람'},{nickname: '아는사람'}]
    return (
        <>
        <Head>
            <title>내 프로필 | NodeBird</title>
        </Head>
        <AppLayout>
            <NicknameEditForm />
            <FollowList header="팔로잉 목록" data={followingList} />
            <FollowList header="팔로워 리스트" data={followerList} />
        </AppLayout>
        </>
    );
};

export default profile;