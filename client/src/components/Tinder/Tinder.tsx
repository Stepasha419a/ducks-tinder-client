import profilePhoto from '../../assets/images/profile/1.png'
import photo from '../../assets/images/photos/1.jpg'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../redux/reduxStore'
import { IUser } from '../../models/IUser'
import { Link } from 'react-router-dom'

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
    <div className="App">
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
    </div>
    )
}

export default Tinder