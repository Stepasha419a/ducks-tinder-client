import { useAppSelector } from "../../../redux/reduxStore"
import Choose from "./Choose/Choose"
import FailedChats from "./Failed/NoChats"

const Status = () => {
  const chats = useAppSelector((state) => state.chatPage.chats)

  return(
    chats.length ? 
    <Choose />
    :
    <FailedChats />
  )
}

export default Status