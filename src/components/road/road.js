import React from 'react';
import './road.css';
import { connect } from 'react-redux';
import { setRoad } from '../../redux/modules/board';

export const Road = ({ index, isTopLeft, isTopRight, isLeft, isRight, isBottomLeft, isBottomRight, setRoad }) => {
    if (isTopLeft)
        return <div
            onClick={() => setRoad(index, "TopLeft", { _: "RED", COLOR: "#FF0000" })}
            className="road road-top-left">
        </div>
    if (isTopRight)
        return <div
            onClick={() => setRoad(index, "TopRight", { _: "RED", COLOR: "#FF0000" })}
            className="road road-top-right">
        </div>
    if (isLeft)
        return <div
            onClick={() => setRoad(index, "Left", { _: "RED", COLOR: "#FF0000" })}
            className="road road-left">
        </div>
    if (isRight)
        return <div
            onClick={() => setRoad(index, "Right", { _: "RED", COLOR: "#FF0000" })}
            className="road road-right">
        </div>
    if (isBottomLeft)
        return <div
            onClick={() => setRoad(index, "BottomLeft", { _: "RED", COLOR: "#FF0000" })}
            className="road road-bottom-left">
        </div>
    if (isBottomRight)
        return <div
            onClick={() => setRoad(index, "BottomRight", { _: "RED", COLOR: "#FF0000" })}
            className="road road-bottom-right">
        </div>
}

const mapStateToProps = state => ({
    Board: state.Board.Board
});
const mapDispatchToProps = {
    setRoad
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Road);