export interface ChatPrompt {
    content: string,
    role: 'user' | 'assistant' | 'system',
}
export interface ChatHistory {
    memory : ChatPrompt[],
}