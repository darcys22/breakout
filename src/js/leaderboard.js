(function() {
  'use strict';

  var spaceKey;

  function Leaderboard() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Leaderboard.prototype = {

    init: function (score) {
      if (!score){
        this.score = 0
      }
      else
        {
          this.score = score
        }
    },

    create: function () {
      document.querySelector('canvas').style.cursor = 'inherit';
      spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      spaceKey.onDown.addOnce(this.onDown, this);
      var x = this.game.width / 2 - 100
        , y = this.game.height / 2 - 100
        , style = { font: '40px Arial', fill: '#bada55', align: 'center' };


      this.titleTxt = this.add.text(x, y,'Breakout#',style);

      if (this.score > 0){
        y = y + 85;
        var text = 'Score = ' + this.score
        this.add.text(x, y, text, style);
        y = y + 45;
      }

    },

    update: function () {
    },

    onDown: function () {
      this.game.state.start('game');
    }

  };

  window['breakout'] = window['breakout'] || {};
  window['breakout'].Leaderboard = Leaderboard;

}());

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
