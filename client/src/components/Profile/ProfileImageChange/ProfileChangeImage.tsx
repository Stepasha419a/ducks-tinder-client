import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { IUser } from "../../../models/IUser"
import ProfileCropImage from "./CropImage/ProfileCropImage"
import ProfileDialogUpload from "./CropImage/ProfileDialogUpload"

interface ProfileChangeImagePropsInterface{
    currentUser: IUser
    setIsImageSetting: (isImageSetting: boolean) => void
}

const ProfileChangeImage: React.FC<ProfileChangeImagePropsInterface> = ({currentUser, setIsImageSetting}) => {
    const [isImageCropOpen, setIsImageCropOpen] = useState(false)
    const [isDialogUploadOpen, setIsDialogUploadOpen] = useState(false)
    const [imageURL, setImageURL] = useState({})

    const onImageChange = (e: any) => {
        setIsDialogUploadOpen(false)
        const [image] = e.target.files
        setImageURL(URL.createObjectURL(image))
        setIsImageCropOpen(true)
    }

    let arrForLoop = []
    for(let i = 0; i < 9 - currentUser.pictures.gallery.length - 1; i++) {
        arrForLoop.push(i)
    }

    const submitHandler = () => {
        setIsImageSetting(false)
    }

    return(
        <>
            <div className="tinder__content-change-images">
                {currentUser.pictures.avatar ?
                <div className="tinder__content-change-images-item">
                    <div style={{backgroundImage: `url(http://localhost:5000/${currentUser._id}/avatar/${currentUser.pictures.avatar})`}} className="tinder__content-change-images-col-item-img tinder__content-change-images-col-item-img--image" />
                    <button className="tinder__content-change-images-col-item-btn--xmark">
                        <FontAwesomeIcon className="tinder__content-change-images-col-item-btn-mark--xmark" icon={faXmark}/>
                    </button>
                </div>
                :
                <div onClick={() => setIsDialogUploadOpen(true)} className="tinder__content-change-images-item">
                    <div className="tinder__content-change-images-col-item-img" />
                    <button className="tinder__content-change-images-col-item-btn--plus">
                        <FontAwesomeIcon className="tinder__content-change-images-col-item-btn-mark--plus" icon={faPlus}/>
                    </button>
                </div>
                }
                {currentUser.pictures.gallery.map(picture => {
                    return(
                        <div key={picture} className="tinder__content-change-images-item">
                            <div style={{backgroundImage: `url(http://localhost:5000/${currentUser._id}/gallery/${picture})`}} className="tinder__content-change-images-col-item-img tinder__content-change-images-col-item-img--image" />
                            <button className="tinder__content-change-images-col-item-btn--xmark">
                                <FontAwesomeIcon className="tinder__content-change-images-col-item-btn-mark--xmark" icon={faXmark}/>
                            </button>
                        </div>
                    )
                })}
                {arrForLoop.map(item => {
                    return(
                        <div onClick={() => setIsDialogUploadOpen(true)} key={item} className="tinder__content-change-images-item">
                            <div className="tinder__content-change-images-col-item-img" />
                            <button className="tinder__content-change-images-col-item-btn--plus">
                                <FontAwesomeIcon className="tinder__content-change-images-col-item-btn-mark--plus" icon={faPlus}/>
                            </button>
                        </div>
                    )
                })
                }
            </div>
            <img src={imageURL as string} alt="asd" />
            <div className="tinder__content-change-descr">
                Add more photos to fill out your profile 
                <br/>by another 4% and get more likes.
            </div>
            <div className="tinder__content-change-save">
                <button onClick={() => submitHandler()} className="tinder__content-change-save-btn">
                    <span className="tinder__content-change-save-text">Save changes</span>
                </button>
            </div>

            {isDialogUploadOpen &&
                <ProfileDialogUpload onImageChange={onImageChange} setIsDialogUploadOpen={setIsDialogUploadOpen}/>
            }

            {isImageCropOpen &&
                <ProfileCropImage setIsImageCropOpen={setIsImageCropOpen} imageURL={imageURL} currentUser={currentUser}/>
            }
        </>
    )
}

export default ProfileChangeImage