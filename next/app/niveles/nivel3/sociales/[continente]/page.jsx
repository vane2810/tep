// Componente del servidor para los contenidos
import SocialesComponent from './component';

export default function ContinentePage({ params }) {
  const { continente } = params; // Asegúrate de que 'continenteId' es el nombre del parámetro dinámico en tu archivo de ruta

  if (!continente) {
    return <div>Error: Parámetro del continente no proporcionado.</div>;
  }

  return <SocialesComponent id={continente} />;
}
