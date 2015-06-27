/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*  Fifth game state (5/5)
 *  The actual gameplay state
 */

/* global game */
function State(tilemap, tileset, nextState) {

      this.map = tilemap;
      this.set = tileset;


      this.create = function () {
	    this.group = {};

	    this.initBackground();
	    this.initKeyboard();

	    this.findObject = findObject;
	    this.makeObject = makeObject;

	    this.createWorld();

	    this.player = this.group.player.getTop();

	    game.camera.follow(this.player);

	    this.group['cloud'].forEach(function (element) {
		  game.time.events.loop(1000, element.rain, element);
	    });

	    game.global.emitters.drop =  makeDropEmitter();
	    game.global.emitters.player = makePlayerEmitter();
	    
	    this.jump = playerJump;
	    this.die = playerDie;
	    this.move = playerMove;
      };

      this.update = function () {
	    this.collision();

	    this.move();
	    if (!this.player.inWorld) {
		  this.die("fall");
	    }
      };

      this.collision = function () {
	    var runners, flags, blocks, clouds, blockedLayer, players, flags, drops;

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

	    clouds.forEach(function (cloud) {
		  game.physics.arcade.collide(cloud.drops, blockedLayer, dieDrop, null, this);
	    });

	    
      	   if( game.physics.arcade.collide(players, flags)){
		 game.global.loadNextState();
	   };
	    game.physics.arcade.collide(players, blocks);
	    game.physics.arcade.overlap(players, runners, this.die, null, this);

      };

      this.initBackground = function () {
	    var playStateText = game.add.text(game.world.centerX * 1, game.world.centerY * 1, 'good luck',
		    {font: fontFamily, fill: fontColour});
	    playStateText.anchor.setTo(0.5, 0.5);

	    game.input.onDown.addOnce(this.reset, this);
	    game.stage.backgroundColor = '#98AC4F';
      };

      this.initKeyboard = function () {
	    this.cursor = game.input.keyboard.createCursorKeys();
	    game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP],
		    Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT);

	    this.wasd = {
		  up: game.input.keyboard.addKey(Phaser.Keyboard.W),
		  left: game.input.keyboard.addKey(Phaser.Keyboard.A),
		  right: game.input.keyboard.addKey(Phaser.Keyboard.D)
	    };
      };
      // does the entire level building (excluding player and enemies)
      this.createWorld = function () {
	    this.tilemap = game.add.tilemap(this.map);
	    this.tilemap.addTilesetImage(this.set);
	    this.blockedLayer = this.tilemap.createLayer('blockedLayer');
	    this.tilemap.setCollisionBetween(1, 1000, true, 'blockedLayer');
	    this.blockedLayer.resizeWorld();

	    this.createGroup('flag', makeFlag);
	    this.createGroup('block', makeBlock);
	    this.createGroup('runner', makeRunner);
	    this.createGroup('cloud', makeCloud);
	    this.createGroup('player', makePlayer);

      };

      this.createGroup = function (sprite, setter) {
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
      };

      this.gotoNextLevel = function () {
	    ++game.global.savedState;
	    game.state.start(this.nextState);
      };

      this.reset = function () {
	    game.state.start('menu');
      };

      this.retreiveGroup = function (type, map) {
	    var layer = 'objectLayer';
	    var result = new Array();
	    map.objects[layer].forEach(function (element) {
		  if (element.properties.type === type) {
			//Phaser uses top left, Tiled bottom left so we have to adjust
			//also keep in mind that the cup images are a bit smaller than the tile which is 16x16
			//so they might not be placed in the exact position as in Tiled
			element.y -= map.tileHeight;
			result.push(element);
		  }
	    });
	    return result;
      };

      this.makeObject = function (tile, group) {
	    var sprite = group.create(tile.x, tile.y, tile.properties.sprite);

	    //copy all properties to the sprite
	    Object.keys(tile.properties).forEach(
		    function (key) {
			  sprite[key] = tile.properties[key];
		    });
      };

}


     