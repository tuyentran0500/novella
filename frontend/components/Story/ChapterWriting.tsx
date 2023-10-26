"use client"; // this registers <Editor> as a Client Component
import { useStoryContext } from "@/context/Story";
import { AppBar, Button, Card, CardActions, CardMedia, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import EditChapterWriting from "./EditChapterWriting";
import { BlockNoteView } from "@blocknote/react";
import { getintialContent } from "@/helper/editor";
import { EditorProvider, useEditorContext } from "@/context/Editor";
import { ChapterContent } from "@/interfaces/Story";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { useChatContext } from "@/context/Chat";
const ChapterWritingEditor = (): JSX.Element => {
    const { selectedChapter, storyOutlineList} = useStoryContext();
    return (
        <React.Fragment>
            {storyOutlineList.map((story : ChapterContent, key) => (
                    <EditorProvider key = {story.index} initialContent={getintialContent(story)}>
                        {selectedChapter.index == story.index && <ChapterWriting/>}
                    </EditorProvider>
                    )
                )
            }
        </React.Fragment>
    )
    
};
const ChapterWriting = (): JSX.Element => {
    const { saveCurrentChapterContent, changeShowChat, selectedChapter} = useStoryContext();
    const { changePageView } = useChatContext(); 
    const [isEditing, setisEditing] = useState<boolean>(false)

    const {editor} = useEditorContext();

    const onEdit = () => {
        setisEditing(prev => !prev);
        if (editor){
            editor.isEditable = !editor.isEditable;
        }
    }
    const showBrainstormChat = () => {
        changeShowChat();
        changePageView(selectedChapter);
    }
    if (isEditing) return <EditChapterWriting onEdit={onEdit} editor={editor}/>
    return (
        <Card className="m-5 w-full flex flex-col overflow-y-auto h-full">
            <CardMedia
                sx={{ height: 240 }}
                image="https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                title="green iguana"
            />
            <CardActions className="flex flex-row-reverse">
                <Tooltip title="Review">
                    <IconButton>
                        <ContentPasteSearchIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Save">
                    <IconButton onClick={saveCurrentChapterContent} >
                        <SaveOutlinedIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                    <IconButton onClick={onEdit}>
                        <ModeEditOutlinedIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Brainstorm" onClick={showBrainstormChat}>
                    <IconButton>
                        <LightbulbOutlinedIcon/>
                    </IconButton>
                </Tooltip>
            </CardActions>
            <div className="pb-8">
                <BlockNoteView editor={editor}/>
            </div>

        </Card>
    )
}
export default ChapterWritingEditor;
