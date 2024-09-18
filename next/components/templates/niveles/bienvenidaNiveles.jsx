import Link from "next/link"

const Bienvenida = ({nivel, planeta}) => (

    <section>
    {/* Volver */}
    {!session && (
        <Volver href="/" title="Volver a la página de inicio" />
    )}
    <div className="flex md:flex-row flex-col justify-center items-center p-4 w-full">
        {/* Celestia */}
        <div className="flex justify-center items-center p-4 w-full md:w-3/4">
            <div className="flex items-center">
                <img
                    src="/img/personajes/niveles/bienvenida/mundito1.png"
                    alt="Nivel 1"
                    className="mr-10 w-auto h-64 animate-tambaleo"
                />
                <p className="text-3xl text-black text-left md:text-3xl super">
                    ¡BIENVENIDOS AL NIVEL I! <br /> PLANETA CELESTIA
                </p>
            </div>
        </div>

        {/* Juego Introductorio */}
        <div className="flex flex-col justify-center items-center mt-8 md:mt-0 p-4 w-full md:w-1/4">
            <Link href="/games/lvl1/intro">
                <img
                    src="/img/home/juego_intro.png"
                    alt="Juego Introductorio"
                    className="w-36 md:w-44 lg:w-52 xl:w-60 animate-float"
                />
            </Link>
        </div>
    </div>
</section>

);

export default Bienvenida
