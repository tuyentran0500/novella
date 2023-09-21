import { ChapterContent } from "@/interfaces/Story";
import Image from "next/image";
import React from "react";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { IconButton } from "@mui/material";
const ChapterInfoCard = ({title, description} : ChapterContent): JSX.Element => {
    return (
        <div className="flex bg-neutral-100 p-4 drop-shadow-2xl shadow-2xl hover:shadow-blue-500">
            <Image width = {100} height={100} src="/avatar.jpg" alt = "avatar" className="pt-4 mr-4"/>
            <div className="flex flex-col text-center grow">
                <p className="font-bold">{title}</p>
                <p className="text-center">{description}</p>
                <div className="flex flex-row-reverse">
                    <IconButton>
                        <DeleteOutlinedIcon className="mr-2"/>
                    </IconButton>
                    <IconButton>
                        <ModeEditOutlineOutlinedIcon/>
                    </IconButton>
                </div>
            </div>

        </div>
    )
}
export default ChapterInfoCard;
