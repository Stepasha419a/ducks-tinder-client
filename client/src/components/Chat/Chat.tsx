import { faBriefcase, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import photo from '../../assets/images/photos/1.jpg'
import { AppStateType } from "../../redux/reduxStore"
import { dialogs, pairs } from '../../assets/hardcodeObjects/hardcodeObjects'
import { useEffect, useState } from "react"
import axios from "axios"

type PairType = {
    id: number,
    img: string,
    name: string
}
type DialogType = {
    id: number,
    img: string,
    name: string,
    lastMessage: string
}

interface ChatPropsInterface{
    isPairsOpened: boolean,
    setIsPairsOpened: (setting: boolean) => void
}

const Chat: React.FC<ChatPropsInterface> = ({isPairsOpened, setIsPairsOpened}) => {
    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)

    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async () => {
        const eventSource = new EventSource(`http://localhost:5000/api/chat/connect`)
        eventSource.onmessage = (event: any) => {
            const message = JSON.parse(event.data)
            setMessages(prev => [...prev, message] as any)
        }
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/api/chat/sendMessage', {
            message: value,
            id: Date.now()
        })
    }

    let photoStyle = {
        backgroundImage: `url(${photo})`
    }

    return(
        <div className="tinder">
        <aside className="tinder__info">
            <div className="tinder__info-user">
                <Link className="tinder__info-user-person" to='profile'>
                    {currentUser.pictures.avatar ?
                    <div style={{backgroundImage: `url(http://localhost:5000/${currentUser._id}/avatar/${currentUser.pictures.avatar})`}} className="tinder__info-user-photo"></div>
                    :
                    <div style={{backgroundImage: `url(${photo})`}} className="tinder__info-user-photo"></div>
                    }
                    <div className="tinder__info-user-name">
                        {currentUser.name}
                    </div>
                </Link>
                <div className="tinder__info-review">
                    <Link className="tinder__info-review-link" to='#'>
                        <FontAwesomeIcon icon={faBriefcase} />
                    </Link>
                </div>
                <div className="tinder__info-work-mode">
                    <Link className="tinder__info-work-mode-link" to='#'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Link>
                </div>
            </div>
            <div className="tinder__info-content">
                <div className="tinder__info-content-titles">
                    <Link onClick={() => setIsPairsOpened(true)} className={'tinder__info-content-title ' + (isPairsOpened ? 'tinder__info-content-title--active' : '')} to='/'>
                        Pairs
                    </Link>
                    <Link onClick={() => setIsPairsOpened(false)} className={'tinder__info-content-title ' + (!isPairsOpened ? 'tinder__info-content-title--active' : '')} to='/'>
                        Messages
                    </Link>
                </div>
                <div className="tinder__info-content-box">
                    {isPairsOpened ?
                    <div className="tinder__info-content-pairs">
                    {pairs.map((item: PairType) => {
                        return (
                            <div className="tinder__info-content-pairs-item" key={item.id}>
                                <div className="tinder__info-content-pairs-item-photo" style={photoStyle}/>
                                <div className="tinder__info-content-pairs-item-name">
                                    {item.name}
                                </div>
                            </div>
                        )
                    })}
                    </div>
                    :
                    <div className="tinder__info-content-dialogs">
                    {dialogs.map((item: DialogType) => {
                        return (
                            <div className="tinder__info-content-dialogs-item" key={item.id}>
                                <div className="tinder__info-content-dialogs-item-photo" style={photoStyle}/>
                                <div className="tinder__info-content-dialogs-item-descr">
                                    <div className="tinder__info-content-dialogs-item-descr-name">
                                        {item.name}
                                    </div>
                                    <div className="tinder__info-content-dialogs-item-descr-message">
                                        {item.lastMessage}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                    }
                </div>
            </div>
        </aside>
        <div className="tinder__chat">
            <div className="tinder__chat-container">
                <div className="tinder__chat-messages">
                    {messages.map((message: any) =>
                        <div key={message.id} className="tinder__chat-message">
                            {message.message}
                        </div>
                    )}
                </div>
                <div className="tinder__chat-form">
                    <input value={value} onChange={(e) => setValue(e.target.value)} className="tinder__chat-form-input" type="text" />
                    <button onClick={sendMessage} className="tinder__chat-form-button">send</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Chat