import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IUser } from "../../../models/IUser"
import { createChatThunk } from "../../../redux/chatReducer"
import { AppStateType } from "../../../redux/reduxStore"
import { deletePairThunk } from "../../../redux/usersReducer"
import ImageSlider from "../../Slider/ImageSlider/ImageSlider"
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
        dispatch(deletePairThunk({deleteForUserId: userId, userId: currentUser._id}) as any)
        console.log({userId: currentUser._id, createUserPairId: userId})
    }

    const refuseHandler = (userId: string) => {
        deletePair(userId)
        setCurrentPair({} as IUser)
    }

    const acceptHandler = (userId: string) => {
        dispatch(createChatThunk({currentUserId: currentUser._id, otherUserId: currentPair._id}) as any)
        deletePair(userId)
        setCurrentPair({} as IUser)
    }

    return(
        <>
        <div className="pairs__popup">
            <div className="pairs__popup-body">
                <div className="pairs__popup-content pairs__popup-content--pair">
                    <div onClick={() => setCurrentPair({} as IUser)} className="pairs__popup-close"></div>
                    <div className="pairs__popup-slider">
                        <ImageSlider images={[currentPair.pictures.avatar, ...currentPair.pictures.gallery]} userId={currentPair._id} imageExtraClassName='pairs-popup-slider-image'/>
                        <div className="pairs__slider-pair-info">
                            <div className="pairs__slider-info">
                                <div className="pairs__slider-info-name">
                                    {currentPair.name} 
                                </div>
                                <div className="pairs__slider-info-years">
                                    {currentPair.age || 'unknown years'}
                                </div>
                            </div>
                            <div className="pairs__slider-distance">
                                {currentPair.partnerSettings?.distance || 'unknown'} km from you
                            </div>
                        </div>
                    </div>
                    <div onClick={() => scrollToBottom()} className="pairs__popup-scroll-down">
                        <FontAwesomeIcon icon={faChevronDown}/>
                    </div>
                    <div className="pairs__popup-info">
                        <div className="pairs__popup-info-flex">
                            <div className="pairs__popup-info-name">
                                {currentPair.name}
                            </div>
                            <div className="pairs__popup-info-years">
                                {currentPair.age || 'unkown years'}
                            </div>
                        </div>
                        <div className="pairs__popup-info-sex">
                            <FontAwesomeIcon icon={faUser} className="pairs__popup-info-sex-icon"/>
                            {currentPair.sex[0].toUpperCase() + currentPair.sex.slice(1) || 'unkown sex'}
                        </div>
                    </div>
                    <hr className="pairs__popup-info-separator"/>
                    <div className="pairs__popup-description">
                        {currentPair.description}
                    </div>
                    <hr className="pairs__popup-info-separator"/>
                    <div className="pairs__popup-interests">
                        <div className="pairs__popup-interests-title">
                            Interests
                        </div>
                        <div className="pairs__popup-interests-items">
                            {interestsForLoop.map(item => {
                            return(
                                <div key={item} className='pairs__popup-interest'>
                                    {item}
                                </div>
                            )
                            })}
                        </div>
                    </div>
                    <div onClick={() => setIsInterestsListPopupOpen(true)} className="pairs__popup-setting-show-all pairs__popup-show-all">Show all</div>
                    <div className="pairs__popup-setting-btns">
                        <button onClick={() => refuseHandler(currentPair._id)} className="pairs__popup-setting-btn pairs__popup-setting-btn--border">
                            Refuse
                        </button>
                        <button onClick={() => acceptHandler(currentPair._id)} className="pairs__popup-setting-btn">
                            Accept
                        </button>
                    </div>
                    <div ref={bottomElementRef} className="tinder_pairs-popup-bottom"/>
                </div>
                <div onClick={() => setCurrentPair({} as IUser)} className="pairs__popup-close-area"></div>
            </div>
        </div>
        {isInterestsListPopupOpen && <InterestsListPopup interestsList={currentPair.interests} setIsInterestsListPopupOpen={setIsInterestsListPopupOpen} />}
        </>
    )
}

export default PairPopup