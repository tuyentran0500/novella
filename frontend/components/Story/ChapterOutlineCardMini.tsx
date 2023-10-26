import { useStoryContext } from "@/context/Story";
import { ChapterContent } from "@/interfaces/Story";
import { Card, CardContent, Tooltip, Typography } from "@mui/material";
import React from "react";
const isSelectedChapterCssClass = [
    "shadow-sm w-16 h-16 bg-white text-center",
    "shadow-sm w-16 h-16 bg-gray-400 text-white text-center"
]

const ChapterOutlineCardMini = ({title, description, index, content, contentBlock} : ChapterContent): JSX.Element => {
    
    const {handleWritingChapter, selectedChapter} = useStoryContext();
    return (
            <Tooltip title={title}>
                <Card className={isSelectedChapterCssClass[selectedChapter.index == index ? 1 : 0]}onClick={() => handleWritingChapter({title, description, index, content, contentBlock})}>
                    <CardContent>
                        {index}
                    </CardContent>
                </Card>
            </Tooltip>

    )
}
export default ChapterOutlineCardMini;