import { constants } from '../../constants';
import HexModel from '../models/hexModel';
import Player from '../models/player';

const SET_ROAD = "SET_ROAD";
const SET_CROSSROAD = "SET_CROSSROAD";
const SET_PLAYERS = "SET_PLAYERS";
const ROLL_DICE = "ROLL_DICE";
const NEXT_PLAYER = "NEXT_PLAYER";

const initialState = {
    Board: [],
    Players: [],
    HasRolled: false,
    Rolled: 0,
    InitialPlay: true
};

const initializePlayers = () => {
    for (let itterator = 0; itterator < 4; itterator++) {
        let newPlayer = new Player(constants.PLAYER_TYPES_LEFT.pop());
        initialState.Players.push(newPlayer);
    }
};
const initializeBoard = () => {
    initialState.Board.push(new HexModel(0, 7, { _: "None", COLOR: '#FFF' }));
    let randomDesertIndex = Math.floor(Math.random() * 20) + 1;
    let desertHex = new HexModel(randomDesertIndex, constants.CHIT_VALUES[0], constants.BOARD_HEXES[0]);
    desertHex.setNeighbours();
    constants.CHIT_VALUES.splice(0, 1);
    constants.BOARD_HEXES.splice(0, 1);
    for (let itterator = 1; itterator <= 37; itterator++) {
        if (itterator !== randomDesertIndex) {
            let newHex = new HexModel(itterator);
            newHex.setNeighbours();
            initialState.Board[itterator] = newHex;
        }
        else
            initialState.Board[itterator] = desertHex;
        if (itterator > 19) {
            let fakeHex = new HexModel(itterator, 7, { _: "None", COLOR: '#FFF' });
            fakeHex.setNeighbours();
            initialState.Board[itterator] = fakeHex;
        }
    }
};


initializeBoard();
initializePlayers();

export const setCrossroad = (index, position, player) => {
    return {
        type: SET_CROSSROAD,
        payload: { index, position, player }
    };
};

export const setRoad = (index, position, player) => {
    return {
        type: SET_ROAD,
        payload: { index, position, player }
    };
};

export const setPlayers = (playerNames) => {
    return {
        type: SET_PLAYERS,
        payload: playerNames
    };
};

export const roll = () => {
    return {
        type: ROLL_DICE
    };
}

export const nextPlayer = () => {
    return {
        type: NEXT_PLAYER
    };
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CROSSROAD: {
            let tmpState = _setCrossroad(state, action.payload);
            if (tmpState.InitialPlay) {
                let check = _isNextPlayerTurn(tmpState, action.payload.player);
                if (check.hasPlacedBoth) {
                    tmpState.Players[0].HasPlayedFirstHand = true;
                    let allThatPlayedFirstHand = tmpState.Players.filter(player => player.HasPlayedFirstHand);
                    if (allThatPlayedFirstHand.length === 4) {
                        let allThatPlayedSecondHand = tmpState.Players.filter(player => player.HasPlayedSecondHand);
                        tmpState.Players[0].HasPlayedSecondHand = true;
                        if (allThatPlayedSecondHand.length === 4) {
                            tmpState.InitialPlay = false;
                            for (let i = 1; i < 12; i++) {
                                tmpState = _generateResource(tmpState, i);
                            }
                            return {
                                ..._reversePlayers(tmpState)
                            }
                        }
                        return {
                            ..._nextPlayer(tmpState)
                        }
                    }
                    return {
                        ..._nextPlayer(tmpState)
                    }
                }
            }
            return {
                ...tmpState
            }
        }
        case SET_ROAD: {
            let tmpState = _setRoad(state, action.payload);
            if (tmpState.InitialPlay) {
                let check = _isNextPlayerTurn(tmpState, action.payload.player);
                if (check.hasPlacedBoth) {
                    tmpState.Players[0].HasPlayedFirstHand = true;
                    let allThatPlayedFirstHand = tmpState.Players.filter(player => player.HasPlayedFirstHand);
                    if (allThatPlayedFirstHand.length === 4) {
                        let allThatPlayedSecondHand = tmpState.Players.filter(player => player.HasPlayedSecondHand);
                        tmpState.Players[0].HasPlayedSecondHand = true;
                        if (allThatPlayedSecondHand.length === 4) {
                            tmpState.InitialPlay = false;
                            for (let i = 1; i < 12; i++) {
                                tmpState = _generateResource(tmpState, i);
                            }
                            return {
                                ..._reversePlayers(tmpState)
                            }
                        }
                        return {
                            ..._nextPlayer(tmpState)
                        }
                    }
                    return {
                        ..._nextPlayer(tmpState)
                    }
                }
            }
            return {
                ...tmpState
            }
        }
        case SET_PLAYERS: {
            return {
                ..._setPlayers(state, action.payload)
            }
        }
        case ROLL_DICE: {
            return {
                ..._rollDice(state)
            }
        }
        case NEXT_PLAYER: {
            return {
                ..._nextPlayer(state)
            }
        }
        default:
            return state;
    }
}
export default reducer;

const _setPlayers = (state, payload) => {
    let playersEntered = payload;
    for (let index = 0; index < state.Players.length; index++) {
        const randomPlayerIndex = Math.floor(Math.random() * playersEntered.length);
        const randomPlayer = playersEntered[randomPlayerIndex];
        playersEntered.splice(randomPlayerIndex, 1);
        state.Players[index].Name = randomPlayer;
    }
    return state
}

const _reversePlayers = (state) => {
    state = _nextPlayer(state);
    state.Players.reverse();
    return state;
}

const _isNextPlayerTurn = (state, player) => {
    let hexesWithCrossroad = 0;
    state.Board.forEach(hexElement => {
        if (hexElement.CrossRoadBottom !== null ? hexElement.CrossRoadBottom.Type._ === player.Type._ : false) hexesWithCrossroad++;
        if (hexElement.CrossRoadBottomLeft !== null ? hexElement.CrossRoadBottomLeft.Type._ === player.Type._ : false) hexesWithCrossroad++;
        if (hexElement.CrossRoadBottomRight !== null ? hexElement.CrossRoadBottomRight.Type._ === player.Type._ : false) hexesWithCrossroad++;
        if (hexElement.CrossRoadTop !== null ? hexElement.CrossRoadTop.Type._ === player.Type._ : false) hexesWithCrossroad++;
        if (hexElement.CrossRoadTopLeft !== null ? hexElement.CrossRoadTopLeft.Type._ === player.Type._ : false) hexesWithCrossroad++;
        if (hexElement.CrossRoadTopRight !== null ? hexElement.CrossRoadTopRight.Type._ === player.Type._ : false) hexesWithCrossroad++;
    });
    let hexesWithRoads = 0;
    state.Board.forEach(hexElement => {
        if (hexElement.RoadTopLeft !== null ? hexElement.RoadTopLeft.Type._ === player.Type._ : false) hexesWithRoads++;
        if (hexElement.RoadTopRight !== null ? hexElement.RoadTopRight.Type._ === player.Type._ : false) hexesWithRoads++;
        if (hexElement.RoadLeft !== null ? hexElement.RoadLeft.Type._ === player.Type._ : false) hexesWithRoads++;
        if (hexElement.RoadRight !== null ? hexElement.RoadRight.Type._ === player.Type._ : false) hexesWithRoads++;
        if (hexElement.RoadBottomLeft !== null ? hexElement.RoadBottomLeft.Type._ === player.Type._ : false) hexesWithRoads++;
        if (hexElement.RoadBottomRight !== null ? hexElement.RoadBottomRight.Type._ === player.Type._ : false) hexesWithRoads++;
    });
    let hasPlacedCrossRoad = false;
    let hasPlacedRoad = false;
    let hasPlacedBoth = false;
    if (!player.HasPlayedFirstHand) {
        hasPlacedCrossRoad = hexesWithCrossroad > 2;
        hasPlacedRoad = hexesWithRoads > 1;
        hasPlacedBoth = hasPlacedCrossRoad && hasPlacedRoad;
    }
    else {
        hasPlacedCrossRoad = hexesWithCrossroad > 4;
        hasPlacedRoad = hexesWithRoads > 3;
        hasPlacedBoth = hasPlacedCrossRoad && hasPlacedRoad;
    }
    return {
        hasPlacedCrossRoad,
        hasPlacedRoad,
        hasPlacedBoth
    }
}

const _checkResourcesSettlement = (player) => player.Brick < constants.BUILDING_TYPE.SETTLEMENT.BRICK ||
    player.Wool < constants.BUILDING_TYPE.SETTLEMENT.WOOL ||
    player.Grain < constants.BUILDING_TYPE.SETTLEMENT.GRAIN;

const _setCrossroad = (state, payload) => {
    const { index, position, player } = payload;
    if (state.InitialPlay) {
        let check = _isNextPlayerTurn(state, player);
        if (check.hasPlacedCrossRoad)
            return state;
    }
    const indexTopRight = state.Board[index].TopRight;
    const indexLeft = state.Board[index].Left;
    const indexRight = state.Board[index].Right;
    const indexBottomRight = state.Board[index].BottomRight;
    const indexBottomLeft = state.Board[index].BottomLeft;
    const thisIndexBottomRight = state.Board[index].BottomRight;
    switch (position) {
        case "Top":
            if (state.Board[index].CrossRoadTop !== null) {
                return _setCity(state, index, "CrossRoadTop", player);
            }
            if (
                !state.InitialPlay &&
                (
                    state.Board[index].RoadTopRight !== null ? state.Board[index].RoadTopRight.Type._ !== player.Type._ : true ||
                        state.Board[index].RoadTopLeft !== null ? state.Board[index].RoadTopLeft.Type._ !== player.Type._ : true ||
                            state.Board[indexTopRight].RoadLeft !== null ? state.Board[indexTopRight].RoadLeft.Type._ !== player.Type._ : true
                )
            ) return state;
            if (_checkResourcesSettlement(player) && !state.InitialPlay) return state;
            if (
                state.Board[index].CrossRoadTopLeft !== null ? state.Board[index].CrossRoadTopLeft.Type._ !== player.Type._ : false ||
                    state.Board[index].CrossRoadTopRight !== null ? state.Board[index].CrossRoadTopRight.Type._ !== player.Type._ : false ||
                        state.Board[state.Board[index].TopRight].CrossRoadTopLeft !== null ? state.Board[state.Board[index].TopRight].CrossRoadTopLeft.Type._ !== player.Type._ : false
            ) return state;
            state.Board[index].CrossRoadTop = player;
            state.Board[state.Board[index].TopLeft].CrossRoadBottomRight = player;
            state.Board[state.Board[index].TopRight].CrossRoadBottomLeft = player;
            break;
        case "TopLeft":
            if (state.Board[index].CrossRoadTopLeft !== null) {
                return _setCity(state, index, "CrossRoadTopLeft", player);
            }
            if (
                !state.InitialPlay &&
                (
                    state.Board[index].RoadLeft !== null ? state.Board[index].RoadLeft.Type._ !== player.Type._ : true ||
                        state.Board[index].RoadTopLeft !== null ? state.Board[index].RoadTopLeft.Type._ !== player.Type._ : true ||
                            state.Board[indexLeft].RoadTopRight !== null ? state.Board[indexLeft].RoadTopRight.Type._ !== player.Type._ : true
                )
            ) return state;
            if (_checkResourcesSettlement(player) && !state.InitialPlay) return state;
            if (
                state.Board[index].CrossRoadTop !== null ? state.Board[index].CrossRoadTop.Type._ !== player.Type._ : false ||
                    state.Board[index].CrossRoadBottomLeft !== null ? state.Board[index].CrossRoadBottomLeft.Type._ !== player.Type._ : false ||
                        state.Board[state.Board[index].Left].CrossRoadTop !== null ? state.Board[state.Board[index].Left].CrossRoadTop.Type._ !== player.Type._ : false
            ) return state;
            state.Board[index].CrossRoadTopLeft = player;
            state.Board[state.Board[index].TopLeft].CrossRoadBottom = player;
            state.Board[state.Board[index].Left].CrossRoadTopRight = player;
            break;
        case "TopRight":
            if (state.Board[index].CrossRoadTopRight !== null) {
                return _setCity(state, index, "CrossRoadTopRight", player);
            }
            if (
                !state.InitialPlay &&
                (
                    state.Board[index].RoadTopRight !== null ? state.Board[index].RoadTopRight.Type._ !== player.Type._ : true ||
                        state.Board[index].RoadRight !== null ? state.Board[index].RoadRight.Type._ !== player.Type._ : true ||
                            state.Board[indexRight].RoadTopLeft !== null ? state.Board[indexRight].RoadTopLeft.Type._ !== player.Type._ : true
                )
            ) return state;
            if (_checkResourcesSettlement(player) && !state.InitialPlay) return state;
            if (
                state.Board[index].CrossRoadTop !== null ? state.Board[index].CrossRoadTop.Type._ !== player.Type._ : false ||
                    state.Board[index].CrossRoadBottomRight !== null ? state.Board[index].CrossRoadBottomRight.Type._ !== player.Type._ : false ||
                        state.Board[state.Board[index].Right].CrossRoadTop !== null ? state.Board[state.Board[index].Right].CrossRoadTop.Type._ !== player.Type._ : false
            ) return state;
            state.Board[index].CrossRoadTopRight = player;
            state.Board[state.Board[index].TopRight].CrossRoadBottom = player;
            state.Board[state.Board[index].Right].CrossRoadTopLeft = player;
            break;
        case "Bottom":
            if (state.Board[index].CrossRoadBottom !== null) {
                return _setCity(state, index, "CrossRoadBottom", player);
            };
            if (
                !state.InitialPlay &&
                (
                    state.Board[index].RoadBottomLeft !== null ? state.Board[index].RoadBottomLeft.Type._ !== player.Type._ : true ||
                        state.Board[index].RoadBottomRight !== null ? state.Board[index].RoadBottomRight.Type._ !== player.Type._ : true ||
                            state.Board[indexBottomRight].RoadLeft !== null ? state.Board[indexBottomRight].RoadLeft.Type._ !== player.Type._ : true
                )
            ) return state;
            if (_checkResourcesSettlement(player) && !state.InitialPlay) return state;
            if (
                state.Board[index].CrossRoadBottomLeft !== null ? state.Board[index].CrossRoadBottomLeft.Type._ !== player.Type._ : false ||
                    state.Board[index].CrossRoadBottomRight !== null ? state.Board[index].CrossRoadBottomRight.Type._ !== player.Type._ : false ||
                        state.Board[state.Board[index].BottomRight].CrossRoadBottomLeft !== null ? state.Board[state.Board[index].BottomRight].CrossRoadBottomLeft !== player.Type._ : false
            ) return state;
            state.Board[index].CrossRoadBottom = player;
            state.Board[state.Board[index].BottomLeft].CrossRoadTopRight = player;
            state.Board[state.Board[index].BottomRight].CrossRoadTopLeft = player;
            break;
        case "BottomLeft":
            if (state.Board[index].CrossRoadBottomLeft !== null) {
                return _setCity(state, index, "CrossRoadBottomLeft", player);
            }
            if (
                !state.InitialPlay &&
                (
                    state.Board[index].RoadBottomLeft !== null ? state.Board[index].RoadBottomLeft.Type._ !== player.Type._ : true ||
                        state.Board[index].RoadLeft !== null ? state.Board[index].RoadLeft.Type._ !== player.Type._ : true ||
                            state.Board[indexBottomLeft].RoadTopLeft !== null ? state.Board[indexBottomLeft].RoadTopLeft.Type._ !== player.Type._ : true
                )
            ) return state;
            if (_checkResourcesSettlement(player) && !state.InitialPlay) return state;
            if (
                state.Board[index].CrossRoadTopLeft !== null ? state.Board[index].CrossRoadTopLeft.Type._ !== player.Type._ : false ||
                    state.Board[index].CrossRoadBottom !== null ? state.Board[index].CrossRoadBottom.Type._ !== player.Type._ : false ||
                        state.Board[state.Board[index].BottomLeft].CrossRoadTopLeft !== null ? state.Board[state.Board[index].BottomLeft].CrossRoadTopLeft.Type._ !== player.Type._ : false
            ) return state;
            state.Board[index].CrossRoadBottomLeft = player;
            state.Board[state.Board[index].BottomLeft].CrossRoadTop = player;
            state.Board[state.Board[index].Left].CrossRoadBottomRight = player;
            break;
        case "BottomRight":
            if (state.Board[index].CrossRoadBottomRight !== null) {
                return _setCity(state, index, "CrossRoadBottomRight", player);
            };
            if (
                !state.InitialPlay &&
                (
                    state.Board[index].RoadBottomRight !== null ? state.Board[index].RoadBottomRight.Type._ !== player.Type._ : true ||
                        state.Board[index].RoadRight !== null ? state.Board[index].RoadRight.Type._ !== player.Type._ : true ||
                            state.Board[thisIndexBottomRight].RoadTopRight !== null ? state.Board[thisIndexBottomRight].RoadTopRight.Type._ !== player.Type._ : true
                )
            ) return state;
            if (_checkResourcesSettlement(player) && !state.InitialPlay) return state;
            if (
                state.Board[index].CrossRoadTopRight !== null ? state.Board[index].CrossRoadTopRight.Type._ !== player.Type._ : false ||
                    state.Board[index].CrossRoadBottom !== null ? state.Board[index].CrossRoadBottom.Type._ !== player.Type._ : false ||
                        state.Board[state.Board[index].BottomRight].CrossRoadTopRight !== null ? state.Board[index].CrossRoadTopRight.Type._ !== player.Type._ : false
            ) return state;
            state.Board[index].CrossRoadBottomRight = player;
            state.Board[state.Board[index].BottomRight].CrossRoadTop = player;
            state.Board[state.Board[index].Right].CrossRoadBottomLeft = player;
            break;
        default:
            console("How you do dis?");
            break;
    }
    if (!state.InitialPlay) {
        player.Brick -= constants.BUILDING_TYPE.SETTLEMENT.BRICK;
        player.Wool -= constants.BUILDING_TYPE.SETTLEMENT.WOOL;
        player.Grain -= constants.BUILDING_TYPE.SETTLEMENT.GRAIN;
    }
    state.Players = state.Players.map(element => {
        if (element.Type._ === player.Type._)
            element.Points++;
        return element;
    });
    return state;
}
const _setCity = (state, index, position, player) => {
    if (player.Ore < constants.BUILDING_TYPE.CITY.ORE ||
        player.Grain < constants.BUILDING_TYPE.CITY.Grain)
        return state;
    if (state.Board[index][position].IsCity)
        return state;

    state.Board[index][position] = {
        ...state.Board[index][position],
        IsCity: true
    }
    state.Players = state.Players.map(element => {
        if (element.Type._ === player.Type._) {
            element.Ore -= constants.BUILDING_TYPE.CITY.ORE;
            element.GRAIN -= constants.BUILDING_TYPE.CITY.GRAIN;
            element.Points++;
        }
        return element
    });
    return state;
}

const _setRoad = (state, payload) => {
    const { index, position, player } = payload;
    if (state.InitialPlay) {
        let check = _isNextPlayerTurn(state, player);
        if (check.hasPlacedRoad)
            return state;
    }
    if (!state.InitialPlay) {
        if ((player.Brick < constants.BUILDING_TYPE.ROAD.BRICK || player.Lumber < constants.BUILDING_TYPE.ROAD.LUMBER) && !state.InitialPlay)
            return state;
    }
    switch (position) {
        case "TopLeft":
            if (state.Board[index].RoadTopLeft !== null) return state;
            if (
                state.Board[index].RoadLeft !== null ? state.Board[index].RoadLeft.Type._ !== player.Type._ : true &&
                    state.Board[index].RoadTopRight !== null ? state.Board[index].RoadTopRight.Type._ !== player.Type._ : true &&
                        state.Board[state.Board[index].TopLeft].RoadRight !== null ? state.Board[state.Board[index].TopLeft].RoadRight.Type._ !== player.Type._ : true &&
                            state.Board[state.Board[index].TopLeft].RoadBottomLeft !== null ? state.Board[state.Board[index].TopLeft].RoadBottomLeft.Type._ !== player.Type._ : true &&
                                state.Board[index].CrossRoadTopLeft !== null ? state.Board[index].CrossRoadTopLeft.Type._ !== player.Type._ : true &&
                                    state.Board[index].CrossRoadTop !== null ? state.Board[index].CrossRoadTop.Type._ !== player.Type._ : true
            ) return state;
            state.Board[index].RoadTopLeft = player;
            state.Board[state.Board[index].TopLeft].RoadBottomRight = player;
            break;
        case "TopRight":
            if (state.Board[index].RoadTopRight !== null) return state;
            if (
                state.Board[index].RoadTopLeft !== null ? state.Board[index].RoadTopLeft.Type._ !== player.Type._ : true &&
                    state.Board[index].RoadRight !== null ? state.Board[index].RoadRight.Type._ !== player.Type._ : true &&
                        state.Board[state.Board[index].TopRight].RoadLeft !== null ? state.Board[state.Board[index].TopRight].RoadLeft.Type._ !== player.Type._ : true &&
                            state.Board[state.Board[index].TopRight].RoadBottomRight !== null ? state.Board[state.Board[index].TopRight].RoadBottomRight.Type._ !== player.Type._ : true &&
                                state.Board[index].CrossRoadTopRight !== null ? state.Board[index].CrossRoadTopRight.Type._ !== player.Type._ : true &&
                                    state.Board[index].CrossRoadTop !== null ? state.Board[index].CrossRoadTop.Type._ !== player.Type._ : true
            ) return state;
            state.Board[index].RoadTopRight = player;
            state.Board[state.Board[index].TopRight].RoadBottomLeft = player;
            break;
        case "Left":
            if (state.Board[index].RoadLeft !== null) return state;
            if (
                state.Board[index].RoadTopLeft !== null ? state.Board[index].RoadTopLeft.Type._ !== player.Type._ : true &&
                    state.Board[index].RoadBottomLeft !== null ? state.Board[index].RoadBottomLeft.Type._ !== player.Type._ : true &&
                        state.Board[state.Board[index].Left].RoadBottomRight !== null ? state.Board[state.Board[index].Left].RoadBottomRight.Type._ !== player.Type._ : true &&
                            state.Board[state.Board[index].Left].RoadTopRight !== null ? state.Board[state.Board[index].Left].RoadTopRight.Type._ !== player.Type._ : true &&
                                state.Board[index].CrossRoadTopLeft !== null ? state.Board[index].CrossRoadTopLeft.Type._ !== player.Type._ : true &&
                                    state.Board[index].CrossRoadBottomLeft !== null ? state.Board[index].CrossRoadBottomLeft.Type._ !== player.Type._ : true
            ) return state;
            state.Board[index].RoadLeft = player;
            state.Board[state.Board[index].Left].RoadRight = player;
            break;
        case "Right":
            if (state.Board[index].RoadRight !== null) return state;
            if (
                state.Board[index].RoadTopRight !== null ? state.Board[index].RoadTopRight.Type._ !== player.Type._ : true &&
                    state.Board[index].RoadBottomRight !== null ? state.Board[index].RoadBottomRight.Type._ !== player.Type._ : true &&
                        state.Board[state.Board[index].Right].RoadBottomLeft !== null ? state.Board[state.Board[index].Right].RoadBottomLeft.Type._ !== player.Type._ : true &&
                            state.Board[state.Board[index].Right].RoadTopLeft !== null ? state.Board[state.Board[index].Right].RoadTopLeft.Type._ !== player.Type._ : true &&
                                state.Board[index].CrossRoadTopRight !== null ? state.Board[index].CrossRoadTopRight.Type._ !== player.Type._ : true &&
                                    state.Board[index].CrossRoadBottomRight !== null ? state.Board[index].CrossRoadBottomRight.Type._ !== player.Type._ : true
            ) return state;
            state.Board[index].RoadRight = player;
            state.Board[state.Board[index].Right].RoadLeft = player;
            break;
        case "BottomLeft":
            if (state.Board[index].RoadBottomLeft !== null) return state;
            if (
                state.Board[index].RoadLeft !== null ? state.Board[index].RoadLeft.Type._ !== player.Type._ : true &&
                    state.Board[index].RoadBottomRight !== null ? state.Board[index].RoadBottomRight.Type._ !== player.Type._ : true &&
                        state.Board[state.Board[index].BottomLeft].RoadTopLeft !== null ? state.Board[state.Board[index].BottomLeft].RoadTopLeft.Type._ !== player.Type._ : true &&
                            state.Board[state.Board[index].BottomLeft].RoadRight !== null ? state.Board[state.Board[index].BottomLeft].RoadRight.Type._ !== player.Type._ : true &&
                                state.Board[index].CrossRoadBottomLeft !== null ? state.Board[index].CrossRoadBottomLeft.Type._ !== player.Type._ : true &&
                                    state.Board[index].CrossRoadBottom !== null ? state.Board[index].CrossRoadBottom.Type._ !== player.Type._ : true
            ) return state;
            state.Board[index].RoadBottomLeft = player;
            state.Board[state.Board[index].BottomLeft].RoadTopRight = player;
            break;
        case "BottomRight":
            if (state.Board[index].RoadBottomRight !== null) return state;
            if (
                state.Board[index].RoadRight !== null ? state.Board[index].RoadRight.Type._ !== player.Type._ : true &&
                    state.Board[index].RoadBottomLeft !== null ? state.Board[index].RoadBottomLeft.Type._ !== player.Type._ : true &&
                        state.Board[state.Board[index].BottomRight].RoadTopRight !== null ? state.Board[state.Board[index].BottomRight].RoadTopRight.Type._ !== player.Type._ : true &&
                            state.Board[state.Board[index].BottomRight].RoadLeft !== null ? state.Board[state.Board[index].BottomRight].RoadLeft.Type._ !== player.Type._ : true &&
                                state.Board[index].CrossRoadBottomRight !== null ? state.Board[index].CrossRoadBottomRight.Type._ !== player.Type._ : true &&
                                    state.Board[index].CrossRoadBottom !== null ? state.Board[index].CrossRoadBottom.Type._ !== player.Type._ : true
            ) return state;
            state.Board[index].RoadBottomRight = player;
            state.Board[state.Board[index].BottomRight].RoadTopLeft = player;
            break;
        default:
            console.log("How u do dis?");
            break;
    }
    if (!state.InitialPlay) {
        player.Brick -= constants.BUILDING_TYPE.ROAD.BRICK;
        player.Lumber -= constants.BUILDING_TYPE.ROAD.LUMBER;
    }
    return state;
}

const _nextPlayer = (state) => {
    let player = state.Players[0];
    state.Players.splice(0, 1);
    state.Players.push(player);
    state.HasRolled = false;
    return state;
}

const _rollDice = (state) => {
    state.HasRolled = true;
    let randomRoll = (Math.floor(Math.random() * 12) + 1);
    state = _generateResource(state, randomRoll);
    state.Rolled = randomRoll;
    return state;
}
const _generateResource = (state, randomRoll) => {
    if (randomRoll === 7) return state;
    let hexesInQuestion = state.Board.filter(element => element.Chit === randomRoll);
    let playerToEditIndex;
    hexesInQuestion.forEach(hexInQuestion => {
        if (hexInQuestion.CrossRoadTop !== null) {
            playerToEditIndex = state.Players.findIndex(player => player.Type._ === hexInQuestion.CrossRoadTop.Type._);
            state.Players[playerToEditIndex][hexInQuestion.TileType.TYPE]++;
            if(hexInQuestion.IsCity)
                state.Players[playerToEditIndex][hexInQuestion.TileType.TYPE]++;
        }
        if (hexInQuestion.CrossRoadBottom !== null) {
            playerToEditIndex = state.Players.findIndex(player => player.Type._ === hexInQuestion.CrossRoadBottom.Type._);
            state.Players[playerToEditIndex][hexInQuestion.TileType.TYPE]++;
            if(hexInQuestion.IsCity)
                state.Players[playerToEditIndex][hexInQuestion.TileType.TYPE]++;
        }
        if (hexInQuestion.CrossRoadTopLeft !== null) {
            playerToEditIndex = state.Players.findIndex(player => player.Type._ === hexInQuestion.CrossRoadTopLeft.Type._);
            state.Players[playerToEditIndex][hexInQuestion.TileType.TYPE]++;
            if(hexInQuestion.IsCity)
                state.Players[playerToEditIndex][hexInQuestion.TileType.TYPE]++;
        }
        if (hexInQuestion.CrossRoadTopRight !== null) {
            playerToEditIndex = state.Players.findIndex(player => player.Type._ === hexInQuestion.CrossRoadTopRight.Type._);
            state.Players[playerToEditIndex][hexInQuestion.TileType.TYPE]++;
            if(hexInQuestion.IsCity)
                state.Players[playerToEditIndex][hexInQuestion.TileType.TYPE]++;
        }
        if (hexInQuestion.CrossRoadBottomLeft !== null) {
            playerToEditIndex = state.Players.findIndex(player => player.Type._ === hexInQuestion.CrossRoadBottomLeft.Type._);
            state.Players[playerToEditIndex][hexInQuestion.TileType.TYPE]++;
            if(hexInQuestion.IsCity)
                state.Players[playerToEditIndex][hexInQuestion.TileType.TYPE]++;
        }
        if (hexInQuestion.CrossRoadBottomRight !== null) {
            playerToEditIndex = state.Players.findIndex(player => player.Type._ === hexInQuestion.CrossRoadBottomRight.Type._);
            state.Players[playerToEditIndex][hexInQuestion.TileType.TYPE]++;
            if(hexInQuestion.IsCity)
                state.Players[playerToEditIndex][hexInQuestion.TileType.TYPE]++;
        }
    });

    return state;
}