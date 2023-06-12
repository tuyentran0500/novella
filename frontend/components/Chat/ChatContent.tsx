import { ChatResponse } from '@/api/models/chat'
import { Typography } from '@mui/material'
import React from 'react'
interface ChatContentProps {
    chatContentList : ChatResponse[]
}

const ChatContent = ({chatContentList} : ChatContentProps) : JSX.Element => {
    return (
        <div className='flex flex-col p-5'>
            {
                chatContentList.map((prompt, id) => (
                    <Typography className="w-full" key = {id}>{prompt.content}</Typography>
                ))
            }
        </div>
    )
}

export default ChatContent;