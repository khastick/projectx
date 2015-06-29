/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global game, Phaser*/

function Collider()
{
      this.colliders = {
	    'blockedLayer': {
		  'player': null,
		  'runner': null,
		  'flag': null,
		  'cloud': null,
		  'block': null
	    },
	    'player': {
		  'block': null,
		  'flag': this.flagDie,
		  'runner': this.runnerDie
	    }
      };
}

Collider.prototype.update = function (state) {
      for (var collide1 in this.colliders) {
	    for (var collide2 in this.colliders[collide1]) {
		  var object1, object2, method;

		  method = this.colliders[collide1][collide2];
		  object1 = collide1 === 'blockedLayer' ? state.blockedLayer : state.entities.player;
		  object2 = state.entities[collide2];

		  if (!method) {
			game.physics.arcade.collide(object2, object1);
		  } else
			game.physics.arcade.collide(object1, object2, method, null, this);
	    }
      }

      if (typeof state.entities.cloud !== 'undefined') {
	    state.entities.cloud.forEach(function (cloud) {
		  game.physics.arcade.collide(cloud.drops, state.blockedLayer, this.collider.dropDie, null, this);
		  game.physics.arcade.collide(cloud.drops, state.entities.block, this.collider.dropDie, null, this);
		  game.physics.arcade.collide(cloud.drops, state.entities.runner, this.collider.dropDie, null, this);
		  game.physics.arcade.collide(state.entities.player, cloud.drops, this.collider.playerDie, null, this);
	    }, state);
      }
};

Collider.prototype.dropDie = function (collide1, collide2) {
      var emitter, drop;
      emitter = game.global.emitters.drop;
      drop = collide1;

      drop.kill();

      emitter.x = drop.position.x;
      emitter.y = drop.position.y;
      emitter.start(true, 600, null, 15);
};

Collider.prototype.flagDie = function (collide1, collide2) {
      game.global.stateLoader.loadNextState();
};

Collider.prototype.runnerDie = function (collide1, collide2) {
      var emitterPlayer, emitterRunner, player, runner;

      emitterPlayer = game.global.emitters.player;
      emitterRunner = game.global.emitters.runner;
      player = collide1;
      runner = collide2;
      
      player.kill();
      runner.kill();
      
      emitterPlayer.x = player.x;
      emitterPlayer.y = player.y;
      emitterPlayer.start(true, 600, null, 15);

      emitterRunner.x = runner.x;
      emitterRunner.y = runner.y;
      emitterRunner.start(true, 600, null, 15);
      
      game.time.events.add(Phaser.Timer.SECOND, game.global.stateLoader.reset, this);
};

Collider.prototype.playerDie = function (collide1, collide2) {
      var emitter, player;

      emitter = game.global.emitters.player;
      player = collide1;

      player.kill();

      emitter.x = player.x;
      emitter.y = player.y;
      emitter.start(true, 600, null, 15);

      game.time.events.add(Phaser.Timer.SECOND, game.global.stateLoader.reset, this);
};