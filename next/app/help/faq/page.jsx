"use client";
import React, { useState } from "react";
import Volver from "@/components/elements/botonVolver";
import DataMessage from "@/components/menssages/mensajeDatos"

// Aquí importamos el ícono de lupa
import { FiSearch } from "react-icons/fi";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda

  // Función que maneja el clic en la pregunta
  const handleQuestionClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase()); // Actualizar el valor de búsqueda
  };

  const questions = [
    {
      question: "¿Qué tipo de juegos ofrece la app?",
      answer:
        "La app ofrece juegos educativos interactivos diseñados para ayudar a los estudiantes a aprender de manera divertida y eficaz.",
    },
    {
      question: "¿Es necesario crear una cuenta para jugar?",
      answer:
        "No es necesario crear una cuenta para jugar los juegos introductorios, pero para acceder a juegos adicionales y guardar tu progreso, deberás registrarte.",
    },
    {
      question: "¿Cómo puedo ingresar si he olvidado mi contraseña?",
      answer:
        "Puedes recuperar tu contraseña desde la página de inicio de sesión. Solo necesitas proporcionar tu correo electrónico y seguir las instrucciones.",
    },
    {
      question: "¿La app es gratuita?",
      answer:
        "Sí, la app es gratuita. Al crear una cuenta, puedes tener acceso a todos los contenidos.",
    },
    {
      question: "¿Qué debo hacer una vez me haya registrado?",
      answer:
        "Una vez registrado, puedes empezar a explorar los juegos y ver tu progreso. Asegúrate de completar tu perfil para personalizar tu experiencia.",
    },
    {
      question: "¿Qué tipo de funciones relevantes tiene la app?",
      answer:
        "La app tiene juegos educativos, seguimiento del progreso, configuraciones personalizadas, y una sección de feedback para mejorar la experiencia.",
    },
    {
      question: "¿Cómo puedo reportar un problema o bug en la app?",
      answer:
        "Puedes reportar cualquier problema o bug directamente a través del formulario de contacto en la sección 'Soporte'.",
    },
    {
      question: "¿La app tiene controles parentales?",
      answer:
        "Sí, la app incluye controles parentales para que los padres puedan gestionar el tiempo de uso y los juegos disponibles.",
    },
    {
      question: "¿Puedo usar la app en diferentes dispositivos?",
      answer:
        "Sí, la app es compatible con múltiples dispositivos, permitiendo que puedas continuar jugando en cualquier lugar.",
    },
    {
      question: "¿Dónde puedo encontrar más información sobre la app?",
      answer:
        "Puedes encontrar más información sobre la app en la sección 'Acerca de' dentro del menú principal de la app, o en nuestra página web oficial.",
    },
  ];

  // Filtrar las preguntas según el valor de búsqueda
  const filteredQuestions = questions.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-b from-yellow-100 via-pink-200 to-purple-300 px-4 py-8 min-h-screen">
      <div className="flex justify-start items-center mb-6 w-full">
        {/* Ícono de Volver */}
        <Volver img="/img/home/regresar/morado.webp" className="mr-4" />
      </div>
      {/* Título */}
      <h1 className="font-bold text-5xl text-blue-700 text-center super">PREGUNTAS FRECUENTES</h1>


      {/* Imagen decorativa con animación de tambaleo */}
      <img
        src="/img/help/faq/decoracionpf.webp"
        alt="Decoración"
        className="my-6 w-40 h-40 animate-tambaleo"
      />

      {/* Barra de búsqueda */}
      <div className="flex items-center mb-6 w-64">
        <FiSearch className="mr-2 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar pregunta..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border-2 border-gray-300 p-2 rounded-lg w-full"
        />
      </div>

      <div className="w-full max-w-4xl yagora">
        {filteredQuestions.length === 0 ? (
          <DataMessage />
        ) : (
          filteredQuestions.map((faq, index) => (
            <div
              key={index}
              className="border-2 border-purple-700 bg-white shadow-lg hover:shadow-xl mb-6 p-6 rounded-lg transform transition-transform hover:-translate-y-1 cursor-pointer"
              onClick={() => handleQuestionClick(index)}
            >
              <div className="font-semibold text-blue-700 text-xl">{faq.question}</div>
              <div
                className={`mt-4 text-gray-600 ${activeIndex === index ? "block" : "hidden"}`}
              >
                {faq.answer}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FAQ;
