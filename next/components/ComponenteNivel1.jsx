// Página principal para el NIVEL 1
import NivelTemplate from "@/components/templates/niveles/nivelStructure";

export default function Nivel1() {
  return (
    <NivelTemplate
      fullText="  ¡Hola, pequeños genios! Bienvenidos al Nivel 1. ¡Vamos a aprender y a jugar!"
      images={[
        "/img/personajes/niveles/bienvenida/mundito1.png",
        "/img/personajes/niveles/bienvenida/mundito2.png",
        "/img/personajes/niveles/bienvenida/mundito3.png",
      ]}
      planetName="CELESTIA"
      planetNumber="I"
      gameIntroLink="/games/lvl1/intro"
      buttonLinks={{
        mate: "/niveles/nivel1/mate",
        lenguaje: "/niveles/nivel1/lenguaje",
        sociales: "/niveles/nivel1/sociales",
        ingles: "/niveles/nivel1/ingles",
      }}
      separadorColor="azul" 
    />
  );
}
