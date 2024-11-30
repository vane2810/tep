// Sidebar
"use client";
import React from 'react';
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import PropTypes from 'prop-types';

export default function Sidebar({ isOpen, onClose, session, onShowGuestModal }) {
  const levelLink = session && session.role === 'estudiante' ? `/niveles/nivel${session.nivel}` : '/';
  const isLoggedIn = !!session; // Verifica si hay sesión

  return (
    <>
      {/* Overlay para cerrar el sidebar al hacer clic fuera de él */}
      {isOpen && (
        <div
          className="z-[9] fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        />
      )}
      
      <div 
        className={`fixed top-0 right-0 h-full w-1/2 md:w-64 celeste text-gray-800 transform 
        ${isOpen ? "translate-x-0" : "translate-x-full"} 
        transition-transform duration-300 ease-in-out shadow-lg overflow-y-auto z-[10] yagora font-bold `}
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
              src="/img/home/logoTEP.webp"
              alt="Logo de TechEduPlanet"
              className="md:mr-10 mb-8 md:mb-0 md:ml-10 w-auto h-20 md:h-30"
            />
          </Link>
        </div>

        {/* Lista de elementos */}
        <ul className="space-y-2 px-4">
          {/* Inicio */}
          <li className="py-2">
            <Link href={levelLink} className="flex items-center space-x-2 hover:scale-105 focus:scale-105 hover:bg-[#F06292] px-3 py-2 rounded w-full text-black transition-transform duration-200 rosado">
              <img src="/img/personajes/starly/starly.webp" alt="Icono de Inicio" className="w-5 h-5" />
              <span>Inicio</span>
            </Link>
          </li>

          {/* Progreso */}
          <li className="py-2">
            {isLoggedIn ? (
              <Link href="/progreso" className="flex items-center space-x-2 hover:scale-105 focus:scale-105 hover:bg-[#F06292] px-3 py-2 rounded w-full text-black transition-transform duration-200 rosado" >
                <img src="/img/home/barra/progreso.webp" alt="Icono de Progreso" className="w-5 h-5" />
                <span>Progreso</span>
              </Link>
            ) : (
              <button onClick={onShowGuestModal} className="flex items-center space-x-2 hover:scale-105 focus:scale-105 hover:bg-[#F06292] px-3 py-2 rounded w-full text-black transition-transform duration-200 rosado" >
                <img src="/img/home/barra/progreso.webp" alt="Icono de Progreso" className="w-5 h-5" />
                <span>Progreso</span>
              </button>
            )}
          </li>

          {/* Receso */}
          <li className="py-2">
            {isLoggedIn ? (
              <Link href="/receso" className="flex items-center space-x-2 hover:scale-105 focus:scale-105 hover:bg-[#F06292] px-3 py-2 rounded w-full text-black transition-transform duration-200 rosado">
                <img src="/img/receso/estrella.png" alt="Icono de Receso" className="w-5 h-5" />
                <span>Receso</span>
              </Link>
            ) : (
              <button onClick={onShowGuestModal} className="flex items-center space-x-2 hover:scale-105 focus:scale-105 hover:bg-[#F06292] px-3 py-2 rounded w-full text-black transition-transform duration-200 rosado">
                <img src="/img/receso/estrella.png" alt="Icono de Receso" className="w-5 h-5" />
                <span>Receso</span>
              </button>
            )}
          </li>

          {/* Juegos Introductorios */}
          {isLoggedIn && (
            <li className="py-2">
              <Link href="/games" className="flex items-center space-x-2 hover:scale-105 focus:scale-105 hover:bg-[#F06292] px-3 py-2 rounded w-full text-black transition-transform duration-200 rosado">
                <img src="/img/home/barra/juegos.webp" alt="Icono de Juegos Introductorios" className="w-5 h-5" />
                <span>Juegos Introductorios</span>
              </Link>
            </li>
          )}

          {/* Configurar Cuenta */}
          {isLoggedIn && (
            <li className="py-2">
              <Link href="/auth/account" className="flex items-center space-x-2 hover:scale-105 focus:scale-105 hover:bg-[#F06292] px-3 py-2 rounded w-full text-black transition-transform duration-200 rosado">
                <img src="/img/home/barra/cuenta.webp" alt="Icono de Configurar Cuenta" className="w-5 h-5" />
                <span>Configurar Cuenta</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

// Definir PropTypes para Sidebar
Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  session: PropTypes.shape({
    nivel: PropTypes.string,
    role: PropTypes.string,
  }),
  onShowGuestModal: PropTypes.func.isRequired,
};
