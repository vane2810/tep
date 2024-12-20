// Layout - Componente principal para la estructura de la app
import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/home/footer';
import Navbar from '../components/home/navbar';
import { SessionProvider } from '@/context/session';
import '@/styles/globals.css';
import '@/styles/animacion.css';
import SoporteButton from '@/components/elements/botonSoporte';

export const metadata = {
  title: "TechEduPlanet"
};

const RootLayout = ({ children }) => {
  return (
    <SessionProvider>
      <html lang="en">
        <head></head>
        <body>
          <header><Navbar /></header>
          {children}
          <SoporteButton/>
          <footer><Footer /></footer>
        </body>
      </html>
    </SessionProvider>
  );
};

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;