"use client";
import React, { useState } from "react";
import "@/styles/animacion.css"; // Asegúrate de tener la animación incluida

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-100 via-pink-200 to-purple-300 px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-6 super">PREGUNTAS FRECUENTES</h1>

      {/* Imagen decorativa con animación de tambaleo */}
      <img
        src="/img/help/faq/decoracionpf.webp"
        alt="Decoración"
        className="w-40 h-40 mb-6 animate-tambaleo"
      />

      {/* Barra de búsqueda */}
      <div className="flex items-center w-64 mb-6">
        <FiSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Buscar pregunta..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 w-full rounded-lg border-2 border-gray-300"
        />
      </div>

      <div className="w-full max-w-4xl">
        {filteredQuestions.length === 0 ? (
          <div className="text-center text-gray-500">No se encontraron preguntas.</div>
        ) : (
          filteredQuestions.map((faq, index) => (
            <div
              key={index}
              className="mb-6 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 cursor-pointer border-2 border-purple-700"
              onClick={() => handleQuestionClick(index)}
            >
              <div className="text-xl font-semibold text-blue-700">{faq.question}</div>
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
