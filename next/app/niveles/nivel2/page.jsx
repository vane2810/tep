// Página principal para el NIVEL 2
import NivelTemplate from "@/components/templates/levels/nivelStructure";

export default function Nivel2() {
  return (
    <NivelTemplate
      fondoImg=""
      fullText="  ¡Hola, pequeños genios! Bienvenidos al Nivel 2. ¡Vamos a aprender y a jugar!"
      images={[
        "/img/personajes/niveles/bienvenida/mundito2.png",
        "/img/personajes/niveles/bienvenida/mundito2.png",
        "/img/personajes/niveles/bienvenida/mundito3.png",
      ]}
      planetImg="/img/personajes/niveles/marten2.png"
      planetName="CELESTIA"
      planetNumber="I"
      buttonLinks={{
        mate: "/materias/1",
        lenguaje: "/niveles/nivel2/lenguaje",
        sociales: "/niveles/nivel2/sociales",
        ingles: "/niveles/nivel2/ingles",
      }}
    />
  );
}