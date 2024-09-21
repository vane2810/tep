// Estrucutura del contenedor de los botones de cada asignatura
import Link from "next/link"

const Botones = ({ mate, lenguaje, sociales, ingles }) => (
    <section className="mt-10">
        <div className="flex justify-center items-center mb-10">
            <Link href={mate}>
                <img
                    src="/img/personajes/donkey/donkeyboton.png"
                    alt="Matematica"
                    className="hover:shadow-lg mx-4 rounded-full w-40 md:w-48 lg:w-56 xl:w-64 transform transition-transform boton hover:scale-105"
                />
            </Link>

            <Link href={lenguaje}>
                <img
                    src="/img/personajes/principe/principeboton.png"
                    alt="Lenguaje"
                    className="hover:shadow-lg mx-4 rounded-full w-40 md:w-48 lg:w-56 xl:w-64 transform transition-transform boton hover:scale-105"
                />
            </Link>
            <Link href={sociales}>
                <img
                    src="/img/personajes/burbuja/burbujaboton.png"
                    alt="Sociales"
                    className="hover:shadow-lg mx-4 rounded-full w-40 md:w-48 lg:w-56 xl:w-64 transform transition-transform boton hover:scale-105"
                />
            </Link>
            <Link href={ingles}>
                <img
                    src="/img/personajes/griffit/griffitboton.png"
                    alt="Ingles"
                    className="hover:shadow-lg mx-4 rounded-full w-40 md:w-48 lg:w-56 xl:w-64 transform transition-transform boton hover:scale-105"
                />
            </Link>
        </div>
    </section>
);

export default Botones
