// Componente del servidor para los contenidos
import SocialesComponent from './component';

export default function ContinentePage({ params }) {
  const { id } = params; // Asegúrate de que 'continenteId' es el nombre del parámetro dinámico en tu archivo de ruta

  if (!id) {
    return <div>Error: Parámetro del continente no proporcionado.</div>;
  }

  return <SocialesComponent id={id} />;
}
