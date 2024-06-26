import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css'
import Head from 'next/head'

import wrapper from '../store/configureStore';

const NodeBird = ({Component}) => {
    return (
        <>
        <Head>
            <title>NodeBird</title>
            <link rel='shortcut icon'/>
        </Head>
        <Component />
        </>
    );
};
NodeBird.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(NodeBird);