function makeCloud() {
      this.anchor.setTo(0.5, 0.5);
      this.body.immovable = true;
      this.rain = addDrop;
      
      this.group = game.add.group();
      this.group.enableBody = true;
}

﻿function addDrop() {
      var drop = this.group.create(this.position.x, this.position.y, 'drop');
      drop.anchor.setTo(0.5, 0.5);
      drop.body.gravity.y = 500;
}