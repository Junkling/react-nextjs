import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";
// import Link from 'next/link'
import Head from 'next/head'
import PostCard from "../../components/PostCard";
import { useEffect } from "react";
import axios from 'axios';
import { END } from "redux-saga";
import { GET_MY_INFO_REQUEST, LOAD_POSTS_BY_HASHTAG_REQUEST } from "../../reducers/action";
import { Avatar, Card } from 'antd';
import wrapper from "../../store/configureStore";
import { useRouter } from "next/router";

const User = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {tag} = router.query;

    
    // const { userInfo } = useSelector((state)=> state.user)
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
                        type: LOAD_POSTS_BY_HASHTAG_REQUEST,
                        lastId,
                        data: tag
                    })
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [hasNextPosts,postLoading,mainPosts,tag])
    return (
        <AppLayout>
            <Head>
                <title>
                    #{tag} 해쉬태그 게시물
                </title>
                <meta name="description" content={`${tag} 관련 게시물`} />
                <meta property="og:title" content={`${tag} 관련 게시물`} />
                <meta property="og:descrition" content={`${tag} 관련 게시물`} />
                <meta property="og:image" content="http://localhost:3060/favicon.ico" />
                <meta property="og:url" content={`https://nodebird.com/hashtag/${tag}`} />
            </Head>
                <Card
                actions={[
                    <div key="twit"> 총 게시글 <br/>{mainPosts.length}</div>,
                    <div key="hearts">총 좋아요 수 <br/>{mainPosts.map((i)=> i.Hearters.length).reduce((accumulator, currentValue) => {
                        return accumulator + currentValue
                      }, 0)}</div>,
                ]}
                >
                    <Card.Meta 
                     avatar={<Avatar>hashtag</Avatar>}
                     title={`해쉬태그 : #${tag}`}
                    />
                </Card>
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
        type: LOAD_POSTS_BY_HASHTAG_REQUEST,
        data: context.params.tag,

    })
    // context.store.dispatch({
    //     type: LOAD_USER_REQUEST,
    //     data: context.params.id,
    // })
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise()
    return {props:{}};
});

export default User