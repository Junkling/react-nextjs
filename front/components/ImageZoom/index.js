import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import { Global, Header, ImgWrapper, Indicator, Overlay, SlickWrapper } from './style';

const ImageZoom = ({image, onClose}) => {
    const [currentSlide , setCurrentSlide] = useState(0);

    return (
        <Overlay>
            <Global />
            <Header>
                <h1>상세 이미지</h1>
                <button onClick={onClose}>닫기</button>
            </Header>
            <SlickWrapper>
                <div>
                    <Slick 
                    initialSlide={0}
                    afterChange={(slide)=> setCurrentSlide(slide)}
                    infinite
                    arrows={false}
                    slidesToShow={1}
                    slidesToScroll={1}
                    >
                    {image.map((v)=> (
                        <ImgWrapper key={v.src}>
                            <img src={v.src} alt={v.src} />
                        </ImgWrapper>
                    ))}
                    </Slick>
                    <Indicator>
                        <div>
                            {currentSlide +1 }
                            { ' ' }
                            /
                            {image.length}
                        </div>
                    </Indicator>
                </div>
            </SlickWrapper>
        </Overlay>
    );
};

ImageZoom.propTypes = {
    image: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ImageZoom;