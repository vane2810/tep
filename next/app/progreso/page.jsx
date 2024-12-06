// Componente el porogreso 
"use client";
import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import Volver from "@/components/elements/botonVolver";
import useSession from "@/hooks/useSession";
import Loading from "@/components/elements/loading";

const ProgressStatsPage = () => {
    const { session } = useSession(); // Obtener la sesión del usuario
    const [progressPercentage, setProgressPercentage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [progressRecords, setProgressRecords] = useState([]); // Estado para almacenar los registros individuales de progreso
    const [totalStars, setTotalStars] = useState(0); // Estado para almacenar las estrellas totales
    const [unlockedRewardsCount, setUnlockedRewardsCount] = useState(0); // Estado para la cantidad de recompensas desbloqueadas
    const [rank, setRank] = useState(""); // Estado para almacenar el rango del usuario
    const [currentRankImage, setCurrentRankImage] = useState(""); // Estado para la imagen del rango actual

    // Lista de rangos y recompensas
    const rankNames = ["Novato", "Aprendiz", "Experto", "Maestro", "Gran Maestro"];
    const rewardImages = [
        { imgSrc: "/img/progreso/mapa.jpg", name: "Mapa del Tesoro" },
        { imgSrc: "/img/progreso/tesoro.jpg", name: "Cofre del Tesoro" },
        { imgSrc: "/img/progreso/corona.jpg", name: "Corona Real" },
        { imgSrc: "/img/progreso/espada.jpg", name: "Espada Legendaria" },
    ];

    const rankImages = [
        { imgSrc: "/img/personajes/starly/starly2.webp", name: "Novato" },
        { imgSrc: "/img/personajes/starly/starly_mate.webp", name: "Aprendiz" },
        { imgSrc: "/img/personajes/starly/starly_lenguaje.webp", name: "Experto" },
        { imgSrc: "/img/personajes/starly/starly_ingles.webp", name: "Maestro" },
        { imgSrc: "/img/personajes/starly/starly_corona.webp", name: "Gran Maestro" },
    ];

    useEffect(() => {
        if (session?.user) {
            const fetchProgress = async () => {
                try {
                    // Solicitud para obtener todos los datos de progreso del usuario
                    const response = await fetch(`http://localhost:3001/api/progreso/user/${session.user}`);
                    if (response.ok) {
                        const data = await response.json();
                        console.log("Data recibida del servidor:", data);

                        // Asegurarse de que `data` sea un array
                        const progressArray = Array.isArray(data) ? data : [];

                        // Almacenar los registros de progreso individuales en el estado
                        setProgressRecords(progressArray);

                        // Filtrar solo los registros de progreso que tienen el estado "completado"
                        const completedRecords = progressArray.filter((record) => record.status === "completado");

                        // Calcular el porcentaje de juegos completados
                        const totalGames = progressArray.length;
                        const completedGames = completedRecords.length;
                        const progress = totalGames > 0 ? Math.round((completedGames / totalGames) * 100) : 0;

                        // Actualizar el estado del porcentaje de progreso
                        setProgressPercentage(progress);

                        // Calcular la cantidad total de estrellas
                        const totalScore = completedRecords.reduce((sum, record) => sum + (record.score || 0), 0);
                        setTotalStars(totalScore);

                        // Calcular cantidad de recompensas desbloqueadas: una recompensa por cada 10 juegos completados
                        const unlockedRewards = Math.floor(completedGames / 10);
                        setUnlockedRewardsCount(unlockedRewards);

                        // Calcular rango: sube de rango por cada 10 juegos completados
                        const rankIndex = Math.min(Math.floor(completedGames / 10), rankNames.length - 1);
                        setRank(rankNames[rankIndex]);
                        setCurrentRankImage(rankImages[rankIndex].imgSrc);
                    } else {
                        console.error("Error al obtener el progreso del usuario");
                    }
                } catch (error) {
                    console.error("Error de red al intentar obtener el progreso del usuario:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProgress();
        }
    }, [session?.user]);

    if (loading) {
        return <Loading />
    }

    return (
        <div className="flex flex-col items-center bg-gradient-to-br from-purple-300 via-blue-200 to-cyan-200 px-4 py-4 min-h-screen">

            {/* Botón de Volver */}
            <div className="w-full max-w-4xl">
                <Volver className="ml-0" />
            </div>

            {/* Encabezado con imagen */}
            <div className="flex flex-col items-center mb-6">
                <h1 className="mb-4 font-bold text-4xl text-purple-800 super">¡BIENVENIDO A TU PROGRESO!</h1>
                <img src="/img/progreso/progreso.webp" alt="Progreso" className="mb-4 w-60 h-60 animate__animated animate__bounceIn object-contain" />
            </div>

            {/* Contenedor de las pestañas */}
            <div className="bg-white shadow-2xl mb-8 p-8 rounded-3xl w-full max-w-4xl">
                <Tabs>
                    {/* Lista de pestañas principales */}
                    <TabList className="flex justify-center space-x-4 bg-gradient-to-br from-purple-300 via-blue-200 to-cyan-200 shadow-lg mb-8 p-2 rounded-full text-xl cursor-pointer wonder">
                        {["Seguimiento del Progreso", "Recompensas Especiales", "Rangos"].map((tabTitle, index) => (
                            <Tab
                                key={index}
                                className={({ selected }) =>
                                    `px-6 py-3 rounded-full cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 ${selected
                                        ? "bg-purple-700 text-white"
                                        : "text-white hover:bg-purple-600"
                                    }`
                                }
                            >
                                {tabTitle}
                            </Tab>
                        ))}
                    </TabList>

                    {/* Panel de Seguimiento del Progreso */}
                    <TabPanel>
                        <div className="bg-purple-50 shadow-lg p-6 rounded-2xl text-center">
                            <h2 className="mb-4 text-2xl text-purple-700 wonder">Progreso General</h2>
                            <div className="mb-6">
                                {/* Barra de Progreso */}
                                <div className="bg-gray-200 mb-4 rounded-full w-full h-6">
                                    <div
                                        className="bg-yellow-400 rounded-full h-6"
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                                <p className="text-purple-800 wonder">{progressPercentage}% de avance total</p>
                            </div>

                            {/* Tarjeta de Estrellas Totales */}
                            <div className="flex flex-col items-center mb-8">
                                <div className="flex items-center space-x-6 bg-yellow-50 shadow-lg p-6 rounded-2xl w-full max-w-sm">
                                    {/* Espacio para la imagen */}
                                    <div className="flex-shrink-0 w-24 h-24">
                                        <img src="/img/personajes/starly/starly_corona.webp" alt="Estrellas" className="w-full h-full object-contain" />
                                    </div>
                                    {/* Texto de Estrellas Totales */}
                                    <div className="flex flex-col justify-center">
                                        <h3 className="font-bold text-2xl text-yellow-600 wonder">Estrellas Totales</h3>
                                        <p className="font-bold text-4xl text-yellow-700 wonder">{totalStars}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Listado de juegos y progreso individual */}
                            <div className="mt-8 yagora">
                                <h3 className="mb-4 text-2xl text-purple-600 wonder">Detalles del Progreso por Juego</h3>
                                {progressRecords.length > 0 ? (
                                    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                                        {progressRecords.map((record, index) => (
                                            <div key={index} className="flex flex-col items-start bg-white shadow-md p-4 rounded-lg">
                                                <h4 className="mb-2 font-semibold text-lg">Juego: {record.game_id}</h4>
                                                <p className="mb-1 text-gray-700">Estado: <span className="font-bold text-green-700">{record.status === "completado" ? "Completado" : "En progreso"}</span></p>
                                                <p className="text-gray-700">Puntuación: <span className="font-bold text-yellow-500">{record.score ?? "No disponible"} Estrellas </span></p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600">No hay registros de progreso disponibles.</p>
                                )}
                            </div>
                        </div>
                    </TabPanel>

                    {/* Panel de Recompensas Especiales */}
                    <TabPanel>
                        <div className="bg-yellow-100 shadow-xl p-8 rounded-3xl text-center">
                            <h2 className="mb-4 font-bold text-3xl text-yellow-600 wonder">Recompensas Especiales</h2>
                            <div className="flex justify-center space-x-6 mt-6">
                                {rewardImages.map((reward, index) => (
                                    <div key={index} className="flex flex-col items-center w-40">
                                        <div className={`relative w-32 h-32 rounded-full overflow-hidden ${index < unlockedRewardsCount ? "" : "opacity-50 grayscale"}`}>
                                            <img src={reward.imgSrc} alt={reward.name} className="w-full h-full object-contain" />
                                            {index >= unlockedRewardsCount && (
                                                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 font-bold text-lg text-white wonder">
                                                    Bloqueado
                                                </div>
                                            )}
                                        </div>
                                        {index >= unlockedRewardsCount ? (
                                            <p className="mt-2 text-yellow-700 yagora">Completa {10 * (index + 1) - (progressRecords.filter(r => r.status === "completado").length)} juegos para desbloquear</p>
                                        ) : (
                                            <p className="mt-2 text-gray-800">{reward.name}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabPanel>

                    {/* Panel de Rangos */}
                    <TabPanel>
                        <div className="bg-pink-100 shadow-xl p-8 rounded-3xl text-center">
                            <h2 className="mb-4 font-bold text-3xl text-pink-600 wonder">Rangos y Clasificaciones</h2>
                            <div className="flex flex-col items-center">
                                <img src={currentRankImage} alt={rank} className="mb-4 w-40 h-40 object-contain" />
                                <p className="font-bold text-4xl text-pink-700 wonder">{rank}</p>
                                <p className="mt-4 text-gray-700 yagora">¡Sigue completando juegos para alcanzar el siguiente rango!</p>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default ProgressStatsPage;
