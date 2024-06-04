import React from "react";
import Link from "next/link";

export default function PageGameDiv()
{
    return(
        <main>
        {/* Donkey*/}
        {/* Juego 1 */}
        <div>
            <Link href= "/games/lvl1/mate/division/game1">Juego 1</Link>
        </div>
        {/* Juego 2 */}
        <div>
            <Link href= "/games/lvl1/mate/division/game2">Juego 2</Link>
        </div>
        {/* Juego 3 */}
        <div>
            <Link href= "/games/lvl1/mate/division/game3">Juego 3</Link>
        </div>
        {/* Juego 4 */}
        <div>
            <Link href= "/games/lvl1/mate/division/game4">Juego 4</Link>
        </div>
        </main>
    )
}