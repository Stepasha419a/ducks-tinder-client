interface InterestsListPopupProps{
    setIsInterestsListPopupOpen: (setting: boolean) => void
    interestsList: string[]
}

const InterestsListPopup: React.FC<InterestsListPopupProps> = ({interestsList, setIsInterestsListPopupOpen}) => {
    return(
        <div className="pairs__popup">
            <div className="pairs__popup-body">
                <div className="pairs__popup-content pairs__popup-content--overflow">
                    <div className="pairs__popup-title">Interests</div>
                    <div onClick={() => setIsInterestsListPopupOpen(false)} className="pairs__popup-close"></div>
                    <div className="pairs__popup-sort-items">
                        {interestsList.map(item => {
                            return(
                                <div key={item} className='pairs__popup-setting-item pairs__popup-setting-item--no-cursor'>{item}</div>
                            )
                        })}
                    </div>
                    <button onClick={() => setIsInterestsListPopupOpen(false)} className="pairs__popup-btn pairs__popup-btn--sorts-list">
                        Close
                    </button>
                </div>
                <div onClick={() => setIsInterestsListPopupOpen(false)} className="pairs__popup-close-area"></div>
            </div>
        </div>
    )
}

export default InterestsListPopup