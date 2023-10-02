import React from "react";
import Typography from "@mui/material/Typography";

interface ScorePanelProps {
  players: string[];
  scores: number[];
}

const ScorePanel: React.FC<ScorePanelProps> = ({ players, scores }) => {
  return (
    <div style={{ backgroundColor: "#e0e0e0", padding: "10px" }}>
      <Typography variant="h6">Scores :</Typography>
      {players.map((player, index) => (
        <p key={index}>
          {"Joueur "+player}: {scores[index]}
        </p>
      ))}
    </div>
  );
};

export default ScorePanel;
