var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var player;
var enemies;
var enemy1;
var enemy2;
var boss;
var cursors;

function preload() {
	game.load.image('player', 'assets/kirbysmall.png');
	game.load.image('playerSuper', 'assets/kirbylarge.png');
	game.load.image('enemy', 'assets/voltorb.gif');
	game.load.image('boss', 'assets/electrode.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
	player = game.add.sprite(700, game.world.height - 150, 'player');
	//enemy1 = game.add.sprite(2, game.world.height - 76, 'enemy');
	//enemy2 = game.add.sprite(64, game.world.height - 50, 'enemy');
	boss = game.add.sprite(100, game.world.height - 100, 'boss');

    game.physics.enable(player, Phaser.Physics.ARCADE);
    //game.physics.enable(enemy1, Phaser.Physics.ARCADE);
    //game.physics.enable(enemy2, Phaser.Physics.ARCADE);
    game.physics.enable(boss, Phaser.Physics.ARCADE);

    //enemy1.enableBody = true;

	cursors = game.input.keyboard.createCursorKeys();
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(boss);

	game.world.setBounds(0, 0, 800, 600);
    player.body.collideWorldBounds = true;
	player.bringToTop();

    enemies = game.add.group(); 
    enemies.enableBody = true;

    boss.enableBody = true;
    boss.body.collideWorldBounds = true;

    enemies.create(2, game.world.height - 76, 'enemy');
    enemies.create(64, game.world.height - 50, 'enemy');

    for (var i = 0; i < enemies.length; i++) {
        //enemies[i].y = -300;
        //enemies[i];
        //enemies.getAt(i).body.velocity.y = -300;
        enemies.getAt(i).body.collideWorldBounds = true;
        game.physics.enable(enemies.getAt(i));
    }

	//game.physics.arcade.enable(player);
}

function update() {
    //  Reset the players velocity (movement)
    //player.body.velocity.x = 0;
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    game.physics.arcade.overlap(player, enemies, absorb, null, this);
    //game.physics.arcade.overlap(player, enemy1, absorb, null, this);

    for (var i = 0; i < enemies.length; i++) {
        //enemies[i].y = -300;
        //enemies[i];
        var random = Math.floor(Math.random() * 4) + 1);
        if (random === 1) {
            enemies.getAt(i).body.velocity.y = -300;
        } 
        else if (random === 2) {
            enemies.getAt(i).body.velocity.y = 300;
        }
        else if (random === 3) {
            enemies.getAt(i).body.velocity.x = -300;
        }
        else if (random === 4) {
            enemies.getAt(i).body.velocity.x = 300;
        }
    }

    boss.body.velocity.x = 450;

	if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -500;

       // player.animations.play('left');
        //player.body.x--;
        //alert(player.body.x);

    }
    else if (cursors.right.isDown) {
        //  Move to the right
        player.body.velocity.x = 500;

        //player.animations.play('right');
        //player.x++;
    }
     if (cursors.up.isDown) {
    	player.body.velocity.y = -500;
        //player.y--;
    }
    else if (cursors.down.isDown) {
    	player.body.velocity.y = 500;
        //player.y++;
    }
    //else {
        //  Stand still
        //player.body.velocity.y = 150;
        //player.animations.stop();

        //player.frame = 4;
    //}

    //if (player.body.velocity)
    
    //  Allow the player to jump if they are touching the ground.
    /*
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
    */

    function absorb(player, enemy1) {
        //alert('absorb');
        player.loadTexture('playerSuper');
        //player = game.add.sprite(player.x, player.y, 'playerSuper');
    }
}