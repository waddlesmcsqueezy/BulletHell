var Bullets = {
  antimatterial : {key: "antimatterial", damage: 3, canPierce: true},
  gatlingBullet : {key: "laser_bullet", damage: 1, canPierce: false},
  laserBullet : {key: "plasma_bullet", damage: 1, canPierce: false},
  pistolBullet : {key: "pistol_bullet", damage: 1, canPierce: false},
  getBullet : function(bullet) {
    switch (bullet.key) {
      case Bullets.antimatterial.key:
        return Bullets.antimatterial;
        break;
      case Bullets.gatlingBullet.key:
        return Bullets.gatlingBullet;
        break;
      case Bullets.laserBullet.key:
        return Bullets.laserBullet;
        break;
      case Bullets.pistolBullet.key:
        return Bullets.pistolBullet;
        break;
    }
  }
}

export default Bullets
