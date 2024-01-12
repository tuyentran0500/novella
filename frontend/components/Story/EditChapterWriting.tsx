import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import React, { useState } from "react";
import { useStoryContext } from "@/context/Story";
import { AppBar, Card, CardActions, CardMedia, IconButton, Modal, Tab, Tabs, Tooltip } from "@mui/material";
import { BlockNoteEditor } from "@blocknote/core";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { Box } from '@mui/system';
import { reviewStory } from "@/api/story";
import ChapterWritingNavbar from "./ChapterWritingNavbar";
import { ReviewContent } from "@/interfaces/Story";
interface EditChapterWritngProps {
    onEdit: () => void,
    editor: BlockNoteEditor<any> | null,
}
const EditChapterWriting = ({onEdit, editor} : EditChapterWritngProps): JSX.Element => {
    const {saveCurrentChapterContent, updateChapterContent, selectedChapter} = useStoryContext();
    const [reviewTab, setReviewTab] = useState(0);
    const [showReview, setshowReview] = useState(false)
    const [reviewContent, setReviewContent] = useState<ReviewContent>();
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
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setReviewTab(newValue);
    };
    const onReview = async () => {
        setshowReview(true);
        const result = await reviewStory(selectedChapter);
        if (result != null){
            setReviewContent(result);
        }
    }
    return (
      <Card className="m-5 w-full flex flex-col overflow-y-auto h-full">
        <ChapterWritingNavbar onReview={onReview}/>
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
            <Box className="bg-white p-4 rounded-xl max-w-lg">
                <div className="font-bold mb-2 text-lg">Reviews</div>
                <Tabs value = {reviewTab} onChange={handleChange}>
                    <Tab value={0} label="Story Review"/>
                    <Tab value={1} label="Chapter Review"/>
                </Tabs>
                {reviewTab == 1 && <div>{reviewContent?.chapterReview}</div>}
                {reviewTab == 0 && <div>{reviewContent?.summaryReview}</div>}

            </Box>
        </Modal>
    </Card>
    );
}
export default EditChapterWriting;
