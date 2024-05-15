import Link from "next/link";
import styles from "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4$ custom-bg-color  text-white">
      {/* Logo y nombre */}
      <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img src="img/page/logoTEP.png" alt="Logo de la aplicación" className="w-8 h-8 mr-2" />
        </Link>
        <span className="text-lg font-semibold">TechEduPlanet</span>
      </div>
      
      {/* Botón de inicio de sesión */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Iniciar sesión
      </button>
    </nav>
  );
}
