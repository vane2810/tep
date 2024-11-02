// Carousel.jsx
"use client";
import { useState, useEffect } from 'react';

export default function AutoCarousel() {
    const items = [
        {
            image: '/img/carousel/img5.png',
            title: 'Naturaleza 1',
            description: 'Disfruta de la paz y serenidad de la naturaleza.',
        },
        {
            image: '/img/carousel/img4.png',
            title: 'Naturaleza 2',
            description: 'Explora lugares tranquilos y llenos de vida.',
        },
        {
            image: '/img/carousel/img1.png',
            title: 'Naturaleza 3',
            description: 'Encuentra tu calma entre los árboles y el aire fresco.',
        },
        {
            image: '/img/carousel/gojo.png',
            title: 'Naturaleza 4',
            description: 'Conéctate con la naturaleza y siéntete libre.',
        },
        {
            image: '/img/carousel/img6.png',
            title: 'Naturaleza 5',
            description: 'Experimenta la belleza de la naturaleza.',
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
            <div className="flex flex-col items-center py-8 md:py-16">
                <div className="relative flex items-center justify-center space-x-2 md:space-x-4 overflow-hidden">
                    {items.map((item, index) => {
                        const distance = Math.abs(currentIndex - index);
                        
                        // Configuración de borde: grosor y color
                        const borderColor = distance === 0 ? 'border-blue-500' : 'border-gray-300';
                        const borderThickness = 'border-4'; // Cambia esto a "border-2" o "border-8" según el grosor deseado
                        
                        let scale;
                        if (distance === 0) {
                            scale = 'scale-100';
                        } else if (distance === 1) {
                            scale = 'scale-90';
                        } else {
                            scale = 'scale-75';
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => selectSlide(index)}
                                aria-label={`Seleccionar tarjeta ${index + 1}`}
                                className={`relative transition-transform transform ${scale} ${borderColor} ${borderThickness} cursor-pointer w-44 h-64 md:w-56 md:h-72 lg:w-72 lg:h-96 rounded-xl shadow-lg overflow-hidden flex flex-col`}
                                style={{
                                    transition: 'transform 0.5s ease, opacity 0.5s ease',
                                    zIndex: items.length - distance,
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-left text-white">
                                    <h3 className="text-lg font-bold">{item.title}</h3>
                                    <p className="text-sm">{item.description}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
                <div className="flex space-x-1 md:space-x-2 mt-4 md:mt-6">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => selectSlide(index)}
                            aria-label={`Seleccionar punto ${index + 1}`}
                            className={`w-2 h-2 md:w-3 md:h-3 rounded-full cursor-pointer transition ${
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
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                >
                    <button
                        onClick={closeModal}
                        className="absolute inset-0 w-full h-full cursor-default opacity-0"
                        aria-label="Cerrar modal"
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') closeModal();
                        }}
                    ></button>

                    <div className="relative w-full max-w-3xl flex items-center justify-center z-50 pointer-events-auto">
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 z-50 focus:outline-none hover:opacity-70 transition"
                            style={{ background: 'none', border: 'none' }}
                        >
                            <img
                                src="/img/carousel/flecha_i.png"
                                alt="Flecha izquierda"
                                className="w-8 h-8 md:w-10 md:h-10"
                            />
                        </button>

                        {/* Contenedor de la Tarjeta Ampliada con Borde */}
                        <div className="w-full h-96 md:h-[500px] relative flex justify-center items-center rounded-lg shadow-lg overflow-hidden border-4 border-blue-500">
                            <img
                                src={items[currentIndex].image}
                                alt={items[currentIndex].title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-left text-white">
                                <h3 className="text-2xl font-bold">{items[currentIndex].title}</h3>
                                <p className="text-lg">{items[currentIndex].description}</p>
                            </div>
                        </div>

                        <button
                            onClick={nextSlide}
                            className="absolute right-4 z-50 focus:outline-none hover:opacity-70 transition"
                            style={{ background: 'none', border: 'none' }}
                        >
                            <img
                                src="/img/carousel/flecha_d.png"
                                alt="Flecha derecha"
                                className="w-8 h-8 md:w-10 md:h-10"
                            />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
