import React from 'react';
import { connect } from 'react-redux';
import { roll,nextPlayer } from '../../redux/modules/board';
import './scoreboard.css';
import store from '../../redux/index';
import PlayerScore from '../playerScore/playerScore';

class Scoreboard extends React.Component{
    updateStateFromStore = () =>{
        const currentState = this.props.State;
        if(this.state !== currentState){
            this.setState(currentState);
        }
        if(this.props.State.Players.some(player => player.Points >= 10))
            this.props.history.push('/win');
    }
    componentDidMount(){
        this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
    }
    componentWillUnmount(){
        this.unsubscribeStore();
    }
    render(){
        if(this.props.State.InitialPlay){
            return(
                <div className="allPlayers">
                    {
                        this.props.State.Players.map((player,index) =>{
                            return <PlayerScore key={index} player={player}></PlayerScore>
                        })
                    }
                </div>
            );
        }
        if(this.props.State.HasRolled){
            return(
                <div className="allPlayers">
                    {
                        this.props.State.Players.map((player,index) =>{
                            return <PlayerScore key={index} player={player}></PlayerScore>
                        })
                    }
                    <button onClick={this.props.nextPlayer}>Next</button>
                    <div className="roll">{this.props.State.Rolled}</div>
                </div>
            );
        }
        return(
            <div className="allPlayers">
                {
                    this.props.State.Players.map((player,index) =>{
                        return <PlayerScore key={index} player={player}></PlayerScore>
                    })
                }
                <button onClick={this.props.roll}>Roll</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    State: state.Board
});

const mapDispatchToProps = {
    roll,
    nextPlayer
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Scoreboard);