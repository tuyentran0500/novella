import { AppBar, IconButton, InputAdornment, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { useForm } from "react-hook-form";
import { ChatResponse } from "@/api/models/chat";
import { useChatContext } from "@/context/Chat";
import { ChatMode, ChatPrompt } from "@/interfaces/Chat";
const ChatBar = (): JSX.Element => {
    const { fetchChatResponse, fetchChapterChatResponse, chatMode, changeChatDialog } = useChatContext();

    const { handleSubmit, register, reset } = useForm<ChatResponse>({
        defaultValues: {
            role: "user",
            content: ""
        }
    })
    const handleChange = (event: SelectChangeEvent) => {
        changeChatDialog(event.target.value as ChatMode)
      };
    const handleChatPrompt = async (data: ChatPrompt) => {
        if (chatMode == ChatMode.STORY) {
            await fetchChatResponse(data);
        }
        if (chatMode == ChatMode.CHAPTERS){
            await fetchChapterChatResponse(data);
        }
        reset({role: 'user', content: ''});
    }
    return (
        <AppBar position="fixed" className="bg-white" sx={{ top: 'auto', bottom: 0 }}>
            <form onSubmit={handleSubmit(handleChatPrompt)}>
                <div className="flex p-2">
                    <Select
                        className="mr-2 h-14 content-end w-36 rounded-lg"
                        value={chatMode}
                        onChange={(handleChange)}
                        displayEmpty
                        inputProps={{'borderRadius' : 10}}
                    >
                        <MenuItem value={ChatMode.STORY}>Brainstorm</MenuItem>
                        <MenuItem value={ChatMode.CHAPTERS}>Chapters</MenuItem>
                        <MenuItem value={ChatMode.CHARACTERS}>Characters</MenuItem>
                    </Select>

                    <TextField
                        variant="filled"
                        placeholder="Add your message"
                        hiddenLabel
                        multiline
                        className="grow mr-2 drop-shadow-md" id="outlined-search"
                        {...register('content')}
                        InputProps={{ 
                            sx: { borderRadius: 3 },
                            endAdornment: <InputAdornment position="end">
                                <IconButton type="submit">
                                    <SendIcon className="text-gray-700 hover:text-blue-400"/>
                                </IconButton>
                            </InputAdornment>,
                        }}
                    />
                </div>
            </form>
        </AppBar>
    )
}
export default ChatBar;