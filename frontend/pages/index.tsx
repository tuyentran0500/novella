import React from 'react';
import {Button} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image'

export const Home: React.FC<{}> = () => {
    return (
        <div className='flex h-full pt-32' style={{ backgroundImage: 'url("https://i.ibb.co/ZdLXxQK/Home-page.png")', backgroundSize: 'cover', height: '100vh' }} >
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
            {/* <div className="w-full" style={{ backgroundImage: 'url("https://img.freepik.com/premium-vector/create-your-own-story-3d-quote-design_397922-79.jpg")', backgroundSize: 'cover', height: '100vh' }}></div> */}
        </div>

    )
}
export default Home