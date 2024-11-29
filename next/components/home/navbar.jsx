"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Sidebar from './sidebar';
import useSession from '@/hooks/useSession';
import characterImages from '@/utils/characterImages';
import { HiMenu, HiOutlineLogout } from 'react-icons/hi';
import GuestModal from '@/components/modals/guestModal';
import LogoutModal from '@/components/modals/logoutModal';

const Navbar = () => {
  // Estado para la barra lateral y el menú desplegable
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { session, logout, selectedCharacter } = useSession();
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);

  // Ref para el dropdown, para manejar el clic fuera del área
  const dropdownRef = useRef();

  // Configuración para determinar cuándo la sesión está cargada
  useEffect(() => {
    if (session !== undefined) {
      setIsSessionLoaded(true);
    }
  }, [session]);

  // Manejar clic fuera del menú desplegable
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Función para alternar la barra lateral
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  // Función para alternar el menú desplegable
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  // Función para mostrar el modal de confirmación de cierre de sesión
  const handleShowLogoutModal = () => setShowLogoutModal(true);
  // Función para confirmar el cierre de sesión
  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    localStorage.removeItem('hasSeenWelcome');
    logout();
    window.location.href = '/auth/login';
  };

  // Enlace del logo dependiendo de la sesión
  const logoLink = session ? `/niveles/nivel${session.nivel}` : '/';

  // Renderizar botón específico según el rol
  const renderRoleButton = (role, href, text) => (
    session.role === role && (
      <div className="md:block hidden mr-2 lg:mr-6">
        <Link href={href}>
          <button className="bg-purple-700 hover:bg-purple-500 px-2 lg:px-4 py-1 lg:py-2 rounded-full font-bold text-sm text-white lg:text-base yagora">
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
            src="/img/home/logoTEP.webp"
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
        {!isSessionLoaded ? (
          // Mostrar un spinner de carga mientras se carga la sesión
          <div className="flex justify-center items-center">
            <div className="border-t-4 border-b-4 border-blue-500 rounded-full w-10 h-10 animate-spin"></div>
          </div>
        ) : session ? (
          <>
            {/* Botones específicos según el rol del usuario */}
            {renderRoleButton('admin', '/admin', 'Panel de Administración')}
            {renderRoleButton('padre', '/docente', 'Ingresar usuarios')}
            {renderRoleButton('docente', '/docente', 'Ingresar estudiantes')}

            {/* Información del usuario y avatar del personaje */}
            <div className="flex items-center">
              <div className="md:block hidden mr-4 lg:mr-8 text-base text-center text-rosado lg:text-2xl wonder">
                <h1 className="sm:block hidden text-lg lg:text-2xl">Bienvenido</h1>
                <span className="block text-lg lg:text-2xl">{session.name}</span>
              </div>

              {selectedCharacter && (
                <div className="flex items-center space-x-4 ml-4">
                  <button
                    onClick={toggleDropdown}
                    type="button"
                    title="Personaje"
                    className="relative bg-white shadow-lg p-2 rounded-full transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none"
                  >
                    <img
                      src={characterImages[selectedCharacter]}
                      alt="Personaje"
                      className="w-14 h-14 object-cover"
                    />
                  </button>
                </div>
              )}

              {/* Menú desplegable para cerrar sesión */}
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="top-14 lg:top-20 right-0 z-50 absolute border-gray-200 bg-white shadow-md mt-2 border rounded-lg w-36 md:w-48"
                >
                  <button
                    onClick={handleShowLogoutModal}
                    className="flex items-center px-4 py-2 w-full text-base text-left duration-300"
                  >
                    <HiOutlineLogout className="mr-2 w-5 h-5" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          // Botones para iniciar sesión o registrarse
          <div className="flex space-x-2 md:space-x-4">
            <Link
              href="/auth/login"
              className="bg-blue-500 hover:bg-blue-700 px-2 md:px-3 lg:px-4 py-1 md:py-1 lg:py-2 rounded font-bold text-white text-xs md:text-sm lg:text-base yagora"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/auth/register"
              className="bg-green-500 hover:bg-green-700 px-2 md:px-3 lg:px-4 py-1 md:py-1 lg:py-2 rounded font-bold text-white text-xs md:text-sm lg:text-base yagora"
            >
              Registrarse
            </Link>
          </div>
        )}

        {/* Icono para abrir la barra lateral */}
        <HiMenu className="ml-4 w-12 sm:w-10 h-8 sm:h-10 cursor-pointer" onClick={toggleSidebar} />
      </div>

      {/* Barra lateral */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        session={session}
        onShowGuestModal={() => setShowGuestModal(true)}
      />
      <GuestModal show={showGuestModal} onClose={() => setShowGuestModal(false)} />
      <LogoutModal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </nav>
  );
};

export default Navbar;
