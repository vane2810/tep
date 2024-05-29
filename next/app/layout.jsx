// RootLayout.jsx
import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { AuthProvider } from '../context/AuthContext';

export const metadata = {
  title: "TechEduPlanet"
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <header>
            <Navbar />
          </header>
          <div>{children}</div>
          <footer><Footer/></footer>
        </AuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
