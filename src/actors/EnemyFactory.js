import Pistol from '../guns/Pistol'
import ShooterEnemy from '../actors/ShooterEnemy'

export default class EnemyFactory {
  constructor() {

  }

  createEnemy (x,y,group,game) {
    var enemy = new ShooterEnemy(game, x, y, 'enemy')
    enemy.addGun(new Pistol (game,game.plugins))
    enemy.anchor.setTo(0.5, 0.5);
    group.push(enemy)
  }
}
