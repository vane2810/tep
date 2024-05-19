import React from "react";
import Link from 'next/link';
import "../../../../styles/mate.css";
import { SeparadorRosa } from "../../../../components/separador";

export default function MatematicaPage() {
  return (
    <main>
      {/* Bienvenida a mate nivel 1*/}
      <section>
        <SeparadorRosa/>
        <div className="flex justify-center items-center mt-10 mb-10">
          <img src="/img/page/starly.png" alt="Animated Image" className="h-40 w-auto mr-10 ml-10" />
        </div>
        <SeparadorRosa/>
      </section>

      {/* Botones*/}
      <section>
        <div className="buttonContainer">
          <Link href="/niveles/nivel1">
            <img src="/img/niveles/mate/geo.png" alt="Nivel 1" className="boton" />
          </Link>
          <Link href="/niveles/nivel2">
            <img src="/img/niveles/mate/geo.png" alt="Nivel 2" className="boton" />
          </Link>
          <Link href="/niveles/nivel3">
            <img src="/img/niveles/mate/geo.png" alt="Nivel 3" className="boton" />
          </Link>
        </div>
      </section>
    </main>
  );
}