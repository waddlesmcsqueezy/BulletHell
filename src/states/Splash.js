import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)

    game.load.image('ground', 'http://1.bp.blogspot.com/-fl9N0RokiBE/Vhrm_xLtakI/AAAAAAAAIXo/9RMVb4OVFGw/s1600/Conrete%2Bthat%2Bis%2Bcracked%2Btexture%2Bseamless.jpg');
    game.load.image('soldier', 'http://i2.wp.com/unluckystudio.com/wp-content/uploads/2015/03/preview_idle.gif?resize=250%2C213');
    game.load.image('laser', 'assets/images/laser.png');
    game.load.image('antimatterial', 'assets/images/antimatterial.png');
    game.load.spritesheet('controller-indicator', 'https://github.com/photonstorm/phaser-examples/blob/master/examples/assets/misc/controller-indicator.png?raw=true', 16,16);
    game.load.image('button', 'http://willyoupressthebutton.com/images/mygtukas.png');
    game.load.audio('plasmagun_shoot', 'assets/sound/plasmagun/shoot.mp3');
    game.load.audio('plasmagun_reload', 'assets/sound/plasmagun/reload.mp3');
    game.load.audio('antimatterial_shoot', 'assets/sound/antimatterial/shoot.wav');
    game.load.audio('antimatterial_reload', 'assets/sound/antimatterial/reload.mp3');
  }

  create () {
    this.state.start('Game')
  }

}
