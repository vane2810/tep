import React, { useState, useEffect } from "react";

const MatchPairsGame = ({ gameData }) => {
  const [shuffledPairs, setShuffledPairs] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const { pares, points, points_per_pair, points_min } = gameData;

  useEffect(() => {
    // Barajar las tarjetas al inicio del juego
    const shuffled = pares
      .flatMap((pair, index) => [
        { value: pair.elemento1, id: `${index}-1` },
        { value: pair.elemento2, id: `${index}-2` }
      ])
      .sort(() => Math.random() - 0.5);

    setShuffledPairs(shuffled);
  }, [pares]);

  // Manejar la selección de tarjetas
  const handleCardClick = (card) => {
    if (selectedCards.length < 2 && !matchedPairs.includes(card.id)) {
      setSelectedCards((prev) => [...prev, card]);
    }
  };

  // Validar el emparejamiento
  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstCard, secondCard] = selectedCards;

      // Validar si las tarjetas forman una pareja
      const pairIndex = pares.findIndex(
        (pair) =>
          (pair.elemento1 === firstCard.value && pair.elemento2 === secondCard.value) ||
          (pair.elemento1 === secondCard.value && pair.elemento2 === firstCard.value)
      );

      if (pairIndex !== -1) {
        setMatchedPairs((prev) => [...prev, firstCard.id, secondCard.id]);
        setScore((prevScore) => prevScore + points_per_pair);
      }

      // Reiniciar las tarjetas seleccionadas después de un breve intervalo
      setTimeout(() => setSelectedCards([]), 1000);
    }
  }, [selectedCards, pares, points_per_pair]);

  // Verificar si el juego ha terminado
  useEffect(() => {
    if (matchedPairs.length === shuffledPairs.length) {
      setIsGameOver(true);
    }
  }, [matchedPairs, shuffledPairs]);

  const resetGame = () => {
    setShuffledPairs([]);
    setSelectedCards([]);
    setMatchedPairs([]);
    setScore(0);
    setIsGameOver(false);

    // Rebarajar las tarjetas
    const shuffled = pares
      .flatMap((pair, index) => [
        { value: pair.elemento1, id: `${index}-1` },
        { value: pair.elemento2, id: `${index}-2` }
      ])
      .sort(() => Math.random() - 0.5);

    setShuffledPairs(shuffled);
  };

  if (isGameOver) {
    return (
      <div>
        <h1>Juego Finalizado</h1>
        <p>Puntaje obtenido: {score}</p>
        {score >= points_min ? (
          <p>¡Felicidades, completaste el juego!</p>
        ) : (
          <p>No alcanzaste el puntaje mínimo. Inténtalo de nuevo.</p>
        )}
        <button onClick={resetGame}>Reintentar</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Encuentra la Pareja</h1>
      <p>Puntaje: {score}</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          marginTop: "20px"
        }}
      >
        {shuffledPairs.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: matchedPairs.includes(card.id)
                ? "lightgreen"
                : selectedCards.some((c) => c.id === card.id)
                ? "lightblue"
                : "gray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              fontSize: "14px",
              color: "white",
              fontWeight: "bold"
            }}
          >
            {matchedPairs.includes(card.id) || selectedCards.some((c) => c.id === card.id)
              ? card.value
              : "?"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchPairsGame;
