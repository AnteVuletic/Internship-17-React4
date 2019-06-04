import React from 'react';
import './playerScore.css';
import { constants } from '../../constants';

const PlayerScore = ({ player }) =>{
    return(
        <div className="player" style={{backgroundColor: player.Type.COLOR}}>
            <div className="player__name">{player.Name}</div>
            <div className="player__resources">
                <span style={{backgroundColor: constants.TILE_TYPES.MOUNTAIN.COLOR }}>Ore: {player.Ore}</span>
                <span style={{backgroundColor: constants.TILE_TYPES.FOREST.COLOR }}>Lumber: {player.Lumber}</span>
                <span style={{backgroundColor: constants.TILE_TYPES.FIELD.COLOR }}>Grain: {player.Grain}</span>
                <span style={{backgroundColor: constants.TILE_TYPES.HILL.COLOR }}>Brick: {player.Brick}</span>
                <span style={{backgroundColor: constants.TILE_TYPES.PASTURE.COLOR }}>Wool: {player.Wool}</span>
            </div>
            <div className="player__score">
                Points: {player.Points}
            </div>
        </div>
    );
}

export default PlayerScore;