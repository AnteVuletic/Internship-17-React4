import React from 'react';
import './playerForm.css';
import { connect } from 'react-redux';
import { setPlayers } from '../../redux/modules/board';

class PlayerForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstPlayer: "",
            secondPlayer: "",
            thirdPlayer: "",
            fourthPlayer: ""
        }
    }

    handlePlayerInput = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name] : value
        });
    }

    handleSubmit = (event) =>{
        event.preventDefault();

        const players = [...Object.values(this.state)];
        this.props.setPlayers(players);
        this.props.history.push("/Game");
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="firstPlayer">First player:</label>
                <input type="text" name="firstPlayer" onChange={this.handlePlayerInput}></input>
                <label htmlFor="secondPlayer">Second player:</label>
                <input type="text" name="secondPlayer" onChange={this.handlePlayerInput}></input>
                <label htmlFor="thirdPlayer">Third player:</label>
                <input type="text" name="thirdPlayer" onChange={this.handlePlayerInput}></input>
                <label htmlFor="fourthPlayer">Fourth player:</label>
                <input type="text" name="fourthPlayer" onChange={this.handlePlayerInput}></input>
                <input className="button" type="submit" value="Submit"></input>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    Board : state.Board.Players
});
const mapDispatchToProps = {
    setPlayers
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerForm);