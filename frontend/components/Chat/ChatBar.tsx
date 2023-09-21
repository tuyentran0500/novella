import { AppBar, IconButton, InputAdornment, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { useForm } from "react-hook-form";
import { ChatResponse } from "@/api/models/chat";
import { useChatContext } from "@/context/Chat";
import { ChatPrompt } from "@/interfaces/Chat";
const ChatBar = (): JSX.Element => {
    const [chatMode, setchatMode] = useState("brainstorm")
    const { handleSubmit, register, reset } = useForm<ChatResponse>({
        defaultValues: {
            role: "user",
            content: ""
        }
    })
    const handleChange = (event: SelectChangeEvent) => {
        setchatMode(event.target.value);
      };
    const { fetchChatResponse } = useChatContext();
    const handleChatPrompt = async (data: ChatPrompt) => {
        await fetchChatResponse(data);
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
                        <MenuItem value={"brainstorm"}>Brainstorm</MenuItem>
                        <MenuItem value={"chapter"}>Chapters</MenuItem>
                        <MenuItem value={"character"}>Characters</MenuItem>
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