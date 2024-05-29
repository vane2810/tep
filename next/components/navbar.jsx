"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Sidebar from './Sidebar';

// Resto del código...

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRoleId, setUserRoleId] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const storedRoleId = localStorage.getItem('roleId');
    if (storedRoleId) {
      setUserRoleId(parseInt(storedRoleId));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('roleId');
    setUserRoleId(null);
    // Aquí puedes agregar la lógica para redirigir a la página de inicio o a donde sea necesario
  };

  return (
    <nav className="flex justify-between items-center p-6 celeste text-black sticky top-0 left-0 right-0 z-10">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <img src="/img/page/logoTEP.png" alt="Logo de la aplicación" className="h-20 w-auto mr-10 ml-10" />
        </Link>
        <span className="text-3xl super">TechEduPlanet</span>
      </div>

      {/* Condición para mostrar botones según el estado de autenticación */}
      {!userRoleId && (
        <div>
          <Link href="/adm/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Iniciar sesión</Link>
          <Link href="/adm/registro" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Registrarse</Link>
        </div>
      )}

      {userRoleId === 1 && (
        <div className="flex items-center">
          <div className="text-xl font-bold mr-4">Usuario Estudiante</div>
          <button onClick={handleLogout} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Cerrar sesión</button>
        </div>
      )}

      {/* Icono para abrir la barra lateral */}
      <img src="/img/page/linea.png" alt="Abrir barra lateral" className="h-8 w-8 cursor-pointer" onClick={toggleSidebar} />

      {/* Barra lateral */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </nav>
  );
};

export default Navbar;
