import List from 'collections/list';

export default class Actor {
  constructor(game, x, y, key) {
    Phaser.Sprite.call(this, game, x, y, key);

    game.physics.enable(this, Phaser.Physics.ARCADE);
    // game.physics.p2.enable(this);

    this.armor = 0;
    this.health = 1;

    this.actorSpeed = 250; //speed of actor
    this.anchor.setTo(0.5, 0.5);
    this.smoothed = false;

    this.gunList = new List(); //getGunList()[0] is the currently equipped weapon

    this.itemSlot1;
    this.itemSlot2;
    this.item;

    this.isDamagable = true;
    this.isDead = false;
    this.isMoving = false; //only used for ai at the moment

    game.add.existing(this);

    this.iFramesTime = 2 * Phaser.Timer.SECOND;
  }
}

Actor.prototype = Object.create(Phaser.Sprite.prototype);
Actor.prototype.constructor = Actor;

Actor.prototype.addArmor = function(amount) {
  if (this.armor === 0) {
    this.armor = amount
  } else {this.armor += amount;}
}

Actor.prototype.heal = function(amount) {
  if (this.health === 0) {
    this.health = amount
  } else {this.health += amount;}
}

Actor.prototype.damage = function(amount, game) {
  if (this.isDamagable) {
    if (this.armor <= 0) {
      this.health -= amount; //directly damage health
    } else {
      if (this.armor - amount <= this.armor) { // if damage would exceed armor amount
        this.armor -= amount - (amount % this.armor); // get amount of damage armor would take eg; armor = 2 & damage = 3 in this case 3%2 = 1 so armor would take 2 damage
        this.health -= (amount % this.armor); // get amount of damage gets through armor and damage health in this ^ example, health takes 1 damage, armor absorbed 2 damage
      } else {this.armor -= amount;} // else, just directly damage armor
    }
  } else {console.log("Actor is in iFrames")} // if actor in in their iFrames (invincible to taking damage)
}

Actor.prototype.hasHealth = function() {
  if (this.health <= 0) {
    return false
  } else {return true}
}

Actor.prototype.enableDamage = function() {
  this.isDamagable = true;
}

Actor.prototype.disableDamage = function() {
  this.isDamagable = false;
}

Actor.prototype.beginInvincibilityFrames = function(game) {
  this.disableDamage();
  game.time.events.add(this.getInvincibilityFrames(), this.enableDamage, this);
}

Actor.prototype.getInvincibilityFrames = function() {
  return 2 * Phaser.Timer.SECOND;
}

Actor.prototype.getBody = function() {
  return this.body;
}

Actor.prototype.nextGun = function() {
  if (this.getGunList()[0].isReloading == false) {
    this.gunList.push(this.gunList.shift()); //remove first item in the list and move it to the end;
  }
}

Actor.prototype.previousGun = function() {
  if (this.getGunList()[0].isReloading == false) {
    this.gunList.unshift(this.gunList.pop()); //remove last item in the list and move it to the beginning
  }
}

Actor.prototype.addGun = function(gun) {
  this.gunList.push(gun);
  this.gunList.get(gun).trackSprite(this, 0, 0, true);
}

Actor.prototype.getGunList = function() {
  return this.gunList.toArray();
}

Actor.prototype.stopMoving = function() {
  this.isMoving = false
}

Actor.prototype.update = function() {
  this.bringToTop();
}
