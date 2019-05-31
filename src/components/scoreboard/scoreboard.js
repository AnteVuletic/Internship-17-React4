import React from 'react';
import { connect } from 'react-redux';
import { getPlayers } from '../../redux/modules/board';
import './scoreboard.css';

class Scoreboard extends React.Component{
    render(){
        return(
            <div className="allPlayers">
                {
                    this.props.Players.map((player,index) =>{
                        return <div key={index} className="player" style={{backgroundColor: player.Type.COLOR}}>{player.Name}</div>
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    Players: state.Board.Players
});

const mapDispatchToProps = {
    getPlayers
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Scoreboard);