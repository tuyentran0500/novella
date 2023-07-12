import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import React from "react";
import { useStoryContext } from "@/context/Story";
import { Button, Card, CardActions, CardMedia } from "@mui/material";
import { getintialContent } from "@/helper/editor";
import { BlockNoteEditor } from "@blocknote/core";
interface EditChapterWritngProps {
    onEdit: () => void,
    editor: BlockNoteEditor<any> | null,
}
const EditChapterWriting = ({onEdit, editor} : EditChapterWritngProps): JSX.Element => {
    const {selectedChapter, generateChapterContent, saveCurrentChapterContent, updateChapterContent} = useStoryContext();

    editor?.onEditorContentChange(async () => {
        const blocks = editor.topLevelBlocks;
            const blockContent = JSON.stringify(blocks);
            const content = await editor.blocksToMarkdown(blocks);

        updateChapterContent(blockContent, content);
    });
    const onSave = async () => {
        await saveCurrentChapterContent();
        onEdit();
    }
    return (
      <Card className="m-5 w-full flex flex-col overflow-y-auto h-full">
        <CardMedia
            sx={{ height: 240 }}
            image="https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            title="green iguana"
        />
        <BlockNoteView editor={editor}/>
        <CardActions>
            <Button size="small" onClick={generateChapterContent}>Generate</Button>
            <Button size="small" onClick={onSave}>Save</Button>
        </CardActions>
    </Card>
);
}
export default EditChapterWriting;
