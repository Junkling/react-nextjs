import { useRouter } from "next/router"
import Head from "next/head";
import AppLayout from "../../components/AppLayout";
import { useSelector } from "react-redux";
import PostCard from "../../components/PostCard";
import wrapper from "../../store/configureStore";
import axios from 'axios';
import { GET_MY_INFO_REQUEST, LOAD_POST_REQUEST } from "../../reducers/action";
import {END} from 'redux-saga';

const post = () => {
    const router = useRouter();
    const {id} = router.query;
    const {singlePost} = useSelector((state) => state.post);
    return(
        <AppLayout>
            <Head>
                <title>
                    {singlePost.User.nickname} 님의 게시물
                </title>
                <meta name="description" content={singlePost.content} />
                <meta property="og:title" content={`${singlePost.User.nickname}님의 게시물`} />
                <meta property="og:descrition" content={singlePost.content} />
                <meta property="og:image" content={singlePost.Images[0]? singlePost.Images[0].src:"http://localhost:3060/favicon.ico"} />
                <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
            </Head>
            <PostCard post={singlePost}/>
        </AppLayout>
    )
}
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = (context.req && cookie) ? cookie: '';
    context.store.dispatch({
        type: GET_MY_INFO_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.params.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
    return {props:{}};
});


export default post;