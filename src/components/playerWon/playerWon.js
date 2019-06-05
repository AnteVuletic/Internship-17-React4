import React from 'react';
import './playerWon.css';
import { connect } from 'react-redux';

const PlayerWon = ({ Players }) =>{
    const orderByWinner = () =>{
        return Players.sort((a,b) => a.Points - b.Points);
    }
    return(
        <div className="winners">
            {
                orderByWinner().map((element,index) =>{
                    return <div key={index} style={{ backgroundColor: element.Type.COLOR }}>
                        {index+1}. {element.Name}
                    </div>
                })
            }
        </div>
    )
}

const mapStateToProps = state =>({
    Players: state.Board.Players
});

export default connect(
    mapStateToProps
)(PlayerWon);