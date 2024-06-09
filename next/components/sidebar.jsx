"use client";
import React from "react";
import Link from "next/link";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <div className={`fixed top-0 right-0 h-full w-full md:w-64 celeste text-gray-800 transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-20 shadow-lg`}>
      {/* Icono salir */}
      <div className="p-4 flex justify-end">
        <img
          src="/img/page/salir.png"
          alt="Cerrar"
          className="h-8 w-8 cursor-pointer hover:opacity-75 transition-opacity duration-200"
          onClick={onClose}
        />
      </div>
      {/* Lista de elementos */}
      <ul className="px-4 space-y-2">
        <li className="py-2">
          <Link href="/" className="flex items-center py-2 px-3 rounded bg-[#ED1566] hover:bg-[#F06292] text-black transition-colors duration-200" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
            <img src="/img/page/starly.png" alt="Inicio" className="h-5 w-5 mr-2" />
            Inicio
          </Link>
        </li>
        <li className="py-2">
          <Link href="/niveles/nivel1" className="flex items-center py-2 px-3 rounded bg-[#ED1566] hover:bg-[#F06292] text-black transition-colors duration-200" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
            <img src="/img/icons/level1.png" alt="Nivel 1" className="h-5 w-5 mr-2" />
            Nivel 1
          </Link>
        </li>
        <li className="py-2">
          <Link href="/niveles/nivel2" className="flex items-center py-2 px-3 rounded bg-[#ED1566] hover:bg-[#F06292] text-black transition-colors duration-200" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
            <img src="/img/icons/level2.png" alt="Nivel 2" className="h-5 w-5 mr-2" />
            Nivel 2
          </Link>
        </li>
        <li className="py-2">
          <Link href="/niveles/nivel3" className="flex items-center py-2 px-3 rounded bg-[#ED1566] hover:bg-[#F06292] text-black transition-colors duration-200" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
            <img src="/img/icons/level3.png" alt="Nivel 3" className="h-5 w-5 mr-2" />
            Nivel 3
          </Link>
        </li>
        <li className="py-2">
          <Link href="#" className="flex items-center py-2 px-3 rounded bg-[#ED1566] hover:bg-[#F06292] text-black transition-colors duration-200" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
            <img src="/img/icons/progress.png" alt="Progreso" className="h-5 w-5 mr-2" />
            Progreso
          </Link>
        </li>
        <li className="py-2">
          <Link href="#" className="flex items-center py-2 px-3 rounded bg-[#ED1566] hover:bg-[#F06292] text-black transition-colors duration-200" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
            <img src="/img/icons/favorites.png" alt="Favoritos" className="h-5 w-5 mr-2" />
            Favoritos
          </Link>
        </li>
        <li className="py-2">
          <Link href="#" className="flex items-center py-2 px-3 rounded bg-[#ED1566] hover:bg-[#F06292] text-black transition-colors duration-200" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
            <img src="/img/icons/history.png" alt="Historial" className="h-5 w-5 mr-2" />
            Historial
          </Link>
        </li>
        <li className="py-2">
          <Link href="#" className="flex items-center py-2 px-3 rounded bg-[#ED1566] hover:bg-[#F06292] text-black transition-colors duration-200" style={{ fontFamily: 'Story, sans-serif', fontWeight: 'bold' }}>
            <img src="/img/icons/logout.png" alt="Cerrar Sesión" className="h-5 w-5 mr-2" />
            Cerrar Sesión
          </Link>
        </li>
      </ul>
    </div>
  );
}
