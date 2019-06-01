import { constants } from '../../constants';

const SET_ROAD = "SET_ROAD";
const SET_CROSSROAD = "SET_CROSSROAD";
const SET_PLAYERS = "SET_PLAYERS";

class HexModel{
    constructor(index,chit,tiletype){
        this.Index = index;
        this.Chit = chit ? chit : this.getRandomChit();
        this.TileType = tiletype ? tiletype : this.getRandomTileType();
        this.TopLeft = 0;
        this.TopRight = 0;
        this.Left = 0;
        this.Right = 0;
        this.BottomLeft = 0;
        this.BottomRight = 0;
        this.CrossRoadTopLeft = null;
        this.CrossRoadTopRight = null;
        this.CrossRoadTop = null;
        this.CrossRoadBottom = null;
        this.CrossRoadBottomLeft = null;
        this.CrossRoadBottomRight = null;
        this.RoadTopLeft = null;
        this.RoadTopRight = null;
        this.RoadLeft = null;
        this.RoadRight = null;
        this.RoadBottomLeft = null;
        this.RoadBottomRight = null;
    };
    getRandomTileType = () =>{
        let randomBoardTypeIndex = Math.floor(Math.random() * constants.BOARD_HEXES.length);
        let randomBoardType = constants.BOARD_HEXES[randomBoardTypeIndex];
        constants.BOARD_HEXES.splice(randomBoardTypeIndex,1);
        return randomBoardType;
    };
    setNeighbours = () =>{
        switch(this.Index){
            case 1:
                this.Right = 2;
                this.BottomLeft = 4;
                this.BottomRight = 5;
                break;
            case 2:
                this.Left = 1;
                this.Right = 3;
                this.BottomLeft = 5;
                this.BottomRight = 6;
                break;
            case 3:
                this.Left = 2;
                this.BottomLeft = 6;
                this.BottomRight = 7;
                break;
            case 4:
                this.TopRight = 1;
                this.Right = 5;
                this.BottomLeft = 8;
                this.BottomRight = 9;
                break;
            case 5:
                this.TopLeft = 1;
                this.TopRight = 2;
                this.Left = 4;
                this.Right = 6;
                this.BottomLeft = 9;
                this.BottomRight = 10;
                break;
            case 6:
                this.TopLeft = 2;
                this.TopRight = 3;
                this.Left = 5;
                this.Right = 7;
                this.BottomLeft = 10;
                this.BottomRight = 11;
                break;
            case 7:
                this.TopLeft = 3;
                this.Left = 6;
                this.BottomLeft = 11;
                this.BottomRight = 12;
                break;
            case 8:
                this.TopRight = 4;
                this.Right = 9;
                this.BottomRight = 13;
                break;
            case 9:
                this.TopLeft = 4;
                this.TopRight = 5;
                this.Left = 8;
                this.Right = 10;
                this.BottomLeft = 13;
                this.BottomRight = 14;
                break;
            case 10:
                this.TopLeft = 5;
                this.TopRight = 6;
                this.Left = 9;
                this.Right = 11;
                this.BottomLeft = 14;
                this.BottomRight = 15;
                break;
            case 11:
                this.TopLeft = 6;
                this.TopRight = 7;
                this.Left = 10;
                this.Right = 12;
                this.BottomLeft = 15;
                this.BottomRight = 16;
                break;
            case 12:
                this.TopLeft = 7;
                this.Left = 11;
                this.BottomLeft = 15;
                break;
            case 13:
                this.TopLeft = 8;
                this.TopRight = 9;
                this.Right = 14;
                this.BottomRight = 17;
                break;
            case 14:
                this.TopLeft = 9;
                this.TopRight = 10;
                this.Left = 13;
                this.Right = 15;
                this.BottomLeft = 17;
                this.BottomRight = 18;
                break;
            case 15:
                this.TopLeft = 10;
                this.TopRight = 11;
                this.Left = 14;
                this.Right = 16;
                this.BottomLeft = 18;
                this.BottomRight = 19;
                break;
            case 16:
                this.TopLeft = 11;
                this.TopRight = 12;
                this.Left = 15;
                this.BottomLeft = 19;
                break;
            case 17:
                this.TopLeft = 13;
                this.TopRight = 14;
                this.Right = 18;
                break;
            case 18:
                this.TopLeft = 14;
                this.TopRight = 15;
                this.Left = 17;
                this.Right = 19;
                break;
            case 19:
                this.TopLeft = 15;
                this.TopRight = 16;
                this.Left = 18;
                break;
            default:
                break;

        }
    }
    getRandomChit = () =>{
        let randomChitIndex = Math.floor(Math.random() * constants.CHIT_VALUES.length);
        let randomChit = constants.CHIT_VALUES[randomChitIndex];
        constants.CHIT_VALUES.splice(randomChitIndex,1);
        return randomChit;
    }
};

class Player {
    constructor(type){
        this.Name = "";
        this.Type = type;
        this.Brick = 0;
        this.Wool = 0;
        this.Ore = 0;
        this.Grain = 0;
        this.Lumber = 0;
        this.Points = 0;
    }
}

const initialState = {
    Board: [],
    Players: []
};

const initializePlayers = () =>{
    for(let itterator = 0; itterator < 4; itterator++){
        let newPlayer = new Player(constants.PLAYER_TYPES_LEFT.pop());
        initialState.Players.push(newPlayer);
    }
};
const initializeBoard = () =>{
    initialState.Board.push({Index: 0, TileType: { COLOR: '#FFF'}});
    let randomDesertIndex = Math.floor(Math.random()*20)+1;
    let desertHex = new HexModel(randomDesertIndex,constants.CHIT_VALUES[0],constants.BOARD_HEXES[0]);
    constants.CHIT_VALUES.splice(0,1);
    constants.BOARD_HEXES.splice(0,1);
    for(let itterator = 1; itterator < 20; itterator++){
        if(itterator !== randomDesertIndex){
            let newHex = new HexModel(itterator);
            newHex.setNeighbours();
            initialState.Board.push(newHex);
        }
        else
            initialState.Board.push(desertHex);
    }
};


initializeBoard();
initializePlayers();

export const setCrossroad = (index, position, player) => dispatchEvent =>{
    dispatchEvent({
        type: SET_CROSSROAD,
        payload: { index, position, player}
    });
};

export const setRoad = ( index, position, player ) => dispatchEvent =>{
    return dispatchEvent({
        type: SET_ROAD,
        payload: { index, position, player}
    });
};

export const setPlayers = (playerNames) => dispatchEvent =>{
    return dispatchEvent({
        type: SET_PLAYERS,
        payload: playerNames
    });
};
const reducer = (state = initialState,action) =>{
    switch(action.type){
        case SET_CROSSROAD:{
            return{
                ..._setCrossroad(state,action.payload)
            }
        }
        case SET_ROAD:{
            return{
                ..._setRoad(state,action.payload)
            }
        }
        case SET_PLAYERS:{
            return{
                ..._setPlayers(state,action.payload)
            }
        }
        default:
            return state;
    }
}
export default reducer;

const _setPlayers = ( state, payload ) =>{
    let playersEntered = payload;
    for(let index = 0; index < state.Players.length; index++){
        const randomPlayerIndex = Math.floor(Math.random() * playersEntered.length);
        const randomPlayer = playersEntered[randomPlayerIndex];
        playersEntered.splice(randomPlayerIndex,1);
        state.Players[index].Name = randomPlayer;
    }
    return state
}

const _setCrossroad = ( state, payload ) =>{
    const { index,position, player } = payload;
    switch(position){
        case "Top":
            if(state.Board[index].CrossRoadTop !== null ) return state;
            state.Board[index].CrossRoadTop = player;
            state.Board[state.Board[index].TopLeft].CrossRoadBottomRight = player;
            state.Board[state.Board[index].TopRight].CrossRoadBottomLeft = player;
            break;
        case "TopLeft":
            if(state.Board[index].CrossRoadTopLeft !== null ) return state;
            state.Board[index].CrossRoadTopLeft = player;
            state.Board[state.Board[index].TopLeft].CrossRoadBottom = player;
            state.Board[state.Board[index].Left].CrossRoadTopRight = player;
            break;
        case "TopRight":
            if(state.Board[index].CrossRoadTopRight !== null ) return state;
            state.Board[index].CrossRoadTopRight = player;
            state.Board[state.Board[index].TopRight].CrossRoadBottom = player;
            state.Board[state.Board[index].Right].CrossRoadTopLeft = player;
            break;
        case "Bottom":
            if(state.Board[index].CrossRoadBottom !== null ) return state;
            state.Board[index].CrossRoadBottom = player;
            state.Board[state.Board[index].BottomLeft].CrossRoadTopRight = player;
            state.Board[state.Board[index].BottomRight].CrossRoadTopLeft = player;
            break;
        case "BottomLeft":
            if(state.Board[index].CrossRoadBottomLeft !== null ) return state;
            state.Board[index].CrossRoadBottomLeft = player;
            state.Board[state.Board[index].BottomLeft].CrossRoadTop = player;
            state.Board[state.Board[index].Left].CrossRoadBottomRight = player;
            break;
        case "BottomRight":
            if(state.Board[index].CrossRoadBottomRight !== null ) return state;
            state.Board[index].CrossRoadBottomRight = player;
            state.Board[state.Board[index].BottomRight].CrossRoadTop = player;
            state.Board[state.Board[index].Right].CrossRoadBottomLeft = player;
            break;
        default:
            console("How you do dis?");
            break;
    }
    state = _nextPlayer(state);
    return state;
}

const _setRoad = ( state, payload ) =>{
    const { index, position, player } = payload;
    switch(position){
        case "TopLeft":
            if(state.Board[index].RoadTopLeft !== null) return state;
            state.Board[index].RoadTopLeft = player;
            state.Board[state.Board[index].TopLeft].RoadBottomRight = player;
            break;
        case "TopRight":
            if(state.Board[index].RoadTopRight !== null) return state;
            state.Board[index].RoadTopRight = player;
            state.Board[state.Board[index].TopRight].RoadBottomLeft = player;
            break;
        case "Left":
            if(state.Board[index].RoadLeft !== null) return state;
            state.Board[index].RoadLeft = player;
            state.Board[state.Board[index].Left].RoadRight = player;
            break;
        case "Right":
            if(state.Board[index].RoadRight !== null) return state;
            state.Board[index].RoadRight = player;
            state.Board[state.Board[index].Right].RoadLeft = player;
            break;
        case "BottomLeft":
            if(state.Board[index].RoadBottomLeft !== null) return state;
            state.Board[index].RoadBottomLeft = player;
            state.Board[state.Board[index].BottomLeft].RoadTopRight = player;
            break;
        case "BottomRight":
            if(state.Board[index].RoadBottomRight    !== null) return state;
            state.Board[index].RoadBottomRight = player;
            state.Board[state.Board[index].BottomRight].RoadTopLeft = player;
            break;
        default:
            console.log("How u do dis?");
            break;
    }
    state = _nextPlayer(state)
    return state;
}
const _nextPlayer = (state)=>{
    let player = state.Players[0];
    state.Players.splice(0,1);
    state.Players.push(player);
    return state;
}