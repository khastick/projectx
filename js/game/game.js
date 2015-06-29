/*  First game state (1/5)
 *  Phaser initialization here as well as adding of other game states
 */

/* global Phaser */

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

var fontFamily = '30px Candara, Calibri, Segoe, "Segoe UI", Optima, Arial, sans-serif';
var fontColour = '#2F551E';

// Global variables set in here
game.global = {
      emitters: {
      },
      stateLoader : new StateLoader()
      // camera?
      //score: 0
};

var plays = [
      new State('tilemap', 'tileset'),
      new State('tilemap-02', 'tileset-02'),
      new State('tilemap-03', 'tileset-03'),
      
];

game.state.add('boot', new Boot());
game.state.add('load', new Load());
game.state.add('menu', new Menu());

for (var i = 0; i < plays.length; i++) {
      game.state.add(game.global.stateLoader.states[i], plays[i]);
}

game.state.start('boot');

