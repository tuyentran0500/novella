export interface ChatPrompt {
    content: string,
    suggestionList: string[]
    role: 'user' | 'assistant' | 'system' | 'suggestion',
    temperature?: number,
}
export interface ChatHistory {
    memory : ChatPrompt[],
    summary: string,
}

export enum ChatTabID {
    BRAINSTORM,
    CHAPTERS,
    CHARACTERS,
}