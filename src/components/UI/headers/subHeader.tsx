// src/SubHeader.tsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

interface SubHeaderProps {
  onGameStart: (players: number) => void;
}

const SubHeader: React.FC<SubHeaderProps> = ({ onGameStart }) => {
  const [selectedPlayers, setSelectedPlayers] = useState<number>(2); // Valeur par défaut de 2 joueurs

  const handleStartGame = () => {
    // Passer le nombre de joueurs sélectionné à la fonction de démarrage du jeu
    onGameStart(selectedPlayers);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      bgcolor="#f0f0f0"
    >
      <Typography variant="h6">Nombre de joueurs :</Typography>
      <Select
        value={selectedPlayers}
        onChange={(e) => setSelectedPlayers(e.target.value as number)}
      >
        <MenuItem value={2}>2 joueurs</MenuItem>
        <MenuItem value={3}>3 joueurs</MenuItem>
        <MenuItem value={4}>4 joueurs</MenuItem>
      </Select>
      <Button variant="contained" color="primary" onClick={handleStartGame}>
        Go
      </Button>
    </Box>
  );
};

export default SubHeader;
