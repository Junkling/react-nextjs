import { Avatar, Card } from 'antd';
import React from 'react';
import {END} from 'redux-saga'
import { useSelector } from 'react-redux';
import wrapper from '../store/configureStore';
import { LOAD_POSTS_REQUEST, LOAD_USER_REQUEST } from '../reducers/action';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

const about = () => {
    const {userInfo} = useSelector((state)=> state.user)
    return (
        <AppLayout>
        <Head>
            <title>내 프로필 | NodeBird</title>
        </Head>
        {userInfo ?
        (<Card
        actions={[<div key="twit">짹짹<br/>{userInfo.Posts}</div>,<div key="following">팔로워<br/>{userInfo.Followings}</div>,<div key="follower">팔로워<br/>{userInfo.Followers}</div>,]}
        >
            <Card.Meta
             avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
             title={userInfo.nickname}
             description="일반 유저"
            />
        </Card>)
        :null}
        </AppLayout>
    );
};
//스테틱으로 사용하기 때문에 정적으로 적용 가능할 때 쓸 수 있음(바뀌지 않는 페이지에서만 써야함)
export const getStaticProps = wrapper.getStaticProps(async (context)=>{
    context.store.dispatch({
        type: LOAD_USER_REQUEST,
        data: 1,
    });
    context.store.dispatch({
        type: LOAD_POSTS_REQUEST,
    })
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default about;