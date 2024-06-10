import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';
import axios from 'axios';
import { GET_MY_INFO_REQUEST } from '../reducers/action';
import {END} from 'redux-saga';
import wrapper from '../store/configureStore';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result)=> result.data)

const profile = () => {
    const dispatch = useDispatch();
    //fetch를 바꾸면 axios 가 아닌 GraphQL 도 사용 가능
    const [followersLimit, setFollowersLimit] = useState(3);
    const [followingsLimit, setFollowingsLimit] = useState(3);

    const{data: followersData , error: followerError} = useSWR(`http://localhost:3065/user/followers?limit=${followersLimit}`, fetcher);
    const{data: followingsData , error: followingError} = useSWR(`http://localhost:3065/user/followings?limit=${followingsLimit}`, fetcher);
    
    // useEffect(()=>{
    //     dispatch({
    //         type: LOAD_FOLLOWERS_REQUEST
    //     });
    //     dispatch({
    //         type: LOAD_FOLLOWINGS_REQUEST
    //     });
    // },[])
    const {user} = useSelector((state) => state.user);
    useEffect(()=>{
        if(!(user&&user.id)){
            alert('로그인 후 사용 가능합니다.');
            Router.push('/');
        }
    },[user&&user.id])
    const loadMoreFollowings = useCallback(()=>{
        setFollowingsLimit((prev)=> prev+3);
    },[followingsLimit])
    const loadMoreFollowers = useCallback(()=>{
        setFollowersLimit((prev)=> prev+3);
    },[followersLimit])
    if(!user){
        return '프로필 로딩 중';
    }
    if(followerError||followingError){
        console.error(followerError||followingError);
        return '팔로워 / 팔로잉 로딩 애러'
    }
    return (
        <>
        <Head>
            <title>내 프로필 | NodeBird</title>
        </Head>
        <AppLayout>
            <NicknameEditForm />
            {/* <FollowList header="팔로잉 목록" data={user.Followings} />
            <FollowList header="팔로워 리스트" data={user.Followers} /> */}
            <FollowList header="팔로잉 목록" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && followingError}/>
            <FollowList header="팔로워 리스트" data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && followerError}/>
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