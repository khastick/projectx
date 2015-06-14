/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function makeCreate() {
      game.physics.arcade.enable(this);
      this.anchor.setTo(0.5, 0.5);
      this.body.gravity.y = 500;
}

function playerMove() {
      var player = this.player;

      if (this.cursor.left.isDown || this.wasd.left.isDown || this.moveLeft) {
	    player.body.velocity.x = -200;
      }
      else if (this.cursor.right.isDown || this.wasd.right.isDown || this.moveRight) {
	    player.body.velocity.x = 200;
      }
      else {
	    player.body.velocity.x = 0;
      }

      if (this.cursor.up.isDown || this.wasd.up.isDown) {
	    this.jump();
      }

}

function playerJump() {
      var player = this.player;

      if (player.body.onFloor() || player.body.touching.down) {
	    player.body.velocity.y = -320;
      }
}

function playerDie(condition) {
      var player = this.player;
      var em = this.emitters['player'];
      
      if (!player.alive) {
	    return;
      }

      player.kill();

      if (condition != "fall") {
	    em.x = player.x;
	    em.y = player.y;
	    em.start(true, 600, null, 15);
      }

      game.time.events.add(1000, this.reset, this);
}