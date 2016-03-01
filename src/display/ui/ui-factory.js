import * as buttons from "app/display/ui/buttons/index";
import * as progress from "app/display/ui/progress/index"
import * as groups from "app/display/ui/groups/index";

let singletonPrototypes = [];
let singletonInstances = [];

const uiFactory = {
  singleton: function(prototype, ...args) {
    var index = singletonPrototypes.indexOf(prototype);
    if(index > -1) {
      return singletonInstances[index];
    }
    else {
      singletonPrototypes[singletonPrototypes.length] = prototype;
      var instance = this.create(prototype).init(...args);
      singletonInstances[singletonInstances.length] = instance;
      return instance;
    }
  },
  createGroup: function(id) {
    return this.create(groups[id]);
  },
  createButton: function(id) {
    return this.create(buttons[id]);
  },
  createProgress: function(id) {
    return this.create(progress[id]);
  },
  createType: function(type, id) {
    var action;
    if(type === 'group') {
      action = this.createGroup;
    }
    else if(type === 'button') {
      action = this.createButton;
    }
    else if (type === 'progress') {
      action = this.createProgress;
    }
    return _.bind(action, this)(id);
  },
  create: function(prototype) {
    return Object.create(prototype);
  }
};

export default uiFactory.create(uiFactory);
