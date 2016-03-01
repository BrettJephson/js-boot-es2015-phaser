import Phaser from "phaser";

import assetData from "app/settings/assets";
import uiMediator from "app/display/ui/ui-mediator";
import uiFactory from "app/display/ui/ui-factory";

export default {
  id: "boot",
  init: function() {
    console.log("init boot state");
    var game = this.game;
    game.input.maxPointers = 1;
    game.stage.backgroundColor = "#cfcfcf";
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignVertically = true;
    game.scale.pageAlignHorizontally = true;
    game.scale.refresh();
  },
  preload: function(game) {
    // load minimal assets for the preloader...
    game.load.pack('boot', null, assetData);
    // TODO preload assets for preloader
    uiFactory.singleton(uiMediator).build([
      {
        type: "group",
        id: "basic",
        position: {
          x: game.width * 0.5,
          y: game.height * 0.5
        },
        content: [
          {
            type: "progress",
            id: "bar",
            anchor: {
              x: 0.5,
              y: 0.5
            }
          }
        ]
      }
    ]);
  },
  create: function(game) {
   this.state.start('preloader');
  }
};
