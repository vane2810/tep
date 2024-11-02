// Navbar
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from './sidebar';
import useSession from '@/hooks/useSession';
import characterImages from '@/utils/characterImages';
import { HiMenu } from 'react-icons/hi';

const Navbar = () => {
  // Estado para la barra lateral y el menú desplegable
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { session, logout, selectedCharacter } = useSession();

  // Función para alternar la barra lateral
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  // Función para alternar el menú desplegable
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('hasSeenWelcome');
    logout();
    window.location.href = '/';
  };

  // Enlace del logo dependiendo de la sesión
  const logoLink = session ? `/niveles/nivel${session.nivel}` : '/';

  // Renderizar botón específico según el rol
  const renderRoleButton = (role, href, text) => (
    session.role === role && (
      <div className="md:block hidden mr-2 lg:mr-6">
        <Link href={href}>
          <button className="bg-purple-700 hover:bg-purple-500 px-2 lg:px-4 py-1 lg:py-2 rounded font-bold text-sm text-white lg:text-base">
            {text}
          </button>
        </Link>
      </div>
    )
  );

  return (
    <nav className="top-0 right-0 left-0 z-10 sticky flex justify-between items-center bg-white shadow-md p-4 lg:p-6 celeste">
      {/* Sección del logo y nombre de la aplicación */}
      <div className="flex items-center">
        <Link href={logoLink} className="flex items-center">
          <img
            src="/img/home/logoTEP.png"
            alt="Logo de la aplicación"
            className="mr-2 lg:mr-6 ml-2 lg:ml-6 w-auto h-10 sm:h-16 lg:h-20"
          />
          <span className="md:block hidden text-black text-lg sm:text-2xl lg:text-3xl super">
            TechEduPlanet
          </span>
        </Link>
      </div>

      {/* Sección de navegación y acciones del usuario */}
      <div className="relative flex items-center">
        {session ? (
          <>
            {/* Botones específicos según el rol del usuario */}
            {renderRoleButton('admin', '/admin', 'Panel de Administración')}
            {renderRoleButton('padre', '/docente', 'Ingresar usuarios')}
            {renderRoleButton('docente', '/docente', 'Ingresar estudiantes')}

            {/* Información del usuario y avatar del personaje */}
            <div className="flex items-center">
              <div className="md:block hidden mr-4 lg:mr-8 text-center text-rosado text-sm lg:text-xl wonder">
                <h1 className="sm:block hidden">Bienvenido</h1>
                <span>{session.name}</span>
              </div>

              {selectedCharacter && (
                <button
                  onClick={toggleDropdown}
                  type="button"
                  title="Personaje"
                  className="relative border-2 hover:shadow-lg border-black rounded-xl transform transition duration-300 ease-in-out hover:scale-105 mr-2 lg:mr-4 cursor-pointer focus:outline-none"
                >
                  <img
                    src={characterImages[selectedCharacter]}
                    alt="Personaje"
                    className="w-10 sm:w-14 lg:w-20 h-10 sm:h-14 lg:h-20 object-cover"
                  />
                </button>
              )}

              {/* Menú desplegable para cerrar sesión */}
              {isDropdownOpen && (
                <div className="right-0 z-50 absolute bg-white shadow-lg mt-2 border rounded-lg w-36 md:w-48 story">
                  <button onClick={handleLogout} className="block hover:bg-red-500 px-4 py-2 w-full text-base text-left">
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          // Botones para iniciar sesión o registrarse
          <div className="sm:flex space-x-2 md:space-x-4 hidden">
            <Link href="/auth/login" className="bg-blue-500 hover:bg-blue-700 px-2 lg:px-4 py-1 lg:py-2 rounded font-bold text-sm text-white lg:text-base yagora">
              Iniciar sesión
            </Link>
            <Link href="/auth/register" className="bg-green-500 hover:bg-green-700 px-2 lg:px-4 py-1 lg:py-2 rounded font-bold text-sm text-white lg:text-base yagora">
              Registrarse
            </Link>
          </div>
        )}

        {/* Icono para abrir la barra lateral */}
        <HiMenu className="ml-4 w-12 sm:w-10 h-8 sm:h-10 cursor-pointer" onClick={toggleSidebar} />
      </div>

      {/* Barra lateral */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} session={session} />
    </nav>
  );
};

export default Navbar;