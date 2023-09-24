import { AppBar, Button } from "@mui/material";
import React from "react";
import Link from 'next/link';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
export const WritingAppBar = (): JSX.Element => {
    return (
        <AppBar position="fixed" className="bg-white" sx={{ top: 'auto', bottom: 0 }}>
            <div className="flex justify-center p-2">
                <Link href='/story/'>
                    <Button className="w-44 text-black bg-neural-400 shadow-lg shadow-gray-400">
                        <EditNoteOutlinedIcon className="mr-2"/>
                        Start Writing
                    </Button>
                </Link>

            </div>

        </AppBar>
    )
}
export default WritingAppBar;