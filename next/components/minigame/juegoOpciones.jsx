"use client";
import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";

const JuegoOpciones = ({ gameDetailId }) => {
    const gameContainerRef = useRef(null);
    const [gameData, setGameData] = useState(null);

    useEffect(() => {
        // Fetch para obtener los datos del juego
        const fetchGameDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/gameDetails/${gameDetailId}`);
                if (response.ok) {
                    const data = await response.json();
                    setGameData(data);
                } else {
                    console.error("Error al obtener los detalles del juego:", response.statusText);
                }
            } catch (error) {
                console.error("Error al realizar la solicitud:", error);
            }
        };

        fetchGameDetails();
    }, [gameDetailId]);

    useEffect(() => {
        if (!gameData) return;

        // Configuración básica de Phaser
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            backgroundColor: "#87CEEB",
            parent: gameContainerRef.current,
            scene: {
                preload: preload,
                create: create,
                update: update,
            },
        };

        // Crear una nueva instancia del juego de Phaser
        const game = new Phaser.Game(config);

        // Limpiar la instancia del juego al desmontar el componente
        return () => {
            game.destroy(true);
        };
    }, [gameData]);

    // Función de precarga para cargar los recursos
    const preload = function () {
        this.load.image("option", "/img/juego/option.png");
    };

    // Función para crear la escena
    const create = function () {
        const options = gameData.questions.map((question, index) => ({
            x: 150 + index * 250,
            y: 300,
            correct: question.correct,
            text: question.text,
        }));

        // Crear las opciones con una iteración
        options.forEach((option) => {
            const button = this.add.image(option.x, option.y, "option").setInteractive();

            // Cambiar el tamaño de la imagen para hacerlo más atractivo
            button.setScale(0.5);

            // Al hacer clic en la opción, verificamos si es correcta o incorrecta
            button.on("pointerdown", () => {
                if (option.correct) {
                    this.add.text(400, 500, "¡Correcto!", {
                        fontSize: "32px",
                        fill: "#28A745",
                        fontFamily: "Arial",
                    }).setOrigin(0.5);
                } else {
                    this.add.text(400, 500, "Inténtalo de nuevo", {
                        fontSize: "32px",
                        fill: "#FF5733",
                        fontFamily: "Arial",
                    }).setOrigin(0.5);
                }
            });

            // Efecto visual al pasar el ratón sobre la opción
            button.on("pointerover", () => {
                button.setScale(0.6);
            });
            button.on("pointerout", () => {
                button.setScale(0.5);
            });

            // Agregar texto sobre la opción
            this.add.text(option.x, option.y + 50, option.text, {
                fontSize: "20px",
                fill: "#000",
                fontFamily: "Arial",
            }).setOrigin(0.5);
        });

        // Agregar un título al juego
        this.add.text(400, 100, gameData.title, {
            fontSize: "40px",
            fill: "#ffffff",
            fontFamily: "Arial",
        }).setOrigin(0.5);
    };

    // La función de actualización para el bucle del juego
    const update = function () {
        // Aquí puedes incluir lógica de animación, pero este juego no la necesita
    };

    return (
        <div>
            {/* Contenedor para Phaser */}
            <div ref={gameContainerRef} />
        </div>
    );
};

export default JuegoOpciones;
