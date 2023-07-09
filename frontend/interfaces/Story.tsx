export interface ChapterContent {
    title: string,
    description: string,
    index?: number,
    content?: string,
    contentBlock?: string,
}

export const defaultChapterContent: ChapterContent = {
    title: '',
    description: '',
    index: -1,
    content: '',
}
export interface OutlinePrompt {
    content: ChapterContent[],
    role: 'user' | 'assistant' | 'system',
}