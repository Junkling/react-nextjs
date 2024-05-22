import React, { useCallback, useState , useMemo} from 'react';
import {Button, Form , Input} from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import {loginRequestAction} from '../reducers/user'


const FormWapper = styled(Form)`
    padding: 10px;
`;
    
//리랜더링 최적화를 위해서는 아래 styled-components와 useMemo 방법 둘중 하나 채택해야함
const ButtonWapper = styled.div` 
margin-top: 10px;
`;

const LoginForm = () => {
    const dispatch = useDispatch();
    const {isLoggingIn} = useSelector((state)=>state.user);
    const [email, onChangeEmail] = useInput('');
    const [password , onChangePassword] = useInput('');

    const onSubmitForm = useCallback(() => {
        console.log(email, password);
        dispatch(loginRequestAction({email, password}));
    }, [email, password])

const styleMemo = useMemo(() => ({ marginTop: 10 }), []);
    return (
        <FormWapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor='user-email'>이메일</label>
                <br/>
                <Input name='user-email' type='email' value={email} onChange={onChangeEmail} required/>
            </div>
            <div>
                <label htmlFor='password'>비밀번호</label>
                <br/>
                <Input name='password' type='password' value={password} onChange={onChangePassword} required/>
            </div>
            {/* <ButtonWapper style={styleMemo}> */}
            <ButtonWapper>
                <Button type='primary' htmlType='submit' loading={isLoggingIn}>로그인</Button>
                <Link href={"/singup"}><a><Button>회원가입</Button></a></Link>
            </ButtonWapper>
            <div>
            
            </div>
        </FormWapper>
    );
};

export default LoginForm;