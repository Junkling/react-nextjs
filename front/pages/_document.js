import React from 'react';
import Document, { Html, Main, NextScript ,Head} from 'next/document';
import styled, { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static async getInitialProps(ctx){
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        try{
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: (App) => (props) => sheet.collectStyles(<App{...props}/>)
            })
            const getInitialProps = await Document.getInitialProps(ctx);
            return{
                ...getInitialProps,
                styles: (
                    <>
                    {getInitialProps.styles}
                    {sheet.getStyleElement()}
                    </>
                )
            };   
        }catch(err){
            console.error(err);
        }finally{
            sheet.seal();
        }
    }
    render() {
        return (
            <Html>
                <Head />
                <body>
                    <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019"></script>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
