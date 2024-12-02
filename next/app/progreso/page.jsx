import React from "react";
import ProgressBar from "./ProgressBar";  // Componente de barra de progreso

const Dashboard = ({ session }) => {
  // Progreso del estudiante (por ejemplo, en XP)
  const progress = Math.min((session.xp / session.maxXp) * 100, 100);  // Calculamos el progreso en porcentaje

  return (
    <div className="dashboard">
      <h2>¡Bienvenido, {session.name}!</h2>
      <div className="level-info">
        <h3>Nivel Actual: {session.nivel}</h3>
        <ProgressBar progress={progress} />
        <p>Progreso: {Math.floor(progress)}% completado</p>
      </div>

      <div className="mision-info">
        <h3>Misiones Completadas</h3>
        <ul>
          {session.completedMissions.map((mission, index) => (
            <li key={index}>{mission}</li>
          ))}
        </ul>
      </div>

      <div className="next-level-info">
        <h3>Para el siguiente nivel:</h3>
        <p>{session.maxXp - session.xp} XP restantes</p>
      </div>
    </div>
  );
};

export default Dashboard;
