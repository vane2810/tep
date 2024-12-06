"use client";
import React from "react";

const EstudiantesReceso = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-200 to-pink-300">
      <div className="bg-white p-12 rounded-lg shadow-2xl w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 my-8">
        {/* Título del manual */}
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6 wonder">Receso</h2>

        {/* Descripción inicial del manual */}
        <div className="text-gray-700 wonder mb-8">
          <p className="mb-4 text-lg">
            En este manual, te guiaremos paso a paso para que puedas disfrutar del receso y las actividades disponibles. A continuación te mostramos cómo acceder y participar en las actividades de receso.
          </p>
        </div>

        {/* PASO 1: Acceso al receso */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 wonder">1. Acceso al Receso</h3>
        <p className="text-lg mb-4 wonder">
          Para acceder al receso, debes hacer clic en las tres rayitas que aparecen en la esquina superior izquierda de la pantalla. Esto abrirá una barra lateral donde podrás ver la opción de receso.
        </p>
        {/* Captura de la barra lateral */}
        <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
          <img src="/img/help/faq/manual/18.webp" alt="Barra Lateral" className="object-contain" />
        </div>

        {/* PASO 2: Bienvenida al receso */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 wonder">2. Bienvenida al Receso</h3>
        <p className="text-lg mb-4 wonder">
          Una vez que hagas clic en la opción de "Receso", serás dirigido a la sección de receso, donde se mostrará una pantalla de bienvenida con tres tarjetas de actividades que puedes elegir.
        </p>
        {/* Captura de bienvenida con las tres tarjetas de actividades */}
        <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
          <img src="/img/help/faq/manual/19.webp" alt="Bienvenida al Receso" className="object-contain" />
        </div>

        {/* PASO 3: Selección de actividad */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 wonder">3. Selección de Actividad</h3>
        <p className="text-lg mb-4 wonder">
          En esta sección, verás tres opciones de actividades disponibles: Jugar, Ver Videos y Relajación. Puedes elegir la actividad que desees realizar:
          <ul className="list-inside list-disc mb-4">
            <li>Si deseas jugar, haz clic en <b>"Jugar Ahora"</b>.</li>
            <li>Si deseas ver videos, haz clic en <b>"Ver Videos"</b>.</li>
            <li>Si deseas ir a la parte de relajación, haz clic en <b>"Relajarse"</b>.</li>
          </ul>
          Para este ejemplo, vamos a dirigirnos a <b>"Jugar Ahora"</b>.
        </p>
        {/* Captura de la actividad "Jugar Ahora" */}
        <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
          <img src="/img/help/faq/manual/20.webp" alt="Jugar Ahora" className="object-contain" />
        </div>

        {/* PASO 4: Bienvenida a los juegos */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 wonder">4. Bienvenida a la Sección de Juegos</h3>
        <p className="text-lg mb-4 wonder">
          Una vez que hagas clic en "Jugar Ahora", serás dirigido a la sección de juegos, donde aparecerán varias tarjetas con juegos disponibles. Aquí podrás elegir el juego que prefieras.
        </p>
        {/* Captura de bienvenida a la sección de juegos */}
        <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
          <img src="/img/help/faq/manual/21.webp" alt="Sección de Juegos" className="object-contain" />
        </div>

        {/* PASO 5: Instrucciones del juego */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 wonder">5. Instrucciones del Juego</h3>
        <p className="text-lg mb-4 wonder">
          Cuando selecciones un juego, se mostrarán las instrucciones de cómo jugar. Deberás leerlas y luego hacer clic en <b>"Comenzar"</b> para iniciar el juego.
        </p>
        {/* Captura de instrucciones del juego */}
        <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
          <img src="/img/help/faq/manual/22.webp" alt="Instrucciones del Juego" className="object-contain" />
        </div>

        {/* PASO 6: Comenzar el juego */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 wonder">6. Comenzar el Juego</h3>
        <p className="text-lg mb-4 wonder">
          Después de leer las instrucciones, podrás hacer clic en <b>"Comenzar"</b> para iniciar el juego. Una vez que estés listo, haz clic en el botón <b>"Iniciar Juego"</b> para disfrutar del juego.
        </p>
        {/* Captura de la opción de comenzar el juego */}
        <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
          <img src="/img/help/faq/manual/23.webp" alt="Iniciar Juego" className="object-contain" />
        </div>

        {/* PASO 7: Disfrutar del juego */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 wonder">7. Disfrutar del Juego</h3>
        <p className="text-lg mb-4 wonder">
          Al hacer clic en "Iniciar Juego", serás redirigido a la pantalla del juego donde podrás disfrutar de la actividad. ¡Diviértete jugando!
        </p>
        {/* Captura del juego en acción */}
        <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
          <img src="/img/help/faq/manual/24.webp" alt="Juego en Acción" className="object-contain" />
        </div>

      </div>
    </div>
  );
};

export default EstudiantesReceso;
 