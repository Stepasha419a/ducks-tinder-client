interface InterestsListPopupProps{
    setIsInterestsListPopupOpen: (setting: boolean) => void
    interestsList: string[]
}

const InterestsListPopup: React.FC<InterestsListPopupProps> = ({interestsList, setIsInterestsListPopupOpen}) => {
    return(
        <div className="pairs-popup">
            <div className="pairs-popup-body">
                <div className="pairs-popup-content pairs-popup-content--overflow">
                    <div className="pairs-popup-title">Interests</div>
                    <div onClick={() => setIsInterestsListPopupOpen(false)} className="pairs-popup-close"></div>
                    <div className="pairs-popup-sort-items">
                        {interestsList.map(item => {
                            return(
                                <div key={item} className='pairs-popup-setting-item pairs-popup-setting-item--no-cursor'>{item}</div>
                            )
                        })}
                    </div>
                    <button onClick={() => setIsInterestsListPopupOpen(false)} className="pairs-popup-btn pairs-popup-btn--sorts-list">
                        Close
                    </button>
                </div>
                <div onClick={() => setIsInterestsListPopupOpen(false)} className="pairs-popup-close-area"></div>
            </div>
        </div>
    )
}

export default InterestsListPopup