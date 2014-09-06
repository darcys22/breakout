(function() {
  'use strict';

  function Game() {
    this.player = null;
  }

  Game.prototype = {

    create: function () {
      this.game.physics.startSystem(Phaser.Physics.NINJA);

      this.playerAdd();
      this.gemAdd();
      this.ballAdd();

      this.input.onDown.add(this.onInputDown, this);
    },

    update: function () {
      var x;
      x = this.input.position.x;
      this.player.x = x;

      //this.game.physics.ninja.collide(this.player, this.gems);
    },

    onInputDown: function () {
      //this.game.state.start('menu');
      this.game.physics.ninja.enableCircle(this.ball, this.ball.width /2);
      this.ball.body.gravityScale = 0.4;
      this.ball.body.moveUp(900);
    },
    
    ballAdd: function () {
      this.ball = this.game.add.sprite(this.game.width/2, this.game.height - 51*2, 'star');
    },

    gemAdd: function () {
      this.gems = this.game.add.group();
      this.gems.x = 50;
      this.gems.y = 50;
      this.game.physics.ninja.enableAABB(this.gems);
      this.gems.enableBody = true;


      for (var i = 0; i < 5; i++)
      {
        for (var j = 0; j < 20; j++)
        {
          var g = this.gems.create(j*53,i*53,'blue');
          g.body.gravityScale = 0;
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

      this.game.physics.ninja.enableAABB(this.player);
      this.player.enableBody = true;
      this.player.body.gravityScale = 0;


    }

  };

  window['breakout'] = window['breakout'] || {};
  window['breakout'].Game = Game;

}());
