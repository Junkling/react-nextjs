import { Avatar, Button, Card, Comment, List, Popover } from 'antd';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined , HeartTwoTone } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import PostImages from './PostImages';
import CommentForm from './CommentForm';

const PostCard = ({post}) => {
    const [liked, setLiked] = useState(false);
    const [commentFormOpend, setCommentFormOpend] = useState(false);
    const onToggleLike = useCallback(()=>{
        setLiked((prev)=> !prev);
    },[])
    const onToggleComment = useCallback(()=>{
        setCommentFormOpend((prev)=>!prev);
    },[])
    const {user} = useSelector((state)=> state.user)
    const id = user?.id;
    return (
        <div style={{marginBottom: 20 }}>
           <Card
           cover={post.Image[0] && <PostImages images={post.Image} />}
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
                        <Button type='danger'>삭제</Button>
                        </>
                    ) : <Button>신고</Button>
                    }
                </Button.Group>
            )}>
                <EllipsisOutlined />
            </Popover>,
           ]}
           >
            <Card.Meta 
            avatar={<Avatar>{post.User.nickname}</Avatar>}
            title={post.title}
            description={post.content}
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

PostCard.PropTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        title: PropTypes.string,
        createdAt: PropTypes.object,
        Comment: PropTypes.arrayOf(PropTypes.object),
        Image: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
}

export default PostCard;