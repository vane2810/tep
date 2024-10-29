"use client";
import React from 'react';
import Link from "next/link";
import RecesoLayout from '/components/breaksection';

export default function Sidebar({ isOpen, onClose, session }) {
  const levelLink = session ? `/niveles/nivel${session.nivel}` : '/';

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-full md:w-64 celeste text-gray-800 transform 
      ${isOpen ? "translate-x-0" : "translate-x-full"} 
      transition-transform duration-300 ease-in-out shadow-lg overflow-y-auto`}
    >
      {/* Icono salir */}
      <div className="flex justify-end p-4">
        <img
          src="/img/home/barra/salir.png"
          alt="Cerrar"
          className="hover:opacity-75 w-7 h-7 transition-opacity duration-200 cursor-pointer"
          onClick={onClose}
        />
      </div>

      {/* Logo */}
      <div className="flex justify-center items-center mb-4 p-4">
        <Link href={levelLink}>
          <img
            src="/img/home/logoTEP.png"
            alt="Logo"
            className="md:mr-10 mb-8 md:mb-0 md:ml-10 w-auto h-20 md:h-30"
          />
        </Link>
      </div>

      {/* Lista de elementos */}
      <ul className="space-y-2 px-4">
        <li className="py-2">
          <Link href={levelLink} className="flex items-center hover:bg-[#F06292] px-3 py-2 rounded text-black transition-colors duration-200 rosado" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
            <img src="/img/personajes/starly/starly.png" alt="Inicio" className="mr-2 w-5 h-5" />
            Inicio
          </Link>
        </li>

        {/* Condicional para Nivel 1 */}
        {session && session.nivel >= 1 && (
          <li className="py-2">
            <Link href="/niveles/nivel1" className="flex items-center hover:bg-[#F06292] px-3 py-2 rounded text-black transition-colors duration-200 rosado" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
              <img src="/img/personajes/niveles/tierran1.png" alt="Nivel 1" className="mr-2 w-5 h-5" />
              Nivel 1
            </Link>
          </li>
        )}

        {/* Condicional para Nivel 2 */}
        {session && session.nivel >= 2 && (
          <li className="py-2">
            <Link href="/niveles/nivel2" className="flex items-center hover:bg-[#F06292] px-3 py-2 rounded text-black transition-colors duration-200 rosado" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
              <img src="/img/personajes/niveles/marten2.png" alt="Nivel 2" className="mr-2 w-5 h-5" />
              Nivel 2
            </Link>
          </li>
        )}

        {/* Condicional para Nivel 3 */}
        {session && session.nivel >= 3 && (
          <li className="py-2">
            <Link href="/niveles/nivel3" className="flex items-center hover:bg-[#F06292] px-3 py-2 rounded text-black transition-colors duration-200 rosado" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
              <img src="/img/personajes/niveles/jupitern3.png" alt="Nivel 3" className="mr-2 w-5 h-5" />
              Nivel 3
            </Link>
          </li>
        )}

        {/* Otros elementos del sidebar */}
        <li className="py-2">
          <Link href="/progreso" className="flex items-center hover:bg-[#F06292] px-3 py-2 rounded text-black transition-colors duration-200 rosado" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
            <img src="/img/home/barra/progreso.png" alt="Progreso" className="mr-2 w-5 h-5" />
            Progreso
          </Link>
        </li>
        <li className="py-2">
          <Link href="#" className="flex items-center hover:bg-[#F06292] px-3 py-2 rounded text-black transition-colors duration-200 rosado" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
            <img src="/img/home/barra/favoritos.png" alt="Favoritos" className="mr-2 w-5 h-5" />
            Favoritos
          </Link>
        </li>
        <li className="py-2">
          <Link href="#" className="flex items-center hover:bg-[#F06292] px-3 py-2 rounded text-black transition-colors duration-200 rosado" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
            <img src="/img/home/barra/historial.png" alt="Historial" className="mr-2 w-5 h-5" />
            Historial
          </Link>
        </li>

        {/* Sección de Receso */}
        <li className="py-2">
          <Link href="/receso" className="flex items-center hover:bg-[#F06292] px-3 py-2 rounded text-black transition-colors duration-200 rosado" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
            <img src="/img/receso/estrella.png" alt="Receso" className="mr-2 w-5 h-5" />
            Receso
          </Link>
        </li>
      </ul>
    </div>
  );
}



