// Página principal para el NIVEL 2
import NivelTemplate from "@/components/templates/levels/nivelStructure";

export default function Nivel2() {
  return (
    <NivelTemplate
      fondoImg="/img/fondos/cueva_marte.webp"
      fullText="  ¡Hola, pequeños genios! Bienvenidos al Nivel 2. ¡Vamos a aprender y a jugar!"
      images={[
        "/img/personajes/niveles/bienvenida/munditok1.webp",
        "/img/personajes/niveles/bienvenida/munditok2.webp",
        "/img/personajes/niveles/bienvenida/munditok3.webp",
      ]}
      planetImg="/img/personajes/niveles/marten2.webp"
      planetName="KAORI"
      planetNumber="II"
      buttonLinks={{
        mate: "/niveles/nivel2/mate",
        lenguaje: "/niveles/nivel2/lenguaje",
        sociales: "/niveles/nivel2/sociales",
        ingles: "/niveles/nivel2/ingles",
        juegointro:"/games/lvl2",
      }}
    />
  );
}