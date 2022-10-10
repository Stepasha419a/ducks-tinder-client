import { faBolt, faHeart, faRotateLeft, faStar, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface TinderPropsInterface{
    
}

const Tinder: React.FC<TinderPropsInterface> = () => {

    return(
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
                        <button className="tinder__content-search-btn tinder__content-search-btn--small tinder__content-search-btn--gold">
                            <div className="tinder__content-search-btn-icon-wrapper">
                                <FontAwesomeIcon icon={faRotateLeft} className="tinder__content-search-btn-icon tinder__content-search-btn-icon--gold"/>
                            </div>
                        </button>
                        <button className="tinder__content-search-btn tinder__content-search-btn--large tinder__content-search-btn--red">
                            <div className="tinder__content-search-btn-icon-wrapper tinder__content-search-btn-icon-wrapper--large">
                                <FontAwesomeIcon icon={faXmark} className="tinder__content-search-btn-icon tinder__content-search-btn-icon--red tinder__content-search-btn-icon--large"/>
                            </div>
                        </button>
                        <button className="tinder__content-search-btn tinder__content-search-btn--small tinder__content-search-btn--blue">
                            <div className="tinder__content-search-btn-icon-wrapper">
                                <FontAwesomeIcon icon={faStar} className="tinder__content-search-btn-icon tinder__content-search-btn-icon--blue"/>
                            </div>
                        </button>
                        <button className="tinder__content-search-btn tinder__content-search-btn--large tinder__content-search-btn--green">
                            <div className="tinder__content-search-btn-icon-wrapper tinder__content-search-btn-icon-wrapper--large">
                                <FontAwesomeIcon icon={faHeart} className="tinder__content-search-btn-icon tinder__content-search-btn-icon--green"/>
                            </div>
                        </button>
                        <button className="tinder__content-search-btn tinder__content-search-btn--small tinder__content-search-btn--purple">
                            <div className="tinder__content-search-btn-icon-wrapper">
                                <FontAwesomeIcon icon={faBolt} className="tinder__content-search-btn-icon tinder__content-search-btn-icon--purple"/>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="tinder__content-instructions">

            </div>
        </div>
    )
}

export default Tinder