import React, { useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../reducers/user';

// 컴포넌트는 화면 그리는데 집중 (api 호출이나 로직은 밖에서 처리하라)
const UserProfile = () => {
    const dispatch = useDispatch();

    const onLogOut = useCallback(()=> {
        // setIsLoggedIn(false);
        dispatch(logoutAction());
    },[])
    return (
        <Card
            actions={[
                <div key="twit">개시글 <br/>0</div>,
                <div key="fallowing">팔로잉 <br/>0</div>,
                <div key="fllowers">팔로워 <br/>0</div>,
            ]}
        >
            <Card.Meta
            avatar={<Avatar>jun</Avatar>}
            title="junkling"
            />
            <Button onClick={onLogOut}>로그아웃</Button>
        </Card>
    );
};

export default UserProfile;