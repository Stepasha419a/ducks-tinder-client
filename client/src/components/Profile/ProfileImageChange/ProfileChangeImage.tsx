import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { IUser } from "../../../models/IUser"
import { deleteUserImage } from "../../../redux/usersReducer"
import ProfileCropImage from "./CropImage/ProfileCropImage"
import ProfileDialogUpload from "./CropImage/ProfileDialogUpload"

interface ProfileChangeImagePropsInterface{
    currentUser: IUser
    setIsImageSetting: (isImageSetting: boolean) => void
}

const ProfileChangeImage: React.FC<ProfileChangeImagePropsInterface> = ({currentUser, setIsImageSetting}) => {
    const dispatch = useDispatch()

    const [isImageCropOpen, setIsImageCropOpen] = useState(false)
    const [isDialogUploadOpen, setIsDialogUploadOpen] = useState(false)
    const [imageURL, setImageURL] = useState({})
    const [currentImageCrop, setCurrentImageCrop] = useState('' as 'avatar' | 'gallery' | '')

    interface imageInterface{
        id: number,
        order: number
        image: string
        setting: string
    }
    const [images, setImages] = useState([] as imageInterface[])
    const [currentImage, setCurrentImage] = useState({} as imageInterface)

    useEffect(() => {
        currentUser.pictures.avatar &&
        setImages([{id: 0, order: 0, image: currentUser.pictures.avatar, setting: 'avatar'}, ...currentUser.pictures.gallery.map((image, index) => {
            return {id: index + 1, order: index + 1, image: image, setting: 'gallery'}
        })])

        !currentUser.pictures.avatar &&
        setImages(['' as any, ...currentUser.pictures.gallery.map((image, index) => {
            return {id: index + 1, order: index + 1, image: image, setting: 'gallery'}
        })])
    }, [currentUser.pictures.avatar, currentUser.pictures.gallery])

    const openSettingHandler = (setting: 'avatar' | 'gallery' | '') => {
        setCurrentImageCrop(setting)
        setIsDialogUploadOpen(true)
    }

    const deleteImageHandler = (pictureName: string, userId: string, setting: 'avatar' | 'gallery') => {
        dispatch(deleteUserImage({pictureName, userId, setting}) as any)
    }

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

    const dragStartHangler = (e: any, card: imageInterface) => {
        setCurrentImage(card)
    }

    const dragEndHangler = (e: any, card: string, setting: string) => {
        e.target.style.backgroundImage = `url(http://localhost:5000/${currentUser._id}/${setting}/${card})`
        e.target.style.backgroundPosition = '50% 79.5455%'
        e.target.style.backgroundSize = 'auto 100%'
        e.target.style.backgroundRepeat = 'no-repeat'
        e.target.style.opacity = '1'
    }

    const dragOverHangler = (e: any) => {
        e.preventDefault()
        e.target.style.opacity = '0.5'

    }

    const dropHangler = (e: any, card: imageInterface) => {
        e.preventDefault() //@ts-ignore
        setCurrentImage(images.map(image => {
            if(image.id === card.id) {
                console.log(images)
                return {...image, order: currentImage.order}
            }

            if(image.id === currentImage.id) {
                return {...image, order: card.order}
            }
            return image
        })) 
        e.target.style.opacity = '1'
    }

    const sortCards = (a: imageInterface, b: imageInterface) => a.order - b.order;

    return(
        <>
            <div className="tinder__content-change-images">
                {images.sort(sortCards).map((imageObj, index) => {
                    if(!imageObj) {
                        return(
                            <div onClick={() => index === 0 ? openSettingHandler('avatar') : openSettingHandler('gallery')} key={index} className="tinder__content-change-images-item">
                                <div className="tinder__content-change-images-col-item-img" />
                                <button className="tinder__content-change-images-col-item-btn--plus">
                                    <FontAwesomeIcon className="tinder__content-change-images-col-item-btn-mark--plus" icon={faPlus}/>
                                </button>
                            </div>
                        )
                    }
                    return(
                        <div key={index} className="tinder__content-change-images-item">
                            <div 
                                draggable
                                onDragStart={(e) => dragStartHangler(e, imageObj)}
                                onDragLeave={e => dragEndHangler(e, imageObj.image, imageObj.setting)}
                                onDragEnd={e => dragEndHangler(e, imageObj.image, imageObj.setting)}
                                onDragOver={e => dragOverHangler(e)}
                                onDrop={e => dropHangler(e, imageObj)} 
                                style={{backgroundImage: `url(http://localhost:5000/${currentUser._id}/${imageObj.setting}/${imageObj.image})`}} 
                                className="tinder__content-change-images-col-item-img tinder__content-change-images-col-item-img--image" 
                            />
                            <button onClick={() => deleteImageHandler(imageObj.image, currentUser._id, imageObj.setting as 'avatar' | 'gallery')} className="tinder__content-change-images-col-item-btn--xmark">
                                <FontAwesomeIcon className="tinder__content-change-images-col-item-btn-mark--xmark" icon={faXmark}/>
                            </button>
                        </div>
                    )
                })}
                
                {arrForLoop.map(item => {
                    return(
                        <div onClick={() => openSettingHandler('gallery')} key={item} className="tinder__content-change-images-item">
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

            {isDialogUploadOpen &&
                <ProfileDialogUpload onImageChange={onImageChange} setIsDialogUploadOpen={setIsDialogUploadOpen}/>
            }

            {isImageCropOpen &&
                <ProfileCropImage setIsImageCropOpen={setIsImageCropOpen} imageURL={imageURL} currentUser={currentUser} currentImageCrop={currentImageCrop} setCurrentImageCrop={setCurrentImageCrop}/>
            }
        </>
    )
}

export default ProfileChangeImage