import React from 'react';
import {Button, TextField} from '@mui/material';
import ChatBox from '@/components/Chat/ChatBox';
import Link from 'next/link';
export const Home: React.FC<{}> = () => {
    return (
        <div className='flex h-full p-2'>
            <Link href="/chat/">
                <Button className="w-48 bg-green-600 hover:bg-green-700 text-white h-48 m-2">
                    Chat
                </Button>
            </Link>
            <Link href="/story/">
                <Button className="w-48 bg-green-600 hover:bg-green-700 text-white h-48 m-2">
                    My stories
                </Button>
            </Link>
        </div>

    )
}
export default Home