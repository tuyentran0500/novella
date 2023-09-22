import { ChatResponse } from "@/api/models/chat";
import { Box, Typography } from "@mui/material";
import React from "react";
import Image from 'next/image'
import SuggestChatContent from "./SuggestionChatContent";
import NextStepSuggestion from "./NextStepSuggestion";
interface ChatContentProps {
    prompt : ChatResponse,
    showSuggestion: boolean,
}

const tailwindColorClasses = {
    user: "w-full px-8 py-8 bg-white text-black flex",
    assistant: 'w-full px-8 py-8 bg-neutral-100 text-black flex',
    suggestion: "w-full px-8 py-8 bg-white text-black flex",
    system: 'd-none',
  }

const avatarURL = {
    user: '/avatar.jpg',
    assistant: '/gpt.png',
    system: '/gpt.png',
    suggestion: '/gpt.png',
}

const ChatContent = ({prompt, showSuggestion = true} : ChatContentProps): JSX.Element => {
    return (
        <div className="flex flex-col">
            <Box className={tailwindColorClasses[prompt.role]}>
                <Image height={30} width={30} src={avatarURL[prompt.role]} alt="avatar" className='w-8 h-8 mr-4'></Image>
                <div className="flex flex-col">
                    <Typography style={{whiteSpace: 'pre-wrap'}}>{prompt.content}</Typography>
                    {prompt.role == 'suggestion' && <SuggestChatContent prompts={prompt}/>}
                </div>
            </Box>
            {showSuggestion && <NextStepSuggestion prompt={prompt}/>}
        </div>

    )
}
export default ChatContent;
