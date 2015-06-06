/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function createTileGroup(type, tilemap){
    return findObjectsByType(type, tilemap, 'objectLayer' );
}

function findObjectsByType (type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function (element) {
            if (element.properties.type === type) {
                //Phaser uses top left, Tiled bottom left so we have to adjust
                //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
                //so they might not be placed in the exact position as in Tiled
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
   }
   
   function setRandEnemy(game, entity){       
       entity.reset(game.rnd.integerInRange(game.world.centerX - 250, game.world.centerX * 1.75), 0);
       entity = setEnemy(game, entity);
       return entity;
   }
   
   function setEnemy(game, entity){
       entity.anchor.setTo(0.5, 1);        
        entity.body.gravity.y = game.rnd.integerInRange(400, 700);
        entity.body.velocity.x = game.rnd.integerInRange(70, 200) * Phaser.Math.randomSign();
        entity.body.bounce.x = 1;
        entity.checkWorldBounds = true;
        entity.outOfBoundsKill = true;
        return entity;
   }
   
   function setPlayer(game, entity){       
        game.physics.arcade.enable(entity);
       entity.anchor.setTo(0.5, 0.5);
       entity.body.gravity.y = 500;
       return entity;
   }
   
   function setFlag(game, entity){       
        game.physics.arcade.enable(entity);
       entity.anchor.setTo(0.5, 0.5);
       entity.body.gravity.y = 500;
       return entity;
   }
   
   function setPlatform(game,entity){       
        game.physics.arcade.enable(entity);

        entity.enableBody = true;
        entity.anchor.setTo(0.5, 0.5);
        entity.body.immovable = true;

        entity.body.bounce.x = 1;
        entity.checkWorldBounds = true;
        entity.outOfBoundsKill = true;

        entity.body.velocity.x = 250;
        return entity;
   }
   
   function createEmitter(){
        // death particles
        var entity = game.add.emitter(0, 0, 500);
        entity.makeParticles('pixel');
        entity.setYSpeed(-150, 150); // speed randomly chosen between numbers
        entity.setXSpeed(-150, 150);
        entity.gravity = 0;
        entity.minParticleScale = 0.1;
        entity.maxParticleScale = 0.7;
        return entity;
   }