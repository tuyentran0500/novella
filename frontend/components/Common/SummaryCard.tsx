import React, { useState } from "react";
import Image from 'next/image'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import { Collapse, IconButton, Tooltip, Typography } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
interface SummaryCardProps {
    title: string,
    content: string,
}
const SummaryCard = ({title, content} : SummaryCardProps): JSX.Element => {
    const [isFullMode, SetIsFullMode] = useState(false)
    return (
        <div className="p-4">
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
                        <IconButton>
                            <BorderColorIcon/>
                        </IconButton>
                    </Tooltip>
}
                </div>
        </div>

    )
}
export default SummaryCard;