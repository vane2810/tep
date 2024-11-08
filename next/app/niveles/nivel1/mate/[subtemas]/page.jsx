// app/niveles/nivel1/mate/[subtemas]/page.jsx
"use client";
import React from "react";
import { useParams } from "next/navigation";
import SubtemaHeader from "@/components/templates/subtopics/subtemasHeader";
import SubtemaCard from "@/components/templates/subtopics/subtemasCards";

const SubtemasPage = () => {
  const { subtemas } = useParams();

  // Datos específicos para cada subtema, incluyendo el campo volverUrl
  const subtemasData = {
    ob: {
      titulo: "OPERACIONES BÁSICAS",
      descripcion: "¡Explora el fascinante mundo de las operaciones básicas! Elige tu tema y sumérgete en números y diversión.",
      imagen: "/img/niveles/mate/figuritamate1.png",
      volverUrl: "/niveles/nivel1/mate",
      temas: [
        {
          title: "Sumas Básicas",
          description: "Aprende sobre sumas simples con números decimales.",
          link: "/niveles/nivel1/mate/ob/sumas",
          buttonLabel: "Comenzar Suma",
          imgSrc: "/img/niveles/mate/N1.png",
          buttonColor: "bg-pink-500",
        },
        {
          title: "Restas Básicas",
          description: "Conceptos básicos de resta con decimales.",
          link: "/niveles/nivel1/mate/ob/restas",
          buttonLabel: "Comenzar Resta",
          imgSrc: "/img/niveles/mate/N2.png",
          buttonColor: "bg-green-500",
        },
      ],
    },
    decimale: {
      titulo: "Números Decimales",
      descripcion: "Descripción del apartado de números decimales.",
      imagen: "/img/niveles/mate/nivel1/NDYF.png",
      volverUrl: "/niveles/nivel1/mate",
      temas: [
        {
          title: "Introducción a Decimales",
          description: "Conoce cómo funcionan los números decimales.",
          link: "/niveles/nivel1/mate/decimales/intro",
          buttonLabel: "Explorar Decimales",
          imgSrc: "/img/niveles/mate/N1.png",
          buttonColor: "bg-blue-500",
        },
      ],
    },
    geometria: {
      titulo: "Geometría",
      descripcion: "Descripción del apartado de geometría.",
      imagen: "/img/niveles/mate/nivel1/geo.png",
      volverUrl: "/niveles/nivel1/mate",
      temas: [
        {
          title: "Figuras Básicas",
          description: "Aprende sobre figuras geométricas simples.",
          link: "/niveles/nivel1/mate/geometria/figuras",
          buttonLabel: "Ver Figuras",
          imgSrc: "/img/niveles/mate/N3.png",
          buttonColor: "bg-orange-500",
        },
      ],
    },
    multimedia: {
      titulo: "Resolución de Problemas",
      descripcion: "Descripción del apartado de resolución de problemas.",
      imagen: "/img/niveles/mate/nivel1/refuerzof.png",
      volverUrl: "/niveles/nivel1/mate",
      temas: [
        {
          title: "Problemas de Decimales",
          description: "Resuelve problemas aplicando conocimientos de decimales.",
          link: "/niveles/nivel1/mate/multimedia/decimales",
          buttonLabel: "Resolver Problemas",
          imgSrc: "/img/niveles/mate/N4.png",
          buttonColor: "bg-red-500",
        },
      ],
    },
  };

  const subtemaData = subtemasData[subtemas];

  if (!subtemaData) {
    return <p>Este subtema no existe.</p>;
  }

  return (
    <main>
      {/* Encabezado del subtema */}
      <SubtemaHeader
        titulo={subtemaData.titulo}
        descripcion={subtemaData.descripcion}
        imagen={subtemaData.imagen}
        volverUrl={subtemaData.volverUrl}
      />

      {/* Tarjetas de los temas */}
      <div>
        <h1>Elije tu tema</h1>
        {subtemaData.temas.map((tema, index) => (
          <SubtemaCard
            key={index}
            title={tema.title}
            description={tema.description}
            link={tema.link}
            buttonLabel={tema.buttonLabel}
            imgSrc={tema.imgSrc}
            buttonColor={tema.buttonColor}
          />
        ))}
      </div>
    </main>
  );
};

export default SubtemasPage;