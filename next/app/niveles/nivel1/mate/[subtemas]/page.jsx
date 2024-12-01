"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import SubtemaHeader from "@/components/templates/subtopics/mateHeader";
import SubtemaCard from "@/components/templates/subtopics/subtemasCards1";
import SubtemasModal from "@/components/modals/admin/contenido/subtemasModal";
import DeleteModal from "@/components/modals/admin/contenido/deleteModal";
import { SeparadorVerde } from "@/components/separador";
import useSession from "@/hooks/useSession";
import AddButton from "@/components/elements/botonAdd";
import EmptyContentMessage from "@/components/menssages/mensajeVacio";
import DataMessage from "@/components/menssages/mensajeDatos";
import NoExiste from "@/components/menssages/mensajeNoExiste";

const subtemasData = {
  ob: {
    id: 1,
    titulo: "Operaciones Básicas",
    descripcion: "En este contenido aprenderás y reforzarás las operaciones básicas de la aritmética: suma, resta, multiplicación y división.",
    imagen: "/img/materias/mate/obn.webp",
    buttonColor: "verde",
  },
  decimales: {
    id: 2,
    titulo: "Números Decimales",
    descripcion: "¡Aventúrate en el intrigante universo de los decimales y las fracciones!",
    imagen: "/img/materias/mate/decimalesn.webp",
    buttonColor: "verde",
  },
  geometria: {
    id: 3,
    titulo: "Geometría",
    descripcion: "Sumérgete en la increíble aventura de la geometría!",
    imagen: "/img/materias/mate/geon.webp",
    buttonColor: "verde",
  },
};

const SubtemasPage = () => {
  const { subtemas } = useParams();
  const { session } = useSession(); // Obtener la sesión
  const [subtemasList, setSubtemasList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteSubtemaId, setDeleteSubtemaId] = useState(null);
  const [newSubtema, setNewSubtema] = useState({ title: "", description: "", imgSrc: "" });
  const [editSubtemaId, setEditSubtemaId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar mensajes de error
  const [isError, setIsError] = useState(false); // Estado para manejar errores de carga

  const currentSubtema = subtemasData[subtemas];
  if (!currentSubtema) {
    console.error("Tema no encontrado");
    return <NoExiste/>
  }

  const currentTopicId = currentSubtema.id;

  const fetchSubtemas = async () => {
    if (currentTopicId) {
      try {
        const response = await fetch(`http://localhost:3001/api/subtopics/byTopic/${currentTopicId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.length === 0) {
            setErrorMessage("No hay subtemas disponibles en este contenido.");
          }
          setSubtemasList(data);
        } else {
          setIsError(true); // Activar mensaje de error en la carga
          setErrorMessage("Hubo un problema al cargar los subtemas. Intenta de nuevo más tarde.");
        }
      } catch (error) {
        console.error("Error de red:", error);
        setIsError(true); // Activar mensaje de error en la carga
        setErrorMessage("Hubo un problema de red al intentar cargar los subtemas.");
      }
    }
  };

  useEffect(() => {
    fetchSubtemas();
  }, [currentTopicId]);

  const handleAddSubtema = () => setIsModalOpen(true);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewSubtema({ title: "", description: "", imgSrc: "" });
    setEditSubtemaId(null);
  };

  const handleInputChange = (e) => setNewSubtema((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSaveSubtema = async (updatedSubtema) => {
    const url = editSubtemaId
      ? `http://localhost:3001/api/subtopics/${editSubtemaId}`
      : "http://localhost:3001/api/subtopics/";
    const method = editSubtemaId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: updatedSubtema.title,
          description: updatedSubtema.description,
          img_url: updatedSubtema.imgSrc,
          topicId: currentTopicId,
        }),
      });

      if (response.ok) {
        handleModalClose();
        fetchSubtemas(); // Recargar los subtemas después de guardar uno nuevo
      } else {
        console.error("Error al guardar el subtema");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleEditSubtema = (subtema) => {
    setNewSubtema({
      title: subtema.title,
      description: subtema.description,
      imgSrc: subtema.img_url || "",
    });
    setEditSubtemaId(subtema.id);
    setIsModalOpen(true);
  };

  const handleDeleteSubtema = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/subtopics/${id}`, { method: "DELETE" });
      if (response.ok) {
        setSubtemasList((prev) => prev.filter((subtema) => subtema.id !== id));
      } else {
        console.error("Error al eliminar el subtema");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteSubtemaId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteSubtema = () => {
    if (deleteSubtemaId) {
      handleDeleteSubtema(deleteSubtemaId);
      setDeleteSubtemaId(null);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <main className="bg-gray-50">
      <SeparadorVerde />

      <SubtemaHeader
        titulo={currentSubtema.titulo}
        descripcion={currentSubtema.descripcion}
        imagen={currentSubtema.imagen}
        volverUrl="/niveles/nivel1/mate"
      />

      {session?.role === "admin" && (
        <AddButton text="Agregar Subtema" onClick={handleAddSubtema} />
      )}

      {isError ? (
        <DataMessage message={errorMessage} />
      ) : subtemasList.length === 0 ? (
        <EmptyContentMessage message={errorMessage || "No se ha creado contenido para este tema."} />
      ) : (
        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 mx-6 mb-10">
          {subtemasList.map((tema) => (
            <div key={tema.id} className="relative">
              <SubtemaCard
                title={tema.title}
                description={tema.description}
                link={`/niveles/nivel1/mate/${subtemas}/${tema.id}`}
                imgSrc={tema.img_url}
                buttonColor={currentSubtema.buttonColor}
                role={session?.role}
                onEdit={() => handleEditSubtema(tema)}
                onDelete={() => openDeleteModal(tema.id)}
              />
            </div>
          ))}
        </div>
      )}

      <SeparadorVerde />

      <SubtemasModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveSubtema}
        newSubtema={newSubtema}
        onInputChange={handleInputChange}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteSubtema}
      />
    </main>
  );
};

export default SubtemasPage;
