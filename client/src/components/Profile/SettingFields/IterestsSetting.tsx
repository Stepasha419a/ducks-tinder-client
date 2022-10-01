import { useState } from "react"
import { IUser } from "../../../models/IUser"

interface InterestsSettingPropsInterface{
    currentUser: IUser
    isFormValid: boolean
    isFormCloseable: boolean
    submitSettings: (inputName: string, changedData: string | number | boolean | string[] | {from: number, to: number}, innerObjectName?: string) => void
    cancelHandler: () => void
}

const InterestsSetting: React.FC<InterestsSettingPropsInterface> = ({currentUser, isFormValid, isFormCloseable, submitSettings, cancelHandler}) => {
    const interestsList = ['fighting', 'ski', 'football', 'volleyball', 'tennis', 'ping pong',
    'swimming', 'karting', 'horse ridding', 'hunting', 'fishing', 'skateboarding', 'bicycle', 'running',
    'surfing', 'snowboarding', 'shooting', 'parachuting', 'paintball', 'bowling', 'billiard', 'skates', 
    'dancing', 'cosplay', 'ballet', 'room quest', 'fitness', 'yoga', 'meditation', 'tourism', 'traveling',
    'hiking', 'camping', 'cars', 'education', 'foreign languages', 'cards', 'poker', 'chess', 'checkers',
    'nard', 'psychology', 'table games', 'sport', 'blogging', 'computer games', 'programming', 'drawing',
    '3D drawing', 'gardener', 'animals', 'volunteering', 'serials', 'books', 'movies', 'cinema', 'food',
    'cooking', 'photo', 'design', 'writing', 'music', 'handmade']
    
    const [interests, setInterests] = useState(currentUser.interests as string[])
    const [inputValue, setInputValue] = useState('')
    let filteredResults = [] as string[]

    if(inputValue.length > 1) {
        filteredResults = interestsList.filter(item => {
            if(interests.includes(item)) return 0;

            if(item.slice(0, inputValue.length) === inputValue.toLowerCase().slice(0, inputValue.length)) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        filteredResults = []
    }

    const AddInterest = (itemName: string) => {
        const newInterests = [...interests, itemName]
        setInterests(newInterests)
    }

    const deleteInterest = (itemName: string) => {
        const itemNameIndex = interests.findIndex(item => item === itemName)
        const newInterests = [...interests]
        newInterests.splice(itemNameIndex, 1)
        setInterests(newInterests)
    }

    return(
        <div className="tinder__content-setting">
            <div className="tinder__content-setting-name">
                Interests
            </div>
            <div className="tinder__content-setting-change">
                <div className="tinder__content-setting-search">
                    <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="tinder__content-setting-search-input" placeholder="type your interest's name here" type="text"/>
                    <div className="tinder__content-setting-result">
                        {filteredResults.map(item => {
                            return(
                                <div onClick={() => AddInterest(item)} key={item} className="tinder__content-setting-result-item">
                                    {item}
                                    <div className="tinder__content-setting-result-item-plus"></div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="tinder__content-setting-interests-title">Your interests</div>
                <div className="tinder__content-setting-interests">
                    {interests.map(item => {
                        return(
                            <div onClick={() => deleteInterest(item)} key={item} className="tinder__content-setting-interests-item">
                                {item}
                                <div className="tinder__content-setting-interests-item-xmark"></div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <button disabled={!isFormCloseable} onClick={() => cancelHandler()} className="tinder__content-setting-submit-button tinder__content-setting-submit-button--no-border-bottom">
                Cancel
            </button>
            <button disabled={!isFormValid} onClick={() => submitSettings('interests', interests)} className="tinder__content-setting-submit-button">
                Update my interests
            </button>
        </div>
    )
}

export default InterestsSetting