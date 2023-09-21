export interface ChatPrompt {
    content: string,
    role: 'user' | 'assistant' | 'system',
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