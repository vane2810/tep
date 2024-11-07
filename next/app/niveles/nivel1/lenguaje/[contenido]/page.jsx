// Componente del servidor genérico para renderizar contenidos
import React from 'react';
import PropTypes from 'prop-types';
import Component from './component';

export default function ServerPage({ params, ComponentToRender = Component }) {
  const { contenido } = params;

  if (!contenido) {
    return <div>Error: Parámetro de contenido no proporcionado.</div>;
  }

  // Renderiza el componente cliente y le pasa el `id` o `contenido`
  return <ComponentToRender id={contenido} />;
}

ServerPage.propTypes = {
  params: PropTypes.shape({
    contenido: PropTypes.string.isRequired,
  }).isRequired,
  ComponentToRender: PropTypes.elementType, 
};
