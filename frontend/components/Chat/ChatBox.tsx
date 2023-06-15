import { getChatHistory, getChatResponse } from "@/api/chat"
import { AppBar, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import ChatContent from "./ChatContent"
import { ChatResponse } from "@/api/models/chat"
import GrayTextField from "../Common/GrayTextField"
import { ChatProvider, useChatContext } from "@/context/Chat"
import LoadingChat from "./LoadingChat"
export const Chat: React.FC<{}> = () => {
    return (
        <ChatProvider>
            <ChatBox />
        </ChatProvider>
    )
}
const ChatBox = (): JSX.Element => {
    const { handleSubmit, register } = useForm<ChatResponse>({
        defaultValues: {
            role: "user",
            content: ""
        }
    })
    const {chatContentList, fetchChatResponse: handleChatPrompt} = useChatContext();
    
    return (
        <div className='flex flex-col'>
            <ChatContent chatContentList={chatContentList}/>
            <AppBar position="fixed" className="bg-inherit" sx={{ top: 'auto', bottom: 0 }}>
                <form onSubmit={handleSubmit(handleChatPrompt)}>
                    <div className="flex p-2">
                        <GrayTextField className="grow bg-zinc-600 mr-2" id="outlined-search" sx={{ input: { color: 'white' } }} label="Content" type="search" {...register('content')} focused/>
                        <Button className="bg-green-500 hover:bg-green-600 text-white">Submit</Button>
                    </div>
                </form>
            </AppBar>

        </div>
    )
}
export default Chat