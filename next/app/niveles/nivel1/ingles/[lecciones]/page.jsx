// Componente del servidor para los contenidos
import InglesComponent from './component';

export default function ContinentePage({ params }) {
  const { lecciones } = params; 

  if (!lecciones) {
    return <div>Error: Parámetro del continente no proporcionado.</div>;
  }

  return <InglesComponent id={lecciones} />;
}
