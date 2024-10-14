// Página de inicio del NIVEL 2
import NivelTemplate from "@/components/templates/niveles/nivelStructure";

export default function Nivel2() {
  return (
    <NivelTemplate
      fullText="  ¡Hola, pequeños genios! Bienvenidos al Nivel 2. ¡Vamos a aprender y a jugar!"
      images={[
        "/img/personajes/niveles/bienvenida/munditok1.png",
        "/img/personajes/niveles/bienvenida/munditok2.png",
        "/img/personajes/niveles/bienvenida/munditok3.png",
      ]}
      planetName="KAORI"
      planetNumber="II"
      gameIntroLink="/games/lvl2/intro"
      buttonLinks={{
        mate: "/niveles/nivel2/mate",
        lenguaje: "/niveles/nivel2/lenguaje",
        sociales: "/niveles/nivel2/sociales",
        ingles: "/niveles/nivel2/ingles",
      }}
      separadorColor="azul" // Pasamos el color del separador
    />
  );
}
