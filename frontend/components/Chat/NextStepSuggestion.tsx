import { ChatResponse } from "@/api/models/chat";
import { useChatContext } from "@/context/Chat";
import { Button, Tooltip } from "@mui/material";
import React from "react";

interface NextStepSuggestionProps {
    prompt : ChatResponse;
}
const NextStepSuggestion = ({prompt} : NextStepSuggestionProps):JSX.Element => {
    const { fetchChatResponse } = useChatContext();
    const nextStepHandle = async (content : string) => {
        fetchChatResponse({content : content, role: "user", suggestionList: []});
    }
    if (prompt.role == 'suggestion' || prompt.suggestionList == undefined){
        return <></>
    }
    return (
        <div className="flex ml-4 mt-4 justify-center flex-col md:flex-row">
            {
                prompt.suggestionList.map((content, id) => (
                    <Tooltip title={content}  key={id}>
                        <Button className="text-white bg-blue-400 hover:bg-blue-600 w-96 h-12 mb-4 md:mr-4 truncate text-sm normal-case" onClick={() => {nextStepHandle(content)}}>{content}</Button>
                    </Tooltip>
                ))
            }
        </div>
    )
}
export default NextStepSuggestion;