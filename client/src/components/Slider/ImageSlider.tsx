import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import defaultUserPhoto from "../../assets/images/photos/1.jpg"

interface ImageSliderPropsInterface{
    images: string[] | []
    userId: string
    imageExtraClassName?: string
}

const ImageSlider: React.FC<ImageSliderPropsInterface> = ({images, userId, imageExtraClassName = ''}) => {
    const [current, setCurrent] = useState(0)
    const length = images.length
    const stripesArray = []

    for(let i = 0; i <= length - 1; i++) {
        stripesArray.push(i)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? 0 : current - 1)
    }
    
    const nextSlide = () => {
        setCurrent(current === length - 1 ? length - 1 : current + 1)
    }

    if(!Array.isArray(images) || images.length <= 0 || images[0] === '') {
        return (
            <div className="tinder__image-slider">
                <div style={{backgroundImage: `url(${defaultUserPhoto})`}} className={`tinder__image-slider-item tinder__image-slider-item--default ${imageExtraClassName}`}></div>
            </div>
        )
    }

    return(
        <div className="tinder__image-slider">
            <div className="tinder__slider-stripes">
                {stripesArray.map(stripe => {
                    return(
                        <div key={stripe} className={`tinder__slider-stripe${stripe === current ? ' tinder__slider-stripe--active' : ''}`}></div>
                    )
                })}
            </div>
            <div className="tinder__image-slider-arrows">
                {current === 0 ? null :
                <div onClick={prevSlide} className="tinder__image-slider-left-arrow-wrapper">
                    <FontAwesomeIcon icon={faAngleLeft} className="tinder__image-slider-left-arrow"/>
                </div>
                }
                {current === length - 1 ? null :
                <div onClick={nextSlide} className="tinder__image-slider-rigth-arrow-wrapper">
                    <FontAwesomeIcon icon={faAngleRight} className="tinder__image-slider-right-arrow"/>
                </div>
                }
            </div>

            {images.map((imageName, index) => {
                return(
                    <div key={index} className={index === current ? 'tinder__image-slider-item-wrapper--active' : 'tinder__image-slider-item-wrapper--hidden'}>
                        <div
                            style={{backgroundImage: `url(http://localhost:5000/${userId}/${index > 0 ? 'gallery' : 'avatar'}/${imageName})`}} 
                            className={`tinder__image-slider-item ${imageExtraClassName}`}>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ImageSlider