import { getBrainstormHistory, getBrainstormResponse } from '@/api/chat';
import { FetchStatusType } from '@/api/models/status';
import { confirmBrainstormResponse } from '@/api/story';
import { longGeneratedText } from '@/helper/helper';
import { ChatHistory, ChatMode, ChatPrompt, defaultSelectedChapterHistory } from '@/interfaces/Chat';
import React, {useContext, useEffect, useState} from 'react';

interface ChatContext {
    chatBrainstormContentList: ChatPrompt[]
    fetchChatHistoryStatus: FetchStatusType,
    tabID: number,
    chatMode: string,
    storySummary: string,
    chapterHistoryList: ChatHistory[],
    selectedChapter: ChatHistory,
    changeTab: (id: number) => void,
    changeChatDialog: (id: ChatMode) => void,
    changeSelectedChapter: (title: string) => void,
    fetchChatHistory: () => Promise<void>
    fetchChatResponse: (data: ChatPrompt) => Promise<void>
    updateBrainstormContentList: (data: ChatPrompt) => Promise<void>
    confirmBrainstorm: () => Promise<void>,
}

const initialState: ChatContext = {
    chatBrainstormContentList: [],
    fetchChatHistoryStatus: 'idle',
    chapterHistoryList: [],
    changeTab: (id: number) => {},
    changeChatDialog: (id: ChatMode) => {},
    changeSelectedChapter: (title: string) => {},
    selectedChapter: defaultSelectedChapterHistory,
    storySummary: longGeneratedText,
    tabID: 0,
    chatMode: ChatMode.STORY,
    fetchChatHistory: async () => {},
    fetchChatResponse: async (data: ChatPrompt) => {},
    updateBrainstormContentList: async (data: ChatPrompt) => {},
    confirmBrainstorm: async () => {},
}

const Context = React.createContext<ChatContext>(initialState);

interface ChatProviderProps {
    children: React.ReactNode,
}

export const ChatProvider: React.FC<ChatProviderProps> = ({children}) => {
    const [chatBrainstormContentList, setChatBrainstormContentList] = useState<ChatPrompt[]>([])
    const [chapterHistoryList, setchapterHistoryList] = useState<ChatHistory[]>([]);
    const [fetchChatHistoryStatus, setFetchChatHistoryStatus] = useState<FetchStatusType>('idle');
    const [selectedChapter, setSelectedChapter] = useState<ChatHistory>(defaultSelectedChapterHistory);
    const [tabID, setTabID] = useState(0);
    const [chatMode, setChatMode] = useState(ChatMode.STORY)
    const [storySummary, setStorySummary] = useState(longGeneratedText)
    const changeTab = (id: number) => {
        setTabID(id);
    }
    const changeChatDialog = (id: ChatMode) => {
        setChatMode(id);
    }
    const changeSelectedChapter = (title: string) => {
        setSelectedChapter(chapterHistoryList.find(chapter => chapter.title == title) ?? defaultSelectedChapterHistory);
    }
    const fetchChatHistory = async () => {
        setFetchChatHistoryStatus('loading');
        const data = await getBrainstormHistory();
        if (data != null) {
            setFetchChatHistoryStatus('succeeded');
            setChatBrainstormContentList([...data.memory]);
            setStorySummary(data.summary);
            setchapterHistoryList(data.chapters);
            console.log(data.chapters);
        }
        else {
            setFetchChatHistoryStatus('errored');
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
        setFetchChatHistoryStatus('loading');
        const result = await getBrainstormResponse(data);
        if (result != null){
            setChatBrainstormContentList(prevState => [...prevState, result])
            fetchChatHistory();
            setFetchChatHistoryStatus('succeeded');
        }
        else {
            setFetchChatHistoryStatus('errored');
        }
    }

    const confirmBrainstorm = async (): Promise<void> => {
        const result = await confirmBrainstormResponse({"content" : storySummary, role: 'user', suggestionList: []});
    }
    const updateBrainstormContentList = async (data: ChatPrompt) => {
        setChatBrainstormContentList(prevState => [...prevState, data]);
    }
    useEffect(() => {
        void (async () => {
            fetchChatHistory();
        })()
    }, [])
    return (
        <Context.Provider
            value = {{
                chatBrainstormContentList,
                fetchChatHistoryStatus,
                tabID,
                chatMode,
                chapterHistoryList,
                storySummary,
                selectedChapter,
                changeTab,
                changeChatDialog,
                changeSelectedChapter,
                fetchChatHistory,
                fetchChatResponse,
                updateBrainstormContentList,
                confirmBrainstorm
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useChatContext = (): ChatContext => useContext(Context);
