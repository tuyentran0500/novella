import { AppBar, Button } from "@mui/material";
import React from "react";
import GrayTextField from "../Common/GrayTextField";
import { useForm } from "react-hook-form";
import { ChatResponse } from "@/api/models/chat";
import { useChatContext } from "@/context/Chat";
const ChatBar = (): JSX.Element => {
    const { handleSubmit, register } = useForm<ChatResponse>({
        defaultValues: {
            role: "user",
            content: ""
        }
    })
    const { fetchChatResponse: handleChatPrompt} = useChatContext();
    return (
        <AppBar position="fixed" className="bg-inherit" sx={{ top: 'auto', bottom: 0 }}>
        <form onSubmit={handleSubmit(handleChatPrompt)}>
            <div className="flex p-2">
                <GrayTextField className="grow bg-gray-300 mr-2 drop-shadow-md" id="outlined-search"
                sx={{ input: { color: 'white' } }} label="" {...register('content')} focused
                />
                <Button className="bg-green-500 hover:bg-green-600 text-white">Submit</Button>
            </div>
        </form>
    </AppBar>
    )
}
export default ChatBar;