"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import useSession from '@/hooks/useSession';
import Loading from '@/components/elements/loading';
import Volver from '@/components/elements/botonVolver';
import { SeparadorVerde } from '@/components/separador';
import { FiStar } from 'react-icons/fi';
import PrivateRoute from '@/components/PrivateRoute';
import EmptyContentMessage from '@/components/menssages/mensajeVacio';

const StudentProgressPage = () => {
  const { id } = useParams(); 
  const { session } = useSession();
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id && session?.user) {
      // Simulación de datos de progreso
      const simulatedProgressData = {
        student: {
          name: "Prueba",
          lastname: "-",
        },
        progressPercentage: 75,
        games: [
          { id: 1, name: "Juego de Matemáticas", status: "Completado", score: 5 },
          { id: 2, name: "Juego de Lenguaje", status: "Completado", score: 4 },
          { id: 3, name: "Juego de Sociales", status: "No Completado", score: 3 },
          { id: 4, name: "Juego de Inglés", status: "Completado", score: 4 },
        ],
      };
      setProgressData(simulatedProgressData);
      setLoading(false);
    }
  }, [id, session?.user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <PrivateRoute>
      <main>
        <SeparadorVerde />
        <div className="bg-white shadow-lg mx-auto my-20 mt-8 p-10 rounded-lg w-full max-w-5xl yagora">
          <div className="flex flex-col items-center mb-8">
            <div className="flex justify-between items-center w-full">
              <Volver img='/img/home/regresar/verde.webp' href='/docente' className="mb-4" />
              <h2 className="flex-grow font-bold text-3xl text-center text-green-800 super">PROGRESO DEL ESTUDIANTE</h2>
            </div>
            <img src="/img/progreso/progreso.webp" alt="Estudiante" className="mb-6 w-60 h-60 object-contain" />
            <h3 className="mb-4 font-bold text-2xl text-center text-green-700">
              {progressData?.student?.name} {progressData?.student?.lastname}
            </h3>
          </div>

          {message && (
            <div className="bg-red-100 mb-6 p-4 border border-red-400 rounded-lg text-center text-red-700">
              {message}
            </div>
          )}

          {progressData ? (
            <div className="flex flex-col items-center w-full">
              <h3 className="mb-6 font-bold text-3xl text-green-700">Progreso General</h3>
              <div className="relative bg-gray-300 shadow-md mb-12 rounded-full w-full h-10 overflow-hidden">
                <div
                  className="top-0 left-0 absolute bg-gradient-to-r from-green-400 to-green-600 rounded-full h-full transition-all duration-500 ease-in-out"
                  style={{ width: `${progressData.progressPercentage || 0}%` }}
                />
                <span className="top-1/2 left-1/2 absolute font-bold text-green-900 text-lg transform -translate-x-1/2 -translate-y-1/2">
                  {progressData.progressPercentage || 0}% Completado
                </span>
              </div>

              <SeparadorVerde />

              <h3 className="mt-12 mb-6 font-bold text-3xl text-green-700">Juegos Completados</h3>
              <div className="w-full">
                {progressData.games && progressData.games.length > 0 ? (
                  <ul className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
                    {progressData.games.map((game) => (
                      <li key={game.id} className="flex flex-col justify-between border-green-100 hover:border-green-300 bg-white shadow-lg p-6 border rounded-xl transform transition-all duration-200 hover:scale-105">
                        <div>
                          <h4 className="mb-4 font-bold text-green-800 text-xl">{game.name}</h4>
                          <p className="text-gray-600 text-lg">
                            Estado: <span className={`font-semibold ${game.status === 'Completado' ? 'text-green-600' : 'text-red-600'}`}>
                              {game.status}
                            </span>
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-6">
                          <div className="flex items-center">
                            <FiStar className="mr-2 text-2xl text-yellow-500" />
                            <span className="font-bold text-gray-800 text-lg">{game.score} Estrellas</span>
                          </div>
                          <span className={`text-sm font-bold px-4 py-2 rounded-full shadow-md ${game.status === 'Completado' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                            {game.status}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-gray-600">No hay juegos completados para este estudiante</p>
                )}
              </div>
            </div>
          ) : (
            <EmptyContentMessage />
          )}
        </div>
        <SeparadorVerde />
      </main>
    </PrivateRoute>
  );
};

export default StudentProgressPage;

  