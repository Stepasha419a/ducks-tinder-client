import photo from '../../assets/images/photos/1.jpg'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { dialogs, pairs } from '../../assets/hardcodeObjects/hardcodeObjects'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../redux/reduxStore'

type PairType = {
    id: number,
    img: string,
    name: string
}
type DialogType = {
    id: number,
    img: string,
    name: string,
    lastMessage: string
}

const Tinder = () => {
    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)

    const [isPairsOpened, setIsPairsOpened] = useState(true)

    let photoStyle = {
        backgroundImage: `url(${photo})`
    }

    return(
    <div className="tinder">
        <aside className="tinder__info">
            <div className="tinder__info-user">
                <Link className="tinder__info-user-person" to='profile'>
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
                    <div 
                        className={'tinder__info-content-title ' + (isPairsOpened && 'tinder__info-content-title--active')}
                        onClick={() => setIsPairsOpened(true)}>
                        Pairs
                    </div>
                    <div 
                        className={'tinder__info-content-title ' + (!isPairsOpened && 'tinder__info-content-title--active')}
                        onClick={() => setIsPairsOpened(false)}>
                        Messages
                    </div>
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
                    <div className="tinder__info-content-dialogs">
                    {dialogs.map((item: DialogType) => {
                        return (
                            <div className="tinder__info-content-dialogs-item" key={item.id}>
                                <div className="tinder__info-content-dialogs-item-photo" style={photoStyle}/>
                                <div className="tinder__info-content-dialogs-item-descr">
                                    <div className="tinder__info-content-dialogs-item-descr-name">
                                        {item.name}
                                    </div>
                                    <div className="tinder__info-content-dialogs-item-descr-message">
                                        {item.lastMessage}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                    }
                </div>
            </div>
        </aside>
        <div className="tinder__content">
            <div className="tinder__content-search">
                <div className="tinder__content-search-photo">
                    <div className="tinder__content-search-descr">
                        <div className="tinder__content-search-descr-person">
                            Polina <span className="tinder__content-search-descr-years">17</span>
                        </div>
                        <div className="tinder__content-search-descr-distance">
                            30 
                            <span className="tinder__content-search-distance-text">
                                &nbsp;miles from you
                            </span>
                        </div>
                    </div>
                    <div className="tinder__content-search-buttons">
                        <button className="tinder__content-search-btn tinder__content-search-btn--small">cancel</button>
                        <button className="tinder__content-search-btn tinder__content-search-btn--large">dislike</button>
                        <button className="tinder__content-search-btn tinder__content-search-btn--small">super like</button>
                        <button className="tinder__content-search-btn tinder__content-search-btn--large">like</button>
                        <button className="tinder__content-search-btn tinder__content-search-btn--small">boost</button>
                    </div>
                </div>
            </div>
            <div className="tinder__content-instructions">

            </div>
        </div>
    </div>
    )
}

export default Tinder