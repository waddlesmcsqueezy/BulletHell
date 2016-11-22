export default function keyboardMouseInput(game) {

  var keys = {
    R : game.input.keyboard.addKey(Phaser.Keyboard.R),
    E : game.input.keyboard.addKey(Phaser.Keyboard.E),
    Q : game.input.keyboard.addKey(Phaser.Keyboard.Q)
  }

  game.world.player.sprite.rotation = game.physics.arcade.angleToPointer(game.world.player.sprite, game.input.activePointer);

  if (game.input.activePointer.isDown) {
    if (game.world.player.getGunList()[0].magazine > 0 && !game.world.player.getGunList()[0].isReloading) {
      game.world.player.getGunList()[0].fireAtPointer(game.input.activePointer);
    }
  }

  if (keys.R.justDown) {
    if (game.world.player.getGunList()[0].magazine != game.world.player.getGunList()[0].getMaxMagazine()) {
      game.world.player.getGunList()[0].initiateReload(game);
    }
  }

  if (keys.Q.justDown)
  {
    game.world.player.previousGun();
  }
  else if (keys.E.justDown)
  {
    game.world.player.nextGun();
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.W))
  {
    game.world.player.sprite.y -= game.world.player.actorSpeed;
    if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
      game.world.player.sprite.x -= game.world.player.actorSpeed;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
      game.world.player.sprite.x += game.world.player.actorSpeed;
    }
  }

  else if (game.input.keyboard.isDown(Phaser.Keyboard.S))
  {
    game.world.player.sprite.y += game.world.player.actorSpeed;
    if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
      game.world.player.sprite.x -= game.world.player.actorSpeed;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
      game.world.player.sprite.x += game.world.player.actorSpeed;
    }
  }

  else if (game.input.keyboard.isDown(Phaser.Keyboard.A))
  {
    game.world.player.sprite.x -= game.world.player.actorSpeed;
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
  {
    game.world.player.sprite.x += game.world.player.actorSpeed;
  }
}
