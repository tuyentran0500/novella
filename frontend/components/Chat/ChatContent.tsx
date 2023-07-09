import { ChatResponse } from '@/api/models/chat'
import { ChatProvider, useChatContext } from '@/context/Chat'
import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import LoadingChat from './LoadingChat'
interface ChatContentProps {
    chatContentList : ChatResponse[]
}
const tailwindColorClasses = {
    user: "w-full px-8 py-8 bg-zinc-600 text-white",
    assistant: 'w-full px-8 py-8 bg-zinc-500 text-white',
    system: 'd-none',
  }

const ChatContent = ({chatContentList} : ChatContentProps) : JSX.Element => {
    const { fetchChatContentStatus: status} = useChatContext();
    const bottomChatRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        bottomChatRef.current?.scrollIntoView({ behavior: 'smooth'});
    }, [status, chatContentList])
    
    return (
        <div className='flex flex-col bg-zinc-500 overflow-y-auto h-full pb-24'>
            {
                chatContentList.filter(prompt => prompt.role != 'system').map((prompt, id) => (
                    <Box key = {id} className={tailwindColorClasses[prompt.role]}>
                        <Typography style={{whiteSpace: 'pre-wrap'}}>{prompt.content}</Typography>
                    </Box>
                ))
            }
            {status == 'loading' && 
                    <LoadingChat />
            }
            <div ref = {bottomChatRef}/>
        </div>
    )
}

export default ChatContent;