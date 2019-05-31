import React from 'react';
import Chit from '../chit/chit';
import './hexagon.css';
import Road from '../road/road';
import CrossRoad from '../crossroad/crossroad';

const Hexagon = ({hexElement}) =>{
    const shouldHaveMargin = () =>{
        if(hexElement.Index === 1 || hexElement.Index === 17)
            return true;
        return false;
    }
    return (
        <div className="hexagon" style={shouldHaveMargin() ? {marginLeft: "56px"} : {} && hexElement.Index === 8 ? {marginLeft:"-50px"}:{}}>
            <Road index={hexElement.Index} isTopLeft={true}></Road>
            <Road index={hexElement.Index} isTopRight={true}></Road>
            <Road index={hexElement.Index} isLeft={true}></Road>
            <Road index={hexElement.Index} isRight={true}></Road>
            <Road index={hexElement.Index} isBottomLeft={true}></Road>
            <Road index={hexElement.Index} isBottomRight={true}></Road>
            <CrossRoad index={hexElement.Index} isTopLeft={true}></CrossRoad>
            <CrossRoad index={hexElement.Index} isTopRight={true}></CrossRoad>
            <CrossRoad index={hexElement.Index} isTop={true}></CrossRoad>
            <CrossRoad index={hexElement.Index} isBottom={true}></CrossRoad>
            <CrossRoad index={hexElement.Index} isBottomLeft={true}></CrossRoad>
            <CrossRoad index={hexElement.Index} isBottomRight={true}></CrossRoad>

            <div className="hexagonBefore" style={{borderBottomColor: hexElement.TileType.COLOR}}></div>
            <div className="hexagonMiddle" style={{backgroundColor: hexElement.TileType.COLOR}}>
                <Chit chit={hexElement.Chit}></Chit>
            </div>
            <div className="hexagonAfter" style={{borderTopColor: hexElement.TileType.COLOR}}></div>
        </div>
    );
}
export default Hexagon;