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

// Importar todos los componentes de juegos disponibles
import Trivia from "@/components/minigame/trivia";
import Emparejar from "@/components/minigame/emparejar";
import Ordenar from "@/components/minigame/ordenar";
import Arrastrar from "@/components/minigame/arrastrar_soltar";

// Importar formularios de configuración para los juegos
import TriviaForm from "@/components/minigame/forms/triviaForm";
import EmparejarForm from "@/components/minigame/forms/emparejarForm";
import OrdenarForm from "@/components/minigame/forms/ordenarForm";
import ArrastrarForm from "@/components/minigame/forms/arrastrarForm";

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

    // Mapas de tipos de juegos y formularios de configuración
    const gameComponents = {
        "1": Trivia,
        "2": Emparejar,
        "3": Ordenar,
        "4": Arrastrar,
    };

    const configForms = {
        "1": TriviaForm,
        "2": EmparejarForm,
        "3": OrdenarForm,
        "4": ArrastrarForm,
    };

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

    if (loading) return <Loading />;
    if (error) return <Carga />;

    // Determinar si los datos del juego están configurados
    const GameComponent = gameData?.gameType?.id && gameComponents[gameData.gameType.id.toString()];
    const ConfigFormComponent = gameData?.gameType?.id && configForms[gameData.gameType.id.toString()];

    // Verificar si el juego está configurado completamente antes de intentar mostrarlo
    const isGameConfigured = adminInstructions.length > 0;

    return (
        <main className="bg-gray-100">
            <SeparadorVerde />
            <Volver href={`/niveles/nivel1/mate/${subtemas}/${contenidos}/${gameId}`} img="/img/home/regresar/verde.png" />
            <ComponentHeader
                imageSrc="/img/personajes/donkey/donkey.png"
                onInstructionsClick={() => setIsInstruccionesModalOpen(true)}
            />

            {/* Renderizar el contenedor de configuración del juego */}
            <div className="bg-white shadow-md mx-auto my-8 p-6 rounded-lg container">
                <h2 className="mb-4 font-bold text-3xl text-center text-purple-700">{gameData.title}</h2>
                <p className="mb-6 text-center text-gray-700 text-xl">
                    Tipo de Juego: {gameData?.gameType?.type_name}
                </p>

                {isGameConfigured && GameComponent ? (
                    <GameComponent gameData={gameData} />
                ) : (
                    <p className="text-center text-gray-800 text-lg">
                        El juego no está configurado. Por favor configure el juego antes de jugar.
                    </p>
                )}

                {session?.role === "admin" && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleConfigClick}
                            className="bg-blue-500 hover:bg-blue-600 shadow-md px-4 py-2 rounded-full font-bold text-white transform transition-transform hover:scale-105"
                        >
                            Configurar Juego
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
                />
            )}

            <SeparadorVerde />
        </main>
    );
};

export default GamePage;
