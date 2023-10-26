import { AppBar } from "@mui/material";
import React from "react";
import SummaryCard from "../Common/SummaryCard";
import ChatContentList from "./ChatContentList";
import { useChatContext } from "@/context/Chat";
const StoryChat = (): JSX.Element => {
    const {chatBrainstormContentList, storySummary } = useChatContext();

    return (
        <div className='flex flex-col'> 
            <AppBar position="sticky" className="bg-white text-black" sx={{ top: 96, bottom: 'auto' }}>
                {chatBrainstormContentList.length != 0 && <SummaryCard content={storySummary} title="Story Summary"/>}
            </AppBar>
            <ChatContentList chatContentList={chatBrainstormContentList}/>
        </div>
    )
}
export default StoryChat;