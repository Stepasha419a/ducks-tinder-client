import { useSelector } from "react-redux"
import { AppStateType } from "../../redux/reduxStore"
import { KeyboardEvent, MutableRefObject, useState } from "react"
import Nav from "../Nav/Nav"

interface ChatPropsInterface{
    isPairsOpened: boolean,
    setIsPairsOpened: (setting: boolean) => void
    socket: MutableRefObject<WebSocket | undefined>
}

const Chat: React.FC<ChatPropsInterface> = ({isPairsOpened, setIsPairsOpened, socket}) => {

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const messages = useSelector((state: AppStateType) => state.chat.currentMessages)
    const isConnected = useSelector((state: AppStateType) => state.chat.isConnected)

    const [value, setValue] = useState('')

    const sendMessage = async () => {
        const message = {
            id: Date.now(),
            username: currentUser.name,
            content: value,
        }
        socket.current?.send(JSON.stringify(message))
        setValue('')
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            sendMessage()
        }
    }

    return(
        <div className="tinder">
            <Nav isPairsOpened={isPairsOpened} setIsPairsOpened={setIsPairsOpened} socket={socket}/>
            <div className="tinder__chat">
                {isConnected ?
                    <div className="tinder__chat-container">
                        <div className="tinder__chat-messages">
                            {messages.map((message: any) =>
                                <div key={message.id} className="tinder__chat-message">
                                    {message.username}: {message.content}
                                </div>
                            )}
                        </div>
                        <div className="tinder__chat-form">
                            <input onKeyPress={(e) => handleKeyPress(e)} value={value} onChange={(e) => setValue(e.target.value)} className="tinder__chat-form-input" type="text" />
                            <button onClick={sendMessage} className="tinder__chat-form-button">send</button>
                        </div>
                    </div>
                :
                    <div>
                        choose the dialog
                    </div>
                }
            </div>
    </div>
    )
}

export default Chat