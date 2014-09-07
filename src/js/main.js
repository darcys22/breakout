window.onload = function () {
  'use strict';

  var game
    , ns = window['breakout'];

  game = new Phaser.Game(1136, 640, Phaser.AUTO, 'breakout-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);

  game.state.start('boot');
};

document.querySelector('canvas').style.cursor = none;
