import React from 'react';
import Header from './Header';
import Footer from './Footer';
const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="grow pt-12 bg-white">
          {children}
        </div>
        {/* <Footer /> */}
      </div>
    )
  }
  
export default Layout