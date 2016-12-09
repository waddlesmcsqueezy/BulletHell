export default class GatlingGun extends Phaser.Weapon {
  constructor(game) {
    super(game, game.plugins);

    // sounds
    this.reloadSound = game.add.audio('gatlinggun_reload');
    this.shootSound = game.add.audio('gatlinggun_shoot');
    this.windUpSound = game.add.audio('gatlinggun_windup');
    this.loopSound = game.add.audio('gatlinggun_loop')
    this.cooldownSound = game.add.audio('gatlinggun_cooldown');

    this.sprite; //unused atm
    //fluff
    this.name = 'Hertford 1861';
    //gun stats
    this.magazine = this.getMaxMagazine();
    this.fireRate = 116; // delay inbetween shots in ms
    this.bulletSpeed = 750; //speed of bullets (pixels per second?)
    this.bulletAngleVariance = 28; // adds this many degrees of vairance to the bullet spread.

    //bullet stats
    this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS; //KILL_DISTANCE : 2
    this.bulletDistance = 300;
    this.nextFire = 0; //this should always be 0
    this.createBullets(-1, 'laser_bullet');
    this.onFire.add(this.useBullet, this); //use a bullet when shooting
    this.onFire.add(this.firePlus, this); //play shoot sound when shooting
    this.isReloading = false;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    this.windTime = 0;
    this.windNeeded = 130;
  }

  secondaryFire() {

  }

  playCooldownSound() {
    if (this.cooldownSound.isPlaying == false) {
      this.cooldownSound.play('', this.cooldownSound.duration * (1 - (this.windTime / this.windNeeded)), 0.5);
    }
  }

  playWindUpSound() {
    if (this.windUpSound.isPlaying == false) {
      this.windUpSound.play('', this.windUpSound.duration * (this.windTime / this.windNeeded), 0.5);
    }
  }

  playLoopSound() {
    if (this.loopSound.isPlaying == false) {
      this.loopSound.play('', 0, 0.5, true);
    }
  }

  cooldown() {
    if (this.windTime > 0) {
      this.playCooldownSound();
      this.windTime -= 1;
    } else {this.cooldownSound.stop();}
    this.loopSound.stop();
    this.windUpSound.stop();
  }

  preFire(game) {
    this.windTime += 1;
    this.cooldownSound.stop();
    if (this.windTime >= this.windNeeded) {
      this.windUpSound.stop();
      this.windTime = this.windNeeded;
      this.playLoopSound();
      if (this.hasBullets()) {
        this.fire();
      }
    }
    this.playWindUpSound();
    // game.time.events.add(2 * Phaser.Timer.SECOND, this.fire, this);
  }

  firePlus() {
    this.shootSound.play();
  }

  postFire() {
    this.cooldown();
  }

  useBullet() {
    this.magazine -= 1;
  }

  hasBullets() {
    if (this.magazine <= 0) {
      return false;
    } else { return true; }
  }

  getMaxMagazine() {
    return 85;
  }

  resetMagazine() {
    this.magazine = this.getMaxMagazine();
    this.isReloading = false;
  }

  getReloadTime() {
    return 5 * Phaser.Timer.SECOND;
  }

  initiateReload(game) {
    if (this.isReloading == false) {
      this.isReloading = true;
      this.reloadSound.play();
      game.time.events.add(this.getReloadTime(), this.resetMagazine, this);
    } else {console.log("already reloading")}
  }
}
