import { CircularProgress } from '@mui/material';
import React from 'react';

const LoadingChat = (): JSX.Element => {
    return (
        <div className='flex content-center overflow-y-auto justify-center pb-12 bg-neutral-100'>
            <CircularProgress className='text-gray-500'/>
            <div className='pl-5 self-center'>Loading</div>
        </div>
    )
}

export default LoadingChat;