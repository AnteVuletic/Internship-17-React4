import React from 'react';
import { constants } from '../../constants';
import './resourceCost.css';

const ResourceCost = () =>{
    return(
        <div className="info">
            <div>
                Road: * {constants.BUILDING_TYPE.ROAD.BRICK} x Brick , * {constants.BUILDING_TYPE.ROAD.LUMBER} x Lumber
            </div>
            <div>
                Settlement: * {constants.BUILDING_TYPE.SETTLEMENT.BRICK} x Brick, * {constants.BUILDING_TYPE.SETTLEMENT.GRAIN} x Grain ,
                * {constants.BUILDING_TYPE.SETTLEMENT.WOOL} x Wool
            </div>
            <div>
                City: * {constants.BUILDING_TYPE.CITY.GRAIN} x Grain , * {constants.BUILDING_TYPE.CITY.ORE} x Ore
            </div>
        </div>
    )
}
export default ResourceCost;