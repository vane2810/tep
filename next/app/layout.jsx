// RootLayout.jsx
import React from 'react';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: "TechEduPlanet"
}

const RootLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <header><Navbar/></header>
          {children}
          <footer><Footer/></footer>
        </body>
      </html>
    </AuthProvider>
  );
};

export default RootLayout;
