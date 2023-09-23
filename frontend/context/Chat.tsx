import { getBrainstormHistory, getBrainstormResponse, getBrainstormSummary } from '@/api/chat';
import { FetchStatusType } from '@/api/models/status';
import { longGeneratedText } from '@/helper/helper';
import { ChatPrompt } from '@/interfaces/Chat';
import React, {useContext, useEffect, useState} from 'react';

interface ChatContext {
    chatBrainstormContentList: ChatPrompt[]
    fetchChatBrainstormContentStatus: FetchStatusType,
    tabID: number,
    storySummary: string,
    changeTab: (id: number) => void,
    fetchChatHistory: () => Promise<void>
    fetchChatResponse: (data: ChatPrompt) => Promise<void>
    updateBrainstormContentList: (data: ChatPrompt) => Promise<void>
}

const initialState: ChatContext = {
    chatBrainstormContentList: [],
    fetchChatBrainstormContentStatus: 'idle',
    changeTab: () => {},
    storySummary: longGeneratedText,
    tabID: 0,
    fetchChatHistory: async () => {},
    fetchChatResponse: async (data: ChatPrompt) => {},
    updateBrainstormContentList: async (data: ChatPrompt) => {},
}

const Context = React.createContext<ChatContext>(initialState);

interface ChatProviderProps {
    children: React.ReactNode,
}

export const ChatProvider: React.FC<ChatProviderProps> = ({children}) => {
    const [chatBrainstormContentList, setChatBrainstormContentList] = useState<ChatPrompt[]>([])

    const [fetchChatBrainstormContentStatus, setFetchChatBrainstormContentStatus] = useState<FetchStatusType>('idle');

    const [tabID, setTabID] = useState(0);
    const [storySummary, setStorySummary] = useState(longGeneratedText)
    const [fetchStorySummaryStatus, setfetchStorySummaryStatus] = useState<FetchStatusType>('idle')
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
        if (data.role == 'suggestion'){
            // Find the last object in the array using negative indexing
            setChatBrainstormContentList(prevState => {
                const newState = [...prevState];
                // Update the 'role' property of the last object
                if (newState.length > 0) {
                  newState[newState.length - 1] = {...data, role: 'user'}
                }
                return newState;
            })
        }
        else setChatBrainstormContentList(prevState => [...prevState, data])
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
    const updateBrainstormContentList = async (data: ChatPrompt) => {
        setChatBrainstormContentList(prevState => [...prevState, data]);
    }
    const fetchStorySummary = async () => {
        setfetchStorySummaryStatus('loading');
        const result = await getBrainstormSummary();
        setStorySummary(result);
        setfetchStorySummaryStatus('succeeded');
    }
    useEffect(() => {
        void (async () => {
            const result = await getBrainstormHistory();
            setChatBrainstormContentList(result);
            fetchStorySummary();
        })()
    }, [])
    return (
        <Context.Provider
            value = {{
                chatBrainstormContentList,
                fetchChatBrainstormContentStatus,
                tabID,
                storySummary,
                changeTab,
                fetchChatHistory,
                fetchChatResponse,
                updateBrainstormContentList,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useChatContext = (): ChatContext => useContext(Context);
