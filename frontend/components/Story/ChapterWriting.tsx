import { useStoryContext } from "@/context/Story";
import { Button, Card, CardActions, CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditChapterWriting from "./EditChapterWriting";
import { BlockNoteView, ReactSlashMenuItem, defaultReactSlashMenuItems, useBlockNote } from "@blocknote/react";
import { getintialContent } from "@/helper/editor";
import { AddTask } from "@mui/icons-material";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
const ChapterWriting = (): JSX.Element => {
    const {selectedChapter, generateChapterContent, saveCurrentChapterContent} = useStoryContext();
    const [isEditing, setisEditing] = useState<boolean>(false)
    // Command to insert "Hello World" in bold in a new block below.
    const insertHelloWorld = (editor: BlockNoteEditor) => {
        // Block that the text cursor is currently in.
        const currentBlock: Block<any> = editor.getTextCursorPosition().block;

        // New block we want to insert.
        const helloWorldBlock : PartialBlock<any>[] = [{
        type: "paragraph",
        content: [{ type: "text", text: "Hello World", styles: { bold: true } }],
        }];

        // Inserting the new block after the current one.
        editor.insertBlocks(helloWorldBlock, currentBlock, "after"); 
    };

    // Slash Menu item which executes the command.
    const insertHelloWorldItem = new ReactSlashMenuItem(
        "Insert Hello World",
        insertHelloWorld,
        ["helloworld", "hw"],
        "Other",
        <AddTask />,
        "Used to insert a block with 'Hello World' below."
    );

    const editor = useBlockNote({ initialContent: getintialContent(selectedChapter), editable: false,  slashCommands: [...defaultReactSlashMenuItems, insertHelloWorldItem], 
        // customElements: {
        // formattingToolbar: 
        // }
    })
    useEffect(() => {
        const updateBlocks = () => {
            if (editor && editor.isEditable == false && selectedChapter){ 
                const result = getintialContent(selectedChapter);
                editor.replaceBlocks(editor.topLevelBlocks, result); 
            }
        }
        updateBlocks();
    }, [selectedChapter])
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
                <Button size="small" onClick={generateChapterContent}>Generate</Button>
                <Button size="small" onClick={onEdit}>Edit</Button>
                <Button size="small" onClick={saveCurrentChapterContent}>Save</Button>
            </CardActions>
        </Card>
    )
}
export default ChapterWriting;
