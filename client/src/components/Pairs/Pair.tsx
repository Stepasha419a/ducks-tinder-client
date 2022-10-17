import { IUser } from "../../models/IUser"
import defaultPhoto from '../../assets/images/photos/1.jpg'

interface PairPropsInterface {
    user: IUser
    setCurrentPair: (pair: IUser) => void
}

const Pair: React.FC<PairPropsInterface> = ({user, setCurrentPair}) => {
    if(!user.name) {
        return <div>loading...</div>
    }

    return(
        <div onClick={() => setCurrentPair(user)} style={{backgroundImage: `url(${user.pictures.avatar ? `http://localhost:5000/${user._id}/avatar/` + user.pictures.avatar : defaultPhoto})`}} className="pairs-user">
            <div className="pairs-user-info">
                <div className="pairs-user-descr">
                    <div className="pairs-user-name">{user.name}</div>
                    <div className="pairs-user-years">{user.age}</div>
                </div>
                <div className="pairs-user-distance">
                    {user.partnerSettings?.distance || 'unknown'}
                    <span className="pairs-user-distance-text">
                        miles from you
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Pair