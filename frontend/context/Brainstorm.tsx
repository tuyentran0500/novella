import { ChatResponse } from '@/api/models/chat';
import { FetchStatusType } from '@/api/models/status';
import { confirmBrainstormResponse, getBrainstormHistory, getBrainstormResponse, getStoryOutline } from '@/api/story';
import { ChatPrompt } from '@/interfaces/Chat';
import { ChapterContent } from '@/interfaces/Story';
import React, {useContext, useEffect, useState} from 'react';

interface StoryContext {
    chatContentList: ChatPrompt[]
    storyOutlineList: ChapterContent[]
    fetchStoryOutlineStatus: FetchStatusType,
    fetchChatContentStatus: FetchStatusType,
    handleChatPrompt: (data: ChatPrompt) => Promise<void>;
    confirmBrainstorm: () => Promise<void>,
    genres: string[],
}
const defaultGenres = [
    'Drama',
    'Fantasy',
    'Mystery',
    'Romance',
    'Sci-fi',
]
const initialState: StoryContext = {
    chatContentList: [],
    storyOutlineList: [],
    fetchStoryOutlineStatus: 'idle',
    fetchChatContentStatus: 'idle',
    handleChatPrompt: async (data: ChatPrompt) => {},
    confirmBrainstorm: async () => {},
    genres: defaultGenres,
}

const Context = React.createContext<StoryContext>(initialState);

interface StoryProviderProps {
    children: React.ReactNode,
}

export const StoryProvider: React.FC<StoryProviderProps> = ({children}) => {
    const [chatContentList, setChatContentList] = useState<ChatPrompt[]>([])
    const [storyOutlineList, setStoryOutlineList] = useState<ChapterContent[]>([]);
    const [fetchChatContentStatus, setFetchChatContentStatus] = useState<FetchStatusType>('idle');
    const [fetchStoryOutlineStatus, setFetchStoryOutlineStatus] = useState<FetchStatusType>('idle');

    const genres = defaultGenres;
    const handleChatPrompt = async (data: ChatResponse): Promise<void> => {
        console.log(data);
        setFetchChatContentStatus('loading');
        const result = await getBrainstormResponse(data);
        if (result != null){
            setFetchChatContentStatus('succeeded');
            setChatContentList([result]);
        }
        else {
            setFetchChatContentStatus('errored');
        }
    }
    const confirmBrainstorm = async (): Promise<void> => {
        const result = await confirmBrainstormResponse(chatContentList[0]);
    }

    const fetchStoryOutline = async () => {
        setFetchStoryOutlineStatus('loading');
        const result = await getStoryOutline();
        if (result != null){
            setFetchChatContentStatus('succeeded');
            setStoryOutlineList(result.content);
        }
        else {
            setFetchStoryOutlineStatus('errored');
        }
    }
    useEffect(() => {
        void (async () => {
            if (fetchChatContentStatus == 'idle'){
                const result = await getBrainstormHistory();
                if (result != null){
                    setChatContentList([result]);
                }
            }
            if (fetchStoryOutlineStatus == 'idle') {
                fetchStoryOutline();
            }

        })()
    }, [])
    return (
        <Context.Provider
            value = {{
                chatContentList,
                storyOutlineList,
                fetchStoryOutlineStatus,
                fetchChatContentStatus,
                handleChatPrompt,
                confirmBrainstorm,
                genres,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStoryContext = (): StoryContext => useContext(Context);
