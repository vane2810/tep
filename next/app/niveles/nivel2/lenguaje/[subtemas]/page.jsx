// Página principal de subtemas nivel2 - mate
"use client";
import React from "react";
import { useParams } from "next/navigation";
import SubtemaHeader from "@/components/templates/subtopics/lenguajeHeader";
import SubtemaCard from "@/components/templates/subtopics/subtemasCards1";
import { SeparadorMorado} from "@/components/separador";

const SubtemasPage = () => {
  const { subtemas } = useParams();

  // Datos específicos para cada subtema, incluyendo el campo volverUrl
  const subtemasData = {
    ortografia: {
      titulo: "Ortografía",
      descripcion: "¡Explora el fascinante mundo de la ortografía! Aquí podrás fortalecer tus conocimientos en escritura correcta y precisión ortográfica",
      imagen: "/img/materias/lenguaje/ortografian.webp",
      buttonColor: "morado",
      temas: [
        {
          id: "1",
          title: "Sumas Básicas",
          description: "Aprende sobre sumas simples con números decimales.",
          link: "/niveles/nivel2/lenguaje/ob/sumas",
          buttonLabel: "Comenzar Suma",
          imgSrc: "/img/niveles/lenguaje/N1.png",
        },
        {
          id: "2",
          title: "Restas Básicas",
          description: "Conceptos básicos de resta con decimales.",
          link: "/niveles/nivel2/lenguaje/ob/restas",
          buttonLabel: "Comenzar Resta",
          imgSrc: "/img/niveles/lenguaje/N2.png",
        },
      ],
    },
    gramatica: {
      titulo: "Gramática",
      descripcion: "¡Aventúrate en el intrigante universo de la gramática! Explora las reglas y estructuras de nuestra lengua para mejorar tu comprensión y expresión escrita",
      imagen: "/img/materias/lenguaje/gramatican.webp",
      volverUrl: "/niveles/nivel2/lenguaje",
      buttonColor: "morado",
    },
    generos_literarios: {
      titulo: "Géneros Literarios",
      descripcion: "Sumérgete en la diversidad de los géneros literarios y descubre el encanto de las distintas formas narrativas. Desde cuentos hasta poesía, explora cada género y aprende sus características únicas mientras te diviertes con actividades interactivas",
      imagen: "/img/materias/lenguaje/generosn.webp",
      buttonColor: "morado",
    },
    lectura: {
      titulo: "Lectura",
      descripcion: "Sumérgete en el maravilloso mundo de la lectura. Mejora tu comprensión lectora y disfruta de textos especialmente seleccionados para enriquecer tu vocabulario y comprensión",
      imagen: "/img/materias/lenguaje/lecturan.webp",
      buttonColor: "morado",
    },
  };

  const subtemaData = subtemasData[subtemas];

  if (!subtemaData) {
    return <p>Este subtema no existe.</p>;
  }


  return (
    // Página principal de subtemas nivel2 - mate
    <main className="bg-gray-50">
      <SeparadorMorado />
      {/* Encabezado del subtema */}
      <SubtemaHeader
        titulo={subtemaData.titulo}
        descripcion={subtemaData.descripcion}
        imagen={subtemaData.imagen}
        volverUrl="/niveles/nivel2/lenguaje"
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

      <SeparadorMorado />
    </main>
  );
};

export default SubtemasPage;