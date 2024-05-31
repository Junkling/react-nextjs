import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
// import Link from 'next/link'
import Head from 'next/head'
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useEffect } from "react";
import { GET_MY_INFO_REQUEST, LOAD_POSTS_REQUEST } from "../reducers/action";

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
    useEffect(() => {
        dispatch({
            type: GET_MY_INFO_REQUEST,
        })
    },[]);
    
    // 게시물 전체 조회 (무한 스크롤)
    useEffect(() => {
        dispatch({
            type: LOAD_POSTS_REQUEST,
        })
    },[]);
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
export default Home