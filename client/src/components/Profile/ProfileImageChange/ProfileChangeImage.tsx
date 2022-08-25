import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { IUser } from "../../../models/IUser"
import ProfileCropImage from "./CropImage/ProfileCropImage"

interface ProfileChangeImagePropsInterface{
    currentUser: IUser
    setIsImageSetting: (isImageSetting: boolean) => void
}

const ProfileChangeImage: React.FC<ProfileChangeImagePropsInterface> = ({currentUser, setIsImageSetting}) => {
    const [isImageCropOpen, setIsImageCropOpen] = useState(true)

    let arrForLoop = []
    for(let i = 0; i < 9 - currentUser.pictures.length; i++) {
        arrForLoop.push(i)
    }

    const submitHandler = () => {
        setIsImageSetting(false)
    }

    return(
        <>
            <div className="tinder__content-change-images">
                {currentUser.pictures.map(picture => {
                    return(
                        <div key={picture} className="tinder__content-change-images-item">
                            <div style={{backgroundImage: `url(http://localhost:5000/${currentUser._id}/${picture})`}} className="tinder__content-change-images-col-item-img tinder__content-change-images-col-item-img--image" />
                            <button className="tinder__content-change-images-col-item-btn--xmark">
                                <FontAwesomeIcon className="tinder__content-change-images-col-item-btn-mark--xmark" icon={faXmark}/>
                            </button>
                        </div>
                    )
                })}
                {arrForLoop.map(item => {
                    return(
                        <div onClick={() => setIsImageCropOpen(true)} key={item} className="tinder__content-change-images-item">
                            <div className="tinder__content-change-images-col-item-img" />
                            <button className="tinder__content-change-images-col-item-btn--plus">
                                <FontAwesomeIcon className="tinder__content-change-images-col-item-btn-mark--plus" icon={faPlus}/>
                            </button>
                        </div>
                    )
                })
                }
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

            {isImageCropOpen &&
                <ProfileCropImage setIsImageCropOpen={setIsImageCropOpen}/>
            }
        </>
    )
}

export default ProfileChangeImage