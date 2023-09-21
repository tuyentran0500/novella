import { useChatContext } from "@/context/Chat";
import { Tab, Tabs } from "@mui/material";
import React from "react";
const ChatNavbar = (): JSX.Element => {
    const {tabID, changeTab} = useChatContext();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        changeTab(newValue);
    };
    return (   
        <Tabs value={tabID} onChange={handleChange} className="bg-white fixed h-4 w-full"
            textColor="inherit"
        >
            <Tab label="Brainstorm"/>
            <Tab label="Chapters"/>
            <Tab label="Characters"/>
        </Tabs>
    )
}
export default ChatNavbar;