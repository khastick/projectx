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

	cursors = game.input.keyboard.createCursorKeys();

	game.world.setBounds(0, 0, 800, 600);
	player.body.collideWorldBounds(true);
	player.bringToTop();


	//game.physics.arcade.enable(player);
}

function update() {
    //  Reset the players velocity (movement)
    //player.body.velocity.x = 0;

	if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -150;

       // player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        //  Move to the right
        player.body.velocity.x = 150;

        //player.animations.play('right');
    }
    else if (cursors.up.isDown) {
    	player.body.velocity.y = -150;
    }
    else if (cursors.down.isDown) {
    	player.body.velocity.y = 150;
    }
    else {
        //  Stand still
        player.animations.stop();

        //player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    /*
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
    */
}