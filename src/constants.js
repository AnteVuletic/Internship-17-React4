const RESOURCE_TYPE = {
    BRICK : "Brick",
    WOOL : "Wool",
    ORE : "Ore",
    GRAIN : "Grain",
    LUMBER : "Lumber"
};
Object.freeze(RESOURCE_TYPE);

const TILE_TYPES = {
    DESERT:{
        TYPE: "",   
        COLOR: "#C6A664",
    },
    HILL: {
        TYPE: RESOURCE_TYPE.BRICK,
        COLOR: "#5A4d41"
    },
    PASTURE: {
        TYPE: RESOURCE_TYPE.WOOL,
        COLOR: "#7EC850"
    },
    MOUNTAIN: {
        TYPE: RESOURCE_TYPE.ORE,
        COLOR: "#808487"
    },
    FOREST: {
        TYPE: RESOURCE_TYPE.LUMBER,
        COLOR: "#567D46"
    },
    FIELD: {
        TYPE: RESOURCE_TYPE.GRAIN,
        COLOR: "#f5deb3"
    }
};
Object.freeze(TILE_TYPES);

const PLAYER_TYPES = {
    RED: {
        _: "RED",
        COLOR: "#FF0000"
    },
    GREEN: {
        _: "GREEN",
        COLOR: "#00FF00"
    },
    BLUE: {
        _: "BLUE",
        COLOR: "#0000FF"
    },
    GRAY: {
        _: "GRAY",
        COLOR: "#7D7D7D"
    }
};
Object.freeze(PLAYER_TYPES);

const BUILDING_TYPE = {
    ROAD: {
        BRICK: 1,
        LUMBER: 1
    },
    SETTLEMENT: {
        BRICK: 1,
        WOOL: 1,
        GRAIN: 1
    },
    CITY:{
        ORE: 3,
        GRAIN: 2
    }
};
Object.freeze(BUILDING_TYPE);

const CHIT_VALUES = ["x",2,12,3,3,11,11,4,4,10,10,5,5,9,9,6,6,8,8];

const BOARD_HEXES = [
    TILE_TYPES.DESERT,
    TILE_TYPES.FOREST, TILE_TYPES.FOREST, TILE_TYPES.FOREST, TILE_TYPES.FOREST,
    TILE_TYPES.FIELD, TILE_TYPES.FIELD, TILE_TYPES.FIELD, TILE_TYPES.FIELD,
    TILE_TYPES.PASTURE, TILE_TYPES.PASTURE, TILE_TYPES.PASTURE, TILE_TYPES.PASTURE,
    TILE_TYPES.MOUNTAIN, TILE_TYPES.MOUNTAIN, TILE_TYPES.MOUNTAIN,
    TILE_TYPES.HILL, TILE_TYPES.HILL, TILE_TYPES.HILL
];

const PLAYER_TYPES_LEFT = [
    PLAYER_TYPES.RED, PLAYER_TYPES.GREEN, PLAYER_TYPES.BLUE, PLAYER_TYPES.GRAY
];

export const constants ={
    RESOURCE_TYPE,
    TILE_TYPES,
    PLAYER_TYPES,
    BUILDING_TYPE,
    CHIT_VALUES,
    BOARD_HEXES,
    PLAYER_TYPES_LEFT
}