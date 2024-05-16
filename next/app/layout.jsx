import React from 'react';
import Navbar from '../components/navbar' 
import Footer from '../components/footer';

export const metadata ={
  title: "TechEduPlanet - Home"
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header><Navbar/></header>
        <div>{children}</div>
        <footer><Footer/></footer>
      </body>
    </html>
  )
}
