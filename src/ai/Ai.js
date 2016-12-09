var AiActions = {
  strafe : { //         -90 = left        +90 = right
    chance : 20, //not used on this action right now
    use : function(actor, game) {
      if (Math.floor(Math.random() * (100 - 1 + 1)) + 1 < 50 && actor.isMoving == false) {
        actor.isMoving = true;
        actor.body.moveTo(2000, 100, actor.angle + 90)
      } else if (actor.isMoving == false) {
        actor.isMoving = true;
        actor.body.moveTo(2000, 100, actor.angle - 90)
      }
      actor.body.onMoveComplete.add(actor.stopMoving, actor)
    }
  },
  advance : {
    chance : 20, //not used on this action right now
    use : function(actor, game) {
      if (actor.isMoving == false) {
        actor.isMoving = true;
        console.log("moving forward")
        actor.body.moveTo(2000, 150, actor.angle)
      }
      actor.body.onMoveComplete.add(actor.stopMoving, actor)
    }
  },
  shoot : {
    chance : 65,
    use : function(actor, game) {
      var delay = 0

      if (delay < game.time.now) {
        var delay = (game.time.now + 2000) + (Math.floor(Math.random() * (2000 - 1 + 1)) + 1)
      }
    }
  }
}

var AiLevels = {
  simple : {
    performAction : function(actor, game) {
      if (actor.delay < game.time.now) {
        if (Math.floor(Math.random() * (100 - 1 + 1)) + 1 < AiActions.shoot.chance && game.physics.arcade.distanceBetween(actor, game.world.player) < actor.getGunList()[0].bulletDistance) {
          actor.getGunList()[0].preFire(game);
        }
        if (actor.getGunList()[0].hasBullets() == false) {
          actor.getGunList()[0].initiateReload(game);
        }
        if (game.physics.arcade.distanceBetween(actor, game.world.player) > actor.getGunList()[0].bulletDistance) {
          AiActions.advance.use(actor, game)
        } else {
          AiActions.strafe.use(actor, game);
        }
      } if (actor.delay < game.time.now || actor.delay === null) {
        actor.delay = (game.time.now + 2000) + (Math.floor(Math.random() * (2000 - 1 + 1)) + 1)
      }
      // console.log(game.time.now)
    }
  }
}

export default AiLevels
