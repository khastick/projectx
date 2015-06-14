/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function createEmitter(speed, min, max, misc, gravity, image)
{
      // death particles
      var entity = game.add.emitter(0, 0, misc);
      entity.makeParticles(image);
      entity.setYSpeed(-speed, speed); // speed randomly chosen between numbers
      entity.setXSpeed(-speed, speed);
      entity.gravity = gravity;
      entity.minParticleScale = min;
      entity.maxParticleScale = max;
      return entity;
}

function makePlayerEmitter(){
      return createEmitter(150, 0.1, 0.7, 500, 0, 'pixel_player');
}

function makeDropEmitter(){
      return createEmitter(125, 0.1, 0.8, 500, 400, 'pixel_drop');
}