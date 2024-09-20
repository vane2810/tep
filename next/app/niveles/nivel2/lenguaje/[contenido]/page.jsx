// Componete del servidor para los contenidos | No modificar

import Component from './component';  

// Componente del Servidor (Server Component)
export default function NivelPage({ params }) {
  const { contenido } = params;

  if (!contenido) {
    return <div>Error: Parámetro de contenido no proporcionado.</div>;
  }

  // Renderiza el componente cliente y le pasa el 'id'
  return <Component  id={contenido} />;
}