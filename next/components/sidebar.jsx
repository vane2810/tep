"use client";
import React from "react";
import Link from "next/link";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <div className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-20`}>
      {/* Icono salir */}
      <div className="p-4 flex justify-end">
        <img src="/img/page/salir.png" alt="Cerrar" className="h-8 w-8 cursor-pointer" onClick={onClose}/>
      </div>
      {/* Lista de elementos */}
      <ul className="px-4">
        <li className="py-2"><Link href="/">Inicio</Link></li>
        <li className="py-2"><Link href="/niveles/nivel1">Nivel 1</Link></li>
        <li className="py-2"><Link href="/niveles/nivel2">Nivel 2</Link></li>
        <li className="py-2"><Link href="/niveles/nivel3">Nivel 3</Link></li>
        <li className="py-2"><Link href="#">Progreso</Link></li>
        <li className="py-2"><Link href="#">Favoritos</Link></li>
        <li className="py-2"><Link href="#">Historial</Link></li>
      </ul>
    </div>
  );
}
