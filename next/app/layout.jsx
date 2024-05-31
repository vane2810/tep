// RootLayout.jsx
import React from 'react';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

export const metadata = {
  title: "TechEduPlanet"
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header><Navbar/></header>
        {children}
        <footer><Footer/></footer>
      </body>
    </html>
  )
}