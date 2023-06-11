import React from 'react';
import {TextField} from '@mui/material';
export const Home: React.FC<{}> = () => {
    return (
        <div>
            <TextField id="outlined-search" label="Search field" type="search" />
        </div>
    )
}
export default Home