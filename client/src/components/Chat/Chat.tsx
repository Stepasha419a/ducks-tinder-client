import { useSelector } from "react-redux"
import { AppStateType } from "../../redux/reduxStore"
import { MutableRefObject, useRef, useState } from "react"
import Nav from "../Nav/Nav"

interface ChatPropsInterface{
    isPairsOpened: boolean,
    setIsPairsOpened: (setting: boolean) => void
}

const Chat: React.FC<ChatPropsInterface> = ({isPairsOpened, setIsPairsOpened}) => {
    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)

    const [messages, setMessages] = useState([] as string[])
    const [value, setValue] = useState('')
    const socket: MutableRefObject<WebSocket | undefined> = useRef()
    const [connected, setConnected] = useState(false)

    function connect() {
        socket.current = new WebSocket('ws://localhost:5001/631ce80629e52709bada95d1')
        
        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username: currentUser.name,
                id: Date.now()
            }
            socket.current?.send(JSON.stringify(message))
        }

        socket.current.onmessage = (event: any) => {
            const message = JSON.parse(event.data)
            setMessages((prev: string[]) => [...prev, message])
        }

        socket.current.onclose = () => {
            setConnected(false)
        }

        socket.current.onerror = () => {
            
        }
    }

    const sendMessage = async () => {
        const message = {
            username: currentUser.name,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current?.send(JSON.stringify(message))
        setValue('')
    }

    return(
        <div className="tinder">
            <Nav isPairsOpened={isPairsOpened} setIsPairsOpened={setIsPairsOpened}/>
            <div className="tinder__chat">
                {connected ?
                    <div className="tinder__chat-container">
                        <div className="tinder__chat-messages">
                            {messages.slice(1).map((message: any) =>
                                <div key={message.id} className="tinder__chat-message">
                                    {message.username}: {message.message}
                                </div>
                            )}
                        </div>
                        <div className="tinder__chat-form">
                            <input value={value} onChange={(e) => setValue(e.target.value)} className="tinder__chat-form-input" type="text" />
                            <button onClick={sendMessage} className="tinder__chat-form-button">send</button>
                        </div>
                    </div>
                :
                    <div>
                        <button onClick={connect} className='tinder__chat-form-button'>Войти</button>
                    </div>
                }
            </div>
    </div>
    )
}

export default Chat