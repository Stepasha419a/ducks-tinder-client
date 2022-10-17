import { MutableRefObject, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IDialog } from "../../../models/IDialog"
import { getDialogsThunk } from "../../../redux/chatReducer"
import { AppStateType } from "../../../redux/reduxStore"
import Dialog from "./Dialog"

interface DialogsInterface{
    socket: MutableRefObject<WebSocket | undefined>
}

const Dialogs: React.FC<DialogsInterface> = ({socket}) => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const dialogs = useSelector((state: AppStateType) => state.chatPage.dialogs)
    const currentDialogId = useSelector((state: AppStateType) => state.chatPage.currentDialogId)

    useEffect(() => {
        dispatch(getDialogsThunk({id: currentUser._id}) as any)
    }, [currentUser._id, dispatch])

    return (
        <div className="info-content-dialogs">
            {dialogs ? dialogs.map((dialog: IDialog) => {
                const dialogCompanionId = dialog.members.find((memberId: string) => memberId !== currentUser._id)
                return (
                    <Dialog key={dialog._id} dialog={dialog} dialogCompanionId={dialogCompanionId} socket={socket} currentDialogId={currentDialogId} />
                )
            })
            :
            ''}
        </div>
    )
}

export default Dialogs