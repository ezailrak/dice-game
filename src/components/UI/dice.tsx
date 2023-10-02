// src/Dice.tsx
import React, { useState, useEffect } from "react";
import Banner from "./banners/banner";
import ScorePanel from "./panels/scorePanel";
import Button from "@mui/material/Button";

interface DiceProps {
  players: string[];
  totalRounds: number;
  diceCount: number;
}

const Dice: React.FC<DiceProps> = ({ players, totalRounds, diceCount }) => {
  const [diceValues, setDiceValues] = useState<number[]>(
    Array(diceCount).fill(0)
  ); // dice values init to 0
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0); //index of the player who is playing now
  const [scores, setScores] = useState<number[]>(Array(players.length).fill(0)); 
  const [round, setRound] = useState<number>(1); // 1 round have players.length roll
  const [rollCount, setRollCount] = useState<number>(0); //use to count the number of player who's roll dice in a round
  const [rollDiceDisabled, setRollDiceDisabled] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);

	const defineFirstPlayerIndex = () => {
		// definir aléatoirement le premier joueur
		setCurrentPlayerIndex(Math.floor(Math.random() * players.length))

	}
  const rollDice = () => {
		setRollDiceDisabled(true)

		const newDiceValues = Array(diceCount)
		.fill(0)
		.map(() => Math.floor(Math.random() * 6) + 1);

    setDiceValues(newDiceValues);
    setRollCount(rollCount + 1);
  };

	const updateScores = () => {
		const newScores = [...scores];
		const roundScore = diceValues.reduce((sum, value) => sum + value, 0);
		newScores[currentPlayerIndex] += roundScore;
		setScores(newScores);
		


		if (rollCount >= players.length && round >= totalRounds) {
			// game over, pick the winner
			const maxScore = Math.max(...newScores);
			const winningPlayers = players.filter(
				(_, index) => newScores[index] === maxScore
			);
			if (winningPlayers.length === 1) {
				setWinner(winningPlayers[0]);
			} else {
				setWinner("Égalité !");
			}
			setGameOver(true)
		}
	};

	const nextPlayer = () => {
		setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
		setDiceValues(Array(diceCount).fill(0));
		setRollDiceDisabled(false)
		if(rollCount >= players.length){
			// go to the next round
			setRollCount(0)
			setRound(round + 1);
			console.log('newScores',scores)
		}
	}
 
	const resetGame = () => {
		defineFirstPlayerIndex()
		setDiceValues(Array(diceCount).fill(0));
		setRollCount(0)
		setScores(Array(players.length).fill(0))
		setWinner("")
		setRound(1)
		setRollDiceDisabled(false)
		setGameOver(false)
	}

 const renderDiceImages = () => {
    return diceValues.map((diceValue, index) => (
      <img
        key={index}
        src={`/images/dice/de${diceValue}.png`}
        alt={`Dé ${diceValue}`}
        width="64"
        height="64"
      />
    ));
  };

  useEffect(() => {
		console.log('nga tonga ida ato')
		if(rollCount > 0) {
			updateScores()
		}
  }, [rollCount]);
	


  return (
		<div style={{display: 'flex', justifyContent: 'center'}}>
			<div style={{paddingTop: '10px'}}>
				<ScorePanel players={players} scores={scores}/>
			</div>
			<div>
				<h2>Tour {round} / Joueur {players[currentPlayerIndex]}</h2>
				<div style={{ display: 'flex', gap: '10px', justifyContent: "center"}}>{renderDiceImages()}</div>
				<p>Score actuel : {scores[currentPlayerIndex]}</p>
				<Button variant="contained" color="primary" onClick={rollDice} disabled={rollDiceDisabled}>
					Lancer les dés
				</Button>
				<Button variant="contained" color="primary"  onClick={nextPlayer} disabled={!rollDiceDisabled || gameOver}>
					Joueur suivant
				</Button>
				<Button variant="contained" color="primary"
					onClick={resetGame}
				>
					Réinitialiser le Jeu
				</Button>
				{winner && <Banner winner={winner} />}
			</div>
		</div>
  );
};

export default Dice;
