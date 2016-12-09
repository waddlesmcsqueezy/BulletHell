export default function keyboardMouseInput(game) {

  var keys = {
    R : game.input.keyboard.addKey(Phaser.Keyboard.R),
    E : game.input.keyboard.addKey(Phaser.Keyboard.E),
    Q : game.input.keyboard.addKey(Phaser.Keyboard.Q),
    K : game.input.keyboard.addKey(Phaser.Keyboard.K)
  }

  game.world.player.rotation = game.physics.arcade.angleToPointer(game.world.player, game.input.activePointer);

  if (game.input.activePointer.isDown) {
    if (!game.world.player.getGunList()[0].isReloading) {
      game.world.player.getGunList()[0].preFire(game);
      game.world.player.getGunList()[0].isFiring = true;
    }
  } else {game.world.player.getGunList()[0].isFiring = false;}

  if (keys.R.justDown) {
    if (game.world.player.getGunList()[0].magazine != game.world.player.getGunList()[0].getMaxMagazine()) {
      game.world.player.getGunList()[0].initiateReload(game);
    }
  }

  if (keys.K.justDown)
  {
    game.world.enemyFactory.createEnemy(game.world.player.x + (Math.floor(Math.random() * (400 - -400 + -400)) + -400), game.world.player.y + (Math.floor(Math.random() * (400 - -400 + -400)) + -400), game.world.enemies, game);
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
    game.world.player.body.velocity.y = -game.world.player.actorSpeed;
    if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
      game.world.player.body.velocity.x = -game.world.player.actorSpeed;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
      game.world.player.body.velocity.x = game.world.player.actorSpeed;
    }
  }

  else if (game.input.keyboard.isDown(Phaser.Keyboard.S))
  {
    game.world.player.body.velocity.y = game.world.player.actorSpeed;
    if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
      game.world.player.body.velocity.x = -game.world.player.actorSpeed;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
      game.world.player.body.velocity.x = game.world.player.actorSpeed;
    }
  }

  else if (game.input.keyboard.isDown(Phaser.Keyboard.A))
  {
    game.world.player.body.velocity.x = -game.world.player.actorSpeed;
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
  {
    game.world.player.body.velocity.x = game.world.player.actorSpeed;
  }
}
