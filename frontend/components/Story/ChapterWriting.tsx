import { useStoryContext } from "@/context/Story";
import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material";
import React from "react";
const ChapterWriting = (): JSX.Element => {
    const {selectedChapter, fetchSelectedChapterStatus, generateChapterContent, saveCurrentChapterContent} = useStoryContext();
    return (
        <Card className="m-5 w-full flex flex-col overflow-y-auto h-full">
            <CardMedia
                sx={{ height: 240 }}
                image="https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                title="green iguana"
            />
            <CardContent className="grow">
                {fetchSelectedChapterStatus === 'loading' && <CircularProgress/>}
                <Typography gutterBottom variant="h5" component="div">
                 {selectedChapter.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {selectedChapter.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={generateChapterContent}>Generate</Button>
                <Button size="small">Edit</Button>
                <Button size="small" onClick={saveCurrentChapterContent}>Save</Button>
            </CardActions>
        </Card>
    )
}
export default ChapterWriting;
