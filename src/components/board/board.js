import React from 'react';
import './board.css';
import { connect } from 'react-redux';
import Hexagon from '../hexagon/hexagon';

class Board extends React.Component{
    render(){
        return(
            <div className="board">
                {
                    this.props.Board.map((hexElement,Index)=>{
                        if(hexElement === null ) return <></>;
                        if(Index === 0 || Index % 20 === 0) return <span key={Index}></span>;
                        if(hexElement.Index === 3 || hexElement.Index === 7 || hexElement.Index === 12 || hexElement.Index === 16 || hexElement.Index === 19)
                            return <div style={{display:"table"}} key={Index}><Hexagon hexElement={hexElement}></Hexagon><div style={{clear:"left"}}></div></div>
                        return <Hexagon key={Index} hexElement={hexElement}></Hexagon>
                    })
                }
            </div>
        );
    };
}

const mapStateToProps = state => ({
    Board : state.Board.Board
});

export default connect(
    mapStateToProps
)(Board);