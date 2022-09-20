import { MutableRefObject, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IDialog, MemberInterface } from "../../../models/IDialog"
import { getDialogsThunk } from "../../../redux/chatReducer"
import { AppStateType } from "../../../redux/reduxStore"
import Dialog from "./Dialog"

interface DialogsInterface{
    socket: MutableRefObject<WebSocket | undefined>
}

const Dialogs: React.FC<DialogsInterface> = ({socket}) => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const dialogs = useSelector((state: AppStateType) => state.chat.dialogs)
    const currentDialogId = useSelector((state: AppStateType) => state.chat.currentDialogId)

    useEffect(() => {
        dispatch(getDialogsThunk({id: currentUser._id}) as any)
    }, [currentUser._id, dispatch])

    return (
        <div className="tinder__info-content-dialogs">
            {dialogs ? dialogs.map((dialog: IDialog) => {
                const dialogCompanion = dialog.members.find((member: MemberInterface) => member.id !== currentUser._id)
                return (
                    <Dialog key={dialog._id} dialog={dialog} dialogCompanion={dialogCompanion} socket={socket} currentDialogId={currentDialogId}/>
                )
            })
            :
            ''}
        </div>
    )
}

export default Dialogs