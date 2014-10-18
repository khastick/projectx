/*  First game state (1/5)
 *  Phaser initialization here as well as adding of other game states
 */ 

//var game = new Phaser.Game(500, 340, Phaser.AUTO, 'game');
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

var fontFamily = '30px Candara, Calibri, Segoe, "Segoe UI", Optima, Arial, sans-serif';
var fontColour = '#2F551E';

// Global variables set in here
game.global = {
	// camera?
	//score: 0
};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

game.state.start('boot');