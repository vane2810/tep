// Mapa de inglés para los 3 niveles
import Link from 'next/link';

const MapIngles = ({ subject, basePath, levels, decorativos, caricatura, fondoUrl }) => (
  <section
    className={`relative flex justify-center items-center mx-auto px-8 rounded-lg w-full h-[100vh] ${fondoUrl ? 'bg-cover bg-center' : ''}`}
    style={fondoUrl ? { backgroundImage: `url(${fondoUrl})` } : {}}
  >
    {/* Astronauta al inicio */}
    <div className="bottom-[5%] left-[5%] absolute">
      <img src={caricatura} alt="Caricatura" className="w-[8vw] h-auto" />
    </div>

    {/* Imágenes de niveles con sombra ajustada a la forma de la imagen */}
    <div className="flex justify-center items-center space-x-12 mt-8">
      {levels.map((level) => (
        <Link key={level.id} href={`/${basePath}${subject}/${level.id}`}>
          <img
            src={level.img}
            alt={level.name}
            className="hover:shadow-lg rounded-lg w-[30vw] h-[30vw] transform transition-transform cursor-pointer hover:scale-110"
            title={`Ir a ${level.name}`}
          />
        </Link>
      ))}
    </div>

    {/* Elementos decorativos dinámicos */}
    {decorativos.map((item, index) => (
      <img key={index} src={item.img} alt={item.alt} className={`${item.className} absolute`} style={item.style} />
    ))}
  </section>
);

export default MapIngles;
