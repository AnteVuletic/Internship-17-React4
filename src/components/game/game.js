import React from 'react';
import Board from '../board/board';
import Scoreboard from '../scoreboard/scoreboard';

const Game = (props) =>{
    return(
        <div>
            <Board></Board>
            <Scoreboard {...props}></Scoreboard>
        </div>
    )
}

export default Game;