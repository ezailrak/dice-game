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
	// Define and initialize state variables using the useState hook
  const [diceValues, setDiceValues] = useState<number[]>(
    Array(diceCount).fill(0)
  ); // Initialize dice values to an array of zeros
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);// Index of the player who is playing now
  const [scores, setScores] = useState<number[]>(Array(players.length).fill(0));  // Initialize scores to an array of zeros
  const [round, setRound] = useState<number>(1); // Initialize the current round to 1
  const [rollCount, setRollCount] = useState<number>(0); // Used to count the number of players who've rolled dice in a round
  const [rollDiceDisabled, setRollDiceDisabled] = useState<boolean>(false); // Indicates if the "Roll Dice" button should be disabled
  const [gameOver, setGameOver] = useState<boolean>(false); // Indicates if the game is over
  const [winner, setWinner] = useState<string | null>(null); // Stores the name of the winner
	
	  // Function to randomly select the first player
	const defineFirstPlayerIndex = () => {
		setCurrentPlayerIndex(Math.floor(Math.random() * players.length))

	}

	// Function to simulate rolling dice
  const rollDice = () => {
		setRollDiceDisabled(true)

		// Generate random dice values
		const newDiceValues = Array(diceCount)
		.fill(0)
		.map(() => Math.floor(Math.random() * 6) + 1);

    setDiceValues(newDiceValues);
    setRollCount(rollCount + 1);
  };

	// Function to update scores based on rolled dice values
	const updateScores = () => {
		const newScores = [...scores];
		const roundScore = diceValues.reduce((sum, value) => sum + value, 0);
		newScores[currentPlayerIndex] += roundScore;
		setScores(newScores);
		


		if (rollCount >= players.length && round >= totalRounds) {
			// Check if the game is over and determine the winner
			const maxScore = Math.max(...newScores);
			const winningPlayers = players.filter(
				(_, index) => newScores[index] === maxScore
			);
			if (winningPlayers.length === 1) {
				setWinner(winningPlayers[0]);
			} else {
				setWinner("Égalité !"); // In case of a tie
			}
			setGameOver(true)
		}
	};

	// Function to switch to the next player's turn
	const nextPlayer = () => {
		setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
		setDiceValues(Array(diceCount).fill(0));
		setRollDiceDisabled(false)
		if(rollCount >= players.length){
			// Move to the next round
			setRollCount(0)
			setRound(round + 1);
			console.log('newScores',scores)
		}
	}
 
	// Function to reset the game to its initial state
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
	// Function to render dice images based on the rolled values
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

	// useEffect to update scores when rollCount changes
  useEffect(() => {
		console.log('nga tonga ida ato')
		if(rollCount > 0) {
			updateScores()
		}
  }, [rollCount]);
	

	// Render the Dice component
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
