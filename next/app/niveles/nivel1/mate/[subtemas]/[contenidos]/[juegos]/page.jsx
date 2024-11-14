"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SeparadorVerde } from "@/components/separador";
import Volver from "@/components/elements/botonVolver";
import useSession from "@/hooks/useSession";
import GameHeader from "@/components/templates/games/gamesHeader";
import GameCard from "@/components/templates/games/gamesCards";
import Loading from "@/components/elements/loading";
import AddButton from "@/components/elements/botonAdd";
import GameModal from "@/components/modals/admin/contenido/gamesModal";
import DeleteModal from "@/components/modals/admin/contenido/deleteModal";
import EmptyContentMessage from "@/components/menssages/mensajeVacio";
import Carga from "@/components/menssages/mensajeCarga";

const JuegosPage = () => {
    const params = useParams();
    const { subtemas, contenidos } = params;
    const { session } = useSession();

    const [subtemaData, setSubtemaData] = useState(null);
    const [gamesList, setGamesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [newGame, setNewGame] = useState({ title: "", imgSrc: "", contentId: contenidos });
    const [editGameId, setEditGameId] = useState(null);
    const [deleteGameId, setDeleteGameId] = useState(null);

    // Obtener los datos del subtema actual
    useEffect(() => {
        const fetchSubtema = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/subtopics/${contenidos}`);
                if (response.ok) {
                    const data = await response.json();
                    setSubtemaData(data);
                } else {
                    console.error("Error al obtener los datos del subtema");
                }
            } catch (error) {
                console.error("Error de red:", error);
            }
        };

        const fetchGames = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/games/byContent/${contenidos}`);
                if (response.ok) {
                    const data = await response.json();
                    setGamesList(data);
                } else {
                    console.error("Error al obtener los juegos");
                }
            } catch (error) {
                console.error("Error de red:", error);
            } finally {
                setLoading(false);
            }
        };

        if (contenidos) {
            fetchSubtema();
            fetchGames();
        }
    }, [contenidos]);

    const handleAddGame = () => {
        setNewGame({ title: "", imgSrc: "", contentId: contenidos });
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setNewGame({ title: "", imgSrc: "", contentId: contenidos });
        setEditGameId(null);
    };

    const handleInputChange = (e) => setNewGame((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSaveGame = async (gameToSave) => {
        // Asegúrate de que `gameToSave` tiene `contentId` y `imgSrc`
        if (!gameToSave.contentId) {
            console.error("El ID del contenido es requerido para guardar el juego.");
            return;
        }

        const url = editGameId
            ? `http://localhost:3001/api/games/${editGameId}`
            : "http://localhost:3001/api/games/";
        const method = editGameId ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: gameToSave.title,
                    img_url: gameToSave.imgSrc,
                    contentId: gameToSave.contentId,
                }),
            });

            if (response.ok) {
                const savedGame = await response.json();

                if (editGameId) {
                    setGamesList((prevGames) =>
                        prevGames.map((game) => (game.id === editGameId ? savedGame : game))
                    );
                } else {
                    setGamesList((prevGames) => [...prevGames, savedGame]);
                }

                handleModalClose(); // Cierra el modal después de guardar
            } else {
                console.error("Error al guardar el juego", response.statusText);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    const handleEditGame = (game) => {
        setNewGame({
            title: game.title,
            imgSrc: game.img_url || "",
            contentId: game.contentId || contenidos,
        });
        setEditGameId(game.id);
        setIsModalOpen(true);
    };

    const handleDeleteGame = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/games/${id}`, { method: "DELETE" });
            if (response.ok) {
                setGamesList((prev) => prev.filter((game) => game.id !== id));
            } else {
                console.error("Error al eliminar el juego");
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    const openDeleteModal = (id) => {
        setDeleteGameId(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteGame = () => {
        if (deleteGameId) {
            handleDeleteGame(deleteGameId);
            setDeleteGameId(null);
            setIsDeleteModalOpen(false);
        }
    };

    const volverHref = `/niveles/nivel1/mate/${subtemas}/${contenidos}`;

    if (loading) {
        return <Loading />;
    }

    if (!subtemaData) {
        return <Carga />;
    }

    return (
        <main className="bg-gray-100">
            <SeparadorVerde />

            <Volver href={volverHref} img="/img/home/regresar/verde.png" />

            <GameHeader
                title={subtemaData.title}
                imageSrc="/img/personajes/donkey/donkey.png"
            />

            {session?.role === "admin" && (
                <AddButton text="Agregar Juego" onClick={handleAddGame} />
            )}

            <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-10 px-8 py-8">
                {gamesList.length > 0 ? (
                    gamesList.map((game) => (
                        <GameCard
                            key={game.id}
                            title={game.title}
                            imageSrc={game.img_url}
                            href={`/niveles/nivel1/mate/${subtemas}/${contenidos}/${game.id}/${game.id}`} 
                            isAdmin={session?.role === "admin"} // Añadir prop isAdmin para mostrar botones de editar/eliminar solo para el admin
                            onEdit={() => handleEditGame(game)} // Añadir prop onEdit
                            onDelete={() => openDeleteModal(game.id)} // Añadir prop onDelete
                        />
                    ))
                ) : (
                    <EmptyContentMessage />
                )}
            </div>

            <SeparadorVerde />

            <GameModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSave={handleSaveGame}
                newGame={newGame}
                onInputChange={handleInputChange}
            />

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDeleteGame}
            />
        </main>
    );
};

export default JuegosPage;