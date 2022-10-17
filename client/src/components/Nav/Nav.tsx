import { faBriefcase, faHeart, faHeartCircleExclamation, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
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
        <aside className="info">
            <div className="info-user">
                <Link className="info-user-person" to='/profile'>
                    <Avatar />
                    <div className="info-user-name">
                        {currentUser.name}
                    </div>
                </Link>
                <div className="info-review">
                    <Link className="info-review-link" to='#'>
                        <FontAwesomeIcon icon={faBriefcase} />
                    </Link>
                </div>
                <div className="info-work-mode">
                    <Link className="info-work-mode-link" to='#'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Link>
                </div>
            </div>
            <div className="info-content">
                <div className="info-content-titles">
                    <Link onClick={() => setIsPairsOpened(true)} className={'info-content-title ' + (isPairsOpened ? 'info-content-title--active' : '')} to='/'>
                        Pairs
                    </Link>
                    <Link onClick={() => setIsPairsOpened(false)} className={'info-content-title ' + (!isPairsOpened ? 'info-content-title--active' : '')} to='/chat'>
                        Messages
                    </Link>
                </div>
                <div className="info-content-box">
                    {isPairsOpened ?
                        currentUser.pairs.length ? firstPair.name ? <div className="info-content-pairs">
                                <Link className="info-content-pairs-link" to='/pairs'>
                                    <div style={{backgroundImage: `url(${firstPair.pictures.avatar ? `http://localhost:5000/${firstPair._id}/avatar/` + firstPair.pictures.avatar : defaultPhoto})`}} className="info-content-pairs-box">
                                        <div className="info-content-pairs-box-likes-count">
                                            {currentUser.pairs.length}
                                        </div>
                                        <div className="info-content-pairs-box-likes">
                                            {currentUser.pairs.length} likes
                                        </div>
                                        <FontAwesomeIcon icon={faHeartCircleExclamation} className="info-content-pairs-box-icon"/>
                                    </div>
                                </Link>
                            </div>
                            :
                            <div>loading...</div>
                        :
                            <div className='info-content-no-pairs'>
                                <FontAwesomeIcon icon={faHeart} className="info-content-no-pairs-icon"/>
                                <div className="info-content-no-pairs-text">
                                    You don't have likes. Like someone to have a like too
                                </div>
                            </div>

                    :
                    <Dialogs socket={socket}/>
                    }
                </div>
            </div>
        </aside>
    )
}

export default Nav