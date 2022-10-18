import { MutableRefObject, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { IDialog } from "../../../models/IDialog"
import { IUser } from "../../../models/IUser"
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

    const [dialogPartner, setDialogPartner] = useState<IUser>({} as IUser)

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
        dispatch(getUserThunk({id: dialogCompanionId as String}) as any).then((res: any) => setDialogPartner(res.payload))
    }, [dialogCompanionId, dispatch])

    return(
        <div onClick={() => connect(dialog._id)} className={`info__content-dialogs-item${currentDialogId === dialog._id ? ' info__content-dialogs-item--active': ''}`}>
            <Avatar otherUserId={dialogCompanionId} imageExtraClassName={'info__content-dialogs-item-photo'} />
            <div className="info__content-dialogs-item-descr">
                <div className="info__content-dialogs-item-descr-name">
                    {dialogPartner.name}
                </div>
                <div className="info__content-dialogs-item-descr-message">
                    {dialog.messages.length 
                    ? 
                    dialog.messages[dialog.messages.length - 1]?.userId === dialogPartner._id 
                        ? 
                        `${dialogPartner.name}: ` 
                        : 
                        'you: ' 
                    :
                    'send first message'}

                    {dialog.messages[dialog.messages.length - 1]?.content}
                </div>
            </div>
        </div>
    )
}

export default Dialog