import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'

class Game extends Phaser.Game {

  constructor () {
    let width = document.documentElement.clientWidth > 704 ? 704 : document.documentElement.clientWidth
    let height = document.documentElement.clientHeight > 704 ? 704 : document.documentElement.clientHeight

    super(width, height, Phaser.CANVAS, 'content', 'Dungeon Crawlers', false, false)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)

    this.state.start('Boot')
  }
}

window.game = new Game()
