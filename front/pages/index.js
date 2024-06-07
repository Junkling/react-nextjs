import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
// import Link from 'next/link'
import Head from 'next/head'
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useEffect } from "react";
import axios from 'axios';
import {END} from 'redux-saga';
import { GET_MY_INFO_REQUEST, LOAD_POSTS_REQUEST } from "../reducers/action";
import wrapper from "../store/configureStore";

const Home = () => {
    const dispatch = useDispatch();
    
    const { user } = useSelector((state)=> state.user)
    const { mainPosts , hasNextPosts, retweetPostError, postLoading } = useSelector((state)=> state.post)

    useEffect(()=> {
        if(retweetPostError){
            alert(retweetPostError);
        }
    },[retweetPostError])
    // 로그인 상태 복구용
    // useEffect(() => {
    //     dispatch({
    //         type: GET_MY_INFO_REQUEST,
    //     })
    // },[]);
    
    // // 게시물 전체 조회 (무한 스크롤)
    // useEffect(() => {
    //     dispatch({
    //         type: LOAD_POSTS_REQUEST,
    //     })
    // },[]);
    useEffect(()=>{
        function onScroll(){
            // console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
            if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
                if(hasNextPosts && !postLoading){
                    const lastId = mainPosts[mainPosts.length-1]?.id;
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        lastId,
                    })
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [hasNextPosts,postLoading,mainPosts])
    return (
        <>
        <Head>
            <title>메인페이지 | NodeBird</title>
        </Head>
        <AppLayout>
            {user && <PostForm />}
            {mainPosts.map((post) => <PostCard key={post.id} post={post}/>)}
        </AppLayout>
        </>
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
        type: LOAD_POSTS_REQUEST,
    })
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise()
});

export default Home