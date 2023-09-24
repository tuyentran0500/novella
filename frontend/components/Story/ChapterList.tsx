import React from "react";
import ChapterInfoCard from "./ChapterInfoCard";
import { StoryProvider, useStoryContext } from '@/context/Story';

const ChapterListComponent = (): JSX.Element => {
    const {storyOutlineList} = useStoryContext();
    return (
            <div className="pb-12">
                {
                    storyOutlineList.map((chapter, index) => (
                        <ChapterInfoCard title={chapter.title} description={chapter.description || ''} key={index}/>
                    ))
                }
            </div>

    )
}

const ChapterList = (): JSX.Element => {
    return (
        <StoryProvider>
            <ChapterListComponent/>
        </StoryProvider>

    )
}

export default ChapterList;