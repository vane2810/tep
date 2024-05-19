import React from "react";
import Link from 'next/link';
import Styles from "../styles/globals.css";

const buttonContainerStyle = {
  position: 'absolute',
  top: '48%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
};

const buttonStyle = {
  flex: '1 0 auto',
  width: '250px',
  height: 'auto',
};

export default function MatematicaPage() {
  return (
    <>
      <section>
      <SeparadorRosa/>
      <div className="flex justify-center items-center mt-10 mb-10">
        <img src="/img/page/starly.png" alt="Animated Image" className="h-40 w-auto mr-10 ml-10" />
      </div>
      <SeparadorRosa/>
      <div>
        <NoSSR/>
      </div>
      <SeparadorRosa/>
      <div className="flex justify-center items-center mt-10 mb-10">
        <img src="/img/page/starly.png" alt="Animated Image" className="h-40 w-auto mr-10 ml-10" />
      </div>
      </section>

      <div style={buttonContainerStyle} className="buttonContainer">
        <div className="button">
          <img src="/img/page/tierran1.png" alt="cabeza" style={buttonStyle} />
        </div>
        <Link href="/nivel1/mate/opeba">
          <img src="/img/page/ob.png" alt="Opeba" style={buttonStyle} className="button" />
        </Link>
        <Link href="/nivel1/mate/nudeyfra">
          <img src="/img/page/NDYF.png" alt="Numdeyfra" style={buttonStyle} className="button" />
        </Link>
        <Link href="/nivel1/mate/geo">
          <img src="/img/page/geo.png" alt="Geo" style={buttonStyle} className="button" />
        </Link>
        <Link href="/nivel1/mate/resodepro">
          <img src="/img/page/rdp.png" alt="Resodepro" style={buttonStyle} className="button" />
        </Link>
      </div>
    </>
  );
}

