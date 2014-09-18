(function() {
  'use strict';


  var rootRef = new Firebase('http://breakout.firebaseio.com/');
  var spaceKey;

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Menu.prototype = {

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


      this.titleTxt = this.add.text(x, y,'Breakout',style);

      if (this.score > 0){
        y = y + 85;
        var text = 'Score = ' + this.score
        this.add.text(x, y, text, style);
        y = y + 45;
        var button = this.game.add.button(x,y, 'submit', this.actionOnClick, this, 1, 0);
      }

    },

    update: function () {
    },

    onDown: function () {
      this.game.state.start('game');
    },

    actionOnClick: function () {
      var newScore = this.score;
      var name = prompt("Please enter your name");

      if (name.length === 0)
      return;

      var date = new Date().toString();
      var log = "Name: " + name + ", Score: " + newScore + " @ " + date;

      var userScoreRef = rootRef.child(log.hashCode());
       
      // Use setWithPriority to put the name / score in Firebase, and set the priority to be the score.
      userScoreRef.setWithPriority({ name:name, score:newScore }, newScore);

      this.game.state.start('leaderboard');
       
      }
  };

  window['breakout'] = window['breakout'] || {};
  window['breakout'].Menu = Menu;

}());


String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length == 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString(16);
};




