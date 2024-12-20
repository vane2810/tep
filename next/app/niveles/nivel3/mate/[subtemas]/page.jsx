// Página principal de subtemas nivel3 - mate
"use client";
import React from "react";
import { useParams } from "next/navigation";
import SubtemaHeader from "@/components/templates/subtopics/mateHeader";
import SubtemaCard from "@/components/templates/subtopics/subtemasCards1";
import { SeparadorVerde } from "@/components/separador";

const SubtemasPage = () => {
  const { subtemas } = useParams();

  // Datos específicos para cada subtema, incluyendo el campo volverUrl
  const subtemasData = {
    ob: {
      titulo: "Operaciones Básicas",
      descripcion: "¡Explora el fascinante mundo de las operaciones básicas! Elige tu tema y sumérgete en números y diversión.",
      imagen: "/img/materias/mate/obn.webp",
      buttonColor: "morado",
      temas: [
        {
          id:"1",
          title: "Sumas Básicas",
          description: "Aprende sobre sumas simples con números decimales.",
          link: "/niveles/nivel3/mate/ob/sumas",
          buttonLabel: "Comenzar Suma",
          imgSrc: "/img/niveles/mate/N1.png",
        },
        {
          id:"2",
          title: "Restas Básicas",
          description: "Conceptos básicos de resta con decimales.",
          link: "/niveles/nivel3/mate/ob/restas",
          buttonLabel: "Comenzar Resta",
          imgSrc: "/img/niveles/mate/N2.png",
        },
      ],
    },
    decimale: {
      titulo: "Número Decimales",
      descripcion: "¡Aventúrate en el intrigante universo de los decimales y las fracciones! Selecciona tu tema y déjate llevar por el encanto de los números y el aprendizaje divertido.",
      imagen: "/img/materias/mate/decimalesn.webp",
      buttonColor: "morado",
    },
    geometri: {
      titulo: "Geometría",
      descripcion: "Sumérgete en la increíble aventura de la geometría! Elige tu tema favorito y déjate sorprender por la magia de las formas, los ángulos y las figuras.",
      imagen: "/img/materias/mate/geon.webp",
      buttonColor: "morado",
    },
  };

  const subtemaData = subtemasData[subtemas];

  if (!subtemaData) {
    return <p>Este subtema no existe.</p>;
  }

  return (
    // Página principal de subtemas nivel3 - mate
    <main className="relative bg-gray-50">
      <SeparadorVerde />
      {/* Encabezado del subtema */}
      <SubtemaHeader
        titulo={subtemaData.titulo}
        descripcion={subtemaData.descripcion}
        imagen={subtemaData.imagen}
        volverUrl="/niveles/nivel3/mate"
          
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
      <SeparadorVerde />
    </main>
  );
};

export default SubtemasPage;