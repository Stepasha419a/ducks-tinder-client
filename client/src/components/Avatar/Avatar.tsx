import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from "../../redux/reduxStore"
import defaultPhoto from '../../assets/images/photos/1.jpg'
import { useEffect, useState } from "react"
import { getUserThunk } from "../../redux/usersReducer"
import { IUser } from "../../models/IUser"

interface AvatarInterface{
    otherUserId?: string
    imageExtraClassName?: string
    showDefaultPhoto?: boolean
}

const Avatar: React.FC<AvatarInterface> = ({otherUserId, imageExtraClassName, showDefaultPhoto}) => {
    const dispatch = useDispatch()

    let currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const [otherUser, setOtherUser] = useState(null as IUser | null)

    useEffect(() => {
        if(otherUserId) {
            dispatch(getUserThunk({id: otherUserId}) as any).then((res: any) => setOtherUser(res.payload))
        }
    }, [otherUserId, dispatch])

    if((otherUserId && !otherUser?.pictures.avatar) || !currentUser.pictures.avatar || showDefaultPhoto) {
        return <div style={{backgroundImage: `url(${defaultPhoto})`}} className={`tinder__info-user-photo ${imageExtraClassName}`}></div>
    }

    return(
        <div>
            {otherUser ?
                <div style={{backgroundImage: `url(http://localhost:5000/${otherUser._id}/avatar/${otherUser.pictures.avatar})`}} className={`tinder__info-user-photo ${imageExtraClassName}`}></div>
            :
            currentUser &&
                <div style={{backgroundImage: `url(http://localhost:5000/${currentUser._id}/avatar/${currentUser.pictures.avatar})`}} className={`tinder__info-user-photo ${imageExtraClassName}`}></div>
            }
        </div>
    )
}

export default Avatar