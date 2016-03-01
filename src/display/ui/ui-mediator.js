import _ from "lodash";

import factory from "app/display/ui/ui-factory";

var instances = 0;

const uiMediator = {
  game: null,
  create: factory.create,
  init: function(game) {
    console.log("init mediator", game);
    this.game = game;
    return this;
  },
  build: function(config) {
    // TODO basic ui settings -
    // TODO 1. element size defined by content, element position centered vertically and horizontally
    _.each(config, _.bind(this.addElement, this));
  },
  addElement: function(item) {
    var elem = factory.createType(item.type, item.id);
    elem.init(this.game);
  }
};

export default uiMediator;
