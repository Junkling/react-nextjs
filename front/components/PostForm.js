import { Button, Form ,Input } from 'antd';
import React, { useCallback ,useEffect,useRef,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';
import useInput from '../hooks/useInput';
import { ADD_POST_REQUEST, REMOVE_IMAGES_REQUEST, UPLOAD_IMAGES_REQUEST } from '../reducers/action';
import { T } from 'antd/lib/upload/utils';

const PostForm = () => {
    const { imagePath, postAdded } = useSelector((state)=> state.post);
    const dispatch = useDispatch();
    const [text, onChangeText, setText] = useInput('');
    
    useEffect(()=>{
        if(postAdded){
            setText('');        
        }
    }, [postAdded])
    const onSubmit = useCallback(() => {
        if(!text||!text.trim()){
            return alert('게시글을 작성해야합니다.')
        }
        const formData = new FormData();
        imagePath.forEach((path)=> {
            formData.append('image', path);
        })
        formData.append('content', text)
        return dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        });
    },[text, imagePath])

    const imageInput = useRef();
    const onClickImageUpload = useCallback(()=>{
        imageInput.current.click();
    },[imageInput.current]);
    const onChangeImages = useCallback((e)=> {
        console.log('image', e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f)=>{
            imageFormData.append('image', f)
        });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        })
    });
    const onRemoveImage = useCallback((index)=>()=>{
        dispatch({
            type: REMOVE_IMAGES_REQUEST,
            data: index
        })
    })
    return (
        <Form style={{margin: '10px 0 20px'}} encType='multipart/form-data' onFinish={onSubmit}>
            <Input.TextArea 
            value={text} 
            onChange={onChangeText} 
            maxLength={140} 
            placeholder='공유할 일이 있으신가요?'
            />
            <div>
                <input type='file' name='image' multiple hidden ref={imageInput} onChange={onChangeImages}/>
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type='primary' style={{float: 'right'}} htmlType='submit'>공유</Button>
            </div>
            <div>
                {imagePath.map((i, index)=>(
                    <div key={i} style={{display: 'inline-block'}}>
                        <img src={`http://localhost:3065/${i}`} style={{width: '200px'}} alt={i}/>
                        <div>
                            <Button onClick={onRemoveImage(index)}>삭제</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    );
};

export default PostForm;