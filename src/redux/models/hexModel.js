import { constants } from '../../constants'

class HexModel {
    constructor(index, chit, tiletype) {
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
    getRandomTileType = () => {
        let randomBoardTypeIndex = Math.floor(Math.random() * constants.BOARD_HEXES.length);
        let randomBoardType = constants.BOARD_HEXES[randomBoardTypeIndex];
        constants.BOARD_HEXES.splice(randomBoardTypeIndex, 1);
        return randomBoardType;
    };
    setNeighbours = () => {
        switch (this.Index) {
            case 1:
                this.Right = 2;
                this.BottomLeft = 4;
                this.BottomRight = 5;
                this.Left = 20;
                this.TopLeft = 21;
                this.TopRight = 22;
                break;
            case 2:
                this.Left = 1;
                this.Right = 3;
                this.BottomLeft = 5;
                this.BottomRight = 6;
                this.TopLeft = 22;
                this.TopRight = 23;
                break;
            case 3:
                this.Left = 2;
                this.BottomLeft = 6;
                this.BottomRight = 7;
                this.TopLeft = 23;
                this.TopRight = 24;
                this.Right = 25;
                break;
            case 4:
                this.TopRight = 1;
                this.Right = 5;
                this.BottomLeft = 8;
                this.BottomRight = 9;
                this.TopLeft = 20;
                this.Left = 26;
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
                this.TopRight = 25;
                this.Right = 27;
                break;
            case 8:
                this.TopRight = 4;
                this.Right = 9;
                this.BottomRight = 13;
                this.TopLeft = 26;
                this.Left = 28;
                this.BottomLeft = 30;
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
                this.TopRight = 28;
                this.Right = 29;
                this.BottomRight = 31;
                break;
            case 13:
                this.TopLeft = 8;
                this.TopRight = 9;
                this.Right = 14;
                this.BottomRight = 17;
                this.Left = 30;
                this.BottomLeft = 32;
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
                this.Right = 31;
                this.BottomRight = 37;
                break;
            case 17:
                this.TopLeft = 13;
                this.TopRight = 14;
                this.Right = 18;
                this.Left = 32;
                this.BottomLeft = 33;
                this.BottomRight = 34;
                break;
            case 18:
                this.TopLeft = 14;
                this.TopRight = 15;
                this.Left = 17;
                this.Right = 19;
                this.BottomLeft = 34;
                this.BottomRight = 35;
                break;
            case 19:
                this.TopLeft = 15;
                this.TopRight = 16;
                this.Left = 18;
                this.BottomLeft = 35;
                this.BottomRight = 36;
                this.Right = 37;
                break;
            case 20:
                this.Right = 1;
                this.TopRight = 21;
                this.BottomRight = 4;
                this.BottomLeft = 26;
                break;
            case 21:
                this.BottomLeft = 20;
                this.BottomRight = 1;
                this.Right = 22;
                break;
            case 22:
                this.Left = 21;
                this.BottomLeft = 1;
                this.BottomRight = 2;
                this.Right = 23;
                break;
            case 23:
                this.Left = 22;
                this.BottomLeft = 2;
                this.BottomRight = 3;
                this.Right = 24;
                break;
            case 24:
                this.Left = 23;
                this.BottomLeft = 3;
                this.BottomRight = 25;
                break;
            case 25:
                this.TopLeft = 24;
                this.Left = 3;
                this.BottomLeft = 7;
                this.BottomRight = 27;
                break;
            case 26:
                this.Right = 4;
                this.BottomRight = 8;
                this.TopRight = 20;
                this.BottomLeft = 28;
                break;
            case 27:
                this.Left = 7;
                this.Bottomleft = 12;
                this.TopLeft = 25;
                this.BottomRight = 29;
                break;
            case 28:
                this.Right = 8;
                this.TopRight = 26;
                this.BottomRight = 30;
                break;
            case 29:
                this.Topleft = 27;
                this.Left = 12;
                this.BottomLeft = 31;
                break;
            case 30:
                this.TopLeft = 28;
                this.TopRight = 8;
                this.Right = 13;
                this.BottomRight = 32;
                break;
            case 31:
                this.TopRight = 29;
                this.TopLeft = 12;
                this.Left = 16;
                this.BottomLeft = 37;
                break;
            case 32:
                this.TopLeft = 30;
                this.TopRight = 13;
                this.Right = 17;
                this.BottomRight = 33;
                break;
            case 33:
                this.TopLeft = 32;
                this.TopRight = 17;
                this.Right = 34;
                break;
            case 34:
                this.Left = 33;
                this.TopLeft = 17;
                this.TopRight = 18;
                this.Right = 35;
                break;
            case 35:
                this.Left = 34;
                this.TopLeft = 18;
                this.TopRight = 19;
                this.Right = 36;
                break;
            case 36:
                this.TopLeft = 19;
                this.TopRight = 37;
                this.Left = 35;
                break;
            case 37:
                this.Left = 19;
                this.TopLeft = 16;
                this.BottomLeft = 36;
                this.TopRight = 31;
                break;
            default:
                break;

        }
    }
    getRandomChit = () => {
        let randomChitIndex = Math.floor(Math.random() * constants.CHIT_VALUES.length);
        let randomChit = constants.CHIT_VALUES[randomChitIndex];
        constants.CHIT_VALUES.splice(randomChitIndex, 1);
        return randomChit;
    }
};
export default HexModel;