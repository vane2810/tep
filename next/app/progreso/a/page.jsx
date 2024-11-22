"use client";
import React from "react";
import Sopa from "@/components/minigame/sopa";

const TriviaPage = () => {
    const gameData = {
        palabras: ["PERRO", "GATO", "NIDO"],
        tablero: [
          ["P", "E", "R", "R", "O"],
          ["A", "X", "T", "Y", "Z"],
          ["G", "A", "T", "O", "P"],
          ["B", "E", "S", "O", "N"],
          ["M", "I", "D", "O", "S"]
        ],
        points: 100,
        points_per_word: 30,
        points_min: 70
      };

    return <Sopa gameData={gameData} />;
};

export default TriviaPage;