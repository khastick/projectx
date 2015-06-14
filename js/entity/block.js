/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function makeBlock(){
    this.body.velocity.x = 50;
    this.body.bounce.x = 1;
    this.body.immovable = true;
    this.checkWorldBounds = true;
    this.outOBoundsKill = true;
}
