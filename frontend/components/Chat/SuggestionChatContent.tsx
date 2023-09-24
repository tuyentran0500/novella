import { IconButton, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

import React, { useState } from "react";
import { ChatResponse } from "@/api/models/chat";
import { useChatContext } from "@/context/Chat";
interface ChatContentProps {
    prompts : ChatResponse
}

const SuggestChatContent = ({prompts} : ChatContentProps): JSX.Element => {
    const { fetchChatResponse } = useChatContext();
    const [value, setValue] = useState("")
    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
      };
    const submitSuggestion = () => {
        fetchChatResponse({...prompts, content: prompts.content + ": " + value});
    }
    return (
        <div className="flex mt-2 w-full">
            <Select
                className=" h-14 content-end rounded-lg w-44"
                displayEmpty
                value={value}
                onChange={handleChange}
                inputProps={{'borderRadius' : 10}}
            >   

                {prompts.suggestionList.map((option, index) => (
                <MenuItem key={index} value={option}>
                    {option}
                </MenuItem>
                ))}
            </Select>
            <IconButton type="submit" className="ml-2 self-center" onClick={submitSuggestion}>
                <SendIcon className=" text-gray-700 hover:text-blue-400"/>
            </IconButton>
        </div>

    )
}
export default SuggestChatContent;