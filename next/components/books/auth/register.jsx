"use client";
import React from "react";

const ManualRegistrarse = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-200 to-orange-200">
      <div className="bg-white p-12 rounded-lg shadow-2xl w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 my-8">
        {/* Título del manual */}
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6 wonder">Registrarse</h2>

        {/* Descripción del proceso */}
        <div className="text-gray-700 wonder">
          <p className="mb-4 text-lg">
            En esta sección, te explicamos cómo puedes registrarte en la plataforma. Sigue los pasos a continuación para crear tu cuenta.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-2 wonder">Pasos para Registrarse:</h3>
          <ol className="list-decimal pl-6 mb-6 text-gray-700 wonder">
            <li>Ingresa tu nombre completo en el campo correspondiente.</li>
            <li>Introduce tu correo electrónico válido.</li>
            <li>Escribe una contraseña segura para tu cuenta.</li>
            <li>Confirma tu contraseña.</li>
            <li>Haz clic en el botón de "Registrarse" para completar el proceso.</li>
          </ol>

          {/* Espacio para la captura de pantalla */}
          <div className="text-center mb-6 wonder">
            <p className="mb-4 text-lg">A continuación, te mostramos un ejemplo visual de cómo debe lucir la pantalla:</p>
            <div className="w-auto h-auto max-w-full max-h-full mx-auto">
              {/* Imagen del proceso de registro */}
              <img src="/img/help/faq/manual/2.webp" alt="Captura de pantalla del registro" className="object-contain" />
            </div>
          </div>

          {/* SELECCIONAR ROL */}
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2 wonder">1. Selecciona tu Rol</h3>
          <p className="text-lg mb-4 wonder">
            Después de hacer clic en "Registrarme", deberás seleccionar el rol que deseas tener en la plataforma. Puede ser Estudiante, Docente o Administrador.
          </p>
          <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
            <img src="/img/help/faq/manual/3.webp" alt="Selección de Rol" className="object-contain" />
          </div>

          {/* SELECCIONAR NIVEL */}
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2 wonder">2. Selecciona tu Nivel</h3>
          <p className="text-lg mb-4 wonder">
            A continuación, deberás seleccionar tu nivel. Puede ser Básico, Intermedio o Avanzado, según tu experiencia y conocimientos.
          </p>
          <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
            <img src="/img/help/faq/manual/4.webp" alt="Selección de Nivel" className="object-contain" />
          </div>

          {/* SELECCIONAR PERSONAJE */}
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2 wonder">3. Selecciona tu Personaje</h3>
          <p className="text-lg mb-4 wonder">
            Finalmente, podrás elegir un personaje para representar tu perfil. Solo debes seleccionar el que más te guste y hacer clic en "Confirmar".
          </p>
          <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
            <img src="/img/help/faq/manual/5.webp" alt="Selección de Personaje" className="object-contain" />
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2 wonder">Consejos Adicionales:</h3>
          <ul className="list-disc pl-6 text-gray-700 wonder">
            <li>Asegúrate de usar un correo electrónico válido y accesible para confirmar tu cuenta.</li>
            <li>Revisa que la contraseña que elijas sea lo suficientemente segura.</li>
            <li>Si ya tienes cuenta, puedes dirigirte a la página de "Iniciar sesión" para acceder a tu cuenta.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManualRegistrarse;

