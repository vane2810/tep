"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useSession from "@/hooks/useSession";
import ComponentHeader from "@/components/templates/games/componentHeader";
import Loading from "@/components/elements/loading";
import Volver from "@/components/elements/botonVolver";
import Carga from "@/components/menssages/mensajeCarga";
import AddButton from "@/components/elements/botonAdd";
import { SeparadorMorado } from "@/components/separador";
import GamesContainer from "@/components/templates/games/gamesContainer";
import InstructionsModal from "@/components/modals/admin/contenido/instrutionModal";
import DeleteModal from "@/components/modals/admin/contenido/deleteModal";
import InstruccionesModal from "@/components/modals/games/instruccionesModal";
import JuegoOpciones from "@/components/minigame/juegoOpciones";

const GamePage = () => {
    const params = useParams();
    const router = useRouter(); // Use useRouter para navegar a otra página
    const { subtemas, contenidos, juegos } = params;
    const { session } = useSession();

    const gameId = Number(juegos);
    if (isNaN(gameId)) {
        console.error("Error: El ID del juego no es un número válido. Valor recibido:", juegos);
    }

    const [gameData, setGameData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [instructions, setInstructions] = useState([]);
    const [currentInstruction, setCurrentInstruction] = useState(null);
    const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(false);
    const [isInstruccionesModalOpen, setIsInstruccionesModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteInstructionId, setDeleteInstructionId] = useState(null);

    useEffect(() => {
        if (!isNaN(gameId)) {
            console.log("ID del juego procesado:", gameId);
        } else {
            console.error("Error: El ID del juego no es válido. Detenido el fetch.");
            return;
        }

        const fetchGame = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3001/api/games/byContent/${contenidos}`);
                if (response.ok) {
                    const data = await response.json();
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

        const fetchInstructions = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/instructions/byGame/${gameId}`);
                if (response.ok) {
                    const data = await response.json();
                    setInstructions(data);
                } else {
                    console.error("Error al obtener las instrucciones:", response.statusText);
                }
            } catch (error) {
                console.error("Error de red:", error);
            }
        };

        if (!isNaN(gameId) && gameId > 0) {
            fetchGame();
            fetchInstructions();
        } else {
            console.error("El ID del juego no es válido, no se realiza la petición de datos.");
        }
    }, [gameId]);

    // Función para manejar cambios en los campos de entrada del modal de instrucciones
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentInstruction((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Función para abrir el modal de instrucciones
    const handleOpenInstruccionesModal = () => {
        setIsInstruccionesModalOpen(true);
    };

    // Función para agregar una nueva instrucción
    const handleAddInstruction = () => {
        setCurrentInstruction(null);
        setIsInstructionsModalOpen(true);
    };

    // Función para abrir el formulario de configuración del juego
    const handleConfigureGame = () => {
        router.push(`/niveles/nivel1/mate/${subtemas}/${contenidos}/${gameId}/${gameId}/configuration`);
    };

    // Función para editar una instrucción existente
    const handleEditInstruction = (instruction) => {
        setCurrentInstruction(instruction);
        setIsInstructionsModalOpen(true);
    };

    // Función para eliminar una instrucción existente
    const handleDeleteInstruction = (id) => {
        setDeleteInstructionId(id);
        setIsDeleteModalOpen(true);
    };

    // Función para confirmar la eliminación de una instrucción
    const confirmDeleteInstruction = async () => {
        if (!deleteInstructionId) return;

        try {
            const response = await fetch(`http://localhost:3001/api/instructions/${deleteInstructionId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setInstructions((prev) => prev.filter((instruction) => instruction.id !== deleteInstructionId));
                setIsDeleteModalOpen(false);
            } else {
                console.error('Error al eliminar la instrucción:', response.statusText);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    // Función para cerrar los modales
    const handleModalClose = () => {
        setIsInstructionsModalOpen(false);
        setIsInstruccionesModalOpen(false);
        setCurrentInstruction(null);
    };

    // Función para manejar la adición o edición de instrucciones
    const handleAddInstructionSubmit = async (instruction) => {
        if (!instruction.points || !instruction.instructions || isNaN(gameId)) {
            console.error('Todos los campos son obligatorios para agregar una instrucción o el ID del juego no es válido.');
            return;
        }

        const isEditing = !!instruction?.id;

        const url = isEditing
            ? `http://localhost:3001/api/instructions/${instruction.id}`
            : 'http://localhost:3001/api/instructions/';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...instruction,
                    game_id: gameId,
                }),
            });

            if (response.ok) {
                const updatedInstruction = await response.json();
                if (isEditing) {
                    setInstructions((prev) =>
                        prev.map((instr) => (instr.id === updatedInstruction.id ? updatedInstruction : instr))
                    );
                } else {
                    setInstructions((prev) => [...prev, updatedInstruction]);
                }
                setIsInstructionsModalOpen(false);
            } else {
                console.error('Error al guardar la instrucción:', response.statusText);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (error || !gameData) {
        return <Carga />;
    }

    return (
        <main className="bg-gray-100">
            <SeparadorMorado />
            <Volver href={`/niveles/nivel1/ingles/${subtemas}/${contenidos}/${gameId}`} img="/img/home/regresar/morado.webp" />

            {session?.role === "admin" && (
                <div className="flex flex-wrap justify-end gap-4 mt-4 mr-4 md:mr-8">
                    <AddButton text="Agregar Instrucción" onClick={handleAddInstruction} />
                    <AddButton text="Configurar Juego" onClick={handleConfigureGame} />
                </div>
            )}

            <ComponentHeader
                imageSrc="/img/personajes/donkey/donkey.webp"
                onInstructionsClick={handleOpenInstruccionesModal}
            />

            <GamesContainer
                gameName={gameData?.title || "Juego sin título"}
                exercise="Ejercicio 1"
                result="Pendiente"
                stars={0}
            />

            {gameData && (
                <JuegoOpciones gameData={gameData} currentScene={0} puntos={0} />
            )}


            <InstruccionesModal
                isOpen={isInstruccionesModalOpen}
                onClose={handleModalClose}
                instructions={instructions}
                onPlay={() => console.log('Jugar')}
                onEdit={handleEditInstruction}
                onDelete={handleDeleteInstruction}
                isAdmin={session?.role === "admin"}
            />

            <InstructionsModal
                isOpen={isInstructionsModalOpen}
                onClose={handleModalClose}
                onSave={handleAddInstructionSubmit}
                newInstruction={currentInstruction || { points: '', instructions: '', video_url: '', game_id: gameId }}
                onInputChange={handleInputChange}
            />

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDeleteInstruction}
            />

            <SeparadorMorado />
        </main>
    );
};

export default GamePage;
