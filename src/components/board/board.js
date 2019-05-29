import React from 'react';
import './board.css';
import { connect } from 'react-redux';
import { initializeBoard, getBoard } from '../../redux/modules/board';

class Board extends React.Component{
    componentDidMount(){
        this.props.initializeBoard();
    }
    render(){
        console.log(this.props.board);
        return(
            <div>
                
            </div>
        );
    };
}

const mapStateToProps = state => ({
    board : state.Board
});

const mapDispatchToProps = {
    initializeBoard,
    getBoard
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);