/*  Fourth game state (4/5)
 *  Functions as a menu or title screen
 */

/* global game, Phaser, fontFamily, fontColour */

function Menu() {
      this.BG_COLOR = '#AFB9A1';

      this.stateText;
}

Menu.prototype.create = function () {
      var textProperty = textProperty = {
	    x: game.world.centerX / 2,
	    y: game.world.centerY / 2,
	    message: 'PROJECT X : PLAYING IN THE RAIN \n\nClick up to start',
	    font: {font: fontFamily, fill: fontColour}
      };
      
      this.stateText = game.add.text(textProperty.x, textProperty.y, textProperty.message, textProperty.font);
      this.stateText.anchor.setTo(0.5, 0.5);

      game.stage.backgroundColor = this.BG_COLOR;

      var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
      upKey.onDown.addOnce(game.global.stateLoader.loadCurrentState, game.global.stateLoader);
};


