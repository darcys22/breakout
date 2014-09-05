(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 2 - 100
        , y = this.game.height / 2 - 100
        , style = { font: '40px Arial', fill: '#bada55', align: 'center' };


      this.titleTxt = this.add.text(x, y,'Breakout',style);

      y = y + 45;
      this.startTxt = this.add.text(x, y, 'START',style);

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

  window['breakout'] = window['breakout'] || {};
  window['breakout'].Menu = Menu;

}());
