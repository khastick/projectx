/*  Fourth game state (4/5)
 *  Functions as a menu or title screen
 */ 

var menuState = {
	create: function() {
		var menuStateText = game.add.text(game.world.centerX / 2, game.world.centerY / 2, 'PROJECT X',
			{font: fontFamily, fill: fontColour});
		menuStateText.anchor.setTo(0.5, 0.5);

		//game.world.setBounds(0, 0, 1600, 800);

		game.stage.backgroundColor = '#AFB9A1';

		game.input.onDown.addOnce(this.start, this);

		var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		upKey.onDown.addOnce(this.start, this);
	},

	start: function() {
		//this.startSound.play();
		game.global.loadCurrentState();
	}
};

