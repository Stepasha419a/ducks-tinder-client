import { faHeartCircleExclamation, faSliders } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IUser } from "../../models/IUser"
import { AppStateType } from "../../redux/reduxStore"
import { getUserThunk } from "../../redux/usersReducer"
import Pair from "./Pair"
import { sortItemBySettings } from "./utils/PairsUtils"

interface PairsPropsInterface{

}

const Pairs: React.FC<PairsPropsInterface> = () => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)

    const [pairsPaddingWidth, setPairsPaddingWidth] = useState(0)
    const [pairs, setPairs] = useState([] as IUser[])
    const [sortSettings, setSortSettings] = useState(['haveInterests'] as string[])

    const interestsList = ['fighting', 'ski', 'football', 'volleyball', 'tennis', 'ping pong',
    'swimming', 'karting', 'horse ridding', 'hunting', 'fishing', 'skateboarding', 'bicycle', 'running',
    'surfing', 'snowboarding', 'shooting', 'parachuting', 'paintball', 'bowling', 'billiard', 'skates', 
    'dancing', 'cosplay', 'ballet', 'room quest', 'fitness', 'yoga', 'meditation', 'tourism', 'traveling',
    'hiking', 'camping', 'cars', 'education', 'foreign languages', 'cards', 'poker', 'chess', 'checkers',
    'nard', 'psychology', 'table games', 'sport', 'blogging', 'computer games', 'programming', 'drawing',
    '3D drawing', 'gardener', 'animals', 'volunteering', 'serials', 'books', 'movies', 'cinema', 'food',
    'cooking', 'photo', 'design', 'writing', 'music', 'handmade']

    const interestsForLoop = ['music', 'travelling', 'movies', 'sport', 'have Interests']

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

    return(
        <div className="tinder__pairs">
            <div className="tinder__pairs-likes">
                <FontAwesomeIcon icon={faHeartCircleExclamation} className="tinder__pairs-likes-icon"/>
                &nbsp;{currentUser.pairs.length} likes
            </div>
            <div className="tinder__pairs-settings">
                <div className="tinder__pairs-setting">
                    <FontAwesomeIcon icon={faSliders}/>
                </div>
                {interestsForLoop.map(item => {
                    return(
                        <div className="tinder__pairs-setting">
                            {item}
                        </div>
                    )
                })}
            </div>
            <div 
                ref={userPairsRef} 
                style={{paddingLeft: `${pairsPaddingWidth}px`, paddingRight: `${pairsPaddingWidth}px`}} 
                className="tinder__pairs-users"
            >
                {pairs.map((user: IUser) => {
                    const isValid = sortItemBySettings(user, sortSettings)
                    if(isValid || !sortSettings.length) {
                        return <Pair key={user._id} user={user}/>
                    }
                    return null
                })}
            </div>
        </div>
    )
}

export default Pairs