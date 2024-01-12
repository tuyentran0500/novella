import React from "react";
import {  Card, CardActions, CardMedia, IconButton, Modal, Tooltip } from "@mui/material";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { useStoryContext } from "@/context/Story";
import { useChatContext } from "@/context/Chat";
interface ChapterWritingNavbarProps {
    onReview?: () => Promise<void>;
    onEdit?: () => void;
}
const ChapterWritingNavbar = ({onReview, onEdit} : ChapterWritingNavbarProps): JSX.Element => {
    const {saveCurrentChapterContent, changeShowChat, selectedChapter} = useStoryContext();
    const { changePageView } = useChatContext(); 
    console.log("Chapter", selectedChapter)
    const showBrainstormChat = () => {
        changeShowChat();
        changePageView(selectedChapter);
    }
    return (
        <>
            <CardMedia
                sx={{ height: 500 }}
                image={
                    selectedChapter.url || 
                    "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                }
                title="green iguana"
            />
            <CardActions className="flex flex-row-reverse">
                {
                onEdit && 
                <Tooltip title="Edit">
                    <IconButton onClick={onEdit}>
                        <ModeEditOutlinedIcon/>
                    </IconButton>
                </Tooltip>
                }
                {
                    onReview && 
                    <Tooltip title="Review">
                        <IconButton onClick={onReview}>
                            <ContentPasteSearchIcon />
                        </IconButton>
                    </Tooltip>
                }

                <Tooltip title="Save">
                    <IconButton onClick={saveCurrentChapterContent} >
                        <SaveOutlinedIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Brainstorm">
                    <IconButton onClick={showBrainstormChat}>
                        <LightbulbOutlinedIcon/>
                    </IconButton>
                </Tooltip>
            </CardActions>
        </>
    )
}
export default ChapterWritingNavbar;
