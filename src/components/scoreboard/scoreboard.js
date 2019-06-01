import React from 'react';
import { connect } from 'react-redux';
import './scoreboard.css';
import store from '../../redux/index';
import PlayerScore from '../playerScore/playerScore';

class Scoreboard extends React.Component{
    updateStateFromStore = () =>{
        const currentState = this.props.Players;
        if(this.state !== currentState){
            this.setState(currentState);
        }
    }
    componentDidMount(){
        this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
    }
    componentWillUnmount(){
        this.unsubscribeStore();
    }
    render(){
        return(
            <div className="allPlayers">
                {
                    this.props.Players.map((player,index) =>{
                        return <PlayerScore key={index} player={player}></PlayerScore>
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

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Scoreboard);