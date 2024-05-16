import React from "react";
import Styles from "../styles/globals.css";
import { Container } from "postcss";
import Link from 'next/link';
import { headers } from "next/headers";

const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '5%', 
    maxWidth: '100%',
    overflow: 'hidden',
};

const videoStyle = {
    width: '100%', 
    height: '450px', 
    objectFit: 'cover', 
};

const buttonContainerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1, 
    display: 'flex', 
    gap: '20px', 
};

const button = {
    width: '400px', 
    height: 'auto',
    maxWidth: 'none',
};

export default function Video() {
    return (
        <div style={containerStyle}>
            {/* Video */}
            <video autoPlay loop muted style={videoStyle}>
                <source src="/img/page/galaxia.mp4" type="video/mp4" />
            </video>
            {/* Aquí están los botones */}
            <div style={buttonContainerStyle} className="flex justify-center items-center">
                <Link href="/nivel1">
                    <img src="/img/page/tierran1.png" alt="Nivel 1" className="boton" style={button}/>
                </Link>
                <Link href="/nivel2">
                    <img src="/img/page/marten2.png" alt="Nivel 2" className="boton" style={button}/>
                </Link>
                <Link href="/nivel3">
                    <img src="/img/page/jupitern3.png" alt="Nivel 3" className="boton" style={button}/>
                </Link>
            </div>
        </div>
    );
}
        