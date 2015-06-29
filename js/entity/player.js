/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global game */

function Player() {
      this.SPEED_X = 200;
      this.SPEED_Y = 320;
      this.GRAVITY_Y = 500;
      
      this.anchor.setTo(0.5, 0.5);
      this.body.gravity.y = this.GRAVITY_Y;

      this.move = function (state) {
	    if (state.cursor.left.isDown || state.wasd.left.isDown || state.moveLeft) {
		  this.body.velocity.x = -this.SPEED_X;
	    }
	    else if (state.cursor.right.isDown || state.wasd.right.isDown || state.moveRight) {
		  this.body.velocity.x = this.SPEED_X;
	    }
	    else {
		  this.body.velocity.x = 0;
	    }

	    if (state.cursor.up.isDown || state.wasd.up.isDown) {
		  this.jump();
	    }

      };

      this.jump = function () {
	    if (this.body.onFloor() || this.body.touching.down) {
		  this.body.velocity.y = -this.SPEED_Y;
	    }
      };
 }