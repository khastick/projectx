/*  First game state (1/5)
 *  Phaser initialization here as well as adding of other game states
 */

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

var fontFamily = '30px Candara, Calibri, Segoe, "Segoe UI", Optima, Arial, sans-serif';
var fontColour = '#2F551E';

// Global variables set in here
game.global = {
      emitters: {
      },
      
      savedState: 0,
      states: ['play-01', 'play-02', 'play-03'],
      getSavedState: function () {
	    return this.states[this.savedState];
      },
      loadCurrentState: function () {
	    var currentState = this.getSavedState();
	    game.state.start(currentState);
      },
      loadNextState: function () {
	    ++this.savedState;
	    this.loadCurrentState();
      }


      // camera?
      //score: 0
};

var plays = [
      new State('tilemap', 'tileset'),
      new State('tilemap-02', 'tileset-02'),
      new State('tilemap-03', 'tileset-03')
];

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);

for (var i = 0; i < plays.length; i++) {
      game.state.add(game.global.states[i], plays[i]);
}

game.state.start('boot');