import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import React from "react";
import { useStoryContext } from "@/context/Story";
import { Card, CardActions, CardMedia, IconButton, Tooltip } from "@mui/material";
import { BlockNoteEditor } from "@blocknote/core";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
interface EditChapterWritngProps {
    onEdit: () => void,
    editor: BlockNoteEditor<any> | null,
}
const EditChapterWriting = ({onEdit, editor} : EditChapterWritngProps): JSX.Element => {
    const {saveCurrentChapterContent, updateChapterContent} = useStoryContext();

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
            <Tooltip title="Brainstorm">
                <IconButton>
                    <LightbulbOutlinedIcon/>
                </IconButton>
            </Tooltip>
        </CardActions>
        <BlockNoteView editor={editor}/>

    </Card>
    );
}
export default EditChapterWriting;
