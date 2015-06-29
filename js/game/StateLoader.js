/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global game */

function StateLoader(){
      this.savedState = 0,
      this.states = ['play-01', 'play-02', 'play-03'],
      
      this.getSavedState = function () {
	    return this.states[this.savedState];
      },
      this.loadCurrentState = function () {
	    var currentState = this.getSavedState();
	    game.state.start(currentState);
      },
      this.loadNextState = function () {
	    ++this.savedState;
	    this.loadCurrentState();
      },
      this.reset = function(){
	    game.state.start('menu');
      }
}
