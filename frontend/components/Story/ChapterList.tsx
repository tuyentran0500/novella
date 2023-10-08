import React from "react";
import ChapterInfoCard from "./ChapterInfoCard";
import { useStoryContext } from '@/context/Story';

const ChapterList = (): JSX.Element => {
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

export default ChapterList;