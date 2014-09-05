(function() {
  'use strict';

  function Game() {
    this.player = null;
  }

  Game.prototype = {

    create: function () {

      this.playerAdd();
      this.gemAdd();

      this.input.onDown.add(this.onInputDown, this);
    },

    update: function () {
      var x;
      x = this.input.position.x;
      this.player.x = x


    },

    onInputDown: function () {
      this.game.state.start('menu');
    },

    gemAdd: function () {
    },

    playerAdd: function () {
      var xpos = this.game.width / 2
        , ypos = this.game.height - 175 * 0.3;

      this.player = this.game.add.group();

      this.player.x = xpos;
      this.player.y = ypos;

      this.player.create(0,0, 'block');
      this.player.create(-101,0, 'block');
      this.player.create(-101*2,0, 'block');
      this.player.create(101,0, 'block');
      this.player.create(101*2,0, 'block');

      this.player.scale.x = 0.3;
      this.player.scale.y = 0.3;
    }

  };

  window['breakout'] = window['breakout'] || {};
  window['breakout'].Game = Game;

}());
