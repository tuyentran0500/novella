import { getChatResponse } from "@/api/chat"
import { Button, TextField } from "@mui/material"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import ChatContent from "./ChatContent"
import { ChatResponse } from "@/api/models/chat"
  
const ChatBox = (): JSX.Element => {
    const { handleSubmit, register } = useForm<ChatResponse>()
    const [chatContentList, setChatContentList] = useState<ChatResponse[]>([])
    const handleChatPrompt = async (data: ChatResponse): Promise<void> => {
        setChatContentList(prevState => [...prevState, data])
        const result = await getChatResponse(data);
        if (result != null){
            setChatContentList(prevState => [...prevState, result])
        }
        console.log(chatContentList);
    }
    return (
        <div className='flex flex-col h-full'>
            <form onSubmit={handleSubmit(handleChatPrompt)}>
                <div className="flex p-2">
                    <TextField className="grow" id="outlined-search" label="Content" type="search" {...register('content')}/>
                    <Button>Submit</Button>
                </div>
            </form>

            <div className='grow'>
                <ChatContent chatContentList={chatContentList}/>
            </div>
        </div>
    )
}
export default ChatBox