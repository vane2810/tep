"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";
import SubtemaHeader from "@/components/templates/subtopics/inglesHeader";
import SubtemaCard from "@/components/templates/subtopics/subtemasCards1";
import SubtemasModal from "@/components/modals/admin/contenido/subtemasModal";
import DeleteModal from "@/components/modals/admin/contenido/deleteModal";
import { SeparadorAnaranjado } from "@/components/separador";
import useSession from "@/hooks/useSession";
import AddButton from "@/components/elements/botonAdd";
import NoExiste from "@/components/menssages/mensajeNoExiste";

// Definir los datos de subtemas al inicio
const subtemasData = {
  vocabulary: {
    id: 41,
    title: "Vocabulary",
    titulo: "Vocabulario",
    descripcion: "Aprende nuevas palabras en un idioma nuevo, fortaleciendo también el vocabulario de tu idioma natal",
    imagen: "/img/materias/ingles/vocabulary.webp",
    buttonColor: "anaranjado",
  },
  grammar: {
    id: 42,
    title: "Grammar",
    titulo: "Gramática",
    descripcion: "Descubre la estructura de otros idiomas con temas de gramática y sintaxis. Aprende a construir oraciones correctamente y a usar las palabras adecuadas en cada contexto.",
    imagen: "/img/materias/ingles/gramatica.webp",
    buttonColor: "anaranjado",
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

  // Obtener los datos del subtema actual
  const currentSubtema = subtemasData[subtemas];
  if (!currentSubtema) {
    console.error("Tema no encontrado");
    return <NoExiste />
  }

  const currentTopicId = currentSubtema.id;

  // Definir `fetchSubtemas` como una función reutilizable
  const fetchSubtemas = async () => {
    if (currentTopicId) {
      try {
        const response = await fetch(`http://localhost:3001/api/subtopics/byTopic/${currentTopicId}`);
        if (response.ok) {
          const data = await response.json();
          setSubtemasList(data);
        } else {
          console.error("Error al obtener los subtemas");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    }
  };

  // Obtener los subtemas por topicId al montar el componente
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
        fetchSubtemas(); // Vuelve a cargar los subtemas después de guardar uno nuevo
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
      imgSrc: subtema.img_url || "", // Asegúrate de que imgSrc sea un string vacío si no existe la URL
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
    <PrivateRoute>
      <main className="bg-gray-50">
        <SeparadorAnaranjado />

        <SubtemaHeader
          titulo={currentSubtema.title}
          subtitulo={currentSubtema.titulo}
          descripcion={currentSubtema.descripcion}
          imagen={currentSubtema.imagen}
          volverUrl="/niveles/nivel1/ingles"
        />

        {session?.role === "admin" && (
          <AddButton text="Agregar Subtema" onClick={handleAddSubtema} />
        )}

        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 mx-6 mb-10">
          {subtemasList.map((tema) => (
            <div key={tema.id} className="relative">
              <SubtemaCard
                title={tema.title}
                description={tema.description}
                link={`/niveles/nivel1/ingles/${subtemas}/${tema.id}`}
                imgSrc={tema.img_url}
                buttonColor={currentSubtema.buttonColor}
                role={session?.role}
                onEdit={() => handleEditSubtema(tema)}
                onDelete={() => openDeleteModal(tema.id)}
              />
            </div>
          ))}
        </div>

        <SeparadorAnaranjado />

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
    </PrivateRoute>
  );
};

export default SubtemasPage;