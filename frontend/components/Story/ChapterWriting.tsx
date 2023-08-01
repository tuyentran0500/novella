"use client"; // this registers <Editor> as a Client Component
import { useStoryContext } from "@/context/Story";
import { Button, Card, CardActions, CardMedia } from "@mui/material";
import React, { useState } from "react";
import EditChapterWriting from "./EditChapterWriting";
import { BlockNoteView } from "@blocknote/react";
import { getintialContent } from "@/helper/editor";
import { EditorProvider, useEditorContext } from "@/context/Editor";
import { ChapterContent } from "@/interfaces/Story";
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
    const { saveCurrentChapterContent} = useStoryContext();
    const [isEditing, setisEditing] = useState<boolean>(false)

    const {editor} = useEditorContext();

    const onEdit = () => {
        setisEditing(prev => !prev);
        if (editor){
            editor.isEditable = !editor.isEditable;
        }
    }
    if (isEditing) return <EditChapterWriting onEdit={onEdit} editor={editor}/>
    return (
        <Card className="m-5 w-full flex flex-col overflow-y-auto h-full">
            <CardMedia
                sx={{ height: 240 }}
                image="https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                title="green iguana"
            />
            <BlockNoteView  editor={editor}/>

            <CardActions>
                <Button size="small" onClick={onEdit}>Edit</Button>
                <Button size="small" onClick={saveCurrentChapterContent}>Save</Button>
            </CardActions>
        </Card>
    )
}
export default ChapterWritingEditor;
