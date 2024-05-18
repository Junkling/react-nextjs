import React, { useCallback , useState} from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head'
import styled from 'styled-components';
import {Form ,Input, Checkbox, Button} from 'antd';
import useInput from '../hooks/useInput';

const ErrorMessage = styled.div`
    color:red;
`;

const signup = () => {
    const [id, onChangeId] = useInput('');
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
        console.log(id, nickname , term)
    },[password, passwordCheck, term]);
    return (
        <AppLayout>
        <Head>
            <title>회원가입 | NodeBird</title>
        </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor='user-id'> 아이디 </label>
                    <br/>
                    <Input name="user-id" value={id} required onChange={onChangeId}/>
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
                    <Button type="primary" htmlType="submit">가입하기</Button> 
                </div>
            </Form>
        </AppLayout>
    );
};

export default signup;