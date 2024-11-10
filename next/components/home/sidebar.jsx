"use client";
import React from 'react';
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";

export default function Sidebar({ isOpen, onClose, session }) {
  const levelLink = session ? `/niveles/nivel${session.nivel}` : '/';

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-1/2 md:w-64 celeste text-gray-800 transform 
      ${isOpen ? "translate-x-0" : "translate-x-full"} 
      transition-transform duration-300 ease-in-out shadow-lg overflow-y-auto z-[10] border-l-4`}
    >
      {/* Icono salir */}
      <div className="flex justify-end p-4">
        <AiOutlineClose
          onClick={onClose}
          className="hover:opacity-75 w-7 h-7 transition-opacity duration-200 cursor-pointer"
          aria-label="Cerrar"
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
          <Link href={levelLink} className="flex items-center hover:scale-105 focus:scale-105 hover:bg-[#F06292] px-3 py-2 rounded w-full text-black transition-transform duration-200 rosado" style={{ fontFamily: 'wonder', fontWeight: 'bold' }}>
            <img src="/img/personajes/starly/starly.png" alt="Inicio" className="mr-2 w-5 h-5" />
            Inicio
          </Link>
        </li>

        {/* Otros elementos del sidebar */}
        <li className="py-2">
          <Link href="/progreso" className="flex items-center hover:scale-105 focus:scale-105 hover:bg-[#F06292] px-3 py-2 rounded w-full text-black transition-transform duration-200 rosado" style={{ fontFamily: 'wonder', fontWeight: 'bold' }}>
            <img src="/img/home/barra/progreso.png" alt="Progreso" className="mr-2 w-5 h-5" />
            Progreso
          </Link>
        </li>
        
        {/* Sección de Receso */}
        <li className="py-2">
          <Link href="/receso" className="flex items-center hover:scale-105 focus:scale-105 hover:bg-[#F06292] px-3 py-2 rounded w-full text-black transition-transform duration-200 rosado" style={{ fontFamily: 'wonder', fontWeight: 'bold' }}>
            <img src="/img/receso/estrella.png" alt="Receso" className="mr-2 w-5 h-5" />
            Receso
          </Link>
        </li>
      </ul>
    </div>
  );
}
