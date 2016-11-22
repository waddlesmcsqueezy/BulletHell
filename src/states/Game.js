/* globals __DEV__ */
import Phaser from 'phaser';
import _ from 'lodash';
import keyboardMouseInput from '../input/keyboardmouse'
// import gamepadInit from '../input/gamepad'
import gamepadInput from '../input/gamepad'

import Actor from '../actors/Actor';
import PlasmaGun from '../guns/PlasmaGun';
import AntiMatterialRifle from '../guns/AntiMatterialRifle';

var Inputs = {
  GAMEPAD: "gamepad",
  KEYBOARDMOUSE: "keyboard"
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

    this.world.player = new Actor(this);
    this.world.player.addGun(new PlasmaGun(this));
    this.world.player.addGun(new AntiMatterialRifle(this));

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
    // this.world.player.getGunList()[0].fireFrom.x = this.world.player.sprite.x;
    // this.world.player.getGunList()[0].fireFrom.y = this.world.player.sprite.y;
    // this.world.player.getGunList()[0].fireFrom.width = this.world.player.sprite.width;
    // this.world.player.getGunList()[0].fireFrom.height = this.world.player.sprite.height;

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
      game.debug.text('Equipped Weapon: ' + this.world.player.getGunList()[0].name, 32, 132);
      game.debug.text('Magazine: ' + this.world.player.getGunList()[0].magazine + ' / ' + this.world.player.getGunList()[0].getMaxMagazine(), 32, 172);
      game.debug.text("Time until reload: " + this.time.events.duration / 1000, 32, 200);
      game.debug.text("See README for controls", 400, 72);
      game.debug.text("Controls are currently: " + this.selectedInput, 400, 100);
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
