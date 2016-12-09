import Actor from './Actor';
import Ai from '../ai/Ai'

export default class ShooterEnemy extends Actor {
  constructor(game, x, y, key) {
    super(game, x, y, key)

    this.armor = 0;
    this.health = 3;

    this.aiLevel = Ai.simple;
    this.delay = 0; //AI Stuff
  }
}
