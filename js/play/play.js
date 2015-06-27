/*  Fifth game state (5/5)
 *  The actual gameplay state
 */

/* global game */

var playState = {
      create: function () {
	    this.group = {};
	    this.emitters = {};

	    this.initBackground();
	    this.initKeyboard();

	    this.findObject = findObject;
	    this.makeObject = makeObject;

	    this.createWorld();
	    this.player = this.group.player.getTop();

	    game.camera.follow(this.player);

	    this.group['cloud'].forEach(
		    function (element) {
			  game.time.events.loop(1000, element.rain, element);
		    });

	    this.emitters['player'] = makePlayerEmitter(); // death particles
	    this.emitters['drop'] = makeDropEmitter();

	    this.jump = playerJump;
	    this.die = playerDie;
	    this.move = playerMove;
      },
      update: function () {
	    this.collision();

	    this.move();
	    if (!this.player.inWorld) {
		  this.die("fall");
	    }
      },
      collision: function () {
	    var runners, flags, blocks, clouds, blockedLayer, players;

	    runners = this.group['runner'];
	    flags = this.group['flag'];
	    clouds = this.group['cloud'];
	    blocks = this.group['block'];
	    players = this.group['player'];
	    blockedLayer = this.blockedLayer;

	    game.physics.arcade.collide(players, blockedLayer);
	    game.physics.arcade.collide(runners, blockedLayer);
	    game.physics.arcade.collide(flags, blockedLayer);
	    game.physics.arcade.collide(blocks, blockedLayer);

	    var drops = clouds.getTop().group;

	    game.physics.arcade.collide(drops, blockedLayer, dieDrop, null, this);

	    game.physics.arcade.collide(players, flags);
	    game.physics.arcade.collide(players, blocks);
	    game.physics.arcade.overlap(players, runners, this.die, null, this);
      },
      initKeyboard: function () {
	    this.cursor = game.input.keyboard.createCursorKeys();
	    game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP],
		    Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT);

	    this.wasd = {
		  up: game.input.keyboard.addKey(Phaser.Keyboard.W),
		  left: game.input.keyboard.addKey(Phaser.Keyboard.A),
		  right: game.input.keyboard.addKey(Phaser.Keyboard.D)
	    };
      },
      initBackground: function () {
	    var playStateText = game.add.text(game.world.centerX * 1, game.world.centerY * 1, 'good luck',
		    {font: fontFamily, fill: fontColour});
	    playStateText.anchor.setTo(0.5, 0.5);

	    game.input.onDown.addOnce(this.reset, this);
	    game.stage.backgroundColor = '#98AC4F';
      },
      // does the entire level building (excluding player and enemies)
      createWorld: function () {
	    this.tilemap = game.add.tilemap('tilemap');
	    this.tilemap.addTilesetImage('tileset');
	    this.blockedLayer = this.tilemap.createLayer('blockedLayer');
	    this.tilemap.setCollisionBetween(1, 1000, true, 'blockedLayer');
	    this.blockedLayer.resizeWorld();

	    this.createGroup('flag', makeFlag);
	    this.createGroup('block', makeBlock);
	    this.createGroup('runner', makeRunner);
	    this.createGroup('cloud', makeCloud);
	    this.createGroup('player', makePlayer);

      },
      createGroup: function (sprite, setter) {
	    var group = game.add.group();
	    group.enableBody = true;

	    result = createTileGroup(sprite, this.tilemap);
	    result.forEach(
		    function (tile) {
			  this.makeObject(tile, group);
		    }, this);

	    group.forEach(
		    function (element) {
			  element.setter = setter;
			  element.setter();
		    });

	    this.group[sprite] = group;
      },
      reset: function () {
	    game.state.start('menu');
      }

};