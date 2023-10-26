import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { StoryProvider } from '@/context/Story';
import { ChatProvider } from '@/context/Chat';
const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (

        <div className="flex flex-col min-h-screen">
          <Header />
          <StoryProvider>
            <ChatProvider>
              <div className="grow pt-12 bg-white">
                {children}
              </div>
            </ChatProvider>
          </StoryProvider>
          {/* <Footer /> */}
        </div>
    )
  }
  
export default Layout