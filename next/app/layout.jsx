// Layout 
import React from 'react';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { SessionProvider } from '@/context/session';
import '@/styles/globals.css';
import '@/styles/animacion.css';

export const metadata = {
  title: "TechEduPlanet"
}

const RootLayout = ({ children }) => {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <header><Navbar /></header>
          {children}
          <footer><Footer /></footer>
        </body>
      </html>
    </SessionProvider>
  );
};

export default RootLayout;