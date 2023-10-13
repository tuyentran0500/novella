import { useChatContext } from "@/context/Chat";
import React from "react";
import ChatBar from "./ChatBar";
import { ChatMode } from "@/interfaces/Chat";
import StoryChat from "./StoryChat";
import ChaptersChat from "./ChaptersChat";
const BrainstormTab = (): JSX.Element => {
    const { chatMode } = useChatContext();

    return (
        <div className='flex flex-col'> 
            {chatMode == ChatMode.STORY && <StoryChat/>}
            {chatMode == ChatMode.CHAPTERS && <ChaptersChat/>}

            <ChatBar/>
        </div>
    )
}
export default BrainstormTab;