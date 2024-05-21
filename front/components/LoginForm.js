import React, { useCallback, useState , useMemo} from 'react';
import {Button, Form , Input} from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useDispatch } from 'react-redux';
import {loginAction} from '../reducers/user'


const LoginForm = () => {
    const dispatch = useDispatch();
    const [id, onChangeId] = useInput('');
    const [password , onChangePassword] = useInput('');

    const onSubmitForm = useCallback(() => {
        console.log(id, password);
        dispatch(loginAction({id, password}));
    }, [id, password])

const FormWapper = styled(Form)`
    padding: 10px;
`;
    
//리랜더링 최적화를 위해서는 아래 styled-components와 useMemo 방법 둘중 하나 채택해야함
const ButtonWapper = styled.div` 
margin-top: 10px;
`;
const styleMemo = useMemo(() => ({ marginTop: 10 }), []);
    return (
        <FormWapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor='user-id'>로그인 아이디</label>
                <br/>
                <Input name='user-id' value={id} onChange={onChangeId} required/>
            </div>
            <div>
                <label htmlFor='password'>비밀번호</label>
                <br/>
                <Input name='password' type='password' value={password} onChange={onChangePassword} required/>
            </div>
            {/* <ButtonWapper style={styleMemo}> */}
            <ButtonWapper>
                <Button type='primary' htmlType='submit' loading={false}>로그인</Button>
                <Link href={"/singup"}><a><Button>회원가입</Button></a></Link>
            </ButtonWapper>
            <div>
            
            </div>
        </FormWapper>
    );
};

export default LoginForm;