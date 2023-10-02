import React from 'react';
import Header from './headers/header';
import SubHeader from './headers/subHeader';
import Dice from './dice';

const Main: React.FC = () => {
    const startGame = (players: number) => {
       
    };

    return (
        <div>
            <Header/>
            {/* <SubHeader onGameStart={startGame} /> */}
            {/* il suffit juste de modifier ces props pour ajouter des joueurs, changer le nombre de round ou le nombre dés */}
            <Dice players={["1","2"]}  totalRounds={1} diceCount={2} />
        </div>
    );
  };
  
  export default Main;
  