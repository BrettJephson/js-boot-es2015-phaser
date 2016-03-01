const basic = {
  init: function(game) {
    this.game = game;
    this.view = this.game.make.group();
    return this.view;
  }
};

export default basic;
