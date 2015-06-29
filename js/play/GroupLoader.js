/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function GroupLoader() {
      this.LAYER = 'objectLayer';
}

GroupLoader.prototype.createGroups = function (state) {
      var map, entities, sprite, type, setters;

      setters = {
	    'flag': makeFlag,
	    'runner': makeRunner,
	    'cloud': makeCloud,
	    'block': makeBlock,
	    'player': Player
      };

      map = state.tilemap;

      state.entities = {}; // fixes cache error
      entities = state.entities;

      map.objects[this.LAYER].forEach(function (tile) {
	    tile.y -= map.tileHeight; // Phaser uses top left, Tiled bottom left so we have to adjust

	    type = tile.properties.type;

	    if (typeof entities[type] === 'undefined') { // create group
		  entities[type] = game.add.group();
		  entities[type].enableBody = true;
	    }

	    // make object
	    sprite = entities[type].create(tile.x, tile.y, type);

	    Object.keys(tile.properties).forEach(function (key) {
		  sprite[key] = tile.properties[key];
	    });

	    sprite.setter = setters[type];
	    sprite.setter();
      });
};