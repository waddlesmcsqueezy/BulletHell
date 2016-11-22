export default function gamepadInput(game) {
  // Pad "connected or not" indicator
  if (game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad1.connected)
  {
      game.world.indicator.animations.frame = 0;

      if (game.input.gamepad.pad1._buttons[7] != null) {
        if (game.input.gamepad.pad1._buttons[7].isDown) {
          if (game.world.player.gun.magazine > 0 && !game.world.player.gun.isReloading) {
            game.world.player.gun.fire();
          }
        }
        if (game.input.gamepad.pad1._buttons[2].isDown) {
          if (game.world.player.gun.magazine != game.world.player.gun.getMaxMagazine()) {
            game.world.player.gun.initiateReload(game);
          }
        }
      }
  }
  else
  {
      game.world.indicator.animations.frame = 1;
  }

  // Controls
  // if (game.input.gamepad.pad1._buttons[7].isDown) {
  //   game.world.player.gun.fireAtPointer(game.input.activePointer);
  // }
  if (game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || game.input.gamepad.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
  {
      game.world.player.sprite.x -= game.world.player.actorSpeed;
  }
  else if (game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || game.input.gamepad.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
  {
      game.world.player.sprite.x += game.world.player.actorSpeed;
  }

  if (game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || game.input.gamepad.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1)
  {
      game.world.player.sprite.y -=game.world.player.actorSpeed;
  }
  else if (game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || game.input.gamepad.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1)
  {
      game.world.player.sprite.y += game.world.player.actorSpeed;
  }

  if (game.input.gamepad.pad1.justPressed(Phaser.Gamepad.XBOX360_A))
  {
    console.log("Just pressed A")
  }

  if (game.input.gamepad.pad1.justReleased(Phaser.Gamepad.XBOX360_B))
  {
    console.log("Just pressed B")
  }

  if (game.input.gamepad.pad1.connected)
  {
      var rightStickX = game.input.gamepad.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
      var rightStickY = game.input.gamepad.pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);

      if (rightStickX || rightStickY)
      {
        game.world.player.sprite.rotation = game.physics.arcade.angleToXY(game.world.player.sprite, game.world.player.sprite.x + rightStickX * 100, game.world.player.sprite.y + rightStickY * 100);
      }
  }
}
