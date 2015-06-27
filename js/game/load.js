/*  Third game state (3/5)
 *  Loads in every asset
 *  Can show a progress bar if a sprite exists
 */

function AssetLoader(names, directory, filetype) {
      this.names = names;
      this.directory = directory;
      this.filetype = filetype;
}

var loadState = {
      preload: function () {

	    var entityLoader, mapLoader, setLoader, audioLoader;

	    var loadStateText = game.add.text(game.world.centerX / 2, game.world.centerY / 2, 'loading...',
		    {font: fontFamily, fill: fontColour});
	    loadStateText.anchor.setTo(0.5, 0.5);

	    var progressBar = game.add.sprite(game.world.centerX / 2, game.world.centerY * .67, 'progressBar');
	    progressBar.anchor.setTo(0.5, 0.5);
	    game.load.setPreloadSprite(progressBar);

	    entityLoader = new AssetLoader(
		    ['player', 'drop', 'cloud', 'runner', 'pixel_player', 'pixel_drop', 'flag', 'block'],
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

	    entityLoader.names.forEach(function(name){
		  var path = entityLoader.directory + name + entityLoader.filetype;
		  game.load.image(name, path);
	    });

	    setLoader.names.forEach(function(name){
		  var path = setLoader.directory + name + setLoader.filetype;
		  game.load.image(name, path);
	    });

	    mapLoader.names.forEach(function(name){
		  var path = mapLoader.directory + name + mapLoader.filetype;
		  game.load.tilemap(name, path, null, Phaser.Tilemap.TILED_JSON);
	    });

      },
      create: function () {
	    game.state.start('menu');
      }
};