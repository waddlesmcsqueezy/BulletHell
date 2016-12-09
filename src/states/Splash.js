import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)

    game.load.spritesheet('spritesheet', 'assets/images/spritesheet.png', 64, 64);
    game.load.image('ground', 'http://1.bp.blogspot.com/-fl9N0RokiBE/Vhrm_xLtakI/AAAAAAAAIXo/9RMVb4OVFGw/s1600/Conrete%2Bthat%2Bis%2Bcracked%2Btexture%2Bseamless.jpg');
    game.load.image('player', 'assets/images/player.png');
    game.load.image('enemy', 'assets/images/enemy.png');
    game.load.image('blood', 'assets/images/blood.png');
    game.load.image('laser_bullet', 'assets/images/laser.png');
    game.load.image('plasma_bullet', 'assets/images/laser.png');
    game.load.image('pistol_bullet', 'assets/images/laser.png');
    game.load.image('antimatterial', 'assets/images/antimatterial.png');
    game.load.spritesheet('controller-indicator', 'https://github.com/photonstorm/phaser-examples/blob/master/examples/assets/misc/controller-indicator.png?raw=true', 16,16);
    game.load.image('button', 'http://willyoupressthebutton.com/images/mygtukas.png');
    game.load.image('heart', 'assets/images/heart.png');
    game.load.audio('plasmagun_shoot', 'assets/sound/plasmagun/shoot.wav');
    game.load.audio('plasmagun_reload', 'assets/sound/plasmagun/reload.mp3');
    game.load.audio('antimatterial_shoot', 'assets/sound/antimatterial/shoot.wav');
    game.load.audio('antimatterial_reload', 'assets/sound/antimatterial/reload.mp3');
    game.load.audio('gatlinggun_shoot', 'assets/sound/gatlinggun/shoot.wav');
    game.load.audio('gatlinggun_reload', 'assets/sound/gatlinggun/reload.mp3');
    game.load.audio('gatlinggun_windup', 'assets/sound/gatlinggun/windup.mp3');
    game.load.audio('gatlinggun_loop', 'assets/sound/gatlinggun/loop.wav');
    game.load.audio('gatlinggun_cooldown', 'assets/sound/gatlinggun/cooldown.mp3');
    game.load.audio('pistol_shoot', 'assets/sound/pistol/shoot.wav');
    game.load.audio('pistol_reload', 'assets/sound/plasmagun/reload.mp3');
  }

  create () {
    this.state.start('Game')
  }

}
