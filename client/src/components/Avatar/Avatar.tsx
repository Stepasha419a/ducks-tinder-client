import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from "../../redux/reduxStore"
import defaultPhoto from '../../assets/images/photos/1.jpg'
import { useEffect, useState } from "react"
import { getUserThunk } from "../../redux/usersReducer"
import { IUserUnrequired } from "../../models/IUser"

interface AvatarInterface{
    otherUserId?: string
    imageExtraClassName?: string
    showDefaultPhoto?: boolean
    avatarUrl?: string
}

const Avatar: React.FC<AvatarInterface> = ({otherUserId, imageExtraClassName, showDefaultPhoto, avatarUrl}) => {
    const dispatch = useDispatch()

    let currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const [otherUser, setOtherUser] = useState(null as IUserUnrequired | null)

    useEffect(() => {
        if(otherUserId && !avatarUrl) {
            dispatch(getUserThunk({id: otherUserId}) as any).then((res: any) => setOtherUser(res.payload))
        } else if(otherUserId && avatarUrl) {
            setOtherUser({_id: otherUserId, pictures: {avatar: avatarUrl}})
        }
    }, [otherUserId, avatarUrl, dispatch])

    if((otherUserId && !otherUser?.pictures?.avatar) || (!currentUser.pictures.avatar && !otherUser && otherUserId) || (!currentUser.pictures.avatar && !otherUserId) || showDefaultPhoto) {
        return <div style={{backgroundImage: `url(${defaultPhoto})`}} className={`info__user-photo ${imageExtraClassName}`}></div>
    }

    return(
        <div>
            {otherUser ?
                <div style={{backgroundImage: `url(http://localhost:5000/${otherUser._id}/avatar/${otherUser.pictures?.avatar})`}} className={`info__user-photo ${imageExtraClassName}`}></div>
            :
            currentUser &&
                <div style={{backgroundImage: `url(http://localhost:5000/${currentUser._id}/avatar/${currentUser.pictures.avatar})`}} className={`info__user-photo ${imageExtraClassName}`}></div>
            }
        </div>
    )
}

export default Avatar