import React from "react";
import StoryOutline from "./StoryOutline";
import ChapterWriting from "./ChapterWriting";
import { useStoryContext } from "@/context/Story";

const StoryWriting = (): JSX.Element => {
    const {selectedChapter} = useStoryContext();
    return (
        <div className="flex">
            <StoryOutline/>
            {selectedChapter.index != -1 && <ChapterWriting/>}
        </div>
    )
};
export default StoryWriting;