import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
const ChatNavbar = (): JSX.Element => {
    const [tabID, setTabID] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabID(newValue);
    };
    return (   
        <Tabs value={tabID} onChange={handleChange} className="bg-white"
            textColor="inherit"
        >
            <Tab label="Brainstorm"/>
            <Tab label="Chapter"/>
        </Tabs>
    )
}
export default ChatNavbar;