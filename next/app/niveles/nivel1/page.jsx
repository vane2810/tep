// Página principal para el NIVEL 1
import NivelTemplate from "@/components/templates/levels/nivelStructure";

export default function Nivel1() {
  return (
    <NivelTemplate
      fondoImg="/img/fondos/fondo2.webp"
      fullText="  ¡Hola, pequeños genios! Bienvenidos al Nivel 1. ¡Vamos a aprender y a jugar!"
      images={[
        "/img/personajes/niveles/bienvenida/mundito1.png",
        "/img/personajes/niveles/bienvenida/mundito2.png",
        "/img/personajes/niveles/bienvenida/mundito3.png",
      ]}
      planetImg="/img/personajes/niveles/tierran1.png"
      planetName="CELESTIA"
      planetNumber="I"
      buttonLinks={{
        mate: "/niveles/nivel1/mate",
        lenguaje: "/niveles/nivel1/lenguaje",
        sociales: "/niveles/nivel1/sociales",
        ingles: "/niveles/nivel1/ingles",
        juegointro:"/games/lvl1",
      }}
    />
  );
}