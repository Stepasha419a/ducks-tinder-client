import { faHeartCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { AppStateType } from "../../redux/reduxStore"
import Pair from "./Pair"

interface PairsPropsInterface{

}

const Pairs: React.FC<PairsPropsInterface> = () => {
    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)

    const [pairsPaddingWidth, setPairsPaddingWidth] = useState(0)

    const userPairsRef = useRef<HTMLHeadingElement>(null)

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

            </div>
            <div 
                ref={userPairsRef} 
                style={{paddingLeft: `${pairsPaddingWidth}px`, paddingRight: `${pairsPaddingWidth}px`}} 
                className="tinder__pairs-users"
            >
                {currentUser.pairs.map((userId: string) => {
                    return <Pair key={userId} userId={userId}/>
                })}
            </div>
        </div>
    )
}

export default Pairs