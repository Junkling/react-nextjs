import React, { useCallback , useEffect, useState} from 'react';
import {Form ,Input, Checkbox, Button} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head'
import Router from 'next/router';
import axios from 'axios';
import {END} from 'redux-saga';

import { GET_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../reducers/action';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
// import styled from 'styled-components';


// const ErrorMessage = styled.div`
//     color:red;
// `;

const signup = () => {
    const dispatch = useDispatch();
    const { isSigningUp , isSignedUp , signUpError , user } = useSelector((state)=> state.user);

    useEffect(()=>{
        if(user&&user.id){
            Router.replace('/');
        }
    },[user&&user.id]);

    useEffect(()=> {
        if(isSignedUp){Router.replace("/")}
    },[isSignedUp]);

    useEffect(()=> {
        if(signUpError){alert(signUpError)}
    },[signUpError]);

    const [email, onChangeEmail] = useInput('');
    const [nickname , onChangeNickname] = useInput('');
    
    const [password , onChangePassword] = useInput('');
    const [passwordCheck , setPasswordCheck] = useState('');
    const [passwordError , setPasswordError] = useState(false);
    const onChangePasswordCheck= useCallback((e)=>{
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password)
    },[password]);

    const [term , setTerm] = useState('');
    const [termError , setTermError] = useState(false);
    const onChangeTerm= useCallback((e)=>{
        setTerm(e.target.checked);
        setTermError(false)
    },[]);
    
    const onSubmit = useCallback(()=> {
        if(password !== passwordCheck){
            return setPasswordError(true);
        }
        if(!term){
            return setTermError(ture);
        }
        console.log(email, nickname , term)
        dispatch({
            type: SIGN_UP_REQUEST,
            data: { email, password, nickname },
        })
    },[email,password, passwordCheck, term, nickname]);
    return (
        <AppLayout>
        <Head>
            <title>회원가입 | NodeBird</title>
        </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor='user-email'> 아이디 </label>
                    <br/>
                    <Input name="user-email" type='email' value={email} required onChange={onChangeEmail}/>
                </div>
                <div>
                    <label htmlFor='user-password'> 비밀번호 </label>
                    <br/>
                    <Input name="user-password" type="password" value={password} required onChange={onChangePassword}/>
                </div>
                <div>
                    <label htmlFor='user-nickname'> 닉네임 </label>
                    <br/>
                    <Input name="user-nickname" value={nickname} required onChange={onChangeNickname}/>
                </div>
                <div>
                    <label htmlFor='user-password-check'> 비밀번호 체크 </label>
                    <br/>
                    <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck}/>
                </div>
                {passwordError && <ErrorMessage>비밀번호 확인이 일치하지 않습니다.</ErrorMessage>}
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>약관에 동의합니다.</Checkbox>
                    {termError && <ErrorMessage>약관에 동의하여야 합니다.</ErrorMessage>}
                </div>
                <div style={{marginTop:10}}>
                    <Button type="primary" htmlType="submit" loading={isSigningUp}>가입하기</Button> 
                </div>
            </Form>
        </AppLayout>
    );
};

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//     const cookie = context.req ? context.req.headers.cookie : '';
//     axios.defaults.headers.Cookie = (context.req && cookie) ? cookie: '';
//     context.store.dispatch({
//         type: GET_MY_INFO_REQUEST,
//     });
//     context.store.dispatch(END);
//     await context.store.sagaTask.toPromise()
// });

export default signup;