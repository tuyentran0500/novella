import React from "react"
import ChatContent from "./ChatContent"
import { ChatProvider, useChatContext } from "@/context/Chat"
import ChatNavbar from "./ChatNavbar"
import ChatBar from "./ChatBar"

export const Chat: React.FC<{}> = () => {
    return (
        <ChatProvider>
            <ChatBox />
        </ChatProvider>
    )
}
const ChatBox = (): JSX.Element => {
    const {chatContentList } = useChatContext();
    
    return (
        <div className='flex flex-col'>
            <ChatNavbar/>
            <ChatContent chatContentList={chatContentList}/>
            <ChatBar/>
        </div>
    )
}
export default Chat