import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import ImageZoom from './ImageZoom';

const PostImages = ({images}) => {
    const [showImagesZoom , setShowImagesZoom]= useState(false);
    const onZoom = useCallback(()=> {
        setShowImagesZoom(true);
    },[]);
    const onClose = useCallback(()=> {
        setShowImagesZoom(false);
    },[]);
    if (images.length === 1 ){
        return(
            <>
                <div>
                    <img role='presentation' width="100%" src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
                    {showImagesZoom && <ImageZoom image={images} onClose={onClose} />}
                </div>
            </>
        );
    }
    if (images.length === 2 ){
        return(
            <>
                <div>
                    <img role='presentation' width="50%" src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
                    <img role='presentation' width="50%" src={`http://localhost:3065/${images[1].src}`} alt={images[0].src} onClick={onZoom} />
                    {showImagesZoom && <ImageZoom image={images} onClose={onClose} />}
                </div>
            </>
        );
    }
    return (
        <>
            <div>
                <img role='presentation' width="50%" src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
                <div
                role='presentation'
                style={{display: 'inline-block', width:'50%', textAlign:'center', verticalAlign:'middle'}}
                onClick={onZoom}
                >
                    <PlusOutlined />
                    <br />
                    {images.length -1}개의 사진 더보기
                </div>
            </div>
            {showImagesZoom && <ImageZoom image={images} onClose={onClose} />}
        </>
    );
};
PostImages.prototype = {
    images: PropTypes.arrayOf(PropTypes.object),
}

export default PostImages;