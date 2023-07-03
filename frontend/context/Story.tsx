import { ChatResponse } from '@/api/models/chat';
import { FetchStatusType } from '@/api/models/status';
import { confirmBrainstormResponse, createChapter, getBrainstormHistory, getBrainstormResponse, getStoryOutline, saveChapterContent } from '@/api/story';
import { ChatPrompt } from '@/interfaces/Chat';
import { ChapterContent, defaultChapterContent } from '@/interfaces/Story';
import React, {useContext, useEffect, useState} from 'react';

interface StoryContext {
    chatContentList: ChatPrompt[]
    storyOutlineList: ChapterContent[]
    selectedChapter: ChapterContent,
    genres: string[],
    fetchStoryOutlineStatus: FetchStatusType,
    fetchChatContentStatus: FetchStatusType,
    fetchSelectedChapterStatus: FetchStatusType,
    handleChatPrompt: (data: ChatPrompt) => Promise<void>;
    confirmBrainstorm: () => Promise<void>,
    generateChapterContent: () => Promise<void>,
    saveCurrentChapterContent: () => Promise<void>,
    handleWritingChapter: (data: ChapterContent) => Promise<void>,
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
    selectedChapter: defaultChapterContent,
    genres: defaultGenres,
    fetchStoryOutlineStatus: 'idle',
    fetchChatContentStatus: 'idle',
    fetchSelectedChapterStatus: 'idle',
    handleChatPrompt: async (data: ChatPrompt) => {},
    confirmBrainstorm: async () => {},
    generateChapterContent: async () => {},
    handleWritingChapter: async (data: ChapterContent) => {},
    saveCurrentChapterContent: async () => {},
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
    const [selectedChapter, setSelectedChapter] = useState<ChapterContent>(defaultChapterContent);
    const [fetchSelectedChapterStatus, setFetchSelectedChapterStatus] = useState<FetchStatusType>('idle');

    const genres = defaultGenres;
    const handleWritingChapter = async (data: ChapterContent) => {
        setFetchSelectedChapterStatus('loading');
        setSelectedChapter(data);
        setFetchSelectedChapterStatus('succeeded');
    }
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

    const generateChapterContent = async () => {
        setFetchSelectedChapterStatus('loading');
        const result = await createChapter(selectedChapter);
        if (result != null){
            setSelectedChapter(result);
            setFetchSelectedChapterStatus('succeeded');
        }
        else {
            setFetchSelectedChapterStatus('errored');
        }
    }
    const saveCurrentChapterContent = async () => {
        setFetchSelectedChapterStatus('loading');
        const result = await saveChapterContent(selectedChapter);
        if (result != null){
            // setSelectedChapter(result);
            setFetchSelectedChapterStatus('succeeded');
        }
        else {
            setFetchSelectedChapterStatus('errored');
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
                selectedChapter,
                fetchStoryOutlineStatus,
                fetchChatContentStatus,
                fetchSelectedChapterStatus,
                handleChatPrompt,
                confirmBrainstorm,
                handleWritingChapter,
                generateChapterContent,
                saveCurrentChapterContent,
                genres,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStoryContext = (): StoryContext => useContext(Context);
