import { Avatar, Button, Card, Comment, List, Popover } from 'antd';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined , HeartTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { REMOVE_POST_REQUEST } from '../reducers/action';
import FollowButton from './FollowButton';

const PostCard = ({post}) => {
    const dispatch = useDispatch();
    const {postRemoving} = useSelector((state) => state.post);
    const [liked, setLiked] = useState(false);
    const [commentFormOpend, setCommentFormOpend] = useState(false);
    const onToggleLike = useCallback(()=>{
        setLiked((prev)=> !prev);
    },[])
    const onToggleComment = useCallback(()=>{
        setCommentFormOpend((prev)=>!prev);
    },[])

    const onRemovePost = useCallback(()=>{
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id,
        })
    })

    const {user} = useSelector((state)=> state.user)
    const id = user?.id;
    return (
        <div style={{marginBottom: 20 }}>
           <Card
           cover={post.Images[0] && <PostImages images={post.Images} />}
           actions={[
            <RetweetOutlined key="retweet"/>,
            
            liked 
            ?<HeartTwoTone twoToneColor="#eb2f93" key="haert" onClick={onToggleLike} />
            :<HeartOutlined key="haert" onClick={onToggleLike} />,
            
            <MessageOutlined key="comment" onClick={onToggleComment} />,
            <Popover key="more" content={(
                <Button.Group>
                    {id && post.User.id === id ?(
                        <>
                        <Button type='primary'>수정</Button>
                        <Button type='danger' onClick={onRemovePost} loading={postRemoving}>삭제</Button>
                        </>
                    ) : <Button>신고</Button>
                    }
                </Button.Group>
            )}>
                <EllipsisOutlined />
            </Popover>,
           ]}
           extra={id && <FollowButton post={post} />}
           >
            <Card.Meta 
            avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
            title={post.User.nickname}
            description={<PostCardContent postData={post.content} />}
            />
           </Card>
           {commentFormOpend && (
           <div> 
            <CommentForm post={post} />
                <List 
                header={`${post.Comments.length} 개의 댓글`}
                itemLayout='horizontal'
                dataSource={post.Comments}
                renderItem={(item)=> (
                    <li>
                        <Comment
                        author={item.User.nickname}
                        avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                        content={item.content}
                        />
                    </li>
                )}
                /> 
           </div>
           )}
           {/* 
           <Comments /> */}
        </div>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        PostId: PropTypes.number,
        content: PropTypes.string,
        title: PropTypes.string,
        createdAt: PropTypes.string,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Image: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
}

export default PostCard;