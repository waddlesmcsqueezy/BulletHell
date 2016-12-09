export default function gamepadInput(game) {
  // Pad "connected or not" indicator
  if (game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad1.connected)
  {
    game.world.indicator.animations.frame = 0;
  }
  else
  {
      game.world.indicator.animations.frame = 1;
  }

  // Controls
  // if (game.input.gamepad.pad1._buttons[7].isDown) {
  //   game.world.player.getGunList()[0].fireAtPointer(game.input.activePointer);
  // }
  if (game.input.gamepad.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
    game.world.player.x -= game.world.player.actorSpeed;
  } else if (game.input.gamepad.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
    game.world.player.x += game.world.player.actorSpeed;
  } if (game.input.gamepad.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) {
    game.world.player.y -= game.world.player.actorSpeed;
  }
  else if (game.input.gamepad.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
    game.world.player.y += game.world.player.actorSpeed;
  }

  if (game.input.gamepad.pad1.justPressed(Phaser.Gamepad.XBOX360_DPAD_LEFT, 30))
  {
    game.world.player.previousGun();
  }
  else if (game.input.gamepad.pad1.justPressed(Phaser.Gamepad.XBOX360_DPAD_RIGHT, 30))
  {
    game.world.player.nextGun();
  }

  if (game.input.gamepad.pad1.justPressed(Phaser.Gamepad.BUTTON_0, 30))
  {
    console.log("Just pressed A")
  }

  if (game.input.gamepad.pad1.justPressed(Phaser.Gamepad.BUTTON_1, 30))
  {
    console.log("Just pressed B")
  }

  if (game.input.gamepad.pad1.justPressed(Phaser.Gamepad.XBOX360_LEFT_BUMPER, 30)) {
    if (game.world.player.getGunList()[0].magazine != game.world.player.getGunList()[0].getMaxMagazine()) {
      game.world.player.getGunList()[0].initiateReload(game);
    }
  }

  if (game.input.gamepad.pad1.justPressed(Phaser.Gamepad.BUTTON_3))
  {
    console.log("Just pressed Y")
  }

  if (game.input.gamepad.pad1.isDown(Phaser.Gamepad.BUTTON_7)) {
    if (!game.world.player.getGunList()[0].isReloading) {
      game.world.player.getGunList()[0].preFire(game);
      game.world.player.getGunList()[0].isFiring = true;
    }
  } else {game.world.player.getGunList()[0].isFiring = false;}

  if (game.input.gamepad.pad1.connected)
  {
      var rightStickX = game.input.gamepad.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
      var rightStickY = game.input.gamepad.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);

      if (rightStickX || rightStickY)
      {
        game.world.player.rotation = game.physics.arcade.angleToXY(game.world.player, game.world.player.x + rightStickX * 100, game.world.player.y + rightStickY * 100);
      }
  }
}
