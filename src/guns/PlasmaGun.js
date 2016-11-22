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


export default class PlasmaGun extends Phaser.Weapon {
  constructor(game) {
    super(game, game.plugins);

    //fluff
    this.name = 'The Master Blaster';
    //gun stats
    this.magazine = this.getMaxMagazine();
    this.fireRate = 170; // delay inbetween shots in ms
    this.bulletSpeed = 1400; //speed of bullets (pixels per second?)
    this.bulletSpread = 15; // does nothing right now

    //bullet stats
    this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS; //KILL_DISTANCE : 2
    this.bulletDistance = 800;
    this.nextFire = 0; //this should always be 0
    this.createBullets(-1, 'laser');
    // this.bullets.enableBody = true;
    // this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
  }

  hasBullets() {
    if (this.magazine <= 0) {
      return false;
    } else { return true; }
  }

  getMaxMagazine() {
    return 15;
  }

  resetMagazine() {
    this.magazine = this.getMaxMagazine();
  }

  getReloadTime() {
    return 2 * Phaser.Timer.SECOND;
  }

  initiateReload(game) {
    game.time.events.add(this.getReloadTime(), this.resetMagazine, this);
  }
}
