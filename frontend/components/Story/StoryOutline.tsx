import { useStoryContext } from "@/context/Story";
import { ChapterContent } from "@/interfaces/Story";
import React from "react";
import ChapterOutlineCard from "./ChapterOutlineCard";
import ChapterOutlineCardMini from "./ChapterOutlineCardMini";

const StoryOutline = (): JSX.Element => {
    const {storyOutlineList, showChat} = useStoryContext();
    return (
    <div className="m-2 flex flex-col overflow-y-auto h-screen">
            {storyOutlineList.map((story : ChapterContent, key) => {
                if (!showChat) return <ChapterOutlineCard key= {key} title = {story.title} description={story.description} content={story.content} index={story.index} contentBlock = {story.contentBlock} url = {story.url}/>
                return <ChapterOutlineCardMini key= {key} title = {story.title} description={story.description} content={story.content} index={story.index} contentBlock = {story.contentBlock} url = {story.url}/>
            })}
        </div>
    )
}
export default StoryOutline;