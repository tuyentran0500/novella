import { getChatHistory, getChatResponse } from "@/api/chat"
import { AppBar, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import ChatContent from "./ChatContent"
import { ChatResponse } from "@/api/models/chat"
import GrayTextField from "../Common/GrayTextField"

const ChatBox = (): JSX.Element => {
    const { handleSubmit, register } = useForm<ChatResponse>({
        defaultValues: {
            role: "user",
            content: ""
        }
    })
    const [chatContentList, setChatContentList] = useState<ChatResponse[]>([]);
    useEffect(() => {
        void (async () => {
            const result = await getChatHistory();
            setChatContentList(result);
        })()
    }, [])
    
    const handleChatPrompt = async (data: ChatResponse): Promise<void> => {
        setChatContentList(prevState => [...prevState, data])
        const result = await getChatResponse(data);
        if (result != null){
            setChatContentList(prevState => [...prevState, result])
        }
        console.log(chatContentList);
    }
    return (
        <div className='flex flex-col'>
            <ChatContent chatContentList={chatContentList}/>
            <AppBar position="fixed" className="bg-inherit" sx={{ top: 'auto', bottom: 0 }}>
                <form onSubmit={handleSubmit(handleChatPrompt)}>
                    <div className="flex p-2">
                        <GrayTextField className="grow bg-zinc-600 mr-2" id="outlined-search" label="Content" type="search" {...register('content')} focused/>
                        <Button className="bg-green-500 hover:bg-green-600 text-white">Submit</Button>
                    </div>
                </form>
            </AppBar>

        </div>
    )
}
export default ChatBox