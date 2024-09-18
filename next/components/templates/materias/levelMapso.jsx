// Componente reutilizable del mapa para todas las asignaturas y niveles
import Link from 'next/link';

const LevelMapso = ({ subject, basePath, levels, fondoUrl, decorativos }) => (
    <section className="relative flex justify-center items-center bg-cover bg-center mx-auto px-8 rounded-lg w-full h-[100vh]" style={{ backgroundImage: `url(${fondoUrl})` }}>
        {/* Astronauta al inicio */}
        <div className="bottom-[5%] left-[5%] absolute">
            <img src="/img/niveles/sociales/pirata.png" alt="Pirata" className="w-[6vw] h-auto" />
        </div>

        {/* Muestra cada nivel */}
        {levels.map((level) => (
            <div key={level.id} className="absolute" style={{ top: level.position.top, left: level.position.left }}>
                <Link href={`/${basePath}${subject}/${level.id}`}>
                    <img src="/img/niveles/sociales/cofre.png" alt={`Nivel ${level.id}`} className="w-[4vw] h-[4vw] cursor-pointer" />
                </Link>

                <span className="mt-2 text-[2vw] text-black">{level.id}</span>
            </div>
        ))}

        {/* Elementos decorativos dinámicos */}
        {decorativos.map((item, index) => (
            <img key={index} src={item.img} alt={item.alt} className={`${item.className} absolute`} style={item.style} />
        ))}
    </section>
);

export default LevelMapso;

