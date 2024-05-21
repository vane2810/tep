import React, { useEffect } from 'react';
import Phaser from 'phaser';

const Game1 = () => {
    useEffect(() => {
        // Verifica si estamos en el cliente antes de ejecutar código que depende de useEffect
        if (typeof window !== 'undefined') {
            // Código de inicialización del juego de Phaser
            const config = {
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                scene: {
                    create: function () {
                        // Aquí puedes agregar cualquier código de inicialización del juego
                    },
                },
            };

            // Crear el juego de Phaser
            new Phaser.Game(config);
        }
    }, []);

    return <div id="game-container"></div>;
};

export default Game1;
