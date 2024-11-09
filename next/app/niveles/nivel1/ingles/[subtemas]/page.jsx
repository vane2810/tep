// Página principal de subtemas nivel1 - lenguaje
"use client";
import React from "react";
import { useParams } from "next/navigation";
import SubtemaHeader from "@/components/templates/subtopics/lenguajeHeader";
import SubtemaCard from "@/components/templates/subtopics/subtemasCards";
import { SeparadorAzul, SeparadorMorado } from "@/components/separador";
import TextHeader from "@/components/templates/subtopics/textHeader";

const SubtemasPage = () => {
  const { subtemas } = useParams();

  // Datos específicos para cada subtema, incluyendo el campo volverUrl
  const subtemasData = {
    ortografia: {
      titulo: "ORTOGRAFÍA | NIVEL I",
      descripcion: "¡Explora el fascinante mundo de la ortografía! Aquí podrás fortalecer tus conocimientos en escritura correcta y precisión ortográfica",
      imagen: "/img/materias/lenguaje/ortografian.png",
      volverUrl: "/niveles/nivel1/lenguaje",
      buttonColor: "morado",
      temas: [
        {
          id:"1",
          title: "Sumas Básicas",
          description: "Aprende sobre sumas simples con números decimales.",
          link: "/niveles/nivel1/lenguaje/ob/sumas",
          buttonLabel: "Comenzar Suma",
          imgSrc: "/img/niveles/lenguaje/N1.png",
        },
        {
          id:"2",
          title: "Restas Básicas",
          description: "Conceptos básicos de resta con decimales.",
          link: "/niveles/nivel1/lenguaje/ob/restas",
          buttonLabel: "Comenzar Resta",
          imgSrc: "/img/niveles/lenguaje/N2.png",
        },
      ],
    },
    gramatica: {
      titulo: "GRAMÁTICA | NIVEL I",
      descripcion: "¡Aventúrate en el intrigante universo de la gramática! Explora las reglas y estructuras de nuestra lengua para mejorar tu comprensión y expresión escrita",
      imagen: "/img/materias/lenguaje/gramatican.png",
      volverUrl: "/niveles/nivel1/lenguaje",
      buttonColor: "morado",
    },
    generos_literarios: {
      titulo: "GÉNEROS LITERARIOS | NIVEL I",
      descripcion: "Sumérgete en la diversidad de los géneros literarios y descubre el encanto de las distintas formas narrativas. Desde cuentos hasta poesía, explora cada género y aprende sus características únicas mientras te diviertes con actividades interactivas",
      imagen: "/img/materias/lenguaje/generosn.png",
      volverUrl: "/niveles/nivel1/lenguaje",
      buttonColor: "morado",
    },
    lectura: {
      titulo: "LECTURA | NIVEL I",
      descripcion: "Sumérgete en el maravilloso mundo de la lectura. Mejora tu comprensión lectora y disfruta de textos especialmente seleccionados para enriquecer tu vocabulario y comprensión",
      imagen: "/img/materias/lenguaje/lecturan.jpg",
      volverUrl: "/niveles/nivel1/lenguaje",
      buttonColor: "morado",
    },
  };

  const subtemaData = subtemasData[subtemas];

  if (!subtemaData) {
    return <p>Este subtema no existe.</p>;
  }

  return (
    // Página principal de subtemas nivel1 - lenguaje
    <main>
      <SeparadorMorado />
      {/* Encabezado del subtema */}
      <SubtemaHeader
        titulo={subtemaData.titulo}
        descripcion={subtemaData.descripcion}
        imagen={subtemaData.imagen}
        volverUrl={subtemaData.volverUrl}
      />
      <div className="bg-white shadow-lg mx-auto my-8 p-8 rounded-lg max-w-7xl">
        {/* Título de la sección de tarjetas con imagen en el lado derecho */}
        <TextHeader
          titulo="Elige un tema"
          descripcion="Selecciona uno de los siguientes temas para comenzar"
          imagenSrc="/img/personajes/starly/starly_lenguaje.png"
        />

        {/* Contenedor de tarjetas en el mismo div levantado */}
        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {subtemaData.temas?.map((tema) => (
            <SubtemaCard
              key={tema.id} 
              title={tema.title}
              description={tema.description}
              link={tema.link}
              buttonLabel={tema.buttonLabel}
              imgSrc={tema.imgSrc}
              buttonColor={subtemaData.buttonColor}
            />
          ))}
        </div>
      </div>
      <SeparadorAzul />
    </main>
  );
};

export default SubtemasPage;