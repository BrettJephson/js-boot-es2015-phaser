import Phaser from "phaser";

import config from "app/settings/config/index";
import states from "app/display/states/index";

import uiFactory from "app/display/ui/ui-factory";
import uiMediator from "app/display/ui/ui-mediator";

var game;

function init() {
  console.log("init, create game");
  game = createGame(config.game.width, config.game.height, config.game.renderer, config.game.parent);
  uiFactory.singleton(uiMediator, game);
  addStates();
  start();
}

function createGame(width, height, renderer, parent) {
  return new Phaser.Game({
    width,
    height,
    renderer,
    parent,
    state: null,
    transparent: false,
    preserveDrawingBuffer: false,
    antialias: false,
    enableDebug: false
  });
}

function addStates() {
  _.each(states, function(state, key) {
    game.state.add(key, state);
  });
}

function start() {
  game.state.start("boot");
}

export default init;
