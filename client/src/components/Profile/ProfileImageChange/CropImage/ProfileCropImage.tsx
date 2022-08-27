import { useEffect, useState } from "react"
import Cropper from "react-easy-crop"
import InputRange from "react-input-range"
import { useDispatch } from "react-redux"
import { IUser } from "../../../../models/IUser"
import { saveUserImage } from "../../../../redux/usersReducer"
import getCroppedImg from "./cropImage"

interface ProfileCropImagePropsInterface{
    currentUser: IUser
    setIsImageCropOpen: (setting: boolean) => void
    imageURL: any
}

const ProfileCropImage: React.FC<ProfileCropImagePropsInterface> = ({setIsImageCropOpen, imageURL, currentUser}) => {
    const dispatch = useDispatch()
    const setting = 'gallery'
    const [crop, setCrop] = useState({x: 0, y: 0})
    const [zoom, setZoom] = useState(0.1)
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    useEffect(() => {
        console.log(croppedAreaPixels)
    }, [croppedAreaPixels])

    const cropComplete = (croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const cropImage = async (userId: string, setting: "avatar" | "gallery") => {
        try {
            const {file}: any = await getCroppedImg(imageURL, croppedAreaPixels, rotation)
            dispatch(saveUserImage({file, userId, setting}) as any)
            setIsImageCropOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="tinder__popup tinder__crop">
            <div className="tinder__popup-body tinder__crop-body">
                <div className="tinder__popup-content tinder__crop-content">
                    <div className="tinder__crop-title">Redact photo</div>
                    <div className="tinder__crop-image">
                        <Cropper
                            image={imageURL}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={0.75}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onRotationChange={setRotation}
                            onCropComplete={cropComplete}
                        />
                    </div>
                    <div className="tinder__crop-inputs">
                        <div className="tinder__crop-input-range">
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
                    <div className="tinder__crop-btns">
                        <button onClick={() => setIsImageCropOpen(false)} className="tinder__crop-button">
                            Cancel
                        </button>
                        <button onClick={() => cropImage(currentUser._id, setting)} className="tinder__crop-button tinder__crop-button--select">
                            Select
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCropImage