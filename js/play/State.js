/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*  Fifth game state (5/5)
 *  The actual gameplay state
 */

/* global game, fontFamily, fontColour, Phaser */
function State(tilemap, tileset) {
      this.BG_COLOR = '#98AC4F';

      this.map = tilemap;
      this.set = tileset;

      this.groupLoader = new GroupLoader();
      this.collider = new Collider();

      this.entities;
      this.player;
      this.message;

}

State.prototype.create = function () {
      this.createBackground();
      this.createKeyboard();
      this.createMap();
      this.groupLoader.createGroups(this);

      this.player = this.entities.player.getTop();

      game.camera.follow(this.player);

      game.global.emitters.drop = makeDropEmitter();
      game.global.emitters.player = makePlayerEmitter();
      game.global.emitters.runner = makeRunnerEmitter();
};

State.prototype.update = function () {
      this.collider.update(this);

      this.player.move(this);

      if (!this.player.inWorld) {
	    game.time.events.add(Phaser.Timer.SECOND, game.global.stateLoader.reset, this);
      }
};

State.prototype.createBackground = function () {
      var text = {
	    x: game.world.centerX,
	    y: game.world.centerY,
	    message: 'Good Luck',
	    font: {font: fontFamily, fill: fontColour}
      };

      this.message = game.add.text(text.x, text.y, text.message, text.font);
      this.message.anchor.setTo(0.5, 0.5);

      game.input.onDown.addOnce(game.global.stateLoader.reset, game.global.stateLoader);
      game.stage.backgroundColor = this.BG_COLOR;
};

State.prototype.createKeyboard = function () {
      this.cursor = game.input.keyboard.createCursorKeys();
      game.input.keyboard.addKeyCapture(Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT);

      this.wasd = {
	    up: game.input.keyboard.addKey(Phaser.Keyboard.W),
	    left: game.input.keyboard.addKey(Phaser.Keyboard.A),
	    right: game.input.keyboard.addKey(Phaser.Keyboard.D)
      };
};

// does the entire level building (excluding player and enemies)
State.prototype.createMap = function () {
      this.tilemap = game.add.tilemap(this.map);
      this.tilemap.addTilesetImage(this.set);
      this.blockedLayer = this.tilemap.createLayer('blockedLayer');
      this.tilemap.setCollisionBetween(1, 1000, true, 'blockedLayer');
      this.blockedLayer.resizeWorld();
};