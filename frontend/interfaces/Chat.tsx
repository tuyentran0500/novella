export interface ChatPrompt {
    content: string,
    suggestionList: string[]
    role: 'user' | 'assistant' | 'system' | 'suggestion',
    temperature?: number,
    summary?: string,
}

export interface ChatHistory {
    memory: ChatPrompt[],
    summary: string,
    title: string,
}

export interface ChatData {
    memory: ChatPrompt[],
    summary: string,
    chapters: ChatHistory[],
}
export enum ChatTabID {
    BRAINSTORM,
    CHAPTERS,
    CHARACTERS,
}

export enum ChatMode {
    STORY = "Story",
    CHAPTERS = "Chapters",
    CHARACTERS = "Characters",
}

export const defaultSelectedChapterHistory: ChatHistory = {
    title: "",
    memory: [],
    summary: "",
}