import React from "react";
import SummaryCard from "../Common/SummaryCard";
import { useChatContext } from "@/context/Chat";
import WritingAppBar from "./WritingAppBar";
import ChapterList from "./ChapterList";
const ChapterTab = ():JSX.Element => {
    const {storySummary} = useChatContext();
    return (
        <div className="flex flex-col pt-12">
            <SummaryCard title="Story Summary" content ={storySummary}/>
            <ChapterList/>
            <WritingAppBar/>

        </div>
    )
}
export default ChapterTab;
