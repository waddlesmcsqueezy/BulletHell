import List from 'collections/list';

export default class Actor {
  constructor(game) {
    this.armor;
    this.health;

    this.actorSpeed = 4; //speed of actor
    this.sprite = game.add.sprite(400, 300, 'soldier');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.anchor.setTo(0.7, 0.7);
    this.sprite.scale.setTo(0.3, 0.3)

    this.gunList = new List();

    this.itemSlot1;
    this.itemSlot2;
    this.item;
  }

  getBody() {
      return this.sprite.body;
  }

  nextGun() {
    this.gunList.push(this.gunList.shift()); //remove first item in the list and move it to the end;
  }

  previousGun() {
    this.gunList.unshift(this.gunList.pop()); //remove last item in the list and move it to the beginning
  }

  addGun(gun) {
    this.gunList.push(gun);
  }

  getGunList() {
    return this.gunList.toArray();
  }
}
