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
import ChapterWritingNavbar from "./ChapterWritingNavbar";
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
            <ChapterWritingNavbar onEdit={onEdit} />
            <div className="pb-8">
                <BlockNoteView editor={editor}/>
            </div>
        </Card>
    )
}
export default ChapterWritingEditor;
