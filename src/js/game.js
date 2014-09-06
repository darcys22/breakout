(function() {
  'use strict';

  function Game() {
    this.player = null;
  }

  Game.prototype = {

    create: function () {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.playerAdd();
      this.gemAdd();
      this.ballAdd();

      this.input.onDown.addOnce(this.onInputDown, this);
    },

    update: function () {
      var x;
      x = this.input.position.x;
      this.player.x = x;

      this.physics.arcade.collide(this.ball, this.gems, this.gemCollide, null, this);
      this.physics.arcade.collide(this.ball, this.player, this.playerCollide, null, this);
    },

    onInputDown: function () {
      //this.game.state.start('menu');
      this.ball.body.velocity.y = -900;
      this.ball.body.velocity.x = 90;
    },
    
    ballAdd: function () {
      this.ball = this.game.add.sprite(this.game.width/2, this.game.height - 51*2, 'star');
      this.game.physics.arcade.enable(this.ball);
      this.ball.body.gravityScale = 0.01;
      this.ball.body.collideWorldBounds = true;
      this.ball.body.bounce.set(1);

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
      //this.player.body.immovable = true;
      this.player.setAll('body.immovable', true);

    },

    playerCollide: function (ball, player) {
      this.game.physics.arcade.moveToPointer(ball, -200);
    },

    gemCollide: function (ball, gem) {
      gem.kill();
    }

  };

  window['breakout'] = window['breakout'] || {};
  window['breakout'].Game = Game;

}());
