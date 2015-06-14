/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function makeWorldBounded(entity){
    entity.body.gravity.y = 500;    
    entity.body.velocity.x = 1;
    entity.body.bounce.x = 1;
    entity.checkWorldBounds = true;
    entity.outOBoundsKill = true;
    return entity;
}

function makeStandard(entity){
    entity.anchor.setTo(0.5, 0.5);
    entity.body.gravity.y = 500; 
    return entity;
}

function makeFloater(entity){
    entity.body.velocity.x = 10;
    entity.body.bounce.x = 1;
    entity.body.immovable = true;
    entity.checkWorldBounds = true;
    entity.outOBoundsKill = true;
    return entity;
}

function setEntity(entity, setter){
    entity = setter(entity);
}

