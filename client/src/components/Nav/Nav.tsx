import { faBriefcase, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import photo from '../../assets/images/photos/1.jpg'
import { AppStateType } from '../../redux/reduxStore'
import { pairs } from '../../assets/hardcodeObjects/hardcodeObjects'
import Dialogs from '../Dialogs/Dialogs'

type PairType = {
    id: number,
    img: string,
    name: string
}

interface NavPropsInterface{
    isPairsOpened: boolean,
    setIsPairsOpened: (setting: boolean) => void
}

const photoStyle = {
    backgroundImage: `url(${photo})`
}

const Nav: React.FC<NavPropsInterface> = ({isPairsOpened, setIsPairsOpened}) => {
    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)

    return(
        <aside className="tinder__info">
            <div className="tinder__info-user">
                <Link className="tinder__info-user-person" to='/profile'>
                    {currentUser.pictures.avatar ?
                    <div style={{backgroundImage: `url(http://localhost:5000/${currentUser._id}/avatar/${currentUser.pictures.avatar})`}} className="tinder__info-user-photo"></div>
                    :
                    <div style={{backgroundImage: `url(${photo})`}} className="tinder__info-user-photo"></div>
                    }
                    <div className="tinder__info-user-name">
                        {currentUser.name}
                    </div>
                </Link>
                <div className="tinder__info-review">
                    <Link className="tinder__info-review-link" to='#'>
                        <FontAwesomeIcon icon={faBriefcase} />
                    </Link>
                </div>
                <div className="tinder__info-work-mode">
                    <Link className="tinder__info-work-mode-link" to='#'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Link>
                </div>
            </div>
            <div className="tinder__info-content">
                <div className="tinder__info-content-titles">
                    <Link onClick={() => setIsPairsOpened(true)} className={'tinder__info-content-title ' + (isPairsOpened ? 'tinder__info-content-title--active' : '')} to='/'>
                        Pairs
                    </Link>
                    <Link onClick={() => setIsPairsOpened(false)} className={'tinder__info-content-title ' + (!isPairsOpened ? 'tinder__info-content-title--active' : '')} to='/chat'>
                        Messages
                    </Link>
                </div>
                <div className="tinder__info-content-box">
                    {isPairsOpened ?
                    <div className="tinder__info-content-pairs">
                    {pairs.map((item: PairType) => {
                        return (
                            <div className="tinder__info-content-pairs-item" key={item.id}>
                                <div className="tinder__info-content-pairs-item-photo" style={photoStyle}/>
                                <div className="tinder__info-content-pairs-item-name">
                                    {item.name}
                                </div>
                            </div>
                        )
                    })}
                    </div>
                    :
                    <Dialogs />
                    }
                </div>
            </div>
        </aside>
    )
}

export default Nav