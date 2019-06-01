import React from 'react';
import './crossroad.css';
import { connect } from 'react-redux';
import { setCrossroad } from '../../redux/modules/board';

export const CrossRoad = ({ index, State, isTopLeft, isTopRight, isTop, isBottom, isBottomLeft, isBottomRight, setCrossroad }) =>{  
    if(isTopLeft)
        return <div 
        onClick={()=>setCrossroad(index,"TopLeft",State.Players[0])} 
        className="crossroad crossroad-top-left" 
        style={{ backgroundColor: State.Board[index].CrossRoadTopLeft === null ? "#222" : State.Board[index].CrossRoadTopLeft.Type.COLOR }}>
        </div>
    if(isTopRight)
        return <div 
        onClick={()=>setCrossroad(index,"TopRight",State.Players[0])} 
        className="crossroad crossroad-top-right" 
        style={{ backgroundColor: State.Board[index].CrossRoadTopRight === null ? "#222" : State.Board[index].CrossRoadTopRight.Type.COLOR }}>
        </div>
    if(isBottom)
        return <div 
        onClick={()=>setCrossroad(index,"Bottom",State.Players[0])} 
        className="crossroad crossroad-bottom" 
        style={{ backgroundColor: State.Board[index].CrossRoadBottom === null ? "#222" : State.Board[index].CrossRoadBottom.Type.COLOR }}>
        </div>
    if(isTop)
        return <div 
        onClick={()=>setCrossroad(index,"Top",State.Players[0])} 
        className="crossroad crossroad-top" 
        style={{ backgroundColor: State.Board[index].CrossRoadTop === null ? "#222" : State.Board[index].CrossRoadTop.Type.COLOR }}>
        </div>
    if(isBottomLeft)
        return <div 
        onClick={()=>setCrossroad(index,"BottomLeft",State.Players[0])} 
        className="crossroad crossroad-bottom-left" 
        style={{ backgroundColor: State.Board[index].CrossRoadBottomLeft === null ? "#222" : State.Board[index].CrossRoadBottomLeft.Type.COLOR }}>
        </div>
    if(isBottomRight)
        return <div 
        onClick={()=>setCrossroad(index,"BottomRight",State.Players[0])} 
        className="crossroad crossroad-bottom-right" 
        style={{ backgroundColor: State.Board[index].CrossRoadBottomRight === null ? "#222" : State.Board[index].CrossRoadBottomRight.Type.COLOR }}>
        </div>
}

const mapStateToProps = state => ({
    State : state.Board
});
const mapDispatchToProps = {
    setCrossroad
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CrossRoad);