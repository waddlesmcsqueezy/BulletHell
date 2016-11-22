// KILL_CAMERA_BOUNDS
// :
// 4
// KILL_DISTANCE
// :
// 2
// KILL_LIFESPAN
// :
// 1
// KILL_NEVER
// :
// 0
// KILL_STATIC_BOUNDS
// :
// 6
// KILL_WEAPON_BOUNDS
// :
// 3
// KILL_WORLD_BOUNDS
// :
// 5

class LaserBullet extends Phaser.Bullet {
  constructor() {
    super();
    this.damage = 5;
  }
}

export default class PlasmaGun extends Phaser.Weapon {
  constructor(game) {
    super(game, game.plugins);

    // sounds
    this.reloadSound = game.add.audio('plasmagun_reload');
    this.shootSound = game.add.audio('plasmagun_shoot');
    this.sprite; //unused atm
    //fluff
    this.name = 'The Master Blaster';
    //gun stats
    this.magazine = this.getMaxMagazine();
    this.fireRate = .001; // delay inbetween shots in ms
    this.bulletSpeed = 1100; //speed of bullets (pixels per second?)
    this.bulletSpread = 15; // does nothing right now

    //bullet stats
    this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS; //KILL_DISTANCE : 2
    this.bulletDistance = 600;
    this.nextFire = 0; //this should always be 0
    this.createBullets(-1, 'laser');
    this.onFire.add(this.useBullet, this); //use a bullet when shooting
    this.onFire.add(this.firePlus, this); //play shoot sound when shooting
    this.isReloading = false;
  }

  firePlus() {
    this.shootSound.play()
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
    return 2000;
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
