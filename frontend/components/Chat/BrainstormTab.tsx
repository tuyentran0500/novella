import { useChatContext } from "@/context/Chat";
import React from "react";
import ChatContentList from "./ChatContentList";
import ChatBar from "./ChatBar";
import SummaryCard from "../Common/SummaryCard";
import { AppBar } from "@mui/material";
const BrainstormTab = (): JSX.Element => {
    const {chatBrainstormContentList, storySummary } = useChatContext();

    return (
        <div className='flex flex-col'>
            <AppBar position="fixed" className="bg-white text-black" sx={{ top: 96, bottom: 'auto' }}>
                <SummaryCard content={storySummary} title="Story Summary"/>
            </AppBar>
            <ChatContentList chatContentList={chatBrainstormContentList}/>
            <ChatBar/>
        </div>
    )
}
export default BrainstormTab;