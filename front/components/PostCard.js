import { Avatar, Button, Card, Comment, List, Popover } from 'antd';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined , HeartTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { LIKE_POST_REQUEST, REMOVE_POST_REQUEST, RETWEET_POST_REQUEST, UNLIKE_POST_REQUEST } from '../reducers/action';
import FollowButton from './FollowButton';

const PostCard = ({post}) => {
    const dispatch = useDispatch();
    const {postRemoving } = useSelector((state) => state.post);
    const [commentFormOpend, setCommentFormOpend] = useState(false);
    const {user} = useSelector((state)=> state.user)
    const id = user?.id;
    
    const liked = post.Hearters.find((v) => v.id===id);

    const onLike = useCallback(()=>{
        if(!id){
            return alert('로그인이 필요한 서비스입니다.');
        }
        dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id,
        });
    },[id]);
    const onUnlike = useCallback(()=>{
        if(!id){
            return alert('로그인이 필요한 서비스입니다.');
        }
        dispatch({
            type: UNLIKE_POST_REQUEST,
            data: post.id,
        });
    },[id]);
    const onToggleComment = useCallback(()=>{
        setCommentFormOpend((prev)=>!prev);
    },[])

    const onRemovePost = useCallback(()=>{
        if(!id){
            return alert('로그인이 필요한 서비스입니다.');
        }
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id,
        })
    },[id])
    
    const onRetweet = useCallback(()=>{
        if(!id){
            return alert('로그인이 필요한 서비스입니다.');
        }
        dispatch({
            type: RETWEET_POST_REQUEST,
            data: post.id
        })
    },[id])

    
    return (
        <div style={{marginBottom: 20 }}>
           <Card
           cover={post.Images[0] && <PostImages images={post.Images} />}
           actions={[
            <RetweetOutlined key="retweet" onClick={onRetweet}/>,
            
            liked 
            ?<HeartTwoTone twoToneColor="#eb2f93" key="haert" onClick={onUnlike} />
            :<HeartOutlined key="haert" onClick={onLike} />,
            
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
           title={post.RetweetId? `${post.User.nickname}님이 리트윗한 게시물`: null}
           description={post.RetweetId? `${post.content}` : null}
           extra={id && <FollowButton post={post} />}
           >
            {post.RetweetId && post.Retweet
            ? (<Card cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
                <Card.Meta 
                avatar={<Avatar>{post.Retweet.User.nickname[0]}</Avatar>}
                title={post.Retweet.User.nickname}
                description={<PostCardContent postData={post.Retweet.content} />}
                />
                </Card>)
            : (<Card.Meta 
                avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                title={post.User.nickname}
                description={<PostCardContent postData={post.content} />}
                />)
            }
            {post.RetweetId && post.Retweet
            ?<Card.Meta 
            avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
            title={post.User.nickname}
            description={<PostCardContent postData={post.content} />}
            />
            :null
            }
            
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
        Hearters: PropTypes.arrayOf(PropTypes.object),
        Image: PropTypes.arrayOf(PropTypes.object),
        RetweetId: PropTypes.number,
        Retweet: PropTypes.object,
    }).isRequired,
}

export default PostCard;