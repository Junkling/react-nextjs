import { Button, Form ,Input } from 'antd';
import React, { useCallback ,useRef,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';

const PostForm = () => {
    const { imagePath } = useSelector((state)=> state.post);
    const imageInput = useRef();
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const onChangeText = useCallback((e)=>{
        setText(e.target.value);
    },[])
    const onSubmit = useCallback(() => {
        dispatch(addPost);
        setText('');
    },[])
    const onClickImageUpload = useCallback(()=>{
        imageInput.current.click();
    },[imageInput.current]);
    return (
        <Form style={{margin: '10px 0 20px'}} encType='multipart/form-data' onFinish={onSubmit}>
            <Input.TextArea 
            value={text} 
            onChange={onChangeText} 
            maxLength={140} 
            placeholder='공유할 일이 있으신가요?'
            />
            <div>
                <input type='file' multiple hidden ref={imageInput}/>
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type='primary' style={{float: 'right'}} htmlType='submit'>공유</Button>
            </div>
            <div>
                {imagePath.map((i)=>(
                    <div key={i} style={{display: 'inline-block'}}>
                        <img src={i} style={{width: '200px'}} alt={i}/>
                        <div>
                            <Button>삭제</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    );
};

export default PostForm;