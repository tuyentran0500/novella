import { useChatContext } from "@/context/Chat";
import React from "react";
import ChatContent from "./ChatContent";
import ChatBar from "./ChatBar";
const BrainstormTab = (): JSX.Element => {
    const {chatContentList } = useChatContext();

    return (
        <div className='flex flex-col'>
            <ChatContent chatContentList={chatContentList}/>
            <ChatBar/>
        </div>
    )
}
export default BrainstormTab;