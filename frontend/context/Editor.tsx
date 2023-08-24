import { Block, BlockNoteEditor,  PartialBlock } from '@blocknote/core';
import { ReactSlashMenuItem, ToggledStyleButton, Toolbar, ToolbarButton, defaultReactSlashMenuItems, useBlockNote } from '@blocknote/react';
import { AddTask } from '@mui/icons-material';
import React, { useContext } from 'react';
import { useStoryContext } from './Story';
import { createChapter, improveText } from '@/api/story';
interface EditorContext {
    editor: BlockNoteEditor | null,
}

const initialState: EditorContext = {
    editor: null,
}

const Context = React.createContext<EditorContext>(initialState);
interface EditorProviderProps {
    children: React.ReactNode,
    initialContent: any,
}

const CustomFormattingToolbar = (props: { editor: BlockNoteEditor }) => {
    const {selectedChapter} = useStoryContext();

    const improvingSelectedBlock = async () => {
        console.log("Selected:", props.editor.getSelectedText())
        console.log(selectedChapter)
        const result = await improveText({...selectedChapter, content: props.editor.getSelectedText()});   
        if (result == null) return;     
        props.editor.forEachBlock((block: Block<any>) => {
            if (block.id == props.editor.getTextCursorPosition().block.id){
                const newBlock : any= [{
                    type: "paragraph",
                    props: {
                        textColor: "blue",
                        backgroundColor: "blue",
                        textAlignment: "left"
                    },
                    content: [
                        {
                            type: "text",
                            text: result.content,
                            styles: {}
                        }
                    ],
                    "children": []
                }]
                props.editor.replaceBlocks([block], newBlock)
                return false;
            }
            return block.id != props.editor.getTextCursorPosition().block.id
        })

        props.editor.toggleStyles({
            textColor: "blue",
            backgroundColor: "blue",
        });
    }
    return (
      <Toolbar>
        <ToggledStyleButton editor={props.editor} toggledStyle={"bold"} />
        <ToggledStyleButton editor={props.editor} toggledStyle={"italic"} />
        <ToggledStyleButton editor={props.editor} toggledStyle={"underline"} />
        <ToolbarButton
        mainTooltip={"Explore this idea"}
        onClick={improvingSelectedBlock}
        isSelected={
          props.editor.getActiveStyles().textColor === "blue" &&
          props.editor.getActiveStyles().backgroundColor === "blue"
        }>
          Explore this Idea
        </ToolbarButton>

      </Toolbar>
    );
  };
export const EditorProvider: React.FC<EditorProviderProps> = ({children, initialContent}) => {
    const {selectedChapter} = useStoryContext();
    const insertGeneratedChapterContent = async (editor: BlockNoteEditor) => {
        // Block that the text cursor is currently in.
        const currentBlock: Block<any> = editor.getTextCursorPosition().block;
        const result = await createChapter(selectedChapter);
        if (result?.content == undefined) return;
        // New block we want to insert.
        const lines = result?.content.split("\n\n");
        const generatedChapterBlock : any = 
            lines.map(line => ({
                type: "paragraph",
                props: {
                    textColor: "default",
                    backgroundColor: "default",
                    textAlignment: "left"
                },
                content: [
                    {
                        type: "text",
                        text: line,
                        styles: {}
                    }
                ],
                "children": []
            }));
        // Inserting the new block after the current one.
        editor.insertBlocks(generatedChapterBlock, currentBlock, "before"); 
    };

    // Slash Menu item which executes the command.
    const insertGeneratedChapterContentItem = new ReactSlashMenuItem(
        "Generate Chapter Content",
        insertGeneratedChapterContent,
        ["helloworld", "gn"],
        "Other",
        <AddTask />,
        "Used to generate chapter content"
    );
    
    const editor = useBlockNote({ editable: false,  slashCommands: [...defaultReactSlashMenuItems, insertGeneratedChapterContentItem], initialContent: initialContent, 
        customElements: {
            // Makes the editor instance use the custom toolbar.
            formattingToolbar: CustomFormattingToolbar
          } })
    
    return (
        <Context.Provider
            value = {{
                editor,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useEditorContext = (): EditorContext => useContext(Context);
