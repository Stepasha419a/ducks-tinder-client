import { faBriefcase, faHeartCircleExclamation, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppStateType } from '../../redux/reduxStore'
import Dialogs from '../Chat/Dialogs/Dialogs'
import Avatar from '../Avatar/Avatar'
import { MutableRefObject, useEffect, useState } from 'react'
import { IUser } from '../../models/IUser'
import { getUserThunk } from '../../redux/usersReducer'
import defaultPhoto from '../../assets/images/photos/1.jpg'

interface NavPropsInterface{
    isPairsOpened: boolean,
    setIsPairsOpened: (setting: boolean) => void
    socket: MutableRefObject<WebSocket | undefined>
}

const Nav: React.FC<NavPropsInterface> = ({isPairsOpened, setIsPairsOpened, socket}) => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const [firstPair, setFirstPair] = useState<IUser>({} as IUser)

    useEffect(() => {
        if(currentUser.pairs.length) {
            const fetchUser = async (userId: string) => {
                const data = await dispatch(getUserThunk({id: userId}) as any)
                return data.payload
            }

            fetchUser(currentUser.pairs[0 as number] as string).then(data => setFirstPair(data))
        }
    }, [currentUser.pairs, dispatch])

    return(
        <aside className="tinder__info">
            <div className="tinder__info-user">
                <Link className="tinder__info-user-person" to='/profile'>
                    <Avatar />
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
                        currentUser.pairs.length ? firstPair.name ? <div className="tinder__info-content-pairs">
                                <Link className="tinder__info-content-pairs-link" to='/pairs'>
                                    <div style={{backgroundImage: `url(${firstPair.pictures.avatar ? `http://localhost:5000/${firstPair._id}/avatar/` + firstPair.pictures.avatar : defaultPhoto})`}} className="tinder__info-content-pairs-box">
                                        <div className="tinder__info-content-pairs-box-likes-count">
                                            {currentUser.pairs.length}
                                        </div>
                                        <div className="tinder__info-content-pairs-box-likes">
                                            {currentUser.pairs.length} likes
                                        </div>
                                        <FontAwesomeIcon icon={faHeartCircleExclamation} className="tinder__info-content-pairs-box-icon"/>
                                    </div>
                                </Link>
                            </div>
                            :
                            <div>loading...</div>
                        :
                            <div>You don't have likes. Like someone to have a like too</div>

                    :
                    <Dialogs socket={socket}/>
                    }
                </div>
            </div>
        </aside>
    )
}

export default Nav