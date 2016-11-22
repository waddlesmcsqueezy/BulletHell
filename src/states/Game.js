/* globals __DEV__ */
import Phaser from 'phaser';
import _ from 'lodash';
import keyboardMouseInput from '../input/keyboardmouse'
// import gamepadInit from '../input/gamepad'
import gamepadInput from '../input/gamepad'

import Actor from '../actors/Actor';
import PlasmaGun from '../guns/PlasmaGun';

var Inputs = {
  GAMEPAD: "gamepad",
  KEYBOARDMOUSE: "keyboard and mouse"
}

export default class extends Phaser.State {
  init () {
  }

  preload () {
  }

  create () {
    this.world.setBounds(0, 0, 6400, 6400);
    this.ground = this.add.tileSprite(0, 0, this.world.bounds.width, this.world.bounds.height, 'ground');
    this.ground.tileScale.setTo(0.3, 0.3)

    this.world.player = new Actor(game);
    this.world.player.gun = new PlasmaGun(game);
    this.world.player.gun.trackSprite(this.world.player.sprite, 0, 0, true);

    console.log(this);

    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.stage.backgroundColor = '#0072bc';
    this.camera.follow(this.world.player.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    this.time.advancedTiming = true;

    this.gamepadEnabled = true;

    if (this.gamepadEnabled) {
      this.world.indicator = this.add.sprite(10,10, 'controller-indicator');
      this.world.indicator.scale.x = this.world.indicator.scale.y = 2;
      this.world.indicator.animations.frame = 1;

      this.world.indicator.fixedToCamera = true;

      this.input.gamepad.start();

      // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4

      this.gamepadIsInitialized = true;
      console.log("Gamepad is initialized ==", this.gamepadIsInitialized);
      console.log(this.input.gamepad.pad1);
      this.input.gamepad.pad1.deadZone = 0.10;

      this.world.playerSpriteGroup = this.add.group();
      this.world.playerSpriteGroup.add(this.world.player.sprite);
      this.world.playerSpriteGroup.add(this.world.indicator);

      this.selectedInput = Inputs.GAMEPAD;

      this.inputButton = this.add.button(0, 0, 'button', switchInput, this, 2, 1, 0);
      console.log(this.inputButton)
    }
  }

  update() {
    // this.world.player.sprite.rotation = this.physics.arcade.angleToPointer(this.world.player.sprite);
    // this.world.player.gun.fireFrom.x = this.world.player.sprite.x;
    // this.world.player.gun.fireFrom.y = this.world.player.sprite.y;
    // this.world.player.gun.fireFrom.width = this.world.player.sprite.width;
    // this.world.player.gun.fireFrom.height = this.world.player.sprite.height;

    this.inputButton.scale.setTo(0.4, 0.4);
    this.inputButton.smoothed = false;
    this.inputButton.position.setTo(this.camera.x + 32, this.camera.y + 620);

    if (this.gamepadIsInitialized && this.selectedInput == Inputs.GAMEPAD) {
      gamepadInput(this);
    } else if (this.selectedInput == Inputs.KEYBOARDMOUSE) {
      keyboardMouseInput(this);
    }
  }

  render () {
    if (__DEV__) {
      game.debug.spriteInfo(this.world.player.sprite, 32, 32);
      game.debug.text('Equipped Weapon: ' + this.world.player.gun.name, 32, 132);
      game.debug.text('Magazine: ' + this.world.player.gun.magazine + ' / ' + this.world.player.gun.getMaxMagazine(), 32, 172);
      game.debug.text("Time until reload: " + this.time.events.duration / 1000, 32, 200);
      game.debug.text("WASD or Left Thumbstick to move", 400, 72);
      game.debug.text("R or Square/X to reload", 450, 100);
      game.debug.text("Click or Right Trigger to shoot", 400, 132);
      if (game.gamepadIsInitialized) {
        game.debug.text(pad1);
      }
    }
  }
}

function switchInput() {
  console.log("input source was:", this.selectedInput);
  if (this.selectedInput == Inputs.GAMEPAD) {
    this.selectedInput = Inputs.KEYBOARDMOUSE;
  } else if (this.selectedInput == Inputs.KEYBOARDMOUSE) {
    this.selectedInput = Inputs.GAMEPAD;
  }
  console.log("input source is now:", this.selectedInput);
}
