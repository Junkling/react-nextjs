import React, { useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';

const UserProfile = ({ setIsLoggedIn }) => {
    const onLogOut = useCallback(()=> {
        setIsLoggedIn(false);
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