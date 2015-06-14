/*  Fifth game state (5/5)
 *  The actual gameplay state
 */

/* global game */

var playState = {
    render: function(){
        //game.debug.spriteBounds(this.platform);        
    },
    
    create: function () {

        var playStateText = game.add.text(game.world.centerX * 1, game.world.centerY * 1, 'good luck',
                {font: fontFamily, fill: fontColour});
        playStateText.anchor.setTo(0.5, 0.5);

        game.input.onDown.addOnce(this.reset, this);
        game.stage.backgroundColor = '#98AC4F';

        this.cursor = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP],
                Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT);

        this.wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D)
        };

        this.createWorld();
        this.createPlayer();
        game.camera.follow(this.player);
       
        //this.createEnemies();
        //this.enemies.createMultiple(10, 'enemy');
        //this.createFlag();
        
        this.createGroup('flag',makeStandard);
        this.createGroup('block',makeFloater);
        //this.createGroup('enemy', makeWorldBounded);
        //game.time.events.loop(250, this.addEnemy, this);
        
        this.emitter = createEmitter(); // death particles
                
    },
    
    update: function () {
        game.physics.arcade.collide(this.player, this.blockedLayer);
        game.physics.arcade.collide(this.enemies, this.blockedLayer);
        game.physics.arcade.collide(this['flag'], this.blockedLayer);
        game.physics.arcade.collide(this['block'], this.blockedLayer);
        //game.physics.arcade.collide(this.player, this.platform);
       // game.physics.arcade.collide(this.enemies, this.platform);

        //game.physics.arcade.collide(this.plane, this.blockedLayer, function(){
        //    console.log("here");
        //});
        
        game.physics.arcade.collide(this.player, this['flag']);
        game.physics.arcade.collide(this.player, this['block']);
        game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);

        this.movePlayer();
        if (!this.player.inWorld) {
            this.playerDie("fall");
        }

    },
    
    movePlayer: function () {

        if (this.cursor.left.isDown || this.wasd.left.isDown || this.moveLeft) {
            this.player.body.velocity.x = -200;
        }
        else if (this.cursor.right.isDown || this.wasd.right.isDown || this.moveRight) {
            this.player.body.velocity.x = 200;
        }
        else {
            this.player.body.velocity.x = 0;
        }

        if (this.cursor.up.isDown || this.wasd.up.isDown) {
            this.jumpPlayer();
        }

    },
    
    jumpPlayer: function () {
        if (this.player.body.onFloor() || this.player.body.touching.down) {
            this.player.body.velocity.y = -320;
        }
    },
    
    playerDie: function (condition) {
        if (!this.player.alive) {
            return;
        }

        this.player.kill();

        if (condition != "fall") {
            this.emitter.x = this.player.x;
            this.emitter.y = this.player.y;
            this.emitter.start(true, 600, null, 15);
        }

        game.time.events.add(1000, this.reset, this);
    },
    
    // does the entire level building (excluding player and enemies)
    createWorld: function () {
        this.tilemap = game.add.tilemap('tilemap');
        this.tilemap.addTilesetImage('tileset');
        this.blockedLayer = this.tilemap.createLayer('blockedLayer');
        this.tilemap.setCollisionBetween(1, 1000, true, 'blockedLayer');
        this.blockedLayer.resizeWorld();        
    },
    
    // spawns an enemy into the game
    addEnemy: function () {
        var enemy = this.enemies.getFirstDead();

        if (!enemy) {
            return;
        }

        enemy = setRandEnemy(game, enemy);
    },

   setEntity: function(entity, setter){
    entity = setter(entity);
   },
   
    createGroup : function (sprite,  setter){
        this[sprite] = game.add.group();
        this[sprite].enableBody = true;
        
        result = createTileGroup(sprite, this.tilemap);
        result.forEach(function (element) {
             this.createFromTiledObject(element, this[sprite]);
        }, this);       
        
        this[sprite].forEach(setEntity, this, true, setter);        
    },
    
    createFlag: function(){
        this.flags = game.add.group();
        this.flags.enableBody  = true;
        
        result = createTileGroup('flag', this.tilemap);
        result.forEach(function (element) {
             this.createFromTiledObject(element, this.flags);
        }, this);       
        
        this.flags.forEach(function (item) {
            item = setEnemy(game, item);
        }, this);
    },
    
    createPlayer: function () {
        result = createTileGroup('player', this.tilemap);
        
        result.forEach(function (element) {
            this.player = game.add.sprite(element.x, element.y, element.properties.sprite);
        }, this);

        this.player = setPlayer(game, this.player);
    },
    
    // creates enemies from object layer
    createEnemies: function () {
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        var enemy;
        result = this.findObjectsByType('enemy2', this.tilemap, 'objectLayer');
        result.forEach(function (element) {
            this.createFromTiledObject(element, this.enemies);

        }, this);

        this.enemies.forEach(function (item) {
            item = setEnemy(game, item);
        }, this);
    },
    // 
 // create a sprite from an object
    // for use with putting objects from object layer into a group (multiple items or enemies, for instance)
    createFromTiledObject: function (element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);

        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function (key) {
            sprite[key] = element.properties[key];
        });
    },
    //find objects in a Tiled layer that contains a property called "type" equal to a certain value
    
    findObjectsByType: function (type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function (element) {
            if (element.properties.type === type) {
                //Phaser uses top left, Tiled bottom left so we have to adjust
                //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
                //so they might not be placed in the exact position as in Tiled
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    },
    
    reset: function () {
        game.state.start('menu');
    }

};