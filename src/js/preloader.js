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
      this.load.image('blue', 'assets/blue.png');
      this.load.image('star', 'assets/star.png');
      this.load.image('block', 'assets/block.png');
      this.load.spritesheet('submit', 'assets/submit.png', 225, 49);
    },

    create: function () {
      this.stage.backgroundColor = '#333333';
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu', true, false, 0);
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['breakout'] = window['breakout'] || {};
  window['breakout'].Preloader = Preloader;

}());
