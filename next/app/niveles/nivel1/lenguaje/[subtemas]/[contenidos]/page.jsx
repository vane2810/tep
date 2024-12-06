// ./app/niveles/nivel1/mate/[subtemas]/[contenidos]/page.jsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SubtemaContent from "@/components/templates/contents/contentHeader";
import PrivateRoute from "@/components/PrivateRoute";
import { SeparadorMorado } from "@/components/separador";
import useSession from "@/hooks/useSession";
import AddButton from "@/components/elements/botonAdd";
import Volver from "@/components/elements/botonVolver";
import ContentModal from "@/components/modals/admin/contenido/contentModal";
import DeleteModal from "@/components/modals/admin/contenido/deleteModal";
import ContentStructure1 from "@/components/templates/contents/contentStructure1";
import ContentStructure2 from "@/components/templates/contents/contentStructure2";
import Loading from "@/components/elements/loading";
import EmptyContentMessage from "@/components/menssages/mensajeVacio";
import BotonContent from "@/components/elements/botonContent";
import Carga from "@/components/menssages/mensajeCarga";

const ContenidoPage = () => {
    const params = useParams();
    const { subtemas, contenidos } = params;
    const { session } = useSession();

    const [subtemaData, setSubtemaData] = useState(null);
    const [contenidoData, setContenidoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editContentId, setEditContentId] = useState(null);
    const [deleteContentId, setDeleteContentId] = useState(null);
    const [viewType, setViewType] = useState('list'); // Nueva variable de estado para el tipo de vista
    const [newContent, setNewContent] = useState({
        title: "",
        description: "",
        steps: []
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

                    // Obtener los pasos asociados a cada contenido
                    const contenidoWithSteps = await Promise.all(
                        data.map(async (content) => {
                            const stepsResponse = await fetch(`http://localhost:3001/api/steps/byContent/${content.id}`);
                            const steps = stepsResponse.ok ? await stepsResponse.json() : [];
                            return {
                                ...content,
                                steps,
                            };
                        })
                    );

                    setContenidoData(contenidoWithSteps);
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
            steps: []
        });
        setIsModalOpen(true);
    };

    const handleEditContent = async (content) => {
        setEditContentId(content.id);
        try {
            const response = await fetch(`http://localhost:3001/api/steps/byContent/${content.id}`);
            if (response.ok) {
                const steps = await response.json();
                setNewContent({
                    title: content.title,
                    description: content.description,
                    steps: steps
                });
            } else {
                console.error("Error al obtener los pasos del contenido");
            }
        } catch (error) {
            console.error("Error de red al obtener los pasos:", error);
        }
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
                    title: newContentData.title,
                    description: newContentData.description,
                    subtopicId: contenidos,
                }),
            });

            if (response.ok) {
                const savedContent = await response.json();

                // Luego, guardar o actualizar los pasos
                for (const step of newContentData.steps) {
                    const stepUrl = step.id
                        ? `http://localhost:3001/api/steps/${step.id}`
                        : "http://localhost:3001/api/steps/";
                    const stepMethod = step.id ? "PUT" : "POST";

                    await fetch(stepUrl, {
                        method: stepMethod,
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            title: step.title,
                            description: step.description,
                            img_url: step.img_url,
                            audio_url: step.audio_url,
                            aditional: step.aditional,
                            contentId: savedContent.id,
                        }),
                    });
                }

                // Actualizar el estado de contenidos en el frontend
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
        return <Loading />;
    }

    if (!subtemaData) {
        return <Carga />;
    }

    const volverHref = `/niveles/nivel1/lenguaje/${subtemas}`;

    return (
        <PrivateRoute>
            <main className="bg-gray-100">
                <SeparadorMorado />

                <Volver href={volverHref} img="/img/home/regresar/morado.webp" />

                <SubtemaContent title={subtemaData.title} imgSrc={subtemaData.img_url} />

                {/* Mostrar el botón de "Agregar Contenido" solo si no hay contenido */}
                {session?.role === "admin" && contenidoData.length === 0 && (
                    <AddButton text="Agregar Contenido" onClick={handleAddContent} />
                )}

                {isModalOpen && (
                    <ContentModal
                        isOpen={isModalOpen}
                        onClose={handleModalClose}
                        onSave={handleSaveContent}
                        content={editContentId ? newContent : null}
                    />
                )}

                {isDeleteModalOpen && (
                    <DeleteModal
                        isOpen={isDeleteModalOpen}
                        onClose={handleDeleteModalClose}
                        onConfirm={handleDeleteConfirm}
                    />
                )}

                {/* Botones para cambiar la vista */}
                <BotonContent
                    onListViewClick={() => setViewType('list')}
                    onBookViewClick={() => setViewType('book')}
                />

                {/* Mostrar los contenidos usando la vista seleccionada */}
                <div className="mt-6">
                    {contenidoData.length === 0 ? (
                        <EmptyContentMessage />
                    ) : (
                        contenidoData.map((content) => (
                            viewType === 'list' ? (
                                <ContentStructure1
                                    key={content.id}
                                    content={content}
                                    onEdit={handleEditContent}
                                    onDelete={handleDeleteContent}
                                    isAdmin={session?.role === "admin"}
                                    playLink={`/niveles/nivel1/lenguaje/${subtemas}/${content.id}/${content.id}`}
                                />
                            ) : (
                                <ContentStructure2
                                    key={content.id}
                                    content={content}
                                    playLink={`/niveles/nivel1/lenguaje/${subtemas}/${content.id}/${content.id}`}
                                />
                            )
                        ))
                    )}
                </div>

                <SeparadorMorado />
            </main>
        </PrivateRoute>
    );
};

export default ContenidoPage;