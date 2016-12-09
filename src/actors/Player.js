import Actor from './Actor';

export default class Player extends Actor {
  constructor(game, x, y, key) {
    super(game, x, y, key);
    this.armor = 0;
    this.health = 5;
  }

  damage(amount, game) {
    if (this.isDamagable) {
      if (this.armor <= 0) {
        this.health -= amount; //directly damage health
        game.camera.flash(0xff0000, this.iFramesTime, true);
      } else {
        if (this.armor - amount <= this.armor) { // if damage would exceed armor amount
          this.armor -= amount - (amount % this.armor); // get amount of damage armor would take eg; armor = 2 & damage = 3 in this case 3%2 = 1 so armor would take 2 damage
          this.health -= (amount % this.armor); // get amount of damage gets through armor and damage health in this ^ example, health takes 1 damage, armor absorbed 2 damage
        } else {this.armor -= amount;} // else, just directly damage armor
      }
    } else {console.log("Actor is in iFrames")} // if actor in in their iFrames (invincible to taking damage)
  }

  update() {
    this.bringToTop();
  }
}
