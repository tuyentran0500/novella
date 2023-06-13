import { ChatResponse } from '@/api/models/chat'
import { Box, Typography } from '@mui/material'
import React from 'react'
interface ChatContentProps {
    chatContentList : ChatResponse[]
}
const tailwindColorClasses = {
    user: "w-full px-2 py-4 bg-zinc-600 text-white",
    assistant: 'w-full px-2 py-4 bg-zinc-500 text-white',
    system: 'd-none',
  }
const ChatContent = ({chatContentList} : ChatContentProps) : JSX.Element => {
    return (
        <div className='flex flex-col bg-zinc-500 overflow-y-auto h-full pb-24'>
            {
                chatContentList.filter(prompt => prompt.role != 'system').map((prompt, id) => (
                    <Box key = {id} className={tailwindColorClasses[prompt.role]}>
                        <Typography>{prompt.content}</Typography>
                    </Box>
                ))
            }
        </div>
    )
}

export default ChatContent;