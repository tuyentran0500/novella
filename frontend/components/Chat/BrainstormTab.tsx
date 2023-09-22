import { useChatContext } from "@/context/Chat";
import React from "react";
import ChatContentList from "./ChatContentList";
import ChatBar from "./ChatBar";
const BrainstormTab = (): JSX.Element => {
    const {chatBrainstormContentList } = useChatContext();

    return (
        <div className='flex flex-col'>
            <ChatContentList chatContentList={chatBrainstormContentList}/>
            <ChatBar/>
        </div>
    )
}
export default BrainstormTab;