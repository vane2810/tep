"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';

const questions = [
  {
    question: "¿Cuál es el planeta más cercano al sol?",
    options: ["Mercurio", "Venus", "Tierra", "Marte"],
    answer: "Mercurio",
    image: "/assets/mercury.png"
  },
  {
    question: "¿Cuál es el planeta más grande del sistema solar?",
    options: ["Júpiter", "Saturno", "Urano", "Neptuno"],
    answer: "Júpiter",
    image: "/assets/jupiter.png"
  }
];

const Home = () => {
  const [showGame, setShowGame] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handlePlay = () => {
    setShowInstructions(false);
    setShowRanking(false);
    setShowResult(false);
    setShowGame(true);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleRanking = () => {
    setShowInstructions(false);
    setShowGame(false);
    setShowResult(false);
    setShowRanking(true);
  };

  const handleInstructions = () => {
    setShowGame(false);
    setShowRanking(false);
    setShowResult(false);
    setShowInstructions(true);
  };

  const handleAnswerClick = (option) => {
    if (option === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
      setShowGame(false);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Aventura Espacial</title>
      </Head>
      <img src="/assets/logo.png" alt="Logo" className="logo" />
      <img src="/assets/background.png" alt="Background" className="background" />
      <div className="content">
        <img src="/assets/pocoyo.png" alt="Pocoyo" className="character" />
        <div className="buttons">
          <button onClick={handlePlay}>Play</button>
          <button onClick={handleRanking}>Ranking</button>
          <button onClick={handleInstructions}>Instrucciones</button>
        </div>
        {showGame && (
          <div className="game">
            <h2>{questions[currentQuestionIndex].question}</h2>
            <img src={questions[currentQuestionIndex].image} alt="question" />
            <div className="options">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswerClick(option)}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
        {showResult && (
          <div className="result">
            <h2>Resultado</h2>
            <p>Tu puntuación es: {score} de {questions.length}</p>
          </div>
        )}
        {showInstructions && (
          <div className="instructions">
            <h2>Instrucciones</h2>
            <p>Responde a las preguntas sobre el espacio y elige la opción correcta.</p>
          </div>
        )}
        {showRanking && (
          <div className="ranking">
            <h2>Ranking</h2>
            <p>En desarrollo...</p>
          </div>
        )}
      </div>
      <style jsx global>{`
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          font-family: 'Arial', sans-serif;
        }

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .logo {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 10;
          width: 100px;
        }

        .background {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .content {
          position: relative;
          text-align: center;
          z-index: 1;
        }

        .character {
          display: block;
          margin: 0 auto 20px auto;
          width: 150px;
        }

        .buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .buttons button {
          font-size: 1.5rem;
          padding: 10px 20px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          background-color: #89C540;
          color: #fff;
        }

        .buttons button:hover {
          background-color: #76A830;
        }

        .game, .instructions, .ranking, .result {
          margin: 20px;
        }

        .game img {
          width: 200px;
          height: auto;
          margin: 20px 0;
        }

        .options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .options button {
          font-size: 1.2rem;
          padding: 10px 20px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          background-color: #007BFF;
          color: #fff;
        }

        .options button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Home;


