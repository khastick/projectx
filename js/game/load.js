/*  Third game state (3/5)
 *  Loads in every asset
 *  Can show a progress bar if a sprite exists
 */

/* global game, fontFamily, fontColour */

function Load() {
      this.text;
      this.bar; // progress bar
}

Load.prototype.preload = function () {

      var entityLoader, mapLoader, setLoader, audioLoader, textProperty, barProperty;
      
      textProperty = {
	    x : game.world.centerX / 2,
	    y : game.world.centerY / 2,
	    message : 'loading...',
	    font : {font: fontFamily, fill: fontColour}
      };
      
      barProperty = {
	    x : game.world.centerX /2,
	    y : game.world.centerX * .67,
	    message : 'progressBar'
      };
      
      this.text = game.add.text(textProperty.x, textProperty.y, textProperty.message, textProperty.font);
      this.text.anchor.setTo(0.5, 0.5);

      this.bar = game.add.sprite(barProperty.x, barProperty.y, barProperty.message);
      this.bar.anchor.setTo(0.5, 0.5);
      
      game.load.setPreloadSprite(this.bar);

      entityLoader = new AssetLoader(
	      ['player', 'drop', 'cloud', 'runner', 'pixel_runner', 'pixel_player', 'pixel_drop', 'flag', 'block'],
	      'images/entity/',
	      '.png'
	      );

      mapLoader = new AssetLoader(
	      ['tilemap', 'tilemap-02'/*, 'tilemap-03'*/],
	      'maps/',
	      '.json'
	      );

      setLoader = new AssetLoader(
	      ['tileset', 'tileset-02'/*, 'tileset-03'*/],
	      ' images/',
	      '.png'
	      );

      /* audioLoader = new AssetLoader(
       ['jump', 'coin', 'dead'],
       'audio/',
       ['.ogg', 'mp3']
       );
       
       for (name in audioLoader.names) {
       var path01 = audioLoader.directory + name + audioLoader.filetype[0];
       var path02 = audioLoader.directory + name + audioLoader.filetype[1];
       game.load.audio(name, [path01, path02]);
       }*/

      entityLoader.names.forEach(function (name) {
	    var path = entityLoader.directory + name + entityLoader.filetype;
	    game.load.image(name, path);
      });

      setLoader.names.forEach(function (name) {
	    var path = setLoader.directory + name + setLoader.filetype;
	    game.load.image(name, path);
      });

      mapLoader.names.forEach(function (name) {
	    var path = mapLoader.directory + name + mapLoader.filetype;
	    game.load.tilemap(name, path, null, Phaser.Tilemap.TILED_JSON);
      });

};

Load.prototype.create = function () {
      game.global.stateLoader.reset();
};