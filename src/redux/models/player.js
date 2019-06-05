class Player {
    constructor(type) {
        this.Name = "";
        this.Type = type;
        this.Brick = 0;
        this.Wool = 0;
        this.Ore = 0;
        this.Grain = 0;
        this.Lumber = 0;
        this.Points = 0;
        this.HasPlayedFirstHand = false;
        this.HasPlayedSecondHand = false;
    }
}
export default Player;