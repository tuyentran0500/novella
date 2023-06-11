import React from 'react';
import {Button, TextField} from '@mui/material';
export const Home: React.FC<{}> = () => {
    return (
        <div className='flex flex-col h-full'>
            <div className="flex p-2">
                <TextField className="grow" id="outlined-search" label="Content" type="search" />
                <Button>Submit</Button>
            </div>
            <div className='grow'>
                
            </div>
        </div>

    )
}
export default Home