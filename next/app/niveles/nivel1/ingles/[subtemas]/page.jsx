// Página principal de subtemas nivel1 - mate
"use client";
import React from "react";
import { useParams } from "next/navigation";
import SubtemaHeader from "@/components/templates/subtopics/inglesHeader";
import SubtemaCard from "@/components/templates/subtopics/subtemasCards";
import { SeparadorAnaranjado} from "@/components/separador";

const SubtemasPage = () => {
  const { subtemas } = useParams();

  // Datos específicos para cada subtema, incluyendo el campo volverUrl
  const subtemasData = {
    vocabulary: {
      titulo: "Vocabulary",
      subtitulo: "Vocabulario",
      descripcion: "¡Explora el fascinante mundo de la ortografía! Aquí podrás fortalecer tus conocimientos en escritura correcta y precisión ortográfica",
      imagen: "/img/materias/lenguaje/ortografian.png",
      buttonColor: "morado",
      temas: [
        {
          id: "1",
          title: "Sumas Básicas",
          description: "Aprende sobre sumas simples con números decimales.",
          link: "/niveles/nivel1/lenguaje/ob/sumas",
          buttonLabel: "Comenzar Suma",
          imgSrc: "/img/niveles/lenguaje/N1.png",
        },
        {
          id: "2",
          title: "Restas Básicas",
          description: "Conceptos básicos de resta con decimales.",
          link: "/niveles/nivel1/lenguaje/ob/restas",
          buttonLabel: "Comenzar Resta",
          imgSrc: "/img/niveles/lenguaje/N2.png",
        },
      ],
    },
    grammar: {
      titulo: "Grammar",
      subtitulo: "Gramática",
      descripcion: "¡Aventúrate en el intrigante universo de la gramática! Explora las reglas y estructuras de nuestra lengua para mejorar tu comprensión y expresión escrita",
      imagen: "/img/materias/lenguaje/gramatican.png",
      buttonColor: "morado",
    },
  };

  const subtemaData = subtemasData[subtemas];

  if (!subtemaData) {
    return <p>Este subtema no existe.</p>;
  }


  return (
    // Página principal de subtemas nivel1 - mate
    <main className="bg-gray-50">
      <SeparadorAnaranjado />
      {/* Encabezado del subtema */}
      <SubtemaHeader
        titulo={subtemaData.titulo}
        subtitulo={subtemaData.subtitulo}
        descripcion={subtemaData.descripcion}
        imagen={subtemaData.imagen}
        volverUrl= "/niveles/nivel1/ingles"
      />

      {/* Contenedor de tarjetas en el mismo div levantado */}
      <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-6 mb-10">
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

      <SeparadorAnaranjado />
    </main>
  );
};

export default SubtemasPage;