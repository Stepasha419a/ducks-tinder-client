import { faHeartCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"

interface PairsPropsInterface{

}

const Pairs: React.FC<PairsPropsInterface> = () => {
    const [pairsPaddingWidth, setPairsPaddingWidth] = useState(0)

    const userPairsRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        if(userPairsRef.current) {
            const {width} = userPairsRef.current.getBoundingClientRect()
            console.log(width)
            setPairsPaddingWidth(width % 254 / 2)
        }
    }, [userPairsRef.current?.clientWidth])

    console.log(userPairsRef)

    return(
        <div className="tinder__pairs">
            <div className="tinder__pairs-likes">
                <FontAwesomeIcon icon={faHeartCircleExclamation} className="tinder__pairs-likes-icon"/>
                &nbsp;15 likes
            </div>
            <div className="tinder__pairs-settings">

            </div>
            <div 
                ref={userPairsRef} 
                style={{paddingLeft: `${pairsPaddingWidth}px`, paddingRight: `${pairsPaddingWidth}px`}} 
                className="tinder__pairs-users"
            >
                <div className="tinder__pairs-user">
                    <div className="tinder__pairs-user-name">

                    </div>
                    <div className="tinder__pairs-user-descr">

                    </div>
                </div>
                <div className="tinder__pairs-user">
                    <div className="tinder__pairs-user-name">

                    </div>
                    <div className="tinder__pairs-user-descr">
                        
                    </div>
                </div>
                <div className="tinder__pairs-user">
                    <div className="tinder__pairs-user-name">

                    </div>
                    <div className="tinder__pairs-user-descr">
                        
                    </div>
                </div>
                <div className="tinder__pairs-user">
                    <div className="tinder__pairs-user-name">

                    </div>
                    <div className="tinder__pairs-user-descr">
                        
                    </div>
                </div>
                <div className="tinder__pairs-user">
                    <div className="tinder__pairs-user-name">

                    </div>
                    <div className="tinder__pairs-user-descr">
                        
                    </div>
                </div>
                <div className="tinder__pairs-user">
                    <div className="tinder__pairs-user-name">

                    </div>
                    <div className="tinder__pairs-user-descr">
                        
                    </div>
                </div>
                <div className="tinder__pairs-user">
                    <div className="tinder__pairs-user-name">

                    </div>
                    <div className="tinder__pairs-user-descr">

                    </div>
                </div>
                <div className="tinder__pairs-user">
                    <div className="tinder__pairs-user-name">

                    </div>
                    <div className="tinder__pairs-user-descr">
                        
                    </div>
                </div>
                <div className="tinder__pairs-user">
                    <div className="tinder__pairs-user-name">

                    </div>
                    <div className="tinder__pairs-user-descr">
                        
                    </div>
                </div>
                <div className="tinder__pairs-user">
                    <div className="tinder__pairs-user-name">

                    </div>
                    <div className="tinder__pairs-user-descr">
                        
                    </div>
                </div>
                <div className="tinder__pairs-user">
                    <div className="tinder__pairs-user-name">

                    </div>
                    <div className="tinder__pairs-user-descr">
                        
                    </div>
                </div>
                <div className="tinder__pairs-user">
                    <div className="tinder__pairs-user-name">

                    </div>
                    <div className="tinder__pairs-user-descr">
                        
                    </div>
                </div>
                <div className="tinder__pairs-user">
                    <div className="tinder__pairs-user-name">

                    </div>
                    <div className="tinder__pairs-user-descr">

                    </div>
                </div>
                <div className="tinder__pairs-user">
                    <div className="tinder__pairs-user-name">

                    </div>
                    <div className="tinder__pairs-user-descr">
                        
                    </div>
                </div>
                <div className="tinder__pairs-user">
                    <div className="tinder__pairs-user-name">

                    </div>
                    <div className="tinder__pairs-user-descr">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pairs