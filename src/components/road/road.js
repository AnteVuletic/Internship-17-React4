import React from 'react';
import './road.css';
import { connect } from 'react-redux';
import { setRoad } from '../../redux/modules/board';

export const Road = ({ index, State, isTopLeft, isTopRight, isLeft, isRight, isBottomLeft, isBottomRight, setRoad }) => {
    if (isTopLeft)
        return <div
            onClick={() => setRoad(index, "TopLeft", State.Players[0])}
            className="road road-top-left"
            style={{ backgroundColor: State.Board[index].RoadTopLeft === null ? "#222" : State.Board[index].RoadTopLeft.Type.COLOR }}>
        </div>
    if (isTopRight)
        return <div
            onClick={() => setRoad(index, "TopRight", State.Players[0])}
            className="road road-top-right"
            style={{ backgroundColor: State.Board[index].RoadTopRight === null ? "#222" : State.Board[index].RoadTopRight.Type.COLOR }}>
        </div>
    if (isLeft)
        return <div
            onClick={() => setRoad(index, "Left", State.Players[0])}
            className="road road-left"
            style={{ backgroundColor: State.Board[index].RoadLeft === null ? "#222" : State.Board[index].RoadLeft.Type.COLOR }}>
        </div>
    if (isRight)
        return <div
            onClick={() => setRoad(index, "Right", State.Players[0])}
            className="road road-right"
            style={{ backgroundColor: State.Board[index].RoadRight === null ? "#222" : State.Board[index].RoadRight.Type.COLOR }}>
        </div>
    if (isBottomLeft)
        return <div
            onClick={() => setRoad(index, "BottomLeft", State.Players[0])}
            className="road road-bottom-left"
            style={{ backgroundColor: State.Board[index].RoadBottomLeft === null ? "#222" : State.Board[index].RoadBottomLeft.Type.COLOR }}>
        </div>
    if (isBottomRight)
        return <div
            onClick={() => setRoad(index, "BottomRight", State.Players[0])}
            className="road road-bottom-right"
            style={{ backgroundColor: State.Board[index].RoadBottomRight === null ? "#222" : State.Board[index].RoadBottomRight.Type.COLOR }}>
        </div>
}

const mapStateToProps = state => ({
    State: state.Board
});
const mapDispatchToProps = {
    setRoad
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Road);