import { getBrainstormHistory, getBrainstormResponse } from '@/api/chat';
import { FetchStatusType } from '@/api/models/status';
import { longGeneratedText } from '@/helper/helper';
import { ChatPrompt } from '@/interfaces/Chat';
import React, {useContext, useEffect, useState} from 'react';

interface ChatContext {
    chatContentList: ChatPrompt[]
    fetchChatContentStatus: FetchStatusType,
    tabID: number,
    storySummary: string,
    changeTab: (id: number) => void,
    fetchChatHistory: () => Promise<void>;
    fetchChatResponse: (data: ChatPrompt) => Promise<void>;

}

const initialState: ChatContext = {
    chatContentList: [],
    fetchChatContentStatus: 'idle',
    changeTab: () => {},
    storySummary: longGeneratedText,
    tabID: 0,
    fetchChatHistory: async () => {},
    fetchChatResponse: async (data: ChatPrompt) => {},
}

const Context = React.createContext<ChatContext>(initialState);

interface ChatProviderProps {
    children: React.ReactNode,
}

export const ChatProvider: React.FC<ChatProviderProps> = ({children}) => {
    const [chatContentList, setChatContentList] = useState<ChatPrompt[]>([])
    const [chatBrainstormContentList, setChatBrainstormContentList] = useState<ChatPrompt[]>([])

    const [fetchChatContentStatus, setFetchChatContentStatus] = useState<FetchStatusType>('idle');
    const [fetchChatBrainstormContentStatus, setFetchChatBrainstormContentStatus] = useState<FetchStatusType>('idle');

    const [tabID, setTabID] = useState(0);
    const [storySummary, setStorySummary] = useState(longGeneratedText)
    const changeTab = (id: number) => {
        setTabID(id);
    }
    const fetchChatHistory = async () => {
        setFetchChatBrainstormContentStatus('loading');
        const data = await getBrainstormHistory();
        if (data != null) {
            setFetchChatBrainstormContentStatus('succeeded');
            setChatBrainstormContentList([...data]);
        }
        else {
            setFetchChatBrainstormContentStatus('errored');
        }
    }
    const fetchChatResponse = async (data: ChatPrompt) => {
        setChatBrainstormContentList(prevState => [...prevState, data])
        setFetchChatBrainstormContentStatus('loading');
        const result = await getBrainstormResponse(data);
        if (result != null){
            setChatBrainstormContentList(prevState => [...prevState, result])
            setFetchChatBrainstormContentStatus('succeeded');
        }
        else {
            setFetchChatBrainstormContentStatus('errored');
        }
    }
    useEffect(() => {
        void (async () => {
            const result = await getBrainstormHistory();
            setChatBrainstormContentList(result);
            setChatContentList(result);
        })()
    }, [])
    return (
        <Context.Provider
            value = {{
                chatContentList,
                fetchChatContentStatus,
                tabID,
                storySummary,
                changeTab,
                fetchChatHistory,
                fetchChatResponse
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useChatContext = (): ChatContext => useContext(Context);
