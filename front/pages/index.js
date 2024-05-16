import AppLayout from "../components/AppLayout";
// import Link from 'next/link'
import Head from 'next/head'

const Home = () => {
    return (
        <>
        <Head>
            <title>메인페이지 | NodeBird</title>
        </Head>
        <AppLayout>
            <div>Hello Next</div>
        </AppLayout>
        </>
    );
}
export default Home