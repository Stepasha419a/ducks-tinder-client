interface PairsSortsListPopupProps{
    interestsList: string[]
    sortSettings: string[]
    addSort: (sort: string) => void
    deleteSort: (sort: string) => void
    setIsSortsListPopupOpen: (setting: boolean) => void
}

const PairsSortsListPopup: React.FC<PairsSortsListPopupProps> = ({interestsList, sortSettings, addSort, deleteSort, setIsSortsListPopupOpen}) => {
    return(
        <div className="tinder__pairs-popup">
            <div className="tinder__pairs-popup-body">
                <div className="tinder__pairs-popup-content tinder__pairs-popup-content--overflow">
                    <div className="tinder__pairs-popup-title">Interests</div>
                    <div onClick={() => setIsSortsListPopupOpen(false)} className="tinder__pairs-popup-close"></div>
                    <div className="tinder__pairs-popup-sort-items">
                        {interestsList.map(item => {
                            return(
                                <div onClick={() => {sortSettings.includes(item) ? deleteSort(item) : addSort(item)}} key={item} className={`tinder__pairs-popup-setting-item${sortSettings.includes(item) ? ' tinder__pairs-popup-setting-item--active' : ''}`}>{item}</div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PairsSortsListPopup