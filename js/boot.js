/*  Second game state (2/5)
 *  Sets system and game window up before loading assets in the next state
 */ 

var bootState = {
	preload: function() {
		// Loads in progress bar to display in load.js (the loading state)
		//game.load.image('progressBar', 'assets/progressBar.png');
	},

	create: function() {
		//game.stage.backgroundColor = '#3498db';

		// TODO: Decide what Physics engine to use
		//game.physics.startSystem(Phaser.Physics.ARCADE);

		// Mobile: configures game screen for mobile devices
		/*
		if (!game.device.desktop) {
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

			document.body.style.backgroundColor = '#3498db'; // border colours

			game.scale.minWidth = 250;
			game.scale.minHeight = 170;
			game.scale.maxWidth = 1000;
			game.scale.maxHeight = 680;

			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;

			game.scale.setScreenSize(true);
		}
		*/

		game.state.start('load');
	}
};