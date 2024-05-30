import React, { useCallback, useMemo } from 'react';
import { Form ,Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/action';

const NicknameEditForm = () => {
    const style = useMemo(() => ({ marginBotton:'20px', border:'1px colid #d9d9d9', padding:'20px'}),[])
    const { user } = useSelector(state => state.user);
    const [nickname, onChangeNickname] = useInput(user?.nickname || '');
    const dispatch = useDispatch();
    const onSubmit = useCallback(()=>{
        dispatch({
            type: CHANGE_NICKNAME_REQUEST,
            data: nickname,
        })
    })

    return (
        <Form 
        style={style}
        >
            <Input.Search 
            value = {nickname}
            onChange={onChangeNickname}
            addonBefore="닉네임" 
            enterButton="수정" 
            onSearch={onSubmit}
            />

        </Form>
    );
};

export default NicknameEditForm;