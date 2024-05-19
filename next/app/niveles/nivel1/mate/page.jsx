import React from "react";
import Link from 'next/link';

// Definición del componente SeparadorRosa directamente en el mismo archivo
const SeparadorRosa = () => (
  <div className="separadorRosa"></div>
);

// Estilos para los botones definidos en el mismo archivo
const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  marginTop: '20px',
};

const buttonStyle = {
  flex: '1 0 auto',
  width: '250px',
  height: 'auto',
};

export default function MatematicaPage() {
  return (
    <>
      <SeparadorRosa/>
      <div className="flex justify-center items-center mt-10 mb-10">
        <img src="/img/page/starly.png" alt="Animated Image" className="h-40 w-auto mr-10 ml-10" />
      </div>
      <SeparadorRosa/>

      <div style={buttonContainerStyle} className="buttonContainer">
        <div className="button">
          <img src="/img/page/tierran1.png" alt="cabeza" style={buttonStyle} />
        </div>
        <Link href="/nivel1/mate/opeba">
          <img src="/img/page/ob.png" alt="Opebacs" style={buttonStyle} className="button" />
        </Link>
        <Link href="/nivel1/mate/nudeyfra">
          <img src="/img/page/NDYF.png" alt="Numdeyfra" style={buttonStyle} className="button" />
        </Link>
        <Link href="/nivel1/mate/geo">
          <img src="/img/page/geo.png" alt="Geog" style={buttonStyle} className="button" />
        </Link>
        <Link href="/nivel1/mate/resodepro">
          <img src="/img/page/rdp.png" alt="Resodepro" style={buttonStyle} className="button" />
        </Link>
        <SeparadorRosa/>
      </div>
    </>
  );
}

