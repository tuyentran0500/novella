import React, { useState } from "react";
import Image from 'next/image'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import { Collapse, IconButton, Tooltip, Typography } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useChatContext } from "@/context/Chat";
import { ChatTabID } from "@/interfaces/Chat";
import { useStoryContext } from "@/context/Story";
interface SummaryCardProps {
    title: string,
    content: string,
}
const SummaryCard = ({title, content} : SummaryCardProps): JSX.Element => {
    const [isFullMode, SetIsFullMode] = useState(false)
    const {confirmBrainstorm, changeTab} = useChatContext();
    const { fetchStoryOutline } = useStoryContext();
    const startOutline = async () => {
        await confirmBrainstorm();
        await fetchStoryOutline();
        changeTab(ChatTabID.CHAPTERS);
    }
    return (
        <div className="px-4 pt-4">
            <div className="flex align-middle">
                <Image height={30} width={30} src="/gpt.png" alt="avatar" className='w-8 h-8 mr-4'></Image>
                <p className="font-bold">{title}</p>
            </div>
            <Collapse in = {isFullMode}>
                <div className="pt-4 text-center">
                    
                    <Typography
                        style={{whiteSpace: 'pre-wrap'}}
                    >
                        {content}
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
export default SummaryCard;