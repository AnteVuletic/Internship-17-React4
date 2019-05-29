import { constants } from '../../constants';

const INITIALIZE_BOARD = "INITIALIZE_BOARD";
const GET_BOARD = "GET_BOARD";
const SET_BOARD = "SET_BOARD";

class HexModel{
    constructor(index){
        this.Index = index;
        this.Chit = this.getRandomChit();
        this.Tile_Type = this.getRandomTileType();
        this.TopLeft = 0;
        this.TopRight = 0;
        this.Left = 0;
        this.Right = 0;
        this.BottomLeft = 0;
        this.BottomRight = 0;
        this.getNeighbours();
    };
    getRandomTileType = () =>{
        let randomBoardTypeIndex = Math.floor(Math.random() * constants.BOARD_HEXES.length);
        let randomBoardType = constants.BOARD_HEXES[randomBoardTypeIndex];
        constants.BOARD_HEXES.splice(randomBoardTypeIndex,randomBoardTypeIndex+1);
        return randomBoardType;
    };
    getNeighbours = ( ) =>{
        switch(this.index){
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
        constants.CHIT_VALUES.splice(randomChitIndex,randomChitIndex+1);
        return randomChit;
    }
}


const initialState = {
    Board: []
}

export const initializeBoard = _ => {
    for(let itterator = 1; itterator < 20; itterator++){
        initialState.Board.push(new HexModel(itterator));
    }
    return{
        type: INITIALIZE_BOARD,
        initialState
    }
}
export const getBoard = _ =>{
    return{
        type: GET_BOARD,
        initialState
    }
}

const reducer = (state = initialState,action) =>{
    switch(action.type){
        case INITIALIZE_BOARD:
            return{
                ...state
            }
        case SET_BOARD:
            return{
                ...state
            }
        case GET_BOARD:
            return{
                ...state
            }
        default:
            return state;
    }
}
export default reducer;