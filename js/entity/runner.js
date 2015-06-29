/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function makeRunner() {
      this.GRAVITY_Y = 500;
      this.SPEED_X = 100;

      this.body.gravity.y = this.GRAVITY_Y;
      this.body.velocity.x = this.SPEED_X;
      this.body.bounce.x = 1;
      this.checkWorldBounds = true;
      this.outOBoundsKill = true;
}
