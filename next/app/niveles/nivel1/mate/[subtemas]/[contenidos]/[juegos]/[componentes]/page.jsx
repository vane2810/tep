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
import { FaEdit } from "react-icons/fa";

// Importar dinámicamente los componentes de juegos y formularios
import { gameComponents, configForms } from "@/utils/gameMappings";

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
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
    const [currentPoints, setCurrentPoints] = useState({ id: null, points_max: "", points_min: "" });
    const [gameConfig, setGameConfig] = useState(null);

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

    // Obtener las instrucciones predeterminadas
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
                console.error("Error al obtener instrucciones personalizadas");
            }
        } catch (error) {
            console.error("Error al obtener instrucciones personalizadas:", error);
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

    const handleConfigClick = () => {
        setIsConfigModalOpen(true);
    };

    const handleModalClose = () => {
        setIsInstruccionesModalOpen(false);
        setIsEditing(false);
        setIsConfigModalOpen(false);
        setCurrentPoints({ id: null, points_max: "", points_min: "" });
    };

    useEffect(() => {
        const fetchGameConfig = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/gamedetails/${gameId}`);
                if (response.ok) {
                    const data = await response.json();
                    setGameConfig(data.config);
                } else {
                    console.error("Error al obtener la configuración del juego");
                }
            } catch (error) {
                console.error("Error al obtener la configuración del juego:", error);
            }
        };

        if (gameId) {
            fetchGameConfig();
        }
    }, [gameId]);

    const handleSavePoints = async (updatedPoints) => {
        try {
            const { id, points_max, points_min } = updatedPoints;
            const payload = {
                points_max,
                points_min,
                game_id: gameId,
            };

            let response;

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
                await fetchAdminInstructions();
            } else {
                console.error("Error al guardar las instrucciones:", await response.text());
            }
        } catch (error) {
            console.error("Error al guardar las instrucciones:", error);
        } finally {
            handleModalClose();
        }
    };

    const handleSaveGameConfig = async (configData) => {
        try {
            const response = await fetch(`http://localhost:3001/api/gamedetails`, {
                method: gameConfig ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gameId, config: configData }),
            });

            if (response.ok) {
                console.log("Configuración del juego guardada correctamente");
                setGameConfig(configData);
            } else {
                console.error("Error al guardar la configuración del juego:", await response.text());
            }
        } catch (error) {
            console.error("Error al guardar la configuración del juego:", error);
        }
    };

    if (loading) return <Loading />;
    if (error) return <Carga />;

    const GameComponent = gameData?.gameType?.id && gameComponents[gameData.gameType.id.toString()];
    const ConfigFormComponent = gameData?.gameType?.id && configForms[gameData.gameType.id.toString()];

    const isGameConfigured = adminInstructions.length > 0 && gameConfig;

    return (
        <main className="bg-gray-100">
            <SeparadorVerde />
            <Volver href={`/niveles/nivel1/mate/${subtemas}/${contenidos}/${gameId}`} img="/img/home/regresar/verde.webp" />
            <ComponentHeader
                imageSrc="/img/personajes/donkey/donkey.webp"
                onInstructionsClick={() => setIsInstruccionesModalOpen(true)}
            />
            <div className="relative bg-white shadow-md mx-auto my-10 px-12 py-8 rounded-md max-w-5xl container yagora">
                <h2 className="mb-6 font-bold text-4xl text-center text-purple-800 wonder">{gameData.title}</h2>
                {isGameConfigured && GameComponent ? (
                    <GameComponent gameData={gameData} config={gameConfig} />
                ) : (
                    <p className="text-center text-gray-800 text-lg">
                        El juego no está configurado. Por favor configure el juego.
                    </p>
                )}
                {session?.role === "admin" && (
                    <div className="top-4 right-4 absolute flex space-x-4">
                        <button
                            onClick={handleConfigClick}
                            className="flex items-center bg-blue-500 hover:bg-blue-600 shadow-md px-4 py-2 rounded-md font-bold text-white transform transition-transform hover:scale-105"
                        >
                            <FaEdit className="mr-2" />
                            {isGameConfigured ? "Editar Juego" : "Configurar Juego"}
                        </button>
                    </div>
                )}
            </div>
            <InstruccionesModal
                isOpen={isInstruccionesModalOpen}
                onClose={handleModalClose}
                instructions={adminInstructions}
                defaultInstructions={defaultInstructions}
                points={currentPoints}
                isAdmin={session?.role === "admin"}
                onSave={handleSavePoints}
                onEdit={handleEditClick}
                isEditing={isEditing}
            />
            {isConfigModalOpen && ConfigFormComponent && (
                <ConfigFormComponent
                    isOpen={isConfigModalOpen}
                    onClose={handleModalClose}
                    gameData={gameData}
                    onSave={handleSaveGameConfig}
                    isEditing={true}
                    existingConfig={gameConfig}
                />
            )}
            <SeparadorVerde />
        </main>
    );
};

export default GamePage;