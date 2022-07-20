import profilePhoto from '../../assets/images/profile/1.png'
import photo from '../../assets/images/photos/1.jpg'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../redux/reduxStore'
import { IUser } from '../../models/IUser'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

type PairType = {
    id: number,
    img: string,
    name: string
}

const Tinder = () => {

    const user = useSelector((state: AppStateType) => state.authPage.user as IUser )

    let photoStyle = {
        backgroundImage: `url(${photo})`
    }
    
      let pairs = [{
        id: 0,
        img: '/images/pairs/0.png',
        name: 'Vlada'
      },
      {
        id: 1,
        img: '/images/pairs/0.png',
        name: 'Alina'
      },
      {
        id: 2,
        img: '/images/pairs/0.png',
        name: 'Alex'
      },
      {
        id: 3,
        img: '/images/pairs/0.png',
        name: 'Stephanie'
      }
      ]

    return(
    <>
    <div className="tinder">
        <aside className="tinder__info">
            <div className="tinder__info-user">
                <div className="tinder__info-user-photo"></div>
                <div className="tinder__info-user-name">
                    Stepan
                </div>
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
                    <div className="tinder__info-content-title tinder__info-content-title--active">
                        Pairs
                    </div>
                    <div className="tinder__info-content-title">
                        Messages
                    </div>
                </div>
                <div className="tinder__info-content-box">
                    <div className="tinder__info-content-pairs">
                    {pairs.map((item: PairType) => {
                        return (
                            <div className="pair" key={item.id}>
                            <div className="photo-box">
                                <img src='./images/pairs/0.png' alt="" className="photo" />
                            </div>
                            <div className="name">
                                {item.name}
                            </div>
                            </div>
                        )
                    })}
                    </div>
                    <div className="tinder__info-content-messages">

                    </div>
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
                    <div className="tinder__content-search-buttons"></div>
                </div>
            </div>
            <div className="tinder__content-instructions">

            </div>
        </div>
    </div>

    {/* <div className="App">
        <div className="info-box">
            <div className="profile-info">
                <Link to="profile">
                    <div className="profile-photo">
                        <img src={profilePhoto} alt="" className="photo" />
                    </div>
                </Link>
                <div className="profile-name">
                {user.name}
                </div>
            </div>

            <div className="socials">
            <div className="navigation">
                <div className="nav nav-pairs">
                <button className="pairs">Pairs</button>
                <hr/>
                </div>
                <div className="nav">
                <button>Messages</button>
                <hr/>
                </div>
            </div>
            <div className="pairs">
                {pairs.map((item: PairType) => {
                return (
                    <div className="pair" key={item.id}>
                    <div className="photo-box">
                        <img src='./images/pairs/0.png' alt="" className="photo" />
                    </div>
                    <div className="name">
                        {item.name}
                    </div>
                    </div>
                )
                })}
            </div>
            <div className="messages">

            </div>
            </div>
        </div>
        <div className="search">
            <div className="window">
            <div className="photo">
                <div style={photoStyle}></div>
            </div>
            <div className="control-panel">
                <button className="Yes">
                Yes
                </button>
                <button className="No">
                No
                </button>
            </div>
            </div>
        </div>
    </div> */}
    </>
    )
}

export default Tinder