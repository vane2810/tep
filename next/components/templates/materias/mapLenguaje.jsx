// Componente reutilizable del mapa para todas las asignaturas y niveles
import Link from 'next/link';

const MapLenguaje = ({ subject, basePath, levels, fondoUrl, decorativos, camino, caricatura }) => (
    <section className="relative flex justify-center items-center bg-cover bg-center mx-auto px-8 rounded-lg w-full h-[100vh]" style={{ backgroundImage: `url(${fondoUrl})` }}>
        {/* Astronauta al inicio */}
        <div className="bottom-[5%] left-[5%] absolute">
            <img src={caricatura} alt="Caricatura" className="w-[6vw] h-auto" />
        </div>

        {/* Muestra cada nivel */}
        {levels.map((level) => (
            <div key={level.id} className="absolute" style={{ top: level.position.top, left: level.position.left }}>
                <Link href={`/${basePath}${subject}/${level.id}`}>
                    <img src={camino} alt={`Nivel ${level.id}`} className="hover:shadow-lg rounded-full w-[4vw] h-[4vw] transform transition-transform cursor-pointer hover:scale-105" />
                </Link>

                <span className="mt-2 font-bold text-[2vw]" style={{ color: level.color || 'inherit' }}>{level.id}</span>
            </div>
        ))}

        {/* Elementos decorativos dinámicos */}
        {decorativos.map((item, index) => (
            <img key={index} src={item.img} alt={item.alt} className={`${item.className} absolute`} style={item.style} />
        ))}
    </section>
);

export default MapLenguaje;
