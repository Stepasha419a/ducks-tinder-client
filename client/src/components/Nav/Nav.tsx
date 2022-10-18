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
            <div className="info__user">
                <Link className="info__user-person" to='/profile'>
                    <Avatar />
                    <div className="info__user-name">
                        {currentUser.name}
                    </div>
                </Link>
                <div className="info__review">
                    <Link className="info__review-link" to='#'>
                        <FontAwesomeIcon icon={faBriefcase} />
                    </Link>
                </div>
                <div className="info__work-mode">
                    <Link className="info__work-mode-link" to='#'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Link>
                </div>
            </div>
            <div className="info__content">
                <div className="info__content-titles">
                    <Link onClick={() => setIsPairsOpened(true)} className={'info__content-title ' + (isPairsOpened ? 'info__content-title--active' : '')} to='/'>
                        Pairs
                    </Link>
                    <Link onClick={() => setIsPairsOpened(false)} className={'info__content-title ' + (!isPairsOpened ? 'info__content-title--active' : '')} to='/chat'>
                        Messages
                    </Link>
                </div>
                <div className="info__content-box">
                    {isPairsOpened ?
                        currentUser.pairs.length ? firstPair.name ? <div className="info__content-pairs">
                                <Link className="info__content-pairs-link" to='/pairs'>
                                    <div style={{backgroundImage: `url(${firstPair.pictures.avatar ? `http://localhost:5000/${firstPair._id}/avatar/` + firstPair.pictures.avatar : defaultPhoto})`}} className="info__content-pairs-box">
                                        <div className="info__content-pairs-box-likes-count">
                                            {currentUser.pairs.length}
                                        </div>
                                        <div className="info__content-pairs-box-likes">
                                            {currentUser.pairs.length} likes
                                        </div>
                                        <FontAwesomeIcon icon={faHeartCircleExclamation} className="info__content-pairs-box-icon"/>
                                    </div>
                                </Link>
                            </div>
                            :
                            <div>loading...</div>
                        :
                            <div className='info__content-no-pairs'>
                                <FontAwesomeIcon icon={faHeart} className="info__content-no-pairs-icon"/>
                                <div className="info__content-no-pairs-text">
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