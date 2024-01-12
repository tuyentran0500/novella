import { ChapterContent } from "@/interfaces/Story";
import Image from "next/image";
import React, { useState } from "react";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { IconButton } from "@mui/material";
const ChapterInfoCard = ({title, description, url} : ChapterContent): JSX.Element => {
    const [hover, setHover] = useState(false)
    return (
        <div className="flex bg-neutral-100 p-4 drop-shadow-2xl shadow-2xl hover:shadow-blue-500"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Image width = {200} height={200} src={url} alt = "avatar" className="pt-4 mr-4"/>
            <div className="flex flex-col text-center grow">
                <p className="font-bold text-xl">{title}</p>
                <p className="text-center pt-2">{description}</p>
                {hover && <div className="flex flex-row-reverse">

                    <IconButton>
                        <DeleteOutlinedIcon className="mr-2"/>
                    </IconButton>
                    <IconButton>
                        <ModeEditOutlineOutlinedIcon/>
                    </IconButton>
                </div>
                }
            </div>

        </div>
    )
}
export default ChapterInfoCard;
