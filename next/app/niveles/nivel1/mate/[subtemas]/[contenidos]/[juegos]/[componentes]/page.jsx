"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useSession from "@/hooks/useSession";
import ComponentHeader from "@/components/templates/games/componentHeader";
import Loading from "@/components/elements/loading";
import Volver from "@/components/elements/botonVolver";
import { SeparadorVerde } from "@/components/separador";
import InstruccionesModal from "@/components/modals/games/instruccionesModal";
import Carga from "@/components/menssages/mensajeCarga";

const GamePage = () => {
    const params = useParams();
    const { subtemas, contenidos, juegos } = params;
    const { session } = useSession();

    const gameId = Number(juegos);
    const [gameData, setGameData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [instructions, setInstructions] = useState([]);
    const [isInstruccionesModalOpen, setIsInstruccionesModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPoints, setCurrentPoints] = useState({ points_max: "", points_min: "" });

    useEffect(() => {
        const fetchGame = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3001/api/games/${gameId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log("Game Data:", data);
                    setGameData(data);
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

        if (gameId) fetchGame();
    }, [gameId]);

    useEffect(() => {
        const fetchInstructions = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/gametypes/default/${gameId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched Instructions:", data);

                    // Asegurarnos de que data contiene las instrucciones y la URL en el formato adecuado
                    if (data && typeof data.instructions === "string") {
                        setInstructions([{
                            instructions: data.instructions,
                            video_url: data.video_url
                        }]);
                    } else {
                        console.error("El formato de las instrucciones no es correcto:", data);
                    }
                } else {
                    console.error("Error al obtener las instrucciones predeterminadas:", response.statusText);
                }
            } catch (error) {
                console.error("Error de red al obtener instrucciones:", error);
            }
        };

        if (gameId) fetchInstructions();
    }, [gameId]);

    const handleEditClick = () => {
        setIsEditing(true);
        setIsInstruccionesModalOpen(true);
    };

    const handleModalClose = () => {
        setIsInstruccionesModalOpen(false);
        setIsEditing(false);
        setCurrentPoints({ points_max: "", points_min: "" });
    };

    const handleSavePoints = async (updatedPoints) => {
        try {
            const response = await fetch(
                `http://localhost:3001/api/instructions/${gameId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedPoints),
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log("Saved Points Data:", data);
                setCurrentPoints(data);
            } else {
                console.error("Error al guardar los puntos:", response.statusText);
            }
        } catch (error) {
            console.error("Error al guardar los puntos:", error);
        }
        handleModalClose();
    };

    if (loading) return <Loading />;
    if (error) return <Carga />;

    return (
        <main className="bg-gray-100">
            <SeparadorVerde />
            <Volver href={`/niveles/nivel1/mate/${subtemas}/${contenidos}/${gameId}`} img="/img/home/regresar/verde.png" />
            <ComponentHeader
                imageSrc="/img/personajes/donkey/donkey.png"
                onInstructionsClick={() => setIsInstruccionesModalOpen(true)}
            />
            <InstruccionesModal
                isOpen={isInstruccionesModalOpen}
                onClose={handleModalClose}
                instructions={instructions}
                points={currentPoints}
                isAdmin={session?.role === "admin"}
                onSave={handleSavePoints}
                isEditing={isEditing}
            />
            <SeparadorVerde />
        </main>
    );
};

export default GamePage;
