import { StoryProvider, useStoryContext } from "@/context/Brainstorm";
import { ChapterContent } from "@/interfaces/Story";
import React from "react";

const StoryOutline = (): JSX.Element => {
    const {storyOutlineList} = useStoryContext();
    return (
        <div>
            {storyOutlineList.map((story : ChapterContent, key) => (
                <div key={key}>{story.title} {story.description}</div>
            ))}
        </div>
    )
}
export default StoryOutline;