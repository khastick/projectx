/*  First game state (1/5)
 *  Phaser initialization here as well as adding of other game states
 */ 

//var game = new Phaser.Game(500, 340, Phaser.AUTO, 'game');
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

// Global variables set in here
game.global = {
	score: 0
};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

game.state.start('boot');