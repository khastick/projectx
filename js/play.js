/*  Fifth game state (5/5)
 *  The actual gameplay state
 */ 

var playState = {
	create: function() {

		var playStateText = game.add.text(game.world.centerX * 1, game.world.centerY * 1, 'good luck',
			{font: fontFamily, fill: fontColour});
		playStateText.anchor.setTo(0.5, 0.5);


		game.input.onDown.addOnce(this.reset, this);

		game.stage.backgroundColor = '#98AC4F';

		this.player = game.add.sprite(game.world.centerX, game.world.centerY - 100, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 500;

		this.cursor = game.input.keyboard.createCursorKeys();
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP],
			Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT);

		this.wasd = {
			up: game.input.keyboard.addKey(Phaser.Keyboard.W),
			left: game.input.keyboard.addKey(Phaser.Keyboard.A),
			right: game.input.keyboard.addKey(Phaser.Keyboard.D)
		};

		this.createWorld();

		game.camera.follow(this.player);

		this.enemies = game.add.group();
		this.enemies.enableBody = true;
		this.enemies.createMultiple(10, 'enemy');
		//game.time.events.loop(2200, this.addEnemy, this);
		game.time.events.loop(250, this.addEnemy, this);
		//this.nextEnemy = 0; // for dynamic frequency of enemies

		this.emitter = game.add.emitter(0, 0, 500);
		this.emitter.makeParticles('pixel');
		this.emitter.setYSpeed(-150, 150); // speed randomly chosen between numbers
		this.emitter.setXSpeed(-150, 150);
		this.emitter.gravity = 0;
		this.emitter.minParticleScale = 0.1;
		this.emitter.maxParticleScale = 0.7;
	},

	update: function() {
		//game.physics.arcade.collide(this.player, this.walls);
		//game.physics.arcade.collide(this.enemies, this.walls);

		game.physics.arcade.collide(this.player, this.layer);
		game.physics.arcade.collide(this.enemies, this.layer);

		game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);
		this.movePlayer();
		if (!this.player.inWorld) {
			//this.playerDie("fall");
			alert();
			this.playerDie("fall");
		}
	},

	movePlayer: function() {

		if (this.cursor.left.isDown || this.wasd.left.isDown || this.moveLeft) {
			this.player.body.velocity.x = -200;
			//this.player.animations.play('left');
		}
		else if (this.cursor.right.isDown || this.wasd.right.isDown || this.moveRight) {
			this.player.body.velocity.x = 200;
			//this.player.animations.play('right');
		}
		else {
			this.player.body.velocity.x = 0;
			//this.player.animations.stop();
			//this.player.frame = 0;
		}

		if (this.cursor.up.isDown || this.wasd.up.isDown) {
			this.jumpPlayer();
		}

	},

	jumpPlayer: function() {
		//console.log('aa');
		if (this.player.body.onFloor() || this.player.body.touching.down) {
			this.player.body.velocity.y = -320;
			//this.jumpSound.play();
			//console.log('aa');
		}
	},

	playerDie: function(condition) {
		//this.reset();


		if (!this.player.alive) {
			return;
		}

		this.player.kill();

		//this.deadSound.play();

		if (condition != "fall") {
			this.emitter.x = this.player.x;
			this.emitter.y = this.player.y;
			this.emitter.start(true, 600, null, 15);
		}

		//this.music.stop();

		game.time.events.add(1000, this.reset, this);

		//game.state.start('menu');
		/*
		if (!this.player.alive) {
			return;
		}*/

		//this.player.kill();

		//this.deadSound.play();
/*
		if (condition != "fall") {
			this.emitter.x = this.player.x;
			this.emitter.y = this.player.y;
			this.emitter.start(true, 600, null, 15);
		}*/

		//this.music.stop();

		//game.time.events.add(1000, this.startMenu, this);
	},

	createWorld: function() {
		this.tilemap = game.add.tilemap('tilemap');
		this.tilemap.addTilesetImage('tileset');
		this.layer = this.tilemap.createLayer('Tile Layer 1');
		this.layer.resizeWorld();
		this.tilemap.setCollision(1);

		/*
		this.walls = game.add.group();
		this.walls.enableBody = true;

		this.platform = game.add.sprite(game.world.centerX - 250, game.world.centerY + 100, 'wallH', 0, this.walls);
		this.platform.anchor.setTo(0.5, 0.5);

		for (var i = 0; i <= 10; ++i) {
			this.platform = game.add.sprite(game.world.centerX + 250 * i, game.world.centerY + 100, 'wallH', 0, this.walls);
			this.platform.anchor.setTo(0.5, 0.5);
		}
		this.walls.setAll('body.immovable', true);
		*/
	},

	addEnemy: function() {
		var enemy = this.enemies.getFirstDead();

		if (!enemy) {
			return;
		}

		enemy.anchor.setTo(0.5, 1);
		//enemy.reset(game.world.centerX, 0);
		enemy.reset(game.rnd.integerInRange(game.world.centerX - 250, game.world.centerX * 1.75), 0);
		//enemy.body.gravity.y = 500;
		enemy.body.gravity.y = game.rnd.integerInRange(450, 700);
		//enemy.body.velocity.x = 100 * Phaser.Math.randomSign();
		enemy.body.velocity.x = game.rnd.integerInRange(75, 200) * Phaser.Math.randomSign();
		enemy.body.bounce.x = 1;
		enemy.checkWorldBounds = true;
		enemy.outOfBoundsKill = true;
	},

	reset: function() {
		game.state.start('menu');
	}

	/*
	create: function() {
		this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 500;

		this.cursor = game.input.keyboard.createCursorKeys();

		game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP],
			Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT);

		this.wasd = {
			up: game.input.keyboard.addKey(Phaser.Keyboard.W),
			left: game.input.keyboard.addKey(Phaser.Keyboard.A),
			right: game.input.keyboard.addKey(Phaser.Keyboard.D)
		};

		if (!game.device.desktop) {
			this.addMobileInputs();
		}

		this.createWorld();

		this.coin = game.add.sprite(60, 140, 'coin');
		game.physics.arcade.enable(this.coin);
		this.coin.anchor.setTo(0.5, 0.5);

		this.scoreLabel = game.add.text(30, 30, 'score: 0',
			{ font: '18px Geo', fill: '#ffffff' });
		game.global.score = 0;

		this.enemies = game.add.group();
		this.enemies.enableBody = true;
		this.enemies.createMultiple(10, 'enemy');
		//game.time.events.loop(2200, this.addEnemy, this);
		this.nextEnemy = 0; // for dynamic frequency of enemies

		this.jumpSound = game.add.audio('jump');
		this.jumpSound.volume = 0.5;
		this.coinSound = game.add.audio('coin');
		this.coinSound.volume = 0.5;
		this.deadSound = game.add.audio('dead');
		this.deadSound.volume = 0.5;

		this.player.animations.add('right', [1, 2], 8, true);
		this.player.animations.add('left', [3, 4], 8, true);

		this.emitter = game.add.emitter(0, 0, 500);
		this.emitter.makeParticles('pixel');
		this.emitter.setYSpeed(-150, 150); // speed randomly chosen between numbers
		this.emitter.setXSpeed(-150, 150);
		this.emitter.gravity = 0;
		this.emitter.minParticleScale = 0.1;
		this.emitter.maxParticleScale = 0.7;

		this.music = game.add.audio('music');
		this.music.volume = 0.25;
		this.music.loop = true;
		this.music.play();
	},

	update: function() {

		
		// old collisions without tilemap
		//game.physics.arcade.collide(this.player, this.walls);
		//game.physics.arcade.collide(this.enemies, this.walls);

		game.physics.arcade.collide(this.player, this.layer);
		game.physics.arcade.collide(this.enemies, this.layer);

		game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);

		game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);

		this.movePlayer();

		if (this.nextEnemy < game.time.now) {
			var easy = 4000, hard = 1000, score = 100;

			// formula to decrease delay between enemy frequency over time
			// starts at easy then slowly goes to hard
			// the higher the player's score, the less time between enemy spawns
			var delay = Math.max(easy - (easy - hard) * game.global.score / score, hard);

			this.addEnemy();
			this.nextEnemy = game.time.now + delay;
		}
	},

	movePlayer: function() {
		if (!this.player.inWorld) {
			this.playerDie("fall");
		}

		if (this.cursor.left.isDown || this.wasd.left.isDown || this.moveLeft) {
			this.player.body.velocity.x = -200;
			this.player.animations.play('left');
		}
		else if (this.cursor.right.isDown || this.wasd.right.isDown || this.moveRight) {
			this.player.body.velocity.x = 200;
			this.player.animations.play('right');
		}
		else {
			this.player.body.velocity.x = 0;
			this.player.animations.stop();
			this.player.frame = 0;
		}

		if (this.cursor.up.isDown || this.wasd.up.isDown) {
			this.jumpPlayer();
		}
	},

	createWorld: function() {
		this.map = game.add.tilemap('map');
		this.map.addTilesetImage('tileset');
		this.layer = this.map.createLayer('Tile Layer 1');
		this.layer.resizeWorld();
		this.map.setCollision(1);
	},

	playerDie: function(condition) {
		if (!this.player.alive) {
			return;
		}

		this.player.kill();

		this.deadSound.play();

		if (condition != "fall") {
			this.emitter.x = this.player.x;
			this.emitter.y = this.player.y;
			this.emitter.start(true, 600, null, 15);
		}

		this.music.stop();

		game.time.events.add(1000, this.startMenu, this);
	}, 

	playerExplode: function() {
		this.emitter.x = this.player.x;
		this.emitter.y = this.player.y;
		this.emitter.start(true, 600, null, 15);
	},

	startMenu: function() {
		game.state.start('menu');
	},

	takeCoin: function(player, coin) {
		this.coinSound.play();
		game.global.score += 5;
		this.scoreLabel.text = 'score: ' + game.global.score;

		game.add.tween(this.player.scale).to({x: 1.3, y: 1.3}, 50).to({x: 1, y: 1}, 150).start();

		this.coin.scale.setTo(0, 0);
		game.add.tween(this.coin.scale).to({x: 1, y: 1}, 300).start();
		this.updateCoinPosition();
	},

	updateCoinPosition: function() {
		var coinPosition = [
			{x: 140, y: 60}, {x: 360, y: 60},
			{x: 60, y: 140}, {x: 440, y: 140},
			{x: 130, y: 300}, {x: 370, y: 300}
		];

		for (var i = 0; i < coinPosition.length; i++) {
			if (coinPosition[i].x === this.coin.x) {
				coinPosition.splice(i, 1);
			}
		}

		var newPosition = coinPosition[game.rnd.integerInRange(0, coinPosition.length-1)];

		this.coin.reset(newPosition.x, newPosition.y);
	},

	addEnemy: function() {
		var enemy = this.enemies.getFirstDead();

		if (!enemy) {
			return;
		}

		enemy.anchor.setTo(0.5, 1);
		enemy.reset(game.world.centerX, 0);
		enemy.body.gravity.y = 500;
		enemy.body.velocity.x = 100 * Phaser.Math.randomSign();
		enemy.body.bounce.x = 1;
		enemy.checkWorldBounds = true;
		enemy.outOfBoundsKill = true;
	},

	addMobileInputs: function() {
		this.jumpButton = game.add.sprite(350, 247, 'jumpButton');
		this.jumpButton.inputEnabled = true;
		this.jumpButton.events.onInputDown.add(this.jumpPlayer, this);
		this.jumpButton.alpha = 0.5;

		this.moveLeft = false;
		this.moveRight = false;

		this.leftButton = game.add.sprite(50, 247, 'leftButton');
		this.leftButton.inputEnabled = true;
		this.leftButton.events.onInputOver.add(function() {this.moveLeft = true;}, this);
		this.leftButton.events.onInputOut.add(function() {this.moveLeft = false;}, this);
		this.leftButton.events.onInputDown.add(function() {this.moveLeft = true;}, this);
		this.leftButton.events.onInputUp.add(function() {this.moveLeft = false;}, this);
		this.leftButton.alpha = 0.5;

		this.rightButton = game.add.sprite(130, 247, 'rightButton');
		this.rightButton.inputEnabled = true;
		this.rightButton.events.onInputOver.add(function() {this.moveRight = true;}, this);
		this.rightButton.events.onInputOut.add(function() {this.moveRight = false;}, this);
		this.rightButton.events.onInputDown.add(function() {this.moveRight = true;}, this);
		this.rightButton.events.onInputUp.add(function() {this.moveRight = false;}, this);
		this.rightButton.alpha = 0.5;

	},

	jumpPlayer: function() {
		if (this.player.body.onFloor()) {
			this.player.body.velocity.y = -320;
			this.jumpSound.play();
		}
	}
	*/
};