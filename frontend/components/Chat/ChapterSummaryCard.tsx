import React, { useState } from "react";
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import { Collapse, IconButton, Tooltip, Typography } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useChatContext } from "@/context/Chat";
import { ChatTabID } from "@/interfaces/Chat";
import ChapterSelect from "./ChapterSelect";
interface SummaryCardProps {
    title: string,
}
const ChapterSummaryCard = ({title} : SummaryCardProps): JSX.Element => {
    const [isFullMode, SetIsFullMode] = useState(false)
    const {confirmBrainstorm, changeTab} = useChatContext();
    const { selectedChapter } = useChatContext();
    const startOutline = async () => {
        confirmBrainstorm();
        changeTab(ChatTabID.CHAPTERS);
    }
    return (
        <div className="p-4">
            <div className="flex flex-col content-center justify-center text-center w-full">
                <p className="font-bold">{title}</p>
                <ChapterSelect/>
            </div>
            <Collapse in = {isFullMode}>
                <div className="pt-4 text-center">
                    
                    <Typography
                        style={{whiteSpace: 'pre-wrap'}}
                    >
                        {selectedChapter.summary}
                    </Typography>
                </div>
            </Collapse>
            <div className="flex flex-row-reverse align-top">
                    <IconButton onClick={() => SetIsFullMode(prev => !prev)}>
                        {isFullMode && <FullscreenExitIcon/>}
                        {!isFullMode && <FullscreenOutlinedIcon/>}
                    </IconButton>
                    {isFullMode && 
                    <Tooltip title="Generate chapter outline">
                        <IconButton onClick={startOutline}>
                            <BorderColorIcon/>
                        </IconButton>
                    </Tooltip>
}
                </div>
        </div>

    )
}
export default ChapterSummaryCard;