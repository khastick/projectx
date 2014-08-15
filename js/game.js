var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var player;
var enemies;

function preload() {
	game.load.image('player', 'assets/kirbysmall.png');
	game.load.image('playerSuper', 'assets/kirbylarge.png');
	game.load.image('enemy', 'assets/voltorb.gif');
	game.load.image('boss', 'assets/electrode.png');
}

function create() {
	player = game.add.sprite(32, game.world.height - 150, 'player');
	player = game.add.sprite(2, game.world.height - 76, 'enemy');
	player = game.add.sprite(64, game.world.height - 50, 'enemy');
	player = game.add.sprite(100, game.world.height - 100, 'boss');

	game.world.setBounds(0, 0, 800, 600);
	player.body.collideWorldBounds(true);
	player.bringToTop();
}

function update() {
	
}