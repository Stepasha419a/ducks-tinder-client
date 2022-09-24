import { MutableRefObject, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { IDialog } from "../../../models/IDialog"
import { connectChatThunk, disconnectChatThunk } from "../../../redux/chatReducer"
import { getUserThunk } from "../../../redux/usersReducer"
import Avatar from "../../Avatar/Avatar"

interface DialogInterface{
    dialog: IDialog
    dialogCompanionId: string | undefined
    socket: MutableRefObject<WebSocket | undefined>
    currentDialogId: string
}

const Dialog: React.FC<DialogInterface> = ({dialog, dialogCompanionId, socket, currentDialogId}) => {
    const dispatch = useDispatch()

    const [dialogName, setDialogName] = useState('')

    function connect(dialogId: string) {
        dispatch(disconnectChatThunk({socket}) as any)
        dispatch(connectChatThunk({socket, dialogId}) as any)
    }

    useEffect(() => {
        return () => {
            dispatch(disconnectChatThunk({socket}) as any)
        }
    }, [dispatch, socket])

    useEffect(() => {
        dispatch(getUserThunk({id: dialogCompanionId as String}) as any).then((res: any) => setDialogName(res.payload.name))
    }, [dialogCompanionId, dispatch])

    return(
        <div onClick={() => connect(dialog._id)} className={`tinder__info-content-dialogs-item${currentDialogId === dialog._id ? ' tinder__info-content-dialogs-item--active': ''}`}>
            <Avatar otherUserId={dialogCompanionId} imageExtraClassName={'tinder__info-content-dialogs-item-photo'} />
            <div className="tinder__info-content-dialogs-item-descr">
                <div className="tinder__info-content-dialogs-item-descr-name">
                    {dialogName}
                </div>
                <div className="tinder__info-content-dialogs-item-descr-message">
                    {dialog.messages[dialog.messages.length - 1]?.content}
                </div>
            </div>
        </div>
    )
}

export default Dialog