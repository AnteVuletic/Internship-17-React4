import React from 'react';
import './playerScore.css';

const PlayerScore = ({ player }) =>{
    console.log(player);
    return(
        <div className="player" style={{backgroundColor: player.Type.COLOR}}>
            <div className="player__name">{player.Name}</div>
            <div className="player__resources">
                <span>Ore: {player.Ore}</span>
                <span>Lumber: {player.Lumber}</span>
                <span>Grain: {player.Grain}</span>
                <span>Brick: {player.Brick}</span>
                <span>Wool: {player.Wool}</span>
            </div>
            <div className="player__score">
                Points: {player.Points}
            </div>
        </div>
    );
}

export default PlayerScore;