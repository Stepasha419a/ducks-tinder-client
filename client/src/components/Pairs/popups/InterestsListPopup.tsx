interface InterestsListPopupProps{
    setIsInterestsListPopupOpen: (setting: boolean) => void
    interestsList: string[]
}

const InterestsListPopup: React.FC<InterestsListPopupProps> = ({interestsList, setIsInterestsListPopupOpen}) => {
    return(
        <div className="tinder__pairs-popup">
            <div className="tinder__pairs-popup-body">
                <div className="tinder__pairs-popup-content tinder__pairs-popup-content--overflow">
                    <div className="tinder__pairs-popup-title">Interests</div>
                    <div onClick={() => setIsInterestsListPopupOpen(false)} className="tinder__pairs-popup-close"></div>
                    <div className="tinder__pairs-popup-sort-items">
                        {interestsList.map(item => {
                            return(
                                <div key={item} className='tinder__pairs-popup-setting-item tinder__pairs-popup-setting-item--no-cursor'>{item}</div>
                            )
                        })}
                    </div>
                    <button onClick={() => setIsInterestsListPopupOpen(false)} className="tinder__pairs-popup-btn tinder__pairs-popup-btn--sorts-list">
                        Close
                    </button>
                </div>
                <div onClick={() => setIsInterestsListPopupOpen(false)} className="tinder__pairs-popup-close-area"></div>
            </div>
        </div>
    )
}

export default InterestsListPopup