export default class Pistol extends Phaser.Weapon {
  constructor(game) {
    super(game);

    // sounds
    this.reloadSound = game.add.audio('pistol_reload');
    this.shootSound = game.add.audio('pistol_shoot');
    this.sprite; //unused atm
    //fluff
    this.name = 'The Master Blaster';
    //gun stats
    this.magazine = this.getMaxMagazine();
    this.fireRate = 150; // delay inbetween shots in ms
    this.bulletSpeed = 375; //speed of bullets (pixels per second?)
    this.bulletAngleVariance = 9; // adds this many degrees of vairance to the bullet spread.

    //bullet stats
    this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS; //KILL_DISTANCE : 2
    this.bulletDistance = 285;
    // this.bullets = game.add.group();
    // this.bulletClass = LaserBullet;
    this.createBullets(-1, 'pistol_bullet');
    this.onFire.add(this.useBullet, this); //use a bullet when shooting
    this.onFire.add(this.firePlus, this); //play shoot sound when shooting
    this.isReloading = false;
  }

  secondaryFire() {

  }

  preFire(game) {
    if (this.hasBullets()) {
      this.fire();
    }
  }

  firePlus() {
    this.shootSound.play()
  }

  postFire() {
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
    return 12;
  }

  resetMagazine() {
    this.magazine = this.getMaxMagazine();
    this.isReloading = false;
  }

  getReloadTime() {
    return 2 * Phaser.Timer.SECOND;
  }

  initiateReload(game) {
    if (this.isReloading == false) {
      this.isReloading = true;
      this.reloadSound.play();
      game.time.events.add(this.getReloadTime(), this.resetMagazine, this);
    } else {console.log("already reloading")}
  }
}
