import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import React from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useStoryContext } from "@/context/Story";
import { Button, Card, CardActions, CardMedia } from "@mui/material";
type Editor = {
    editor : BlockNoteEditor
}
const EditChapterWriting = (): JSX.Element => {
    const {selectedChapter, generateChapterContent, saveCurrentChapterContent, updateChapterContent} = useStoryContext();
    
    const getintialContent = (): PartialBlock<any>[] => {
        console.log("BlockNote:", selectedChapter.contentBlock)
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
    const editor = useBlockNote({ initialContent: getintialContent(), editable: true});
    editor?.onEditorContentChange(async () => {
        const blocks = editor.topLevelBlocks;
            const blockContent = JSON.stringify(blocks);
            const content = await editor.blocksToMarkdown(blocks);

        updateChapterContent(blockContent, content);

      });


      return (
      <Card className="m-5 w-full flex flex-col overflow-y-auto h-full">
      <CardMedia
          sx={{ height: 240 }}
          image="https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          title="green iguana"
      />
      <BlockNoteView editor={editor}/>
      <CardActions>
          <Button size="small" onClick={generateChapterContent}>Generate</Button>
          <Button size="small" onClick={saveCurrentChapterContent}>Save</Button>
      </CardActions>
  </Card>
      );
}
export default EditChapterWriting;
