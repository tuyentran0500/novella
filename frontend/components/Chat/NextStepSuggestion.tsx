import { ChatResponse } from "@/api/models/chat";
import { Button } from "@mui/material";
import React from "react";
interface NextStepSuggestionProps {
    prompt : ChatResponse;
}
const NextStepSuggestion = ({prompt} : NextStepSuggestionProps):JSX.Element => {
    if (prompt.role == 'suggestion' || prompt.suggestionList == undefined){
        return <></>
    }
    return (
        <div className="flex ml-4 mt-4">
            {
                prompt.suggestionList.map((content, id) => (
                    <Button key="id" className="text-white bg-blue-400 hover:bg-blue-600 w-96 h-12 mr-4 truncate text-sm normal-case">{content}</Button>
                ))
            }
        </div>
    )
}
export default NextStepSuggestion;