import { AppBar } from "@mui/material";
import React from "react";
import { useChatContext } from "@/context/Chat";
import ChapterSummaryCard from "./ChapterSummaryCard";
const ChaptersChat = (): JSX.Element => {
    const {chatBrainstormContentList, storySummary } = useChatContext();

    return (
        <div className='flex flex-col'> 
            <AppBar position="fixed" className="bg-white text-black" sx={{ top: 96, bottom: 'auto' }}>
                {chatBrainstormContentList.length != 0 && <ChapterSummaryCard content={storySummary} title="Chapter Summary"/>}
            </AppBar>
            {/* <ChatContentList chatContentList={chatBrainstormContentList}/> */}
        </div>
    )
}
export default ChaptersChat;