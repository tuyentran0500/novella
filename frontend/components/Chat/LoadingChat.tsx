import { CircularProgress } from '@mui/material';
import React from 'react';

const LoadingChat = (): JSX.Element => {
    return (
        <div className='flex align-middle bg-zinc-500 overflow-y-auto h-full pb-24 text-white'>
            <CircularProgress/>
            Loading
        </div>
    )
}

export default LoadingChat;