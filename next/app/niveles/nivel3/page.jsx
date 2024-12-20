// Página principal para el NIVEL 3
import NivelTemplate from "@/components/templates/levels/nivelStructure";

export default function Nivel3() {
  return (
    <NivelTemplate
      fondoImg="/img/fondos/montana.webp"
      fullText="  ¡Hola, pequeños genios! Bienvenidos al Nivel 3. ¡Vamos a aprender y a jugar!"
      images={[
        "/img/personajes/niveles/bienvenida/munditoc3.webp",
        "/img/personajes/niveles/bienvenida/munditoc3.webp",
        "/img/personajes/niveles/bienvenida/munditoc3.webp",
      ]}
      planetImg="/img/personajes/niveles/jupitern3.webp"
      planetName="COSMO"
      planetNumber="III"
      buttonLinks={{
        mate: "/niveles/nivel3/mate",
        lenguaje: "/niveles/nivel3/lenguaje",
        sociales: "/niveles/nivel3/sociales",
        ingles: "/niveles/nivel3/ingles",
        juegointro:"/games/lvl3",
      }}
    />
  );
}