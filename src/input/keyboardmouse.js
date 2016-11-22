export default function keyboardMouseInput(game) {
  game.world.player.sprite.rotation = game.physics.arcade.angleToPointer(game.world.player.sprite, game.input.activePointer);

  if (game.input.activePointer.isDown) {
    game.world.player.gun.fireAtPointer(game.input.activePointer);
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
    game.world.player.gun.initiateReload(game);
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
