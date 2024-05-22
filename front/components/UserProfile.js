import React, { useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

// 컴포넌트는 화면 그리는데 집중 (api 호출이나 로직은 밖에서 처리하라)
const UserProfile = () => {
    const dispatch = useDispatch();
    const { user ,isLoggingOut } = useSelector((state)=> state.user);

    const onLogOut = useCallback(()=> {
        // setIsLoggedIn(false);
        dispatch(logoutRequestAction());
    },[])
    return (
        <Card
            actions={[
                <div key="twit">개시글 <br/>{user.Posts.length}</div>,
                <div key="fallowing">팔로잉 <br/>{user.Followings.length}</div>,
                <div key="fllowers">팔로워 <br/>{user.Followers.length}</div>,
            ]}
        >
            <Card.Meta
            avatar={<Avatar>{user.nickname[0]}</Avatar>}
            title={user.nickname}
            />
            <Button onClick={onLogOut} loading={isLoggingOut}>로그아웃</Button>
        </Card>
    );
};

export default UserProfile;