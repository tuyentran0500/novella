import React from 'react';
import {Button, TextField} from '@mui/material';
import ChatBox from '@/components/Chat/ChatBox';
export const Home: React.FC<{}> = () => {
    return (
        <div className='flex flex-col h-full'>
            <ChatBox></ChatBox> 
        </div>

    )
}
export default Home