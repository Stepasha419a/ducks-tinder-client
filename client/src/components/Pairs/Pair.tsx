import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { IUser } from "../../models/IUser"
import { getUserThunk } from "../../redux/usersReducer"
import defaultPhoto from '../../assets/images/photos/1.jpg'

interface PairPropsInterface {
    userId: string
}

const Pair: React.FC<PairPropsInterface> = ({userId}) => {
    const dispatch = useDispatch()

    const [user, setUser] = useState({} as IUser)

    useEffect(() => {
        const fetchUser = async () => {
            const data = await dispatch(getUserThunk({id: userId}) as any)
            return data.payload
        }
        
        fetchUser().then(data => setUser(data))
    }, [dispatch, userId])

    console.log(user)

    if(!user.name) {
        return <div>loading...</div>
    }

    return(
        <div style={{backgroundImage: `url(${user.pictures.avatar ? `http://localhost:5000/${user._id}/avatar/` + user.pictures.avatar : defaultPhoto})`}} className="tinder__pairs-user">
            <div className="tinder__pairs-user-info">
                <div className="tinder__pairs-user-descr">
                    <div className="tinder__pairs-user-name">{user.name}</div>
                    <div className="tinder__pairs-user-years">{user.age}</div>
                </div>
                <div className="tinder__pairs-user-distance">
                    {user.partnerSettings?.distance || 'unknown'}
                    <span className="tinder__pairs-user-distance-text">
                        miles from you
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Pair