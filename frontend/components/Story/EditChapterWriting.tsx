import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import React, { useState } from "react";
import { useStoryContext } from "@/context/Story";
import { AppBar, Card, CardActions, CardMedia, IconButton, Modal, Tooltip } from "@mui/material";
import { BlockNoteEditor } from "@blocknote/core";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { Box } from '@mui/system';
import { reviewStory } from "@/api/story";
interface EditChapterWritngProps {
    onEdit: () => void,
    editor: BlockNoteEditor<any> | null,
}
const EditChapterWriting = ({onEdit, editor} : EditChapterWritngProps): JSX.Element => {
    const {saveCurrentChapterContent, updateChapterContent} = useStoryContext();
    const [showReview, setshowReview] = useState(false)
    const [reviewContent, setReviewContent] = useState("");
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
    const onReview = async () => {
        setshowReview(true);
        const result = await reviewStory();
        if (result != null){
            setReviewContent(result.content || "");
        }
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
                <IconButton onClick={onReview}>
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
        <div className="pb-8">
            <BlockNoteView editor={editor}/>
        </div>
        <Modal
        className="flex align-middle items-center justify-center text-black"
         aria-labelledby="unstyled-modal-title"
         aria-describedby="unstyled-modal-description"
            open={showReview}
            onClose={() => setshowReview(false)}
        >
            <Box className="bg-white p-4 rounded-xl max-w-md">
                <div className="font-bold mb-2 text-lg">Reviews</div>
                <div>{reviewContent}
                </div>
                <p> Score: 9/10</p>
            </Box>
        </Modal>
    </Card>
    );
}
export default EditChapterWriting;
