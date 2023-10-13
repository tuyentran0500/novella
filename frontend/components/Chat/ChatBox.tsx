import React from "react"
import { useChatContext } from "@/context/Chat"
import ChatNavbar from "./ChatNavbar"
import ChapterTab from "./ChapterTab"
import { ChatTabID } from "@/interfaces/Chat"
import BrainstormTab from "./BrainstormTab"

export const Chat: React.FC<{}> = () => {
    return (
        <ChatBox />
    )
}
const ChatBox = (): JSX.Element => {
    const { tabID } = useChatContext();
    
    return (
        <div className='flex flex-col'>
            <ChatNavbar/>
            {tabID == ChatTabID.BRAINSTORM && <BrainstormTab/>}
            {tabID == ChatTabID.CHAPTERS && <ChapterTab/> }
        </div>
    )
}
export default Chat