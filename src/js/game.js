(function() {
  'use strict';

  var spaceKey;

  function Game() {
    this.player = null;
  }

  Game.prototype = {

    create: function () {
      document.querySelector('canvas').style.cursor = 'none';
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


      this.playerAdd();
      this.gemAdd();
      this.ballAdd();
      this.timerSetup();

      this.score = 0;
      this.gemCount = 100;

      this.input.onDown.addOnce(this.onInputDown, this);
      spaceKey.onDown.addOnce(this.onInputDown, this);
    },

    update: function () {
      var x;
      x = this.input.position.x;
      this.player.x = x;

      this.physics.arcade.collide(this.ball, this.gems, this.gemCollide, null, this);
      this.physics.arcade.collide(this.ball, this.player, this.playerCollide, null, this);

      if (this.ball.y >= this.game.world.height - this.ball.height) {
        this.deathHandler();
      };
      if (this.gemCount === 0) {this.gemAdd()};
    },

    onInputDown: function () {
      this.ball.body.velocity.y = -900;
      this.ball.body.velocity.x = 90;
      this.game.time.events.loop(Phaser.Timer.SECOND/2, this.updateHalfSec, this);
    },

    deathHandler: function () {
      this.game.state.start('menu', true, false, this.score);
    },

    timerSetup: function () {
      this.scoreText = this.game.add.text(this.game.world.centerX * 1.5, 5, 'Score = 0', { font: '20px Arial', fill: '#bada55'});

    },

    updateHalfSec: function () {
      this.score += 1;
      this.scoreText.setText('Score = ' + this.score);
    },
    
    ballAdd: function () {
      this.ball = this.game.add.sprite(this.game.width/2, this.game.height - 51*2, 'star');
      this.game.physics.arcade.enable(this.ball);
      this.ball.body.gravityScale = 0.01;
      this.ball.body.collideWorldBounds = true;
      this.ball.body.bounce.set(1);
      this.ball.body.height = this.ball.body.width;

    },

    gemAdd: function () {
      this.gems = this.game.add.group();
      this.gems.x = 50;
      this.gems.y = 50;
      this.game.physics.arcade.enable(this.gems);
      this.gems.enableBody = true;


      for (var i = 0; i < 5; i++)
      {
        for (var j = 0; j < 20; j++)
        {
          var g = this.gems.create(j*53,i*53,'blue');
          g.body.allowGravity = false;
          g.body.immovable = true;
          g.anchor.setTo(0.5, 0.5);
        }
      }
        

    },

    playerAdd: function () {
      var xpos = this.game.width / 2
        , ypos = this.game.height - 51;

      this.player = this.game.add.group();

      this.player.x = xpos;
      this.player.y = ypos;

      this.player.create(-15,0, 'block');
      this.player.create(-30 -15,0, 'block');
      this.player.create(-30*2-15,0, 'block');
      this.player.create(-30*3-15,0, 'block');
      this.player.create(30-15,0, 'block');
      this.player.create(30*2-15,0, 'block');
      this.player.create(30*3-15,0, 'block');

      this.game.physics.arcade.enable(this.player);
      this.player.enableBody = true;
      this.player.setAll('body.immovable', true);

    },

    playerCollide: function (ball, player) {
      var customPointer = new Phaser.Pointer(this.game, 2);
      customPointer.y = this.game.height;
      customPointer.x = this.game.input.activePointer.x;
      this.game.physics.arcade.moveToPointer(ball, -900, customPointer);
    },

    gemCollide: function (ball, gem) {
      gem.loadTexture('fire',0);
      gem.animations.add('explode');
      gem.animations.play('explode', 9, false, true);
      gem.body = null;
      this.score += 10;
      this.scoreText.setText('Score = ' + this.score);
      this.gemCount -= 1;
    }

  };

  window['breakout'] = window['breakout'] || {};
  window['breakout'].Game = Game;

}());
