import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";
// import Link from 'next/link'
import Head from 'next/head'
import PostCard from "../../components/PostCard";
import { useEffect } from "react";
import axios from 'axios';
import { END } from "redux-saga";
import { GET_MY_INFO_REQUEST } from "../../reducers/action";
import { Avatar, Card } from 'antd';
import wrapper from "../../store/configureStore";
import { useRouter } from "next/router";
import { LOAD_POSTS_BY_USER_REQUEST, LOAD_USER_REQUEST } from "../../reducers/action";

const User = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {id} = router.query;

    
    const { userInfo } = useSelector((state)=> state.user)
    const { mainPosts , hasNextPosts, retweetPostError, postLoading } = useSelector((state)=> state.post)

    useEffect(()=> {
        if(retweetPostError){
            alert(retweetPostError);
        }
    },[retweetPostError])
    useEffect(()=>{
        function onScroll(){
            // console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
            if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
                if(hasNextPosts && !postLoading){
                    const lastId = mainPosts[mainPosts.length-1]?.id;
                    dispatch({
                        type: LOAD_POSTS_BY_USER_REQUEST,
                        lastId,
                        data: id
                    })
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [hasNextPosts,postLoading,mainPosts,id])
    return (
        <AppLayout>
            <Head>
                <title>
                    {userInfo.nickname} 님의 게시물
                </title>
                <meta name="description" content={`${userInfo.nickname}님의 게시물`} />
                <meta property="og:title" content={`${userInfo.nickname}님의 게시물`} />
                <meta property="og:descrition" content={`${userInfo.nickname}님의 게시물`} />
                <meta property="og:image" content="http://localhost:3060/favicon.ico" />
                <meta property="og:url" content={`https://nodebird.com/user/${id}`} />
            </Head>
            {userInfo?(
                <Card
                actions={[
                    <div key="twit">게시글 <br/>{userInfo.Posts}</div>,
                    <div key="fallowing">팔로잉 <br/>{userInfo.Followings}</div>,
                    <div key="fllowers">팔로워 <br/>{userInfo.Followers}</div>,
                ]}
                >
                    <Card.Meta 
                     avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                     title={userInfo.nickname}
                    />
                </Card>
            ):null}
            {mainPosts.map((i)=>(
                <PostCard key={i.id} post={i}/>
            ))}
        </AppLayout>
    );
}

//페이지가 랜더링 되기 전에 SSR로 state를 초기화 한다.
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = (context.req && cookie) ? cookie: '';
    context.store.dispatch({
        type: GET_MY_INFO_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_POSTS_BY_USER_REQUEST,
        data: context.params.id,
    })
    context.store.dispatch({
        type: LOAD_USER_REQUEST,
        data: context.params.id,
    })
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise()
    return {props:{}};
});

export default User