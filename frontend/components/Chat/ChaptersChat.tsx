import { AppBar } from "@mui/material";
import React from "react";
import { useChatContext } from "@/context/Chat";
import ChapterSummaryCard from "./ChapterSummaryCard";
import ChatContentList from "./ChatContentList";
const ChaptersChat = (): JSX.Element => {
    const {selectedChapter } = useChatContext();
    return (
        <div className='flex flex-col'> 
            <AppBar position="fixed" className="bg-white text-black" sx={{ top: 96, bottom: 'auto' }}>
                <ChapterSummaryCard title="Chapter Summary"/>
            </AppBar>
            <div className="pt-16">
                <ChatContentList chatContentList={selectedChapter.memory}/>
            </div>
        </div>
    )
}
export default ChaptersChat;