"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Application } from 'pixi.js';

const SumGame = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [score, setScore] = useState(0);
  const gameContainerRef = useRef(null);
  const pixiContainerRef = useRef(null);

  useEffect(() => {
    // Crear el lienzo PixiJS
    const app = new Application({ width: 800, height: 600 });
    if (pixiContainerRef.current) {
      pixiContainerRef.current.appendChild(app.view);
    }

    // Generar la primera pregunta
    generateQuestion();

    // Limpiar el lienzo al desmontar
    return () => {
      app.destroy(true);
    };
  }, []);

  // Generar una nueva pregunta
  const generateQuestion = () => {
    const newNum1 = Math.floor(Math.random() * 10) + 1;
    const newNum2 = Math.floor(Math.random() * 10) + 1;
    setNum1(newNum1);
    setNum2(newNum2);
    setCorrectAnswer(newNum1 + newNum2);
    setAnswer('');
  };

  // Manejar el cambio en la entrada de respuesta
  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  // Verificar la respuesta ingresada por el usuario
  const checkAnswer = () => {
    if (parseInt(answer) === correctAnswer) {
      setScore(score + 1);
    }
    generateQuestion();
  };

  return (
    <div>
      <h1>Juego de Sumas</h1>
      <div ref={gameContainerRef}>
        <div ref={pixiContainerRef}></div>
      </div>
      <p>Pregunta: {num1} + {num2} = ?</p>
      <input type="text" value={answer} onChange={handleChange} />
      <button onClick={checkAnswer}>Comprobar</button>
      <p>Puntuación: {score}</p>
    </div>
  );
};

export default SumGame;


