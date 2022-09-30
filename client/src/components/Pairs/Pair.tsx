import { IUser } from "../../models/IUser"
import defaultPhoto from '../../assets/images/photos/1.jpg'

interface PairPropsInterface {
    user: IUser
}

const Pair: React.FC<PairPropsInterface> = ({user}) => {
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