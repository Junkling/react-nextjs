import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
// import Link from 'next/link'
import Head from 'next/head'
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
    const { user } = useSelector((state)=> state.user)
    const { mainPosts } = useSelector((state)=> state.post)
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