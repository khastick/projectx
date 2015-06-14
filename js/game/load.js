/*  Third game state (3/5)
 *  Loads in every asset
 *  Can show a progress bar if a sprite exists
 */

var loadState = {
    preload: function () {

        var loadStateText = game.add.text(game.world.centerX / 2, game.world.centerY / 2, 'loading...',
			{ font: fontFamily, fill: fontColour });
        loadStateText.anchor.setTo(0.5, 0.5);

        var progressBar = game.add.sprite(game.world.centerX / 2, game.world.centerY * .67, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);

        var images = ['player', 'drop', 'cloud', 'runner', 'pixel_player', 'pixel_drop', 'flag', 'block'];

        images.forEach(
                function (image) {
                    game.load.image(image, 'images/entity/' + image + '.png')
                }
         );

        game.load.audio('jump', ['audio/jump.ogg', 'audio/jump.mp3']);
        game.load.audio('coin', ['audio/coin.ogg', 'audio/coin.mp3']);
        game.load.audio('dead', ['audio/dead.ogg', 'audio/dead.mp3']);

        game.load.image('tileset', 'images/tileset.png');
        game.load.tilemap('tilemap', 'maps/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    },

    create: function () {
        game.state.start('menu');
    }
};