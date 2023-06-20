export interface ChapterContent {
    title: string,
    description: string,
}
export interface OutlinePrompt {
    content: ChapterContent[],
    role: 'user' | 'assistant' | 'system',
}