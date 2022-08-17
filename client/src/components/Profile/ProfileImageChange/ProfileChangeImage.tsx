import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface ProfileChangeImagePropsInterface{
    setIsImageSetting: (isImageSetting: boolean) => void
}

const ProfileChangeImage: React.FC<ProfileChangeImagePropsInterface> = ({setIsImageSetting}) => {
    const submitHandler = () => {
        setIsImageSetting(false)
    }

    return(
        <>
            <div className="tinder__content-change-images">
                <div className="tinder__content-change-images-col">
                    <div className="tinder__content-change-images-col-item">
                        <div className="tinder__content-change-images-col-item-img" />
                        <button className="tinder__content-change-images-col-item-btn--plus">
                            <FontAwesomeIcon className="tinder__content-change-images-col-item-btn-mark--plus" icon={faPlus}/>
                        </button>
                    </div>
                    <div className="tinder__content-change-images-col-item">
                        <div className="tinder__content-change-images-col-item-img" />
                        <button className="tinder__content-change-images-col-item-btn--plus">
                            <FontAwesomeIcon className="tinder__content-change-images-col-item-btn-mark--plus" icon={faPlus}/>
                        </button>
                    </div>
                    <div className="tinder__content-change-images-col-item">
                        <div className="tinder__content-change-images-col-item-img" />
                        <button className="tinder__content-change-images-col-item-btn--plus">
                            <FontAwesomeIcon className="tinder__content-change-images-col-item-btn-mark--plus" icon={faPlus}/>
                        </button>
                    </div>
                </div>
                <div className="tinder__content-change-images-col">
                <div className="tinder__content-change-images-col-item">
                        <div className="tinder__content-change-images-col-item-img" />
                        <button className="tinder__content-change-images-col-item-btn--plus">
                            <FontAwesomeIcon className="tinder__content-change-images-col-item-btn-mark--plus" icon={faPlus}/>
                        </button>
                    </div>
                    <div className="tinder__content-change-images-col-item">
                        <div className="tinder__content-change-images-col-item-img" />
                        <button className="tinder__content-change-images-col-item-btn--plus">
                            <FontAwesomeIcon className="tinder__content-change-images-col-item-btn-mark--plus" icon={faPlus}/>
                        </button>
                    </div>
                    <div className="tinder__content-change-images-col-item">
                        <div className="tinder__content-change-images-col-item-img" />
                        <button className="tinder__content-change-images-col-item-btn--plus">
                            <FontAwesomeIcon className="tinder__content-change-images-col-item-btn-mark--plus" icon={faPlus}/>
                        </button>
                    </div>
                </div>
                <div className="tinder__content-change-images-col">
                    <div className="tinder__content-change-images-col-item">
                        <div className="tinder__content-change-images-col-item-img" />
                        <button className="tinder__content-change-images-col-item-btn--plus">
                            <FontAwesomeIcon className="tinder__content-change-images-col-item-btn-mark--plus" icon={faPlus}/>
                        </button>
                    </div>
                    <div className="tinder__content-change-images-col-item">
                        <div className="tinder__content-change-images-col-item-img" />
                        <button className="tinder__content-change-images-col-item-btn--plus">
                            <FontAwesomeIcon className="tinder__content-change-images-col-item-btn-mark--plus" icon={faPlus}/>
                        </button>
                    </div>
                    <div className="tinder__content-change-images-col-item">
                        <div className="tinder__content-change-images-col-item-img" />
                        <button className="tinder__content-change-images-col-item-btn--xmark">
                            <FontAwesomeIcon className="tinder__content-change-images-col-item-btn-mark--xmark" icon={faXmark}/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="tinder__content-change-descr">
                Add more photos to fill out your profile 
                <br/>by another 4% and get more likes.
            </div>
            <div className="tinder__content-change-save">
                <button onClick={() => submitHandler()} className="tinder__content-change-save-btn">
                    <span className="tinder__content-change-save-text">Save changes</span>
                </button>
            </div>
        </>
    )
}

export default ProfileChangeImage