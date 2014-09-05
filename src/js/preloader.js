(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(320, 240, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      this.load.image('blue', 'assets/blue.png', 34, 57);
      this.load.image('star', 'assets/star.png');
      this.load.image('block', 'assets/block.png');
    },

    create: function () {
      this.stage.backgroundColor = '#333333';
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['breakout'] = window['breakout'] || {};
  window['breakout'].Preloader = Preloader;

}());
