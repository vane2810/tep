// Componente de bienvenida del personaje, reutilizable para todos los niveles y asignaturas
import Volver from '@/components/botonVolver';
import '@/styles/animacion.css';

const WelcomeSection = ({ volverUrl, personajeImg, personajeAlt, titulo, mensajeBienvenida }) => (
  <section className="mb-2 p-5 rounded-lg w-full">
    {/* Volver */}
    <Volver href={volverUrl} />
    <div className="flex md:flex-row flex-col justify-center items-center mb-5">
      <div className="flex flex-col items-center md:mr-8 mb-4 md:mb-0 md:ml-2.5">
        <img src={personajeImg} alt={personajeAlt} className="mx-2 w-auto h-64 planet-animation" />
      </div>
      <p className="md:ml-8 text-4xl text-center md:text-6xl super">{titulo}</p>
      
    </div>
    <p className="text-3xl text-center story">{mensajeBienvenida}</p>
  </section>
);

export default WelcomeSection;
