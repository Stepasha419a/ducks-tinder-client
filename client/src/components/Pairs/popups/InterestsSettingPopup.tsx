import { interestsList } from "../../../models/IUser"

interface InterestsSettingPopupProps{
    pairInterests: string[]
    addSort: (sort: string, field: string) => void
    deleteSort: (sort: string, field: string) => void
    setIsInterestsSettingPopupOpen: (setting: boolean) => void
}

const InterestsSettingPopup: React.FC<InterestsSettingPopupProps> = ({ pairInterests, addSort, deleteSort, setIsInterestsSettingPopupOpen}) => {
    return(
        <div className="pairs-popup">
            <div className="pairs-popup-body">
                <div className="pairs-popup-content pairs-popup-content--overflow">
                    <div className="pairs-popup-title">Interests</div>
                    <div onClick={() => setIsInterestsSettingPopupOpen(false)} className="pairs-popup-close"></div>
                    <div className="pairs-popup-sort-items">
                        {interestsList.map(item => {
                            return(
                                <div onClick={() => {pairInterests.includes(item) ? deleteSort(item, 'interests') : addSort(item, 'interests')}} key={item} className={`pairs-popup-setting-item${pairInterests.includes(item) ? ' pairs-popup-setting-item--active' : ''}`}>{item}</div>
                            )
                        })}
                    </div>
                    <button onClick={() => setIsInterestsSettingPopupOpen(false)} className="pairs-popup-btn pairs-popup-btn--sorts-list">
                        Confirm
                    </button>
                </div>
                <div onClick={() => setIsInterestsSettingPopupOpen(false)} className="pairs-popup-close-area"></div>
            </div>
        </div>
    )
}

export default InterestsSettingPopup