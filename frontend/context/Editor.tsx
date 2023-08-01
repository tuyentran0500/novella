import { Block, BlockNoteEditor,  PartialBlock } from '@blocknote/core';
import { ReactSlashMenuItem, ToggledStyleButton, Toolbar, ToolbarButton, defaultReactSlashMenuItems, useBlockNote } from '@blocknote/react';
import { AddTask } from '@mui/icons-material';
import React, {useContext} from 'react';
import { useStoryContext } from './Story';
import { createChapter } from '@/api/story';
interface EditorContext {
    editor: BlockNoteEditor | null,
}

const initialState: EditorContext = {
    editor: null,
}

const Context = React.createContext<EditorContext>(initialState);
interface EditorProviderProps {
    children: React.ReactNode,
    initialContent: PartialBlock<any>[],
}

const CustomFormattingToolbar = (props: { editor: BlockNoteEditor }) => {
    return (
      <Toolbar>
        <ToggledStyleButton editor={props.editor} toggledStyle={"bold"} />
        <ToggledStyleButton editor={props.editor} toggledStyle={"italic"} />
        <ToggledStyleButton editor={props.editor} toggledStyle={"underline"} />
        <ToolbarButton
        mainTooltip={"Explore this idea"}
        onClick={() => {
            console.log("Selected:", props.editor.getSelectedText())
            props.editor.forEachBlock((block:  Block<any>) => {
                console.log(block.content);
                return block.id != props.editor.getTextCursorPosition().block.id
            })
          props.editor.toggleStyles({
            textColor: "blue",
            backgroundColor: "blue",
          });
        }}
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
        // New block we want to insert.
        const helloWorldBlock : any = [
            {
                type: "paragraph",
                props: {
                    textColor: "default",
                    backgroundColor: "default",
                    textAlignment: "left"
                },
                content: [
                    {
                        type: "text",
                        text: result?.content,
                        styles: {}
                    }
                ],
                "children": []
            },
        ];
        // Inserting the new block after the current one.
        editor.insertBlocks(helloWorldBlock, currentBlock, "after"); 
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
