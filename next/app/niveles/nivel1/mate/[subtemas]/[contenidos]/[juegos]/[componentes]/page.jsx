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
    const [defaultInstructions, setDefaultInstructions] = useState(null);
    const [adminInstructions, setAdminInstructions] = useState([]);
    const [isInstruccionesModalOpen, setIsInstruccionesModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPoints, setCurrentPoints] = useState({ id: null, points_max: "", points_min: "" });

    // Obtener los datos del juego
    useEffect(() => {
        const fetchGame = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3001/api/games/${gameId}`);
                if (response.ok) {
                    const data = await response.json();
                    setGameData(data);
                } else {
                    setError(true);
                }
            } catch (error) {
                console.error("Error al obtener datos del juego:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (gameId) fetchGame();
    }, [gameId]);

    // Obtener las instrucciones predeterminadas basadas en el gameType
    useEffect(() => {
        const fetchDefaultInstructions = async () => {
            if (!gameData?.gameType?.id) {
                console.error("No se encontró el ID del tipo de juego asociado al juego.");
                return;
            }

            try {
                const response = await fetch(`http://localhost:3001/api/gametypes/default/${gameData.gameType.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setDefaultInstructions(data);
                } else {
                    console.error("Error al obtener las instrucciones predeterminadas");
                }
            } catch (error) {
                console.error("Error al obtener instrucciones predeterminadas:", error);
            }
        };

        if (gameData?.gameType?.id) {
            fetchDefaultInstructions();
        }
    }, [gameData]);

    // Obtener las instrucciones personalizadas
    const fetchAdminInstructions = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/instructions/byGame/${gameId}`);
            if (response.ok) {
                const data = await response.json();
                setAdminInstructions(data);
            } else {
                console.error("Insertar instrucciones personalizadas");
            }
        } catch (error) {
            console.error("Insertar instrucciones personalizadas:", error);
        }
    };

    useEffect(() => {
        if (gameId) {
            fetchAdminInstructions();
        }
    }, [gameId]);

    const handleEditClick = (instruction) => {
        setIsEditing(true);
        setIsInstruccionesModalOpen(true);
        setCurrentPoints({
            id: instruction.id || null,
            points_max: instruction.points_max || "",
            points_min: instruction.points_min || "",
        });
    };

    const handleModalClose = () => {
        setIsInstruccionesModalOpen(false);
        setIsEditing(false);
        setCurrentPoints({ id: null, points_max: "", points_min: "" });
    };

    const handleSavePoints = async (updatedPoints) => {
        try {
            const { id, points_max, points_min } = updatedPoints;
            const payload = {
                points_max, 
                points_min, 
                game_id: gameId, 
            };
    
            let response;
    
            // Si no existe ID, hacemos un POST (crear), de lo contrario un PUT (editar)
            if (!id) {
                response = await fetch(`http://localhost:3001/api/instructions/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            } else {
                response = await fetch(`http://localhost:3001/api/instructions/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            }
    
            if (response.ok) {
                console.log("Instrucciones guardadas correctamente");
                await fetchAdminInstructions(); // Actualizamos las instrucciones personalizadas
            } else {
                console.error("Error al guardar las instrucciones:", await response.text());
            }
        } catch (error) {
            console.error("Error al guardar las instrucciones:", error);
        } finally {
            handleModalClose();
        }
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
                instructions={adminInstructions}
                defaultInstructions={defaultInstructions}
                points={currentPoints}
                isAdmin={session?.role === "admin"}
                onSave={handleSavePoints}
                onEdit={handleEditClick} // Vinculado al flujo de edición
                isEditing={isEditing}
            />
            <SeparadorVerde />
        </main>
    );
};

export default GamePage;
