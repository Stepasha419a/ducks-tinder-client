import { useState } from "react"
import Cropper from "react-easy-crop"
import InputRange from "react-input-range"
import { useDispatch } from "react-redux"
import { IUser } from "../../../../models/IUser"
import { saveUserImage } from "../../../../redux/usersReducer"
import getCroppedImg from "./cropImage.js"

interface ProfileCropImagePropsInterface{
    currentUser: IUser
    setIsImageCropOpen: (setting: boolean) => void
    imageURL: any
    currentImageCrop: 'avatar' | 'gallery' | ''
    setCurrentImageCrop: (setting: 'avatar' | 'gallery' | '') => void
}

const ProfileCropImage: React.FC<ProfileCropImagePropsInterface> = ({setIsImageCropOpen, imageURL, currentUser, currentImageCrop, setCurrentImageCrop}) => {
    const dispatch = useDispatch()
    const [crop, setCrop] = useState({x: 0, y: 0})
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const cropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const cropImage = async (userId: string, setting: "avatar" | "gallery" | '') => {
        try {
            const {picture}: any = await getCroppedImg(imageURL, croppedAreaPixels, rotation)
            setting && dispatch(saveUserImage({picture, userId, setting}) as any)
            setIsImageCropOpen(false)
            setCurrentImageCrop('')
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="popup crop">
            <div className="popup__body crop__body">
                <div className="popup__content crop__content">
                    <div className="crop__title">Redact photo</div>
                    <div className="crop__image">
                        <Cropper
                            image={imageURL}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={3 / 4}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onRotationChange={setRotation}
                            onCropComplete={cropComplete}
                        />
                    </div>
                    <div className="crop__inputs">
                        <div className="crop__input-range">
                            <InputRange
                                step={0.01}
                                draggableTrack={false}
                                allowSameValues={false}
                                minValue={1.1}
                                maxValue={3}
                                value={zoom}
                                onChange={zoom => setZoom(zoom as number)}
                            />
                        </div>
                    </div>
                    <div className="crop__btns">
                        <button onClick={() => setIsImageCropOpen(false)} className="crop__button">
                            Cancel
                        </button>
                        <button onClick={() => cropImage(currentUser._id, currentImageCrop)} className="crop__button crop__button--select">
                            Select
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCropImage