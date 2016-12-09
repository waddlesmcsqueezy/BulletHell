import statics from '../util/Statics';

export default class Room {
  constructor(game, xPos, yPos, width, height) {
    // make internal grid
    this.grid = [];
    this.width = width;
    this.height = height;

    for (var y = 0; y < this.height; y++) {
      this.grid.push([]);
      for (var x = 0; x < this.width; x++) {
        this.grid[y].push(0);
      }
    }

    // make floor = width x height
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        if (this.grid[y][x] === 0) {
          if (x == 0 || x == this.width - 1 || y == 0 || y == this.height - 1) {  //spritesheet frames: 0 = wall tile, 1 = floor tile, 2 = chest tile
            this.grid[y][x] = game.add.sprite((x * statics.TILE_SIZE) + (xPos * statics.TILE_SIZE), (y * statics.TILE_SIZE) + (yPos * statics.TILE_SIZE), 'spritesheet', 0); // wall
            game.physics.enable(this.grid[y][x], Phaser.Physics.ARCADE);
            this.grid[y][x].body.immovable = true;
          } else {this.grid[y][x] = game.add.sprite((x * statics.TILE_SIZE) + (xPos * statics.TILE_SIZE), (y * statics.TILE_SIZE) + (yPos * statics.TILE_SIZE), 'spritesheet', 1);} //floor
        } else {console.log("Room grid: " + x, y + " is occupied by: " + game.world.map[y][x])}
      }
    }
  }

  getGrid() {
    return this.grid;
  }

  getTile(x, y) {
    return this.grid[y][x];
  }
}
