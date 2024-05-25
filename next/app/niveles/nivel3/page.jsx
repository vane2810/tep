// Inicio Nivel 3

import React from "react";
import Link from 'next/link';

const buttonContainerStyle = {
  position: 'absolute',
  top: '58%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
};

const buttonStyle = {
  flex: '1 0 auto',
  maxWidth: '320px',
  height: 'auto',
};

export default function Nivel3() {
  return (
    <main>
      <div style={buttonContainerStyle} className="flex justify-center items-center">
        <Link href="/niveles/nivel3/mate">
          <img src="/img/niveles/mate/matematica.png" alt="Matematica" style={buttonStyle} />
        </Link>
        <Link href="/niveles/nivel3/lenguaje">
          <img src="/img/niveles/lenguaje/lenguaje.png" alt="Sociales" style={buttonStyle} />
        </Link>
        <Link href="/niveles/nivel3/ingles">
         <img src="/img/niveles/ingles/ingles.png" alt="Lenguaje" style={buttonStyle} />
        </Link>
        <Link href="/niveles/nivel3/sociales">
         <img src="/img/niveles/sociales/sociales.png" alt="Ingles" style={buttonStyle} />
        </Link>
      </div>
    </main>
    
  );
}