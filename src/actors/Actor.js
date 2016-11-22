export default class Actor {
  constructor(game) {
    this.armor;
    this.health;

    this.actorSpeed = 4; //speed of actor
    this.sprite = game.add.sprite(400, 300, 'soldier');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.anchor.setTo(0.7, 0.7);
    this.sprite.scale.setTo(0.3, 0.3)

    this.gunSlot1;
    this.gunSlot2;
    this.gun;

    this.itemSlot1;
    this.itemSlot2;
    this.item;
  }

  getBody() {
      return this.sprite.body;
  }
}
