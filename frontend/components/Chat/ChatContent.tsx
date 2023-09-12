import { ChatResponse } from '@/api/models/chat'
import { ChatProvider, useChatContext } from '@/context/Chat'
import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import LoadingChat from './LoadingChat'
import Image from 'next/image'
import EmptyChatSuggestion from './EmtyChatSuggestion'
interface ChatContentProps {
    chatContentList : ChatResponse[]
}
const tailwindColorClasses = {
    user: "w-full px-8 py-8 bg-white text-black flex",
    assistant: 'w-full px-8 py-8 bg-neutral-100 text-black flex',
    system: 'd-none',
  }

const avatarURL = {
    user: '/avatar.jpg',
    assistant: '/gpt.png',
    system: '/gpt.png',
}

const ChatContent = ({chatContentList} : ChatContentProps) : JSX.Element => {
    const { fetchChatContentStatus: status} = useChatContext();
    const bottomChatRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        bottomChatRef.current?.scrollIntoView({ behavior: 'smooth'});
    }, [status, chatContentList])
    if (chatContentList.length == 0){
        return <EmptyChatSuggestion/>
    }
    return (
        <div className='flex flex-col overflow-y-auto h-full pb-24 pt-8'>
            {
                chatContentList.filter(prompt => prompt.role != 'system').map((prompt, id) => (
                    <Box key = {id} className={tailwindColorClasses[prompt.role]}>
                        <Image height={30} width={30} src={avatarURL[prompt.role]} alt="avatar" className='w-8 h-8 mr-4'></Image>
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