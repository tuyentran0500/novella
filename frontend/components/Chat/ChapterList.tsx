import React from "react";
import ChapterInfoCard from "./ChapterInfoCard";
import { longGeneratedText } from "@/helper/helper";
const ChapterList = (): JSX.Element => {
    return (
        <div className="pb-12">
            <ChapterInfoCard title="Chapter 1. Introduction" description={longGeneratedText}/>
            <ChapterInfoCard title="Chapter 2. Beginning of the end" description={longGeneratedText}/>
            <ChapterInfoCard title="Chapter 3. Everything everywhere all at once" description={longGeneratedText}/>
            <ChapterInfoCard title="Chapter 4. Everytime I looked at you" description={longGeneratedText}/>
            <ChapterInfoCard title="Chapter 5. In the summer" description={longGeneratedText}/>


        </div>
    )
}
export default ChapterList;