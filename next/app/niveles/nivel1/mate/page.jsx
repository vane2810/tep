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

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '20px',
  marginBottom: '20px',
};

const imageStyle = {
  height: '250px',
  width: 'auto',
  marginRight: '350px',
  marginLeft: '10px',
};

const textStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',

};

export default function MatematicaPage() {
  return (
    <>
      <SeparadorRosa />
      <div style={headerStyle}>
        <img src="/img/niveles/mate/donkeysaludo.png" alt="Animated Image" style={imageStyle} />
        <span style={textStyle}>Matemática</span>
      </div>
      <SeparadorRosa />
      <div style={buttonContainerStyle} className="buttonContainer">
        <div className="button">
          <img src="/img/niveles/mate/cabeza.png" alt="cabeza" style={buttonStyle} />
        </div>
        <Link href="/nivel1/mate/opeba">
          <img src="/img/niveles/mate/ob.png" alt="Opebacs" style={buttonStyle} className="button" />
        </Link>
        <Link href="/nivel1/mate/nudeyfra">
          <img src="/img/niveles/mate/NDYF.png" alt="Numdeyfra" style={buttonStyle} className="button" />
        </Link>
        <Link href="/nivel1/mate/geo">
          <img src="/img/niveles/mate/geo.png" alt="Geog" style={buttonStyle} className="button" />
        </Link>
        <Link href="/nivel1/mate/resodepro">
          <img src="/img/niveles/mate/rdp.png" alt="Resodepro" style={buttonStyle} className="button" />
        </Link>
      </div>
    </>
  );
}


