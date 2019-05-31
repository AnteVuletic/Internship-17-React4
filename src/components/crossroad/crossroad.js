import React from 'react';
import './crossroad.css';
import { connect } from 'react-redux';
import { setCrossroad } from '../../redux/modules/board';

export const CrossRoad = ({index,isTopLeft,isTopRight,isTop,isBottom,isBottomLeft,isBottomRight,setCrossroad}) =>{
    if(isTopLeft)
        return <div 
        onClick={()=>setCrossroad(index,"TopLeft",{_: "RED",COLOR: "#FF0000"})} 
        className="crossroad crossroad-top-left">
        </div>
    if(isTopRight)
        return <div 
        onClick={()=>setCrossroad(index,"TopRight",{_: "RED",COLOR: "#FF0000"})} 
        className="crossroad crossroad-top-right">
        </div>
    if(isBottom)
        return <div 
        onClick={()=>setCrossroad(index,"Bottom",{_: "RED",COLOR: "#FF0000"})} 
        className="crossroad crossroad-bottom">
        </div>
    if(isTop)
        return <div 
        onClick={()=>setCrossroad(index,"Top",{_: "RED",COLOR: "#FF0000"})} 
        className="crossroad crossroad-top">
        </div>
    if(isBottomLeft)
        return <div 
        onClick={()=>setCrossroad(index,"BottomLeft",{_: "RED",COLOR: "#FF0000"})} 
        className="crossroad crossroad-bottom-left">
        </div>
    if(isBottomRight)
        return <div 
        onClick={()=>setCrossroad(index,"BottomRight",{_: "RED",COLOR: "#FF0000"})} 
        className="crossroad crossroad-bottom-right">
        </div>
}

const mapStateToProps = state => ({
    Board : state.Board.Board
});
const mapDispatchToProps = {
    setCrossroad
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CrossRoad);