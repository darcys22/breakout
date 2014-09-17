(function() {
  'use strict';

  var spaceKey;

  function Leaderboard() {
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
      //Make this space bar to start actually
    },

    actionOnClick: function () {
      console.log("button pressed");
    }
  };

  window['breakout'] = window['breakout'] || {};
  window['breakout'].Menu = Menu;

}());

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
  var LEADERBOARD_SIZE = 5;

  // Build some firebase references.
  var rootRef = new Firebase('https://breakout.firebaseio.com/');
  var scoreListRef = rootRef.child("scoreList");
  var highestScoreRef = rootRef.child("highestScore");

  // Keep a mapping of firebase locations to HTML elements, so we can move / remove elements as necessary.
  var htmlForPath = {};

  // Helper function that takes a new score snapshot and adds an appropriate row to our leaderboard table.
  function handleScoreAdded(scoreSnapshot, prevScoreName) {
    var newScoreRow = $("<tr/>");
    newScoreRow.append($("<td/>").append($("<em/>").text(scoreSnapshot.val().name)));
    newScoreRow.append($("<td/>").text(scoreSnapshot.val().score));

    // Store a reference to the table row so we can get it again later.
    htmlForPath[scoreSnapshot.name()] = newScoreRow;

    // Insert the new score in the appropriate place in the table.
    if (prevScoreName === null) {
      $("#leaderboardTable").append(newScoreRow);
    }
    else {
      var lowerScoreRow = htmlForPath[prevScoreName];
      lowerScoreRow.before(newScoreRow);
    }
  }

  // Helper function to handle a score object being removed; just removes the corresponding table row.
  function handleScoreRemoved(scoreSnapshot) {
    var removedScoreRow = htmlForPath[scoreSnapshot.name()];
    removedScoreRow.remove();
    delete htmlForPath[scoreSnapshot.name()];
  }

  // Create a view to only receive callbacks for the last LEADERBOARD_SIZE scores
  var scoreListView = scoreListRef.limit(LEADERBOARD_SIZE);

  // Add a callback to handle when a new score is added.
  scoreListView.on('child_added', function (newScoreSnapshot, prevScoreName) {
    handleScoreAdded(newScoreSnapshot, prevScoreName);
  });

  // Add a callback to handle when a score is removed
  scoreListView.on('child_removed', function (oldScoreSnapshot) {
    handleScoreRemoved(oldScoreSnapshot);
  });

  // Add a callback to handle when a score changes or moves positions.
  var changedCallback = function (scoreSnapshot, prevScoreName) {
    handleScoreRemoved(scoreSnapshot);
    handleScoreAdded(scoreSnapshot, prevScoreName);
  };
  scoreListView.on('child_moved', changedCallback);
  scoreListView.on('child_changed', changedCallback);

  // When the user presses enter on scoreInput, add the score, and update the highest score.
  $("#scoreInput").keypress(function (e) {
    if (e.keyCode == 13) {
      var newScore = Number($("#scoreInput").val());
      var name = $("#nameInput").val();
      $("#scoreInput").val("");

      if (name.length === 0)
        return;

      var userScoreRef = scoreListRef.child(name);

      // Use setWithPriority to put the name / score in Firebase, and set the priority to be the score.
      userScoreRef.setWithPriority({ name:name, score:newScore }, newScore);

      // Track the highest score using a transaction.  A transaction guarantees that the code inside the block is
      // executed on the latest data from the server, so transactions should be used if you have multiple
      // clients writing to the same data and you want to avoid conflicting changes.
      highestScoreRef.transaction(function (currentHighestScore) {
        if (currentHighestScore === null || newScore > currentHighestScore) {
          // The return value of this function gets saved to the server as the new highest score.
          return newScore;
        }
        // if we return with no arguments, it cancels the transaction.
        return;
      });
    }
  });

  // Add a callback to the highest score in Firebase so we can update the GUI any time it changes.
  highestScoreRef.on('value', function (newHighestScore) {
    $("#highestScoreDiv").text(newHighestScore.val());
  });
