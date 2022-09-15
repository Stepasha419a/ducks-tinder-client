import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IDialog, MemberInterface } from "../../models/IDialog"
import { getDialogsThunk } from "../../redux/chatReducer"
import { AppStateType } from "../../redux/reduxStore"
import { getUserThunk } from "../../redux/usersReducer"
import Avatar from "../Avatar/Avatar"

const Dialogs = () => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const dialogs = useSelector((state: AppStateType) => state.chat.dialogs)

    useEffect(() => {
        dialogs.forEach((dialog) => {
            dialog.members.forEach((member) => {
                if(!(member.id === currentUser._id)) {
                    dispatch(getUserThunk({id: member.id}) as any)
                }
            })
        })
    }, [dialogs, currentUser._id, dispatch])

    useEffect(() => {
        dispatch(getDialogsThunk({id: currentUser._id}) as any)
    }, [currentUser._id, dispatch])

    return (
        <div className="tinder__info-content-dialogs">
            {dialogs ? dialogs.map((dialog: IDialog) => {
                const dialogCompanion = dialog.members.find((member: MemberInterface) => member.id !== currentUser._id)
                return (
                    <div className="tinder__info-content-dialogs-item" key={dialog._id}>
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
            })
            :
            ''}
        </div>
    )
}

export default Dialogs