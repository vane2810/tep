// components/GusanoSeccion.js
import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

export default function MateMap({ mostrarCabeza, cabezaSrc, segmentos }) {
  return (
    <section>
      <div className="flex justify-center mt-10 overflow-x-auto">
        {/* Cabeza del gusano, opcional */}
        {mostrarCabeza && (
          <div className="flex items-center mt-[-30px] md:mt-[-50px] lg:mt-[-80px]">
            <img
              src={cabezaSrc}
              alt="Cabeza del gusano"
              className="worm-segment mt-4 md:mr-2.5 w-40 lg:w-60 h-auto animate-gusano"
            />
          </div>
        )}

        {/* Segmentos del gusano */}
        {segmentos.map((segmento) => (
          <Link href={`/niveles/nivel1/mate/${segmento.id}`} key={segmento.id}>
            <img
              src={segmento.imgSrc}
              alt={segmento.alt}
              className={`flex-auto worm-segment ${segmento.marginTop || "mt-8"} mb-4 w-40 lg:w-60 h-auto animate-gusano`}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

// Definición de PropTypes para validación de props
MateMap.propTypes = {
  mostrarCabeza: PropTypes.bool,
  cabezaSrc: PropTypes.string,
  segmentos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      marginTop: PropTypes.string,
    })
  ).isRequired,
};

// Valores predeterminados para props opcionales
MateMap.defaultProps = {
  mostrarCabeza: false,
  cabezaSrc: "",
};