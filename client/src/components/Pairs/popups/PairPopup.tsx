import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IUser } from "../../../models/IUser"
import { createDialogThunk } from "../../../redux/chatReducer"
import { AppStateType } from "../../../redux/reduxStore"
import { deletePairThunk } from "../../../redux/usersReducer"
import ImageSlider from "../../Slider/ImageSlider"
import InterestsListPopup from "./InterestsListPopup"

interface PairPopupProps{
    currentPair: IUser
    setCurrentPair: (pair: IUser) => void
}

const PairPopup: React.FC<PairPopupProps> = ({currentPair, setCurrentPair}) => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)

    const [isInterestsListPopupOpen, setIsInterestsListPopupOpen] = useState(false)

    const bottomElementRef = useRef<null | HTMLElement>(null) as React.MutableRefObject<HTMLInputElement>;

    const interestsForLoop = []

    for (let i = 0; i < 4; i++) {
        currentPair.interests[i] && interestsForLoop.push(currentPair.interests[i]);
    }

    const scrollToBottom = () => {
        bottomElementRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const deletePair = (userId: string) => {
        dispatch(deletePairThunk({userId: currentUser._id, createUserPairId: userId}) as any)
        console.log({userId: currentUser._id, createUserPairId: userId})
    }

    const refuseHandler = (userId: string) => {
        deletePair(userId)
    }

    const acceptHandler = (userId: string) => {
        dispatch(createDialogThunk({currentUserId: currentUser._id, otherUserId: currentPair._id}) as any)
        deletePair(userId)
    }

    return(
        <>
        <div className="tinder__pairs-popup">
            <div className="tinder__pairs-popup-body">
                <div className="tinder__pairs-popup-content tinder__pairs-popup-content--pair">
                    <div onClick={() => setCurrentPair({} as IUser)} className="tinder__pairs-popup-close"></div>
                    <div className="tinder__pairs-popup-slider">
                        <ImageSlider images={[currentPair.pictures.avatar, ...currentPair.pictures.gallery]} userId={currentPair._id} imageExtraClassName='tinder__pairs-popup-slider-image'/>
                        <div className="tinder__pairs-slider-pair-info">
                            <div className="tinder__pairs-slider-info">
                                <div className="tinder__pairs-slider-info-name">
                                    {currentPair.name} 
                                </div>
                                <div className="tinder__pairs-slider-info-years">
                                    {currentPair.age || 'unknown years'}
                                </div>
                            </div>
                            <div className="tinder__pairs-slider-distance">
                                {currentPair.partnerSettings?.distance || 'unknown'} km from you
                            </div>
                        </div>
                    </div>
                    <div onClick={() => scrollToBottom()} className="tinder__pairs-popup-scroll-down">
                        <FontAwesomeIcon icon={faChevronDown}/>
                    </div>
                    <div className="tinder__pairs-popup-info">
                        <div className="tinder__pairs-popup-info-flex">
                            <div className="tinder__pairs-popup-info-name">
                                {currentPair.name}
                            </div>
                            <div className="tinder__pairs-popup-info-years">
                                {currentPair.age || 'unkown years'}
                            </div>
                        </div>
                        <div className="tinder__pairs-popup-info-sex">
                            <FontAwesomeIcon icon={faUser} className="tinder__pairs-popup-info-sex-icon"/>
                            {currentPair.sex[0].toUpperCase() + currentPair.sex.slice(1) || 'unkown sex'}
                        </div>
                    </div>
                    <hr className="tinder__pairs-popup-info-separator"/>
                    <div className="tinder__pairs-popup-description">
                        {currentPair.description}
                    </div>
                    <hr className="tinder__pairs-popup-info-separator"/>
                    <div className="tinder__pairs-popup-interests">
                        <div className="tinder__pairs-popup-interests-title">
                            Interests
                        </div>
                        <div className="tinder__pairs-popup-interests-items">
                            {interestsForLoop.map(item => {
                            return(
                                <div key={item} className='tinder__pairs-popup-interest'>
                                    {item}
                                </div>
                            )
                            })}
                        </div>
                    </div>
                    <div onClick={() => setIsInterestsListPopupOpen(true)} className="tinder__pairs-popup-setting-show-all tinder__pairs-popup-show-all">Show all</div>
                    <div className="tinder__pairs-popup-setting-btns">
                        <button onClick={() => refuseHandler(currentPair._id)} className="tinder__pairs-popup-setting-btn tinder__pairs-popup-setting-btn--border">
                            Refuse
                        </button>
                        <button onClick={() => acceptHandler(currentPair._id)} className="tinder__pairs-popup-setting-btn">
                            Accept
                        </button>
                    </div>
                    <div ref={bottomElementRef} className="tinder_pairs-popup-bottom"/>
                </div>
                <div onClick={() => setCurrentPair({} as IUser)} className="tinder__pairs-popup-close-area"></div>
            </div>
        </div>
        {isInterestsListPopupOpen && <InterestsListPopup interestsList={currentPair.interests} setIsInterestsListPopupOpen={setIsInterestsListPopupOpen} />}
        </>
    )
}

export default PairPopup