import { getChatHistory, getChatResponse } from '@/api/chat';
import { FetchStatusType } from '@/api/models/status';
import { ChatPrompt } from '@/interfaces/Chat';
import React, {useContext, useEffect, useState} from 'react';

interface ChatContext {
    chatContentList: ChatPrompt[]
    fetchChatContentStatus: FetchStatusType,
    fetchChatHistory: () => Promise<void>;
    fetchChatResponse: (data: ChatPrompt) => Promise<void>;

}

const initialState: ChatContext = {
    chatContentList: [],
    fetchChatContentStatus: 'idle',
    fetchChatHistory: async () => {},
    fetchChatResponse: async (data: ChatPrompt) => {},
}

const Context = React.createContext<ChatContext>(initialState);

interface ChatProviderProps {
    children: React.ReactNode,
}

export const ChatProvider: React.FC<ChatProviderProps> = ({children}) => {
    const [chatContentList, setChatContentList] = useState<ChatPrompt[]>([])
    const [fetchChatContentStatus, setFetchChatContentStatus] = useState<FetchStatusType>('idle');

    const fetchChatHistory = async () => {
        setFetchChatContentStatus('loading');
        const data = await getChatHistory();
        if (data != null) {
            setFetchChatContentStatus('succeeded');
            setChatContentList([...data]);
        }
        else {
            setFetchChatContentStatus('errored');
        }
    }
    const fetchChatResponse = async (data: ChatPrompt) => {
        setChatContentList(prevState => [...prevState, data])
        setFetchChatContentStatus('loading');
        const result = await getChatResponse(data);
        if (result != null){
            setChatContentList(prevState => [...prevState, result])
            setFetchChatContentStatus('succeeded');
        }
        else {
            setFetchChatContentStatus('errored');
        }
        console.log(chatContentList);
    }
    useEffect(() => {
        void (async () => {
            const result = await getChatHistory();
            setChatContentList(result);
        })()
    }, [])
    return (
        <Context.Provider
            value = {{
                chatContentList,
                fetchChatContentStatus,
                fetchChatHistory,
                fetchChatResponse
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useChatContext = (): ChatContext => useContext(Context);
