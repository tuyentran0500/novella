export interface ChapterContent {
    title: string,
    description: string,
    index?: number,
    content?: string,
    contentBlock?: string,
}

export interface ChapterContentBlock {
    title?: string,
    description?: string,
    content: string,
    before?: string,
    after?: string,
}

export const defaultChapterContent: ChapterContent = {
    title: '',
    description: '',
    index: -1,
    content: '',
}

export const defaultChapterContentBlock: ChapterContentBlock = {
    title: '',
    description: '',
    content: '',
    before: '',
    after: '',
}
export interface OutlinePrompt {
    content: ChapterContent[],
    role: 'user' | 'assistant' | 'system',
}