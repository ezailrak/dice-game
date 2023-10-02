// src/Banner.tsx
import React from "react";
import Typography from "@mui/material/Typography";

interface BannerProps {
  winner: string;
}

const Banner: React.FC<BannerProps> = ({ winner }) => {
  return (
    <div
      style={{ backgroundColor: "#4caf50", padding: "10px", marginTop: "20px" }}
    >
      <Typography variant="h5" style={{ color: "white" }}>
        Le gagnant est : {winner}
      </Typography>
    </div>
  );
};

export default Banner;
