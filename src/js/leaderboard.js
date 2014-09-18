(function() {
  'use strict';

  var spaceKey;
  var rootRef = new Firebase('https://breakout.firebaseio.com/');

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
      var LEADERBOARD_SIZE = 10;
        
      document.querySelector('canvas').style.cursor = 'inherit';
      spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      spaceKey.onDown.addOnce(this.onDown, this);

      var x = 75
        , y = 25
        , style = { font: '40px Arial', fill: '#bada55', align: 'center' };
      this.titleTxt = this.add.text(x, y,'Leaderboard -- press spacebar to continue',style);

      y = 70;
      x = 150;
      var passingthis = this;
      rootRef.endAt().limit(LEADERBOARD_SIZE * 3).once('value', function(snap) {
        var i = 1;
        snap.forEach(function(userSnap) {
          y += 50;
          console.log('user %s is in position %d with %d points', userSnap.val().name, i, userSnap.val().score);
          var text = i + ': ' + userSnap.val().name + " - " + userSnap.val().score;
          passingthis.add.text(x, y, text, style);
          i++;
          if ( i % LEADERBOARD_SIZE == 0) {
            x += 300;
            y = 70;
          }
       });
     });
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
//
