import React, { useCallback, useState , useMemo} from 'react';
import {Button, Form , Input} from 'antd';
import Link from 'next/link';
import styled from 'styled-components';


const LoginForm = ({setIsLoggedIn}) => {
    const [id, setId] = useState('');
    const [password , setPassword] = useState('');

    const onChangeId = useCallback((e)=>{
        setId(e.target.value);
    },[]);

    const onChangePassword = useCallback((e)=>{
        setPassword(e.target.value);
    },[]);
    const onSubmitForm = useCallback(() => {
        console.log(id, password);
        setIsLoggedIn(true);
    }, [id, password])

const FromWapper = styled(Form)`
    padding: 10px;
`;
    
//리랜더링 최적화를 위해서는 아래 styled-components와 useMemo 방법 둘중 하나 채택해야함
const ButtonWapper = styled.div` 
margin-top: 10px;
`;
const styleMemo = useMemo(() => ({ marginTop: 10 }), []);
    return (
        <FromWapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor='user-id'>로그인 아이디</label>
                <br/>
                <Input name='user-id' value={id} onChange={onChangeId} required/>
            </div>
            <div>
                <label htmlFor='user-password'>비밀번호</label>
                <br/>
                <Input name='user-password' type='password' value={password} onChange={onChangePassword} required/>
            </div>
            {/* <ButtonWapper style={styleMemo}> */}
            <ButtonWapper>
                <Button type='primary' htmlType='submit' loading={false}>로그인</Button>
                <Link href={"/singup"}><a><Button>회원가입</Button></a></Link>
            </ButtonWapper>
            <div>
            
            </div>
        </FromWapper>
    );
};

export default LoginForm;