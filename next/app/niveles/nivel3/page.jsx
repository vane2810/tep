// Página principal para el NIVEL 3
import NivelTemplate from "@/components/templates/niveles/nivelStructure";

export default function Nivel3() {
  return (
    <NivelTemplate
      fullText="  ¡Hola, pequeños genios! Bienvenidos al Nivel 3. ¡Vamos a aprender y a jugar!"
      images={[
        "/img/personajes/niveles/bienvenida/munditoc1.png",
        "/img/personajes/niveles/bienvenida/munditoc2.png",
        "/img/personajes/niveles/bienvenida/munditoc3.png",
      ]}
      planetName="COSMO"
      planetNumber="III"
      gameIntroLink="/games/lvl3/intro"
      buttonLinks={{
        mate: "/niveles/nivel3/mate",
        lenguaje: "/niveles/nivel3/lenguaje",
        sociales: "/niveles/nivel3/sociales",
        ingles: "/niveles/nivel3/ingles",
      }}
      separadorColor="rojo" 
    />
  );
}
