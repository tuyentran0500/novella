import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import React from 'react'
const Header = () : JSX.Element => {
    return (
        <AppBar className='bg-black shadow-lg shadow-black-500/75 h-12'>
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                <Typography
                    className = "font-bold"
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        letterSpacing: '.3rem',
                        color: 'white',
                    }}
                >
                    NOVELA
                </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default Header;