// Botón reutilizable de volver a la página anterior 
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

function Volver({ href, title = "Volver", img = "/img/home/regresar/azul.png" }) { 
  return (
    <div className="inline-block mt-6 ml-10">
      <Link href={href}>
        <img src={img} alt={title} className="w-14 h-auto" title={title} />
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
