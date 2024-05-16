import React from "react";

import Link from 'next/link';

export default function Nivel1Page() {
  return (
    <div>
      <h1>Nivel 1</h1>
      <ul>
        <li><Link href="/niveles/nivel1/mate">Matemáticas</Link></li>
        <li><Link href="/niveles/nivel1/ingles">Inglés</Link></li>
        <li><Link href="/niveles/nivel1/sociales">Sociales</Link></li>
        <li><Link href="/niveles/nivel1/lenguaje">Lenguaje</Link></li>
      </ul>
    </div>
  );
}
