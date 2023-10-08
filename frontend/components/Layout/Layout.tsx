import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { StoryProvider } from '@/context/Story';
const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (

        <div className="flex flex-col min-h-screen">
          <Header />
          <StoryProvider>
            <div className="grow pt-12 bg-white">
              {children}
            </div>
          </StoryProvider>
          {/* <Footer /> */}
        </div>
    )
  }
  
export default Layout