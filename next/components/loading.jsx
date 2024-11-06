// Componente reutilizable y responsivo de espera
import PropTypes from 'prop-types';

export default function Loading({ text = "Cargando ..." }) {
  return (
    <div className="flex sm:flex-row flex-col justify-center items-center h-screen yagora">
      <img
        src="/img/personajes/starly/starly.png"
        alt="Starly"
        className="border-purple-300 border-t-4 border-b-4 rounded-full w-20 sm:w-24 h-20 sm:h-24 animate-spin"
      />
      <p className="mt-4 sm:mt-0 sm:ml-4 font-semibold text-2xl text-purple-600 sm:text-4xl">
        {text}
      </p>
    </div>
  );
}

Loading.propTypes = {
  text: PropTypes.string,
};