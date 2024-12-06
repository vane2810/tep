"use client";
import React from "react";

const ManualUsuario = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-200 to-pink-300">
      <div className="bg-white p-12 rounded-lg shadow-2xl w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 my-8">
        {/* Título del manual */}
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6 wonder">Navegación</h2>

        {/* Descripción inicial del manual */}
        <div className="text-gray-700 wonder mb-8">
          <p className="mb-4 text-lg">
            En este manual, te guiamos paso a paso para que puedas navegar por la plataforma. A continuación te mostramos cómo puedes acceder a las materias, explorar los temas disponibles y comenzar con ellos.
          </p>
        </div>

        {/* BIENVENIDA AL NIVEL SELECCIONADO */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 wonder">1. Bienvenida al Nivel Seleccionado</h3>
        <p className="text-lg mb-4 wonder">
          Después de iniciar sesión y seleccionar tu nivel, serás recibido con una pantalla de bienvenida adaptada a tu rol. A continuación te mostramos cómo se ve la bienvenida para cada nivel.
        </p>
        {/* Captura de bienvenida al nivel */}
        <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
          <img src="/img/help/faq/manual/6.webp" alt="Bienvenida al Nivel" className="object-contain" />
        </div>

        {/* SELECCIÓN DE MATERIA */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 wonder">2. Selección de Materia</h3>
        <p className="text-lg mb-4 wonder">
          Después de la bienvenida, podrás ver las materias disponibles en tu nivel. Aquí te mostramos cómo se ve la sección donde podrás seleccionar tu materia.
        </p>
        {/* Captura de selección de materia */}
        <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
          <img src="/img/help/faq/manual/7.webp" alt="Selección de Materia" className="object-contain" />
        </div>

        {/* BIENVENIDA A LA MATERIA SELECCIONADA */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 wonder">3. Bienvenida a la Materia Seleccionada</h3>
        <p className="text-lg mb-4 wonder">
          Una vez que elijas una materia, accederás a una pantalla de bienvenida específica para esa materia. A continuación te mostramos cómo se verá.
        </p>
        {/* Captura de bienvenida a la materia */}
        <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
          <img src="/img/help/faq/manual/8.webp" alt="Bienvenida a la Materia" className="object-contain" />
        </div>

        {/* BIENVENIDA A LOS TEMAS PRINCIPALES */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 wonder">4. Bienvenida a los Temas Principales</h3>
        <p className="text-lg mb-4 wonder">
          Al ingresar a un tema, serás recibido con una pantalla de bienvenida que te mostrará los subtemas disponibles. Para comenzar, simplemente debes hacer clic en "Comenzar".
        </p>
        {/* Captura de bienvenida a los temas */}
        <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
          <img src="/img/help/faq/manual/9.webp" alt="Bienvenida a los Temas" className="object-contain" />
        </div>

        {/* SELECCIÓN DE SUBTEMAS */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 wonder">5. Selección de Subtemas y Comenzar</h3>
        <p className="text-lg mb-4 wonder">
          Dentro de cada tema, podrás ver los subtemas disponibles. Para acceder a ellos, solo debes hacer clic en el subtema de tu elección y luego en el botón <b>"Comenzar"</b> para empezar a estudiar el subtema seleccionado.
        </p>
        {/* Captura de selección de subtemas */}
        <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
          <img src="/img/help/faq/manual/10.webp" alt="Subtemas y Comenzar" className="object-contain" />
        </div>

        {/* SELECCIÓN DE MODO */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 wonder">6. Selección de Modo de Visualización</h3>
        <p className="text-lg mb-4 wonder">
          Una vez que hayas comenzado, podrás ver el contenido en dos modos: 
          <b>Modo Lista donde estamos</b> y <b>Modo Librito</b>. Puedes elegir entre ellos para una experiencia más adecuada a tu estilo de estudio.
        </p>
        {/* Captura de selección de modo */}
        <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
          <img src="/img/help/faq/manual/11.webp" alt="Modo de Visualización" className="object-contain" />
        </div>


        {/* MODO LIBRITO */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 wonder">7. Modo Librito</h3>
        <p className="text-lg mb-4 wonder">
          Si prefieres un enfoque más interactivo, puedes cambiar a <b>Modo Librito</b>, donde podrás navegar por el contenido como si estuvieras hojeando un libro.
        </p>
        {/* Captura del modo librito */}
        <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
          <img src="/img/help/faq/manual/12.webp" alt="Modo Librito" className="object-contain" />
        </div>

        {/* BOTÓN "VAMOS A JUGAR" */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 wonder">8. Vamos a Jugar</h3>
        <p className="text-lg mb-4 wonder">
          Al final de cada sección, tendrás la opción de hacer clic en el botón <b>"Vamos a Jugar"</b> para comenzar con los juegos educativos.
        </p>
        {/* Captura del botón */}
        <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
          <img src="/img/help/faq/manual/13.webp" alt="Vamos a Jugar" className="object-contain" />
        </div>

        {/* BIENVENIDA A LOS JUEGOS */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 wonder">9. Bienvenida a los Juegos</h3>
        <p className="text-lg mb-4 wonder">
          Después de hacer clic en el botón, serás recibido con una pantalla de bienvenida a los juegos. Aquí podrás ver los juegos disponibles para tu nivel.
        </p>
        {/* Captura de bienvenida a los juegos */}
        <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
          <img src="/img/help/faq/manual/14.webp" alt="Bienvenida a los Juegos" className="object-contain" />
        </div>

        {/* JUGAR UN JUEGO */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 wonder">10. Selección de Juego</h3>
        <p className="text-lg mb-4 wonder">
          Si deseas jugar, simplemente haz clic en el juego de tu preferencia. A continuación, te mostramos cómo hacer clic en "Jugar".
        </p>
        {/* Captura de selección de juego */}
        <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
          <img src="/img/help/faq/manual/15.webp" alt="Seleccionar Juego" className="object-contain" />
        </div>

        {/* INSTRUCCIONES DEL JUEGO */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 wonder">11. Instrucciones del Juego</h3>
        <p className="text-lg mb-4 wonder">
          Al seleccionar un juego, verás las instrucciones sobre cómo jugar. Lee las instrucciones y estarás listo para comenzar.
        </p>
        {/* Captura de instrucciones del juego */}
        <div className="w-auto h-auto max-w-full max-h-full mx-auto mb-6">
          <img src="/img/help/faq/manual/16.webp" alt="Instrucciones del Juego" className="object-contain" />
        </div>

      </div>
    </div>
  );
};

export default ManualUsuario;
