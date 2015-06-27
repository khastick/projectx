function makeCloud() {
      this.anchor.setTo(0.5, 0.5);
      this.body.immovable = true;
      this.rain = addDrop;
      
      this.drops = game.add.group();
      this.drops.enableBody = true;
}

﻿function addDrop() {
      var drop = this.drops.create(this.position.x, this.position.y, 'drop');
      drop.anchor.setTo(0.5, 0.5);
      drop.body.gravity.y = 500;
}