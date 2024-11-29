"use client";
import { useState, useEffect } from 'react';

export default function Carousel() {
    const items = [
        {
            image: '/img/carousel/img5.webp',
            title: 'Starly',
            description: 'Bienvenidos a mi galaxia',
        },
        {
            image: '/img/carousel/img4.webp',
            title: 'Planetas',
            description: 'Explora los planetas',
        },
        {
            image: '/img/carousel/img1.png',
            title: 'Juegos',
            description: 'Aprende jugando',
        },
        {
            image: '/img/carousel/img2.png',
            title: 'Juegos',
            description: 'Diviertete aprendiendo',
        },
        {
            image: '/img/carousel/img6.webp',
            title: 'Asignaturas',
            description: 'Conoce nuevos personajes',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!isModalOpen) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isModalOpen, items.length]);

    const selectSlide = (index) => {
        setCurrentIndex(index);
        setIsModalOpen(true);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Carrusel Pequeño */}
            <div className="flex flex-col items-center px-4 sm:px-8 lg:px-16 py-8 md:py-16">
                <div className="relative flex justify-center items-center space-x-2 md:space-x-4 w-full max-w-5xl overflow-hidden">
                    {items.map((item, index) => {
                        const distance = Math.abs(currentIndex - index);
                        const isCurrent = currentIndex === index;

                        // Configuración de borde y escala para la tarjeta seleccionada
                        const borderColor = isCurrent ? 'border-blue-500' : 'border-gray-300';
                        const borderThickness = 'border-2 md:border-4';
                        const scale = isCurrent ? 'scale-100' : 'scale-90';

                        return (
                            <button
                                key={index}
                                onClick={() => selectSlide(index)}
                                aria-label={`Seleccionar tarjeta ${index + 1}`}
                                className={`relative transition-transform transform ${scale} ${borderColor} ${borderThickness} cursor-pointer w-28 h-36 sm:w-32 sm:h-44 md:w-44 md:h-60 lg:w-52 lg:h-68 rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300`}
                                style={{
                                    zIndex: items.length - distance,
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="bottom-0 absolute bg-gradient-to-t from-black to-transparent p-4 w-full text-left text-white text-xs sm:text-sm">
                                    <h3 className="font-bold text-base sm:text-lg">{item.title}</h3>
                                    <p className="sm:block hidden">{item.description}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
                <div className="flex space-x-2 mt-4">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => selectSlide(index)}
                            aria-label={`Seleccionar punto ${index + 1}`}
                            className={`w-3 h-3 rounded-full cursor-pointer transition ${
                                index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
                            }`}
                        ></button>
                    ))}
                </div>
            </div>

            {/* Modal de Carrusel Ampliado */}
            {isModalOpen && (
                <div
                    id="modal-overlay"
                    className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 p-4"
                >
                    <button
                        onClick={closeModal}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-default"
                        aria-label="Cerrar modal"
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') closeModal();
                        }}
                    ></button>

                    <div className="relative z-50 flex justify-center items-center w-full max-w-2xl pointer-events-auto">
                        <button
                            onClick={prevSlide}
                            className="left-4 z-50 absolute focus:outline-none hover:opacity-70 transition"
                            style={{ background: 'none', border: 'none' }}
                        >
                            <img
                                src="/img/carousel/flecha_i.webp"
                                alt="Flecha izquierda"
                                className="w-6 sm:w-8 h-6 sm:h-8"
                            />
                        </button>

                        {/* Contenedor de la Tarjeta Ampliada con Borde */}
                        <div className="relative flex justify-center items-center border-4 shadow-lg p-2 md:p-0 border-blue-500 rounded-lg w-full max-w-md h-[50vh] md:h-[400px] overflow-hidden">
                            <img
                                src={items[currentIndex].image}
                                alt={items[currentIndex].title}
                                className="w-full h-full object-cover"
                            />
                            <div className="bottom-0 absolute bg-gradient-to-t from-black to-transparent p-4 w-full text-left text-white">
                                <h3 className="font-bold text-lg md:text-2xl">{items[currentIndex].title}</h3>
                                <p className="text-sm md:text-lg">{items[currentIndex].description}</p>
                            </div>
                        </div>

                        <button
                            onClick={nextSlide}
                            className="right-4 z-50 absolute focus:outline-none hover:opacity-70 transition"
                            style={{ background: 'none', border: 'none' }}
                        >
                            <img
                                src="/img/carousel/flecha_d.webp"
                                alt="Flecha derecha"
                                className="w-6 sm:w-8 h-6 sm:h-8"
                            />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
