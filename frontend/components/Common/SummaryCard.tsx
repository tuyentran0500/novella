import React, { useState } from "react";
import Image from 'next/image'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import { AppBar, Collapse, IconButton } from "@mui/material";
interface SummaryCardProps {
    title: string,
    content: string,
}
const SummaryCard = ({title, content} : SummaryCardProps): JSX.Element => {
    const [isFullMode, SetIsFullMode] = useState(true)
    return (
        <div className="p-4">
            <div className="flex align-middle">
                <Image height={30} width={30} src="/gpt.png" alt="avatar" className='w-8 h-8 mr-4'></Image>
                <p className="font-bold">{title}</p>
            </div>
            <Collapse in = {isFullMode}>
                <div className="pt-4 text-center">
                    {content}
                </div>
            </Collapse>
            <div className="flex flex-row-reverse">
                <IconButton onClick={() => SetIsFullMode(prev => !prev)}>
                    {isFullMode && <FullscreenExitIcon/>}
                    {!isFullMode && <FullscreenOutlinedIcon/>}
                </IconButton>
            </div>
        </div>

    )
}
export default SummaryCard;