// Componete del servidor para los contenidos | No modificar

import ClientBookComponent from './Component';  

// Componente del Servidor (Server Component)
export default function NivelPage({ params }) {
  const { id } = params;  

  // Renderiza el componente cliente y le pasa el 'id'
  return <ClientBookComponent id={id} />;
}
