import React from "react";
import Link from "next/link";

export default function PageGameSuma() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Donkey */}
      <section className="flex flex-col items-center justify-center mb-12">
        <img src="/img/niveles/mate/donkey.png" alt="Donkey" className="h-40 md:h-64" />
        <h1 className="text-3xl md:text-4xl font-bold mt-4">¡Bienvenido a los Juegos de Suma!</h1>
      </section>
      
      {/* Lista de juegos */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Juego 1 */}
        <Link href="/games/lvl1/mate/suma/game1">
          <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-100 transition duration-300 cursor-pointer">
            <img src="/img/games/suma/game1.png" alt="Juego 1" className="h-32 w-auto mb-2" />
            <p className="text-lg font-semibold">Juego 1</p>
          </div>
        </Link>
        
        {/* Juego 2 */}
        <Link href="/games/lvl1/mate/suma/game2">
          <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-100 transition duration-300 cursor-pointer">
            <img src="/img/games/suma/game2.png" alt="Juego 2" className="h-32 w-auto mb-2" />
            <p className="text-lg font-semibold">Juego 2</p>
          </div>
        </Link>
        
        {/* Juego 3 */}
        <Link href="/games/lvl1/mate/suma/game3">
          <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-100 transition duration-300 cursor-pointer">
            <img src="/img/games/suma/game3.png" alt="Juego 3" className="h-32 w-auto mb-2" />
            <p className="text-lg font-semibold">Juego 3</p>
          </div>
        </Link>
        
        {/* Juego 4 */}
        <Link href="/games/lvl1/mate/suma/game4">
          <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-100 transition duration-300 cursor-pointer">
            <img src="/img/games/suma/game4.png" alt="Juego 4" className="h-32 w-auto mb-2" />
            <p className="text-lg font-semibold">Juego 4</p>
          </div>
        </Link>
      </section>
    </main>
  );
}
