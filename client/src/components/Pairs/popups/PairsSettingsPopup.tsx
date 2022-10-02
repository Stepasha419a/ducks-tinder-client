import { useState } from "react"
import InputRange from "react-input-range"

interface PairsSettingsPopupProps{
    interestsList: string[]
    sortSettings: string[]
    addSort: (sort: string) => void
    deleteSort: (sort: string) => void
    setIsSortsListPopupOpen: (setting: boolean) => void
    setIsSortPopupOpen: (setting: boolean) => void
}

const PairsSettingsPopup: React.FC<PairsSettingsPopupProps> = ({interestsList, sortSettings, addSort, deleteSort, setIsSortsListPopupOpen, setIsSortPopupOpen}) => {
    const [distanceSetting, setDistanceSetting] = useState(100)
    const [ageSetting, setAgeSetting] = useState<{min: number, max: number}>({min: 18, max: 100})
    const [photoCount, setPhotoCount] = useState(1)
    const [isIdentify, setIsIdentify] = useState(false)

    const arrForLoop = []
    for (let i = 1; i <= 9; i++) {
        arrForLoop.push(i)
    }

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
                                            <div onClick={() => setPhotoCount(item)} key={item} className={`tinder__pairs-popup-setting-item${photoCount === item ? ' tinder__pairs-popup-setting-item--active' : ''}`}>
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
                                            <div onClick={() => {sortSettings.includes(item) ? deleteSort(item) : addSort(item)}} key={item} className={`tinder__pairs-popup-setting-item${sortSettings.includes(item) ? ' tinder__pairs-popup-setting-item--active' : ''}`}>
                                                {item}
                                            </div>
                                        )
                                    })}
                                </div>
                                <div onClick={() => setIsSortsListPopupOpen(true)} className="tinder__pairs-popup-setting-show-all">Show all</div>
                            </div>
                            <div className="tinder__pairs-popup-hr"></div>
                            <div onClick={() => setIsIdentify(prev => !prev)} className="tinder__pairs-popup-setting tinder__pairs-popup-setting--cursor">
                                <div className="tinder__pairs-popup-setting-change tinder__pairs-popup-setting-change--checkbox">
                                    <div className="tinder__pairs-popup-setting-descr">
                                        Identify confirmed
                                    </div>
                                    <label className="tinder__pairs-popup-setting-label">
                                        <input checked={isIdentify} className="tinder__pairs-popup-setting-checkbox" type="checkbox" id="pairs-popup-identify-checkbox" />
                                        <div onClick={() => setIsIdentify(prev => !prev)} className="tinder__pairs-popup-setting-label-checked"></div>
                                    </label>
                                </div> 
                            </div>
                            <div className="tinder__pairs-popup-hr"></div>
                        </div>
                    </div>
                </div>
    )
}

export default PairsSettingsPopup