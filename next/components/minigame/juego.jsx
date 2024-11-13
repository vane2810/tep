"use client";
import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

const JuegoOpciones = () => {
    const gameContainerRef = useRef(null);

    useEffect(() => {
        // Configuración básica de Phaser
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            backgroundColor: "#87CEEB", // Color de fondo (cielo claro)
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
    }, []);

    // Función de precarga para cargar los recursos
    const preload = function () {
        this.load.image("option", "/img/juego/option.png"); // Cargar imagen de opción (debes tenerla en tu carpeta pública)
    };

    // Función para crear la escena
    const create = function () {
        const options = [
            { x: 150, y: 300, correct: false },
            { x: 400, y: 300, correct: true },
            { x: 650, y: 300, correct: false },
        ];

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
        });

        // Agregar un título al juego
        this.add.text(400, 100, "Selecciona la opción correcta", {
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
