import React from "react";
import StoryOutline from "./StoryOutline";
import ChapterWriting from "./ChapterWriting";
import { useStoryContext } from "@/context/Story";
import Chat from '@/components/Chat/ChatBox';

const StoryWriting = (): JSX.Element => {
    const {showChat, selectedChapter} = useStoryContext();
    return (
        <div className="flex w-full">
            <div className="grow-0">
                <StoryOutline/>
            </div>
            {selectedChapter.index != -1 && 
                <div className="grow">
                <ChapterWriting />
                </div>
            }
            {showChat && 
            <div className="ml-6 max-w-4xl">
                <Chat/>
            </div>
            }
        </div>
    )
};
export default StoryWriting;