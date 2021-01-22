const EventEmitter = require("eventemitter2");

class Event extends EventEmitter {
  constructor() {
    super();
  }

  publish(event, data) {
    this.emit(event, data);
  }

  registerFor(eventName, handler) {
    this.addListener(eventName, handler);
  }
}

module.exports = {
  actionEvent: new Event(),
  appEvent: new Event(),
};
