// Inicio Nivel 1

import React from "react";
import Link from 'next/link';
import { SeparadorRosa } from "@/components/separador";

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

export default function Nivel1() {
  return (
    <main>
    <SeparadorRosa/>
    <div style={buttonContainerStyle} className="flex justify-center items-center">
      <Link href="/niveles/nivel1/mate">
        <img src="/img/niveles/mate/matematica.png" alt="Matematica" style={buttonStyle} />
      </Link>
      <Link href="/niveles/nivel1/lenguaje">
        <img src="/img/niveles/lenguaje/lenguaje.png" alt="Sociales" style={buttonStyle} />
      </Link>
      <Link href="/niveles/nivel1/ingles">
       <img src="/img/niveles/ingles/ingles.png" alt="Lenguaje" style={buttonStyle} />
      </Link>
      <Link href="/niveles/nivel1/sociales">
       <img src="/img/niveles/sociales/sociales.png" alt="Ingles" style={buttonStyle} />
      </Link>
    </div>
  </main>
   
    
  )
}
