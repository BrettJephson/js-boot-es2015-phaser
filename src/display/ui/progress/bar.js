const bar = {
  width: 256,
  height: 24,
  init: function(game) {
    this.game = game;
    this.view = this.game.make.graphics(this.game.width * 0.5 - this.width * 0.5, this.game.height * 0.5 - this.height * 0.5);
    this.game.world.add(this.view);
    this.progress(0.0);
    setInterval(() => {
      this.progress(this.value + 0.01);
    }, 100);
  },
  update: function() {
    this.view.beginFill(0xffffff, 1.0);
    this.view.drawRect(this.width * this.value, 0, this.width * (1.0 - this.value), this.height);
    this.view.endFill();

    this.view.beginFill(0xff0000, 1.0);
    this.view.drawRect(0, 0, this.width * this.value, this.height);
    this.view.endFill();
  },
  progress: function(value) {
    if(value === this.value) { return; }
    this.value = Math.min(1.0, value);
    this.update();
  }
};

export default bar;
