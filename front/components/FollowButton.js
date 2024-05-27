import React, { useCallback } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/action';

const FollowButton = ({post}) => {
    const dispatch = useDispatch();
    const {user, followLoading , unfollowLoading} = useSelector((state) => state.user);
    const isFollowedUser = user?.Followings.find((v) => v.id === post.User.id);
    const onClickFollow = useCallback(()=>{
        if(isFollowedUser){
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: post.User.id,
            })
        }else{
            dispatch({
                type: FOLLOW_REQUEST,
                data: post.User.id,
            })
        }
    },[isFollowedUser])
    return (
        <Button loading={followLoading || unfollowLoading } onClick={onClickFollow}>
            {isFollowedUser ? '언팔로우' : '팔로우' }
        </Button>
    );
};

FollowButton.protoTypes = {
    //shape 가 더 좋음
    post: PropTypes.object.isRequired,
}

export default FollowButton;