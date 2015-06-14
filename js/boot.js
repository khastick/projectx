/*  Second game state (2/5)
 *  Sets system and game window up before loading assets in the next state
 */ 

var bootState = {
	preload: function() {
		// Loads in progress bar to display in load.js (the loading state)
		game.load.image('progressBar', 'images/progressBar.png');
	},

	create: function() {
		game.stage.backgroundColor = '#AFB9A1';

	    //scaling options
	    this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
	    
	    //have the game centered horizontally
	    this.scale.pageAlignHorizontally = true;
	    this.scale.pageAlignVertically = true;

	    //screen size will be set automatically
	    this.scale.setScreenSize(true);
		game.physics.startSystem(Phaser.Physics.ARCADE);		
		game.world.setBounds(0, 0, 1600, 1200);
		game.state.start('load');
	}
};