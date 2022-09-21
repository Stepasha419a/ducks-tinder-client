import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from "../../redux/reduxStore"
import { KeyboardEvent, MutableRefObject, useEffect, useState } from "react"
import Nav from "../Nav/Nav"
import Message from "./Message/Message"
import { MessageInterface } from "../../models/IDialog"
import { IUser } from "../../models/IUser"
import { getUserThunk } from "../../redux/usersReducer"
import { setIncludedMembersIds } from "../../redux/chatReducer"

interface ChatPropsInterface{
    isPairsOpened: boolean,
    setIsPairsOpened: (setting: boolean) => void
    socket: MutableRefObject<WebSocket | undefined>
}

const Chat: React.FC<ChatPropsInterface> = ({isPairsOpened, setIsPairsOpened, socket}) => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const messages = useSelector((state: AppStateType) => state.chat.currentMessages)
    const isConnected = useSelector((state: AppStateType) => state.chat.isConnected)
    const members = useSelector((state: AppStateType) => state.chat.currentMembers)
    const includedMembersIds = useSelector((state: AppStateType) => state.chat.includedMembersIds)

    const [userMembers, setUserMembers] = useState([] as IUser[])

    useEffect(() => {
        members.forEach(async (member) => {
            if(!includedMembersIds.includes(member.id)) {
                dispatch(setIncludedMembersIds(member.id))
                const user = await dispatch(getUserThunk({id: member.id}) as any)
                setUserMembers(prev => [...prev, user.payload])
            }
        })
    }, [members, dispatch, includedMembersIds])

    const [value, setValue] = useState('')

    const sendMessage = async () => {
        const message = {
            id: Date.now(),
            username: currentUser.name,
            content: value,
            userId: currentUser._id
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
                            {messages.map((message: MessageInterface) => 
                                userMembers.length ? 
                                    <Message key={message.id} message={message} user={userMembers.find(item => item._id === message.userId)} currentUserId={currentUser._id}/> 
                                : 
                                    <div key={message.id}>loading message...</div>
                            )}
                        </div>
                        <div className="tinder__chat-form-wrapper">
                            <div className="tinder__chat-form">
                                <input onKeyPress={(e) => handleKeyPress(e)} value={value} onChange={(e) => setValue(e.target.value)} className="tinder__chat-form-input" type="text" />
                                <button onClick={sendMessage} className="tinder__chat-form-button">send</button>
                            </div>
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