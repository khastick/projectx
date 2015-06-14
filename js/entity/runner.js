/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function makeRunner(){
    this.body.gravity.y = 500;    
    this.body.velocity.x = 100;
    this.body.bounce.x = 1;
    this.checkWorldBounds = true;
    this.outOBoundsKill = true;
}
