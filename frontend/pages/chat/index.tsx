import React from 'react';
import Chat from '@/components/Chat/ChatBox';
export const Home: React.FC<{}> = () => {
    return (
        <div className='flex flex-col h-full'>
            <Chat/>
        </div>

    )
}
export default Home