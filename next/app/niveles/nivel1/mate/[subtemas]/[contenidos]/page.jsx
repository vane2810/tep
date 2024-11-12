// components/pages/ContenidoPage.jsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SubtemaContent from "@/components/templates/contents/contentHeader";
import { SeparadorVerde } from "@/components/separador";
import useSession from "@/hooks/useSession"; // Importar useSession para manejar la sesión del usuario
import AddButton from "@/components/elements/botonAdd";

const ContenidoPage = () => {
    const params = useParams();
    const { subtemas, contenidos } = params; // Obtener `subtemas` y `contenidos` desde los parámetros
    const { session } = useSession(); // Obtener la sesión actual
    const [subtemaData, setSubtemaData] = useState(null);
    const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos

    useEffect(() => {
        // Llamada para obtener los datos del subtema basados en el ID.
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
                setLoading(false); // Finalizar el estado de carga
            }
        };

        if (contenidos) {
            fetchSubtema();
        }
    }, [contenidos]);

    if (loading) {
        return <p>Cargando contenido...</p>;
    }

    if (!subtemaData) {
        return <p>No se pudo cargar el contenido.</p>;
    }

    // Función para manejar la apertura del modal para agregar un subtema (solo para admin)
    const handleAddSubtema = () => {
        console.log("Agregar subtema - Funcionalidad pendiente de implementar");
    };

    return (
        <main className="bg-gray-100">
            <SeparadorVerde />
            <SubtemaContent
                title={subtemaData.title}
                imgSrc={subtemaData.img_url}
            />

            {/* Mostrar botón para agregar subtema solo si el usuario tiene el rol de "admin" */}
            {session?.role === "admin" && (
                <AddButton text="Agregar Contenido" onClick={handleAddSubtema} />
                
            )}
            <SeparadorVerde />
        </main>
    );
};

export default ContenidoPage;
