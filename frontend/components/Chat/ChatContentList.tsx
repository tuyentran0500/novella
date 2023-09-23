import { ChatResponse } from '@/api/models/chat'
import { useChatContext } from '@/context/Chat'
import React, { useEffect, useRef } from 'react'
import LoadingChat from './LoadingChat'
import EmptyChatSuggestion from './EmtyChatSuggestion'
import ChatContent from './ChatContent'

interface ChatContentListProps {
    chatContentList : ChatResponse[]
}

const ChatContentList = ({chatContentList} : ChatContentListProps) : JSX.Element => {
    const { fetchChatBrainstormContentStatus: status} = useChatContext();
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
                    <ChatContent key={id} prompt = {prompt} showSuggestion={id == chatContentList.length - 1 && id != 0}/>
                ))
            }
            {status == 'loading' && 
                <LoadingChat />
            }
            <div ref = {bottomChatRef}/>
        </div>
    )
}

export default ChatContentList;