import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import defaultUserPhoto from "../../assets/images/photos/1.jpg"

interface ImageSliderPropsInterface{
    images: string[] | []
    userId: string
}

const ImageSlider: React.FC<ImageSliderPropsInterface> = ({images, userId}) => {
    console.log(images)
    const [current, setCurrent] = useState(0)
    const length = images.length

    const prevSlide = () => {
        setCurrent(current === 0 ? 0 : current - 1)
    }
    
    const nextSlide = () => {
        setCurrent(current === length - 1 ? length - 1 : current + 1)
    }
    
    console.log(current)

    if(!Array.isArray(images) || images.length <= 0) {
        return (
            <div className="tinder__image-slider">
                <div style={{backgroundImage: `url(${defaultUserPhoto})`}} className="tinder__image-slider-item"></div>
            </div>
        )
    }

    return(
        <div className="tinder__image-slider">
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
                            className="tinder__image-slider-item">
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ImageSlider