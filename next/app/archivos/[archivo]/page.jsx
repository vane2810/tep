"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Volver from "@/components/botonVolver";

export default function ArchivoDetallePage() {
    const params = useParams(); 
    const archivo = params?.archivo; 

    const [contenido, setContenido] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (archivo) {
            const fetchContenido = async () => {
                try {
                    // Verificar que la ruta sea correcta
                    const res = await fetch(`/assets/materias/lenguaje/nivel1/${archivo}`);
                    if (!res.ok) throw new Error("Error al cargar el contenido del archivo.");

                    // Distinguir si es un archivo de texto o JSON
                    let data;
                    if (archivo.endsWith(".json")) {
                        data = await res.json();
                    } else {
                        data = await res.text();
                    }
                    setContenido(data);
                } catch (error) {
                    console.error("Error al cargar el archivo:", error);
                    setContenido(null);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchContenido();
        }
    }, [archivo]);

    if (isLoading) {
        return <div>Cargando contenido del archivo...</div>;
    }

    if (!contenido) {
        return <div>No se encontró el contenido del archivo.</div>;
    }

    return (
        <div className="mx-auto p-8 container">
            <Volver href='/admin/contents' />
            <h1 className="mb-8 font-bold text-2xl">Detalle del Contenido del Archivo</h1>
            <div className="border-gray-300 bg-gray-100 mt-8 p-4 border rounded">
                <h2 className="mb-4 font-bold text-xl">Contenido del Archivo:</h2>
                {typeof contenido === "object" ? (
                    <pre className="text-gray-800 text-sm">{JSON.stringify(contenido, null, 2)}</pre>
                ) : (
                    <p className="text-gray-800 text-sm whitespace-pre-wrap">{contenido}</p>
                )}
            </div>
        </div>
    );
}
