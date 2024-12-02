"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";
import SubtemaHeader from "@/components/templates/subtopics/socialesHeader";
import SubtemaCard from "@/components/templates/subtopics/subtemasCards1";
import SubtemasModal from "@/components/modals/admin/contenido/subtemasModal";
import DeleteModal from "@/components/modals/admin/contenido/deleteModal";
import { SeparadorAzul } from "@/components/separador";
import useSession from "@/hooks/useSession";
import AddButton from "@/components/elements/botonAdd";
import NoExiste from "@/components/menssages/mensajeNoExiste";

// Definir los datos de subtemas al inicio
const subtemasData = {
  belice: {
    id: 22,
    titulo: "Belice",
    descripcion: "Vamos a explorar Belice para conocer sus culturas, tradiciones y costumbres. Un país diverso con una mezcla de influencias caribeñas, mayas y europeas, que lo convierten en un lugar único con una rica herencia cultural.",
    imagen: "/img/materias/sociales/belice.webp",
    buttonColor: "azul",
  },
  guatemala: {
    id: 23,
    titulo: "Guatemala",
    descripcion: "Vamos a explorar Guatemala para conocer sus culturas, tradiciones y costumbres. Con una rica herencia maya y una fuerte conexión con la naturaleza, este país ofrece una visión única de las tradiciones indígenas y coloniales.",
    imagen: "/img/materias/sociales/guatemala.webp",
    buttonColor: "azul",
  },
  honduras: {
    id: 24,
    titulo: "Honduras",
    descripcion: "Vamos a explorar Honduras para conocer sus culturas, tradiciones y costumbres. Con una historia marcada por las culturas lenca y garífuna, Honduras ofrece una rica tradición de música, danza y arte que refleja su diversidad.",
    imagen: "/img/materias/sociales/honduras.webp",
    buttonColor: "azul",
  },
  el_salvador: {
    id: 25,
    titulo: "El Salvador",
    descripcion: "Vamos a explorar El Salvador para conocer sus culturas, tradiciones y costumbres. Con una rica historia de resistencia y resiliencia, el país tiene tradiciones culinarias, artísticas y festivas que reflejan su identidad única.",
    imagen: "/img/materias/sociales/el_salvador.webp",
    buttonColor: "azul",
  },
  nicaragua: {
    id: 26,
    titulo: "Nicaragua",
    descripcion: "Vamos a explorar Nicaragua para conocer sus culturas, tradiciones y costumbres. Este país es conocido por su biodiversidad, sus tradiciones indígenas y afrodescendientes, y su espíritu cálido y hospitalario.",
    imagen: "/img/materias/sociales/nicaragua.webp",
    buttonColor: "azul",
  },
  costa_rica: {
    id: 27,
    titulo: "Costa Rica",
    descripcion: "Vamos a explorar Costa Rica para conocer sus culturas, tradiciones y costumbres. Conocido por su amor por la naturaleza y su enfoque en la sostenibilidad, Costa Rica es un país de tradiciones vivas y una rica cultura popular.",
    imagen: "/img/materias/sociales/costa_rica.webp",
    buttonColor: "azul",
  },
  panama: {
    id: 28,
    titulo: "Panamá",
    descripcion: "Vamos a explorar Panamá para conocer sus culturas, tradiciones y costumbres. Con su famosa historia del Canal, Panamá es un crisol de culturas que mezcla influencias indígenas, afrodescendientes y europeas, creando una identidad única.",
    imagen: "/img/materias/sociales/panama.webp",
    buttonColor: "azul",
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
        <SeparadorAzul />

        <SubtemaHeader
          titulo={currentSubtema.titulo}
          descripcion={currentSubtema.descripcion}
          imagen={currentSubtema.imagen}
          volverUrl="/niveles/nivel1/sociales"
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
                link={`/niveles/nivel1/lenguaje/${subtemas}/${tema.id}`}
                imgSrc={tema.img_url}
                buttonColor={currentSubtema.buttonColor}
                role={session?.role}
                onEdit={() => handleEditSubtema(tema)}
                onDelete={() => openDeleteModal(tema.id)}
              />
            </div>
          ))}
        </div>

        <SeparadorAzul />

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