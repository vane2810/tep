//Carusel
"use client";
import { useState, useEffect } from 'react';

export default function SimpleCarousel() {
    const images = [
        '/img/carousel/img5.webp',
        '/img/carousel/img4.webp',
        '/img/carousel/img6.webp',
        '/img/carousel/img7.webp',
        '/img/carousel/img1.png',
        '/img/carousel/img2.png',
        '/img/carousel/img3.png',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 2 : (prevIndex - 2 + images.length) % images.length
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + 2) % images.length
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    // Calcula los índices de las dos imágenes actuales
    const getVisibleImages = () => {
        const nextIndex = (currentIndex + 1) % images.length;
        return [images[currentIndex], images[nextIndex]];
    };

    const visibleImages = getVisibleImages();

    return (
        <div className="relative flex justify-center items-center bg-white py-4">
            <div className="w-96 h-60 md:w-[36rem] md:h-72 flex justify-center items-center bg-white shadow-lg rounded-lg overflow-hidden relative">
                {visibleImages.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Slide ${currentIndex + index + 1}`}
                        className="w-1/2 h-full object-contain"
                    />
                ))}

                <button
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md border border-gray-300 focus:outline-none z-10"
                    onClick={prevSlide}
                >
                    <svg
                        className="w-6 h-6 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md border border-gray-300 focus:outline-none z-10"
                    onClick={nextSlide}
                >
                    <svg
                        className="w-6 h-6 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
