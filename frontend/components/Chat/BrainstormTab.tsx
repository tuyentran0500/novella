import { useChatContext } from "@/context/Chat";
import React from "react";
import ChatContentList from "./ChatContentList";
import ChatBar from "./ChatBar";
import SummaryCard from "../Common/SummaryCard";
const BrainstormTab = (): JSX.Element => {
    const {chatBrainstormContentList } = useChatContext();

    return (
        <div className='flex flex-col'>
            {/* <SummaryCard content="Summary" title="Story Summary"/> */}
            <ChatContentList chatContentList={chatBrainstormContentList}/>
            <ChatBar/>
        </div>
    )
}
export default BrainstormTab;