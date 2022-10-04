import { useEffect, useState } from "react"
import InputRange from "react-input-range"
import { ISorts } from "../utils/PairsUtils"

interface PairsSettingsPopupProps{
    interestsList: string[]
    pairSorts: ISorts
    clearSorts: () => void
    addSort: (sortSetting: string | number | {min: number, max: number}, field: string) => void
    deleteSort: (sortSetting: string | number | {min: number, max: number}, field: string) => void
    setIsSortsListPopupOpen: (setting: boolean) => void
    setIsSortPopupOpen: (setting: boolean) => void
}

const PairsSettingsPopup: React.FC<PairsSettingsPopupProps> = ({interestsList, pairSorts, clearSorts, addSort, deleteSort, setIsSortsListPopupOpen, setIsSortPopupOpen}) => {
    const [distanceSetting, setDistanceSetting] = useState(pairSorts.distance)
    const [ageSetting, setAgeSetting] = useState<{min: number, max: number}>(pairSorts.age)
    const [photoCount, setPhotoCount] = useState(pairSorts.photos)

    const arrForLoop = []
    for (let i = 1; i <= 9; i++) {
        arrForLoop.push(i)
    }

    const setPhotosCountHandler = (value: number) => {
        addSort(value, 'photos')
        setPhotoCount(value)
    }

    useEffect(() => {
        setDistanceSetting(pairSorts.distance)
        setAgeSetting(pairSorts.age)
        setPhotoCount(pairSorts.photos)
    }, [pairSorts])

    return(
        <div className="tinder__pairs-popup">
            <div className="tinder__pairs-popup-body">
                <div className="tinder__pairs-popup-content">
                    <div className="tinder__pairs-popup-title">Likes filter</div>
                    <div onClick={() => setIsSortPopupOpen(false)} className="tinder__pairs-popup-close"></div>
                    <div className="tinder__pairs-popup-setting">
                        <div className="tinder__pairs-popup-setting-title">
                            Max distantion
                        </div>
                        <div className="tinder__pairs-popup-setting-value">
                            {distanceSetting} km
                        </div>
                        <div className="tinder__pairs-popup-setting-change">
                            <InputRange
                                step={1}
                                draggableTrack={false}
                                allowSameValues={false}
                                minValue={2}
                                maxValue={100}
                                value={distanceSetting}
                                onChange={setDistanceSetting as any}
                                onChangeComplete={(value) => addSort(value, 'distance')}
                            />
                        </div>
                    </div>
                    <div className="tinder__pairs-popup-hr"></div>
                    <div className="tinder__pairs-popup-setting">
                        <div className="tinder__pairs-popup-setting-title">
                            Age range
                        </div>
                        <div className="tinder__pairs-popup-setting-value">
                            {ageSetting.min} - {ageSetting.max}
                        </div>
                        <div className="tinder__pairs-popup-setting-change">
                            <InputRange
                                step={1}
                                draggableTrack={false}
                                allowSameValues={false}
                                minValue={18}
                                maxValue={100}
                                value={ageSetting}
                                onChange={setAgeSetting as any}
                                onChangeComplete={(value) => addSort(value, 'age')}
                            />
                        </div>
                    </div>
                    <div className="tinder__pairs-popup-hr"></div>
                    <div className="tinder__pairs-popup-setting">
                        <div className="tinder__pairs-popup-setting-title">
                            Min photo's count
                        </div>
                        <div className="tinder__pairs-popup-setting-change tinder__pairs-popup-setting-change--flex">
                            {arrForLoop.map(item => {
                                return(
                                    <div onClick={() => setPhotosCountHandler(item)} key={item} className={`tinder__pairs-popup-setting-item${photoCount === item ? ' tinder__pairs-popup-setting-item--active' : ''}`}>
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="tinder__pairs-popup-hr"></div>
                    <div className="tinder__pairs-popup-setting">
                        <div className="tinder__pairs-popup-setting-title">
                            Interests
                        </div>
                        <div className="tinder__pairs-popup-setting-change tinder__pairs-popup-setting-change--flex">
                            {['music', 'travelling', 'movies'].map(item => {
                                return(
                                    <div onClick={() => {pairSorts.interests.includes(item) ? deleteSort(item, 'interests') : addSort(item, 'interests')}} key={item} className={`tinder__pairs-popup-setting-item${pairSorts.interests.includes(item) ? ' tinder__pairs-popup-setting-item--active' : ''}`}>
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
                        <div onClick={() => setIsSortsListPopupOpen(true)} className="tinder__pairs-popup-setting-show-all">Show all</div>
                    </div>
                    <div className="tinder__pairs-popup-hr"></div>
                    <div onClick={() => {pairSorts.account.includes('identify confirmed') ? deleteSort('identify confirmed', 'account') : addSort('identify confirmed', 'account')}} className="tinder__pairs-popup-setting tinder__pairs-popup-setting--cursor">
                        <div className="tinder__pairs-popup-setting-change tinder__pairs-popup-setting-change--checkbox">
                            <div className="tinder__pairs-popup-setting-descr">
                                Identify confirmed
                            </div>
                            <label className="tinder__pairs-popup-setting-label">
                                <input checked={pairSorts.account.includes('identify confirmed')} className="tinder__pairs-popup-setting-checkbox" type="checkbox" id="pairs-popup-identify-checkbox" />
                                <div onClick={() => {pairSorts.account.includes('identify confirmed') ? deleteSort('identify confirmed', 'account') : addSort('identify confirmed', 'account')}} className="tinder__pairs-popup-setting-label-checked"></div>
                            </label>
                        </div> 
                    </div>
                    <div className="tinder__pairs-popup-hr"></div>
                    <div onClick={() => {pairSorts.account.includes('have interests') ? deleteSort('have interests', 'account') : addSort('have interests', 'account')}} className="tinder__pairs-popup-setting tinder__pairs-popup-setting--cursor">
                        <div className="tinder__pairs-popup-setting-change tinder__pairs-popup-setting-change--checkbox">
                            <div className="tinder__pairs-popup-setting-descr">
                                Have interests
                            </div>
                            <label className="tinder__pairs-popup-setting-label">
                                <input checked={pairSorts.account.includes('have interests')} className="tinder__pairs-popup-setting-checkbox" type="checkbox" id="pairs-popup-identify-checkbox" />
                                <div onClick={() => {pairSorts.account.includes('have interests') ? deleteSort('have interests', 'account') : addSort('have interests', 'account')}} className="tinder__pairs-popup-setting-label-checked"></div>
                            </label>
                        </div> 
                    </div>
                    <div className="tinder__pairs-popup-hr"></div>
                    <div className="tinder__pairs-popup-buttons">
                        <button onClick={() => clearSorts()} className="tinder__pairs-popup-btn tinder__pairs-popup-btn--border">
                            Clear
                        </button>
                        <button onClick={() => setIsSortPopupOpen(false)} className="tinder__pairs-popup-btn">
                            Confirm
                        </button>
                    </div>
                </div>
                <div onClick={() => setIsSortPopupOpen(false)} className="tinder__pairs-popup-close-area"></div>
            </div>
        </div>
    )
}

export default PairsSettingsPopup