/* global game, Phaser */

function makeCloud() {
      // constants
      this.DROP_RATE = Phaser.Timer.SECOND;
      this.DROP_SPEED_Y = 500; 
      
      this.anchor.setTo(0.5, 0.5);
      this.body.immovable = true;
      this.rain = addDrop;
      
      this.drops = game.add.group();
      this.drops.enableBody = true;
      
      game.time.events.loop(this.DROP_RATE, this.rain, this);
}

function addDrop() {
      var drop = this.drops.create(this.position.x, this.position.y, 'drop');
      drop.anchor.setTo(0.5, 0.5);
      drop.body.gravity.y = this.DROP_SPEED_Y;
}