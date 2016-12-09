/* globals __DEV__ */
import Phaser from 'phaser';
import _ from 'lodash';
import keyboardMouseInput from '../input/keyboardmouse';
// import gamepadInit from '../input/gamepad';
import gamepadInput from '../input/gamepad';

import EnemyFactory from '../actors/EnemyFactory';
import MapFactory from '../maps/MapFactory';

import Actor from '../actors/Actor';
import Player from '../actors/Player';
import PlasmaGun from '../guns/PlasmaGun';
import AntiMatterialRifle from '../guns/AntiMatterialRifle';
import GatlingGun from '../guns/GatlingGun';
import Shotgun from '../guns/Shotgun';
import Bullets from '../guns/Bullets'

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

    this.world.enemyFactory = new EnemyFactory();
    this.world.mapFactory = new MapFactory();

    this.world.mapFactory.createMap(game, 3, 3);
    this.world.mapFactory.createRooms(game);

    this.world.setBounds(0, 0, 6400, 6400);

    this.world.bloodEmitter = game.add.emitter(0, 0, 100);
    this.world.bloodEmitter.gravity = 0;
    this.world.bloodEmitter.angularDrag = 250;
    this.world.bloodEmitter.particleDrag.x = 50;
    this.world.bloodEmitter.particleDrag.y = 50;
    this.world.bloodEmitter.particleSendToBack = true;
    this.world.bloodEmitter.makeParticles('blood');

    this.world.player = new Player(this, 400, 400, 'player');
    this.world.player.addGun(new GatlingGun(this));
    this.world.player.addGun(new AntiMatterialRifle(this));
    this.world.player.addGun(new PlasmaGun(this));

    this.physics.startSystem(Phaser.Physics.P2JS);
    this.stage.backgroundColor = '#0072bc';
    this.camera.follow(this.world.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
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
      console.log(this.input.gamepad.pad1);
      this.input.gamepad.pad1.deadZone = 0.10;

      this.world.playerSpriteGroup = this.add.group();
      this.world.playerSpriteGroup.add(this.world.player);
      this.world.playerSpriteGroup.add(this.world.indicator);

      this.selectedInput = Inputs.GAMEPAD;

      this.inputButton = this.add.button(32, 620, 'button', switchInput, this, 2, 1, 0);
      this.inputButton.scale.setTo(0.4, 0.4);
      this.inputButton.fixedToCamera = true;
      console.log(this.inputButton)
    }

    this.world.enemies = []

    this.world.enemyFactory.createEnemy(700, 700, this.world.enemies, this);
    this.world.enemyFactory.createEnemy(400, 700, this.world.enemies, this);
    this.world.enemyFactory.createEnemy(500, 600, this.world.enemies, this);
    this.world.enemyFactory.createEnemy(200, 200, this.world.enemies, this);
  }

  update() {
    this.world.player.body.velocity.x = 0
    this.world.player.body.velocity.y = 0

    for (var mapY = 0; mapY < game.world.map.height; mapY++) {
      for (var mapX = 0; mapX < game.world.map.width; mapX++) {
        for (var roomY = 0; roomY < game.world.map[mapY][mapX].height; roomY++) {
          for (var roomX = 0; roomX < game.world.map[mapY][mapX].width; roomX++) {
            game.physics.arcade.collide(game.world.player, game.world.map[mapY][mapX].getTile(roomX, roomY));
            for (var i = 0; this.world.player.getGunList().length > i; i++) {
            }
          }
        }
      }
    }

    if (this.world.player.alive) {
      // this.world.player.rotation = this.physics.arcade.angleToPointer(this.world.player);
      // this.world.player.getGunList()[0].fireFrom.x = this.world.player.x;
      // this.world.player.getGunList()[0].fireFrom.y = this.world.player.y;
      // this.world.player.getGunList()[0].fireFrom.width = this.world.player.width;
      // this.world.player.getGunList()[0].fireFrom.height = this.world.player.height;
      for (var i = 0; i < this.world.enemies.length; i++) {
        if (this.world.enemies[i].alive && this.world.player.alive) {
          this.world.enemies[i].rotation = game.physics.arcade.angleToXY(this.world.enemies[i], this.world.player.x, this.world.player.y);
          this.world.enemies[i].aiLevel.performAction(this.world.enemies[i], this);
        }
      }

      if (this.gamepadIsInitialized && this.selectedInput == Inputs.GAMEPAD) {
        gamepadInput(this);
      } else if (this.selectedInput == Inputs.KEYBOARDMOUSE) {
        keyboardMouseInput(this);
      }

      game.world.player.bringToTop();
      // console.log(game.world.player.getGunList()[0].windTime);
      // console.log(game.world.player.getGunList()[0].isFiring);

      if (game.world.player.getGunList()[0].isFiring == false) {
        game.world.player.getGunList()[0].postFire(); // run post firing method constantly when not firing, commonly used for cooldown mechanics
      }

      for (var i = 0; this.world.player.getGunList().length > i; i++) {
        for (var e = 0; this.world.enemies.length > e; e++) {
          this.physics.arcade.overlap(this.world.player.getGunList()[i].bullets, this.world.enemies[e], collisionHandler, null, this); // player bullets check for all guns
        }
      }

      for (var i = 0; this.world.enemies.length > i; i++) {
        for (var e = 0; this.world.enemies[i].getGunList().length > e; e++) {
          this.physics.arcade.overlap(this.world.enemies[i].getGunList()[e].bullets, this.world.player, collisionHandler, null, this);
        }
      }

      for (var i = 0; this.world.enemies.length > i; i++) {
        game.physics.arcade.collide(game.world.player, this.world.enemies[i]);
      }

    } else {
      console.log("game over") //Halt all player movement and declare game over
      this.world.player.exists = false;
    }
  }

  render () {
    if (__DEV__) {
      game.debug.spriteInfo(this.world.player, 32, 32);
      // game.debug.bodyInfo(this.world.player, 32, 32);
      game.debug.body(this.world.player);
      game.debug.text('Equipped Weapon: ' + this.world.player.getGunList()[0].name, 32, 116);
      game.debug.text('Magazine: ' + this.world.player.getGunList()[0].magazine + ' / ' + this.world.player.getGunList()[0].getMaxMagazine(), 32, 134);
      game.debug.text("Time until reload: " + this.time.events.duration / 1000, 32, 150);
      game.debug.text("See README for controls", 400, 72);
      game.debug.text("Controls are currently: " + this.selectedInput, 400, 100);
      game.debug.text("Player Health: " + this.world.player.health, 32, 166,)
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

function emitBlood(actor, bulletData) {
  game.world.bloodEmitter.x = actor.x;
  game.world.bloodEmitter.y = actor.y;

  // for(var i = 0; this.bloodEmitter.length > i; i++) {
  //   console.log(this.bloodEmitter.children[i])
  //   this.bloodEmitter.sendToBack(this.bloodEmitter.children[i]);
  // }

  game.world.bloodEmitter.start(true, 0, null, bulletData.damage);
}

function collisionHandler(actor, bullet) {
  var bulletData = Bullets.getBullet(bullet);
  if (bulletData.canPierce) {
    console.log("bullet is piercing");
  } else {bullet.kill();}

  emitBlood(actor, bulletData);
  actor.damage(bulletData.damage, game);
  if (actor.hasHealth() == false) {
    actor.kill();
  }

  var lastBullet = bullet;
}

function wallCollision(bullet) {

}
