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
                <input type="text" name="firstPlayer" onChange={this.handlePlayerInput}></input>
                <input type="text" name="secondPlayer" onChange={this.handlePlayerInput}></input>
                <input type="text" name="thirdPlayer" onChange={this.handlePlayerInput}></input>
                <input type="text" name="fourthPlayer" onChange={this.handlePlayerInput}></input>
                <input type="submit" value="Submit"></input>
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