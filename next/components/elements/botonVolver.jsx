// Botón reutilizable de volver a la página anterior 
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

function Volver({ href, title = "Volver", img = "/img/home/regresar/azul.webp" }) { 
  return (
    <div className="inline-block mt-6 ml-4 md:ml-6 lg:ml-10 transform transition-transform hover:translate-y-1 active:translate-y-2">
      <Link href={href}>
        <img 
          src={img} 
          alt={title} 
          title={title} 
          className="w-10 md:w-12 lg:w-14 h-auto" 
        />
      </Link>
    </div>
  );
}

Volver.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string,
  img: PropTypes.string,
};

export default Volver;