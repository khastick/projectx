/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function createTileGroup(type, tilemap) {
      return findObjectsByType(type, tilemap, 'objectLayer');
}

function findObjectsByType(type, map, layer) {
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



//find objects in a Tiled layer that contains a property called "type" equal to a certain value
function findObject(type, map, layer) {
      var result = new Array();
      map.objects[layer].forEach(
	      function (element) {
		    if (element.properties.type === type) {
			  /*
			   Phaser uses top left, Tiled bottom left so we have to adjust
			   also keep in mind that the cup images are a bit smaller than the tile which is 16x16
			   so they might not be placed in the exact position as in Tiled
			   */
			  element.y -= map.tileHeight;
			  result.push(element);
		    }
	      });
      return result;
}

// create a sprite from an object
// for use with putting objects from object layer into a group (multiple items or enemies, for instance)
function makeObject(tile, group) {
      var sprite = group.create(tile.x, tile.y, tile.properties.sprite);

      //copy all properties to the sprite
      Object.keys(tile.properties).forEach(
	      function (key) {
		    sprite[key] = tile.properties[key];
	      });
}