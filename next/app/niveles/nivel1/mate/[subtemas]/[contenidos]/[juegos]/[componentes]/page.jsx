"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useSession from "@/hooks/useSession";
import GameHeader from "@/components/templates/games/gamesHeader";
import Loading from "@/components/elements/loading";
import Volver from "@/components/elements/botonVolver";
import Carga from "@/components/menssages/mensajeCarga";

const GamePage = () => {
    const params = useParams();
    const { subtemas, contenidos, juegos } = params;
    const { session } = useSession();

    const [gameData, setGameData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Obtener los datos del juego actual basado en el ID del juego
    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/games/${juegos}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        setGameData(data);
                    } else {
                        setError(true);
                        console.error("No se encontraron datos del juego.");
                    }
                } else {
                    setError(true);
                    console.error("Error al obtener los datos del juego:", response.statusText);
                }
            } catch (error) {
                setError(true);
                console.error("Error de red:", error);
            } finally {
                setLoading(false);
            }
        };

        if (juegos) {
            fetchGame();
        }
    }, [juegos]);

    const volverHref = `/niveles/nivel1/mate/${subtemas}/${contenidos}`;

    if (loading) {
        return <Loading />;
    }

    if (error || !gameData) {
        return <Carga />;
    }

    return (
        <main className="bg-gray-100">
            <Volver href={volverHref} img="/img/home/regresar/verde.png" />

            {/* Header del juego con título e imagen */}
            <GameHeader
                title={gameData.title} // Título del juego obtenido del API
                imageSrc={gameData.img_url || "/img/personajes/donkey/donkey.png"}
            />

            {/* Lógica o componente del juego */}
            <div className="flex justify-center items-center h-screen">
                <h2 className="font-bold text-3xl text-purple-800">
                    Bienvenido al juego: {gameData.title}
                </h2>
            </div>
        </main>
    );
};

export default GamePage;
