"use client";
import React from "react";

const ManualIniciarSesion = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-200 to-orange-200">
      <div className="bg-white p-12 rounded-lg shadow-2xl w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 my-8">
        {/* Título del manual */}
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6 wonder">Manual de Inicio de Sesión</h2>
        
        {/* Descripción del proceso */}
        <div className="text-gray-700 wonder">
          <p className="mb-4 text-lg">
            En esta sección, te explicamos cómo puedes iniciar sesión en la plataforma. Sigue los pasos a continuación para acceder a tu cuenta.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-2 wonder">Pasos para Iniciar Sesión:</h3>
          <ol className="list-decimal pl-6 mb-6 text-gray-700 wonder">
            <li>Ingresa tu correo electrónico en el campo correspondiente.</li>
            <li>Introduce tu contraseña.</li>
            <li>Haz clic en el botón de "Iniciar Sesión" para acceder a tu cuenta.</li>
          </ol>
          
          {/* Espacio para la captura de pantalla */}
          <div className="text-center mb-6 wonder">
            <p className="mb-4 text-lg">A continuación, te mostramos un ejemplo visual de cómo debe lucir la pantalla:</p>
            <div className="w-auto h-auto max-w-full max-h-full mx-auto">
              {/* Aquí va la imagen */}
              <img src="/img/help/faq/manual/1.webp" alt="Captura de pantalla del inicio de sesión" className="object-contain" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2 wonder">Consejos Adicionales:</h3>
          <ul className="list-disc pl-6 text-gray-700 wonder">
            <li>Revisa que tu correo electrónico y contraseña sean correctos antes de intentar iniciar sesión.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManualIniciarSesion;

