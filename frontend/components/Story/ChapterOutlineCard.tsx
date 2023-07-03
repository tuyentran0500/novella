import { Button, Card, CardActions, CardContent, Typography, Divider } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React from "react";
import { useStoryContext } from "@/context/Story";
import { ChapterContent } from "@/interfaces/Story";
const ChapterOutlineCard = ({title, description, index, content} : ChapterContent):JSX.Element => {
    const {handleWritingChapter} = useStoryContext();
    return (
        <div className="m-2 max-w-md">
            <Card>
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                </CardContent>
                <CardActions>
                <Button size="small" onClick={() => handleWritingChapter({title, description, index, content})}>Write</Button>
                <Button size="small">Edit</Button>
                </CardActions>

            </Card>
            {/* <Divider>
                <AddIcon />
            </Divider> */}
        </div>

    )
}
export default ChapterOutlineCard;