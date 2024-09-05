"use client";
import React from "react";
import Link from "next/link";

export default function Sidebar({ isOpen, onClose, session }) {
  const levelLink = session ? `/niveles/nivel${session.nivel}` : '/';

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-full md:w-64 celeste text-gray-800 transform 
      ${isOpen ? "translate-x-0" : "translate-x-full"} 
      transition-transform duration-300 ease-in-out shadow-lg overflow-y-auto`}
    >
      {/* Icono salir */}
      <div className="p-4 flex justify-end">
        <img
          src="/img/home/barra/salir.png"
          alt="Cerrar"
          className="h-7 w-7 cursor-pointer hover:opacity-75 transition-opacity duration-200"
          onClick={onClose}
        />
      </div>

      {/* Logo */}
      <div className="p-4 flex justify-center items-center mb-4">
        <Link href={levelLink}>
          <img
            src="/img/home/logoTEP.png"
            alt="Logo"
            className="h-20 w-auto mb-8 md:mb-0 md:h-30 md:mr-10 md:ml-10"
          />
        </Link>
      </div>

      {/* Lista de elementos */}
      <ul className="px-4 space-y-2">
        <li className="py-2">
          <Link href={levelLink} className="flex items-center py-2 px-3 rounded rosado hover:bg-[#F06292] text-black transition-colors duration-200" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
            <img src="/img/personajes/starly/starly.png" alt="Inicio" className="h-5 w-5 mr-2" />
            Inicio
          </Link>
        </li>

        {/* Condicional para Nivel 1 */}
        {session && session.nivel >= 1 && (
          <li className="py-2">
            <Link href="/niveles/nivel1" className="flex items-center py-2 px-3 rounded rosado hover:bg-[#F06292] text-black transition-colors duration-200" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
              <img src="/img/personajes/niveles/tierran1.png" alt="Nivel 1" className="h-5 w-5 mr-2" />
              Nivel 1
            </Link>
          </li>
        )}

        {/* Condicional para Nivel 2 */}
        {session && session.nivel >= 2 && (
          <li className="py-2">
            <Link href="/niveles/nivel2" className="flex items-center py-2 px-3 rounded rosado hover:bg-[#F06292] text-black transition-colors duration-200" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
              <img src="/img/personajes/niveles/marten2.png" alt="Nivel 2" className="h-5 w-5 mr-2" />
              Nivel 2
            </Link>
          </li>
        )}

        {/* Condicional para Nivel 3 */}
        {session && session.nivel >= 3 && (
          <li className="py-2">
            <Link href="/niveles/nivel3" className="flex items-center py-2 px-3 rounded rosado hover:bg-[#F06292] text-black transition-colors duration-200" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
              <img src="/img/personajes/niveles/jupitern3.png" alt="Nivel 3" className="h-5 w-5 mr-2" />
              Nivel 3
            </Link>
          </li>
        )}

        {/* Otros elementos del sidebar */}
        <li className="py-2">
          <Link href="#" className="flex items-center py-2 px-3 rounded rosado hover:bg-[#F06292] text-black transition-colors duration-200" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
            <img src="/img/home/barra/progreso.png" alt="Progreso" className="h-5 w-5 mr-2" />
            Progreso
          </Link>
        </li>
        <li className="py-2">
          <Link href="#" className="flex items-center py-2 px-3 rounded rosado hover:bg-[#F06292] text-black transition-colors duration-200" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
            <img src="/img/home/barra/favoritos.png" alt="Favoritos" className="h-5 w-5 mr-2" />
            Favoritos
          </Link>
        </li>
        <li className="py-2">
          <Link href="#" className="flex items-center py-2 px-3 rounded rosado hover:bg-[#F06292] text-black transition-colors duration-200" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
            <img src="/img/home/barra/historial.png" alt="Historial" className="h-5 w-5 mr-2" />
            Historial
          </Link>
        </li>
      </ul>
    </div>
  );
}
