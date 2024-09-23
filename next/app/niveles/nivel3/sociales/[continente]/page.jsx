// Componete del servidor para los contenidos | No modificar

import Component from './component';  

export default function ContienentePage({ params }) {
  const { continente } = params;

  if (!continente) {
    return <div>Error: Parámetro del país no proporcionado.</div>;
  }

  return <Component id={continente} />;
}
