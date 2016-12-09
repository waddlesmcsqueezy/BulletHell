import statics from '../util/Statics';
import Room from '../maps/Room'

export default class MapFactory {
  constructor(game) {
    this.mapLog = [];
  }

  createMap(game, width, height) {
    if (game.world.map != null) {
      this.mapLog.push(game.world.map);
    }
    game.world.map = [];
    game.world.map.width = width;
    game.world.map.height = height;
    for (var y = 0; y < game.world.map.height; y++) {
      game.world.map.push([]);
      for (var x = 0; x < game.world.map.width; x++) {
        game.world.map[y].push(0);
      }
    }

  }

  createRooms(game) {
    var roomX = 13;
    var roomY = 13;
    for (var y = 0; y < game.world.map.height; y++) {
      for (var x = 0; x < game.world.map.width; x++) {
        if (game.world.map[y][x] == 0) {
          game.world.map[y][x] = new Room(game, x * (roomX), y * (roomY), roomX, roomY);
          console.log("Placing room at: " + x, y);
        } else {console.log("map grid: " + x, y + " is occupied by: " + game.world.map[y][x])}
      }
    }
  }

  getRoom(game, x, y) {
    return game.world.map[y][x];
  }
}
