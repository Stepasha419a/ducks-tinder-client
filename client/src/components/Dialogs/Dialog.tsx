import { MutableRefObject, useEffect } from "react"
import { useDispatch } from "react-redux"
import { IDialog, MemberInterface } from "../../models/IDialog"
import { connectChatThunk, disconnectChatThunk } from "../../redux/chatReducer"
import Avatar from "../Avatar/Avatar"

interface DialogInterface{
    dialog: IDialog
    dialogCompanion: MemberInterface | undefined
    socket: MutableRefObject<WebSocket | undefined>
}

const Dialog: React.FC<DialogInterface> = ({dialog, dialogCompanion, socket}) => {
    const dispatch = useDispatch()

    function connect(dialogId: string) {
        dispatch(disconnectChatThunk({socket}) as any)
        dispatch(connectChatThunk({socket, dialogId}) as any)
    }

    useEffect(() => {
        return () => {
            dispatch(disconnectChatThunk({socket}) as any)
        }
    }, [dispatch, socket])

    return(
        <div onClick={() => connect(dialog._id)} className="tinder__info-content-dialogs-item">
            <Avatar otherUserId={dialogCompanion?.id} imageExtraClassName={'tinder__info-content-dialogs-item-photo'} />
            <div className="tinder__info-content-dialogs-item-descr">
                <div className="tinder__info-content-dialogs-item-descr-name">
                    {dialogCompanion?.name}
                </div>
                <div className="tinder__info-content-dialogs-item-descr-message">
                    {dialog.messages[dialog.messages.length - 1]?.content}
                </div>
            </div>
        </div>
    )
}

export default Dialog