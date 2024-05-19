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

export default function MateriasPage() {
  return (
    <div style={buttonContainerStyle} className="flex justify-center items-center">
      <Link href="/nivel1/mate">
        <img src="/img/page/matematica.png" alt="Matematica" style={buttonStyle} />
      </Link>
      <Link href="/nivel1/sociales">
        <img src="/img/page/sociales.png" alt="Sociales" style={buttonStyle} />
      </Link>
      <Link href="/nivel1/lenguaje">
        <img src="/img/page/lenguaje.png" alt="Lenguaje" style={buttonStyle} />
      </Link>
      <Link href="/nivel1/ingles">
        <img src="/img/page/ingles.png" alt="Ingles" style={buttonStyle} />
      </Link>
    </div>
  );
}
