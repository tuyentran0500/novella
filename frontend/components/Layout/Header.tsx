import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react'
const Header = () : JSX.Element => {
    return (
        <AppBar className='bg-white shadow-lg shadow-black-500/75 h-12'>
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                <Image src="/gpt.png" alt="icon" width={30} height={30} className='mr-2 pb-2'/>
                <Typography
                    className = "font-bold font-mono pb-2"
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        color: 'black',
                    }}
                >
                    Novella
                </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default Header;