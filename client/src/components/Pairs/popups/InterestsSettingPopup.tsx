import { interestsList } from "../../../models/IUser"

interface InterestsSettingPopupProps{
    pairInterests: string[]
    addSort: (sort: string, field: string) => void
    deleteSort: (sort: string, field: string) => void
    setIsInterestsSettingPopupOpen: (setting: boolean) => void
}

const InterestsSettingPopup: React.FC<InterestsSettingPopupProps> = ({ pairInterests, addSort, deleteSort, setIsInterestsSettingPopupOpen}) => {
    return(
        <div className="tinder__pairs-popup">
            <div className="tinder__pairs-popup-body">
                <div className="tinder__pairs-popup-content tinder__pairs-popup-content--overflow">
                    <div className="tinder__pairs-popup-title">Interests</div>
                    <div onClick={() => setIsInterestsSettingPopupOpen(false)} className="tinder__pairs-popup-close"></div>
                    <div className="tinder__pairs-popup-sort-items">
                        {interestsList.map(item => {
                            return(
                                <div onClick={() => {pairInterests.includes(item) ? deleteSort(item, 'interests') : addSort(item, 'interests')}} key={item} className={`tinder__pairs-popup-setting-item${pairInterests.includes(item) ? ' tinder__pairs-popup-setting-item--active' : ''}`}>{item}</div>
                            )
                        })}
                    </div>
                    <button onClick={() => setIsInterestsSettingPopupOpen(false)} className="tinder__pairs-popup-btn tinder__pairs-popup-btn--sorts-list">
                        Confirm
                    </button>
                </div>
                <div onClick={() => setIsInterestsSettingPopupOpen(false)} className="tinder__pairs-popup-close-area"></div>
            </div>
        </div>
    )
}

export default InterestsSettingPopup