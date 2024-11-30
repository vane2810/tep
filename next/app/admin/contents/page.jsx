"use client"
import React from 'react';
import Link from 'next/link';
import { FaChalkboardTeacher, FaLanguage, FaGlobeAmericas, FaBook, FaVideo, FaLayerGroup, FaAngleRight } from 'react-icons/fa';
import Volver from '@/components/elements/botonVolver';
import { SeparadorAzul } from '@/components/separador';
import useSession from '@/hooks/useSession';
import MensajePermiso from '@/components/menssages/mensajePermiso';

export default function ContenidosPage() {
  const { session } = useSession(); 

  

  const niveles = [
    {
      id: 'nivel1',
      nombre: 'Nivel 1',
      color: 'bg-blue-500 hover:bg-blue-600',
      materias: [
        {
          nombre: 'Matemáticas',
          icon: FaChalkboardTeacher,
          link: '/niveles/nivel1/mate',
          temas: [
            { nombre: 'Operaciones Básicas', link: '/niveles/nivel1/matematicas/ob' },
            { nombre: 'Decimales', link: '/niveles/nivel1/matematicas/decimales' },
            { nombre: 'Geometría', link: '/niveles/nivel1/matematicas/geometria' },
          ],
        },
        {
          nombre: 'Lenguaje',
          icon: FaLanguage,
          link: '/niveles/nivel1/lenguaje',
          temas: [
            { nombre: 'Ortografía', link: '/niveles/nivel1/lenguaje/ortografia' },
            { nombre: 'Gramática', link: '/niveles/nivel1/lenguaje/gramatica' },
            { nombre: 'Géneros Literarios', link: '/niveles/nivel1/lenguaje/generos_literarios' },
            { nombre: 'Lectura', link: '/niveles/nivel1/lenguaje/lectura' },
          ],
        },
        {
          nombre: 'Sociales',
          icon: FaGlobeAmericas,
          link: '/niveles/nivel1/sociales',
          temas: [
            { nombre: 'Belice', link: '/niveles/nivel1/sociales/belice' },
            { nombre: 'Guatemala', link: '/niveles/nivel1/sociales/guatemala' },
            { nombre: 'Honduras', link: '/niveles/nivel1/sociales/honduras' },
            { nombre: 'El Salvador', link: '/niveles/nivel1/sociales/el_salvador' },
            { nombre: 'Nicaragua', link: '/niveles/nivel1/sociales/nicaragua' },
            { nombre: 'Consta Rica', link: '/niveles/nivel1/sociales/costa_rica' },
            { nombre: 'Panamá', link: '/niveles/nivel1/sociales/panama' },
          ],
        },
        {
          nombre: 'Inglés',
          icon: FaBook,
          link: '/niveles/nivel1/ingles',
          temas: [
            { nombre: 'Vocabulario', link: '/niveles/nivel1/ingles/vocabulary' },
            { nombre: 'Gramatica', link: '/niveles/nivel1/ingles/grammar' },
          ],
        },
      ],
      multimedia: '/niveles/nivel1/multimedia',
    },
    {
      id: 'nivel2',
      nombre: 'Nivel 2',
      color: 'bg-green-500 hover:bg-green-600',
      materias: [
        {
          nombre: 'Matemáticas',
          icon: FaChalkboardTeacher,
          link: '/niveles/nivel2/mate',
          temas: [
            { nombre: 'Operaciones Básicas', link: '/niveles/nivel2/matematicas/ob' },
            { nombre: 'Decimales', link: '/niveles/nivel2/matematicas/decimales' },
            { nombre: 'Geometría', link: '/niveles/nivel2/matematicas/geometria' },
          ],
        },
        {
          nombre: 'Lenguaje',
          icon: FaLanguage,
          link: '/niveles/nivel2/lenguaje',
          temas: [
            { nombre: 'Ortografía', link: '/niveles/nivel2/lenguaje/ortografia' },
            { nombre: 'Gramática', link: '/niveles/nivel2/lenguaje/gramatica' },
            { nombre: 'Géneros Literarios', link: '/niveles/nivel2/lenguaje/generos_literarios' },
            { nombre: 'Lectura', link: '/niveles/nivel2/lenguaje/lectura' },
          ],
        },
        {
          nombre: 'Sociales',
          icon: FaGlobeAmericas,
          link: '/niveles/nivel2/sociales',
          temas: [
            { nombre: 'Norte America', link: '/niveles/nivel2/sociales/norte_america' },
            { nombre: 'Centro America', link: '/niveles/nivel2/sociales/centro_america' },
            { nombre: 'Sur America', link: '/niveles/nivel2/sociales/sur_america' },
          ],
        },
        {
          nombre: 'Inglés',
          icon: FaBook,
          link: '/niveles/nivel2/ingles',
          temas: [
            { nombre: 'Vocabulario', link: '/niveles/nivel2/ingles/vocabulary' },
            { nombre: 'Gramatica', link: '/niveles/nivel2/ingles/grammar' },
          ],
        },
      ],
      multimedia: '/niveles/nivel2/multimedia',
    },
    {
      id: 'nivel3',
      nombre: 'Nivel 3',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      materias: [
        {
          nombre: 'Matemáticas',
          icon: FaChalkboardTeacher,
          link: '/niveles/nivel3/mate',
          temas: [
            { nombre: 'Operaciones Básicas', link: '/niveles/nivel3/matematicas/ob' },
            { nombre: 'Decimales', link: '/niveles/nivel3/matematicas/decimales' },
            { nombre: 'Geometría', link: '/niveles/nivel3/matematicas/geometria' },
          ],
        },
        {
          nombre: 'Lenguaje',
          icon: FaLanguage,
          link: '/niveles/nivel3/lenguaje',
          temas: [
            { nombre: 'Ortografía', link: '/niveles/nivel3/lenguaje/ortografia' },
            { nombre: 'Gramática', link: '/niveles/nivel3/lenguaje/gramatica' },
            { nombre: 'Géneros Literarios', link: '/niveles/nivel3/lenguaje/generos_literarios' },
            { nombre: 'Lectura', link: '/niveles/nivel3/lenguaje/lectura' },
          ],
        },
        {
          nombre: 'Sociales',
          icon: FaGlobeAmericas,
          link: '/niveles/nivel3/sociales',
          temas: [
            { nombre: 'África', link: '/niveles/nivel3/sociales/africa' },
            { nombre: 'Asia', link: '/niveles/nivel3/sociales/asia' },
            { nombre: 'Ámerica', link: '/niveles/nivel3/sociales/america' },
            { nombre: 'Europa', link: '/niveles/nivel3/sociales/europa' },
            { nombre: 'Oceanía', link: '/niveles/nivel3/sociales/oceania' },
          ],
        },
        {
          nombre: 'Inglés',
          icon: FaBook,
          link: '/niveles/nivel3/ingles',
          temas: [
            { nombre: 'Vocabulario', link: '/niveles/nivel3/ingles/vocabulary' },
            { nombre: 'Gramatica', link: '/niveles/nivel3/ingles/grammar' },
          ],
        },
      ],
      multimedia: '/niveles/nivel3/multimedia',
    },
  ];

  // Verificar si el usuario tiene permiso para acceder
  if (!session || session.role !== 'admin') {
    return <MensajePermiso />;
  }

  return (
    <main className="flex flex-col bg-gray-50 min-h-screen yagora">
      <SeparadorAzul />
      {/* Botón de Volver */}
      <div className="ml-4">
        <Volver href='/admin' />
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col justify-center items-center mb-14 px-4">
        <div className="flex items-center mb-8">
          <FaLayerGroup className="mr-4 text-5xl text-blue-600" />
          <h1 className="font-semibold text-4xl">Seleccione el Nivel</h1>
        </div>
        <p className="mb-8 text-gray-900 text-xl">Navega directamente al contenido a administrar</p>

        {/* Niveles */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
          {niveles.map((nivel) => (
            <div key={nivel.id} className="bg-white shadow-md p-6 rounded-xl">
              {/* Nivel */}
              <Link href={`/niveles/${nivel.id}`} passHref>
                <div
                  className={`${nivel.color} text-center text-white rounded-lg py-4 mb-4 font-bold text-2xl transform hover:scale-105 transition-all cursor-pointer`}
                >
                  {nivel.nombre}
                </div>
              </Link>

              {/* Multimedia */}
              <Link href={nivel.multimedia} passHref>
                <div className="flex justify-center items-center bg-purple-500 hover:bg-purple-600 mb-4 p-3 rounded-lg text-white transition-all duration-300 cursor-pointer">
                  <FaVideo className="mr-3 text-xl" />
                  <span className="font-semibold">Multimedia</span>
                </div>
              </Link>

              {/* Materias */}
              <div className="space-y-4">
                {nivel.materias.map((materia) => (
                  <div key={materia.nombre} className="bg-gray-100 shadow-inner p-4 rounded-lg">
                    <Link href={materia.link} passHref>
                      <div className="flex items-center hover:bg-gray-200 p-3 rounded-lg transition-all duration-300 cursor-pointer">
                        <materia.icon className="mr-2 text-blue-500 text-xl" />
                        <span className="font-semibold text-lg">{materia.nombre}</span>
                      </div>
                    </Link>

                    {/* Temas */}
                    <div className="space-y-2 mt-2 pl-4">
                      {materia.temas.map((tema) => (
                        <Link key={tema.nombre} href={tema.link} passHref>
                          <div className="flex items-center hover:bg-gray-300 p-2 rounded-lg transition-all duration-300 cursor-pointer">
                            <FaAngleRight className="mr-2 text-gray-500" />
                            <span className="text-md">{tema.nombre}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <SeparadorAzul />
    </main>
  );
}
