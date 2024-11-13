// ./niveles/nivel1/mate/[subtemas]/[contenidos]/[juegos]/[componentes]/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useSession from "@/hooks/useSession";
import ComponentHeader from "@/components/templates/games/componentHeader";
import Loading from "@/components/elements/loading";
import Volver from "@/components/elements/botonVolver";
import Carga from "@/components/menssages/mensajeCarga";
import AddButton from "@/components/elements/botonAdd";
import { SeparadorVerde } from "@/components/separador";
import GamesContainer from "@/components/templates/games/gamesContainer";

const GamePage = () => {
    const params = useParams();
    const { subtemas, contenidos, juegos } = params;
    const { session } = useSession();

    const [gameData, setGameData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(false);
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

    // Obtener los datos del juego actual basado en el ID del juego
    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/games/byContent/${contenidos}`);
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

    const volverHref = `/niveles/nivel1/mate/${subtemas}/${contenidos}/${juegos}`;

    if (loading) {
        return <Loading />;
    }

    if (error || !gameData) {
        return <Carga />;
    }

    return (
        <main className="bg-gray-100">
            <SeparadorVerde />
            <Volver href={volverHref} img="/img/home/regresar/verde.png" />

            {/* Mostrar botones de gestión solo para el administrador */}
            {session?.role === "admin" && (
                <div className="flex flex-wrap justify-end gap-4 mt-4 mr-4 md:mr-8">
                    <div className="flex justify-end w-full md:w-auto">
                        <AddButton text="Agregar Instrucciones" />
                    </div>
                    <div className="flex justify-end w-full md:w-auto">
                        <AddButton text="Configurar Juego" />
                    </div>
                </div>
            )}

            {/* Header del juego con título e imagen */}
            <ComponentHeader
                imageSrc="/img/personajes/donkey/donkey.png"
            />
            <GamesContainer
                gameName={gameData.title}
                exercise="Ejercicio 1" // Puedes actualizar este dato según la lógica de ejercicios del juego
                result="Pendiente"
                stars={0} // Puedes actualizar este valor según el progreso del usuario
            />
            <SeparadorVerde />
        </main>
    );
};

export default GamePage;
