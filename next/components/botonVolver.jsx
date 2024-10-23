// Botón reutilizable de volver a la página anterior 
import React from 'react';
import Link from 'next/link';

function Volver({ href, title = "Volver", imgSrc = "/img/home/regresar.png" }) {
  return (
    <div className="mt-6 ml-10 inline-block">
      <Link href={href}>
        <img src={imgSrc} alt={title} className="w-10 h-auto" title={title} />
      </Link>
    </div>
  );
}
export default Volver;