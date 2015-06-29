/*  Second game state (2/5)
 *  Sets system and game window up before loading assets in the next state
 */

/* global game, Phaser */

function Boot() {
      this.BG_COLOR = '#AFB9A1';
      this.HEIGHT = 1200;
      this.WIDTH = 1600;
}

Boot.prototype.preload = function () {
      // Loads in progress bar to display in load.js (the loading state)
      game.load.image('progressBar', 'images/progressBar.png');
};

Boot.prototype.create = function () {
      game.stage.backgroundColor = this.BG_COLOR;

      //scaling options
      this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;

      //have the game centered horizontally
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;

      //screen size will be set automatically
      this.scale.setScreenSize(true);
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.world.setBounds(0, 0, this.WIDTH, this.HEIGHT);
      game.state.start('load');
};
