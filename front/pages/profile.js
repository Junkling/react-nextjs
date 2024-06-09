import React, { useEffect } from 'react';
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';
import axios from 'axios';
import { GET_MY_INFO_REQUEST, LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST } from '../reducers/action';
import {END} from 'redux-saga';
import wrapper from '../store/configureStore';


const profile = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({
            type: LOAD_FOLLOWERS_REQUEST
        });
        dispatch({
            type: LOAD_FOLLOWINGS_REQUEST
        });
    },[])
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



export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = (context.req && cookie) ? cookie: '';
    context.store.dispatch({
        type: GET_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise()
});

export default profile;