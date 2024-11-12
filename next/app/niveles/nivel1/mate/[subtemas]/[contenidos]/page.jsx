"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SubtemaContent from "@/components/templates/contents/contentHeader";
import { SeparadorVerde } from "@/components/separador";
import useSession from "@/hooks/useSession";
import AddButton from "@/components/elements/botonAdd";
import Volver from "@/components/elements/botonVolver"; // Importar el componente Volver
import ContentModal from "@/components/modals/admin/contenido/contentModal"; // Importar el modal para contenido
import DeleteModal from "@/components/modals/admin/contenido/deleteModal"; // Importar el modal para eliminación

const ContenidoPage = () => {
    const params = useParams();
    const { subtemas, contenidos } = params; // Obtener `subtemas` y `contenido` desde los parámetros
    const { session } = useSession(); // Obtener la sesión actual

    const [subtemaData, setSubtemaData] = useState(null);
    const [contenidoData, setContenidoData] = useState([]); // Estado para gestionar los contenidos del subtema
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal de agregar/editar contenido
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para controlar el modal de eliminar contenido
    const [editContentId, setEditContentId] = useState(null);
    const [deleteContentId, setDeleteContentId] = useState(null);
    const [newContent, setNewContent] = useState({
        title: "",
        description: "",
        img_url: "",
        audio_url: "",
        aditional: ""
    });

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
            } finally {
                setLoading(false);
            }
        };

        if (contenidos) {
            fetchSubtema();
        }
    }, [contenidos]);

    // Obtener los contenidos del subtema
    useEffect(() => {
        const fetchContenido = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/contents/bySubtopic/${contenidos}`);
                if (response.ok) {
                    const data = await response.json();
                    setContenidoData(data);
                } else {
                    console.error("Error al obtener los contenidos del subtema");
                }
            } catch (error) {
                console.error("Error de red:", error);
            }
        };

        if (contenidos) {
            fetchContenido();
        }
    }, [contenidos]);

    // Manejar la apertura del modal de agregar o editar contenido
    const handleAddContent = () => {
        setEditContentId(null);
        setNewContent({
            title: "",
            description: "",
            img_url: "",
            audio_url: "",
            aditional: ""
        });
        setIsModalOpen(true);
    };

    const handleEditContent = (content) => {
        setEditContentId(content.id);
        setNewContent({
            title: content.title,
            description: content.description,
            img_url: content.img_url || "",
            audio_url: content.audio_url || "",
            aditional: content.aditional || ""
        });
        setIsModalOpen(true);
    };

    const handleDeleteContent = (id) => {
        setDeleteContentId(id);
        setIsDeleteModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditContentId(null);
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
        setDeleteContentId(null);
    };

    // Manejar la creación o edición de contenido
    const handleSaveContent = async (newContentData) => {
        const url = editContentId
            ? `http://localhost:3001/api/contents/${editContentId}`
            : "http://localhost:3001/api/contents/";
        const method = editContentId ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...newContentData,
                    subtopicId: contenidos, // Relacionar con el subtema actual
                }),
            });

            if (response.ok) {
                const savedContent = await response.json();
                if (editContentId) {
                    setContenidoData((prev) =>
                        prev.map((content) => (content.id === editContentId ? savedContent : content))
                    );
                } else {
                    setContenidoData((prevContent) => [...prevContent, savedContent]);
                }
                handleModalClose();
            } else {
                console.error("Error al guardar el contenido");
            }
        } catch (error) {
            console.error("Error de red al guardar el contenido:", error);
        }
    };

    // Manejar la eliminación del contenido
    const handleDeleteConfirm = async () => {
        if (deleteContentId) {
            try {
                const response = await fetch(`http://localhost:3001/api/contents/${deleteContentId}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    setContenidoData((prev) => prev.filter((content) => content.id !== deleteContentId));
                    handleDeleteModalClose();
                } else {
                    console.error("Error al eliminar el contenido");
                }
            } catch (error) {
                console.error("Error de red al eliminar el contenido:", error);
            }
        }
    };

    if (loading) {
        return <p>Cargando contenido...</p>;
    }

    if (!subtemaData) {
        return <p>No se pudo cargar el contenido.</p>;
    }

    // Construir el enlace para volver de forma dinámica
    const volverHref = `/niveles/nivel1/mate/${subtemas}`;

    return (
        <main className="bg-gray-100">
            <SeparadorVerde />

            {/* Botón "Volver" usando el componente Volver */}
            <Volver href={volverHref} img="/img/home/regresar/verde.png" />

            {/* Contenido del Subtema */}
            <SubtemaContent title={subtemaData.title} imgSrc={subtemaData.img_url} />

            {/* Botón para agregar contenido (solo si el usuario es admin) */}
            {session?.role === "admin" && (
                <AddButton text="Agregar Contenido" onClick={handleAddContent} />
            )}

            {/* Modal para agregar o editar contenido */}
            {isModalOpen && (
                <ContentModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onSave={handleSaveContent}
                    content={editContentId ? newContent : null}
                />
            )}

            {/* Modal de confirmación de eliminación */}
            {isDeleteModalOpen && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={handleDeleteModalClose}
                    onConfirm={handleDeleteConfirm}
                />
            )}

            {/* Mostrar los contenidos */}
            <div className="mt-6">
                {contenidoData.length === 0 ? (
                    <p>No hay contenidos disponibles para este subtema.</p>
                ) : (
                    contenidoData.map((content) => (
                        <div key={content.id} className="shadow-md my-4 p-4 border rounded-lg">
                            <h2 className="font-bold text-2xl">{content.title}</h2>
                            <p className="mt-2">{content.description}</p>
                            {content.img_url && (
                                <img
                                    src={content.img_url}
                                    alt={content.title}
                                    className="mt-4 rounded-lg w-full max-w-md object-cover"
                                />
                            )}
                            {session?.role === "admin" && (
                                <div className="flex space-x-4 mt-4">
                                    <button
                                        className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded font-bold text-white"
                                        onClick={() => handleEditContent(content)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-bold text-white"
                                        onClick={() => handleDeleteContent(content.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <SeparadorVerde />
        </main>
    );
};

export default ContenidoPage;