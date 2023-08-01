import { useStoryContext } from "@/context/Story"
import { ChapterContent } from "@/interfaces/Story"
import { PartialBlock } from "@blocknote/core"

export const getintialContent = (selectedChapter: ChapterContent): PartialBlock<any>[] => {
    if (selectedChapter.contentBlock){
        return JSON.parse(selectedChapter.contentBlock)
    }
    return [
        {
            id: "title",
            type: "heading",
            props: {
                textColor: "default",
                backgroundColor: "default",
                textAlignment: "left",
                level: "3"
            },
            content: [
                {
                    type: "text",
                    text: selectedChapter.title,
                    styles: {}
                }
            ],
        },
        {
            id: "content",
            type: "paragraph",
            props: {
                textColor: "default",
                backgroundColor: "default",
                textAlignment: "left"
            },
            content: [
                {
                    type: "text",
                    text: selectedChapter.content ?? "",
                    styles: {}
                }
            ],
            "children": []
        },
    ]
}