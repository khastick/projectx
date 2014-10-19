/*  Third game state (3/5)
 *  Loads in every asset
 *  Can show a progress bar if a sprite exists
 */ 

var loadState = {
	preload: function() {

		var loadStateText = game.add.text(game.world.centerX / 2, game.world.centerY / 2, 'loading...',
			{font: fontFamily, fill: fontColour});
		loadStateText.anchor.setTo(0.5, 0.5);



		var progressBar = game.add.sprite(game.world.centerX / 2, game.world.centerY * .67, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);

		game.load.image('player', 'images/player.png'); // Player as static image
		//game.load.image('wallV', 'images/wallVertical.png'); // Vertical wall that was used before tile map
		//game.load.image('wallH', 'images/wallHorizontal.png'); // Horizontal wall that was used before tile map
		game.load.image('enemy', 'images/enemy.png');
		game.load.image('enemy2', 'images/enemy2.png'); // purple enemy from tilemap
		game.load.image('pixel', 'images/pixel.png');
		game.load.image('platform', 'images/platform.png');

		game.load.audio('jump', ['audio/jump.ogg', 'audio/jump.mp3']);
		game.load.audio('coin', ['audio/coin.ogg', 'audio/coin.mp3']);
		game.load.audio('dead', ['audio/dead.ogg', 'audio/dead.mp3']);

		game.load.image('tileset', 'images/tileset.png');
		game.load.tilemap('tilemap', 'maps/tilemap.json', null, Phaser.Tilemap.TILED_JSON);

		/*
		var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...',
			{font: '30px Arial', fill: '#ffffff'});
		loadingLabel.anchor.setTo(0.5, 0.5);

		var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);

		//game.load.image('player', 'assets/player.png'); // Player as static image
		game.load.spritesheet('player', 'assets/player2.png', 20, 20);
		game.load.image('enemy', 'assets/enemy.png');
		game.load.image('coin', 'assets/coin.png');
		//game.load.image('wallV', 'assets/wallVertical.png'); // Vertical wall that was used before tile map
		//game.load.image('wallH', 'assets/wallHorizontal.png'); // Horizontal wall that was used before tile map
		game.load.image('background', 'assets/background.png');
		game.load.image('pixel', 'assets/pixel.png');
		game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);

		game.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);
		game.load.audio('coin', ['assets/coin.ogg', 'assets/coin.mp3']);
		game.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mp3']);
		game.load.audio('music', 'assets/music.mp3');

		game.load.image('jumpButton', 'assets/jumpButton.png');
		game.load.image('rightButton', 'assets/rightButton.png');
		game.load.image('leftButton', 'assets/leftButton.png');

		game.load.image('tileset', 'assets/tileset.png');
		game.load.tilemap('map', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
		*/
	},

	create: function() {
		game.state.start('menu');
	}
};