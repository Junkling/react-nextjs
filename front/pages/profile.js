import React, { useEffect } from 'react';
import Head from 'next/head'
import { useSelector } from 'react-redux';
import Router from 'next/router'

import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';

const profile = () => {
    const {user} = useSelector((state) => state.user);
    useEffect(()=>{
        if(!(user&&user.id)){
            Router.push('/');
        }
    },[user&&user.id])
    if(!user){
        window.alert("프로필은 로그인 후 접근 가능합니다.");
        return null;
    }
    return (
        <>
        <Head>
            <title>내 프로필 | NodeBird</title>
        </Head>
        <AppLayout>
            <NicknameEditForm />
            <FollowList header="팔로잉 목록" data={user.Followings} />
            <FollowList header="팔로워 리스트" data={user.Followers} />
        </AppLayout>
        </>
    );
};

export default profile;