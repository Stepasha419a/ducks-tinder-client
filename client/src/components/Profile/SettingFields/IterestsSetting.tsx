import { useState } from "react"
import { IUser } from "../../../models/IUser"

interface InterestsSettingPropsInterface{
    currentUser: IUser
    isFormValid: boolean
    isFormCloseable: boolean
    submitSettings: (inputName: string, changedData: string | number, innerObjectName?: string) => void
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
            if(item.slice(0, inputValue.length) === inputValue.toLowerCase().slice(0, inputValue.length)) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        filteredResults = []
    }

    return(
        <div className="tinder__content-setting">
            <div className="tinder__content-setting-name">
                Interests
            </div>
            <div className="tinder__content-setting-change">
                <div className="tinder__content-setting-change-search">
                    <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="tinder__content-setting-change-search-input" placeholder="type your interest name here" type="text"/>
                    <div className="tinder__content-setting-change-search-result">
                        {filteredResults.map(item => {
                            return(
                                <div key={item}>{item}</div>
                            )
                        })}
                    </div>
                </div>
                <div className="tinder__content-setting-change-interests">
                    {interests.map(item => {
                        return(
                            <div key={item}>{item}</div>
                        )
                    })}
                </div>
            </div>
            <button disabled={!isFormCloseable} onClick={() => cancelHandler()} className="tinder__content-setting-submit-button tinder__content-setting-submit-button--no-border-bottom">
                Cancel
            </button>
            <button disabled={!isFormValid} onClick={() => submitSettings('interests', 'inputValue')} className="tinder__content-setting-submit-button">
                Update my interests
            </button>
        </div>
    )
}

export default InterestsSetting