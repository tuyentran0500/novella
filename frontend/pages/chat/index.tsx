import React from 'react';
import ChatBox from '@/components/Chat/ChatBox';
export const Home: React.FC<{}> = () => {
    return (
        <div className='flex flex-col h-full'>
            <ChatBox></ChatBox> 
        </div>

    )
}
export default Home