import { ISorts } from "../utils/PairsUtils"

interface PairsSortsListPopupProps{
    interestsList: string[]
    pairSorts: ISorts
    addSort: (sort: string, field: string) => void
    deleteSort: (sort: string, field: string) => void
    setIsSortsListPopupOpen: (setting: boolean) => void
}

const PairsSortsListPopup: React.FC<PairsSortsListPopupProps> = ({interestsList, pairSorts, addSort, deleteSort, setIsSortsListPopupOpen}) => {
    return(
        <div className="tinder__pairs-popup">
            <div className="tinder__pairs-popup-body">
                <div className="tinder__pairs-popup-content tinder__pairs-popup-content--overflow">
                    <div className="tinder__pairs-popup-title">Interests</div>
                    <div onClick={() => setIsSortsListPopupOpen(false)} className="tinder__pairs-popup-close"></div>
                    <div className="tinder__pairs-popup-sort-items">
                        {interestsList.map(item => {
                            return(
                                <div onClick={() => {pairSorts.interests.includes(item) ? deleteSort(item, 'interests') : addSort(item, 'interests')}} key={item} className={`tinder__pairs-popup-setting-item${pairSorts.interests.includes(item) ? ' tinder__pairs-popup-setting-item--active' : ''}`}>{item}</div>
                            )
                        })}
                    </div>
                    <button onClick={() => setIsSortsListPopupOpen(false)} className="tinder__pairs-popup-btn tinder__pairs-popup-btn--sorts-list">
                        Confirm
                    </button>
                </div>
                <div onClick={() => setIsSortsListPopupOpen(false)} className="tinder__pairs-popup-close-area"></div>
            </div>
        </div>
    )
}

export default PairsSortsListPopup