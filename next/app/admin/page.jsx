// Pagina del panel de administación 
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { FaUsers, FaFileAlt, FaComments } from 'react-icons/fa';
import Volver from '@/components/elements/botonVolver';
import { SeparadorAzul } from '@/components/separador';
import useSession from '@/hooks/useSession'; 
import Loading from '@/components/elements/loading';
import MensajePermiso from '@/components/menssages/mensajePermiso';

const CardLink = ({ href, Icon, iconColor, hoverColor, title }) => (
  <Link
    href={href}
    className="flex flex-col items-center bg-white shadow-md hover:shadow-lg p-8 rounded-xl transition duration-300 ease-in-out group"
  >
    <Icon className={`group-hover:text-${hoverColor} group-hover:scale-110 mb-4 text-8xl ${iconColor} transform transition duration-300`} />
    <span className={`group-hover:text-${hoverColor} font-semibold text-2xl text-center text-gray-800 transition duration-300`}>
      {title}
    </span>
  </Link>
);

// Definición de PropTypes para CardLink
CardLink.propTypes = {
  href: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  iconColor: PropTypes.string.isRequired,
  hoverColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default function AdminPage() {
  const { session, loading } = useSession(); // Obtenemos la sesión y el estado de carga
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Verificar si el usuario tiene rol de 'admin'
    if (session && session.role === 'admin') {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (!isAuthorized) {
    return <MensajePermiso/>
  }

  return (
    <main className="flex flex-col bg-gray-50 min-h-screen yagora">
      <SeparadorAzul />
      
      {/* Botón de Volver alineado a la izquierda */}
      <div className="mt-2 ml-4">
        <Volver href="/" />
      </div>

      {/* Contenido principal centrado */}
      <div className="flex flex-col flex-grow justify-center items-center mb-12 px-2">
        {/* Título centrado con imagen y texto al lado */}
        <div className="flex items-center space-x-6 mb-12">
          <h1 className="font-bold text-5xl text-blue-800 text-center">
            Panel de Administración
          </h1>
          <img
            src="/img/personajes/starly/starly_admin.webp"
            alt="Panel de Administración"
            className="w-40 h-36 animate-float"
          />
        </div>

        {/* Contenedor de los enlaces con iconos */}
        <div className="gap-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12 w-full max-w-6xl">
          <CardLink
            href="/admin/users"
            Icon={FaUsers}
            iconColor="text-blue-500"
            hoverColor="blue-700"
            title="Gestión de Usuarios"
          />
          <CardLink
            href="/admin/contents"
            Icon={FaFileAlt}
            iconColor="text-green-500"
            hoverColor="green-700"
            title="Administración de Contenido"
          />
          <CardLink
            href="/admin/feedback"
            Icon={FaComments}
            iconColor="text-yellow-500"
            hoverColor="yellow-700"
            title="Administración de Feedback"
          />
        </div>
      </div>
      <SeparadorAzul />
    </main>
  );
}

