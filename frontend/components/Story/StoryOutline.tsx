import { useStoryContext } from "@/context/Story";
import { ChapterContent } from "@/interfaces/Story";
import React from "react";
import ChapterOutlineCard from "./ChapterOutlineCard";

const StoryOutline = (): JSX.Element => {
    const {storyOutlineList} = useStoryContext();
    return (
    <div className="m-5 flex flex-col overflow-y-auto h-screen">
            {storyOutlineList.map((story : ChapterContent, key) => (
                // <div key={key}>{story.title} {story.description}</div>
                <ChapterOutlineCard key= {key} title = {story.title} description={story.description} content={story.content} index={key}/>
            ))}
        </div>
    )
}
export default StoryOutline;