/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function makeDrop(x, y) {

}

function dieDrop(collide1, collide2) {
      var em = this.emitters['drop'];

      collide1.kill();

      em.x = collide1.position.x;
      em.y = collide1.position.y;
      em.start(true, 600, null, 15);

}