import { faHeartCircleExclamation, faSliders } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IUser } from "../../models/IUser"
import { AppStateType } from "../../redux/reduxStore"
import { getUserThunk, setPairSorts } from "../../redux/usersReducer"
import Pair from "./Pair"
import PairsSettingsPopup from "./popups/PairsSettingsPopup"
import PairsSortsListPopup from "./popups/PairsSortsListPopup"
import { sortItemBySettings } from "./utils/PairsUtils"

const Pairs: React.FC = () => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const pairSorts = useSelector((state: AppStateType) => state.usersPage.pairSorts)

    const [pairsPaddingWidth, setPairsPaddingWidth] = useState(0)
    const [pairs, setPairs] = useState([] as IUser[])
    const [isSortPopupOpen, setIsSortPopupOpen] = useState(false)
    const [isSortsListPopupOpen, setIsSortsListPopupOpen] = useState(false)

    const interestsList = ['fighting', 'ski', 'football', 'volleyball', 'tennis', 'ping pong',
    'swimming', 'karting', 'horse ridding', 'hunting', 'fishing', 'skateboarding', 'bicycle', 'running',
    'surfing', 'snowboarding', 'shooting', 'parachuting', 'paintball', 'bowling', 'billiard', 'skates', 
    'dancing', 'cosplay', 'ballet', 'room quest', 'fitness', 'yoga', 'meditation', 'tourism', 'traveling',
    'hiking', 'camping', 'cars', 'education', 'foreign languages', 'cards', 'poker', 'chess', 'checkers',
    'nard', 'psychology', 'table games', 'sport', 'blogging', 'computer games', 'programming', 'drawing',
    '3D drawing', 'gardener', 'animals', 'volunteering', 'serials', 'books', 'movies', 'cinema', 'food',
    'cooking', 'photo', 'design', 'writing', 'music', 'handmade']

    const interestsForLoop = ['music', 'travelling', 'movies', 'sport']

    const userPairsRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        const fetchUser = async (userId: string) => {
            const data = await dispatch(getUserThunk({id: userId}) as any)
            return data.payload
        }
        
        for(let userId of currentUser.pairs) {
            fetchUser(userId).then(data => setPairs(prevPairs => [...prevPairs, data]))
        }
    }, [dispatch, currentUser.pairs])

    useEffect(() => {
        if(userPairsRef.current) {
            const {width} = userPairsRef.current.getBoundingClientRect()
            setPairsPaddingWidth(width % 254 / 2)
        }
    }, [userPairsRef.current?.clientWidth])

    const addSort = (sortSetting: string | number | {min: number, max: number}, field: string) => {
        if(field === 'interests' || field === 'account') {
            const newValue = {[field]: [...pairSorts[field], sortSetting]}
            dispatch(setPairSorts({...pairSorts, ...newValue}))
        } else {
            const newValue = {[field]: sortSetting}
            dispatch(setPairSorts({...pairSorts, ...newValue}))
        }
    }

    const deleteSort = (sortSetting: string | number | {min: number, max: number}, field: string) => {
        if(field === 'interests' || field === 'account') {
            const sortIndex = pairSorts[field].findIndex(item => item === sortSetting)
            const newArr = [...pairSorts[field]]
            newArr.splice(sortIndex, 1)
            dispatch(setPairSorts({...pairSorts, [field]: newArr}))
        } else {
            dispatch(setPairSorts({...pairSorts, [field]: sortSetting}))
        }
    }

    const clearSorts = () => {
        dispatch(setPairSorts({
            distance: 100,
            age: {min: 18, max: 100},
            photos: 1,
            interests: [],
            account: []
        }))
    }

    return(
        <div className="tinder__pairs">
            <div className="tinder__pairs-likes">
                <FontAwesomeIcon icon={faHeartCircleExclamation} className="tinder__pairs-likes-icon"/>
                &nbsp;{currentUser.pairs.length} likes
            </div>
            <div className="tinder__pairs-settings">
                <div onClick={() => setIsSortPopupOpen(true)} className="tinder__pairs-setting">
                    <FontAwesomeIcon icon={faSliders}/>
                </div>
                {interestsForLoop.map(item => {
                    return(
                        <div onClick={() => {pairSorts.interests.includes(item) ? deleteSort(item, 'interests') : addSort(item, 'interests')}} key={item} className={`tinder__pairs-setting${pairSorts.interests.includes(item) ? ' tinder__pairs-setting--sort' : ''}`}>
                            {item}
                        </div>
                    )
                })}
                <div onClick={() => {pairSorts.account.includes('have interests') ? deleteSort('have interests', 'account') : addSort('have interests', 'account')}} className={`tinder__pairs-setting${pairSorts.account.includes('have interests') ? ' tinder__pairs-setting--sort' : ''}`}>
                    have interests
                </div>
            </div>
            <div 
                ref={userPairsRef} 
                style={{paddingLeft: `${pairsPaddingWidth}px`, paddingRight: `${pairsPaddingWidth}px`}} 
                className="tinder__pairs-users"
            >
                {pairs.map((user: IUser) => {
                    const isValid = sortItemBySettings(user, pairSorts)
                    if(isValid) {
                        return <Pair key={user._id} user={user}/>
                    }
                    return null
                })}
            </div>
            {isSortPopupOpen && 
                <PairsSettingsPopup interestsList={interestsList} pairSorts={pairSorts} clearSorts={clearSorts} addSort={addSort} deleteSort={deleteSort} setIsSortPopupOpen={setIsSortPopupOpen} setIsSortsListPopupOpen={setIsSortsListPopupOpen}/>
            }{
            isSortsListPopupOpen &&
                <PairsSortsListPopup interestsList={interestsList} pairSorts={pairSorts} addSort={addSort} deleteSort={deleteSort} setIsSortsListPopupOpen={setIsSortsListPopupOpen}/>
            }
            
        </div>
    )
}

export default Pairs